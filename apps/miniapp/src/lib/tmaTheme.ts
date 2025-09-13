/**
 * Telegram ThemeParams integration with CSS custom properties
 * Maps WebApp.themeParams to semantic design tokens with live updates
 */

import React from 'react'

export interface TelegramThemeParams {
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

interface ThemeMapping {
  [key: string]: string
}

/**
 * Maps Telegram theme params to design system CSS custom properties
 */
const THEME_MAPPING: ThemeMapping = {
  // Surface tokens
  'bg_color': '--ds-surface-primary',
  'secondary_bg_color': '--ds-surface-secondary',
  'section_bg_color': '--ds-surface-tertiary',
  'header_bg_color': '--ds-surface-accent',
  
  // Content tokens
  'text_color': '--ds-content-primary',
  'subtitle_text_color': '--ds-content-secondary',
  'hint_color': '--ds-content-tertiary',
  'section_header_text_color': '--ds-content-accent',
  'accent_text_color': '--ds-content-accent',
  'destructive_text_color': '--ds-content-destructive',
  
  // Interactive tokens
  'button_color': '--ds-interactive-primary-default',
  'button_text_color': '--ds-content-on-accent',
  'link_color': '--ds-content-accent',
}

/**
 * Default fallback values matching our design tokens
 */
const FALLBACK_VALUES: Record<string, string> = {
  '--ds-surface-primary': '#ffffff',
  '--ds-surface-secondary': '#f8f9fa',
  '--ds-surface-tertiary': '#e9ecef',
  '--ds-surface-accent': '#007aff',
  '--ds-content-primary': '#000000',
  '--ds-content-secondary': '#6c757d',
  '--ds-content-tertiary': '#adb5bd',
  '--ds-content-accent': '#007aff',
  '--ds-content-destructive': '#dc3545',
  '--ds-content-on-accent': '#ffffff',
  '--ds-interactive-primary-default': '#007aff',
}

/**
 * Checks if a color string is valid hex color
 */
function isValidHexColor(color: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(color)
}

/**
 * Applies Telegram theme params to CSS custom properties
 */
export function applyThemeParamsToCSSVars(themeParams: TelegramThemeParams): void {
  const root = document.documentElement
  
  // Apply theme params with validation
  Object.entries(THEME_MAPPING).forEach(([telegramParam, cssVar]) => {
    const value = themeParams[telegramParam as keyof TelegramThemeParams]
    
    if (value && isValidHexColor(value)) {
      root.style.setProperty(cssVar, value)
    } else {
      // Use fallback value
      const fallback = FALLBACK_VALUES[cssVar]
      if (fallback) {
        root.style.setProperty(cssVar, fallback)
      }
    }
  })
  
  // Derive interactive states from primary colors
  deriveInteractiveStates(root)
}

/**
 * Derives hover/pressed states from base colors
 */
function deriveInteractiveStates(root: HTMLElement): void {
  const primaryColor = getComputedStyle(root).getPropertyValue('--ds-interactive-primary-default').trim()
  
  if (primaryColor && isValidHexColor(primaryColor)) {
    // Create darker variants for hover/pressed states
    const hoverColor = adjustColorBrightness(primaryColor, -0.1)
    const pressedColor = adjustColorBrightness(primaryColor, -0.2)
    const disabledColor = adjustColorBrightness(primaryColor, 0.6)
    
    root.style.setProperty('--ds-interactive-primary-hover', hoverColor)
    root.style.setProperty('--ds-interactive-primary-pressed', pressedColor)
    root.style.setProperty('--ds-interactive-primary-disabled', disabledColor)
  }
}

/**
 * Adjusts hex color brightness
 */
function adjustColorBrightness(hex: string, factor: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * factor * 100)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

/**
 * Detects if theme is dark based on background color
 */
function isDarkTheme(themeParams: TelegramThemeParams): boolean {
  const bgColor = themeParams.bg_color
  if (!bgColor || !isValidHexColor(bgColor)) return false
  
  // Convert hex to RGB and calculate luminance
  const hex = bgColor.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  
  return luminance < 0.5
}

/**
 * Gets current theme mode from Telegram WebApp
 */
export function getTelegramThemeMode(): 'light' | 'dark' {
  const webApp = (window as any).Telegram?.WebApp
  if (!webApp?.themeParams) return 'light'
  
  return isDarkTheme(webApp.themeParams) ? 'dark' : 'light'
}

/**
 * Initializes theme synchronization with Telegram WebApp
 */
export function initThemeSync(webApp: any): void {
  if (!webApp?.themeParams) {
    console.warn('Telegram WebApp theme params not available')
    return
  }
  
  // Apply initial theme
  applyThemeParamsToCSSVars(webApp.themeParams)
  
  // Set theme mode data attribute for CSS targeting
  document.documentElement.setAttribute('data-theme', getTelegramThemeMode())
  
  // Listen for theme changes
  webApp.onEvent('themeChanged', () => {
    console.log('🎨 Telegram theme changed', webApp.themeParams)
    applyThemeParamsToCSSVars(webApp.themeParams)
    document.documentElement.setAttribute('data-theme', getTelegramThemeMode())
    
    // Dispatch custom event for other components to react
    window.dispatchEvent(new CustomEvent('telegram-theme-changed', {
      detail: {
        themeParams: webApp.themeParams,
        isDark: isDarkTheme(webApp.themeParams)
      }
    }))
  })
  
  console.log('🎨 Theme sync initialized', {
    themeParams: webApp.themeParams,
    isDark: isDarkTheme(webApp.themeParams)
  })
}

/**
 * Gets current Telegram theme parameters
 */
export function getCurrentThemeParams(): TelegramThemeParams | null {
  const webApp = (window as any).Telegram?.WebApp
  return webApp?.themeParams || null
}

/**
 * Hook for React components to listen to theme changes
 */
export function useThemeParams() {
  const [themeParams, setThemeParams] = React.useState<TelegramThemeParams | null>(null)
  const [isDark, setIsDark] = React.useState(false)
  
  React.useEffect(() => {
    // Set initial values
    const params = getCurrentThemeParams()
    setThemeParams(params)
    setIsDark(params ? isDarkTheme(params) : false)
    
    // Listen for theme changes
    const handleThemeChange = (event: CustomEvent) => {
      setThemeParams(event.detail.themeParams)
      setIsDark(event.detail.isDark)
    }
    
    window.addEventListener('telegram-theme-changed', handleThemeChange as EventListener)
    
    return () => {
      window.removeEventListener('telegram-theme-changed', handleThemeChange as EventListener)
    }
  }, [])
  
  return { themeParams, isDark }
}