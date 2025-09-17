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
    isAvailable: false
  })

  useEffect(() => {
    const webApp = window?.Telegram?.WebApp
    const telegramUser = webApp?.initDataUnsafe?.user

    if (telegramUser) {
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
        isAvailable: true
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
      // Fallback for development or missing data
      const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development'
      
      if (isDevelopment) {
        // Provide development fallback after short delay
        const timer = setTimeout(() => {
          setUser({
            id: 123456789,
            username: 'developer',
            firstName: 'Local',
            lastName: 'Developer',
            fullName: 'Local Developer',
            languageCode: 'en',
            avatarUrl: undefined,
            isPremium: false,
            isAvailable: true // Available in dev mode
          })
        }, 100)

        return () => clearTimeout(timer)
      } else {
        console.log('❌ No Telegram user data available')
      }
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