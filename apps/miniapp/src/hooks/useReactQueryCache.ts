import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useMemo } from 'react'

/**
 * React Query caching hooks
 * Follows Performance Guidelines for API data caching
 */

/**
 * Hook for caching API responses with React Query
 */
export const useApiQuery = <T>(
  queryKey: string[],
  queryFn: () => Promise<T>,
  options: {
    staleTime?: number
    cacheTime?: number
    refetchOnWindowFocus?: boolean
    enabled?: boolean
  } = {}
) => {
  const defaultOptions = useMemo(() => ({
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 2,
    ...options
  }), [options])

  return useQuery({
    queryKey,
    queryFn,
    ...defaultOptions
  })
}

/**
 * Hook for caching user profile data
 */
export const useUserProfileCache = (userId: number, enabled = true) => {
  return useApiQuery(
    ['user-profile', userId.toString()],
    async () => {
      const response = await fetch(`/api/users/${userId}/profile`)
      if (!response.ok) throw new Error('Failed to fetch user profile')
      return response.json()
    },
    {
      enabled: enabled && userId > 0,
      staleTime: 2 * 60 * 1000, // 2 minutes for profile data
      cacheTime: 5 * 60 * 1000 // 5 minutes cache
    }
  )
}

/**
 * Hook for caching user achievements
 */
export const useUserAchievementsCache = (userId: number, enabled = true) => {
  return useApiQuery(
    ['user-achievements', userId.toString()],
    async () => {
      const response = await fetch(`/api/users/${userId}/achievements`)
      if (!response.ok) throw new Error('Failed to fetch achievements')
      return response.json()
    },
    {
      enabled: enabled && userId > 0,
      staleTime: 10 * 60 * 1000, // 10 minutes for achievements
      cacheTime: 30 * 60 * 1000 // 30 minutes cache
    }
  )
}

/**
 * Hook for caching user activity
 */
export const useUserActivityCache = (userId: number, enabled = true) => {
  return useApiQuery(
    ['user-activity', userId.toString()],
    async () => {
      const response = await fetch(`/api/users/${userId}/activity`)
      if (!response.ok) throw new Error('Failed to fetch activity')
      return response.json()
    },
    {
      enabled: enabled && userId > 0,
      staleTime: 1 * 60 * 1000, // 1 minute for activity data
      cacheTime: 5 * 60 * 1000 // 5 minutes cache
    }
  )
}

/**
 * Hook for prefetching related data
 */
export const usePrefetchProfile = () => {
  const queryClient = useQueryClient()
  
  const prefetchUserData = useCallback(async (userId: number) => {
    await Promise.allSettled([
      queryClient.prefetchQuery({
        queryKey: ['user-profile', userId.toString()],
        queryFn: async () => {
          const response = await fetch(`/api/users/${userId}/profile`)
          if (!response.ok) throw new Error('Failed to fetch user profile')
          return response.json()
        },
        staleTime: 2 * 60 * 1000
      }),
      queryClient.prefetchQuery({
        queryKey: ['user-achievements', userId.toString()],
        queryFn: async () => {
          const response = await fetch(`/api/users/${userId}/achievements`)
          if (!response.ok) throw new Error('Failed to fetch achievements')
          return response.json()
        },
        staleTime: 10 * 60 * 1000
      }),
      queryClient.prefetchQuery({
        queryKey: ['user-activity', userId.toString()],
        queryFn: async () => {
          const response = await fetch(`/api/users/${userId}/activity`)
          if (!response.ok) throw new Error('Failed to fetch activity')
          return response.json()
        },
        staleTime: 1 * 60 * 1000
      })
    ])
  }, [queryClient])

  const invalidateUserData = useCallback((userId: number) => {
    queryClient.invalidateQueries({
      queryKey: ['user-profile', userId.toString()]
    })
    queryClient.invalidateQueries({
      queryKey: ['user-achievements', userId.toString()]
    })
    queryClient.invalidateQueries({
      queryKey: ['user-activity', userId.toString()]
    })
  }, [queryClient])

  return {
    prefetchUserData,
    invalidateUserData
  }
}

/**
 * Hook for managing cache mutations
 */
export const useApiMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void
    onError?: (error: Error, variables: TVariables) => void
    invalidateQueries?: string[][]
  } = {}
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate related queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey })
        })
      }
      
      options.onSuccess?.(data, variables)
    },
    onError: options.onError
  })
}