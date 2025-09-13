import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IngestEventDto } from './events.dto'
import { MetricsService } from '../metrics/metrics.service'
import { toLogError, messageOf } from '../common/utils/error'

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name)
  private readonly posthogApiKey: string
  private readonly posthogHost: string
  
  private readonly PII_FIELDS = [
    'email', 'phone', 'ip', 'user_agent', 'device_id', 'full_name', 
    'first_name', 'last_name', 'username', 'password', 'token', 'api_key'
  ]
  
  private readonly MAX_FIELD_SIZE = 2048 // 2KB max per field

  constructor(
    private readonly configService: ConfigService,
    private readonly metricsService: MetricsService
  ) {
    this.posthogApiKey = this.configService.get('POSTHOG_API_KEY')
    this.posthogHost = this.configService.get('POSTHOG_HOST', 'https://us.i.posthog.com')
  }

  async processEvent(createEventDto: IngestEventDto): Promise<{ success: boolean; reason?: string }> {
    const { event, props = {}, ts = Date.now() } = createEventDto

    // Validate event name
    if (!this.isValidEventName(event)) {
      this.logger.warn(`Invalid event name: ${event}`)
      this.metricsService.recordEventDropped(event, 'invalid_format')
      return { success: false, reason: 'invalid_event_name' }
    }

    // Scrub PII and validate props
    const scrubbedProps = this.scrubPII(props)
    const validatedProps = this.validateAndTruncateProps(scrubbedProps)

    if (validatedProps === null) {
      this.logger.warn(`Event props too large or invalid: ${event}`)
      this.metricsService.recordEventDropped(event, 'oversize')
      return { success: false, reason: 'props_too_large' }
    }

    const cleanEvent = {
      event,
      props: validatedProps,
      ts,
      processed_at: Date.now()
    }

    // Forward to PostHog if enabled
    if (process.env.POSTHOG_PROXY === '1' && this.posthogApiKey) {
      await this.forwardToPostHog(cleanEvent)
    } else {
      // Log event for local processing
      this.logger.log(`Event processed: ${event}`, { props: validatedProps })
    }

    // Record successful ingestion
    this.metricsService.recordEventIngested(event)

    return { success: true }
  }

  private isValidEventName(event: string): boolean {
    // Only allow alphanumeric, underscore, and hyphen
    return /^[a-zA-Z0-9_-]+$/.test(event) && event.length >= 1 && event.length <= 100
  }

  private scrubPII(props: Record<string, unknown>): Record<string, unknown> {
    const scrubbed = { ...props }
    
    // Remove obvious PII fields
    this.PII_FIELDS.forEach(field => {
      if (field in scrubbed) {
        delete scrubbed[field]
        this.logger.debug(`Scrubbed PII field: ${field}`)
      }
    })

    // Check for potential PII in string values
    Object.keys(scrubbed).forEach(key => {
      const value = scrubbed[key]
      if (typeof value === 'string') {
        // Remove potential email patterns
        if (this.looksLikeEmail(value)) {
          delete scrubbed[key]
          this.logger.debug(`Scrubbed potential email in field: ${key}`)
        }
        // Remove potential phone patterns
        else if (this.looksLikePhone(value)) {
          delete scrubbed[key]
          this.logger.debug(`Scrubbed potential phone in field: ${key}`)
        }
        // Remove very long strings that might contain PII
        else if (value.length > 500) {
          scrubbed[key] = value.substring(0, 500) + '...[truncated]'
        }
      }
    })

    // Hash user identifiers if present
    if (scrubbed.userId) {
      scrubbed.user_hash = this.hashString(String(scrubbed.userId))
      delete scrubbed.userId
    }

    return scrubbed
  }

  private validateAndTruncateProps(props: Record<string, unknown>): Record<string, unknown> | null {
    const validated: Record<string, unknown> = {}
    let totalSize = 0

    for (const [key, value] of Object.entries(props)) {
      // Validate key
      if (typeof key !== 'string' || key.length > 100) {
        continue // Skip invalid keys
      }

      // Convert value to string to measure size
      const stringValue = String(value)
      
      if (stringValue.length > this.MAX_FIELD_SIZE) {
        // Truncate oversized fields
        validated[key] = stringValue.substring(0, this.MAX_FIELD_SIZE) + '...[truncated]'
        totalSize += this.MAX_FIELD_SIZE + 15 // +15 for truncation marker
      } else {
        validated[key] = value
        totalSize += stringValue.length
      }

      // Stop if total size exceeds reasonable limit (10KB)
      if (totalSize > 10240) {
        this.logger.warn('Event props total size exceeded 10KB, truncating')
        break
      }
    }

    return validated
  }

  private looksLikeEmail(str: string): boolean {
    // Simple email pattern detection
    return /@.*\./.test(str) && str.includes('@')
  }

  private looksLikePhone(str: string): boolean {
    // Simple phone pattern detection (sequences of digits with common separators)
    const digitsOnly = str.replace(/[\s\-\(\)\+]/g, '')
    return /^\d{7,15}$/.test(digitsOnly) // 7-15 digits is common phone range
  }

  private async forwardToPostHog(event: any, retries = 3): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(`${this.posthogHost}/capture/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.posthogApiKey}`
          },
          body: JSON.stringify({
            api_key: this.posthogApiKey,
            event: event.event,
            properties: event.props,
            timestamp: new Date(event.ts).toISOString(),
            distinct_id: 'anonymous'
          })
        })

        if (response.ok) {
          this.logger.debug(`Event forwarded to PostHog: ${event.event}`)
          return
        } else {
          throw new Error(`PostHog responded with ${response.status}: ${await response.text()}`)
        }
      } catch (err: unknown) {
        const logErr = toLogError(err, { reason: 'forward_failed', attempt });
        this.logger.warn(`PostHog forward attempt ${attempt}/${retries} failed: ${logErr.message}`, logErr.stack)
        
        if (attempt === retries) {
          this.logger.error(`Events forward failed: ${logErr.message}`, logErr.stack, {
            ...logErr.extra,
            name: logErr.name,
          } as any);
          // можно увеличивать счетчик dropped по причине processing_error
          this.metricsService.recordEventDropped('unknown', 'processing_error');
          // реши политику: либо проглатываем (не валим запрос), либо бросаем:
          // throw err; // если хотим 500
          return
        }
        
        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
      }
    }
  }

  private hashString(input: string): string {
    // Simple hash for anonymization (use crypto.createHash in real implementation)
    let hash = 0
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36)
  }
}