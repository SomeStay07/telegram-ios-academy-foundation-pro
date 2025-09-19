import React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { cn } from '../../utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const progressVariants = cva(
  'relative overflow-hidden rounded-full bg-secondary transition-all duration-300',
  {
    variants: {
      size: {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4',
      },
      variant: {
        default: 'bg-muted',
        success: 'bg-green-100 dark:bg-green-950',
        warning: 'bg-yellow-100 dark:bg-yellow-950',
        error: 'bg-red-100 dark:bg-red-950',
        info: 'bg-blue-100 dark:bg-blue-950',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
)

const progressBarVariants = cva(
  'h-full transition-all duration-500 ease-out flex-1 rounded-full',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-blue-500 to-blue-600',
        success: 'bg-gradient-to-r from-green-500 to-green-600',
        warning: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
        error: 'bg-gradient-to-r from-red-500 to-red-600',
        info: 'bg-gradient-to-r from-cyan-500 to-cyan-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

interface ProgressProps extends VariantProps<typeof progressVariants> {
  value?: number
  max?: number
  className?: string
  showLabel?: boolean
  label?: string
  animated?: boolean
}

export function Progress({
  value = 0,
  max = 100,
  size,
  variant,
  className,
  showLabel = false,
  label,
  animated = true,
  ...props
}: ProgressProps) {
  const percentage = Math.round((value / max) * 100)

  return (
    <div className="space-y-2">
      {(showLabel || label) && (
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-foreground">
            {label || 'Progress'}
          </span>
          <span className="text-muted-foreground font-mono">
            {percentage}%
          </span>
        </div>
      )}
      
      <ProgressPrimitive.Root
        className={cn(progressVariants({ size, variant, className }))}
        value={value}
        max={max}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            progressBarVariants({ variant }),
            animated && 'animate-pulse',
            'transform transition-transform duration-500 ease-out'
          )}
          style={{ 
            transform: `translateX(-${100 - percentage}%)`,
            boxShadow: variant === 'default' 
              ? '0 0 10px rgba(59, 130, 246, 0.3)' 
              : undefined
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  )
}

Progress.displayName = 'Progress'