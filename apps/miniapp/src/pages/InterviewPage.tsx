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
    <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24">
      <div className="text-center mb-6">
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

      <div className="space-y-4 mb-6">
        <h2 className="text-lg font-semibold text-foreground">
          Choose Category
        </h2>
        
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`p-4 cursor-pointer transition-colors rounded-2xl shadow-sm ${
              selectedCategory === category.id 
                ? 'bg-muted border-2 border-primary' 
                : 'bg-card text-card-foreground border border-border'
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-foreground">
                {category.title}
              </h3>
              <span 
                className={`text-sm px-2 py-1 rounded ${
                  category.difficulty === 'Advanced' ? 'bg-red-50 text-red-700' : 
                  category.difficulty === 'Intermediate' ? 'bg-muted text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {category.difficulty}
              </span>
            </div>
            
            <p className="mb-3 text-muted-foreground">
              {category.description}
            </p>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <MessageSquareIcon className="w-4 h-4 mr-1" />
              {category.questionsCount} questions
            </div>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4 mb-6">
          <Button 
            onClick={handleStartInterview}
            className="w-full bg-primary text-primary-foreground"
            disabled={!selectedCategory}
          >
            {currentAttempt.status === 'in_progress' ? 'Resume Interview' : 'Start Interview'}
          </Button>
        </Card>
      )}

      {currentAttempt.attemptId && (
        <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-card-foreground">
              Last Attempt
            </h3>
            <span 
              className={`text-sm px-2 py-1 rounded ${
                currentAttempt.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-muted text-primary'
              }`}
            >
              {currentAttempt.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
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
    </main>
  )
}