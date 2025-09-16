import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, LogOut, RotateCcw, AlertTriangle, Shield } from 'lucide-react'
import { Card, Button } from '@telegram-ios-academy/ui'

interface DangerZoneSectionProps {
  onSignOut: () => void
  onResetSettings: () => void
}

export function EnhancedDangerZoneSection({ onSignOut, onResetSettings }: DangerZoneSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer для анимации
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

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

  const dangerActions = [
    {
      id: 'reset',
      icon: RotateCcw,
      title: 'Сбросить настройки',
      description: 'Очистить локальные настройки и данные',
      action: handleResetSettings,
      buttonText: 'Сбросить',
      severity: 'medium',
      gradientFrom: 'from-yellow-500/10',
      gradientTo: 'to-orange-500/10'
    },
    {
      id: 'signout',
      icon: LogOut,
      title: 'Выйти из аккаунта',
      description: 'Завершить сессию и вернуться к началу',
      action: handleSignOut,
      buttonText: 'Выйти',
      severity: 'high',
      gradientFrom: 'from-red-500/10',
      gradientTo: 'to-red-600/10'
    }
  ]

  return (
    <div ref={sectionRef} className={`transition-all duration-1000 ${
      isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
    }`}>
      <Card className="overflow-hidden bg-gradient-to-br from-card to-card/50 border-destructive/20 shadow-lg hover:shadow-2xl transition-all duration-500 group relative">
        {/* Warning background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 via-transparent to-orange-500/20" />
        </div>
        
        {/* Header Button */}
        <button
          onClick={handleToggle}
          className="w-full p-4 sm:p-5 flex items-center justify-between hover:bg-red-500/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 min-w-0 group/header relative"
        >
          {/* Alert indicator */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <div className={`w-2 h-2 rounded-full bg-red-500 transition-all duration-300 ${
              isExpanded ? 'animate-pulse scale-125' : 'animate-pulse'
            }`} />
          </div>
          
          <div className="flex items-center gap-3 flex-1 text-left pl-6">
            <AlertTriangle className={`w-5 h-5 text-red-400 transition-all duration-300 ${
              isExpanded ? 'rotate-12 scale-110' : 'group-hover/header:rotate-6'
            }`} />
            <div>
              <h3 className="text-sm font-semibold text-foreground group-hover/header:text-red-400 transition-colors duration-300">
                Danger Zone
              </h3>
              <p className="text-xs text-muted-foreground">
                {isExpanded ? 'Критичные действия' : 'Нажмите для открытия'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isExpanded && (
              <div className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full animate-pulse">
                {dangerActions.length}
              </div>
            )}
            
            <div className={`transition-all duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </button>
        
        {/* Expandable Content */}
        <div className={`overflow-hidden transition-all duration-500 ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-1">
            <div className="h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent mb-4" />
            
            {/* Warning Notice */}
            <div className={`mb-4 p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-lg transition-all duration-500 ${
              isExpanded ? 'animate-in slide-in-from-left-4 duration-700 delay-100' : 'opacity-0'
            }`}>
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="text-red-400 font-medium mb-1">Осторожно!</p>
                  <p className="text-muted-foreground/80">
                    Эти действия необратимы и могут привести к потере данных.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Danger Actions */}
            <div className="space-y-3">
              {dangerActions.map((action, index) => (
                <div 
                  key={action.id}
                  className={`group/item relative overflow-hidden rounded-lg transition-all duration-500 ${
                    isExpanded ? 'animate-in slide-in-from-right-4' : 'opacity-0'
                  } ${
                    hoveredAction === action.id ? 'scale-102 shadow-lg' : ''
                  }`}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                  onMouseEnter={() => setHoveredAction(action.id)}
                  onMouseLeave={() => setHoveredAction(null)}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${action.gradientFrom} ${action.gradientTo} opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative flex items-center justify-between gap-4 p-3 border border-red-500/20 rounded-lg backdrop-blur-sm group-hover/item:border-red-500/40 transition-all duration-300">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="p-2 bg-red-500/20 rounded-lg flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-6">
                        <action.icon className="w-4 h-4 text-red-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium text-foreground transition-colors duration-300 ${
                          hoveredAction === action.id ? 'text-red-400' : ''
                        }`}>
                          {action.title}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-1 transition-colors duration-300 group-hover/item:text-muted-foreground/80">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={action.action}
                      className={`flex-shrink-0 transition-all duration-300 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:scale-105 ${
                        action.severity === 'high' ? 'hover:bg-red-500/20' : 'hover:bg-orange-500/10'
                      }`}
                    >
                      {action.buttonText}
                    </Button>
                  </div>
                  
                  {/* Hover indicator */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
                    hoveredAction === action.id ? 'w-full' : 'w-0'
                  }`} />
                </div>
              ))}
            </div>
            
            {/* Footer Warning */}
            <div className={`mt-4 text-center transition-all duration-500 ${
              isExpanded ? 'animate-in slide-in-from-bottom-2 duration-700 delay-400' : 'opacity-0'
            }`}>
              <p className="text-xs text-muted-foreground/60">
                Убедитесь, что понимаете последствия перед выполнением действий
              </p>
            </div>
          </div>
        </div>
        
        {/* Pulsing border effect */}
        <div className={`absolute inset-0 border-2 border-red-500/20 rounded-lg transition-all duration-300 ${
          isExpanded ? 'animate-pulse' : 'opacity-0'
        } pointer-events-none`} />
      </Card>
    </div>
  )
}