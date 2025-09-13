import React, { useState, useEffect, useRef, useCallback } from 'react'
import { InterviewSet } from '@telegram-ios-academy/interview-spec'
import { Button } from '../components/Button'
import { Modal } from '../components/Modal'
import { Card } from '../components/Card'

export interface InterviewProgress {
  interview_id: string
  current_question_index: number
  answers: Array<{
    question_id: string
    answer: string
    answer_type: 'text' | 'audio'
    time_spent_seconds: number
    self_rating?: 1 | 2 | 3 | 4 | 5
    timestamp: number
  }>
  start_time: number
  mode: 'drill' | 'explain' | 'mock'
}

export type InterviewMode = 'drill' | 'explain' | 'mock'

export interface InterviewRendererProps {
  interviewSet: InterviewSet
  mode: InterviewMode
  onAnalytics: {
    interviewStarted: (data: any) => void
    questionRevealed: (data: any) => void
    answerSubmitted: (data: any) => void
    interviewCompleted: (data: any) => void
  }
  progress?: InterviewProgress
  onProgressUpdate: (progress: InterviewProgress) => void
  onComplete: (progress: InterviewProgress) => void
}

interface TimerState {
  startTime: number
  isRunning: boolean
  elapsedSeconds: number
}

const ModeDescription: Record<InterviewMode, string> = {
  drill: 'Quick-fire practice questions. Answer rapidly to build confidence.',
  explain: 'Deep-dive explanations. Take your time to provide thorough answers.',
  mock: 'Simulated interview session with timer. Practice under realistic conditions.'
}

