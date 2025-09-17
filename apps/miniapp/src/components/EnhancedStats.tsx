import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useHaptics } from '../lib/haptics'

interface StatCard {
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

interface EnhancedStatsProps {
  userData: {
    totalXP: number
    weeklyXP: number
    monthlyXP: number
    challengesCompleted: number
    battlesWon: number
    globalRank: number
    achievements: number
    streak: number
  }
  className?: string
}

export const EnhancedStats: React.FC<EnhancedStatsProps> = ({ 
  userData, 
  className = '' 
}) => {
  const haptics = useHaptics()

  // Calculate additional metrics
  const additionalMetrics = useMemo(() => {
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
      icon: '📈',
      label: 'Weekly XP',
      value: userData.weeklyXP.toLocaleString(),
      subValue: `${additionalMetrics.avgWeeklyXP}/day avg`,
      trend: 'up',
      trendValue: '+12%',
      color: '#00D2FF',
      bgGradient: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      id: 'win-rate',
      icon: '🎯',
      label: 'Win Rate',
      value: `${additionalMetrics.winRate}%`,
      subValue: `${userData.battlesWon} battles won`,
      trend: 'up',
      trendValue: '+5%',
      color: '#00FF88',
      bgGradient: 'from-green-500/20 to-emerald-500/20'
    },
    {
      id: 'study-time',
      icon: '⏱️',
      label: 'Study Time',
      value: `${Math.round(additionalMetrics.studyTime / 60)}h`,
      subValue: `${additionalMetrics.studyTime % 60}m this week`,
      trend: 'up',
      trendValue: '+8%',
      color: '#FF6B6B',
      bgGradient: 'from-red-500/20 to-pink-500/20'
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
      bgGradient: 'from-yellow-500/20 to-orange-500/20'
    }
  ]

  const secondaryStats: StatCard[] = [
    {
      id: 'global-rank',
      icon: '🏆',
      label: 'Global Rank',
      value: `#${userData.globalRank.toLocaleString()}`,
      subValue: 'Top 5%',
      color: '#9C88FF',
      bgGradient: 'from-purple-500/20 to-indigo-500/20'
    },
    {
      id: 'achievements',
      icon: '🌟',
      label: 'Achievements',
      value: userData.achievements,
      subValue: '3 this month',
      color: '#FF9500',
      bgGradient: 'from-orange-500/20 to-yellow-500/20'
    },
    {
      id: 'challenges',
      icon: '🎮',
      label: 'Challenges',
      value: userData.challengesCompleted,
      subValue: '5 this week',
      color: '#50E3C2',
      bgGradient: 'from-teal-500/20 to-cyan-500/20'
    },
    {
      id: 'total-xp',
      icon: '💎',
      label: 'Total XP',
      value: userData.totalXP.toLocaleString(),
      subValue: `Level ${Math.floor(userData.totalXP / 1000)}`,
      color: '#007AFF',
      bgGradient: 'from-blue-600/20 to-purple-600/20'
    }
  ]

  const StatCardComponent: React.FC<{ stat: StatCard; index: number; size?: 'large' | 'medium' }> = ({ 
    stat, 
    index, 
    size = 'medium' 
  }) => (
    <motion.article
      className={`enhanced-stat-card ${size === 'large' ? 'stat-card-large' : 'stat-card-medium'}`}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }}
      whileHover={{ 
        scale: 1.02,
        y: -4,
        transition: { type: "spring", stiffness: 400 }
      }}
      whileTap={{ scale: 0.98 }}
      onTap={() => {
        haptics.impact('light')
        console.log('Stat tapped:', stat.label)
      }}
      style={{
        background: `linear-gradient(135deg, ${stat.bgGradient || 'from-gray-500/20 to-gray-600/20'})`
      }}
      role="button"
      tabIndex={0}
      aria-label={`${stat.label}: ${stat.value}${stat.subValue ? `, ${stat.subValue}` : ''}${stat.trend ? `, trending ${stat.trend} by ${stat.trendValue}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          haptics.impact('light')
          console.log('Stat activated via keyboard:', stat.label)
        }
      }}
    >
      {/* Background glow effect */}
      <motion.div
        className="stat-card-glow"
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `radial-gradient(circle at center, ${stat.color}40 0%, transparent 70%)`
        }}
      />

      {/* Content */}
      <div className="stat-card-content">
        <div className="stat-header">
          <motion.div
            className="stat-icon-enhanced"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
            style={{ color: stat.color }}
          >
            {stat.icon}
          </motion.div>
          
          {stat.trend && (
            <motion.div
              className={`trend-indicator ${stat.trend}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <span className="trend-arrow">
                {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
              </span>
              <span className="trend-value">{stat.trendValue}</span>
            </motion.div>
          )}
        </div>

        <motion.div
          className="stat-value-enhanced"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          style={{ color: stat.color }}
        >
          {stat.value}
        </motion.div>

        <motion.div
          className="stat-label-enhanced"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
        >
          {stat.label}
        </motion.div>

        {stat.subValue && (
          <motion.div
            className="stat-subvalue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {stat.subValue}
          </motion.div>
        )}
      </div>

      {/* Shimmer effect on hover */}
      <div className="stat-card-shimmer" />
    </motion.article>
  )

  return (
    <motion.section
      className={`enhanced-stats-container ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="stats-title"
      role="region"
    >
      {/* Section Header */}
      <motion.header
        className="stats-section-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="section-icon"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          >
            📊
          </motion.div>
          <div>
            <h2 id="stats-title" className="section-title">Performance Analytics</h2>
            <p className="section-subtitle">Your learning insights at a glance</p>
          </div>
        </div>
      </motion.header>

      {/* Primary Stats Grid */}
      <motion.div
        className="primary-stats-grid"
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
        className="secondary-stats-grid"
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
      <motion.div
        className="stats-summary-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="summary-content">
          <div className="summary-icon">🎯</div>
          <div className="summary-text">
            <h4 className="summary-title">This Week's Highlights</h4>
            <p className="summary-description">
              You're on track! Keep up the momentum with your {userData.streak}-day streak and 
              {userData.weeklyXP > 1000 ? ' exceptional' : ' solid'} weekly progress.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  )
}