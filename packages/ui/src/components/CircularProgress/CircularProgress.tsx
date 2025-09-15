'use client'

import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export interface CircularProgressProps {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  strokeWidth?: number
  className?: string
  showValue?: boolean
  children?: React.ReactNode
  color?: 'primary' | 'success' | 'warning' | 'error'
}

const sizeMap = {
  sm: { radius: 16, fontSize: 'text-xs' },
  md: { radius: 24, fontSize: 'text-sm' },
  lg: { radius: 32, fontSize: 'text-base' },
  xl: { radius: 40, fontSize: 'text-lg' }
}

const colorMap = {
  primary: 'stroke-primary',
  success: 'stroke-green-500',
  warning: 'stroke-yellow-500',
  error: 'stroke-red-500'
}

export const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
  ({ 
    value, 
    max = 100, 
    size = 'md', 
    strokeWidth = 3, 
    className, 
    showValue = true, 
    children, 
    color = 'primary',
    ...props 
  }, ref) => {
    const { radius, fontSize } = sizeMap[size]
    const normalizedValue = Math.min(Math.max(value, 0), max)
    const percentage = (normalizedValue / max) * 100
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference
    
    const svgSize = (radius + strokeWidth) * 2

    return (
      <div 
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted opacity-20"
          />
          {/* Progress circle */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-500 ease-out',
              colorMap[color]
            )}
          />
        </svg>
        
        {/* Content in center */}
        <div className={cn(
          'absolute inset-0 flex flex-col items-center justify-center',
          fontSize
        )}>
          {children || (showValue && (
            <span className="font-semibold text-foreground">
              {Math.round(percentage)}%
            </span>
          ))}
        </div>
      </div>
    )
  }
)

CircularProgress.displayName = 'CircularProgress'