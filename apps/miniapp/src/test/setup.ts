import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock environment variables
vi.mock('../env.ts', () => ({
  VITE: {
    API_BASE_URL: 'http://localhost:3000/api'
  }
}))

// Mock analytics modules to prevent dynamic import errors
vi.mock('../analytics/lazy', () => ({
  analytics: {
    deepLinkOpened: vi.fn(),
    interviewStarted: vi.fn(),
    interviewAnswerSubmitted: vi.fn(),
    interviewCompleted: vi.fn(),
    track: vi.fn(),
    identify: vi.fn()
  }
}))

// Also mock with the path used by deep-linking.ts
vi.mock('../../analytics/lazy', () => ({
  default: {
    deepLinkOpened: vi.fn(),
    interviewStarted: vi.fn(),
    interviewAnswerSubmitted: vi.fn(),
    interviewCompleted: vi.fn(),
    track: vi.fn(),
    identify: vi.fn()
  },
  analytics: {
    deepLinkOpened: vi.fn(),
    interviewStarted: vi.fn(),
    interviewAnswerSubmitted: vi.fn(),
    interviewCompleted: vi.fn(),
    track: vi.fn(),
    identify: vi.fn()
  }
}))

vi.mock('../lib/analytics', () => ({
  analytics: {
    deepLinkOpened: vi.fn(),
    interviewStarted: vi.fn(),
    interviewAnswerSubmitted: vi.fn(),
    interviewCompleted: vi.fn(),
    track: vi.fn(),
    identify: vi.fn()
  },
  track: vi.fn(),
  identify: vi.fn(),
  trackInterviewStarted: vi.fn(),
  trackInterviewAnswerSubmitted: vi.fn(),
  trackInterviewCompleted: vi.fn()
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

// Mock Telegram WebApp with comprehensive TMA API
global.window = Object.assign(global.window, {
  Telegram: {
    WebApp: {
      ready: vi.fn(),
      expand: vi.fn(),
      close: vi.fn(),
      isExpanded: true,
      viewportHeight: 600,
      viewportStableHeight: 600,
      platform: 'web',
      colorScheme: 'light',
      themeParams: {
        bg_color: '#ffffff',
        text_color: '#000000',
        hint_color: '#999999',
        link_color: '#007acc',
        button_color: '#40a7e3',
        button_text_color: '#ffffff'
      },
      isVersionAtLeast: vi.fn(() => true),
      sendData: vi.fn(),
      openLink: vi.fn(),
      openTelegramLink: vi.fn(),
      showPopup: vi.fn(),
      showAlert: vi.fn(),
      showConfirm: vi.fn(),
      requestWriteAccess: vi.fn(),
      requestContact: vi.fn(),
      onEvent: vi.fn(),
      offEvent: vi.fn(),
      BackButton: {
        isVisible: false,
        show: vi.fn(),
        hide: vi.fn(),
        onClick: vi.fn(),
        offClick: vi.fn()
      },
      MainButton: {
        text: '',
        color: '#40a7e3',
        textColor: '#ffffff',
        isVisible: false,
        isActive: true,
        isProgressVisible: false,
        setText: vi.fn(),
        onClick: vi.fn(),
        offClick: vi.fn(),
        show: vi.fn(),
        hide: vi.fn(),
        enable: vi.fn(),
        disable: vi.fn(),
        showProgress: vi.fn(),
        hideProgress: vi.fn(),
        setParams: vi.fn()
      },
      HapticFeedback: {
        impactOccurred: vi.fn(),
        notificationOccurred: vi.fn(),
        selectionChanged: vi.fn()
      },
      initDataUnsafe: {
        user: {
          id: 12345,
          first_name: 'Test',
          last_name: 'User',
          username: 'testuser',
          language_code: 'en'
        },
        start_param: null,
        auth_date: Date.now(),
        hash: 'test-hash'
      },
      initData: 'mock-data'
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