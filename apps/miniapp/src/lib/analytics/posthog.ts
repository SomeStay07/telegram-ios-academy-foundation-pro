// PostHog analytics tracker with lazy loading
import type { AnalyticsTracker, AnalyticsEvent, AnalyticsProps } from './types'

export class PostHogTracker implements AnalyticsTracker {
  private posthog: any = null

  async init(): Promise<void> {
    // Only load PostHog in production with API key
    if (import.meta.env.PROD && import.meta.env.VITE_POSTHOG_API_KEY) {
      try {
        // Lazy load PostHog SDK
        const posthogModule = await import('posthog-js')
        this.posthog = posthogModule.default

        // Initialize PostHog
        this.posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
          api_host: 'https://us.i.posthog.com',
          loaded: (posthog: any) => {
            // Identify user with Telegram data if available
            const tgWebApp = window.Telegram?.WebApp
            if (tgWebApp?.initDataUnsafe?.user) {
              posthog.identify(tgWebApp.initDataUnsafe.user.id.toString(), {
                first_name: tgWebApp.initDataUnsafe.user.first_name,
                last_name: tgWebApp.initDataUnsafe.user.last_name,
                username: tgWebApp.initDataUnsafe.user.username,
                is_premium: tgWebApp.initDataUnsafe.user.is_premium
              })
            }
          }
        })
      } catch (error) {
        console.error('Failed to initialize PostHog:', error)
      }
    }
  }

  track(event: AnalyticsEvent, props?: AnalyticsProps): void {
    if (this.posthog) {
      this.posthog.capture(event, props)
    }
  }
}