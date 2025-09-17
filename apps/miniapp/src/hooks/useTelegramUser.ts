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
  // Simple mock data - no Telegram integration
  return {
    id: 987654321,
    username: 'ios_developer',
    firstName: 'iOS',
    lastName: 'Developer', 
    fullName: 'iOS Developer',
    languageCode: 'ru',
    avatarUrl: undefined,
    isPremium: false,
    isAvailable: true
  }
}

// Helper functions for Telegram user data
export function getAvatarUrl(user: TelegramUserData): string {
  if (user.avatarUrl) {
    return user.avatarUrl
  }
  
  // Generate initials for fallback
  const initials = `${user.firstName?.charAt(0) || ''}${user.lastName?.charAt(0) || ''}` || user.username?.charAt(0) || 'U'
  
  // Use DiceBear API for avatar generation
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=007AFF&textColor=ffffff`
}

export function getFullName(user: TelegramUserData): string {
  return user.fullName || user.firstName || user.username || 'User'
}

export function getDisplayUsername(user: TelegramUserData): string {
  return user.username ? `@${user.username}` : `User ${user.id}`
}