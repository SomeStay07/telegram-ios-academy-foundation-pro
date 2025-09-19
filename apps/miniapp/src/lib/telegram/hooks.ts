/**
 * 🎣 Telegram WebApp React Hooks
 * 
 * Набор React хуков для работы с Telegram WebApp API
 * Предоставляет reactive интерфейс для всех функций API
 */

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getTelegramApi } from './api'
import type { 
  TelegramUser, 
  TelegramThemeParams, 
  TelegramEnvironmentInfo,
  TelegramWebApp
} from './types'

// === CORE HOOKS ===

/**
 * Хук для получения информации об окружении Telegram
 */
export function useTelegramEnvironment(): TelegramEnvironmentInfo {
  return useMemo(() => {
    const api = getTelegramApi()
    return api.getEnvironment()
  }, [])
}

/**
 * Хук для проверки доступности Telegram API
 */
export function useTelegramAvailable(): boolean {
  return useMemo(() => {
    const api = getTelegramApi()
    return api.isAvailable()
  }, [])
}

/**
 * Хук для получения прямого доступа к WebApp API
 * Используется для продвинутых случаев
 */
export function useTelegramWebApp(): TelegramWebApp | null {
  return useMemo(() => {
    const api = getTelegramApi()
    return api.getWebApp()
  }, [])
}

// === USER HOOKS ===

/**
 * Хук для получения данных пользователя Telegram
 * @throws {Error} Если данные недоступны
 */
export function useTelegramUser(): TelegramUser {
  return useMemo(() => {
    const api = getTelegramApi()
    return api.getUser()
  }, [])
}

/**
 * Безопасный хук для получения данных пользователя
 * Возвращает null если данные недоступны
 */
export function useTelegramUserSafe(): TelegramUser | null {
  return useMemo(() => {
    try {
      const api = getTelegramApi()
      return api.hasUser() ? api.getUser() : null
    } catch {
      return null
    }
  }, [])
}

/**
 * Хук для получения удобных helpers для пользователя
 */
