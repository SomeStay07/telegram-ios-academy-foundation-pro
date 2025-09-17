import { useEffect, useState } from 'react'

// Расширенные типы для Telegram WebApp API
interface TelegramUser {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface TelegramWebApp {
  initData?: string
  initDataUnsafe?: {
    user?: TelegramUser
    auth_date?: number
    hash?: string
  }
  colorScheme?: 'light' | 'dark'
  themeParams?: Record<string, string>
  ready?: () => void
  expand?: () => void
  close?: () => void
  showAlert?: (message: string) => void
  showConfirm?: (message: string, callback?: (confirmed: boolean) => void) => void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export interface ProcessedTelegramUser {
  id: number
  firstName: string
  lastName: string
  username: string
  avatar: string
  isPremium: boolean
  languageCode: string
  isAvailable: boolean
}

export function useTelegramUser(): ProcessedTelegramUser {
  const [telegramUser, setTelegramUser] = useState<ProcessedTelegramUser>({
    id: 0,
    firstName: '',
    lastName: '',
    username: '',
    avatar: '',
    isPremium: false,
    languageCode: 'en',
    isAvailable: false
  })

  useEffect(() => {
    // Функция для обработки реальных данных Telegram
    const processTelegramUser = (user: any) => {
      console.log('🔗 Processing real Telegram user data:', user)
      
      const processedUser: ProcessedTelegramUser = {
        id: user.id,
        firstName: user.first_name || 'Telegram User',
        lastName: user.last_name || '',
        username: user.username || '',
        avatar: user.photo_url || '',
        isPremium: user.is_premium || false,
        languageCode: user.language_code || 'en',
        isAvailable: true
      }
      
      setTelegramUser(processedUser)
      
      console.log('✅ Real Telegram user data loaded:', {
        id: processedUser.id,
        name: `${processedUser.firstName} ${processedUser.lastName}`,
        username: processedUser.username,
        isPremium: processedUser.isPremium,
        hasAvatar: !!processedUser.avatar
      })
    }

    // Проверяем Telegram WebApp API
    const checkTelegramWebApp = () => {
      console.log('🔍 Checking for Telegram WebApp...')
      
      if (window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp
        console.log('📱 Telegram WebApp found:', {
          initData: webApp.initData,
          platform: webApp.platform,
          version: webApp.version,
          user: webApp.initDataUnsafe?.user
        })
        
        if (webApp.initDataUnsafe?.user) {
          processTelegramUser(webApp.initDataUnsafe.user)
        } else {
          console.log('⚠️ Telegram WebApp available but no user data')
          console.log('🔍 This may mean user hasn\'t authorized the bot')
        }
      } else {
        console.log('❌ Telegram WebApp not available')
        console.log('💡 Make sure you\'re opening this from a Telegram Bot WebApp')
      }
    }

    // Проверяем сразу
    checkTelegramWebApp()
    
    // Также проверяем через некоторое время (для медленной загрузки)
    const timeouts = [500, 1000, 2000].map(delay => 
      setTimeout(checkTelegramWebApp, delay)
    )
    
    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return telegramUser
}

// Хелпер для получения аватара с фоллбэком
export function getAvatarUrl(telegramUser: ProcessedTelegramUser): string {
  if (telegramUser.avatar) {
    return telegramUser.avatar
  }
  
  // Генерируем инициалы для фоллбэка
  const initials = `${telegramUser.firstName.charAt(0)}${telegramUser.lastName.charAt(0)}`
  
  // Используем DiceBear API для генерации аватара по инициалам
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=007AFF&textColor=ffffff`
}

// Хелпер для форматирования полного имени
export function getFullName(telegramUser: ProcessedTelegramUser): string {
  if (telegramUser.firstName && telegramUser.lastName) {
    return `${telegramUser.firstName} ${telegramUser.lastName}`
  }
  return telegramUser.firstName || telegramUser.username || 'User'
}

// Хелпер для форматирования имени пользователя
export function getDisplayUsername(telegramUser: ProcessedTelegramUser): string {
  return telegramUser.username ? `@${telegramUser.username}` : `@user${telegramUser.id}`
}