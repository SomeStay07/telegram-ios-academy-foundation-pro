import React from 'react'
import { cn } from '@telegram-ios-academy/ui'

interface SkeletonProps {
  className?: string
  animate?: boolean
}

export function Skeleton({ className, animate = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-muted/50 rounded-md',
        animate && 'animate-pulse',
        className
      )}
    />
  )
}

// Skeleton для ProfileHeroCard
export function ProfileHeroCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border border-border shadow-lg">
      <div className="flex items-start gap-4 min-w-0">
        {/* Avatar skeleton */}
        <div className="relative">
          <Skeleton className="w-[72px] h-[72px] rounded-full" />
          {/* Level badge skeleton */}
          <div className="absolute -bottom-1 -right-1">
            <Skeleton className="w-8 h-7 rounded-lg" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-4 w-24 mb-2" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="w-6 h-6 rounded" />
          </div>
        </div>
      </div>

      {/* Premium badge skeleton */}
      <div className="absolute top-3 right-3">
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

// Skeleton для статистики
export function StatCardSkeleton() {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-5 border border-border shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="text-right">
          <Skeleton className="h-8 w-12 mb-1" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}

// Skeleton для недельной активности
export function WeeklyActivitySkeleton() {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex justify-between items-center gap-2 mb-4">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <Skeleton className="h-3 w-6" />
            <Skeleton className="w-10 h-10 rounded-xl" />
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-border/50">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  )
}

// Skeleton для прогресса
export function ProgressSkeleton() {
  return (
    <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-lg">
      <div className="flex items-center justify-between mb-6">
        {/* Circular progress skeleton */}
        <Skeleton className="w-20 h-20 rounded-full" />
        
        {/* Progress details skeleton */}
        <div className="flex-1 ml-6 space-y-3">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          
          <Skeleton className="h-3 w-full rounded-full" />
          
          <div className="flex justify-between">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-3 w-6" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton для секции настроек
export function SettingsSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-4 sm:p-5 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <div>
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 py-2">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Skeleton className="w-9 h-9 rounded-lg" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="w-16 h-8 rounded" />
          </div>
        ))}
      </div>
    </div>
  )
}

// Полный skeleton для профиля
export function ProfilePageSkeleton() {
  return (
    <main className="mx-auto w-full max-w-[640px] px-3 sm:px-4 py-3 pb-24 min-h-[calc(var(--tg-vph,100svh))] bg-background text-foreground">
      {/* Header skeleton */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="flex-1">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-3 w-48" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-6">
        {/* Hero card */}
        <ProfileHeroCardSkeleton />

        {/* Stats section */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-0.5 flex-1" />
          </div>
          
          <div className="space-y-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </div>

        {/* Weekly activity */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-0.5 flex-1" />
          </div>
          <WeeklyActivitySkeleton />
        </div>

        {/* Progress */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-0.5 flex-1" />
          </div>
          <ProgressSkeleton />
        </div>

        {/* Settings */}
        <SettingsSkeleton />
      </div>
    </main>
  )
}