/**
 * 🚀 Unified API Layer - Main Export
 * 
 * Централизованный экспорт всех API сервисов, хуков и типов
 * для простого и консистентного использования по всему приложению.
 */

// Core API Client
export { apiClient, UnifiedApiClient, ApiClientError } from './client'
export type { ApiResponse, ApiError, PaginatedResponse, ApiRequestConfig } from './client'

// User API Service
export { userApiService, UserApiService } from './services/user'
export type { 
  TelegramUser, 
  UserProfile, 
  UserStats, 
  UserActivity,
  SyncTelegramDataPayload 
} from './services/user'

// User API Hooks
export {
  useUserProfile,
  useUserStats,
  useUserActivity,
  useUserNotifications,
  useUpdateProfile,
  useSyncTelegramData,
  useUpdatePreferences,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
  useInitializeUser,
  useUserInitialization,
  USER_QUERY_KEYS
} from './hooks/useUser'

// Legacy API hooks (for backward compatibility during migration)
export {
  useUserProgress,
  useSubmitLessonAttempt,
  useUpdateProgress,
  useApiHealth
} from '../../hooks/useApi'

// Legacy course API (будет переписан в следующих версиях)
export {
  getCourse,
  getCourseProgress,
  unlockCourse,
  transformCourseData
} from '../../features/course/api'
export type {
  CourseResponse,
  CourseProgressResponse,
  UnlockCoursePayload,
  CourseUnlockResponse
} from '../../features/course/api'

/**
 * Utility function для проверки доступности API
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    await apiClient.healthCheck()
    return true
  } catch (error) {
    console.warn('API health check failed:', error)
    return false
  }
}

/**
 * Utility function для получения информации о подключении
 */
export function getApiConnectionInfo() {
  const telegramApi = getTelegramApi()
  const telegramUser = telegramApi.getUser()
  
  return {
    isOnline: navigator.onLine,
    hasTelegramData: telegramUser.isAvailable,
    telegramUserId: telegramUser.isAvailable ? telegramUser.id : null,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    environment: import.meta.env.NODE_ENV
  }
}

// Import required for utility function
import { getTelegramApi } from '../telegram/api'