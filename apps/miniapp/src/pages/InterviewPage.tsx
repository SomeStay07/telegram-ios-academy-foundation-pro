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
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageSquareIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Technical Interview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Practice iOS interview questions and improve your skills
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Choose Category
        </h2>
        
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedCategory === category.id 
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => handleCategorySelect(category.id)}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {category.title}
              </h3>
              <span className={`text-sm px-2 py-1 rounded ${
                category.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                category.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {category.difficulty}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {category.description}
            </p>
            
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <MessageSquareIcon className="w-4 h-4 mr-1" />
              {category.questionsCount} questions
            </div>
          </Card>
        ))}
      </div>

      {selectedCategory && (
        <Card className="p-4">
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
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              Last Attempt
            </h3>
            <span className={`text-sm px-2 py-1 rounded ${
              currentAttempt.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {currentAttempt.status === 'completed' ? 'Completed' : 'In Progress'}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
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