import { ReactNode } from 'react'

export interface InfoCardProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>
  /** Main title/label */
  title: string | ReactNode
  /** Primary value to display */
  value: string | number | ReactNode
  /** Optional subtitle/description */
  subtitle?: string
  /** Visual variant */
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'purple' | 'green' | 'blue' | 'orange'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Enable hover animations */
  animated?: boolean
  /** Enable glow effect */
  glow?: boolean
  /** Custom className */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Custom styles */
  style?: React.CSSProperties
}