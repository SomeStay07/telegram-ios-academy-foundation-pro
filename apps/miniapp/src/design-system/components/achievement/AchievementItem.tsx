import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideIcon, Trophy } from 'lucide-react'
import { cn } from '../../../lib/utils'

const achievementVariants = cva(
  "flex items-center gap-3 p-3 rounded-lg transition-all duration-200 border",
  {
    variants: {
      status: {
        achieved: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
        locked: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
      },
      size: {
        sm: "p-2 gap-2",
        md: "p-3 gap-3",
        lg: "p-4 gap-4"
      },
      interactive: {
        true: "hover:scale-[1.02] cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      status: "locked",
      size: "md",
      interactive: false
    }
  }
)

export interface AchievementItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof achievementVariants> {
  icon: string | LucideIcon
  title: string
  description: string
  achieved?: boolean
}

export const AchievementItem = React.forwardRef<HTMLDivElement, AchievementItemProps>(
  ({ className, status, size, interactive, icon, title, description, achieved = false, ...props }, ref) => {
    const IconComponent = typeof icon === 'string' ? null : icon
    
    return (
      <div
        ref={ref}
        className={cn(
          achievementVariants({ 
            status: achieved ? "achieved" : "locked", 
            size, 
            interactive 
          }),
          className
        )}
        {...props}
      >
        {/* Icon */}
        <div className={cn(
          "flex-shrink-0",
          size === "sm" ? "text-lg" : size === "lg" ? "text-3xl" : "text-2xl"
        )}>
          {typeof icon === 'string' ? (
            <span>{icon}</span>
          ) : IconComponent ? (
            <IconComponent className={cn(
              size === "sm" ? "w-5 h-5" : size === "lg" ? "w-8 h-8" : "w-6 h-6",
              achieved 
                ? "text-green-600 dark:text-green-400" 
                : "text-gray-400 dark:text-gray-500"
            )} />
          ) : null}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className={cn(
            "font-medium truncate",
            size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base",
            achieved 
              ? "text-green-800 dark:text-green-200" 
              : "text-gray-600 dark:text-gray-400"
          )}>
            {title}
          </div>
          <div className={cn(
            "truncate",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs",
            achieved 
              ? "text-green-600 dark:text-green-300" 
              : "text-gray-500 dark:text-gray-500"
          )}>
            {description}
          </div>
        </div>

        {/* Achievement Badge */}
        {achieved && (
          <div className="flex-shrink-0 text-green-500">
            <Trophy className={cn(
              size === "sm" ? "w-4 h-4" : size === "lg" ? "w-6 h-6" : "w-5 h-5"
            )} />
          </div>
        )}
      </div>
    )
  }
)

AchievementItem.displayName = "AchievementItem"

export { achievementVariants }