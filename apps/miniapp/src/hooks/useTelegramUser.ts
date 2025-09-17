import { useState, useEffect } from 'react'

// Clean TypeScript definitions based on official Telegram WebApp API
interface TelegramUser {
  id: number
  username?: string
  first_name?: string
  last_name?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface TelegramWebApp {
  initData?: string
  initDataUnsafe?: {
    user?: TelegramUser
    start_param?: string
    auth_date?: number
    hash?: string
  }
  version?: string
  platform?: string
  colorScheme?: 'light' | 'dark'
  themeParams?: Record<string, string>
  ready?: () => void
  expand?: () => void
  close?: () => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export interface TelegramUserData {
  id: number
  username?: string
  firstName?: string
  lastName?: string
  fullName: string
  languageCode: string
  avatarUrl?: string
  isPremium?: boolean
  isAvailable: boolean
  isRealTelegramData?: boolean // New field to track if data is from Telegram
}

export function useTelegramUser(): TelegramUserData {
  const [user, setUser] = useState<TelegramUserData>({
    id: 0,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    fullName: '',
    languageCode: 'en',
    avatarUrl: undefined,
    isPremium: false,
    isAvailable: false,
    isRealTelegramData: false
  })

  useEffect(() => {
    console.log('🔍 Telegram WebApp check:', {
      telegramExists: !!window?.Telegram,
      webAppExists: !!window?.Telegram?.WebApp,
      initDataExists: !!window?.Telegram?.WebApp?.initDataUnsafe,
      userExists: !!window?.Telegram?.WebApp?.initDataUnsafe?.user,
      version: window?.Telegram?.WebApp?.version,
      initData: window?.Telegram?.WebApp?.initData
    })

    const webApp = window?.Telegram?.WebApp
    const telegramUser = webApp?.initDataUnsafe?.user
    
    // Check if we have real Telegram data (with initData)
    const hasRealTelegramData = telegramUser && (webApp?.initData || webApp?.initDataUnsafe?.auth_date)

    if (hasRealTelegramData) {
      // Real Telegram user data found
      const fullName = [telegramUser.first_name, telegramUser.last_name]
        .filter(Boolean)
        .join(' ') || telegramUser.username || 'User'

      setUser({
        id: telegramUser.id,
        username: telegramUser.username,
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        fullName,
        languageCode: telegramUser.language_code || 'en',
        avatarUrl: telegramUser.photo_url,
        isPremium: telegramUser.is_premium || false,
        isAvailable: true,
        isRealTelegramData: true
      })

      // Initialize Telegram WebApp
      if (webApp?.ready) webApp.ready()
      if (webApp?.expand) webApp.expand()
      
      console.log('✅ Telegram user loaded:', {
        id: telegramUser.id,
        name: fullName,
        username: telegramUser.username,
        isPremium: telegramUser.is_premium
      })
    } else {
      // Try again after delay in case Telegram WebApp is still loading
      const timer = setTimeout(() => {
        const webAppRetry = window?.Telegram?.WebApp
        const telegramUserRetry = webAppRetry?.initDataUnsafe?.user
        const hasRealTelegramDataRetry = telegramUserRetry && (webAppRetry?.initData || webAppRetry?.initDataUnsafe?.auth_date)
        
        if (hasRealTelegramDataRetry) {
          // Real Telegram user data found on retry
          const fullName = [telegramUserRetry.first_name, telegramUserRetry.last_name]
            .filter(Boolean)
            .join(' ') || telegramUserRetry.username || 'User'

          setUser({
            id: telegramUserRetry.id,
            username: telegramUserRetry.username,
            firstName: telegramUserRetry.first_name,
            lastName: telegramUserRetry.last_name,
            fullName,
            languageCode: telegramUserRetry.language_code || 'en',
            avatarUrl: telegramUserRetry.photo_url,
            isPremium: telegramUserRetry.is_premium || false,
            isAvailable: true,
            isRealTelegramData: true
          })

          console.log('✅ Telegram user loaded on retry:', {
            id: telegramUserRetry.id,
            name: fullName,
            username: telegramUserRetry.username
          })
        } else {
          // Show fallback data in production if no Telegram data is available
          const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production'
          
          if (isProduction) {
            console.log('⚠️ No Telegram user data available in production, using fallback')
            // Show fallback data even in production to ensure UI works
            setUser({
              id: 999999999,
              username: 'telegram_user',
              firstName: 'Telegram',
              lastName: 'User',
              fullName: 'Telegram User',
              languageCode: 'ru',
              avatarUrl: undefined,
              isPremium: false,
              isAvailable: true, // Important: set to true so content shows
              isRealTelegramData: false
            })
          } else {
            // Development fallback only
            console.log('💻 Development fallback activated')
            setUser({
              id: 123456789,
              username: 'developer',
              firstName: 'Dev',
              lastName: 'User',
              fullName: 'Dev User',
              languageCode: 'en',
              avatarUrl: undefined,
              isPremium: false,
              isAvailable: true,
              isRealTelegramData: false
            })
          }
        }
      }, 1000) // Wait 1000ms for Telegram WebApp to load

      return () => clearTimeout(timer)
    }
  }, [])

  return user
}

// Helper functions for Telegram user data
export function getAvatarUrl(user: TelegramUserData): string {
  if (user.avatarUrl) {
    return user.avatarUrl
  }
  
  // Generate initials for fallback
  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}` || user.username?.charAt(0) || 'U'
  
  // Use DiceBear API for avatar generation
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=007AFF&textColor=ffffff`
}

export function getFullName(user: TelegramUserData): string {
  return user.fullName || user.firstName || user.username || 'User'
}

export function getDisplayUsername(user: TelegramUserData): string {
  return user.username ? `@${user.username}` : `User ${user.id}`
}