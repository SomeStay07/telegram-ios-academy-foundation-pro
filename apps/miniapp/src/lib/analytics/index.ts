// Analytics adapter - mini layer for tracking
import { NoOpTracker } from './noop'
import { ProxyTracker } from './proxy'
import type { AnalyticsTracker, AnalyticsEvent, AnalyticsProps } from './types'

let tracker: AnalyticsTracker = new NoOpTracker()
let isInitialized = false

function shouldEnableAnalytics(): boolean {
  return import.meta.env.VITE_ENABLE_ANALYTICS === '1'
}

async function initializeAnalytics(): Promise<void> {
  if (isInitialized) return

  try {
    if (import.meta.env.VITE_ANALYTICS_PROXY === '1') {
      // Use proxy mode - send to /api/events
      tracker = new ProxyTracker()
    } else {
      // Use PostHog SDK directly
      const { PostHogTracker } = await import('./posthog')
      tracker = new PostHogTracker()
    }

    await tracker.init()
    isInitialized = true
    
    if (import.meta.env.DEV) {
      console.log('📊 Analytics initialized')
    }
  } catch (error) {
    console.error('Failed to initialize analytics:', error)
    // Keep using no-op tracker
  }
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (!isInitialized && shouldEnableAnalytics()) {
    // Lazy initialize on first track call
    initializeAnalytics().catch(console.error)
  }
  
  tracker.track(event, props)
}

export function identify(userId: string, traits?: Record<string, any>): void {
  if (!isInitialized && shouldEnableAnalytics()) {
    initializeAnalytics().catch(console.error)
  }
  
  if ('identify' in tracker) {
    tracker.identify(userId, traits)
  }
}

// Interview specific events
export function trackInterviewStarted(data: {
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
}): void {
  track('interview_started', {
    interview_id: data.interviewId,
    mode: data.mode
  })
}

export function trackInterviewAnswerSubmitted(data: {
  interviewId: string
  questionId: string
  mode: 'drill' | 'explain' | 'mock'
  timeMs?: number
}): void {
  track('answer_submitted', {
    interview_id: data.interviewId,
    question_id: data.questionId,
    mode: data.mode,
    time_ms: data.timeMs
  })
}

export function trackInterviewCompleted(data: {
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
  totalQuestions: number
  correctCount: number
  durationMs: number
}): void {
  track('interview_completed', {
    interview_id: data.interviewId,
    mode: data.mode,
    total_questions: data.totalQuestions,
    correct_count: data.correctCount,
    duration_ms: data.durationMs
  })
}

// Helpers for typed events
export const analytics = {
  // Core tracking
  track,
  identify,
  
  // Lesson events
  lessonStarted: (props: { lessonId: string; title: string }) => 
    track('lesson_started', props),
  
  lessonCompleted: (props: { lessonId: string; score: number; duration: number }) => 
    track('lesson_completed', props),
  
  // Quiz events  
  quizAnswered: (props: { lessonId: string; questionId: string; correct: boolean; timeSpent: number }) =>
    track('quiz_answered', props),
  
  // Interview events
  interviewStarted: trackInterviewStarted,
  interviewAnswerSubmitted: trackInterviewAnswerSubmitted,
  interviewCompleted: trackInterviewCompleted,
    
  // Performance events
  pageLoad: (props: { route: string; loadTime: number }) =>
    track('page_load', props),
    
  // Error events
  error: (props: { error: string; context?: string }) =>
    track('error', props)
}