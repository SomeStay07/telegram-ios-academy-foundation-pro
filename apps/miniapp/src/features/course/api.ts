// Course API client methods
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Types matching the API response interfaces
export interface CourseResponse {
  id: string
  title: string
  description: string
  lessonIds: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedHours: number
  tags: string[]
}

export interface CourseProgressResponse {
  courseId: string
  userId: string
  overallProgress: number
  completedLessons: number
  totalLessons: number
  lessonProgress: Record<string, {
    score: number
    completed: boolean
    timeSpent: number
    updatedAt: string | null
  }>
  enrolledAt: string
  lastActivityAt: string
}

export interface UnlockCoursePayload {
  accessLevel?: 'basic' | 'premium' | 'enterprise'
}

export interface CourseUnlockResponse {
  courseId: string
  userId: string
  unlocked: boolean
  accessLevel: string
  unlockedAt: string
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

// Get course by ID
export async function getCourse(courseId: string): Promise<CourseResponse | null> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/courses/${encodeURIComponent(courseId)}`,
      {
        method: 'GET',
        headers: getHeaders()
      }
    )
    
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Failed to get course:', error)
    // Return null on error to allow graceful degradation
    return null
  }
}

// Get course progress for user
export async function getCourseProgress(courseId: string): Promise<CourseProgressResponse | null> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/courses/${encodeURIComponent(courseId)}/progress`,
      {
        method: 'GET',
        headers: getHeaders()
      }
    )
    
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Failed to get course progress:', error)
    // Return null on error to allow graceful degradation
    return null
  }
}

// Unlock course for user
export async function unlockCourse(
  courseId: string,
  payload: UnlockCoursePayload = {},
  idempotencyKey?: string
): Promise<CourseUnlockResponse | null> {
  try {
    const response = await fetchWithRetry(
      `${API_BASE_URL}/courses/${encodeURIComponent(courseId)}/unlock`,
      {
        method: 'POST',
        headers: getHeaders(idempotencyKey),
        body: JSON.stringify(payload)
      }
    )
    
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Failed to unlock course:', error)
    // Return null on error to allow graceful degradation
    return null
  }
}

// Helper to transform API response to CourseView component format
export function transformCourseData(
  course: CourseResponse, 
  progress?: CourseProgressResponse | null
): any {
  // Mock lesson data - in real app this would come from lessons API
  const mockLessons = course.lessonIds.map((id, index) => ({
    id,
    title: `Lesson ${index + 1}: ${id.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
    description: `Learn about ${id.replace('-', ' ')} in this comprehensive lesson`,
    estimatedMinutes: 15 + (index * 5), // Variable lesson length
    difficulty: course.difficulty,
    order: index + 1,
    isLocked: false, // Will be calculated based on progress
    isCompleted: progress?.lessonProgress[id]?.completed || false,
    score: progress?.lessonProgress[id]?.score || 0
  }))

  // Apply gating logic - lessons after incomplete ones are locked
  let previousCompleted = true
  mockLessons.forEach(lesson => {
    lesson.isLocked = !previousCompleted
    if (!lesson.isCompleted) {
      previousCompleted = false
    }
  })

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    difficulty: course.difficulty,
    estimatedHours: course.estimatedHours,
    tags: course.tags,
    lessons: mockLessons,
    progress
  }
}