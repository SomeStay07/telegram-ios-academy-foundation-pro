// Мини-слой аналитики через адаптер
// По умолчанию no-op, lazy загрузка PostHog только при включенной аналитике

type AnalyticsEvent = string
type AnalyticsProps = Record<string, any>

// Интерфейс трекера
interface AnalyticsTracker {
  track(event: AnalyticsEvent, props?: AnalyticsProps): void
  identify(userId: string, traits?: Record<string, any>): void
  init(): Promise<void>
}

// Proxy трекер для серверного проксирования
class ProxyTracker implements AnalyticsTracker {
  track(event: AnalyticsEvent, props?: AnalyticsProps): void {
    if (typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const payload = JSON.stringify({ event, props, ts: Date.now() })
      navigator.sendBeacon('/api/events', payload)
    } else {
      // Fallback для случаев когда sendBeacon недоступен
      fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, props, ts: Date.now() })
      }).catch(console.error)
    }
  }
  
  identify(userId: string, traits?: Record<string, any>): void {
    this.track('$identify', { userId, ...traits })
  }
  
  async init(): Promise<void> {
    // No initialization needed for proxy mode
  }
}

// No-op трекер по умолчанию
class NoOpTracker implements AnalyticsTracker {
  track(event: AnalyticsEvent, props?: AnalyticsProps): void {
    if (import.meta.env.DEV) {
      console.log(`📊 Analytics (disabled): ${event}`, props)
    }
  }
  
  identify(userId: string, traits?: Record<string, any>): void {
    if (import.meta.env.DEV) {
      console.log(`👤 Analytics (disabled): identify`, { userId, traits })
    }
  }
  
  async init(): Promise<void> {
    // No-op
  }
}

// Глобальный трекер (начинаем с no-op)
let tracker: AnalyticsTracker = new NoOpTracker()

// Флаг инициализации
let isInitialized = false

// Главная функция трекинга
export function track(event: AnalyticsEvent, props?: AnalyticsProps): void {
  // Ленивая инициализация при первом взаимодействии
  if (!isInitialized && shouldEnableAnalytics()) {
    initializeAnalytics().catch(console.error)
  }
  
  tracker.track(event, props)
}

// Идентификация пользователя
export function identify(userId: string, traits?: Record<string, any>): void {
  if (!isInitialized && shouldEnableAnalytics()) {
    initializeAnalytics().catch(console.error)
  }
  
  tracker.identify(userId, traits)
}

// Проверяем, нужна ли аналитика
function shouldEnableAnalytics(): boolean {
  return import.meta.env.VITE_ENABLE_ANALYTICS === '1'
}

// Проверяем режим проксирования
function shouldUseProxy(): boolean {
  return import.meta.env.VITE_ANALYTICS_PROXY === '1'
}

// Ленивая инициализация аналитики
async function initializeAnalytics(): Promise<void> {
  if (isInitialized) return
  
  try {
    if (shouldUseProxy()) {
      // Режим проксирования через API
      tracker = new ProxyTracker()
      await tracker.init()
      isInitialized = true
      
      if (import.meta.env.DEV) {
        console.log('📊 Analytics initialized (Proxy mode)')
      }
    } else if (import.meta.env.PROD && import.meta.env.VITE_POSTHOG_API_KEY) {
      // Прямой режим через PostHog SDK
      const { PostHogTracker } = await import(/* @vite-ignore */ './posthog')
      const posthogTracker = new PostHogTracker()
      await posthogTracker.init()
      
      // Подменяем трекер
      tracker = posthogTracker
      isInitialized = true
      
      if (import.meta.env.DEV) {
        console.log('📊 Analytics initialized (PostHog SDK)')
      }
    }
  } catch (error) {
    console.error('Failed to initialize analytics:', error)
    // Остаемся с no-op трекером
  }
}

// Хелперы для типизированных событий
export const analytics = {
  // Lesson events
  lessonStarted: (props: { lessonId: string; title: string }) => 
    track('lesson_started', props),
  
  lessonCompleted: (props: { lessonId: string; score: number; duration: number }) => 
    track('lesson_completed', props),
  
  // Quiz events  
  quizAnswered: (props: { lessonId: string; questionId: string; correct: boolean; timeSpent: number }) =>
    track('quiz_answered', props),
  
  // Interview events
  interviewStarted: (props: { interviewId: string; mode: 'drill' | 'explain' | 'mock' }) =>
    track('interview_started', props),
    
  interviewCompleted: (props: { interviewId: string; questionsCount: number; duration: number }) =>
    track('interview_completed', props),
    
  // Performance events
  pageLoad: (props: { route: string; loadTime: number }) =>
    track('page_load', props),
    
  // Error events
  error: (props: { error: string; context?: string }) =>
    track('error', props)
}