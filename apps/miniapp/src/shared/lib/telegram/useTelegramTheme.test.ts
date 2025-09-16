import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { 
  getStoredTheme, 
  setStoredTheme, 
  setThemeMode, 
  useTelegramTheme,
  type ThemeMode 
} from './useTelegramTheme'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock matchMedia
const mockMatchMedia = vi.fn()
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
})

// Mock Telegram WebApp
const mockWebApp = {
  colorScheme: 'light',
  themeParams: {
    bg_color: '#ffffff',
    text_color: '#000000',
    hint_color: '#707579',
    link_color: '#3390ec',
    button_color: '#3390ec',
    button_text_color: '#ffffff',
    secondary_bg_color: '#f4f4f5'
  },
  onEvent: vi.fn(),
  offEvent: vi.fn(),
}

describe('Theme Management', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset DOM
    document.documentElement.className = ''
    document.documentElement.style.cssText = ''
    
    // Setup default mocks
    localStorageMock.getItem.mockReturnValue(null)
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    
    ;(window as any).Telegram = { WebApp: mockWebApp }
  })

  afterEach(() => {
    delete (window as any).__setTheme
  })

  describe('getStoredTheme', () => {
    it('returns stored theme from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('dark')
      
      const theme = getStoredTheme()
      
      expect(theme).toBe('dark')
      expect(localStorageMock.getItem).toHaveBeenCalledWith('telegram-miniapp-theme')
    })

    it('returns system as default when no stored theme', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      const theme = getStoredTheme()
      
      expect(theme).toBe('system')
    })

    it('returns system as default when stored theme is invalid', () => {
      localStorageMock.getItem.mockReturnValue('invalid-theme')
      
      const theme = getStoredTheme()
      
      expect(theme).toBe('system')
    })

    it('handles localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      const theme = getStoredTheme()
      
      expect(theme).toBe('system')
      expect(consoleSpy).toHaveBeenCalledWith('Failed to read theme from localStorage:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('setStoredTheme', () => {
    it('stores theme in localStorage', () => {
      setStoredTheme('dark')
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('telegram-miniapp-theme', 'dark')
    })

    it('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error')
      })
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      setStoredTheme('dark')
      
      expect(consoleSpy).toHaveBeenCalledWith('Failed to store theme in localStorage:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })
  })

  describe('setThemeMode', () => {
    it('applies light theme correctly', () => {
      setThemeMode('light')
      
      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('telegram-miniapp-theme', 'light')
    })

    it('applies dark theme correctly', () => {
      setThemeMode('dark')
      
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('telegram-miniapp-theme', 'dark')
    })

    it('applies system theme based on Telegram colorScheme', () => {
      mockWebApp.colorScheme = 'dark'
      
      setThemeMode('system')
      
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(localStorageMock.setItem).toHaveBeenCalledWith('telegram-miniapp-theme', 'system')
    })

    it('falls back to matchMedia when no Telegram WebApp', () => {
      delete (window as any).Telegram
      mockMatchMedia.mockReturnValue({
        matches: true, // dark mode
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })
      
      setThemeMode('system')
      
      expect(document.documentElement.classList.contains('dark')).toBe(true)
      expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)')
    })
  })

  describe('useTelegramTheme hook', () => {
    it('applies Telegram theme parameters to CSS variables', () => {
      renderHook(() => useTelegramTheme())
      
      const root = document.documentElement
      expect(root.style.getPropertyValue('--tg-theme-bg-color')).toBe('#ffffff')
      expect(root.style.getPropertyValue('--tg-theme-text-color')).toBe('#000000')
      expect(root.style.getPropertyValue('--tg-color-scheme')).toBe('light')
    })

    it('sets up Telegram event listeners', () => {
      renderHook(() => useTelegramTheme())
      
      expect(mockWebApp.onEvent).toHaveBeenCalledWith('themeChanged', expect.any(Function))
    })

    it('sets up system media query listener', () => {
      const mockMediaQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }
      mockMatchMedia.mockReturnValue(mockMediaQuery)
      
      renderHook(() => useTelegramTheme())
      
      expect(mockMediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    })

    it('creates global __setTheme function', () => {
      renderHook(() => useTelegramTheme())
      
      expect((window as any).__setTheme).toBeDefined()
      expect(typeof (window as any).__setTheme).toBe('function')
    })

    it('cleans up on unmount', () => {
      const mockMediaQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }
      mockMatchMedia.mockReturnValue(mockMediaQuery)
      
      const { unmount } = renderHook(() => useTelegramTheme())
      
      unmount()
      
      expect(mockWebApp.offEvent).toHaveBeenCalledWith('themeChanged', expect.any(Function))
      expect(mockMediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
      expect((window as any).__setTheme).toBeUndefined()
    })

    it('handles missing Telegram WebApp gracefully', () => {
      delete (window as any).Telegram
      
      expect(() => {
        renderHook(() => useTelegramTheme())
      }).not.toThrow()
    })

    it('responds to system theme changes when in system mode', () => {
      localStorageMock.getItem.mockReturnValue('system')
      
      const mockMediaQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }
      mockMatchMedia.mockReturnValue(mockMediaQuery)
      
      renderHook(() => useTelegramTheme())
      
      // Simulate system theme change
      const [changeHandler] = mockMediaQuery.addEventListener.mock.calls.find(
        call => call[0] === 'change'
      ) || []
      
      if (changeHandler) {
        // Simulate dark mode activation
        mockMediaQuery.matches = true
        changeHandler()
        
        expect(document.documentElement.classList.contains('dark')).toBe(true)
      }
    })

    it('does not respond to system theme changes when not in system mode', () => {
      localStorageMock.getItem.mockReturnValue('light')
      
      const mockMediaQuery = {
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }
      mockMatchMedia.mockReturnValue(mockMediaQuery)
      
      renderHook(() => useTelegramTheme())
      
      // Simulate system theme change
      const [changeHandler] = mockMediaQuery.addEventListener.mock.calls.find(
        call => call[0] === 'change'
      ) || []
      
      if (changeHandler) {
        // Simulate dark mode activation
        mockMediaQuery.matches = true
        changeHandler()
        
        // Should remain light because theme is explicitly set to light
        expect(document.documentElement.classList.contains('dark')).toBe(false)
      }
    })
  })

  describe('Theme mode combinations', () => {
    const testCases: Array<{
      mode: ThemeMode
      telegramScheme: string | undefined
      systemDark: boolean
      expectedDark: boolean
    }> = [
      { mode: 'light', telegramScheme: 'light', systemDark: false, expectedDark: false },
      { mode: 'light', telegramScheme: 'dark', systemDark: true, expectedDark: false },
      { mode: 'dark', telegramScheme: 'light', systemDark: false, expectedDark: true },
      { mode: 'dark', telegramScheme: 'dark', systemDark: true, expectedDark: true },
      { mode: 'system', telegramScheme: 'light', systemDark: false, expectedDark: false },
      { mode: 'system', telegramScheme: 'dark', systemDark: true, expectedDark: true },
      { mode: 'system', telegramScheme: undefined, systemDark: false, expectedDark: false },
      { mode: 'system', telegramScheme: undefined, systemDark: true, expectedDark: true },
    ]

    testCases.forEach(({ mode, telegramScheme, systemDark, expectedDark }) => {
      it(`mode: ${mode}, telegram: ${telegramScheme}, system: ${systemDark} -> ${expectedDark ? 'dark' : 'light'}`, () => {
        if (telegramScheme) {
          mockWebApp.colorScheme = telegramScheme
        } else {
          delete (window as any).Telegram
        }
        
        mockMatchMedia.mockReturnValue({
          matches: systemDark,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })
        
        setThemeMode(mode)
        
        expect(document.documentElement.classList.contains('dark')).toBe(expectedDark)
      })
    })
  })
})