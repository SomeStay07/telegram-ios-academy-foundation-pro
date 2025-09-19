// Telegram Web App theme integration utilities
// Based on official Telegram Mini Apps documentation

export interface TelegramTheme {
  bg_color?: string
  text_color?: string
  hint_color?: string
  link_color?: string
  button_color?: string
  button_text_color?: string
  secondary_bg_color?: string
  header_bg_color?: string
  accent_text_color?: string
  section_bg_color?: string
  section_header_text_color?: string
  subtitle_text_color?: string
  destructive_text_color?: string
}

// Get Telegram WebApp theme colors
export function getTelegramTheme(): TelegramTheme | null {
  if (typeof window === 'undefined') return null
  
  const webApp = (window as any)?.Telegram?.WebApp
  if (!webApp?.themeParams) return null
  
  return webApp.themeParams
}

// Check if running in Telegram WebApp
export function isTelegramWebApp(): boolean {
  return typeof window !== 'undefined' && 
         !!(window as any)?.Telegram?.WebApp?.initData
}

// Apply Telegram theme to CSS custom properties
export function applyTelegramTheme(): void {
  const theme = getTelegramTheme()
  if (!theme) return
  
  const root = document.documentElement
  
  // Map Telegram theme to our CSS variables
  if (theme.bg_color) {
    root.style.setProperty('--tg-bg-color', theme.bg_color)
    root.style.setProperty('--background', theme.bg_color)
  }
  
  if (theme.text_color) {
    root.style.setProperty('--tg-text-color', theme.text_color)
    root.style.setProperty('--foreground', theme.text_color)
  }
  
  if (theme.button_color) {
    root.style.setProperty('--tg-button-color', theme.button_color)
    root.style.setProperty('--primary', theme.button_color)
  }
  
  if (theme.button_text_color) {
    root.style.setProperty('--tg-button-text-color', theme.button_text_color)
    root.style.setProperty('--primary-foreground', theme.button_text_color)
  }
  
  if (theme.link_color) {
    root.style.setProperty('--tg-link-color', theme.link_color)
    root.style.setProperty('--accent', theme.link_color)
  }
  
  if (theme.secondary_bg_color) {
    root.style.setProperty('--tg-secondary-bg-color', theme.secondary_bg_color)
    root.style.setProperty('--muted', theme.secondary_bg_color)
  }
  
  if (theme.hint_color) {
    root.style.setProperty('--tg-hint-color', theme.hint_color)
    root.style.setProperty('--muted-foreground', theme.hint_color)
  }
  
  if (theme.section_bg_color) {
    root.style.setProperty('--tg-section-bg-color', theme.section_bg_color)
    root.style.setProperty('--card', theme.section_bg_color)
  }
  
  if (theme.destructive_text_color) {
    root.style.setProperty('--tg-destructive-color', theme.destructive_text_color)
    root.style.setProperty('--destructive', theme.destructive_text_color)
  }
  
  // Add telegram-themed class to body
  document.body.classList.add('telegram-theme')
}

// Get Telegram color scheme (light/dark)
export function getTelegramColorScheme(): 'light' | 'dark' | null {
  const webApp = (window as any)?.Telegram?.WebApp
  if (!webApp) return null
  
  return webApp.colorScheme || null
}

// Initialize Telegram theme integration
export function initTelegramTheme(): void {
  if (!isTelegramWebApp()) {
    console.warn('Not running in Telegram WebApp environment')
    return
  }
  
  const webApp = (window as any).Telegram.WebApp
  
  // Apply initial theme
  applyTelegramTheme()
  
  // Listen for theme changes
  webApp.onEvent('themeChanged', () => {
    applyTelegramTheme()
  })
  
  // Set viewport height for mobile
  webApp.expand()
  
  // Enable closing confirmation
  webApp.enableClosingConfirmation()
}

// Hook for React components
export function useTelegramTheme() {
  const [theme, setTheme] = React.useState<TelegramTheme | null>(null)
  const [colorScheme, setColorScheme] = React.useState<'light' | 'dark' | null>(null)
  
  React.useEffect(() => {
    if (!isTelegramWebApp()) return
    
    const updateTheme = () => {
      setTheme(getTelegramTheme())
      setColorScheme(getTelegramColorScheme())
    }
    
    updateTheme()
    
    const webApp = (window as any).Telegram.WebApp
    webApp.onEvent('themeChanged', updateTheme)
    
    return () => {
      webApp.offEvent('themeChanged', updateTheme)
    }
  }, [])
  
  return { theme, colorScheme, isTelegram: isTelegramWebApp() }
}

// CSS class utilities
export function getTelegramThemeClasses(): string {
  const colorScheme = getTelegramColorScheme()
  const classes = ['telegram-app']
  
  if (colorScheme) {
    classes.push(`telegram-${colorScheme}`)
  }
  
  return classes.join(' ')
}

// React import for the hook
import React from 'react'