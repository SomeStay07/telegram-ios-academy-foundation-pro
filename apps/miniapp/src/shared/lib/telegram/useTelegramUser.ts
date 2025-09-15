import { useState, useEffect } from 'react'

export interface TelegramUser {
  id: number
  username?: string
  fullName: string
  languageCode: string
  avatarUrl?: string
}

export function useTelegramUser(): TelegramUser | null {
  const [user, setUser] = useState<TelegramUser | null>(null)

  useEffect(() => {
    const webApp = (window as any)?.Telegram?.WebApp
    const telegramUser = webApp?.initDataUnsafe?.user

    if (telegramUser) {
      const fullName = [telegramUser.first_name, telegramUser.last_name]
        .filter(Boolean)
        .join(' ') || telegramUser.username || 'User'

      setUser({
        id: telegramUser.id,
        username: telegramUser.username,
        fullName,
        languageCode: telegramUser.language_code || 'en',
        avatarUrl: telegramUser.photo_url,
      })
    } else {
      // Mock data for local development
      const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development'
      
      if (isDevelopment) {
        setUser({
          id: 123456789,
          username: 'developer',
          fullName: 'Local Developer',
          languageCode: 'en',
          avatarUrl: undefined, // Will show fallback initials
        })
      }
    }
  }, [])

  return user
}