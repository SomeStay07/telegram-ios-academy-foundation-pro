import { ReactNode } from 'react'

export interface CelebrationOverlayProps {
  /** Type of celebration */
  type: 'level-up' | 'achievement' | 'streak' | 'completion' | 'milestone'
  /** Whether the overlay is visible */
  isVisible: boolean
  /** Main celebration title */
  title: string | ReactNode
  /** Celebration subtitle or description */
  subtitle?: string | ReactNode
  /** Badge text (like "MASTER", "LEVEL UP") */
  badgeText?: string
  /** Badge icon */
  badgeIcon?: React.ComponentType<{ className?: string }>
  /** Color theme for the celebration */
  theme?: 'gold' | 'blue' | 'green' | 'purple' | 'orange' | 'rainbow'
  /** Intensity of effects */
  intensity?: 'subtle' | 'normal' | 'intense'
  /** Duration of auto-hide (0 for manual control) */
  autoHideDuration?: number
  /** Enable particle effects */
  particles?: boolean
  /** Enable glow effects */
  glow?: boolean
  /** Enable sparkle trails */
  sparkles?: boolean
  /** Custom className */
  className?: string
  /** Callback when overlay is dismissed */
  onDismiss?: () => void
  /** Custom styles */
  style?: React.CSSProperties
}