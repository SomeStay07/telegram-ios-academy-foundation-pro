import { vi } from 'vitest'

// Mock environment variables
vi.mock('../env.ts', () => ({
  VITE: {
    API_BASE_URL: 'http://localhost:3000/api'
  }
}))

// Mock global objects that might be used in components
Object.defineProperty(window, 'location', {
  value: {
    search: '',
    href: 'http://localhost:5173',
    pathname: '/'
  },
  writable: true,
})

// Mock Telegram WebApp
global.window = Object.assign(global.window, {
  Telegram: {
    WebApp: {
      ready: vi.fn(),
      expand: vi.fn(),
      BackButton: {
        show: vi.fn(),
        hide: vi.fn(),
        onClick: vi.fn()
      },
      initDataUnsafe: {
        start_param: null
      }
    }
  }
})

// Mock navigator
Object.defineProperty(window, 'navigator', {
  value: {
    userAgent: 'test-agent',
    language: 'en-US'
  },
  writable: true,
})