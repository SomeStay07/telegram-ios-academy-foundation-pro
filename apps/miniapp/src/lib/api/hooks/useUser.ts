/**
 * 🎣 User API Hooks - React Query интеграция
 * 
 * Реактивные хуки для работы с пользовательскими данными
 * с автоматическим кэшированием и синхронизацией.
 */

import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApiService, type UserProfile, type UserStats, type UserActivity } from '../services/user'
import { getTelegramApi } from '../../telegram/api'

// Query Keys для консистентного кэширования
export const USER_QUERY_KEYS = {
  profile: () => ['user', 'profile'] as const,
  stats: () => ['user', 'stats'] as const,
  activity: (limit?: number, offset?: number) => ['user', 'activity', { limit, offset }] as const,
  notifications: (limit?: number) => ['user', 'notifications', { limit }] as const,
} as const

/**
 * Хук для получения профиля пользователя
 */
export function useUserProfile() {
  const telegramApi = getTelegramApi()
  const telegramUser = telegramApi.getUser()

  return useQuery({
    queryKey: USER_QUERY_KEYS.profile(),
    queryFn: () => userApiService.getProfile(),
    enabled: telegramUser.isAvailable, // Только если Telegram доступен
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 30 * 60 * 1000, // 30 минут в кэше
    retry: (failureCount, error: any) => {
      // Не повторяем при 401/403 ошибках
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        return false
      }
      return failureCount < 3
    }
  })
}

/**
 * Хук для получения статистики пользователя
 */
export function useUserStats() {
  const { data: profile } = useUserProfile()

  return useQuery({
    queryKey: USER_QUERY_KEYS.stats(),
    queryFn: () => userApiService.getStats(),
    enabled: !!profile, // Только если профиль загружен
    staleTime: 2 * 60 * 1000, // 2 минуты
    gcTime: 10 * 60 * 1000, // 10 минут в кэше
  })
}

/**
 * Хук для получения активности пользователя
 */
export function useUserActivity(limit: number = 20, offset: number = 0) {
  const { data: profile } = useUserProfile()

  return useQuery({
    queryKey: USER_QUERY_KEYS.activity(limit, offset),
    queryFn: () => userApiService.getActivity(limit, offset),
    enabled: !!profile,
    staleTime: 1 * 60 * 1000, // 1 минута
    gcTime: 5 * 60 * 1000, // 5 минут в кэше
  })
}

/**
 * Хук для получения уведомлений пользователя
 */
export function useUserNotifications(limit: number = 10) {
  const { data: profile } = useUserProfile()

  return useQuery({
    queryKey: USER_QUERY_KEYS.notifications(limit),
    queryFn: () => userApiService.getNotifications(limit),
    enabled: !!profile,
    staleTime: 30 * 1000, // 30 секунд
    gcTime: 2 * 60 * 1000, // 2 минуты в кэше
    refetchInterval: 60 * 1000, // Обновлять каждую минуту
  })
}

/**
 * Мутация для обновления профиля
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updates: Partial<UserProfile>) => userApiService.updateProfile(updates),
    onMutate: async (updates) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.profile() })
      
      const previousProfile = queryClient.getQueryData(USER_QUERY_KEYS.profile())
      
      queryClient.setQueryData(USER_QUERY_KEYS.profile(), (old: UserProfile | undefined) => 
        old ? { ...old, ...updates } : old
      )

      return { previousProfile }
    },
    onError: (err, variables, context) => {
      // Rollback на ошибке
      if (context?.previousProfile) {
        queryClient.setQueryData(USER_QUERY_KEYS.profile(), context.previousProfile)
      }
    },
    onSuccess: () => {
      // Инвалидировать связанные запросы
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.stats() })
    },
  })
}

/**
 * Мутация для синхронизации с Telegram
 */
export function useSyncTelegramData() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (forceUpdate?: boolean) => userApiService.syncTelegramData({ forceUpdate }),
    onSuccess: (data) => {
      // Обновить кэш профиля
      queryClient.setQueryData(USER_QUERY_KEYS.profile(), data)
      
      // Инвалидировать связанные запросы
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.stats() })
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.activity() })
    },
  })
}

/**
 * Мутация для обновления настроек
 */
export function useUpdatePreferences() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (preferences: Partial<UserProfile['preferences']>) => 
      userApiService.updatePreferences(preferences),
    onMutate: async (preferences) => {
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.profile() })
      
      const previousProfile = queryClient.getQueryData(USER_QUERY_KEYS.profile())
      
      queryClient.setQueryData(USER_QUERY_KEYS.profile(), (old: UserProfile | undefined) => 
        old ? { 
          ...old, 
          preferences: { ...old.preferences, ...preferences }
        } : old
      )

      return { previousProfile }
    },
    onError: (err, variables, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(USER_QUERY_KEYS.profile(), context.previousProfile)
      }
    },
  })
}

/**
 * Мутация для отметки уведомления как прочитанного
 */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (notificationId: string) => userApiService.markNotificationRead(notificationId),
    onSuccess: () => {
      // Обновить список уведомлений
      queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] })
    },
  })
}

/**
 * Мутация для отметки всех уведомлений как прочитанных
 */
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => userApiService.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] })
    },
  })
}

/**
 * Автоматическая инициализация профиля при первом входе
 */
export function useInitializeUser() {
  const queryClient = useQueryClient()
  const telegramApi = getTelegramApi()

  return useMutation({
    mutationFn: () => userApiService.createOrUpdateProfile(),
    onSuccess: (profile) => {
      // Установить данные в кэш
      queryClient.setQueryData(USER_QUERY_KEYS.profile(), profile)
      
      // Предзагрузить статистику
      queryClient.prefetchQuery({
        queryKey: USER_QUERY_KEYS.stats(),
        queryFn: () => userApiService.getStats(),
        staleTime: 5 * 60 * 1000,
      })
    },
  })
}

/**
 * Комбинированный хук для полной инициализации пользователя
 */
export function useUserInitialization() {
  const profile = useUserProfile()
  const initializeUser = useInitializeUser()
  const telegramApi = getTelegramApi()
  const telegramUser = telegramApi.getUser()

  // Автоматически инициализировать если Telegram доступен но профиль не загружен
  React.useEffect(() => {
    if (telegramUser.isAvailable && !profile.data && !profile.isLoading && !initializeUser.isPending) {
      initializeUser.mutate()
    }
  }, [telegramUser.isAvailable, profile.data, profile.isLoading, initializeUser])

  return {
    profile: profile.data,
    isLoading: profile.isLoading || initializeUser.isPending,
    error: profile.error || initializeUser.error,
    isInitializing: initializeUser.isPending,
    isReady: !!profile.data && !profile.isLoading,
  }
}

// Экспорт для использования в других компонентах
export type { UserProfile, UserStats, UserActivity }