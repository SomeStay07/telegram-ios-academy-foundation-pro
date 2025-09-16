// Interview API client methods
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Types matching the API response interfaces
export interface InterviewProgressResponse {
  id: string
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
  lastIndex: number
  correct: number
  total: number
  metadata?: any
  updatedAt: string
}

export interface InterviewAttemptResponse {
  id: string
  interviewId: string
  questionId: string
  mode: 'drill' | 'explain' | 'mock'
  correct?: boolean | null
  timeSpent: number
  answeredAt: string
}

export interface UpdateInterviewProgressPayload {
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
  lastIndex: number
  correct: number
  total: number
  metadata?: any
}

export interface CreateInterviewAttemptPayload {
  interviewId: string
  questionId: string
  mode: 'drill' | 'explain' | 'mock'
  correct?: boolean
  answerJson?: any
  timeSpent: number
}

// Helper function to get headers including Telegram auth
function getHeaders(idempotencyKey?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  // Add Telegram init data if available
  const tg = (window as any).Telegram?.WebApp
  if (tg?.initData) {
    headers['X-Telegram-Init-Data'] = tg.initData
  }

  // Add idempotency key if provided
  if (idempotencyKey) {
    headers['Idempotency-Key'] = idempotencyKey
  }

  return headers
}

// API timeout and retry configuration
const API_TIMEOUT = 10000 // 10 seconds
const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

async function fetchWithRetry(url: string, options: RequestInit, retries = MAX_RETRIES): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    return response
  } catch (error) {
    clearTimeout(timeoutId)
    
    if (retries > 0 && !(error instanceof DOMException && error.name === 'AbortError')) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return fetchWithRetry(url, options, retries - 1)
    }
    
    throw error
  }
}

// Get interview progress for user
export async function getInterviewProgress(interviewId: string): Promise<InterviewProgressResponse[]> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/interviews/${encodeURIComponent(interviewId)}/progress`,
      {
        method: 'GET',
        headers: getHeaders()
      }
    )
    
    return await response.json()
  } catch (error) {
    console.error('Failed to get interview progress:', error)
    // Return empty progress on error to allow graceful degradation
    return []
  }
}

// Update interview progress
export async function updateInterviewProgress(
  interviewId: string,
  payload: UpdateInterviewProgressPayload
): Promise<InterviewProgressResponse | null> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/interviews/progress/${encodeURIComponent(interviewId)}`,
      {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(payload)
      }
    )
    
    return await response.json()
  } catch (error) {
    console.error('Failed to update interview progress:', error)
    // Return null on error to allow graceful degradation
    return null
  }
}

// Create interview attempt
export async function createInterviewAttempt(
  interviewId: string,
  payload: CreateInterviewAttemptPayload,
  idempotencyKey?: string
): Promise<InterviewAttemptResponse | null> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/interviews/attempts/${encodeURIComponent(interviewId)}`,
      {
        method: 'POST',
        headers: getHeaders(idempotencyKey),
        body: JSON.stringify(payload)
      }
    )
    
    return await response.json()
  } catch (error) {
    console.error('Failed to create interview attempt:', error)
    // Return null on error to allow graceful degradation
    return null
  }
}

// Get interview attempts
export async function getInterviewAttempts(interviewId: string): Promise<InterviewAttemptResponse[]> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/interviews/${encodeURIComponent(interviewId)}/attempts`,
      {
        method: 'GET',
        headers: getHeaders()
      }
    )
    
    return await response.json()
  } catch (error) {
    console.error('Failed to get interview attempts:', error)
    // Return empty array on error to allow graceful degradation
    return []
  }
}