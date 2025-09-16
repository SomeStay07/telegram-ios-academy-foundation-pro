import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getDataSource } from './source'
import { MockDS } from './mockds'
import { TGDS } from './tgds'

// Mock environment
const mockEnv = vi.hoisted(() => ({
  VITE_USE_MOCKS: 'false'
}))

vi.mock('import.meta', () => ({
  env: mockEnv
}))

describe('Data Source Selection', () => {
  beforeEach(() => {
    // Reset window.Telegram
    delete (window as any).Telegram
    
    // Reset environment
    mockEnv.VITE_USE_MOCKS = 'false'
  })

  it('returns MockDS when VITE_USE_MOCKS is true', () => {
    mockEnv.VITE_USE_MOCKS = 'true'
    
    const dataSource = getDataSource()
    
    expect(dataSource).toBeInstanceOf(MockDS)
  })

  it('returns TGDS when Telegram WebApp is available with initData', () => {
    // Mock Telegram WebApp with initData
    ;(window as any).Telegram = {
      WebApp: {
        initData: 'user=%7B%22id%22%3A123%7D' // URL encoded user data
      }
    }
    
    const dataSource = getDataSource()
    
    expect(dataSource).toBeInstanceOf(TGDS)
  })

  it('returns MockDS when Telegram WebApp exists but no initData', () => {
    // Mock Telegram WebApp without initData
    ;(window as any).Telegram = {
      WebApp: {}
    }
    
    const dataSource = getDataSource()
    
    expect(dataSource).toBeInstanceOf(MockDS)
  })

  it('returns MockDS when Telegram WebApp does not exist', () => {
    // No Telegram WebApp
    const dataSource = getDataSource()
    
    expect(dataSource).toBeInstanceOf(MockDS)
  })

  it('returns MockDS when VITE_USE_MOCKS is true even with Telegram WebApp', () => {
    mockEnv.VITE_USE_MOCKS = 'true'
    
    // Mock complete Telegram WebApp setup
    ;(window as any).Telegram = {
      WebApp: {
        initData: 'user=%7B%22id%22%3A123%7D'
      }
    }
    
    const dataSource = getDataSource()
    
    // Should still return MockDS because VITE_USE_MOCKS takes precedence
    expect(dataSource).toBeInstanceOf(MockDS)
  })

  it('handles partial Telegram object gracefully', () => {
    // Partial Telegram object without WebApp
    ;(window as any).Telegram = {}
    
    const dataSource = getDataSource()
    
    expect(dataSource).toBeInstanceOf(MockDS)
  })

  it('handles null/undefined Telegram gracefully', () => {
    ;(window as any).Telegram = null
    
    const dataSource = getDataSource()
    
    expect(dataSource).toBeInstanceOf(MockDS)
  })

  it('validates the logic flow for production environment', () => {
    // Simulate production-like environment
    mockEnv.VITE_USE_MOCKS = 'false'
    
    // Case 1: No Telegram -> MockDS
    const ds1 = getDataSource()
    expect(ds1).toBeInstanceOf(MockDS)
    
    // Case 2: Telegram WebApp without initData -> MockDS
    ;(window as any).Telegram = { WebApp: {} }
    const ds2 = getDataSource()
    expect(ds2).toBeInstanceOf(MockDS)
    
    // Case 3: Telegram WebApp with initData -> TGDS
    ;(window as any).Telegram = { WebApp: { initData: 'valid_data' } }
    const ds3 = getDataSource()
    expect(ds3).toBeInstanceOf(TGDS)
  })

  it('validates the logic flow for development environment', () => {
    // Simulate development environment with mocks enabled
    mockEnv.VITE_USE_MOCKS = 'true'
    
    // Should always return MockDS regardless of Telegram setup
    const ds1 = getDataSource()
    expect(ds1).toBeInstanceOf(MockDS)
    
    ;(window as any).Telegram = { WebApp: { initData: 'valid_data' } }
    const ds2 = getDataSource()
    expect(ds2).toBeInstanceOf(MockDS)
  })
})