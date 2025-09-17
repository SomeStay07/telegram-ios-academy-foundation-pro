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
  const [telegramUser, setTelegramUser] = useState<ProcessedTelegramUser>(() => {
    // Проверяем параметры URL сразу при инициализации
    const urlParams = new URLSearchParams(window.location.search)
    const testTelegram = urlParams.get('test_telegram') === 'true'
    
    if (testTelegram) {
      return {
        id: 12345678,
        firstName: 'Тимур',
        lastName: 'Цебердаев',
        username: 'timur_dev',
        avatar: '',
        isPremium: true,
        languageCode: 'ru',
        isAvailable: true
      }
    }
    
    return {
      id: 0,
      firstName: 'Name',
      lastName: 'Username', 
      username: 'developer',
      avatar: '',
      isPremium: false,
      languageCode: 'en',
      isAvailable: false
    }
  })

  useEffect(() => {
    // Если уже инициализированы с test_telegram, не нужно ничего делать
    const urlParams = new URLSearchParams(window.location.search)
    const testTelegram = urlParams.get('test_telegram') === 'true'
    
    if (testTelegram) {
      console.log('🧪 Test mode already initialized via useState')
      return
    }
    
    const webApp = window.Telegram?.WebApp
    
    if (webApp?.initDataUnsafe?.user) {
      const user = webApp.initDataUnsafe.user
      
      // Обрабатываем данные пользователя
      const processedUser: ProcessedTelegramUser = {
        id: user.id,
        firstName: user.first_name || 'Name',
        lastName: user.last_name || 'Username',
        username: user.username || 'developer',
        avatar: user.photo_url || '',
        isPremium: user.is_premium || false,
        languageCode: user.language_code || 'en',
        isAvailable: true
      }
      
      setTelegramUser(processedUser)
      
      console.log('🔗 Telegram user data loaded:', {
        id: processedUser.id,
        name: `${processedUser.firstName} ${processedUser.lastName}`,
        username: processedUser.username,
        isPremium: processedUser.isPremium,
        hasAvatar: !!processedUser.avatar
      })
    } else {
      console.log('📱 Running outside Telegram WebApp - using mock data')
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