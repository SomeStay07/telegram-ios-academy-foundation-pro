import { useState, useEffect } from 'react'

export interface TelegramUser {
  id: number
  username?: string
  firstName?: string
  lastName?: string
  fullName: string
  languageCode: string
  avatarUrl?: string
  isPremium?: boolean
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
        firstName: telegramUser.first_name,
        lastName: telegramUser.last_name,
        fullName,
        languageCode: telegramUser.language_code || 'en',
        avatarUrl: telegramUser.photo_url,
        isPremium: telegramUser.is_premium,
      })
    } else {
      // Fallback user data for cases where Telegram data is not available
      const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development'
      
      // Provide fallback user after a short delay to allow Telegram to load
      const timer = setTimeout(() => {
        setUser({
          id: isDevelopment ? 123456789 : 999999999,
          username: isDevelopment ? 'developer' : 'telegram_user',
          firstName: isDevelopment ? 'Local' : 'Telegram',
          lastName: isDevelopment ? 'Developer' : 'User',
          fullName: isDevelopment ? 'Local Developer' : 'Telegram User',
          languageCode: 'en',
          avatarUrl: undefined, // Will show fallback initials
          isPremium: false,
        })
      }, isDevelopment ? 100 : 1000) // Shorter delay in dev, longer in production

      return () => clearTimeout(timer)
    }
  }, [])

  return user
}