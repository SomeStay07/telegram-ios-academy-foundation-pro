/**
 * 👤 User API Service - Полная интеграция с Telegram
 * 
 * Сервис для работы с профилем пользователя, синхронизации 
 * данных Telegram и управления настройками.
 */

import { apiClient } from '../client'
import { getTelegramApi } from '../../telegram/api'

// Types для пользователя
export interface TelegramUser {
  id: number
  firstName: string
  lastName?: string
  username?: string
  languageCode?: string
  isPremium?: boolean
  allowsWriteToPm?: boolean
  photoUrl?: string
}

export interface UserProfile {
  id: string
  telegramId: number
  username: string
  firstName: string
  lastName?: string
  email?: string
  photoUrl?: string
  languageCode: string
  timezone?: string
  isPremium: boolean
  
  // Прогресс обучения
  totalLessonsCompleted: number
  totalTimeSpent: number // в минутах
  currentStreak: number
  longestStreak: number
  
  // Настройки
  preferences: {
    theme: 'light' | 'dark' | 'auto'
    language: string
    notifications: {
      dailyReminders: boolean
      achievementAlerts: boolean
      courseUpdates: boolean
    }
    privacy: {
      showProfile: boolean
      showProgress: boolean
    }
  }
  
  // Метаданные
  createdAt: string
  updatedAt: string
  lastActiveAt: string
}

export interface UserStats {
  lessonStats: {
    total: number
    completed: number
    inProgress: number
    avgScore: number
  }
  timeStats: {
    totalMinutes: number
    avgSessionMinutes: number
    longestSessionMinutes: number
  }
  streakStats: {
    current: number
    longest: number
    weeklyGoal: number
    weeklyProgress: number
  }
  achievementStats: {
    total: number
    earned: number
    recentEarned: Array<{
      id: string
      title: string
      earnedAt: string
    }>
  }
}

export interface UserActivity {
  id: string
  type: 'lesson_completed' | 'course_enrolled' | 'achievement_earned' | 'streak_milestone'
  title: string
  description: string
  metadata: Record<string, any>
  timestamp: string
}

export interface SyncTelegramDataPayload {
  telegramUser: TelegramUser
  forceUpdate?: boolean
}

/**
 * User API Service Class
 */
class UserApiService {
  
  /**
   * Получить профиль пользователя
   */
  async getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/user/profile')
  }

  /**
   * Обновить профиль пользователя
   */
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    return apiClient.patch<UserProfile>('/user/profile', updates)
  }

  /**
   * Синхронизировать данные из Telegram
   */
  async syncTelegramData(payload?: Partial<SyncTelegramDataPayload>): Promise<UserProfile> {
    try {
      const telegramApi = getTelegramApi()
      const telegramUser = telegramApi.getUser()
      
      if (!telegramUser.isAvailable) {
        throw new Error('Telegram user data not available')
      }

      const syncPayload: SyncTelegramDataPayload = {
        telegramUser: {
          id: telegramUser.id,
          firstName: telegramUser.firstName,
          lastName: telegramUser.lastName,
          username: telegramUser.username,
          languageCode: telegramUser.languageCode,
          isPremium: telegramUser.isPremium,
          allowsWriteToPm: telegramUser.allowsWriteToPm,
          photoUrl: telegramUser.photoUrl
        },
        forceUpdate: payload?.forceUpdate || false
      }

      return apiClient.post<UserProfile>('/user/sync-telegram', syncPayload)
    } catch (error) {
      console.error('Failed to sync Telegram data:', error)
      throw error
    }
  }

  /**
   * Получить статистику пользователя
   */
  async getStats(): Promise<UserStats> {
    return apiClient.get<UserStats>('/user/stats')
  }

  /**
   * Получить активность пользователя
   */
  async getActivity(limit: number = 20, offset: number = 0): Promise<UserActivity[]> {
    return apiClient.get<UserActivity[]>(`/user/activity?limit=${limit}&offset=${offset}`)
  }

  /**
   * Обновить настройки пользователя
   */
  async updatePreferences(preferences: Partial<UserProfile['preferences']>): Promise<UserProfile> {
    return apiClient.patch<UserProfile>('/user/preferences', { preferences })
  }

  /**
   * Удалить аккаунт пользователя
   */
  async deleteAccount(): Promise<{ success: boolean; message: string }> {
    return apiClient.delete('/user/account')
  }

  /**
   * Экспортировать данные пользователя (GDPR compliance)
   */
  async exportData(): Promise<{ downloadUrl: string; expiresAt: string }> {
    return apiClient.post('/user/export-data')
  }

  /**
   * Получить уведомления пользователя
   */
  async getNotifications(limit: number = 10): Promise<Array<{
    id: string
    type: string
    title: string
    message: string
    isRead: boolean
    createdAt: string
  }>> {
    return apiClient.get(`/user/notifications?limit=${limit}`)
  }

  /**
   * Отметить уведомление как прочитанное
   */
  async markNotificationRead(notificationId: string): Promise<void> {
    return apiClient.patch(`/user/notifications/${notificationId}/read`)
  }

  /**
   * Отметить все уведомления как прочитанные
   */
  async markAllNotificationsRead(): Promise<void> {
    return apiClient.patch('/user/notifications/read-all')
  }

  /**
   * Обновить streak пользователя (внутренний метод)
   */
  async updateStreak(): Promise<{ currentStreak: number; longestStreak: number }> {
    return apiClient.post('/user/streak/update')
  }

  /**
   * Создать или обновить профиль при первом входе
   */
  async createOrUpdateProfile(): Promise<UserProfile> {
    try {
      // Попробуем получить существующий профиль
      return await this.getProfile()
    } catch (error) {
      // Если профиль не найден, синхронизируем с Telegram
      return await this.syncTelegramData({ forceUpdate: true })
    }
  }
}

// Export singleton instance
export const userApiService = new UserApiService()

// Export for dependency injection in tests
export { UserApiService }