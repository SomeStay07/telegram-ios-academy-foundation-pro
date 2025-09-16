import React from 'react'
import { cn } from '../../utils/cn'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
}

const variantClasses = {
  default: 'bg-muted text-muted-foreground',
  primary: 'bg-primary text-primary-foreground',
  success: 'bg-green-500 text-white dark:bg-green-600',
  warning: 'bg-yellow-500 text-white dark:bg-yellow-600',
  danger: 'bg-red-500 text-white dark:bg-red-600',
  info: 'bg-blue-500 text-white dark:bg-blue-600',
  outline: 'border border-border text-foreground bg-transparent'
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  icon,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors',
        'whitespace-nowrap',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && (
        <span className={cn('mr-1', size === 'sm' && 'mr-0.5')}>
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}

Badge.displayName = 'Badge'