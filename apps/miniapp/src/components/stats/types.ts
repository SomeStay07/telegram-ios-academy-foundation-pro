export interface StatCard {
  id: string
  icon: string
  label: string
  value: string | number
  subValue?: string
  trend?: 'up' | 'down' | 'stable'
  trendValue?: string
  color: string
  bgGradient?: string
}

export interface UserStatsData {
  totalXP: number
  weeklyXP: number
  monthlyXP: number
  challengesCompleted: number
  battlesWon: number
  globalRank: number
  achievements: number
  streak: number
}

export interface StatsMetrics {
  avgWeeklyXP: number
  winRate: number
  studyTime: number
  consistencyScore: number
}

export interface StatsContainerProps {
  userData: UserStatsData
  className?: string
}

export interface StatCardProps {
  stat: StatCard
  index: number
  size?: 'large' | 'medium'
}

export interface StatsHeaderProps {
  className?: string
}

export interface StatsSummaryProps {
  userData: UserStatsData
  className?: string
}