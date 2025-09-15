'use client'

import React from 'react'
import { cn } from '../../utils/cn'
import { InteractiveCard } from '../InteractiveCard'

export interface ActivityItem {
  id: string
  title: string
  description: string
  timestamp: string // e.g., "2h ago"
  icon: React.ReactNode
  type?: 'success' | 'info' | 'warning' | 'default'
}

export interface ActivityListCardProps {
  className?: string
  activities: ActivityItem[]
  title?: string
  showViewAll?: boolean
  onViewAll?: () => void
  loading?: boolean
}

const ActivitySkeleton = () => (
  <div className="flex items-start gap-3 py-3">
    <div className="w-5 h-5 bg-muted/50 rounded-full flex-shrink-0 animate-pulse" />
    <div className="flex-1 min-w-0 space-y-2">
      <div className="h-4 bg-muted/50 rounded animate-pulse" style={{ width: '60%' }} />
      <div className="h-3 bg-muted/50 rounded animate-pulse" style={{ width: '40%' }} />
    </div>
    <div className="h-3 bg-muted/50 rounded animate-pulse" style={{ width: '48px' }} />
  </div>
)

export function ActivityListCard({
  className,
  activities,
  title = "Recent Activity",
  showViewAll = true,
  onViewAll,
  loading = false,
  ...props
}: ActivityListCardProps) {
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <InteractiveCard
      variant="lift"
      className={cn('p-4 sm:p-5', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground truncate min-w-0">
          {title}
        </h3>
        {showViewAll && onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 flex-shrink-0"
          >
            View all
          </button>
        )}
      </div>

      {/* Activity List */}
      <div className="relative">
        {/* Gradient accent border */}
        <div 
          className="absolute left-2 top-1 bottom-1 w-px activity-accent rounded-full opacity-70"
          style={{
            backgroundImage: 'var(--accent-gradient)'
          }}
        />
        
        <div className="relative pl-3">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <ActivitySkeleton key={index} />
            ))
          ) : activities.length === 0 ? (
            // Empty state
            <div className="py-8 text-center">
              <div className="text-muted-foreground/60 text-sm">
                No recent activity
              </div>
            </div>
          ) : (
            // Activity items
            activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start gap-3 py-3 transition-all duration-200",
                  index !== activities.length - 1 && "border-b border-border/50",
                  !prefersReducedMotion && "animate-in fade-in-0 slide-in-from-bottom-2"
                )}
                style={{
                  animationDelay: prefersReducedMotion ? '0ms' : `${index * 50}ms`,
                  animationFillMode: 'both'
                }}
              >
                {/* Icon */}
                <div className={cn(
                  "flex-shrink-0 w-5 h-5 text-foreground/80 mt-0.5",
                  "transition-colors duration-200"
                )}>
                  {activity.icon}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                    {activity.description}
                  </p>
                </div>
                
                {/* Timestamp */}
                <div className="flex-shrink-0 text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </InteractiveCard>
  )
}

ActivityListCard.displayName = 'ActivityListCard'