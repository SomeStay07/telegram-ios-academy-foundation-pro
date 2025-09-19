/**
 * Telemetry/Analytics adapter
 * 
 * Light wrapper for tracking events
 */

interface TelemetryEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: number
}

class TelemetryAdapter {
  private enabled: boolean = true
  private events: TelemetryEvent[] = []

  constructor() {
    // Disable in development unless explicitly enabled
    this.enabled = import.meta.env.PROD || import.meta.env.VITE_ENABLE_TELEMETRY === 'true'
  }

  /**
   * Track a telemetry event
   */
  track(eventName: string, properties: Record<string, any> = {}): void {
    if (!this.enabled) {
      console.log(`[Telemetry] ${eventName}`, properties)
      return
    }

    const event: TelemetryEvent = {
      name: eventName,
      properties: {
        ...properties,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href
      },
      timestamp: Date.now()
    }

    this.events.push(event)
    
    // In production, you'd send this to your analytics service
    this.sendEvent(event)
  }

  /**
   * Send event to analytics service
   */
  private async sendEvent(event: TelemetryEvent): Promise<void> {
    try {
      // Example: send to your analytics endpoint
      const apiUrl = import.meta.env.VITE_API_BASE_URL
      if (apiUrl) {
        await fetch(`${apiUrl}/analytics/events`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(event)
        }).catch(() => {
          // Fail silently for analytics
        })
      }
    } catch (error) {
      // Fail silently for analytics
      console.debug('Analytics event failed:', error)
    }
  }

  /**
   * Get tracked events (for debugging)
   */
  getEvents(): TelemetryEvent[] {
    return [...this.events]
  }

  /**
   * Clear events history
   */
  clearEvents(): void {
    this.events = []
  }

  /**
   * Enable/disable telemetry
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }
}

// Create singleton instance
export const telemetry = new TelemetryAdapter()

// Convenience functions for specific events
export const trackProfileOpened = (source: 'verified' | 'telegramless') => {
  telemetry.track('profile_opened', { source })
}

export const trackAuthVerifySuccess = () => {
  telemetry.track('auth_verify_success')
}

export const trackAuthVerifyFailed = (reason: 'invalid_signature' | 'expired' | 'network') => {
  telemetry.track('auth_verify_failed', { reason })
}

export const trackProfileRendered = (hasPhoto: boolean) => {
  telemetry.track('profile_rendered', { has_photo: hasPhoto })
}

// Default export
export default telemetry