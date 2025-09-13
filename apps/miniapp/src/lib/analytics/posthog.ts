// PostHog трекер - загружается lazy и только в production
// В dev остается console.log

// Интерфейс трекера
interface AnalyticsTracker {
  track(event: string, props?: Record<string, any>): void
  identify(userId: string, traits?: Record<string, any>): void
  init(): Promise<void>
}

export class PostHogTracker implements AnalyticsTracker {
  private posthog: any = null
  private initialized = false

  async init(): Promise<void> {
    if (this.initialized) return

    try {
      // Загружаем PostHog только в production
      if (import.meta.env.PROD && import.meta.env.VITE_POSTHOG_API_KEY) {
        const posthogModule = await import(/* @vite-ignore */ 'posthog-js')
        this.posthog = posthogModule.default

        // Инициализируем PostHog
        this.posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
          api_host: 'https://us.i.posthog.com',
          person_profiles: 'identified_only',
          loaded: (posthog: any) => {
            // Автоматически идентифицируем Telegram пользователя
            this.identifyTelegramUser(posthog)
          }
        })
        
        this.initialized = true
      }
    } catch (error) {
      console.error('Failed to initialize PostHog:', error)
    }
  }

  track(event: string, props?: Record<string, any>): void {
    if (import.meta.env.PROD && this.posthog && this.initialized) {
      // Production: отправляем в PostHog
      this.posthog.capture(event, {
        ...props,
        timestamp: Date.now(),
        source: 'telegram_miniapp'
      })
    } else {
      // Development: console logging
      console.log(`📊 PostHog: ${event}`, props)
    }
  }

  identify(userId: string, traits?: Record<string, any>): void {
    if (import.meta.env.PROD && this.posthog && this.initialized) {
      // Production: идентифицируем в PostHog
      this.posthog.identify(userId, {
        ...traits,
        platform: 'telegram_miniapp'
      })
    } else {
      // Development: console logging
      console.log(`👤 PostHog identify: ${userId}`, traits)
    }
  }

  private identifyTelegramUser(posthog: any): void {
    try {
      const tg = (window as any).Telegram?.WebApp
      if (!tg?.initDataUnsafe?.user) return

      const user = tg.initDataUnsafe.user
      const userId = user.id?.toString()

      if (userId) {
        posthog.identify(userId, {
          telegram_user_id: userId,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          language_code: user.language_code,
          is_premium: user.is_premium,
          platform: 'telegram_miniapp',
          app_version: import.meta.env.VITE_APP_VERSION || 'unknown'
        })

        console.log('👤 Telegram user identified:', userId)
      }
    } catch (error) {
      console.error('Failed to identify Telegram user:', error)
    }
  }
}