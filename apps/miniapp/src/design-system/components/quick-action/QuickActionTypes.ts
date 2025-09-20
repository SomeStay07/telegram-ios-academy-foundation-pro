import { ReactNode } from 'react'

export interface QuickActionProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>
  /** Action label/title */
  label: string | ReactNode
  /** Action description */
  description?: string
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'fire' | 'premium'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Button state */
  state?: 'default' | 'loading' | 'disabled' | 'active'
  /** Enable glow effect */
  glow?: boolean
  /** Enable pulse animation */
  pulse?: boolean
  /** Badge content (like streak number) */
  badge?: string | number
  /** Badge color */
  badgeColor?: 'red' | 'blue' | 'green' | 'yellow' | 'purple' | 'orange'
  /** Custom className */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Custom styles */
  style?: React.CSSProperties
}