export function useTelegramUserHelpers() {
  const user = useTelegramUserSafe()
  
  return useMemo(() => {
    if (!user) {
      return {
        user: null,
        displayName: null,
        username: null,
        avatarUrl: null,
        isAvailable: false
      }
    }
    
    const displayName = user.last_name 
      ? `${user.first_name} ${user.last_name}` 
      : user.first_name
    
    const username = user.username ? `@${user.username}` : null
    
    // Генерируем avatar URL если нет фото
    const avatarUrl = user.photo_url || (() => {
      const initials = `${user.first_name.charAt(0)}${user.last_name?.charAt(0) || ''}`
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=6366f1&textColor=ffffff`
    })()
    
    return {
      user,
      displayName,
      username,
      avatarUrl,
      isAvailable: true
    }
  }, [user])
}

// === THEME HOOKS ===

/**
 * Хук для получения текущей темы
 */
export function useTelegramTheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark')
  const [themeParams, setThemeParams] = useState<TelegramThemeParams>({})
  
  useEffect(() => {
    const api = getTelegramApi()
    
    // Устанавливаем начальные значения
    setColorScheme(api.getColorScheme())
    setThemeParams(api.getThemeParams())
    
    // Подписываемся на изменения темы (только для реального Telegram)
    const webApp = api.getWebApp()
    if (webApp) {
      const handleThemeChanged = () => {
        setColorScheme(api.getColorScheme())
        setThemeParams(api.getThemeParams())
      }
      
      webApp.onEvent('themeChanged', handleThemeChanged)
      
      return () => {
        webApp.offEvent('themeChanged', handleThemeChanged)
      }
    }
  }, [])
  
  return { colorScheme, themeParams }
}

/**
 * Хук для CSS переменных темы Telegram
 */
export function useTelegramThemeCssVars(): Record<string, string> {
  const { themeParams } = useTelegramTheme()
  
  return useMemo(() => {
    const cssVars: Record<string, string> = {}
    
    // Преобразуем параметры темы в CSS переменные
    Object.entries(themeParams).forEach(([key, value]) => {
      if (value) {
        cssVars[`--tg-theme-${key.replace(/_/g, '-')}`] = value
      }
    })
    
    return cssVars
  }, [themeParams])
}

// === HAPTIC HOOKS ===

/**
 * Хук для haptic feedback
 */
export function useTelegramHaptic() {
  const api = useMemo(() => getTelegramApi(), [])
  
  return useMemo(() => ({
    /**
     * Вибрация при изменении выбора (например, переключение табов)
     */
    selectionChanged: () => api.hapticSelectionChanged(),
    
    /**
     * Вибрация при уведомлении
     */
    notification: (type: 'error' | 'success' | 'warning') => api.hapticNotification(type),
    
    /**
     * Вибрация при воздействии
     */
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => api.hapticImpact(style)
  }), [api])
}

// === NAVIGATION HOOKS ===

/**
 * Хук для навигационных действий
 */
export function useTelegramNavigation() {
  const api = useMemo(() => getTelegramApi(), [])
  
  return useMemo(() => ({
    /**
     * Закрывает WebApp
     */
    close: () => api.close(),
    
    /**
     * Открывает ссылку
     */
    openLink: (url: string, options?: { try_instant_view?: boolean }) => 
      api.openLink(url, options),
    
    /**
     * Открывает Telegram ссылку
     */
    openTelegramLink: (url: string) => api.openTelegramLink(url)
  }), [api])
}

// === UI CONTROL HOOKS ===

/**
 * Хук для управления главной кнопкой
 */
export function useTelegramMainButton() {
  const api = useMemo(() => getTelegramApi(), [])
  
  return useMemo(() => ({
    /**
     * Показывает главную кнопку
     */
    show: (text: string, onClick: () => void) => api.showMainButton(text, onClick),
    
    /**
     * Скрывает главную кнопку
     */
    hide: () => api.hideMainButton()
  }), [api])
}

/**
 * Хук для управления кнопкой назад
 */
export function useTelegramBackButton() {
  const api = useMemo(() => getTelegramApi(), [])
  
  return useMemo(() => ({
    /**
     * Показывает кнопку назад
     */
    show: (onClick: () => void) => api.showBackButton(onClick),
    
    /**
     * Скрывает кнопку назад
     */
    hide: () => api.hideBackButton()
  }), [api])
}

// === POPUP HOOKS ===

/**
 * Хук для показа всплывающих окон
 */
export function useTelegramPopups() {
  const api = useMemo(() => getTelegramApi(), [])
  
  return useMemo(() => ({
    /**
     * Показывает кастомное всплывающее окно
     */
    showPopup: (
      message: string, 
      title?: string, 
      buttons?: Array<{ id?: string; type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'; text?: string }>
    ) => api.showPopup(message, title, buttons),
    
    /**
     * Показывает простое уведомление
     */
    showAlert: (message: string) => api.showAlert(message),
    
    /**
     * Показывает диалог подтверждения
     */
    showConfirm: (message: string) => api.showConfirm(message)
  }), [api])
}

// === VIEWPORT HOOKS ===

/**
 * Хук для отслеживания изменений viewport
 */
export function useTelegramViewport() {
  const [viewportHeight, setViewportHeight] = useState<number>(window.innerHeight)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  
  useEffect(() => {
    const api = getTelegramApi()
    const webApp = api.getWebApp()
    
    if (webApp) {
      // Устанавливаем начальные значения
      setViewportHeight(webApp.viewportHeight)
      setIsExpanded(webApp.isExpanded)
      
      // Подписываемся на изменения viewport
      const handleViewportChanged = () => {
        setViewportHeight(webApp.viewportHeight)
        setIsExpanded(webApp.isExpanded)
      }
      
      webApp.onEvent('viewportChanged', handleViewportChanged)
      
      return () => {
        webApp.offEvent('viewportChanged', handleViewportChanged)
      }
    }
  }, [])
  
  return { viewportHeight, isExpanded }
}

// === COMPOUND HOOKS ===

/**
 * Главный хук, объединяющий все основные функции Telegram
 */
export function useTelegram() {
  const environment = useTelegramEnvironment()
  const userHelpers = useTelegramUserHelpers()
  const theme = useTelegramTheme()
  const haptic = useTelegramHaptic()
  const navigation = useTelegramNavigation()
  const popups = useTelegramPopups()
  const viewport = useTelegramViewport()
  
  return {
    // Environment
    ...environment,
    
    // User
    user: userHelpers.user,
    displayName: userHelpers.displayName,
    username: userHelpers.username,
    avatarUrl: userHelpers.avatarUrl,
    isUserAvailable: userHelpers.isAvailable,
    
    // Theme
    colorScheme: theme.colorScheme,
    themeParams: theme.themeParams,
    
    // Actions
    haptic,
    navigation,
    popups,
    
    // Viewport
    viewportHeight: viewport.viewportHeight,
    isExpanded: viewport.isExpanded
  }
}