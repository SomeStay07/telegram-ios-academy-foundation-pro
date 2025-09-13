import React from 'react'
import { useParams } from '@tanstack/react-router'
import { InterviewRenderer } from '../features/interview/InterviewRenderer'
import { useInterviewProgress } from '../hooks/useInterviewProgress'
import interview from '../data/interviews/swift-fundamentals.json'
<<<<<<< HEAD
import { analytics } from '../analytics/lazy'
=======
import { analytics } from '../lib/analytics/index'
>>>>>>> feature/design-system-foundation

// Use local version for now
const parseInterviewStrict = (data: any) => data

export const InterviewPage = () => {
  const { interviewId, mode } = useParams({ from: '/interview/$interviewId/$mode' })
  const { saveProgress, getProgress, clearProgress } = useInterviewProgress()
  const parsedInterview = parseInterviewStrict(interview as any)
  
  const handleProgressUpdate = (progress: any) => {
    saveProgress(progress)
  }
  
  const handleComplete = (progress: any) => {
    console.log('Interview completed:', progress)
  }
  
  return (
    <div data-testid="interview-content">
      <InterviewRenderer 
        interviewSet={parsedInterview}
        mode={mode as 'drill' | 'explain' | 'mock'}
        onAnalytics={{
          interviewStarted: analytics.interviewStarted,
          questionRevealed: analytics.questionRevealed,
          answerSubmitted: analytics.answerSubmitted,
          interviewCompleted: analytics.interviewCompleted
        }}
        progress={getProgress(parsedInterview.id)}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleComplete}
      />
    </div>
  )
}