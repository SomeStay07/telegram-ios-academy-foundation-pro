// Proxy analytics tracker - sends events to /api/events
import type { AnalyticsTracker, AnalyticsEvent, AnalyticsProps } from './types'

export class ProxyTracker implements AnalyticsTracker {
  async init(): Promise<void> {
    // No SDK to initialize for proxy mode
  }

  track(event: AnalyticsEvent, props?: AnalyticsProps): void {
    // Send to our backend proxy endpoint
    const payload = {
      event,
      props: props || {},
      ts: Date.now()
    }

    // Use sendBeacon for better reliability, fallback to fetch
    if (navigator.sendBeacon) {
      try {
        navigator.sendBeacon('/api/events', JSON.stringify(payload))
        return
      } catch (error) {
        console.warn('sendBeacon failed, falling back to fetch:', error)
      }
    }

    // Fallback to fetch with keepalive
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(error => {
      console.error('Analytics proxy request failed:', error)
    })
  }
}