/**
 * Shared Profile Types
 * 
 * Centralized type definitions to eliminate duplication across profile components
 */

// ===== CORE USER DATA =====
export interface UserData {
  // Identity
  firstName: string
  lastName: string
  username?: string
  avatar: string
  
  // Progress & Stats
  totalXP: number
  currentStreak: number
  completedLessons: number
  rank: number
  nextRankXP?: number
  
  // Activity & Social
  totalStudyTime?: number
  achievementsUnlocked?: number
  globalRank?: number
  weeklyProgress?: number
  
  // Computed properties (can be derived)
  displayName?: string // firstName + lastName
  level?: number      // computed from totalXP
  progress?: number   // computed progress percentage
}

// ===== RANK SYSTEM =====
export interface RankInfo {
  id: number
  name: string
  minXP: number
  maxXP: number
  gradient: string
  color: string
  icon?: string
}

// ===== ACHIEVEMENT SYSTEM =====
export interface Achievement {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  achieved: boolean
  unlockedAt?: Date
  category: 'learning' | 'streak' | 'social' | 'special'
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  xpReward?: number
}

// ===== ACTIVITY SYSTEM =====
export interface ActivityItem {
  id: string
  type: 'lesson' | 'achievement' | 'xp' | 'streak' | 'milestone'
  title: string
  description?: string
  timeAgo: string
  value?: string | number
  icon: React.ComponentType<any>
  color: string
  metadata?: Record<string, any>
}

// ===== COMPONENT PROP TYPES =====
export interface BaseProfileProps {
  userData: UserData
  itemVariants?: any // Framer Motion variants
}

export interface WithVariantsProps {
  itemVariants: any // Required motion variants
}

export interface WithOptionalVariantsProps {
  itemVariants?: any // Optional motion variants
}

// ===== MODAL TYPES =====
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export interface UsernameModalProps extends ModalProps {
  username: string
  displayName: string
}

// ===== METRICS & STATS =====
export interface MetricItem {
  id: string
  label: string
  value: string | number
  icon: React.ComponentType<any>
  color: string
  description?: string
  trend?: 'up' | 'down' | 'stable'
  changePercentage?: number
}

export interface SocialStats {
  globalRank: number
  friendsCount: number
  studyGroupRank: number
  mentorshipPoints: number
}

// ===== COMPONENT-SPECIFIC TYPES =====
export interface ProfileHeaderProps extends BaseProfileProps {
  onSettingsClick?: () => void
  showSocialProof?: boolean
  showPersonalization?: boolean
}

export interface ProfileStatsProps extends BaseProfileProps {}

export interface ScrollableMetricsProps {
  userData: UserData
}

export interface ProgressBarProps {
  userData: UserData
  currentRank: RankInfo
  nextRank?: RankInfo
  isMaxRank?: boolean
}

export interface ProfileAchievementsProps extends WithVariantsProps {
  achievements?: Achievement[]
  maxVisible?: number
}

export interface RecentActivityProps extends WithVariantsProps {
  activities?: ActivityItem[]
  maxVisible?: number
}

export interface SocialProofProps extends BaseProfileProps {}

export interface PersonalizationTouchesProps extends BaseProfileProps {}

export interface AboutAppSectionProps extends WithVariantsProps {}

// ===== UTILITY TYPES =====
export type ProfileComponentProps = 
  | ProfileHeaderProps
  | ProfileStatsProps
  | ScrollableMetricsProps
  | ProgressBarProps
  | ProfileAchievementsProps
  | RecentActivityProps
  | SocialProofProps
  | PersonalizationTouchesProps
  | AboutAppSectionProps

// Type guards for runtime type checking
export const isValidUserData = (data: any): data is UserData => {
  return (
    typeof data === 'object' &&
    typeof data.firstName === 'string' &&
    typeof data.lastName === 'string' &&
    typeof data.totalXP === 'number' &&
    typeof data.currentStreak === 'number' &&
    typeof data.completedLessons === 'number' &&
    typeof data.rank === 'number'
  )
}

// Helper functions for computed properties
export const getUserDisplayName = (userData: UserData): string => {
  return `${userData.firstName} ${userData.lastName}`.trim()
}

export const getUserLevel = (totalXP: number): number => {
  // Simple level calculation: every 1000 XP = 1 level
  return Math.floor(totalXP / 1000) + 1
}

export const getProgressPercentage = (current: number, target: number): number => {
  return Math.min(100, Math.max(0, (current / target) * 100))
}

// Default values for optional props
export const DEFAULT_ACHIEVEMENTS: Achievement[] = []
export const DEFAULT_ACTIVITIES: ActivityItem[] = []
export const DEFAULT_METRICS: MetricItem[] = []