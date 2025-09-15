import { Card, Button, Progress } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { PlayIcon } from 'lucide-react'

export function RoadmapPage() {
  const store = useAppStore()
  const modules = store?.modules || []
  const continueModule = store?.continueModule
  
  const incompleteModule = modules.find(m => m.progress > 0 && m.progress < 100)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          iOS Roadmap
        </h1>
        <p className="text-muted-foreground">
          Master iOS development step by step
        </p>
      </div>

      {/* Continue Learning Card - Only visible if there's an incomplete module */}
      {incompleteModule && (
        <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-primary">
              Continue where you left off
            </h3>
            <span className="text-sm px-2 py-1 rounded bg-primary text-primary-foreground">
              {incompleteModule.progress}% complete
            </span>
          </div>
          <p className="text-card-foreground">
            {incompleteModule.title}
          </p>
          <div className="mt-3">
            <Progress value={incompleteModule.progress} className="h-2" />
          </div>
          {/* Note: Continue action is handled by MainButton hook */}
        </Card>
      )}

      {/* All Modules */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          All Modules
        </h2>
        
        <div className="space-y-3">
          {modules.map((module) => (
            <Card key={module.id} className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-card-foreground">
                  {module.title}
                </h3>
                <span 
                  className={`text-sm px-2 py-1 rounded ${
                    module.progress === 100 
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                      : module.progress > 0 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {module.progress === 100 ? 'Complete' : 
                   module.progress > 0 ? 'In Progress' : 'Not Started'}
                </span>
              </div>
              
              <div className="mb-3">
                <Progress value={module.progress} className="h-2" />
              </div>
              
              <div className="text-sm text-muted-foreground">
                {module.progress}% complete
              </div>
              
              {/* Remove individual action buttons - use MainButton instead */}
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}