import { useEffect } from 'react';

export type ThemeMode = 'system' | 'light' | 'dark'

// Theme storage key
const THEME_STORAGE_KEY = 'telegram-miniapp-theme'

// Get stored theme mode
export function getStoredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored && ['system', 'light', 'dark'].includes(stored)) {
      return stored as ThemeMode
    }
  } catch (error) {
    console.warn('Failed to read theme from localStorage:', error)
  }
  return 'system'
}

// Store theme mode
export function setStoredTheme(mode: ThemeMode): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch (error) {
    console.warn('Failed to store theme in localStorage:', error)
  }
}

// Apply theme class to document
function applyThemeClass(isDark: boolean): void {
  const root = document.documentElement
  
  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Get effective theme based on mode and system preference
function getEffectiveTheme(mode: ThemeMode, systemIsDark: boolean): boolean {
  switch (mode) {
    case 'light':
      return false
    case 'dark':
      return true
    case 'system':
    default:
      return systemIsDark
  }
}

export function useTelegramTheme() {
  useEffect(() => {
    const { WebApp } = (window as any)?.Telegram || {};
    const storedMode = getStoredTheme()
    
    const apply = () => {
      // Apply theme parameters to CSS variables
      const themeParams = WebApp?.themeParams || {};
      const root = document.documentElement;
      
      // Set CSS variables for Telegram theme
      Object.entries(themeParams).forEach(([key, value]) => {
        root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value as string);
      });
      
      // Set color scheme and viewport height
      if (WebApp?.colorScheme) {
        root.style.setProperty('--tg-color-scheme', WebApp.colorScheme);
      }
      
      // Update theme based on stored preference
      const systemIsDark = WebApp?.colorScheme === 'dark' || 
                          window.matchMedia('(prefers-color-scheme: dark)').matches
      
      const currentMode = getStoredTheme()
      const isDark = getEffectiveTheme(currentMode, systemIsDark)
      applyThemeClass(isDark)
    };
    
    // Apply theme immediately
    apply();
    
    // Listen for theme changes (only affects 'system' mode)
    function handleThemeChanged() {
      const currentMode = getStoredTheme()
      if (currentMode === 'system') {
        apply()
      }
    }
    
    // Listen to system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    function handleSystemThemeChange() {
      const currentMode = getStoredTheme()
      if (currentMode === 'system') {
        apply()
      }
    }
    
    // Telegram theme listener
    WebApp?.onEvent?.('themeChanged', handleThemeChanged);
    
    // System theme listener
    mediaQuery.addEventListener('change', handleSystemThemeChange)
    
    // Global function to change theme manually
    ;(window as any).__setTheme = (mode: ThemeMode) => {
      setStoredTheme(mode)
      apply()
    }
    
    return () => {
      WebApp?.offEvent?.('themeChanged', handleThemeChanged);
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
      delete (window as any).__setTheme
    };
  }, []);
}

// Utility function to change theme programmatically
export function setThemeMode(mode: ThemeMode): void {
  setStoredTheme(mode)
  
  const WebApp = (window as any)?.Telegram?.WebApp
  const systemIsDark = WebApp?.colorScheme === 'dark' || 
                      window.matchMedia('(prefers-color-scheme: dark)').matches
  
  const isDark = getEffectiveTheme(mode, systemIsDark)
  applyThemeClass(isDark)
}