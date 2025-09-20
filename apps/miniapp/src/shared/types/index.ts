/**
 * Shared Types Exports
 * 
 * Centralized type exports for clean imports across the application
 */

// Profile-related types
export type {
  UserData,
  RankInfo,
  Achievement,
  ActivityItem,
  MetricItem,
  SocialStats,
  BaseProfileProps,
  WithVariantsProps,
  WithOptionalVariantsProps,
  ModalProps,
  UsernameModalProps,
  ProfileHeaderProps,
  ProfileStatsProps,
  ScrollableMetricsProps,
  ProgressBarProps,
  ProfileAchievementsProps,
  RecentActivityProps,
  SocialProofProps,
  PersonalizationTouchesProps,
  AboutAppSectionProps,
  ProfileComponentProps
} from './profile'

// Utility functions
export {
  isValidUserData,
  getUserDisplayName,
  getUserLevel,
  getProgressPercentage,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_ACTIVITIES,
  DEFAULT_METRICS
} from './profile'

// Common component patterns
export interface CommonProps {
  className?: string
  children?: React.ReactNode
  id?: string
}

export interface InteractiveProps extends CommonProps {
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
  disabled?: boolean
  loading?: boolean
}

export interface FormProps extends CommonProps {
  onSubmit?: (data: any) => void
  onChange?: (data: any) => void
  disabled?: boolean
  loading?: boolean
}

// Animation types
export interface MotionProps {
  initial?: any
  animate?: any
  exit?: any
  transition?: any
  variants?: any
  whileHover?: any
  whileTap?: any
  whileInView?: any
}

// Theme types
export type Theme = 'light' | 'dark' | 'auto'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  isDark: boolean
}

// API types
export interface ApiResponse<T = any> {
  data: T
  success: boolean
  message?: string
  error?: string
}

export interface ApiError {
  message: string
  code?: string | number
  details?: any
}

// Navigation types
export interface NavigationItem {
  id: string
  label: string
  href: string
  icon?: React.ComponentType<any>
  badge?: string | number
  active?: boolean
  disabled?: boolean
}

// Common error boundary types
export interface ErrorInfo {
  componentStack: string
  errorBoundary?: string
}

export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}