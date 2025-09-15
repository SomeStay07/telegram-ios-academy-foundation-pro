import { Link, useRouterState } from '@tanstack/react-router'
import { MapIcon, MessageSquareIcon, UserIcon } from 'lucide-react'
import { cn } from '@telegram-ios-academy/ui'
import { useTelegramUI } from '../../shared/lib/telegram/useTelegramUI'

const tabs = [
  {
    path: '/roadmap',
    label: 'Roadmap',
    icon: MapIcon,
  },
  {
    path: '/interview',
    label: 'Interview', 
    icon: MessageSquareIcon,
  },
  {
    path: '/profile',
    label: 'Profile',
    icon: UserIcon,
  },
] as const

export function TabBar() {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  
  useTelegramUI()

  const handleTabClick = (path: string) => {
    // Haptic feedback on tab selection
    const webApp = (window as any).Telegram?.WebApp
    if (webApp?.HapticFeedback) {
      webApp.HapticFeedback.selectionChanged()
    }
    
    // Scroll to top if clicking on active tab
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="sticky bottom-0 inset-x-0 bg-background/95 supports-[backdrop-filter]:bg-background/60 backdrop-blur border-t border-border pb-[env(safe-area-inset-bottom)] z-50">
      <div className="max-w-md mx-auto flex">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = currentPath.startsWith(path)
          
          return (
            <Link
              key={path}
              to={path}
              className="flex-1 flex flex-col items-center py-2 px-1 min-h-[60px] justify-center transition-colors"
              onClick={() => handleTabClick(path)}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 mb-1 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span 
                className={cn(
                  "text-xs font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
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