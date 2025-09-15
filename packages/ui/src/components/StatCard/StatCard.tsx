import React from 'react'
import { cn } from '../../utils/cn'

export interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: React.ReactNode
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  animated?: boolean
  onClick?: () => void
  badge?: React.ReactNode
  progress?: number // 0-100 for progress overlay
}

const variantClasses = {
  default: {
    bg: 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50',
    border: 'border-gray-200 dark:border-gray-700',
    icon: 'text-gray-600 dark:text-gray-400',
    value: 'text-gray-900 dark:text-gray-100',
    title: 'text-gray-600 dark:text-gray-400'
  },
  primary: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30',
    border: 'border-blue-200 dark:border-blue-800',
    icon: 'text-blue-600 dark:text-blue-400',
    value: 'text-blue-900 dark:text-blue-100',
    title: 'text-blue-600 dark:text-blue-400'
  },
  success: {
    bg: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-600 dark:text-green-400',
    value: 'text-green-900 dark:text-green-100',
    title: 'text-green-600 dark:text-green-400'
  },
  warning: {
    bg: 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950/30 dark:to-yellow-900/30',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: 'text-yellow-600 dark:text-yellow-400',
    value: 'text-yellow-900 dark:text-yellow-100',
    title: 'text-yellow-600 dark:text-yellow-400'
  },
  danger: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30',
    border: 'border-red-200 dark:border-red-800',
    icon: 'text-red-600 dark:text-red-400',
    value: 'text-red-900 dark:text-red-100',
    title: 'text-red-600 dark:text-red-400'
  },
  info: {
    bg: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30',
    border: 'border-purple-200 dark:border-purple-800',
    icon: 'text-purple-600 dark:text-purple-400',
    value: 'text-purple-900 dark:text-purple-100',
    title: 'text-purple-600 dark:text-purple-400'
  }
}

const sizeClasses = {
  sm: {
    padding: 'p-4',
    iconSize: 'w-6 h-6',
    valueSize: 'text-xl',
    titleSize: 'text-xs',
    subtitleSize: 'text-xs'
  },
  md: {
    padding: 'p-5',
    iconSize: 'w-8 h-8',
    valueSize: 'text-2xl',
    titleSize: 'text-sm',
    subtitleSize: 'text-sm'
  },
  lg: {
    padding: 'p-6',
    iconSize: 'w-10 h-10',
    valueSize: 'text-3xl',
    titleSize: 'text-base',
    subtitleSize: 'text-sm'
  }
}

const trendIcons = {
  up: '↗️',
  down: '↘️',
  neutral: '→'
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  variant = 'default',
  size = 'md',
  className,
  animated = true,
  onClick,
  badge,
  progress,
  ...props
}: StatCardProps) {
  const variantStyles = variantClasses[variant]
  const sizeStyles = sizeClasses[size]

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border backdrop-blur-sm transition-all duration-300',
        variantStyles.bg,
        variantStyles.border,
        sizeStyles.padding,
        onClick && 'cursor-pointer hover:scale-105 active:scale-95 hover:shadow-lg',
        animated && 'animate-in fade-in-50 slide-in-from-bottom-4 duration-500',
        'group',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Progress overlay */}
      {progress !== undefined && (
        <div className="absolute inset-0 opacity-10">
          <div 
            className={cn(
              'h-full transition-all duration-1000 ease-out',
              variant === 'primary' && 'bg-blue-500',
              variant === 'success' && 'bg-green-500',
              variant === 'warning' && 'bg-yellow-500',
              variant === 'danger' && 'bg-red-500',
              variant === 'info' && 'bg-purple-500',
              variant === 'default' && 'bg-gray-500'
            )}
            style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          />
        </div>
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute top-2 right-2">
          {badge}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        {icon && (
          <div className={cn(
            'mx-auto mb-3 transition-transform duration-300',
            sizeStyles.iconSize,
            variantStyles.icon,
            animated && 'group-hover:scale-110'
          )}>
            {icon}
          </div>
        )}

        {/* Value */}
        <div className={cn(
          'font-bold transition-all duration-300',
          sizeStyles.valueSize,
          variantStyles.value,
          animated && 'group-hover:scale-105'
        )}>
          {value}
        </div>

        {/* Title */}
        <div className={cn(
          'font-medium mt-1',
          sizeStyles.titleSize,
          variantStyles.title
        )}>
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div className={cn(
            'mt-1 opacity-75',
            sizeStyles.subtitleSize,
            variantStyles.title
          )}>
            {subtitle}
          </div>
        )}

        {/* Trend */}
        {trend && trendValue && (
          <div className={cn(
            'flex items-center justify-center gap-1 mt-2',
            sizeStyles.subtitleSize,
            trend === 'up' && 'text-green-600 dark:text-green-400',
            trend === 'down' && 'text-red-600 dark:text-red-400',
            trend === 'neutral' && 'text-gray-500 dark:text-gray-400'
          )}>
            <span>{trendIcons[trend]}</span>
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>

      {/* Shimmer effect on hover */}
      {animated && onClick && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      )}
    </div>
  )
}

StatCard.displayName = 'StatCard'