/**
 * Shared Module Exports
 * 
 * Centralized barrel export for all shared utilities, types, and constants
 */

// ===== DESIGN TOKENS =====
export {
  Z_INDEX,
  ANIMATION,
  SIZE,
  COLORS,
  TYPOGRAPHY,
  SPACING,
  BREAKPOINTS,
  VARIANTS,
  getProgressColor,
  getZIndex,
  getAnimationDelay
} from './constants'

// ===== TYPES =====
export type {
  // Profile types
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
  ProfileComponentProps,
  
  // Common types
  CommonProps,
  InteractiveProps,
  FormProps,
  MotionProps,
  Theme,
  ThemeContextValue,
  ApiResponse,
  ApiError,
  NavigationItem,
  ErrorInfo,
  ErrorBoundaryState
} from './types'

// ===== UTILITY FUNCTIONS =====
export {
  isValidUserData,
  getUserDisplayName,
  getUserLevel,
  getProgressPercentage,
  DEFAULT_ACHIEVEMENTS,
  DEFAULT_ACTIVITIES,
  DEFAULT_METRICS
} from './types'

// ===== COMMON STYLES =====
// Note: CSS files need to be imported in main.tsx or relevant component files
// Import: './shared/styles/common-patterns.css'