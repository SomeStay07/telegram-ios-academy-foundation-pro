import { Link, useRouterState } from '@tanstack/react-router'
import { cn, RoadmapIcon, InterviewIcon, ProfileIcon } from '@telegram-ios-academy/ui'

const tabs = [
  {
    path: '/roadmap',
    label: 'Roadmap',
    icon: RoadmapIcon,
  },
  {
    path: '/interview',
    label: 'Interview', 
    icon: InterviewIcon,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: ProfileIcon,
  },
] as const

export function TabBar() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const handleTabClick = (path: string) => {
    // Haptic feedback on tab selection
    const webApp = (window as any)?.Telegram?.WebApp
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.selectionChanged()
    }
    
    // Scroll to top if clicking on active tab
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky bottom-0 inset-x-0 bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-xl border-t border-border/40 pb-[env(safe-area-inset-bottom)] z-50 shadow-lg">
      <div className="max-w-md mx-auto flex px-2">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = currentPath.startsWith(path)
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex-1 flex flex-col items-center py-3 px-2 min-h-[68px] justify-center transition-all duration-300 rounded-xl mx-1 relative",
                "hover:bg-muted/50 active:scale-95",
                isActive && "bg-primary/10"
              )}
              onClick={() => handleTabClick(path)}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
              
              <div className={cn(
                "relative transition-all duration-300",
                isActive && "transform scale-110"
              )}>
                <Icon 
                  size={26}
                  className={cn(
                    "mb-1 transition-all duration-300",
                    isActive ? "text-primary drop-shadow-sm" : "text-muted-foreground"
                  )}
                />
                
                {/* Subtle glow effect for active icon */}
                {isActive && (
                  <div className="absolute inset-0 -z-10">
                    <Icon 
                      size={26}
                      className="text-primary/20 blur-sm"
                    />
                  </div>
                )}
              </div>
              
              <span 
                className={cn(
                  "text-xs font-medium transition-all duration-300",
                  isActive 
                    ? "text-primary font-semibold" 
                    : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}