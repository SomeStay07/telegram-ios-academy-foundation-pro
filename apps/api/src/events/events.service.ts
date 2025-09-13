import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateEventDto } from './dto/create-event.dto'

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name)
  private readonly posthogApiKey: string
  private readonly posthogHost: string

  constructor(private configService: ConfigService) {
    this.posthogApiKey = this.configService.get('POSTHOG_API_KEY')
    this.posthogHost = this.configService.get('POSTHOG_HOST', 'https://us.i.posthog.com')
  }

  async processEvent(eventDto: CreateEventDto) {
    try {
      // Scrub PII from event properties
      const scrubbedProps = this.scrubPII(eventDto.props)
      
      const eventPayload = {
        event: eventDto.event,
        properties: {
          ...scrubbedProps,
          timestamp: eventDto.ts || Date.now(),
          source: 'miniapp_proxy',
          $lib: 'nestjs-proxy',
          $lib_version: '1.0.0'
        }
      }

      // If PostHog is configured, forward the event with retries
      if (this.posthogApiKey) {
        await this.forwardToPostHog(eventPayload)
      }

      // Always log for debugging (structured logging)
      this.logger.log({
        message: 'Analytics event processed',
        event: eventDto.event,
        properties: scrubbedProps,
        timestamp: eventDto.ts
      })

      return { success: true, message: 'Event processed' }
    } catch (error) {
      this.logger.error('Failed to process analytics event', error)
      throw error
    }
  }

  private scrubPII(props: Record<string, unknown>): Record<string, unknown> {
    const scrubbed = { ...props }
    
    // List of PII fields to remove/mask
    const piiFields = [
      'email', 'phone', 'ip', 'user_agent', 'device_id', 
      'session_id', 'telegram_user_id', 'first_name', 'last_name'
    ]
    
    // Remove direct PII
    piiFields.forEach(field => {
      if (field in scrubbed) {
        delete scrubbed[field]
      }
    })
    
    // Hash user identifiers if present
    if (scrubbed.userId) {
      scrubbed.user_hash = this.hashString(String(scrubbed.userId))
      delete scrubbed.userId
    }
    
    return scrubbed
  }

  private async forwardToPostHog(eventPayload: any, retries = 3): Promise<void> {
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
            event: eventPayload.event,
            properties: eventPayload.properties,
            timestamp: eventPayload.properties.timestamp
          })
        })

        if (response.ok) {
          this.logger.debug(`Event forwarded to PostHog: ${eventPayload.event}`)
          return
        } else {
          throw new Error(`PostHog responded with ${response.status}: ${await response.text()}`)
        }
      } catch (error) {
        this.logger.warn(`PostHog forward attempt ${attempt}/${retries} failed:`, error)
        
        if (attempt === retries) {
          throw error
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