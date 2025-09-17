import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { StatsContainerProps, StatCard, StatsMetrics } from '../types'
import { StatCard as StatCardComponent } from '../StatCard/StatCard'
import { StatsHeader } from '../StatsHeader/StatsHeader'
import { StatsSummary } from '../StatsSummary/StatsSummary'
import styles from './StatsContainer.module.css'

export const StatsContainer: React.FC<StatsContainerProps> = ({ 
  userData, 
  className = '' 
}) => {
  // Calculate additional metrics
  const additionalMetrics: StatsMetrics = useMemo(() => {
    const avgWeeklyXP = Math.round(userData.weeklyXP / 7)
    const winRate = userData.battlesWon > 0 ? Math.round((userData.battlesWon / (userData.battlesWon + 5)) * 100) : 0
    const studyTime = Math.round(userData.challengesCompleted * 15) // 15 min per challenge
    const consistencyScore = Math.min(Math.round((userData.streak / 30) * 100), 100)
    
    return {
      avgWeeklyXP,
      winRate,
      studyTime,
      consistencyScore
    }
  }, [userData])

  const primaryStats: StatCard[] = [
    {
      id: 'weekly-xp',
      icon: '📊',
      label: 'Weekly XP',
      value: userData.weeklyXP.toLocaleString(),
      subValue: `${additionalMetrics.avgWeeklyXP}/day avg`,
      trend: userData.weeklyXP > 500 ? 'up' : 'stable',
      trendValue: userData.weeklyXP > 500 ? '+12%' : '0%',
      color: '#00D2FF',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)'
    },
    {
      id: 'win-rate',
      icon: '🎯',
      label: 'Win Rate',
      value: `${additionalMetrics.winRate}%`,
      subValue: `${userData.battlesWon} battles`,
      trend: additionalMetrics.winRate > 70 ? 'up' : 'stable',
      trendValue: additionalMetrics.winRate > 70 ? '+5%' : '0%',
      color: '#00FF88',
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)'
    },
    {
      id: 'study-time',
      icon: '⏰',
      label: 'Study Time',
      value: `${Math.round(additionalMetrics.studyTime / 60)}h`,
      subValue: `${additionalMetrics.studyTime % 60}m total`,
      trend: additionalMetrics.studyTime > 120 ? 'up' : 'stable',
      trendValue: additionalMetrics.studyTime > 120 ? '+8%' : '0%',
      color: '#FF6B6B',
      bgGradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)'
    },
    {
      id: 'consistency',
      icon: '⚡',
      label: 'Consistency',
      value: `${additionalMetrics.consistencyScore}%`,
      subValue: `${userData.streak} day streak`,
      trend: userData.streak >= 7 ? 'up' : 'stable',
      trendValue: userData.streak >= 7 ? '+15%' : '0%',
      color: '#FFD93D',
      bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(249, 115, 22, 0.2) 100%)'
    }
  ]

  const secondaryStats: StatCard[] = [
    {
      id: 'global-rank',
      icon: '🏆',
      label: 'Global Rank',
      value: `#${userData.globalRank.toLocaleString()}`,
      subValue: `Top ${Math.round((userData.globalRank / 10000) * 100)}%`,
      color: '#9C88FF',
      bgGradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)'
    },
    {
      id: 'achievements',
      icon: '🌟',
      label: 'Achievements',
      value: userData.achievements,
      subValue: `${Math.min(3, userData.achievements)} recent`,
      color: '#FF9500',
      bgGradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.2) 0%, rgba(245, 158, 11, 0.2) 100%)'
    },
    {
      id: 'challenges',
      icon: '🎮',
      label: 'Challenges',
      value: userData.challengesCompleted,
      subValue: `${Math.min(5, userData.challengesCompleted)} weekly`,
      color: '#50E3C2',
      bgGradient: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)'
    },
    {
      id: 'total-xp',
      icon: '💎',
      label: 'Total XP',
      value: userData.totalXP.toLocaleString(),
      subValue: `Level ${Math.floor(userData.totalXP / 1000)}`,
      color: '#007AFF',
      bgGradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)'
    }
  ]

  return (
    <motion.section
      className={`${styles.statsContainer} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="stats-title"
      role="region"
    >
      <StatsHeader />

      {/* Primary Stats Grid */}
      <motion.div
        className={styles.primaryGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {primaryStats.map((stat, index) => (
          <StatCardComponent
            key={stat.id}
            stat={stat}
            index={index}
            size="large"
          />
        ))}
      </motion.div>

      {/* Secondary Stats Grid */}
      <motion.div
        className={styles.secondaryGrid}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        {secondaryStats.map((stat, index) => (
          <StatCardComponent
            key={stat.id}
            stat={stat}
            index={index + primaryStats.length}
            size="medium"
          />
        ))}
      </motion.div>

      {/* Summary Card */}
      <StatsSummary userData={userData} />
    </motion.section>
  )
}