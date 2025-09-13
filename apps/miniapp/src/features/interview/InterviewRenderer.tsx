import React from 'react'
import { trackInterviewStarted, trackInterviewAnswerSubmitted, trackInterviewCompleted } from '../../lib/analytics'

export interface InterviewQuestion {
  id: string
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  prompt: string
  modelAnswer: string
  pitfalls?: string[]
  codeExample?: string
  followUpQuestions?: string[]
}

export interface InterviewSet {
  id: string
  title: string
  description: string
  questions: InterviewQuestion[]
}

export interface InterviewProgress {
  currentQuestionIndex: number
  answeredQuestions: string[]
  score: number
  timeSpent: number
  startTime: number
}

export interface InterviewAnalytics {
  interviewStarted: (data: any) => void
  questionRevealed: (data: any) => void
  answerSubmitted: (data: any) => void
  interviewCompleted: (data: any) => void
}

export interface InterviewRendererProps {
  interviewSet: InterviewSet
  mode: 'drill' | 'explain' | 'mock'
  onAnalytics: InterviewAnalytics
  progress?: InterviewProgress
  onProgressUpdate?: (progress: InterviewProgress) => void
  onComplete?: (progress: InterviewProgress) => void
}

export const InterviewRenderer: React.FC<InterviewRendererProps> = ({
  interviewSet,
  mode,
  onAnalytics,
  progress,
  onProgressUpdate,
  onComplete
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(progress?.currentQuestionIndex || 0)
  const [isAnswerVisible, setIsAnswerVisible] = React.useState(false)
  const [userAnswer, setUserAnswer] = React.useState('')
  const [startTime] = React.useState(Date.now())

  const currentQuestion = interviewSet.questions[currentIndex]

  React.useEffect(() => {
    trackInterviewStarted({
      interviewId: interviewSet.id,
      mode
    })
    
    // Call legacy analytics for backward compatibility
    onAnalytics.interviewStarted({
      interview_id: interviewSet.id,
      mode,
      question_count: interviewSet.questions.length
    })
  }, [])

  const handleRevealAnswer = () => {
    setIsAnswerVisible(true)
    onAnalytics.questionRevealed({
      question_id: currentQuestion.id,
      question_index: currentIndex
    })
  }

  const handleNextQuestion = () => {
    if (currentIndex < interviewSet.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setIsAnswerVisible(false)
      setUserAnswer('')
    } else {
      const finalProgress: InterviewProgress = {
        currentQuestionIndex: currentIndex,
        answeredQuestions: interviewSet.questions.map(q => q.id),
        score: 1.0,
        timeSpent: Date.now() - startTime,
        startTime
      }
      
      trackInterviewCompleted({
        interviewId: interviewSet.id,
        mode,
        totalQuestions: interviewSet.questions.length,
        correctCount: Math.round(finalProgress.score * interviewSet.questions.length),
        durationMs: finalProgress.timeSpent
      })
      
      onComplete?.(finalProgress)
      onAnalytics.interviewCompleted({
        interview_id: interviewSet.id,
        total_time: finalProgress.timeSpent,
        questions_answered: finalProgress.answeredQuestions.length
      })
    }
  }

  const handleSubmitAnswer = () => {
    const answerTime = Date.now() - startTime
    
    trackInterviewAnswerSubmitted({
      interviewId: interviewSet.id,
      questionId: currentQuestion.id,
      mode,
      timeMs: answerTime
    })
    
    // Call legacy analytics for backward compatibility
    onAnalytics.answerSubmitted({
      question_id: currentQuestion.id,
      user_answer: userAnswer
    })
    
    handleRevealAnswer()
  }

  if (!currentQuestion) {
    return <div>No questions available</div>
  }

  return (
    <div className="interview-renderer p-6 max-w-4xl mx-auto">
      <div className="header mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{interviewSet.title}</h1>
          <div className="badge px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </div>
        </div>
        
        <div className="progress-bar bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / interviewSet.questions.length) * 100}%` }}
          />
        </div>
        
        <div className="text-sm text-gray-600 mt-2">
          Question {currentIndex + 1} of {interviewSet.questions.length}
        </div>
      </div>

      <div className="question-card bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="question-meta flex gap-2 mb-4">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {currentQuestion.category}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            currentQuestion.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
            currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {currentQuestion.difficulty}
          </span>
        </div>
        
        <h2 className="text-lg font-semibold mb-4">{currentQuestion.prompt}</h2>

        {mode === 'mock' && (
          <div className="timer mb-4 p-3 bg-orange-50 border border-orange-200 rounded">
            <div className="flex items-center gap-2">
              <span className="text-orange-600">⏰</span>
              <span className="text-orange-700 font-medium">Time to think: 2-3 minutes</span>
            </div>
          </div>
        )}
      </div>

      {!isAnswerVisible && (
        <div className="answer-input mb-6">
          <textarea
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSubmitAnswer}
              disabled={!userAnswer.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Submit Answer
            </button>
            
            {mode === 'drill' && (
              <button
                onClick={handleRevealAnswer}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium"
              >
                Skip & Show Answer
              </button>
            )}
          </div>
        </div>
      )}

      {isAnswerVisible && (
        <div className="model-answer bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">Model Answer</h3>
          <div className="text-green-700 whitespace-pre-wrap">{currentQuestion.modelAnswer}</div>
          
          {currentQuestion.codeExample && (
            <div className="mt-4">
              <h4 className="font-medium text-green-800 mb-2">Code Example:</h4>
              <pre className="bg-gray-800 text-green-300 p-4 rounded text-sm overflow-x-auto">
                {currentQuestion.codeExample}
              </pre>
            </div>
          )}
          
          {currentQuestion.pitfalls && currentQuestion.pitfalls.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-red-700 mb-2">Common Pitfalls:</h4>
              <ul className="list-disc list-inside text-red-600 space-y-1">
                {currentQuestion.pitfalls.map((pitfall, index) => (
                  <li key={index}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button
            onClick={handleNextQuestion}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            {currentIndex < interviewSet.questions.length - 1 ? 'Next Question' : 'Complete Interview'}
          </button>
        </div>
      )}
    </div>
  )
}