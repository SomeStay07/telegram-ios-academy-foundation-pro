import { Injectable, Logger } from '@nestjs/common'
import { CreateEventDto } from './events.dto'
import { MetricsService } from '../metrics/metrics.service'

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name)
  
  constructor(private readonly metricsService: MetricsService) {}
  
  private readonly PII_FIELDS = [
    'email', 'phone', 'ip', 'user_agent', 'device_id', 'full_name', 
    'first_name', 'last_name', 'username', 'password', 'token', 'api_key'
  ]
  
  private readonly MAX_FIELD_SIZE = 2048 // 2KB max per field

  async processEvent(createEventDto: CreateEventDto): Promise<{ success: boolean; reason?: string }> {
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
    if (process.env.POSTHOG_PROXY === '1') {
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

  private async forwardToPostHog(event: any): Promise<void> {
    try {
      const posthogApiKey = process.env.POSTHOG_API_KEY
      const posthogHost = process.env.POSTHOG_HOST || 'https://us.i.posthog.com'
      
      if (!posthogApiKey) {
        this.logger.warn('PostHog API key not configured, cannot forward event')
        return
      }

      const response = await fetch(`${posthogHost}/capture/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${posthogApiKey}`
        },
        body: JSON.stringify({
          api_key: posthogApiKey,
          event: event.event,
          properties: event.props,
          timestamp: new Date(event.ts).toISOString(),
          distinct_id: 'anonymous' // Could be enhanced with user ID from context
        })
      })

      if (!response.ok) {
        throw new Error(`PostHog responded with ${response.status}: ${response.statusText}`)
      }

      this.logger.debug(`Event forwarded to PostHog: ${event.event}`)
    } catch (error) {
      this.logger.error(`Failed to forward event to PostHog: ${error.message}`, error.stack)
      // Don't throw - we don't want to fail the whole request because PostHog is down
    }
  }
}