import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getDataSource } from '../source'
import { getTelegramApi } from '../../../lib/telegram/api'

// Mock the Telegram API
vi.mock('../../../lib/telegram/api', () => ({
  getTelegramApi: vi.fn()
}))

const mockGetTelegramApi = vi.mocked(getTelegramApi)

// Mock Telegram WebApp
const mockTelegramWebApp = {
  initData: 'mock_init_data',
  initDataUnsafe: {
    user: {
      id: 123456789,
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      language_code: 'en',
      is_premium: false,
      photo_url: 'https://example.com/avatar.jpg'
    }
  }
}

describe('DataSource', () => {
  beforeEach(() => {
    // Reset window.Telegram mock
    delete (global as any).window
    vi.resetModules()
    vi.clearAllMocks()
    
    // Default mock for getTelegramApi
    mockGetTelegramApi.mockReturnValue({
      isAvailable: () => false,
      hasUser: () => false,
      getUser: () => ({
        id: 777,
        first_name: 'Timur',
        last_name: 'C.',
        username: 'somestay07',
        language_code: 'en',
        is_premium: false
      })
    } as any)
  })

  it('should use MockDataSource when VITE_USE_MOCKS=1', async () => {
    // Mock environment variable
    vi.stubEnv('VITE_USE_MOCKS', '1')
    
    // Mock window without Telegram
    ;(global as any).window = {}
    
    const { getDataSource } = await import('../source')
    const dataSource = getDataSource()
    
    const profile = await dataSource.getProfile()
    
    expect(profile.user.first_name).toBe('Timur')
    expect(profile.user.last_name).toBe('C.')
    expect(profile.user.username).toBe('somestay07')
    expect(profile.stats.completed).toBe(5)
  })

  it('should use MockDataSource when no Telegram context', async () => {
    // Mock environment variable as false
    vi.stubEnv('VITE_USE_MOCKS', '0')
    
    // Mock window without Telegram
    ;(global as any).window = {}
    
    const { getDataSource } = await import('../source')
    const dataSource = getDataSource()
    
    const profile = await dataSource.getProfile()
    
    // Should still use mocks when no Telegram context
    expect(profile.user.first_name).toBe('Timur')
    expect(profile.user.last_name).toBe('C.')
    expect(profile.user.username).toBe('somestay07')
  })

  it('should use TelegramDataSource when Telegram context available', async () => {
    // Mock environment variable as false
    vi.stubEnv('VITE_USE_MOCKS', '0')
    
    // Mock getTelegramApi to return Telegram user data
    mockGetTelegramApi.mockReturnValue({
      isAvailable: () => true,
      hasUser: () => true,
      getUser: () => ({
        id: 123456789,
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        language_code: 'en',
        is_premium: false,
        photo_url: 'https://example.com/avatar.jpg'
      })
    } as any)
    
    const { getDataSource } = await import('../source')
    const dataSource = getDataSource()
    
    const profile = await dataSource.getProfile()
    
    expect(profile.user.id).toBe(123456789)
    expect(profile.user.first_name).toBe('John')
    expect(profile.user.last_name).toBe('Doe')
    expect(profile.user.username).toBe('johndoe')
    expect(profile.user.language_code).toBe('en')
    expect(profile.user.is_premium).toBe(false)
    expect(profile.user.photo_url).toBe('https://example.com/avatar.jpg')
  })

  it('should load activity data from both sources', async () => {
    // Test mock data source
    vi.stubEnv('VITE_USE_MOCKS', '1')
    ;(global as any).window = {}
    
    const { getDataSource } = await import('../source')
    const dataSource = getDataSource()
    
    const activity = await dataSource.getActivity()
    
    expect(activity).toHaveLength(2)
    expect(activity[0].title).toBe('Watched: SwiftUI Basics')
    expect(activity[1].title).toBe('Quiz: ARC & CoW')
  })

  it('should handle missing Telegram user data gracefully', async () => {
    vi.stubEnv('VITE_USE_MOCKS', '0')
    
    // Mock getTelegramApi to indicate Telegram is not available
    mockGetTelegramApi.mockReturnValue({
      isAvailable: () => false,
      hasUser: () => false,
      getUser: () => {
        throw new Error('No user data available')
      }
    } as any)
    
    const { getDataSource } = await import('../source')
    const dataSource = getDataSource()
    
    const profile = await dataSource.getProfile()
    
    // Should fallback to MockDS when Telegram is not available
    expect(profile.user.id).toBe(777) // MockDS fallback ID
    expect(profile.user.first_name).toBe('Timur')
    expect(profile.user.last_name).toBe('C.')
    expect(profile.user.language_code).toBe('en') // fallback language
    expect(profile.user.is_premium).toBe(false) // fallback premium status
  })
})