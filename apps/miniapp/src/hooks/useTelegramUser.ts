import { useEffect, useState } from 'react'

// 🎯 ОФИЦИАЛЬНЫЕ типы Telegram WebApp API (2025)
interface TelegramWebAppUser {
  id: number
  is_bot?: boolean
  first_name: string
  last_name?: string
  username?: string
  language_code?: string
  is_premium?: boolean
  photo_url?: string
}

interface TelegramWebAppInitDataUnsafe {
  user?: TelegramWebAppUser
  auth_date?: number
  query_id?: string
  hash?: string
}

interface TelegramWebApp {
  initData: string  // RAW данные для валидации
  initDataUnsafe: TelegramWebAppInitDataUnsafe  // Распарсенные данные (небезопасные)
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: Record<string, string>
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  ready(): void
  expand(): void
  close(): void
  showAlert(message: string): void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
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
  rawInitData: string  // Для валидации на бэкенде
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
    isAvailable: false,
    rawInitData: ''
  })

  useEffect(() => {
    console.log('🚀 Starting REAL Telegram WebApp integration...')
    
    const loadRealTelegramData = () => {
      // Проверяем доступность Telegram WebApp
      if (!window.Telegram?.WebApp) {
        console.log('❌ window.Telegram.WebApp not found')
        console.log('🔍 Available objects:', Object.keys(window).filter(k => k.toLowerCase().includes('telegram')))
        return false
      }

      const tg = window.Telegram.WebApp
      
      // Инициализируем WebApp
      tg.ready()
      tg.expand()
      
      console.log('📱 Telegram WebApp initialized:', {
        version: tg.version,
        platform: tg.platform,
        colorScheme: tg.colorScheme,
        hasInitData: !!tg.initData,
        initDataLength: tg.initData?.length || 0,
        hasUser: !!tg.initDataUnsafe?.user
      })

      // Проверяем наличие пользователя
      if (!tg.initDataUnsafe?.user) {
        console.log('❌ No user data in initDataUnsafe')
        console.log('🔍 initDataUnsafe contents:', tg.initDataUnsafe)
        console.log('🔍 Raw initData:', tg.initData)
        console.log('🔍 Raw initData length:', tg.initData?.length || 0)
        
        // Проверяем, есть ли хотя бы initData
        if (tg.initData && tg.initData.length > 0) {
          console.log('⚠️ InitData exists but no user object - user may need to authorize bot')
          console.log('💡 User needs to start the bot first: /start in bot chat')
        } else {
          console.log('❌ No initData at all - not opened from Telegram WebApp')
        }
        
        return false
      }

      const user = tg.initDataUnsafe.user
      
      console.log('✅ REAL user data found:', {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        language_code: user.language_code,
        is_premium: user.is_premium,
        photo_url: user.photo_url
      })

      // Создаём обработанные данные пользователя
      const processedUser: ProcessedTelegramUser = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name || '',
        username: user.username || '',
        avatar: user.photo_url || '',
        isPremium: user.is_premium || false,
        languageCode: user.language_code || 'en',
        isAvailable: true,
        rawInitData: tg.initData
      }

      setTelegramUser(processedUser)
      
      console.log('🎉 REAL Telegram user loaded successfully:', {
        name: `${processedUser.firstName} ${processedUser.lastName}`.trim(),
        username: processedUser.username ? `@${processedUser.username}` : 'No username',
        isPremium: processedUser.isPremium,
        hasAvatar: !!processedUser.avatar,
        dataSize: processedUser.rawInitData.length
      })
      
      return true
    }

    // Пробуем загрузить данные сразу
    const success = loadRealTelegramData()
    
    if (!success) {
      // Если не получилось, пробуем ещё несколько раз
      const retryIntervals = [100, 300, 500, 1000, 2000]
      const timeouts = retryIntervals.map((delay, index) => 
        setTimeout(() => {
          console.log(`🔄 Retry attempt ${index + 1}/${retryIntervals.length}`)
          loadRealTelegramData()
        }, delay)
      )
      
      return () => {
        timeouts.forEach(clearTimeout)
      }
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