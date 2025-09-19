/**
 * Unit tests for Telegram SDK wrapper
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { telegram } from '../telegram'

// Mock window.Telegram
const mockTelegram = {
  WebApp: {
    ready: vi.fn(),
    expand: vi.fn(),
    initData: 'query_id=123&user=%7B%22id%22%3A123456789%2C%22first_name%22%3A%22John%22%2C%22last_name%22%3A%22Doe%22%2C%22username%22%3A%22johndoe%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1234567890&hash=abcdef',
    initDataUnsafe: {
      user: {
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        language_code: 'en'
      },
      auth_date: 1234567890,
      hash: 'abcdef'
    },
    version: '6.0',
    platform: 'tdesktop'
  }
}

describe('Telegram SDK', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks()
    
    // Reset telegram instance state
    ;(telegram as any).isReady = false
    ;(telegram as any).readyPromise = null
  })

  describe('ensureReady', () => {
    it('should initialize Telegram WebApp successfully', async () => {
      // Mock window.Telegram
      ;(global as any).window = {
        Telegram: mockTelegram
      }

      await telegram.ensureReady()

      expect(mockTelegram.WebApp.ready).toHaveBeenCalledOnce()
      expect(mockTelegram.WebApp.expand).toHaveBeenCalledOnce()
    })

    it('should reject when Telegram WebApp is not available', async () => {
      // Mock missing Telegram
      ;(global as any).window = {}

      await expect(telegram.ensureReady()).rejects.toThrow('Telegram WebApp not available')
    })

    it('should only initialize once', async () => {
      ;(global as any).window = {
        Telegram: mockTelegram
      }

      await telegram.ensureReady()
      await telegram.ensureReady()

      expect(mockTelegram.WebApp.ready).toHaveBeenCalledOnce()
      expect(mockTelegram.WebApp.expand).toHaveBeenCalledOnce()
    })
  })

  describe('getInitData', () => {
    it('should return init data when available', async () => {
      ;(global as any).window = {
        Telegram: mockTelegram
      }

      const result = await telegram.getInitData()

      expect(result.raw).toBe(mockTelegram.WebApp.initData)
      expect(result.unsafe).toEqual(mockTelegram.WebApp.initDataUnsafe)
    })

    it('should return null when Telegram not available', async () => {
      ;(global as any).window = {}

      const result = await telegram.getInitData()

      expect(result.raw).toBeNull()
      expect(result.unsafe).toBeNull()
    })
  })

  describe('getUserFromUnsafe', () => {
    it('should return user data when available', async () => {
      ;(global as any).window = {
        Telegram: mockTelegram
      }

      const user = await telegram.getUserFromUnsafe()

      expect(user).toEqual({
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        language_code: 'en',
        photo_url: undefined
      })
    })

    it('should return null when no user data', async () => {
      ;(global as any).window = {
        Telegram: {
          WebApp: {
            ready: vi.fn(),
            expand: vi.fn(),
            initData: '',
            initDataUnsafe: {},
            version: '6.0',
            platform: 'tdesktop'
          }
        }
      }

      const user = await telegram.getUserFromUnsafe()

      expect(user).toBeNull()
    })
  })

  describe('isAvailable', () => {
    it('should return true when Telegram WebApp is available', () => {
      ;(global as any).window = {
        Telegram: mockTelegram
      }

      expect(telegram.isAvailable()).toBe(true)
    })

    it('should return false when Telegram WebApp is not available', () => {
      ;(global as any).window = {}

      expect(telegram.isAvailable()).toBe(false)
    })
  })

  describe('getWebAppInfo', () => {
    it('should return WebApp info when available', () => {
      ;(global as any).window = {
        Telegram: mockTelegram
      }

      const info = telegram.getWebAppInfo()

      expect(info).toEqual({
        version: '6.0',
        platform: 'tdesktop',
        isAvailable: true
      })
    })

    it('should return null when not available', () => {
      ;(global as any).window = {}

      const info = telegram.getWebAppInfo()

      expect(info).toBeNull()
    })
  })
})