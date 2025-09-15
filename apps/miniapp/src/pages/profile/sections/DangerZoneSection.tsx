import { useState } from 'react'
import { ChevronDown, ChevronUp, LogOut, RotateCcw } from 'lucide-react'
import { Card, Button, Separator } from '@telegram-ios-academy/ui'

interface DangerZoneSectionProps {
  onSignOut: () => void
  onResetSettings: () => void
}

export function DangerZoneSection({ onSignOut, onResetSettings }: DangerZoneSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="bg-card text-card-foreground border border-border rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
      >
        <h3 className="text-sm font-medium text-foreground">Danger Zone</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <Separator className="mb-4" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <RotateCcw className="w-4 h-4 text-destructive flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Reset Settings</p>
                  <p className="text-xs text-muted-foreground">Clear local preferences and data</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onResetSettings}
                className="ml-2 flex-shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Reset
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <LogOut className="w-4 h-4 text-destructive flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground">Sign Out</p>
                  <p className="text-xs text-muted-foreground">Clear session and return to start</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onSignOut}
                className="ml-2 flex-shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}