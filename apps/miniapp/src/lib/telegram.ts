/**
 * Telegram WebApp SDK Wrapper
 * 
 * Мини-SDK обёртка для работы с Telegram WebApp API
 */

// Types from Telegram WebApp API
export interface WebAppInitData {
  user?: {
    id: number
    first_name?: string
    last_name?: string
    username?: string
    language_code?: string
    photo_url?: string
    is_premium?: boolean
  }
  chat?: {
    id: number
    type: string
  }
  auth_date: number
  hash: string
}

export interface TelegramUser {
  id: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
}

// Global types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready(): void
        expand(): void
        initData: string
        initDataUnsafe: WebAppInitData
        version: string
        platform: string
      }
    }
  }
}

class TelegramSDK {
  private isReady = false
  private readyPromise: Promise<void> | null = null

  /**
   * Ensures Telegram WebApp is ready
   * Вызывает WebApp.ready() единожды, обрабатывает отсутствие window.Telegram
   */
  async ensureReady(): Promise<void> {
    if (this.isReady) {
      return Promise.resolve()
    }

    if (this.readyPromise) {
      return this.readyPromise
    }

    this.readyPromise = new Promise<void>((resolve, reject) => {
      // Check if Telegram WebApp is available
      if (!window.Telegram?.WebApp) {
        reject(new Error('Telegram WebApp not available'))
        return
      }

      try {
        // Initialize WebApp
        window.Telegram.WebApp.ready()
        window.Telegram.WebApp.expand()
        
        this.isReady = true
        resolve()
      } catch (error) {
        reject(new Error(`Failed to initialize Telegram WebApp: ${error}`))
      }
    })

    return this.readyPromise
  }

  /**
   * Get Telegram init data
   * Возвращает строку initData и объект initDataUnsafe после ensureReady()
   */
  async getInitData(): Promise<{ raw: string | null, unsafe: WebAppInitData | null }> {
    try {
      await this.ensureReady()
      
      const webApp = window.Telegram?.WebApp
      if (!webApp) {
        return { raw: null, unsafe: null }
      }

      return {
        raw: webApp.initData || null,
        unsafe: webApp.initDataUnsafe || null
      }
    } catch (error) {
      console.warn('Failed to get Telegram init data:', error)
      return { raw: null, unsafe: null }
    }
  }

  /**
   * Get user from unsafe init data
   * Возвращает пользователя из initDataUnsafe
   */
  async getUserFromUnsafe(): Promise<TelegramUser | null> {
    try {
      const { unsafe } = await this.getInitData()
      
      if (!unsafe?.user) {
        return null
      }

      const user = unsafe.user
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        photo_url: user.photo_url
      }
    } catch (error) {
      console.warn('Failed to get user from Telegram:', error)
      return null
    }
  }

  /**
   * Check if Telegram WebApp is available
   */
  isAvailable(): boolean {
    return !!(window.Telegram?.WebApp)
  }

  /**
   * Get WebApp info
   */
  getWebAppInfo() {
    const webApp = window.Telegram?.WebApp
    if (!webApp) return null

    return {
      version: webApp.version,
      platform: webApp.platform,
      isAvailable: true
    }
  }
}

// Singleton instance
export const telegram = new TelegramSDK()

// Default export
export default telegram