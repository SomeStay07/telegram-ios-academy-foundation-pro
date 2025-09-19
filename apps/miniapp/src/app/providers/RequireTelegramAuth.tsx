/**
 * Telegram Auth Gate Component
 * 
 * Renders content only if user is authenticated via Telegram
 * Otherwise shows OpenInTelegram placeholder
 */

import React, { ReactNode } from 'react'
import { useAuth } from './AuthProvider'
import { OpenInTelegram } from '../../components/auth/OpenInTelegram'
import { AuthLoadingScreen } from '../../components/auth/AuthLoadingScreen'

interface RequireTelegramAuthProps {
  children: ReactNode
  fallback?: ReactNode
}

export function RequireTelegramAuth({ 
  children, 
  fallback 
}: RequireTelegramAuthProps) {
  const { isAuthenticated, isLoading, error } = useAuth()

  // Show loading screen while checking authentication
  if (isLoading) {
    return <AuthLoadingScreen />
  }

  // Show error state if authentication failed
  if (error && !isAuthenticated) {
    return fallback || <OpenInTelegram error={error} />
  }

  // Show OpenInTelegram if not authenticated
  if (!isAuthenticated) {
    return fallback || <OpenInTelegram />
  }

  // User is authenticated, render children
  return <>{children}</>
}

// Higher-order component version
export function withTelegramAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(props: P) {
    return (
      <RequireTelegramAuth>
        <Component {...props} />
      </RequireTelegramAuth>
    )
  }
}