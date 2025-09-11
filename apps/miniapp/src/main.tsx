import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRootRoute, createRoute, createRouter, RouterProvider, Outlet } from '@tanstack/react-router'
import lesson from '../../../content/seed/lessons/swift-variables.json'
import { parseLessonStrict } from './lesson-spec/src'
import { ModuleRenderer } from './ui/src'
import './ui/src/styles/globals.css'
import { analytics } from './analytics/lazy'
import { useTranslation } from './i18n/lazy'
import { useLightApiHealth } from './hooks/useLightApi'
import { applyTelegramTheme, watchTelegramTheme } from './utils/telegram-theme'

// Lazy load QueryClient when needed
let queryClient: any = null
async function getQueryClient() {
  if (!queryClient) {
    const { QueryClient } = await import('@tanstack/react-query')
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: 3,
          staleTime: 5 * 60 * 1000, // 5 minutes
        },
      },
    })
  }
  return queryClient
}

const Root = createRootRoute({ component: () => <div style={{maxWidth:720, margin:'0 auto', padding:16}}><Outlet /></div> })
const rootRoute = new Root()

const LessonPage = () => {
  const { t } = useTranslation()
  const parsed = parseLessonStrict(lesson as any)
  const { isHealthy: apiHealthy } = useLightApiHealth()
  // Full API features loaded lazily when needed
  const [userProgress, setUserProgress] = React.useState<any>(null)

  // Track lesson started
  React.useEffect(() => {
    analytics.lessonStarted({
      lesson_id: parsed.meta.id,
      lesson_title: parsed.meta.title,
      user_language: navigator.language.split('-')[0] || 'en'
    })
  }, [parsed.meta.id, parsed.meta.title])

  const handleQuizAnswer = (questionId: string, isCorrect: boolean, selectedAnswer: string, timeSpent: number) => {
    // Track quiz answered
    analytics.quizAnswered({
      lesson_id: parsed.meta.id,
      question_id: questionId,
      is_correct: isCorrect,
      selected_answer: selectedAnswer,
      time_spent_seconds: timeSpent
    })

    console.log('Quiz answered:', { questionId, isCorrect, selectedAnswer, timeSpent })
  }

  return <div data-testid="lesson-content">
    <div className="mb-4 p-3 bg-blue-50 rounded-lg">
      <h1 className="text-xl font-bold text-telegram-text">{parsed.meta.title}</h1>
      <p className="text-sm text-telegram-hint">{parsed.meta.description}</p>
      <div className="mt-2 text-xs">
        API Status: {apiHealthy ? '✅ Connected' : '⚠️ Offline'} | 
        Progress: {userProgress ? `${Math.round(userProgress.score * 100)}%` : 'New'}
      </div>
    </div>
    
    {parsed.modules.map((m:any, index: number) => <div 
      key={m.id} 
      className="mb-4 animate-fade-in"
      data-module-type={m.type}
      data-module-id={m.id}
    >
      <ModuleRenderer 
        module={m} 
        onQuizAnswer={(id, ok, answer, time) => handleQuizAnswer(id, ok, answer || '', time || 0)} 
      />
      {index < parsed.modules.length - 1 && (
        <div className="flex justify-center mt-4">
          <button className="px-4 py-2 bg-telegram-button text-white rounded-lg hover:bg-opacity-90 transition-colors">
            {t('lesson.continue')}
          </button>
        </div>
      )}
    </div>)}
    
    <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
      <button 
        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
        data-testid="complete-lesson-button"
        onClick={() => {
          analytics.lessonCompleted({
            lesson_id: parsed.meta.id,
            lesson_title: parsed.meta.title,
            completion_time_seconds: 1200, // Would track actual time
            final_score: 0.85, // Would calculate from quiz results
            mastery_level: 'beginner'
          })
          console.log('Lesson completed!')
        }}
      >
        {t('lesson.complete')}
      </button>
    </div>
  </div>
}

const lessonRoute = createRoute({ getParent: () => rootRoute, path: '/', component: LessonPage })
const router = createRouter({ routeTree: rootRoute.addChildren([lessonRoute]) })

declare module '@tanstack/react-router' { interface Register { router: typeof router } }

function initTmaRouting() {
  const tg = (window as any).Telegram?.WebApp
  if (!tg) return
  tg.ready?.(); tg.expand?.()
  
  // Apply Telegram theme on startup
  applyTelegramTheme()
  
  // Watch for theme changes
  watchTelegramTheme((newTheme) => {
    console.log('🎨 Theme updated:', newTheme)
  })
  
  const setBack = () => {
    const idx = (router.history as any).state.index ?? 0
    idx > 0 ? tg.BackButton?.show?.() : tg.BackButton?.hide?.()
  }
  tg.BackButton?.onClick?.(() => router.history.back())
  router.subscribe(setBack); setBack()
  const startParam = tg.initDataUnsafe?.start_param
  if (startParam) router.navigate({ to: `/lesson/${startParam}` })
}
initTmaRouting()

// Simple app without heavy dependencies initially
function App() {
  const [enhanced, setEnhanced] = React.useState(false)
  
  React.useEffect(() => {
    // Enhance the app after initial render
    setTimeout(async () => {
      await getQueryClient() // Preload for future use
      setEnhanced(true)
    }, 1000)
  }, [])

  return <RouterProvider router={router} />
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)