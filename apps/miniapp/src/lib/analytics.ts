<<<<<<< HEAD
// Analytics helper functions for easy event tracking
import { analytics } from '../analytics/lazy'

// Interview analytics helpers
export function trackInterviewStarted(data: {
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
}) {
  // Use default values for optional fields
  return analytics.interviewStarted({
    interview_id: data.interviewId,
    interview_title: data.interviewId, // Will be enhanced with real title later
    mode: data.mode,
    total_questions: 0, // Will be set when questions are loaded
    difficulty_level: 'intermediate' as const,
    categories: []
  })
}

export function trackInterviewAnswerSubmitted(data: {
=======
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
>>>>>>> feature/design-system-foundation
  interviewId: string
  questionId: string
  mode: 'drill' | 'explain' | 'mock'
  correct?: boolean
  timeMs: number
}) {
<<<<<<< HEAD
  return analytics.answerSubmitted({
    interview_id: data.interviewId,
    question_id: data.questionId,
    question_index: 0, // Will be enhanced with real index
    mode: data.mode,
    answer_type: 'text' as const,
    time_spent_seconds: Math.round(data.timeMs / 1000),
    ...(data.correct !== undefined && { self_rating: data.correct ? 5 : 2 })
  })
}

export function trackInterviewCompleted(data: {
=======
  analytics.quizAnswered({
    lessonId: data.interviewId,
    questionId: data.questionId,
    correct: data.correct ?? false,
    timeSpent: Math.round(data.timeMs / 1000)
  })
}

export async function trackInterviewCompleted(data: {
>>>>>>> feature/design-system-foundation
  interviewId: string
  mode: 'drill' | 'explain' | 'mock'
  totalQuestions: number
  correctCount: number
  durationMs: number
}) {
<<<<<<< HEAD
  const completionRate = data.totalQuestions > 0 ? data.correctCount / data.totalQuestions : 0
  const averageTime = data.totalQuestions > 0 ? data.durationMs / data.totalQuestions / 1000 : 0

  return analytics.interviewCompleted({
    interview_id: data.interviewId,
    interview_title: data.interviewId, // Will be enhanced with real title
    mode: data.mode,
    total_questions: data.totalQuestions,
    questions_completed: data.totalQuestions,
    total_time_seconds: Math.round(data.durationMs / 1000),
    completion_rate: completionRate,
    average_time_per_question: Math.round(averageTime)
=======
  analytics.interviewCompleted({
    interviewId: data.interviewId,
    questionsCount: data.totalQuestions,
    duration: Math.round(data.durationMs / 1000)
>>>>>>> feature/design-system-foundation
  })
}