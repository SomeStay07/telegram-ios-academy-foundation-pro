import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { InterviewRenderer } from '../InterviewRenderer'
import type { InterviewSet, InterviewAnalytics } from '../InterviewRenderer'

// Mock analytics
vi.mock('../../../lib/analytics', () => ({
  trackInterviewStarted: vi.fn(),
  trackAnswerSubmitted: vi.fn(),
  trackInterviewCompleted: vi.fn(),
}))

// Mock crypto.randomUUID
Object.defineProperty(global.crypto, 'randomUUID', {
  value: () => 'mock-uuid-1234'
})

// Mock fetch
global.fetch = vi.fn()

const mockInterviewSet: InterviewSet = {
  id: 'test-interview',
  title: 'Test Interview',
  description: 'A test interview for unit testing',
  questions: [
    {
      id: 'q1',
      category: 'iOS',
      difficulty: 'beginner',
      prompt: 'What is Swift?',
      modelAnswer: 'Swift is a programming language developed by Apple.',
      pitfalls: ['Don\'t confuse with Objective-C'],
      codeExample: 'let greeting = "Hello, Swift!"'
    },
    {
      id: 'q2',
      category: 'Architecture',
      difficulty: 'intermediate',
      prompt: 'Explain MVVM pattern',
      modelAnswer: 'MVVM is Model-View-ViewModel architectural pattern.',
    }
  ]
}

const mockAnalytics: InterviewAnalytics = {
  interviewStarted: vi.fn(),
  questionRevealed: vi.fn(),
  answerSubmitted: vi.fn(),
  interviewCompleted: vi.fn(),
}

describe('InterviewRenderer', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset fetch mock
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ attemptId: 'mock-attempt-id' })
    })
  })

  it('renders interview header and first question', () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    expect(screen.getByText('Test Interview')).toBeInTheDocument()
    expect(screen.getByText('Drill Mode')).toBeInTheDocument()
    expect(screen.getByText('What is Swift?')).toBeInTheDocument()
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
  })

  it('starts API attempt on initialization', async () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/interviews/test-interview/attempts',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Idempotency-Key': 'mock-uuid-1234',
            'X-Telegram-Init-Data': 'mock-data'
          }),
          body: JSON.stringify({
            questionId: 'q1',
            mode: 'drill'
          })
        })
      )
    })
  })

  it('tracks analytics events on initialization', async () => {
    const { trackInterviewStarted } = await import('../../../lib/analytics')
    
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    expect(trackInterviewStarted).toHaveBeenCalledWith({
      interviewId: 'test-interview',
      mode: 'drill'
    })

    expect(mockAnalytics.interviewStarted).toHaveBeenCalledWith({
      interview_id: 'test-interview',
      mode: 'drill',
      question_count: 2
    })
  })

  it('allows user to submit answer and reveal model answer', async () => {
    const { trackAnswerSubmitted } = await import('../../../lib/analytics')
    
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    // Type an answer
    const textarea = screen.getByPlaceholderText('Type your answer here...')
    fireEvent.change(textarea, { target: { value: 'Swift is a programming language' } })

    // Submit answer
    const submitButton = screen.getByText('Submit Answer')
    fireEvent.click(submitButton)

    // Check analytics
    expect(trackAnswerSubmitted).toHaveBeenCalledWith({
      interviewId: 'test-interview',
      questionId: 'q1',
      mode: 'drill'
    })

    // Check model answer is revealed
    expect(screen.getByText('Model Answer')).toBeInTheDocument()
    expect(screen.getByText('Swift is a programming language developed by Apple.')).toBeInTheDocument()
    expect(screen.getByText('Code Example:')).toBeInTheDocument()
    expect(screen.getByText('let greeting = "Hello, Swift!"')).toBeInTheDocument()
  })

  it('shows pitfalls when available', () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    // Submit answer to reveal model answer
    const textarea = screen.getByPlaceholderText('Type your answer here...')
    fireEvent.change(textarea, { target: { value: 'Test answer' } })
    fireEvent.click(screen.getByText('Submit Answer'))

    expect(screen.getByText('Common Pitfalls:')).toBeInTheDocument()
    expect(screen.getByText('Don\'t confuse with Objective-C')).toBeInTheDocument()
  })

  it('advances to next question', () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    // Submit first answer
    const textarea = screen.getByPlaceholderText('Type your answer here...')
    fireEvent.change(textarea, { target: { value: 'Test answer' } })
    fireEvent.click(screen.getByText('Submit Answer'))

    // Go to next question
    fireEvent.click(screen.getByText('Next Question'))

    // Check we're on question 2
    expect(screen.getByText('Question 2 of 2')).toBeInTheDocument()
    expect(screen.getByText('Explain MVVM pattern')).toBeInTheDocument()
    expect(screen.getByText('intermediate')).toBeInTheDocument()
  })

  it('completes interview and calls API finish endpoint', async () => {
    const { trackInterviewCompleted } = await import('../../../lib/analytics')
    const onComplete = vi.fn()
    
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
        onComplete={onComplete}
      />
    )

    // Go through all questions
    const textarea = screen.getByPlaceholderText('Type your answer here...')
    
    // First question
    fireEvent.change(textarea, { target: { value: 'Test answer 1' } })
    fireEvent.click(screen.getByText('Submit Answer'))
    fireEvent.click(screen.getByText('Next Question'))

    // Second question  
    fireEvent.change(textarea, { target: { value: 'Test answer 2' } })
    fireEvent.click(screen.getByText('Submit Answer'))
    
    // Complete interview
    fireEvent.click(screen.getByText('Complete Interview'))

    // Check API finish call
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/interviews/attempts/mock-attempt-id/finish',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'X-Telegram-Init-Data': 'mock-data'
          }),
          body: expect.stringContaining('correct')
        })
      )
    })

    // Check analytics
    expect(trackInterviewCompleted).toHaveBeenCalledWith({
      interviewId: 'test-interview',
      mode: 'drill',
      totalQuestions: 2,
      correctCount: 2,
      durationMs: expect.any(Number)
    })

    expect(onComplete).toHaveBeenCalled()
  })

  it('handles API errors gracefully', async () => {
    // Mock fetch to fail
    ;(global.fetch as any).mockRejectedValue(new Error('API Error'))
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to start interview attempt:', expect.any(Error))
    })

    consoleSpy.mockRestore()
  })

  it('shows skip button in drill mode', () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    expect(screen.getByText('Skip & Show Answer')).toBeInTheDocument()
  })

  it('does not show skip button in mock mode', () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="mock"
        onAnalytics={mockAnalytics}
      />
    )

    expect(screen.queryByText('Skip & Show Answer')).not.toBeInTheDocument()
    expect(screen.getByText('Time to think: 2-3 minutes')).toBeInTheDocument()
  })

  it('disables submit button when answer is empty', () => {
    render(
      <InterviewRenderer
        interviewSet={mockInterviewSet}
        mode="drill"
        onAnalytics={mockAnalytics}
      />
    )

    const submitButton = screen.getByText('Submit Answer')
    expect(submitButton).toBeDisabled()

    // Type something
    const textarea = screen.getByPlaceholderText('Type your answer here...')
    fireEvent.change(textarea, { target: { value: 'Some answer' } })
    
    expect(submitButton).not.toBeDisabled()
  })
})