export const InterviewRenderer: React.FC<InterviewRendererProps> = ({
  interviewSet,
  mode,
  onAnalytics,
  progress,
  onProgressUpdate,
  onComplete
}) => {
  const [currentProgress, setCurrentProgress] = useState<InterviewProgress>(
    progress || {
      interview_id: interviewSet.id,
      current_question_index: 0,
      answers: [],
      start_time: Date.now(),
      mode
    }
  )

  const [currentAnswer, setCurrentAnswer] = useState('')
  const [selfRating, setSelfRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)
  const [isStarted, setIsStarted] = useState(!!progress)
  const [showExitModal, setShowExitModal] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  
  // Timer state
  const [timer, setTimer] = useState<TimerState>({
    startTime: Date.now(),
    isRunning: false,
    elapsedSeconds: 0
  })
  
  // Audio recording
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])

  const currentQuestion = interviewSet.questions[currentProgress.current_question_index]
  const isLastQuestion = currentProgress.current_question_index >= interviewSet.questions.length - 1
  const totalQuestions = interviewSet.questions.length

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timer.isRunning) {
      interval = setInterval(() => {
        setTimer(prev => ({
          ...prev,
          elapsedSeconds: Math.floor((Date.now() - prev.startTime) / 1000)
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer.isRunning])

  // Start interview
  const startInterview = useCallback(() => {
    setIsStarted(true)
    setTimer({ startTime: Date.now(), isRunning: true, elapsedSeconds: 0 })
    
    // Track interview started
    onAnalytics.interviewStarted({
      interview_id: interviewSet.id,
      interview_title: interviewSet.title,
      mode,
      total_questions: totalQuestions,
      difficulty_level: getMostCommonDifficulty(),
      categories: getUniqueCategories()
    })

    // Track first question revealed
    if (currentQuestion) {
      onAnalytics.questionRevealed({
        interview_id: interviewSet.id,
        question_id: currentQuestion.id,
        question_index: currentProgress.current_question_index,
        category: currentQuestion.category,
        difficulty: currentQuestion.difficulty,
        mode,
        tags: currentQuestion.tags
      })
    }
  }, [interviewSet, mode, totalQuestions, currentQuestion, currentProgress.current_question_index, onAnalytics])

  // Helper functions
  const getMostCommonDifficulty = () => {
    const counts = interviewSet.questions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) as 'beginner' | 'intermediate' | 'advanced'
  }

  const getUniqueCategories = () => {
    return Array.from(new Set(interviewSet.questions.map(q => q.category)))
  }

  // Audio recording functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setCurrentAnswer(audioUrl)
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Failed to start recording:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
      setIsRecording(false)
    }
  }

  // Submit answer
  const submitAnswer = () => {
    const questionStartTime = timer.startTime
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000)
    const isAudio = currentAnswer.startsWith('blob:')

    const answer = {
      question_id: currentQuestion.id,
      answer: currentAnswer,
      answer_type: (isAudio ? 'audio' : 'text') as 'text' | 'audio',
      time_spent_seconds: timeSpent,
      ...(mode === 'mock' && selfRating && { self_rating: selfRating }),
      timestamp: Date.now()
    }

    const newProgress = {
      ...currentProgress,
      answers: [...currentProgress.answers, answer]
    }

    // Track answer submitted
    onAnalytics.answerSubmitted({
      interview_id: interviewSet.id,
      question_id: currentQuestion.id,
      question_index: currentProgress.current_question_index,
      mode,
      answer_type: answer.answer_type,
      answer_length_chars: isAudio ? undefined : currentAnswer.length,
      time_spent_seconds: timeSpent,
      self_rating: selfRating || undefined
    })

    setCurrentProgress(newProgress)
    onProgressUpdate(newProgress)

    // Reset for next question
    setCurrentAnswer('')
    setSelfRating(null)
    setShowAnswer(false)
    setTimer({ startTime: Date.now(), isRunning: true, elapsedSeconds: 0 })
  }

  // Next question
  const nextQuestion = () => {
    if (isLastQuestion) {
      completeInterview()
      return
    }

    const newProgress = {
      ...currentProgress,
      current_question_index: currentProgress.current_question_index + 1
    }

    const nextQ = interviewSet.questions[newProgress.current_question_index]
    
    // Track next question revealed
    onAnalytics.questionRevealed({
      interview_id: interviewSet.id,
      question_id: nextQ.id,
      question_index: newProgress.current_question_index,
      category: nextQ.category,
      difficulty: nextQ.difficulty,
      mode,
      tags: nextQ.tags
    })

    setCurrentProgress(newProgress)
    onProgressUpdate(newProgress)
  }

  // Complete interview
  const completeInterview = () => {
    setTimer(prev => ({ ...prev, isRunning: false }))
    
    const totalTime = Math.floor((Date.now() - currentProgress.start_time) / 1000)
    const completedQuestions = currentProgress.answers.length
    
    // Track interview completed
    onAnalytics.interviewCompleted({
      interview_id: interviewSet.id,
      interview_title: interviewSet.title,
      mode,
      total_questions: totalQuestions,
      questions_completed: completedQuestions,
      total_time_seconds: totalTime,
      completion_rate: completedQuestions / totalQuestions,
      average_time_per_question: totalTime / Math.max(completedQuestions, 1)
    })

    onComplete(currentProgress)
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!isStarted) {
    return (
      <Card style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ marginTop: 0, color: 'var(--color-primary)' }}>
          {interviewSet.title}
        </h1>
        
        <div style={{ 
          padding: '16px', 
          background: mode === 'drill' ? '#e0f2fe' : mode === 'explain' ? '#f3e5f5' : '#fff3e0',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <h3 style={{ margin: '0 0 8px 0' }}>
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {ModeDescription[mode]}
          </p>
        </div>

        <div style={{ marginBottom: '24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <p>📊 {totalQuestions} questions</p>
          <p>🏷️ Categories: {getUniqueCategories().join(', ')}</p>
          <p>⏱️ {mode === 'mock' ? 'Timed practice session' : 'Self-paced learning'}</p>
        </div>

        <Button onClick={startInterview} variant="primary" style={{ padding: '16px 32px', fontSize: '16px' }}>
          Start Interview
        </Button>
      </Card>
    )
  }

  if (!currentQuestion) {
    return (
      <Card style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <h2>🎉 Interview Complete!</h2>
        <p>You've completed {currentProgress.answers.length} out of {totalQuestions} questions.</p>
        <Button onClick={() => onComplete(currentProgress)}>
          View Results
        </Button>
      </Card>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '24px',
        padding: '16px',
        background: 'var(--color-bg-secondary)',
        borderRadius: '8px'
      }}>
        <div>
          <h2 style={{ margin: 0 }}>
            Question {currentProgress.current_question_index + 1} of {totalQuestions}
          </h2>
          <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
            {currentQuestion.category} • {currentQuestion.difficulty}
            {mode === 'mock' && (
              <> • ⏱️ {formatTime(timer.elapsedSeconds)}</>
            )}
          </div>
        </div>
        <Button 
          onClick={() => setShowExitModal(true)} 
          variant="secondary"
          style={{ padding: '8px 16px' }}
        >
          Exit
        </Button>
      </div>

      {/* Progress bar */}
      <div style={{ 
        width: '100%', 
        height: '4px', 
        background: 'var(--color-bg-secondary)', 
        borderRadius: '2px',
        marginBottom: '24px'
      }}>
        <div style={{ 
          width: `${((currentProgress.current_question_index + 1) / totalQuestions) * 100}%`,
          height: '100%',
          background: 'var(--color-primary)',
          borderRadius: '2px',
          transition: 'width 0.3s ease'
        }} />
      </div>

      {/* Question */}
      <Card style={{ marginBottom: '24px' }}>
        <h3 style={{ marginTop: 0, color: 'var(--color-primary)' }}>
          Question
        </h3>
        <p style={{ fontSize: '16px', lineHeight: 1.6, marginBottom: '16px' }}>
          {currentQuestion.prompt}
        </p>
        
        {currentQuestion.codeSample && (
          <pre style={{
            background: 'var(--color-bg-secondary)',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            overflow: 'auto'
          }}>
            <code>{currentQuestion.codeSample}</code>
          </pre>
        )}
        
        {currentQuestion.tags.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            {currentQuestion.tags.map(tag => (
              <span 
                key={tag}
                style={{
                  display: 'inline-block',
                  background: 'var(--color-primary)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginRight: '8px'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>

      {/* Answer input */}
      <Card style={{ marginBottom: '24px' }}>
        <h3 style={{ marginTop: 0 }}>Your Answer</h3>
        
        {mode !== 'drill' && (
          <div style={{ marginBottom: '16px' }}>
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              variant={isRecording ? 'danger' : 'secondary'}
              style={{ marginRight: '8px' }}
            >
              {isRecording ? '⏹️ Stop Recording' : '🎤 Voice Answer'}
            </Button>
          </div>
        )}
        
        <textarea
          value={currentAnswer.startsWith('blob:') ? '🎵 Audio recorded' : currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          placeholder="Type your answer here..."
          disabled={currentAnswer.startsWith('blob:')}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '12px',
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical'
          }}
        />

        {mode === 'mock' && (
          <div style={{ marginTop: '16px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>
              Rate your confidence (1-5):
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4, 5].map(rating => (
                <Button
                  key={rating}
                  onClick={() => setSelfRating(rating as 1 | 2 | 3 | 4 | 5)}
                  variant={selfRating === rating ? 'primary' : 'secondary'}
                  style={{ padding: '8px 12px' }}
                >
                  {rating}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: '16px', display: 'flex', gap: '12px' }}>
          <Button
            onClick={submitAnswer}
            variant="primary"
            disabled={!currentAnswer || (mode === 'mock' && !selfRating)}
          >
            Submit Answer
          </Button>
          
          {mode === 'explain' && (
            <Button
              onClick={() => setShowAnswer(!showAnswer)}
              variant="secondary"
            >
              {showAnswer ? 'Hide' : 'Show'} Model Answer
            </Button>
          )}
        </div>
      </Card>

      {/* Model answer (explain mode) */}
      {mode === 'explain' && showAnswer && (
        <Card style={{ marginBottom: '24px', background: '#f0f9ff' }}>
          <h3 style={{ marginTop: 0, color: '#0369a1' }}>Model Answer</h3>
          <p style={{ marginBottom: '16px' }}>{currentQuestion.modelAnswer}</p>
          
          {currentQuestion.pitfalls.length > 0 && (
            <>
              <h4 style={{ color: '#dc2626', marginBottom: '8px' }}>Common Pitfalls:</h4>
              <ul style={{ marginBottom: '16px' }}>
                {currentQuestion.pitfalls.map((pitfall, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{pitfall}</li>
                ))}
              </ul>
            </>
          )}
          
          {currentQuestion.references.length > 0 && (
            <>
              <h4 style={{ marginBottom: '8px' }}>References:</h4>
              <ul>
                {currentQuestion.references.map((ref, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{ref}</li>
                ))}
              </ul>
            </>
          )}
        </Card>
      )}

      {/* Navigation */}
      {currentAnswer && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Button
            onClick={nextQuestion}
            variant="primary"
            style={{ padding: '12px 24px', fontSize: '16px' }}
          >
            {isLastQuestion ? 'Complete Interview' : 'Next Question →'}
          </Button>
        </div>
      )}

      {/* Exit Modal */}
      <Modal
        open={showExitModal}
        onClose={() => setShowExitModal(false)}
        title="Exit Interview"
      >
        <p>Are you sure you want to exit? Your progress will be saved.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button onClick={() => setShowExitModal(false)} variant="secondary">
            Continue
          </Button>
          <Button onClick={() => onComplete(currentProgress)} variant="danger">
            Exit & Save
          </Button>
        </div>
      </Modal>
    </div>
  )
}