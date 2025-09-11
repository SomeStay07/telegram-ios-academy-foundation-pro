import posthog from 'posthog-js'
import { trace, SpanStatusCode } from '@opentelemetry/api'
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web'

// Initialize OpenTelemetry
const provider = new WebTracerProvider()
provider.addSpanProcessor(
  // For now, just log traces to console in development
  // In production, this would send to a backend
  {
    onStart: () => {},
    onEnd: (span) => {
      if (import.meta.env.DEV) {
        console.log('OTEL Span:', {
          name: span.name,
          duration: span.duration,
          attributes: span.attributes,
          status: span.status
        })
      }
    },
    forceFlush: () => Promise.resolve(),
    shutdown: () => Promise.resolve()
  }
)
provider.register()

// Auto-instrument fetch, DOM events, etc.
getWebAutoInstrumentations()

const tracer = trace.getTracer('telegram-ios-academy-miniapp')

// Initialize PostHog
function initPostHog() {
  const tg = (window as any).Telegram?.WebApp
  const userId = tg?.initDataUnsafe?.user?.id?.toString()
  
  if (import.meta.env.VITE_POSTHOG_API_KEY) {
    posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      loaded: (posthog) => {
        if (userId) {
          posthog.identify(userId, {
            telegram_user_id: userId,
            first_name: tg.initDataUnsafe.user.first_name,
            username: tg.initDataUnsafe.user.username,
            language_code: tg.initDataUnsafe.user.language_code,
            platform: 'telegram_miniapp'
          })
        }
      }
    })
  }
}

// Analytics event types
export interface LessonStartedEvent {
  lesson_id: string
  lesson_title: string
  user_language: string
}

export interface QuizAnsweredEvent {
  lesson_id: string
  question_id: string
  is_correct: boolean
  selected_answer: string
  time_spent_seconds: number
}

export interface CheckpointPassedEvent {
  lesson_id: string
  checkpoint_id: string
  score: number
  passed: boolean
  attempt_count: number
}

export interface LessonCompletedEvent {
  lesson_id: string
  lesson_title: string
  completion_time_seconds: number
  final_score: number
  mastery_level: 'beginner' | 'intermediate' | 'advanced'
}

// Analytics functions
export const analytics = {
  lessonStarted: (data: LessonStartedEvent) => {
    const span = tracer.startSpan('lesson_started')
    span.setAttributes({
      'lesson.id': data.lesson_id,
      'lesson.title': data.lesson_title,
      'user.language': data.user_language
    })
    
    posthog.capture('lesson_started', data)
    
    span.setStatus({ code: SpanStatusCode.OK })
    span.end()
  },

  quizAnswered: (data: QuizAnsweredEvent) => {
    const span = tracer.startSpan('quiz_answered')
    span.setAttributes({
      'lesson.id': data.lesson_id,
      'question.id': data.question_id,
      'answer.is_correct': data.is_correct,
      'answer.time_spent': data.time_spent_seconds
    })
    
    posthog.capture('quiz_answered', data)
    
    span.setStatus({ code: SpanStatusCode.OK })
    span.end()
  },

  checkpointPassed: (data: CheckpointPassedEvent) => {
    const span = tracer.startSpan('checkpoint_passed')
    span.setAttributes({
      'lesson.id': data.lesson_id,
      'checkpoint.id': data.checkpoint_id,
      'checkpoint.score': data.score,
      'checkpoint.passed': data.passed,
      'checkpoint.attempt_count': data.attempt_count
    })
    
    posthog.capture('checkpoint_passed', data)
    
    span.setStatus({ code: SpanStatusCode.OK })
    span.end()
  },

  lessonCompleted: (data: LessonCompletedEvent) => {
    const span = tracer.startSpan('lesson_completed')
    span.setAttributes({
      'lesson.id': data.lesson_id,
      'lesson.title': data.lesson_title,
      'lesson.completion_time': data.completion_time_seconds,
      'lesson.final_score': data.final_score,
      'lesson.mastery_level': data.mastery_level
    })
    
    posthog.capture('lesson_completed', data)
    
    span.setStatus({ code: SpanStatusCode.OK })
    span.end()
  }
}

// Initialize analytics
export function initAnalytics() {
  initPostHog()
  console.log('Analytics initialized')
}