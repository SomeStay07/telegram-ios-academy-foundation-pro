import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { VITE } from '../env'
import { getTelegramApi } from '../lib/telegram/api'

const API_BASE_URL = VITE.API_BASE_URL

// Get Telegram WebApp init data for authentication
function getTelegramInitData(): string {
  try {
    const api = getTelegramApi()
    const webApp = api.getWebApp()
    return webApp?.initData || ''
  } catch (error) {
    // Failed to get Telegram init data - fallback to empty string
    return ''
  }
}

// API client with automatic Telegram auth
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const initData = getTelegramInitData()
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'X-Telegram-Init-Data': initData,
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Types for API responses
export interface UserProgress {
  id: string
  userId: string
  lessonId: string
  score: number
  masteryLevel: 'beginner' | 'intermediate' | 'advanced'
  completedAt?: string
  timeSpentMinutes: number
}

export interface LessonAttempt {
  id: string
  lessonId: string
  score: number
  answers: Array<{
    questionId: string
    selectedAnswer: string
    isCorrect: boolean
    timeSpentSeconds: number
  }>
  createdAt: string
}

// API hooks
export function useUserProgress(lessonId?: string) {
  return useQuery({
    queryKey: ['userProgress', lessonId],
    queryFn: () => apiRequest(`/progress${lessonId ? `?lessonId=${lessonId}` : ''}`),
    enabled: !!getTelegramInitData(), // Only fetch if we have Telegram data
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useSubmitLessonAttempt() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (attempt: Omit<LessonAttempt, 'id' | 'createdAt'>) =>
      apiRequest('/attempts', {
        method: 'POST',
        body: JSON.stringify(attempt),
      }),
    onSuccess: (data, variables) => {
      // Invalidate progress queries
      queryClient.invalidateQueries({ queryKey: ['userProgress'] })
      queryClient.invalidateQueries({ queryKey: ['userProgress', variables.lessonId] })
    },
  })
}

export function useUpdateProgress() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (progress: Partial<UserProgress> & { lessonId: string }) =>
      apiRequest('/progress', {
        method: 'PUT',
        body: JSON.stringify(progress),
      }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['userProgress'] })
      queryClient.invalidateQueries({ queryKey: ['userProgress', variables.lessonId] })
    },
  })
}

// Health check for API availability
export function useApiHealth() {
  return useQuery({
    queryKey: ['apiHealth'],
    queryFn: () => apiRequest('/health'),
    retry: 3,
    retryDelay: 1000,
    staleTime: 30 * 1000, // 30 seconds
  })
}