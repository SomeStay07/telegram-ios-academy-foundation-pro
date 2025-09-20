import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfilePage } from '../pages/ProfilePage'

// Mock Telegram WebApp
const mockWebApp = {
  initDataUnsafe: {
    user: {
      id: 123456789,
      first_name: 'Test',
      last_name: 'User',
      username: 'testuser',
      language_code: 'en',
      photo_url: 'https://example.com/avatar.jpg'
    }
  },
  colorScheme: 'light',
  MainButton: {
    text: '',
    show: vi.fn(),
    hide: vi.fn(),
    enable: vi.fn(),
    disable: vi.fn(),
    onClick: vi.fn(),
    offClick: vi.fn()
  },
  HapticFeedback: {
    impactOccurred: vi.fn()
  },
  showAlert: vi.fn(),
  showConfirm: vi.fn()
}

// Mock zustand store
vi.mock('../shared/model/store', () => ({
  useAppStore: () => ({
    updateProfile: vi.fn(),
    signOut: vi.fn()
  })
}))

Object.defineProperty(window, 'Telegram', {
  value: { WebApp: mockWebApp },
  writable: true
})

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render user data from Telegram', () => {
    render(<ProfilePage />)
    
    // Check if user name is displayed
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('@testuser')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('should display account section with user details', () => {
    render(<ProfilePage />)
    
    // Check account section elements
    expect(screen.getByText('Full Name')).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('User ID')).toBeInTheDocument()
    expect(screen.getByText('123456789')).toBeInTheDocument()
  })

  it('should display preferences section', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Preferences')).toBeInTheDocument()
    expect(screen.getByText('Language')).toBeInTheDocument()
    expect(screen.getByText('Theme')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('should display progress section', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Learning Progress')).toBeInTheDocument()
    expect(screen.getByText('Course Progress')).toBeInTheDocument()
    expect(screen.getByText('3/6')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument() // Interviews
    expect(screen.getByText('85%')).toBeInTheDocument() // Average score
  })

  it('should have danger zone section collapsed by default', () => {
    render(<ProfilePage />)
    
    expect(screen.getByText('Danger Zone')).toBeInTheDocument()
    // Danger zone actions should not be visible initially
    expect(screen.queryByText('Reset Settings')).not.toBeInTheDocument()
    expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
  })

  it('should handle text overflow properly', () => {
    // Test with very long names
    const longNameUser = {
      ...mockWebApp.initDataUnsafe.user,
      first_name: 'VeryVeryVeryLongFirstName',
      last_name: 'VeryVeryVeryLongLastName',
      username: 'veryveryverylongusername'
    }

    Object.defineProperty(window, 'Telegram', {
      value: { 
        WebApp: { 
          ...mockWebApp, 
          initDataUnsafe: { user: longNameUser } 
        } 
      },
      writable: true
    })

    render(<ProfilePage />)
    
    // Check that long text doesn't break layout (should be truncated)
    const nameElement = screen.getByText('VeryVeryVeryLongFirstName VeryVeryVeryLongLastName')
    expect(nameElement).toHaveClass('truncate')
  })

  it('should sync theme with Telegram colorScheme', () => {
    render(<ProfilePage />)
    
    // Check that dark mode is not applied initially (light theme)
    expect(document.documentElement).not.toHaveClass('dark')
  })
})

describe('ProfilePage MainButton Integration', () => {
  it('should hide MainButton initially when no changes', () => {
    render(<ProfilePage />)
    
    // MainButton should be hidden when there are no changes
    expect(mockWebApp.MainButton.hide).toHaveBeenCalled()
  })

  it('should show MainButton when there are unsaved changes', async () => {
    const { container } = render(<ProfilePage />)
    
    // Simulate changing language
    const languageSelect = container.querySelector('select[value="en"]')
    if (languageSelect) {
      // Simulate change event
      const changeEvent = new Event('change', { bubbles: true })
      Object.defineProperty(changeEvent, 'target', {
        value: { value: 'ru' }
      })
      languageSelect.dispatchEvent(changeEvent)
    }

    // MainButton should be shown and enabled
    expect(mockWebApp.MainButton.text).toBe('Save')
  })
})