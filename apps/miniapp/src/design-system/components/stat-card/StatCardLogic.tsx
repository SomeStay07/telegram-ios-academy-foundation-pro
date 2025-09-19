import React from 'react'
import { cn } from '../../../lib/utils'
import type { StatCardProps, StatCardGroupProps } from './StatCardTypes'
import { statCardVariants } from './StatCardVariants'

/**
 * 🔄 Loading Skeleton Component
 */
export const StatCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center gap-3 mb-4">
      <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
)

/**
 * 🎯 Grid Columns Configuration
 */
export const GRID_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
} as const

/**
 * 🎯 StatCard Group Component Logic
 */
export const StatCardGroup: React.FC<StatCardGroupProps> = ({
  stats,
  columns = 3,
  size = "md",
  variant = "default",
  className,
  loading = false
}) => {
  return (
    <div className={cn(
      "grid gap-6",
      GRID_COLUMNS[columns],
      className
    )}>
      {loading ? (
        // Показываем skeleton для загрузки
        Array.from({ length: columns * 2 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              statCardVariants({ variant, size, accent: 'none', interactive: false })
            )}
          >
            <StatCardSkeleton />
          </div>
        ))
      ) : (
        stats.map((stat) => {
          const StatCardComponent = require('./index').StatCard
          return (
            <StatCardComponent
              key={stat.id}
              size={size}
              variant={variant}
              {...stat}
            />
          )
        })
      )}
    </div>
  )
}

/**
 * 🎯 Accessibility Props Generator
 */
export const createStatCardAccessibilityProps = (onClick?: () => void) => ({
  role: onClick ? "button" as const : undefined,
  tabIndex: onClick ? 0 : undefined,
})

/**
 * 🎯 Trend Arrow Renderer
 */
export const renderTrendArrow = (trend: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return '↗'
    case 'down':
      return '↘'
    default:
      return '→'
  }
}