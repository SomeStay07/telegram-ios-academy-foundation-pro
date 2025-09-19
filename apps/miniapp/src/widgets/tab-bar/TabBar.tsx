import { Link, useRouterState } from '@tanstack/react-router'
import { cn } from '@telegram-ios-academy/ui'
import { Calendar, User } from 'lucide-react'

const tabs = [
  {
    path: '/challenge',
    label: 'Ежедневный вызов',
    icon: Calendar,
  },
  {
    path: '/profile',
    label: 'Профиль',
    icon: User,
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
    <nav className="sticky bottom-0 inset-x-0 bg-white/80 dark:bg-gray-900/80 supports-[backdrop-filter]:backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30 pb-[env(safe-area-inset-bottom)] z-50">
      <div className="max-w-md mx-auto flex px-4 py-2 gap-1">
        {tabs.map(({ path, label, icon: Icon }) => {
          const isActive = currentPath.startsWith(path)
          
          return (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex-1 flex flex-col items-center py-2 px-3 transition-all duration-300 rounded-xl relative",
                "group overflow-hidden isolate", // Added isolate for proper z-index stacking
                // Modern hover states with glassmorphism enhancement
                "hover:bg-white/20 dark:hover:bg-white/10",
                "hover:backdrop-blur-sm hover:shadow-lg hover:shadow-black/5", 
                "hover:border hover:border-white/20 dark:hover:border-white/10",
                "hover:scale-[1.02] hover:-translate-y-0.5",
                "hover:z-10", // Elevate hovered tab above others
                "hover:mx-1", // Add horizontal margin on hover to prevent overlap
                // Focus states for accessibility
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
                "focus-visible:bg-white/20 dark:focus-visible:bg-white/10",
                "focus-visible:z-10", // Elevate focused tab above others
                // Active press states with ripple effect simulation
                "active:scale-[0.98] active:bg-white/30 dark:active:bg-white/15",
                "active:shadow-inner active:shadow-black/10",
                // Selected state styling
                isActive && "bg-white/25 dark:bg-white/15 backdrop-blur-sm shadow-md shadow-black/5 border border-white/25 dark:border-white/15 z-20" // Active tab gets highest z-index
              )}
              onClick={() => handleTabClick(path)}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Modern minimal indicator with enhanced animation */}
              {isActive && (
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full shadow-sm animate-pulse" />
              )}
              
              {/* Subtle ripple effect container */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
              </div>
              
              <Icon 
                size={22}
                className={cn(
                  "mb-1 transition-all duration-300",
                  "group-hover:scale-110 group-hover:drop-shadow-sm",
                  "group-active:scale-95",
                  isActive 
                    ? "text-blue-600 dark:text-blue-400 drop-shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                )}
              />
              
              <span 
                className={cn(
                  "text-xs transition-all duration-300",
                  "group-hover:font-medium group-hover:drop-shadow-sm",
                  isActive 
                    ? "text-blue-600 dark:text-blue-400 font-semibold drop-shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
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