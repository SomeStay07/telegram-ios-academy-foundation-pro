// Telegram WebApp types
declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        initDataUnsafe?: {
          user?: {
            id: number;
            first_name?: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            photo_url?: string;
            is_premium?: boolean;
          }
        }
      }
    }
  }
}

export interface TelegramUserData {
  id: number
  username?: string
  firstName?: string
  lastName?: string
  fullName: string
  languageCode: string
  avatarUrl?: string
  isPremium?: boolean
  isAvailable: boolean
}

export function useTelegramUser(): TelegramUserData {
  // Get real Telegram user data using the proper way
  const webApp = (window as any)?.Telegram?.WebApp;
  
  // Production: Remove debug logging
  
  // Check if we're in Telegram WebApp environment
  if (webApp && webApp.initDataUnsafe?.user) {
    const user = webApp.initDataUnsafe.user;
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || 'User';

    // Production: Using real Telegram user data

    return {
      id: user.id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
      fullName,
      languageCode: user.language_code || 'en',
      avatarUrl: user.photo_url,
      isPremium: user.is_premium || false,
      isAvailable: true
    }
  }

  // Check if running in development mode with mock data override
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';
  if (useMocks) {
    return {
      id: 777,
      username: 'somestay07',
      firstName: 'Timur',
      lastName: 'C.',
      fullName: 'Timur C.',
      languageCode: 'en',
      avatarUrl: undefined,
      isPremium: false,
      isAvailable: true
    }
  }

  // Final fallback - no user data available
  return {
    id: 0,
    username: undefined,
    firstName: undefined,
    lastName: undefined,
    fullName: 'User',
    languageCode: 'en',
    avatarUrl: undefined,
    isPremium: false,
    isAvailable: false
  }
}

// Helper functions for Telegram user data
export function getAvatarUrl(user: TelegramUserData): string {
  // Use Telegram photo URL if available
  if (user.avatarUrl) {
    return user.avatarUrl
  }
  
  // Generate proper initials for fallback
  let initials = '';
  if (user.firstName && user.lastName) {
    initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
  } else if (user.firstName) {
    initials = user.firstName.charAt(0)
  } else if (user.username) {
    initials = user.username.charAt(0).toUpperCase()
  } else {
    initials = 'U'
  }
  
  // Use DiceBear API for avatar generation with better styling
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=007AFF&textColor=ffffff&fontSize=36`
}

export function getFullName(user: TelegramUserData): string {
  return user.fullName || user.firstName || user.username || 'User'
}

export function getDisplayUsername(user: TelegramUserData): string {
  return user.username ? `@${user.username}` : `User ${user.id}`
}