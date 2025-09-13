import React from 'react'
import { useParams } from '@tanstack/react-router'
import lesson from '../data/lessons/swift-variables.json'
import { parseLessonStrict } from '../lesson-spec/src'
import { ModuleRenderer } from '../ui/src'
import { useTranslation } from '../i18n/lazy'
<<<<<<< HEAD
import { analytics } from '../analytics/lazy'
=======
import { analytics } from '../lib/analytics/index'
>>>>>>> feature/design-system-foundation
import { useLightApiHealth } from '../hooks/useLightApi'

export const LessonPage = () => {
  const { t } = useTranslation()
  const parsed = parseLessonStrict(lesson as any)
  const { isHealthy: apiHealthy } = useLightApiHealth()
  const [userProgress, setUserProgress] = React.useState<any>(null)

  // Track lesson started
  React.useEffect(() => {
    analytics.lessonStarted({
<<<<<<< HEAD
      lesson_id: parsed.meta.id,
      lesson_title: parsed.meta.title,
      user_language: navigator.language.split('-')[0] || 'en'
=======
      lessonId: parsed.meta.id,
      title: parsed.meta.title
>>>>>>> feature/design-system-foundation
    })
  }, [parsed.meta.id, parsed.meta.title])

  const handleQuizAnswer = (questionId: string, isCorrect: boolean, selectedAnswer: string, timeSpent: number) => {
    analytics.quizAnswered({
<<<<<<< HEAD
      lesson_id: parsed.meta.id,
      question_id: questionId,
      is_correct: isCorrect,
      selected_answer: selectedAnswer,
      time_spent_seconds: timeSpent
=======
      lessonId: parsed.meta.id,
      questionId: questionId,
      correct: isCorrect,
      timeSpent: timeSpent
>>>>>>> feature/design-system-foundation
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
            completion_time_seconds: 1200,
            final_score: 0.85,
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