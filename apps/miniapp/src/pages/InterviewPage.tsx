import { Card, Button } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { MessageSquareIcon, ClockIcon, CheckCircleIcon } from 'lucide-react'

const categories = [
  {
    id: 'uikit',
    title: 'UIKit',
    description: 'Views, controllers, and interface elements',
    difficulty: 'Intermediate',
    questionsCount: 25,
  },
  {
    id: 'swiftui',
    title: 'SwiftUI',
    description: 'Declarative UI framework for iOS',
    difficulty: 'Advanced',
    questionsCount: 30,
  },
  {
    id: 'concurrency',
    title: 'Concurrency',
    description: 'GCD, async/await, and threading',
    difficulty: 'Advanced',
    questionsCount: 20,
  },
]

export function InterviewPage() {
  const store = useAppStore()
  const { 
    selectedCategory, 
    currentAttempt, 
    setCategory, 
    startAttempt, 
    resumeAttempt 
  } = store || {}
  
  const safeCurrentAttempt = currentAttempt || { status: 'idle' as const }

  const handleCategorySelect = (categoryId: string) => {
    setCategory?.(categoryId)
  }

  const handleStartInterview = () => {
    if (safeCurrentAttempt.status === 'in_progress') {
      resumeAttempt?.()
    } else {
      startAttempt?.()
    }
  }

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-muted">
          <MessageSquareIcon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          Technical Interview
        </h1>
        <p className="text-muted-foreground">
          Practice iOS interview questions and improve your skills
        </p>
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          Choose Category
        </h2>
        
        <div className="space-y-3">
          {categories.map((category) => (
            <Card 
              key={category.id}
              className={`p-4 cursor-pointer transition-all duration-200 rounded-2xl shadow-sm ${
                selectedCategory === category.id 
                  ? 'bg-primary/5 border-2 border-primary' 
                  : 'bg-card text-card-foreground border border-border hover:bg-muted/30'
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-foreground">
                  {category.title}
                </h3>
                <span 
                  className={`text-sm px-2 py-1 rounded ${
                    category.difficulty === 'Advanced' 
                      ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' 
                      : category.difficulty === 'Intermediate' 
                      ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' 
                      : 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  }`}
                >
                  {category.difficulty}
                </span>
              </div>
              
              <p className="mb-3 text-muted-foreground text-sm">
                {category.description}
              </p>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MessageSquareIcon className="w-4 h-4 mr-1" />
                {category.questionsCount} questions
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Last Attempt Status */}
      {safeCurrentAttempt.attemptId && (
        <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-card-foreground">
              Last Attempt
            </h3>
            <span 
              className={`text-sm px-2 py-1 rounded ${
                safeCurrentAttempt.status === 'completed' 
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-primary/10 text-primary'
              }`}
            >
              {safeCurrentAttempt.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            {safeCurrentAttempt.status === 'completed' ? (
              <>
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Completed recently
              </>
            ) : (
              <>
                <ClockIcon className="w-4 h-4 mr-1" />
                Started recently
              </>
            )}
          </div>
        </Card>
      )}

      {/* Note: Start/Resume interview action handled by MainButton hook */}
    </div>
  )
}