import React from 'react'
import { cn } from '../../utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const achievementVariants = cva(
  'relative inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105',
  {
    variants: {
      variant: {
        bronze: 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-600/25',
        silver: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/25',
        gold: 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-400/25',
        platinum: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/25',
        course: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25',
        streak: 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25',
        expert: 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25',
        mentor: 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/25',
      },
      size: {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-2',
        lg: 'text-base px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'course',
      size: 'md',
    },
  }
)

interface AchievementProps extends VariantProps<typeof achievementVariants> {
  icon?: React.ReactNode
  title: string
  description?: string
  unlocked?: boolean
  progress?: number
  className?: string
}

export function Achievement({
  icon,
  title,
  description,
  unlocked = true,
  progress,
  variant,
  size,
  className,
}: AchievementProps) {
  return (
    <div
      className={cn(
        achievementVariants({ variant, size }),
        !unlocked && 'opacity-50 grayscale cursor-not-allowed hover:scale-100',
        className
      )}
    >
      {/* Shimmer effect for unlocked achievements */}
      {unlocked && (
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer" />
        </div>
      )}

      {/* Icon */}
      {icon && (
        <div className="relative z-10 flex-shrink-0">
          {icon}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 min-w-0">
        <div className="font-semibold truncate">{title}</div>
        {description && (
          <div className="text-xs opacity-90 truncate">{description}</div>
        )}
        {progress !== undefined && (
          <div className="text-xs mt-1">
            Progress: {progress}%
          </div>
        )}
      </div>

      {/* Lock indicator for locked achievements */}
      {!unlocked && (
        <div className="relative z-10 text-muted-foreground">
          🔒
        </div>
      )}
    </div>
  )
}

Achievement.displayName = 'Achievement'