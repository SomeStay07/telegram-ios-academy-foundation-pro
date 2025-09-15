import { Card, Button, Progress } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { PlayIcon } from 'lucide-react'

export function RoadmapPage() {
  const { modules, continueModule } = useAppStore()
  
  const incompleteModule = modules.find(m => m.progress > 0 && m.progress < 100)

  return (
    <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-2 text-foreground">
          iOS Roadmap
        </h1>
        <p className="text-muted-foreground">
          Master iOS development step by step
        </p>
      </div>

      {incompleteModule && (
        <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-primary">
              Continue where you left off
            </h3>
            <span className="text-sm px-2 py-1 rounded bg-primary text-primary-foreground">
              {incompleteModule.progress}% complete
            </span>
          </div>
          <p className="mb-3 text-card-foreground">
            {incompleteModule.title}
          </p>
          <Button onClick={continueModule} className="w-full bg-primary text-primary-foreground">
            <PlayIcon className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">
          All Modules
        </h2>
        
        {modules.map((module) => (
          <Card key={module.id} className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-card-foreground">
                {module.title}
              </h3>
              <span 
                className={`text-sm px-2 py-1 rounded ${
                  module.progress === 100 ? 'bg-green-500 text-white' : 
                  module.progress > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {module.progress === 100 ? 'Complete' : 
                 module.progress > 0 ? 'In Progress' : 'Not Started'}
              </span>
            </div>
            
            <div className="mb-3">
              <Progress value={module.progress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {module.progress}% complete
              </span>
              <Button 
                variant={module.progress === 100 ? "outline" : "default"}
                size="sm"
                className={module.progress === 100 ? "" : "bg-primary text-primary-foreground"}
              >
                {module.progress === 100 ? 'Review' : 
                 module.progress > 0 ? 'Continue' : 'Start'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </main>
  )
}