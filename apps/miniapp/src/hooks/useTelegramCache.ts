import { useMemo } from 'react'
import { getTelegramApi } from '../lib/telegram/api'

/**
 * Telegram-specific caching hooks
 * Follows Performance Guidelines for Telegram Mini App optimization
 */

/**
 * Cache Telegram user data in sessionStorage
 */
export const useTelegramDataCache = () => {
  const telegramApi = getTelegramApi()
  
  const userData = useMemo(() => {
    try {
      // Try to get cached data first
      const cached = sessionStorage.getItem('telegram-user-data')
      if (cached) {
        return JSON.parse(cached)
      }
      
      // Get fresh data from Telegram API
      const user = telegramApi.getWebApp()?.initDataUnsafe?.user
      if (user) {
        sessionStorage.setItem('telegram-user-data', JSON.stringify(user))
        return user
      }
      
      return null
    } catch (error) {
      console.warn('Failed to cache Telegram user data:', error)
      return telegramApi.getWebApp()?.initDataUnsafe?.user || null
    }
  }, [telegramApi])

  return userData
}

/**
 * Cache Telegram theme settings in localStorage
 */
export const useTelegramThemeCache = () => {
  const telegramApi = getTelegramApi()
  
  const theme = useMemo(() => {
    try {
      // Try to get cached theme first
      const cached = localStorage.getItem('telegram-theme')
      if (cached) {
        return cached
      }
      
      // Get fresh theme from Telegram API
      const telegramTheme = telegramApi.getWebApp()?.colorScheme || 'light'
      localStorage.setItem('telegram-theme', telegramTheme)
      return telegramTheme
    } catch (error) {
      console.warn('Failed to cache Telegram theme:', error)
      return telegramApi.getWebApp()?.colorScheme || 'light'
    }
  }, [telegramApi])

  return theme
}

/**
 * Cache Telegram WebApp initialization data
 */
export const useTelegramInitDataCache = () => {
  const telegramApi = getTelegramApi()
  
  const initData = useMemo(() => {
    try {
      const cached = sessionStorage.getItem('telegram-init-data')
      if (cached) {
        return JSON.parse(cached)
      }
      
      const webApp = telegramApi.getWebApp()
      const data = {
        platform: webApp?.platform,
        version: webApp?.version,
        isExpanded: webApp?.isExpanded,
        viewportHeight: webApp?.viewportHeight,
        viewportStableHeight: webApp?.viewportStableHeight
      }
      
      sessionStorage.setItem('telegram-init-data', JSON.stringify(data))
      return data
    } catch (error) {
      console.warn('Failed to cache Telegram init data:', error)
      return null
    }
  }, [telegramApi])

  return initData
}