import { ReactNode } from 'react'

export interface ActivityItemProps {
  /** Icon component to display */
  icon: React.ComponentType<{ className?: string }>
  /** Activity title */
  title: string | ReactNode
  /** Activity description or details */
  description?: string | ReactNode
  /** Timestamp or time info */
  timestamp: string
  /** Visual variant for different activity types */
  variant?: 'lesson' | 'achievement' | 'streak' | 'xp' | 'challenge' | 'social'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Enable hover animations */
  animated?: boolean
  /** Show connector line (for timeline) */
  showConnector?: boolean
  /** Custom className */
  className?: string
  /** Click handler */
  onClick?: () => void
  /** Custom styles */
  style?: React.CSSProperties
}