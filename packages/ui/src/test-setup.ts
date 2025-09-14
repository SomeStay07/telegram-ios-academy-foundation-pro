import '@testing-library/jest-dom'

// Mock Telegram WebApp for components that might use it
Object.defineProperty(window, 'Telegram', {
  value: {
    WebApp: {
      ready: vi.fn(),
      expand: vi.fn(),
      MainButton: {
        setText: vi.fn(),
        show: vi.fn(),
        hide: vi.fn(),
        onClick: vi.fn(),
        offClick: vi.fn(),
      },
      BackButton: {
        show: vi.fn(),
        hide: vi.fn(),
        onClick: vi.fn(),
        offClick: vi.fn(),
      },
      initData: 'mock-data',
      initDataUnsafe: {
        user: {
          id: 123,
          first_name: 'Test',
          username: 'testuser',
        },
      },
    },
  },
  writable: true,
})