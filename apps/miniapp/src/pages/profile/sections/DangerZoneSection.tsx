import { useState } from 'react'
import { ChevronDown, ChevronUp, LogOut, RotateCcw } from 'lucide-react'
import { CardSurface, Button, Separator } from '@telegram-ios-academy/ui'

interface DangerZoneSectionProps {
  onSignOut: () => void
  onResetSettings: () => void
}

export function DangerZoneSection({ onSignOut, onResetSettings }: DangerZoneSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
    
    // Haptic feedback
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.selectionChanged?.()
  }

  const handleResetSettings = () => {
    onResetSettings()
    
    // Haptic feedback
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.notificationOccurred?.('warning')
  }

  const handleSignOut = () => {
    onSignOut()
    
    // Haptic feedback
    const { WebApp } = (window as any)?.Telegram || {}
    WebApp?.HapticFeedback?.notificationOccurred?.('warning')
  }

  return (
    <CardSurface className="overflow-hidden">
      <button
        onClick={handleToggle}
        className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 min-w-0"
      >
        <h3 className="text-sm font-medium text-foreground truncate flex-1 text-left">Danger Zone</h3>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <Separator className="mb-4" />
          
          <div className="space-y-3">
            <div className="flex items-center justify-between min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <RotateCcw className="w-4 h-4 text-destructive flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">Reset Settings</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">Clear local preferences and data</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetSettings}
                className="ml-2 flex-shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Reset
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between min-w-0">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <LogOut className="w-4 h-4 text-destructive flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">Sign Out</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">Clear session and return to start</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="ml-2 flex-shrink-0 text-destructive border-destructive/20 hover:bg-destructive/10"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </CardSurface>
  )
}