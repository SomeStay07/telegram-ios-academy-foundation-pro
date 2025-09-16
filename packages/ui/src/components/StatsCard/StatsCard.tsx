import React from 'react'
import { cn } from '../../utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const statsCardVariants = cva(
  'relative p-4 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg',
  {
    variants: {
      variant: {
        default: 'bg-card border-border',
        primary: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800',
        success: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800',
        warning: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800',
        purple: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  className?: string
  onClick?: () => void
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant,
  size,
  className,
  onClick,
}: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <span className="text-green-500">↗️</span>
      case 'down':
        return <span className="text-red-500">↘️</span>
      case 'neutral':
        return <span className="text-gray-500">➡️</span>
      default:
        return null
    }
  }

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400'
      case 'down':
        return 'text-red-600 dark:text-red-400'
      case 'neutral':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <div
      className={cn(
        statsCardVariants({ variant, size }),
        onClick && 'cursor-pointer hover:shadow-xl',
        className
      )}
      onClick={onClick}
    >
      {/* Animated background pattern for hover */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-muted-foreground truncate">
              {title}
            </h3>
          </div>
          {icon && (
            <div className="flex-shrink-0 ml-3 p-2 rounded-lg bg-background/50">
              {icon}
            </div>
          )}
        </div>

        {/* Main value */}
        <div className="mb-2">
          <div className="text-2xl font-bold text-foreground">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>

        {/* Footer with subtitle and trend */}
        <div className="flex items-center justify-between text-xs">
          {subtitle && (
            <span className="text-muted-foreground truncate">
              {subtitle}
            </span>
          )}
          
          {(trend || trendValue) && (
            <div className={cn('flex items-center gap-1 font-medium', getTrendColor())}>
              {getTrendIcon()}
              {trendValue && <span>{trendValue}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

StatsCard.displayName = 'StatsCard'