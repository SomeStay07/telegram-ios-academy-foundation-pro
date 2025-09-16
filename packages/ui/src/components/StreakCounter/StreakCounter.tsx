'use client'

import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface StreakCounterProps extends React.HTMLAttributes<HTMLDivElement> {
  currentStreak: number
  bestStreak?: number
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'fire' | 'ice'
  showBest?: boolean
  animated?: boolean
}

const sizeClasses = {
  sm: {
    container: 'p-3',
    icon: 'w-6 h-6',
    number: 'text-xl',
    label: 'text-xs',
    best: 'text-xs'
  },
  md: {
    container: 'p-4',
    icon: 'w-8 h-8',
    number: 'text-2xl',
    label: 'text-sm',
    best: 'text-xs'
  },
  lg: {
    container: 'p-6',
    icon: 'w-10 h-10',
    number: 'text-3xl',
    label: 'text-base',
    best: 'text-sm'
  }
}

const variantClasses = {
  default: {
    container: 'bg-card border-border',
    icon: 'text-primary',
    number: 'text-foreground',
    label: 'text-muted-foreground',
    glow: ''
  },
  fire: {
    container: 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 dark:from-orange-950/20 dark:to-red-950/20 dark:border-orange-800',
    icon: 'text-orange-500',
    number: 'text-orange-600 dark:text-orange-400',
    label: 'text-orange-600/70 dark:text-orange-400/70',
    glow: 'shadow-lg shadow-orange-500/20'
  },
  ice: {
    container: 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-950/20 dark:to-cyan-950/20 dark:border-blue-800',
    icon: 'text-blue-500',
    number: 'text-blue-600 dark:text-blue-400',
    label: 'text-blue-600/70 dark:text-blue-400/70',
    glow: 'shadow-lg shadow-blue-500/20'
  }
}

const getDefaultIcon = (variant: string, currentStreak: number) => {
  if (variant === 'fire') {
    return currentStreak > 0 ? '🔥' : '💨'
  }
  if (variant === 'ice') {
    return currentStreak > 0 ? '❄️' : '🌫️'
  }
  return currentStreak > 0 ? '⚡' : '💫'
}

export const StreakCounter = forwardRef<HTMLDivElement, StreakCounterProps>(
  ({ 
    currentStreak,
    bestStreak,
    icon,
    size = 'md',
    variant = 'fire',
    showBest = true,
    animated = true,
    className,
    ...props 
  }, ref) => {
    const sizeStyles = sizeClasses[size]
    const variantStyles = variantClasses[variant]
    const displayIcon = icon || getDefaultIcon(variant, currentStreak)
    
    const isActive = currentStreak > 0
    const isRecord = bestStreak ? currentStreak >= bestStreak : false

    return (
      <div
        ref={ref}
        className={cn(
          'relative rounded-xl border transition-all duration-300',
          sizeStyles.container,
          variantStyles.container,
          isActive && variantStyles.glow,
          animated && isActive && 'animate-pulse-subtle',
          className
        )}
        {...props}
      >
        {/* Record badge */}
        {isRecord && showBest && (
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
            🏆 New!
          </div>
        )}

        <div className="text-center">
          {/* Icon */}
          <div className={cn(
            'mx-auto mb-2 transition-all duration-300',
            sizeStyles.icon,
            variantStyles.icon,
            animated && isActive && 'animate-bounce-subtle scale-110'
          )}>
            <div className="flex items-center justify-center w-full h-full">
              {typeof displayIcon === 'string' ? (
                <span className="text-2xl">{displayIcon}</span>
              ) : (
                displayIcon
              )}
            </div>
          </div>

          {/* Current streak */}
          <div className={cn(
            'font-bold mb-1 transition-all duration-300',
            sizeStyles.number,
            variantStyles.number,
            animated && isActive && 'animate-pulse-number'
          )}>
            {currentStreak}
          </div>

          {/* Label */}
          <div className={cn(
            'font-medium',
            sizeStyles.label,
            variantStyles.label
          )}>
            {currentStreak === 1 ? 'Day Streak' : 'Days Streak'}
          </div>

          {/* Best streak */}
          {showBest && bestStreak && bestStreak > currentStreak && (
            <div className={cn(
              'mt-2 opacity-60',
              sizeStyles.best,
              variantStyles.label
            )}>
              Best: {bestStreak} days
            </div>
          )}
        </div>

        {/* Background animation */}
        {animated && isActive && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className={cn(
              'absolute inset-0 opacity-5',
              variant === 'fire' && 'animate-fire-glow',
              variant === 'ice' && 'animate-ice-shimmer',
              variant === 'default' && 'animate-pulse'
            )} />
          </div>
        )}
      </div>
    )
  }
)

StreakCounter.displayName = 'StreakCounter'