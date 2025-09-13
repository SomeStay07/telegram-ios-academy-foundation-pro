// Interview API endpoints for progress tracking
export interface InterviewAttemptRequest {
  interview_id: string
  mode: 'drill' | 'explain' | 'mock'
}

export interface InterviewAttemptResponse {
  id: string
  interview_id: string
  mode: string
  status: 'in_progress' | 'completed'
  progress: {
    current_question_index: number
    answered_questions: string[]
    score?: number
    time_spent: number
    start_time: string
  }
}

export interface InterviewCompletionRequest {
  total_questions: number
  questions_completed: number
  total_time_seconds: number
  completion_rate: number
  answers?: Array<{
    question_id: string
    answer?: string
    self_rating?: number
    time_spent_seconds: number
  }>
}

// Generate idempotency key for interview attempt creation
function generateIdempotencyKey(interviewId: string, mode: string, timestamp: number): string {
  return `interview-${interviewId}-${mode}-${timestamp}`
}

// Start a new interview attempt (POST /interviews/attempts/start)
export async function startInterviewAttempt(
  data: InterviewAttemptRequest
): Promise<InterviewAttemptResponse> {
  const timestamp = Date.now()
  const idempotencyKey = generateIdempotencyKey(data.interview_id, data.mode, timestamp)
  
  const response = await fetch('/api/interviews/attempts/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey
    },
    body: JSON.stringify({
      ...data,
      start_time: new Date(timestamp).toISOString()
    })
  })
  
  if (!response.ok) {
    throw new Error(`Failed to start interview attempt: ${response.statusText}`)
  }
  
  return response.json()
}

// Update interview attempt progress (PATCH /interviews/attempts/{id}/progress)
export async function updateInterviewProgress(
  attemptId: string,
  progress: Partial<InterviewAttemptResponse['progress']>
): Promise<void> {
  const response = await fetch(`/api/interviews/attempts/${attemptId}/progress`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ progress })
  })
  
  if (!response.ok) {
    throw new Error(`Failed to update interview progress: ${response.statusText}`)
  }
}

// Complete interview attempt (PUT /interviews/attempts/{id}/finish)
export async function finishInterviewAttempt(
  attemptId: string,
  completion: InterviewCompletionRequest
): Promise<InterviewAttemptResponse> {
  const response = await fetch(`/api/interviews/attempts/${attemptId}/finish`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...completion,
      status: 'completed',
      completed_at: new Date().toISOString()
    })
  })
  
  if (!response.ok) {
    throw new Error(`Failed to complete interview attempt: ${response.statusText}`)
  }
  
  return response.json()
}

// Get interview attempt by ID (GET /interviews/attempts/{id})
export async function getInterviewAttempt(attemptId: string): Promise<InterviewAttemptResponse> {
  const response = await fetch(`/api/interviews/attempts/${attemptId}`)
  
  if (!response.ok) {
    throw new Error(`Failed to get interview attempt: ${response.statusText}`)
  }
  
  return response.json()
}

// PostHog events for interview tracking
export const InterviewEvents = {
  INTERVIEW_STARTED: 'interview_started',
  ANSWER_SUBMITTED: 'answer_submitted', 
  INTERVIEW_COMPLETED: 'interview_completed'
} as const

export type InterviewEventType = typeof InterviewEvents[keyof typeof InterviewEvents]

// PostHog event data interfaces
export interface InterviewStartedEvent {
  interview_id: string
  mode: 'drill' | 'explain' | 'mock'
  total_questions: number
  attempt_id: string
}

export interface AnswerSubmittedEvent {
  interview_id: string
  question_id: string
  mode: 'drill' | 'explain' | 'mock'
  attempt_id: string
  self_rating?: number
  time_spent_seconds: number
}

export interface InterviewCompletedEvent {
  interview_id: string
  mode: 'drill' | 'explain' | 'mock'
  attempt_id: string
  total_questions: number
  questions_completed: number
  completion_rate: number
  total_time_seconds: number
}