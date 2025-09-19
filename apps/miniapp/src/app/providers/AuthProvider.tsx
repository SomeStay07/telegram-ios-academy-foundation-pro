/**
 * Auth Provider for Telegram WebApp
 * 
 * Handles authentication flow via Telegram initData
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { telegram, type TelegramUser } from '../../lib/telegram'

// Auth state types
export interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: TelegramUser | null
  jwt: string | null
  error: string | null
}

export interface AuthContextType extends AuthState {
  login: (initData: string) => Promise<void>
  logout: () => void
  clearError: () => void
}

// API response types
interface AuthResponse {
  success: boolean
  user: TelegramUser
  jwt?: string
  message?: string
}

// Create context
const AuthContext = createContext<AuthContextType | null>(null)

// Auth Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    jwt: null,
    error: null
  })

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  /**
   * Verify Telegram initData with backend
   */
  const verifyInitData = async (initData: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/verifyInitData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Telegram-Init-Data': initData
      },
      credentials: 'include' // Include cookies for session management
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Auth failed: ${response.status}`)
    }

    return response.json()
  }

  /**
   * Login with Telegram initData
   */
  const login = async (initData: string): Promise<void> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      const authResult = await verifyInitData(initData)
      
      setState(prev => ({
        ...prev,
        isAuthenticated: true,
        isLoading: false,
        user: authResult.user,
        jwt: authResult.jwt || null,
        error: null
      }))

      // Store JWT in localStorage if provided
      if (authResult.jwt) {
        localStorage.setItem('telegram_jwt', authResult.jwt)
      }

      console.log('✅ Auth success:', authResult.user)
    } catch (error) {
      console.error('❌ Auth failed:', error)
      
      setState(prev => ({
        ...prev,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        jwt: null,
        error: error instanceof Error ? error.message : 'Authentication failed'
      }))

      // Clear any stored JWT
      localStorage.removeItem('telegram_jwt')
    }
  }

  /**
   * Logout user
   */
  const logout = (): void => {
    setState({
      isAuthenticated: false,
      isLoading: false,
      user: null,
      jwt: null,
      error: null
    })

    // Clear stored JWT
    localStorage.removeItem('telegram_jwt')
    
    console.log('🚪 User logged out')
  }

  /**
   * Clear error state
   */
  const clearError = (): void => {
    setState(prev => ({ ...prev, error: null }))
  }

  /**
   * Initialize auth on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for stored JWT first
        const storedJWT = localStorage.getItem('telegram_jwt')
        if (storedJWT) {
          console.log('📱 Found stored JWT, checking validity...')
          // In a real app, you'd validate the JWT with the backend
          // For now, we'll try to get fresh data from Telegram
        }

        // Try to get Telegram init data
        const { raw: initData, unsafe } = await telegram.getInitData()
        
        if (initData && unsafe?.user) {
          console.log('📱 Found Telegram initData, verifying with backend...')
          await login(initData)
        } else {
          console.log('📱 No Telegram initData found')
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: null
          }))
        }
      } catch (error) {
        console.warn('📱 Auth initialization failed:', error)
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to initialize authentication'
        }))
      }
    }

    initializeAuth()
  }, [])

  const contextValue: AuthContextType = {
    ...state,
    login,
    logout,
    clearError
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Hook to use auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

/**
 * Hook to get current user
 */
export function useUser(): TelegramUser | null {
  const { user } = useAuth()
  return user
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const { isAuthenticated } = useAuth()
  return isAuthenticated
}