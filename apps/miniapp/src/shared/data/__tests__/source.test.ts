import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getDataSource } from '../source'

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
    
    // Mock window with Telegram WebApp
    ;(global as any).window = {
      Telegram: {
        WebApp: mockTelegramWebApp
      }
    }
    
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
    
    // Mock window with Telegram but no user data
    ;(global as any).window = {
      Telegram: {
        WebApp: {
          initData: 'empty',
          initDataUnsafe: {}
        }
      }
    }
    
    const { getDataSource } = await import('../source')
    const dataSource = getDataSource()
    
    const profile = await dataSource.getProfile()
    
    expect(profile.user.id).toBe(999999999) // fallback ID
    expect(profile.user.language_code).toBe('en') // fallback language
    expect(profile.user.is_premium).toBe(false) // fallback premium status
  })
})