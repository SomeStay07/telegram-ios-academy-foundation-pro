import { Card, Button, Progress } from '@telegram-ios-academy/ui'
import { useAppStore } from '../shared/model/store'
import { PlayIcon } from 'lucide-react'

export function RoadmapPage() {
  const { modules, continueModule } = useAppStore()
  
  const incompleteModule = modules.find(m => m.progress > 0 && m.progress < 100)

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
          iOS Roadmap
        </h1>
        <p style={{ color: 'var(--muted-foreground)' }}>
          Master iOS development step by step
        </p>
      </div>

      {incompleteModule && (
        <Card className="p-4" style={{ backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold" style={{ color: 'var(--primary)' }}>
              Continue where you left off
            </h3>
            <span 
              className="text-sm px-2 py-1 rounded"
              style={{ 
                backgroundColor: 'var(--primary)', 
                color: 'var(--primary-foreground)' 
              }}
            >
              {incompleteModule.progress}% complete
            </span>
          </div>
          <p className="mb-3" style={{ color: 'var(--foreground)' }}>
            {incompleteModule.title}
          </p>
          <Button onClick={continueModule} className="w-full">
            <PlayIcon className="w-4 h-4 mr-2" />
            Continue Learning
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
          All Modules
        </h2>
        
        {modules.map((module) => (
          <Card key={module.id} className="p-4" style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>
                {module.title}
              </h3>
              <span 
                className="text-sm px-2 py-1 rounded"
                style={{
                  backgroundColor: module.progress === 100 ? '#10b981' : 
                                 module.progress > 0 ? 'var(--primary)' : 'var(--muted)',
                  color: module.progress === 100 ? 'white' : 
                         module.progress > 0 ? 'var(--primary-foreground)' : 'var(--muted-foreground)'
                }}
              >
                {module.progress === 100 ? 'Complete' : 
                 module.progress > 0 ? 'In Progress' : 'Not Started'}
              </span>
            </div>
            
            <div className="mb-3">
              <Progress value={module.progress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
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