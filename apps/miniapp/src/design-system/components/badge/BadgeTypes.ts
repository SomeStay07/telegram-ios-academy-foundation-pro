import { LucideIcon } from 'lucide-react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: BadgeSize
  color?: BadgeColor
  icon?: LucideIcon
  className?: string
  onClick?: () => void
  interactive?: boolean
}

export type BadgeVariant = 
  | 'default'
  | 'outline' 
  | 'filled'
  | 'gradient'
  | 'pill'

export type BadgeSize = 
  | 'sm'
  | 'md' 
  | 'lg'

export type BadgeColor = 
  | 'default'
  | 'primary'
  | 'success' 
  | 'warning'
  | 'danger'
  | 'info'