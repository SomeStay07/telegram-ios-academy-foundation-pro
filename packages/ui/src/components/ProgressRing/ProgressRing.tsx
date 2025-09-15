import React from 'react'
import { cn } from '../../utils/cn'

export interface ProgressRingProps {
  progress: number // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl'
  thickness?: 'thin' | 'medium' | 'thick'
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  showLabel?: boolean
  label?: string
  className?: string
  animated?: boolean
  children?: React.ReactNode
}

const sizeConfig = {
  sm: { 
    size: 48, 
    strokeWidth: { thin: 2, medium: 3, thick: 4 },
    fontSize: 'text-xs',
    centerSize: 'w-8 h-8'
  },
  md: { 
    size: 64, 
    strokeWidth: { thin: 3, medium: 4, thick: 6 },
    fontSize: 'text-sm',
    centerSize: 'w-12 h-12'
  },
  lg: { 
    size: 80, 
    strokeWidth: { thin: 4, medium: 6, thick: 8 },
    fontSize: 'text-base',
    centerSize: 'w-16 h-16'
  },
  xl: { 
    size: 120, 
    strokeWidth: { thin: 6, medium: 8, thick: 12 },
    fontSize: 'text-lg',
    centerSize: 'w-24 h-24'
  }
}

const variantColors = {
  primary: {
    stroke: 'stroke-blue-500',
    gradient: ['#3B82F6', '#1E40AF'],
    bg: 'stroke-blue-100 dark:stroke-blue-900/30'
  },
  success: {
    stroke: 'stroke-green-500',
    gradient: ['#10B981', '#047857'],
    bg: 'stroke-green-100 dark:stroke-green-900/30'
  },
  warning: {
    stroke: 'stroke-yellow-500',
    gradient: ['#F59E0B', '#D97706'],
    bg: 'stroke-yellow-100 dark:stroke-yellow-900/30'
  },
  danger: {
    stroke: 'stroke-red-500',
    gradient: ['#EF4444', '#DC2626'],
    bg: 'stroke-red-100 dark:stroke-red-900/30'
  },
  info: {
    stroke: 'stroke-purple-500',
    gradient: ['#8B5CF6', '#7C3AED'],
    bg: 'stroke-purple-100 dark:stroke-purple-900/30'
  }
}

export function ProgressRing({
  progress,
  size = 'md',
  thickness = 'medium',
  variant = 'primary',
  showLabel = true,
  label,
  className,
  animated = true,
  children,
  ...props
}: ProgressRingProps) {
  const config = sizeConfig[size]
  const colors = variantColors[variant]
  const strokeWidth = config.strokeWidth[thickness]
  
  const normalizedRadius = (config.size - strokeWidth) / 2
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference
  
  const gradientId = `gradient-${variant}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div 
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: config.size, height: config.size }}
      {...props}
    >
      <svg
        width={config.size}
        height={config.size}
        className="transform -rotate-90"
      >
        {/* Gradient definition */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.gradient[0]} />
            <stop offset="100%" stopColor={colors.gradient[1]} />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          className={cn('fill-none', colors.bg)}
        />
        
        {/* Progress circle */}
        <circle
          cx={config.size / 2}
          cy={config.size / 2}
          r={normalizedRadius}
          strokeWidth={strokeWidth}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            animated && 'transition-all duration-1000 ease-out'
          )}
          style={{
            filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.3))'
          }}
        />
      </svg>
      
      {/* Center content */}
      <div className={cn(
        'absolute inset-0 flex flex-col items-center justify-center',
        config.centerSize
      )}>
        {children || (showLabel && (
          <>
            <span className={cn(
              'font-bold text-foreground',
              config.fontSize
            )}>
              {Math.round(progress)}%
            </span>
            {label && (
              <span className={cn(
                'text-muted-foreground font-medium leading-tight text-center',
                config.fontSize === 'text-xs' ? 'text-[10px]' : 
                config.fontSize === 'text-sm' ? 'text-xs' :
                config.fontSize === 'text-base' ? 'text-sm' : 'text-base'
              )}>
                {label}
              </span>
            )}
          </>
        ))}
      </div>
      
      {/* Glow effect */}
      {animated && progress > 0 && (
        <div 
          className={cn(
            'absolute inset-0 rounded-full opacity-20 blur-xl',
            variant === 'primary' && 'bg-blue-500',
            variant === 'success' && 'bg-green-500',
            variant === 'warning' && 'bg-yellow-500',
            variant === 'danger' && 'bg-red-500',
            variant === 'info' && 'bg-purple-500'
          )}
          style={{
            transform: `scale(${0.5 + (progress / 100) * 0.3})`
          }}
        />
      )}
    </div>
  )
}

ProgressRing.displayName = 'ProgressRing'