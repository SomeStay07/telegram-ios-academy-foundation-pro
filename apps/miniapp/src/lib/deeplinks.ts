// Deeplinks parser for Telegram startapp parameter
// Format: startapp=lesson_{id}|course_{id}|interview_{id}_{mode}

export interface DeeplinkResult {
  type: 'lesson' | 'course' | 'interview'
  id: string
  mode?: 'drill' | 'explain' | 'mock'
  path: string
}

export function parseDeeplink(startapp: string): DeeplinkResult | null {
  if (!startapp || typeof startapp !== 'string') {
    return null
  }

  // Remove any whitespace and convert to lowercase
  const param = startapp.trim().toLowerCase()

  // Parse lesson deeplink: lesson_{id}
  const lessonMatch = param.match(/^lesson_([a-zA-Z0-9\-_]+)$/)
  if (lessonMatch) {
    const lessonId = lessonMatch[1]
    return {
      type: 'lesson',
      id: lessonId,
      path: `/lesson/${lessonId}`
    }
  }

  // Parse course deeplink: course_{id}
  const courseMatch = param.match(/^course_([a-zA-Z0-9\-_]+)$/)
  if (courseMatch) {
    const courseId = courseMatch[1]
    return {
      type: 'course',
      id: courseId,
      path: `/course/${courseId}`
    }
  }

  // Parse interview deeplink: interview_{id}_{mode}
  const interviewMatch = param.match(/^interview_([a-zA-Z0-9\-_]+)_(drill|explain|mock)$/)
  if (interviewMatch) {
    const interviewId = interviewMatch[1]
    const mode = interviewMatch[2] as 'drill' | 'explain' | 'mock'
    return {
      type: 'interview',
      id: interviewId,
      mode,
      path: `/interview/${interviewId}?mode=${mode}`
    }
  }

  // Invalid format
  return null
}

export function createDeeplink(type: 'lesson' | 'course' | 'interview', id: string, mode?: 'drill' | 'explain' | 'mock'): string {
  switch (type) {
    case 'lesson':
      return `lesson_${id}`
    case 'course':
      return `course_${id}`
    case 'interview':
      if (!mode) {
        throw new Error('Mode is required for interview deeplinks')
      }
      return `interview_${id}_${mode}`
    default:
      throw new Error(`Invalid deeplink type: ${type}`)
  }
}

export function handleTelegramDeeplink(navigate: (path: string) => void) {
  // Get Telegram WebApp init data
  const tgWebApp = window.Telegram?.WebApp
  if (!tgWebApp?.initDataUnsafe?.start_param) {
    return false
  }

  const startParam = tgWebApp.initDataUnsafe.start_param
  const deeplink = parseDeeplink(startParam)
  
  if (!deeplink) {
    console.warn('Invalid deeplink format:', startParam)
    return false
  }

  // Navigate to the parsed path
  navigate(deeplink.path)
  return true
}

// Validation helpers
export function isValidLessonId(id: string): boolean {
  return /^[a-zA-Z0-9\-_]+$/.test(id) && id.length >= 1 && id.length <= 100
}

export function isValidCourseId(id: string): boolean {
  return /^[a-zA-Z0-9\-_]+$/.test(id) && id.length >= 1 && id.length <= 100
}

export function isValidInterviewId(id: string): boolean {
  return /^[a-zA-Z0-9\-_]+$/.test(id) && id.length >= 1 && id.length <= 100
}

export function isValidInterviewMode(mode: string): mode is 'drill' | 'explain' | 'mock' {
  return ['drill', 'explain', 'mock'].includes(mode)
}