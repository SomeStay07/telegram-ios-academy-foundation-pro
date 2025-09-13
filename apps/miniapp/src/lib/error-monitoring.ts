// Sentry error monitoring rules
// Мониторинг критических ошибок для производственного окружения

import { analytics } from './analytics/index'

// Типы критических ошибок для мониторинга
export enum CriticalErrorType {
  CHUNK_LOAD_ERROR = 'chunk_load_error',
  ANALYTICS_GAP = 'analytics_gap',
  ROUTE_ERROR = 'route_error',
  RENDER_ERROR = 'render_error',
  API_ERROR = 'api_error'
}

// Интерфейс для ошибки
interface ErrorDetails {
  type: CriticalErrorType
  message: string
  stack?: string
  context?: Record<string, any>
  timestamp: number
}

// Глобальный обработчик ошибок
export function setupErrorMonitoring(): void {
  if (typeof window === 'undefined') return

  // Обработка chunk load errors (критическая проблема lazy loading)
  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('.js') && event.message.includes('Loading')) {
      reportCriticalError({
        type: CriticalErrorType.CHUNK_LOAD_ERROR,
        message: `Failed to load chunk: ${event.filename}`,
        stack: event.error?.stack,
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          userAgent: navigator.userAgent
        },
        timestamp: Date.now()
      })
    }
  })

  // Обработка unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    // Игнорируем некритичные ошибки загрузки
    if (event.reason?.message?.includes('ResizeObserver')) {
      return
    }

    reportCriticalError({
      type: CriticalErrorType.RENDER_ERROR,
      message: `Unhandled promise rejection: ${event.reason}`,
      stack: event.reason?.stack,
      context: {
        reason: String(event.reason),
        userAgent: navigator.userAgent
      },
      timestamp: Date.now()
    })
  })

  // Мониторинг долгих периодов без аналитических событий
  let lastAnalyticsEvent = Date.now()
  const checkAnalyticsGap = () => {
    const gap = Date.now() - lastAnalyticsEvent
    // Если больше 10 минут без событий аналитики - это подозрительно
    if (gap > 10 * 60 * 1000) {
      reportCriticalError({
        type: CriticalErrorType.ANALYTICS_GAP,
        message: `No analytics events for ${Math.round(gap / 1000 / 60)} minutes`,
        context: {
          gap: gap,
          lastEvent: lastAnalyticsEvent,
          userAgent: navigator.userAgent
        },
        timestamp: Date.now()
      })
      lastAnalyticsEvent = Date.now() // Reset to avoid spam
    }
  }

  // Проверяем каждые 5 минут
  setInterval(checkAnalyticsGap, 5 * 60 * 1000)

  // Хук для отслеживания аналитических событий
  const originalTrack = analytics.pageLoad
  analytics.pageLoad = (...args) => {
    lastAnalyticsEvent = Date.now()
    return originalTrack(...args)
  }

  if (import.meta.env.DEV) {
    console.log('🔍 Error monitoring initialized')
  }
}

// Отправка критических ошибок
function reportCriticalError(error: ErrorDetails): void {
  // Отправляем через analytics для агрегации
  analytics.error({
    error: error.message,
    context: JSON.stringify({
      type: error.type,
      stack: error.stack?.substring(0, 500), // Ограничиваем размер
      ...error.context
    })
  })

  // Отправляем в Sentry если доступен
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(new Error(error.message), {
      tags: {
        error_type: error.type,
        critical: 'true'
      },
      extra: error.context,
      fingerprint: [error.type, error.message]
    })
  }

  // Логируем в консоль в development
  if (import.meta.env.DEV) {
    console.error('🚨 Critical error:', error)
  }
}

// Экспорт для ручной отправки ошибок из компонентов
export function reportError(type: CriticalErrorType, message: string, context?: Record<string, any>): void {
  reportCriticalError({
    type,
    message,
    context,
    timestamp: Date.now()
  })
}

// Автоматическая инициализация
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  // Инициализируем с небольшой задержкой чтобы не блокировать загрузку
  setTimeout(setupErrorMonitoring, 1000)
}