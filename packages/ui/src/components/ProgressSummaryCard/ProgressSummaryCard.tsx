'use client'

import React from 'react'
import { cn } from '../../utils/cn'
import { Progress } from '../Progress'
import { ProgressRing } from '../ProgressRing'
import { InteractiveCard } from '../InteractiveCard'

export interface ProgressSummaryCardProps {
  className?: string
  overallProgress: number
  completedModules: number
  totalModules: number
  timeSpent: number // hours
  currentStreak: number
  weeklyStreak?: number[]
}

export function ProgressSummaryCard({
  className,
  overallProgress,
  completedModules,
  totalModules,
  timeSpent,
  currentStreak,
  weeklyStreak = [1, 1, 0, 1, 1, 1, 0], // default 7-day pattern
  ...props
}: ProgressSummaryCardProps) {
  return (
    <InteractiveCard 
      variant="glow"
      className={cn('p-4 sm:p-5', className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Overall Progress</h3>
        <ProgressRing 
          value={overallProgress} 
          size={88} 
          stroke={10}
          showLabel={true}
        />
      </div>

      {/* Main Progress Bar */}
      <div className="mb-6">
        <Progress 
          value={overallProgress}
          label="Course Completion"
          showValue={true}
          className="mb-2"
        />
        <p className="text-sm text-muted-foreground">
          {completedModules} of {totalModules} modules completed
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center min-w-0">
          <div className="text-2xl font-bold text-foreground">
            {completedModules}
          </div>
          <div className="text-sm text-muted-foreground truncate">
            Completed Modules
          </div>
        </div>
        
        <div className="text-center min-w-0">
          <div className="text-2xl font-bold text-foreground">
            {timeSpent}h
          </div>
          <div className="text-sm text-muted-foreground truncate">
            Time Spent
          </div>
        </div>
      </div>

      {/* Current Streak */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Current Streak
          </span>
          <span className="text-lg font-bold text-foreground">
            {currentStreak} days
          </span>
        </div>
      </div>

      {/* Weekly Streak Bar */}
      <div className="space-y-2">
        <div className="text-xs text-muted-foreground">This Week</div>
        <div className="flex gap-1">
          {weeklyStreak.map((isActive, index) => (
            <div
              key={index}
              className={cn(
                "h-2 rounded-full flex-1 transition-colors duration-200",
                isActive 
                  ? "streak-active" 
                  : "bg-muted"
              )}
              style={{
                backgroundImage: isActive ? 'var(--accent-gradient)' : undefined
              }}
            />
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </InteractiveCard>
  )
}

ProgressSummaryCard.displayName = 'ProgressSummaryCard'