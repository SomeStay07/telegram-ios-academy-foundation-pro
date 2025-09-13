// Analytics adapter - mini layer for tracking
import { NoOpTracker } from './noop'
import type { AnalyticsTracker, AnalyticsEvent, AnalyticsProps } from './types'

let tracker: AnalyticsTracker = new NoOpTracker()
let isInitialized = false

function shouldEnableAnalytics(): boolean {
  return import.meta.env.VITE_ENABLE_ANALYTICS === '1'
}

async function initializeAnalytics(): Promise<void> {
  if (isInitialized) return

  if (import.meta.env.VITE_ANALYTICS_PROXY === '1') {
    // Use proxy mode - send to /api/events
    const { ProxyTracker } = await import('./proxy')
    tracker = new ProxyTracker()
  } else {
    // Use PostHog SDK directly
    const { PostHogTracker } = await import('./posthog')
    tracker = new PostHogTracker()
  }

  await tracker.init()
  isInitialized = true
}

export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  if (!isInitialized && shouldEnableAnalytics()) {
    // Lazy initialize on first track call
    initializeAnalytics().catch(console.error)
  }
  
  tracker.track(event, props)
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

export function trackAnswerSubmitted(data: {
  interviewId: string
  questionId: string
  mode: 'drill' | 'explain' | 'mock'
}): void {
  track('answer_submitted', {
    interview_id: data.interviewId,
    question_id: data.questionId,
    mode: data.mode
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

// Legacy exports for compatibility
export const analytics = {
  track,
  trackInterviewStarted,
  trackAnswerSubmitted,
  trackInterviewCompleted
}