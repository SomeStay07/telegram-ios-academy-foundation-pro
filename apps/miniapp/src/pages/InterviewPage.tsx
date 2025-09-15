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
  const { selectedCategory, currentAttempt, setCategory, startAttempt, resumeAttempt } = useAppStore()

  const handleCategorySelect = (categoryId: string) => {
    setCategory(categoryId)
  }

  const handleStartInterview = () => {
    if (currentAttempt.status === 'in_progress') {
      resumeAttempt()
    } else {
      startAttempt()
    }
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: 'var(--muted)' }}
        >
          <MessageSquareIcon 
            className="w-8 h-8" 
            style={{ color: 'var(--primary)' }}
          />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          Technical Interview
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Practice iOS interview questions and improve your skills
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
          Choose Category
        </h2>
        
        {categories.map((category) => (
          <Card 
            key={category.id}
            className="p-4 cursor-pointer transition-colors"
            style={{
              backgroundColor: selectedCategory === category.id ? 'var(--muted)' : 'var(--card)',
              borderColor: selectedCategory === category.id ? 'var(--primary)' : 'var(--border)',
              borderWidth: selectedCategory === category.id ? '2px' : '1px'
            }}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>
                {category.title}
              </h3>
              <span 
                className="text-sm px-2 py-1 rounded"
                style={{
                  backgroundColor: category.difficulty === 'Advanced' ? '#fef2f2' : 
                                   category.difficulty === 'Intermediate' ? 'var(--muted)' : 'var(--muted)',
                  color: category.difficulty === 'Advanced' ? '#dc2626' : 
                         category.difficulty === 'Intermediate' ? 'var(--primary)' : 'var(--muted-foreground)'
                }}
              >
                {category.difficulty}
              </span>
            </div>
            
            <p className="mb-3" style={{ color: 'var(--muted-foreground)' }}>
              {category.description}
            </p>
            
            <div className="flex items-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <MessageSquareIcon className="w-4 h-4 mr-1" />
              {category.questionsCount} questions
            </div>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <Card className="p-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <Button 
            onClick={handleStartInterview}
            className="w-full"
            disabled={!selectedCategory}
          >
            {currentAttempt.status === 'in_progress' ? 'Resume Interview' : 'Start Interview'}
          </Button>
        </Card>
      )}

      {currentAttempt.attemptId && (
        <Card className="p-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>
              Last Attempt
            </h3>
            <span 
              className="text-sm px-2 py-1 rounded"
              style={{
                backgroundColor: currentAttempt.status === 'completed' ? '#f0fdf4' : 'var(--muted)',
                color: currentAttempt.status === 'completed' ? '#166534' : 'var(--primary)'
              }}
            >
              {currentAttempt.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          
          <div className="flex items-center text-sm" style={{ color: 'var(--muted-foreground)' }}>
            {currentAttempt.status === 'completed' ? (
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
    </div>
  )
}