import { Card, Button, Progress } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { PlayIcon } from 'lucide-react'

export function RoadmapPage() {
  const { modules, continueModule } = useAppStore()
  
  const incompleteModule = modules.find(m => m.progress > 0 && m.progress < 100)

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          iOS Roadmap
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Master iOS development step by step
        </p>
      </div>

      {incompleteModule && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100">
              Continue where you left off
            </h3>
            <span className="text-sm bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-2 py-1 rounded">
              {incompleteModule.progress}% complete
            </span>
          </div>
          <p className="text-blue-700 dark:text-blue-200 mb-3">
            {incompleteModule.title}
          </p>
          <Button onClick={continueModule} className="w-full bg-blue-600 hover:bg-blue-700">
            <PlayIcon className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          All Modules
        </h2>
        
        {modules.map((module) => (
          <Card key={module.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {module.title}
              </h3>
              <span className={`text-sm px-2 py-1 rounded ${
                module.progress === 100 ? 'bg-green-100 text-green-800' : 
                module.progress > 0 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {module.progress === 100 ? 'Complete' : 
                 module.progress > 0 ? 'In Progress' : 'Not Started'}
              </span>
            </div>
            
            <div className="mb-3">
              <Progress value={module.progress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {module.progress}% complete
              </span>
              <Button 
                variant={module.progress === 100 ? "outline" : "default"}
                size="sm"
              >
                {module.progress === 100 ? 'Review' : 
                 module.progress > 0 ? 'Continue' : 'Start'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}