// No-op analytics tracker for default behavior
import type { AnalyticsTracker, AnalyticsEvent, AnalyticsProps } from './types'

export class NoOpTracker implements AnalyticsTracker {
  async init(): Promise<void> {
    // No-op initialization
  }

  track(event: AnalyticsEvent, props?: AnalyticsProps): void {
    // No-op tracking - useful for development/testing
    console.debug(`[Analytics] ${event}`, props)
  }
}