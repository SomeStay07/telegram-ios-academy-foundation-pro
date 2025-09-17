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
    const testUser = urlParams.get('test_user') // для разных тестовых пользователей
    
    if (testTelegram) {
      // Разные тестовые пользователи
      if (testUser === 'john') {
        return {
          id: 87654321,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_developer',
          avatar: '',
          isPremium: false,
          languageCode: 'en',
          isAvailable: true
        }
      } else if (testUser === 'anna') {
        return {
          id: 11223344,
          firstName: 'Anna',
          lastName: 'Smith',
          username: 'anna_swift',
          avatar: '',
          isPremium: true,
          languageCode: 'en',
          isAvailable: true
        }
      } else {
        // Дефолтный тестовый пользователь
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
    
    // Подробная диагностика Telegram WebApp
    const debugInfo = {
      hasTelegram: !!window.Telegram,
      hasWebApp: !!window.Telegram?.WebApp,
      webApp: window.Telegram?.WebApp,
      initData: window.Telegram?.WebApp?.initData,
      initDataUnsafe: window.Telegram?.WebApp?.initDataUnsafe,
      user: window.Telegram?.WebApp?.initDataUnsafe?.user,
      userAgent: navigator.userAgent,
      url: window.location.href
    }
    
    console.log('🔍 Telegram WebApp Debug Info:', debugInfo)
    
    
    const webApp = window.Telegram?.WebApp
    
    // Проверяем есть ли настоящие или mock данные
    if (webApp?.initDataUnsafe?.user) {
      const user = webApp.initDataUnsafe.user
      
      console.log('🔗 Raw Telegram user data:', user)
      
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
      // Проверяем, находимся ли мы в настоящем Telegram WebApp контексте
      const isInTelegram = !!(window.Telegram?.WebApp?.initData || window.Telegram?.WebApp?.platform)
      
      console.log('📱 Running outside Telegram WebApp - using fallback data')
      console.log('📱 Detailed analysis:', {
        windowTelegram: window.Telegram,
        webAppExists: !!window.Telegram?.WebApp,
        initDataUnsafeExists: !!window.Telegram?.WebApp?.initDataUnsafe,
        userExists: !!window.Telegram?.WebApp?.initDataUnsafe?.user,
        initData: window.Telegram?.WebApp?.initData,
        platform: window.Telegram?.WebApp?.platform,
        isInTelegram,
        userAgent: navigator.userAgent,
        url: window.location.href
      })
      
      // Проверяем WebView Proxy (Telegram Desktop)
      const hasWebViewProxy = !!(window as any).TelegramWebviewProxy
      
      if (isInTelegram || hasWebViewProxy) {
        console.log('⚠️ App is running in Telegram context but WebApp API is not available')
        console.log('🔍 This usually means:')
        console.log('  1. URL not registered as Web App in BotFather')
        console.log('  2. Using WebView instead of proper WebApp')
        console.log('  3. Telegram Desktop limitations')
        
        // Для Telegram Desktop WebView используем fallback данные
        setTelegramUser({
          id: 999888777,
          firstName: 'Telegram',
          lastName: 'Desktop User',
          username: 'tg_desktop',
          avatar: '',
          isPremium: false,
          languageCode: 'en',
          isAvailable: true // Считаем доступным для WebView
        })
      } else {
        // Обычный браузер - предлагаем тестовый режим
        console.log('💡 To test with mock Telegram data, add ?test_telegram=true to URL')
        console.log('💡 Available test users: ?test_telegram=true&test_user=john or anna')
      }
      
      // Попробуем подождать немного и проверить снова (для случаев медленной загрузки Telegram)
      const timeoutId = setTimeout(() => {
        const laterWebApp = window.Telegram?.WebApp
        console.log('🔄 Checking Telegram WebApp after delay:', {
          hasWebApp: !!laterWebApp,
          hasInitData: !!laterWebApp?.initDataUnsafe,
          hasUser: !!laterWebApp?.initDataUnsafe?.user,
          webApp: laterWebApp
        })
        
        if (laterWebApp?.initDataUnsafe?.user) {
          const user = laterWebApp.initDataUnsafe.user
          console.log('🔗 Found delayed Telegram user data:', user)
          
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
          
          console.log('🔗 Delayed Telegram user data loaded:', {
            id: processedUser.id,
            name: `${processedUser.firstName} ${processedUser.lastName}`,
            username: processedUser.username,
            isPremium: processedUser.isPremium
          })
        }
      }, 1000)
      
      return () => clearTimeout(timeoutId)
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