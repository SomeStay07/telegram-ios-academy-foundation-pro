import React, { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@telegram-ios-academy/ui'

type Theme = 'light' | 'dark' | 'system'

// Global theme state
let globalTheme: Theme = 'system'
let globalResolvedTheme: 'light' | 'dark' = 'light'
const themeListeners: Array<() => void> = []

const notifyListeners = () => {
  themeListeners.forEach(listener => listener())
}

const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement
  const body = document.body

  // Удаляем все текущие классы темы
  root.classList.remove('light', 'dark')
  body.classList.remove('light', 'dark')
  root.removeAttribute('data-theme')

  let resolvedTheme: 'light' | 'dark'

  if (newTheme === 'system') {
    resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  } else {
    resolvedTheme = newTheme
  }

  // Применяем классы и атрибуты
  root.classList.add(resolvedTheme)
  body.classList.add(resolvedTheme)
  root.setAttribute('data-theme', resolvedTheme)

  // Обновляем CSS переменные для лучшей совместимости с высокой контрастностью
  if (resolvedTheme === 'light') {
    root.style.setProperty('--background', '#ffffff')
    root.style.setProperty('--foreground', '#111827') // Более темный текст
    root.style.setProperty('--muted-foreground', '#6b7280') // Более контрастный приглушенный текст
    root.style.setProperty('--card', '#ffffff')
    root.style.setProperty('--card-foreground', '#111827')
    root.style.setProperty('--border', '#e5e7eb')
    root.style.setProperty('--primary', '#2563eb')
    root.style.setProperty('--primary-foreground', '#ffffff')
    root.style.setProperty('--secondary', '#f3f4f6')
    root.style.setProperty('--secondary-foreground', '#111827')
    root.style.setProperty('--accent', '#f59e0b')
    root.style.setProperty('--accent-foreground', '#ffffff')
    root.style.setProperty('--destructive', '#dc2626')
    root.style.setProperty('--destructive-foreground', '#ffffff')
    root.style.setProperty('--muted', '#f9fafb')
    root.style.setProperty('--popover', '#ffffff')
    root.style.setProperty('--popover-foreground', '#111827')
  } else {
    root.style.setProperty('--background', '#0f172a')
    root.style.setProperty('--foreground', '#f8fafc')
    root.style.setProperty('--muted-foreground', '#94a3b8')
    root.style.setProperty('--card', '#1e293b')
    root.style.setProperty('--card-foreground', '#f8fafc')
    root.style.setProperty('--border', '#334155')
    root.style.setProperty('--primary', '#3b82f6')
    root.style.setProperty('--primary-foreground', '#f8fafc')
    root.style.setProperty('--secondary', '#1e293b')
    root.style.setProperty('--secondary-foreground', '#f8fafc')
    root.style.setProperty('--accent', '#f59e0b')
    root.style.setProperty('--accent-foreground', '#0f172a')
    root.style.setProperty('--destructive', '#ef4444')
    root.style.setProperty('--destructive-foreground', '#f8fafc')
    root.style.setProperty('--muted', '#1e293b')
    root.style.setProperty('--popover', '#1e293b')
    root.style.setProperty('--popover-foreground', '#f8fafc')
  }

  // Сохраняем в localStorage
  localStorage.setItem('theme', newTheme)
  globalTheme = newTheme
  globalResolvedTheme = resolvedTheme
  
  notifyListeners()

  // Notify Telegram WebApp if available
  const tg = (window as any)?.Telegram?.WebApp
  if (tg?.setHeaderColor) {
    const headerColor = resolvedTheme === 'light' ? '#ffffff' : '#000000'
    tg.setHeaderColor(headerColor)
  }
}

interface ThemeToggleProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function ThemeToggle({ className, size = 'md' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(globalTheme)
  const [, forceUpdate] = useState({})

  useEffect(() => {
    // Инициализация темы
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    globalTheme = savedTheme
    setTheme(savedTheme)
    applyTheme(savedTheme)

    // Подписка на изменения
    const listener = () => {
      setTheme(globalTheme)
      forceUpdate({})
    }
    themeListeners.push(listener)

    // Слушаем системные изменения темы
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (globalTheme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      const index = themeListeners.indexOf(listener)
      if (index > -1) {
        themeListeners.splice(index, 1)
      }
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
    
    // Haptic feedback
    const tg = (window as any)?.Telegram?.WebApp
    if (tg?.HapticFeedback?.selectionChanged) {
      tg.HapticFeedback.selectionChanged()
    }
  }

  const getIcon = (themeType: Theme) => {
    switch (themeType) {
      case 'light':
        return <Sun className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      case 'dark':
        return <Moon className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      case 'system':
        return <Monitor className={`${size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
    }
  }

  const themes: Theme[] = ['light', 'dark', 'system']

  return (
    <div className={`flex bg-muted/50 rounded-lg p-1 backdrop-blur-sm ${className}`}>
      {themes.map((themeType) => (
        <Button
          key={themeType}
          variant="ghost"
          size={size}
          onClick={() => handleThemeChange(themeType)}
          className={`flex items-center gap-2 px-3 py-2 transition-all duration-300 ${
            theme === themeType
              ? 'bg-background text-foreground shadow-sm scale-105'
              : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
          }`}
        >
          {getIcon(themeType)}
          <span className="hidden sm:inline text-xs font-medium">
            {themeType === 'light' && 'Светлая'}
            {themeType === 'dark' && 'Темная'}
            {themeType === 'system' && 'Система'}
          </span>
        </Button>
      ))}
    </div>
  )
}

// Hook для использования темы в компонентах
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(globalTheme)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(globalResolvedTheme)

  useEffect(() => {
    // Инициализация из localStorage
    const savedTheme = localStorage.getItem('theme') as Theme || 'system'
    if (savedTheme !== globalTheme) {
      applyTheme(savedTheme)
    }
    setTheme(globalTheme)
    setResolvedTheme(globalResolvedTheme)

    // Подписка на изменения глобального состояния
    const listener = () => {
      setTheme(globalTheme)
      setResolvedTheme(globalResolvedTheme)
    }
    themeListeners.push(listener)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => {
      if (globalTheme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleSystemChange)

    return () => {
      const index = themeListeners.indexOf(listener)
      if (index > -1) {
        themeListeners.splice(index, 1)
      }
      mediaQuery.removeEventListener('change', handleSystemChange)
    }
  }, [])

  const setThemeValue = (newTheme: Theme) => {
    applyTheme(newTheme)
  }

  return {
    theme,
    resolvedTheme,
    setTheme: setThemeValue,
    isLight: resolvedTheme === 'light',
    isDark: resolvedTheme === 'dark'
  }
}