// Deep-link generation utilities for bot

export interface DeepLinkData {
  type: 'lesson' | 'course' | 'interview'
  id: string
  mode?: 'drill' | 'explain' | 'mock'
  metadata?: Record<string, string>
}

// Generate start_param string from structured data
export function generateStartParam(data: DeepLinkData): string {
  const parts = [data.type, data.id]
  
  // Add mode for interviews
  if (data.type === 'interview' && data.mode) {
    parts.push(data.mode)
  }
  
  // Add metadata
  if (data.metadata) {
    Object.entries(data.metadata).forEach(([key, value]) => {
      parts.push(`${key}=${encodeURIComponent(value)}`)
    })
  }
  
  return parts.join('_')
}

// Generate Telegram deep link
export function generateTelegramLink(botUsername: string, startParam: string): string {
  const encodedParam = encodeURIComponent(startParam)
  return `https://t.me/${botUsername}?start=${encodedParam}`
}

// Generate Telegram Web App link  
export function generateTelegramWebAppLink(botUsername: string, webAppUrl: string, startParam?: string): string {
  if (startParam) {
    return `https://t.me/${botUsername}/app?startapp=${encodeURIComponent(startParam)}`
  }
  return webAppUrl
}

// Convenience functions for common deep-link types
export class DeepLinkGenerator {
  constructor(
    private botUsername: string,
    private webAppUrl: string
  ) {}

  // Lesson deep-links
  lessonLink(lessonId: string, metadata?: Record<string, string>): string {
    const startParam = generateStartParam({
      type: 'lesson',
      id: lessonId,
      metadata
    })
    return generateTelegramWebAppLink(this.botUsername, this.webAppUrl, startParam)
  }

  // Course deep-links
  courseLink(courseId: string, metadata?: Record<string, string>): string {
    const startParam = generateStartParam({
      type: 'course',
      id: courseId,
      metadata
    })
    return generateTelegramWebAppLink(this.botUsername, this.webAppUrl, startParam)
  }

  // Interview deep-links
  interviewLink(
    interviewId: string, 
    mode: 'drill' | 'explain' | 'mock' = 'drill',
    metadata?: Record<string, string>
  ): string {
    const startParam = generateStartParam({
      type: 'interview',
      id: interviewId,
      mode,
      metadata
    })
    return generateTelegramWebAppLink(this.botUsername, this.webAppUrl, startParam)
  }

  // Traditional bot deep-links (not Web App)
  botLessonLink(lessonId: string, metadata?: Record<string, string>): string {
    const startParam = generateStartParam({
      type: 'lesson',
      id: lessonId,
      metadata
    })
    return generateTelegramLink(this.botUsername, startParam)
  }

  botCourseLink(courseId: string, metadata?: Record<string, string>): string {
    const startParam = generateStartParam({
      type: 'course',
      id: courseId,
      metadata
    })
    return generateTelegramLink(this.botUsername, startParam)
  }

  botInterviewLink(
    interviewId: string, 
    mode: 'drill' | 'explain' | 'mock' = 'drill',
    metadata?: Record<string, string>
  ): string {
    const startParam = generateStartParam({
      type: 'interview',
      id: interviewId,
      mode,
      metadata
    })
    return generateTelegramLink(this.botUsername, startParam)
  }
}

// Pre-configured course and lesson mappings
export const COURSES = {
  'ios-fundamentals': {
    title: 'iOS Development Fundamentals',
    description: 'Master the fundamentals of iOS development with Swift',
    emoji: '📱',
    lessons: ['swift-variables', 'swift-functions', 'swift-optionals']
  },
  'swift-advanced': {
    title: 'Advanced Swift Programming',
    description: 'Advanced Swift concepts and patterns',
    emoji: '⚡',
    lessons: ['swift-generics', 'swift-protocols', 'swift-memory']
  },
  'uikit-mastery': {
    title: 'UIKit Mastery',
    description: 'Complete guide to UIKit framework',
    emoji: '🎨',
    lessons: ['views-basics', 'auto-layout', 'animations']
  }
} as const

export const INTERVIEWS = {
  'swift-fundamentals': {
    title: 'Swift Fundamentals Interview',
    description: 'Test your Swift basics knowledge',
    emoji: '💬'
  },
  'ios-ui-patterns': {
    title: 'iOS UI Patterns Interview',
    description: 'UI/UX patterns and best practices',
    emoji: '🎯'
  },
  'memory-management': {
    title: 'Memory Management Interview',
    description: 'ARC, retain cycles, and performance',
    emoji: '🧠'
  }
} as const

export type CourseId = keyof typeof COURSES
export type InterviewId = keyof typeof INTERVIEWS