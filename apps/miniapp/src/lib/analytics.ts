// Legacy analytics helpers - теперь используют новый адаптер
import { analytics } from './analytics/index'

// Interview analytics helpers - совместимость с существующим кодом
export async function trackInterviewStarted(data: {
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
}) {
  analytics.interviewStarted({
    interviewId: data.interviewId,
    mode: data.mode
  })
}

export async function trackInterviewAnswerSubmitted(data: {
  interviewId: string
  questionId: string
  mode: 'drill' | 'explain' | 'mock'
  correct?: boolean
  timeMs: number
}) {
  analytics.quizAnswered({
    lessonId: data.interviewId,
    questionId: data.questionId,
    correct: data.correct ?? false,
    timeSpent: Math.round(data.timeMs / 1000)
  })
}

export async function trackInterviewCompleted(data: {
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
  totalQuestions: number
  correctCount: number
  durationMs: number
}) {
  analytics.interviewCompleted({
    interviewId: data.interviewId,
    questionsCount: data.totalQuestions,
    duration: Math.round(data.durationMs / 1000)
  })
}