import React from 'react'
import { motion } from 'framer-motion'
import { haptics } from '../../lib/haptics'
import { useAchievement } from '../AchievementNotification'

interface XPSystemProps {
  userData: {
    totalXP: number
  }
  currentRank: {
    id: number
  }
  nextRank: {
    name: string
    icon: string
    minXP: number
  }
  isMaxRank: boolean
  animationConstants: {
    DELAYS: {
      XP_MAIN: number
      PROGRESS: number
    }
    SCALE: {
      HOVER: number
    }
    SPRING: {
      STIFF: number
    }
    TRANSFORM: {
      Y_HOVER_LARGE: number
    }
  }
}

export const XPSystem: React.FC<XPSystemProps> = ({
  userData,
  currentRank,
  nextRank,
  isMaxRank,
  animationConstants
}) => {
  const achievement = useAchievement()
  const xpToNext = isMaxRank ? 0 : nextRank.minXP - userData.totalXP

  return (
    <div className="xp-stats-grid">
      {/* Current XP Card */}
      <motion.div 
        className="xp-card-main"
        initial={{ opacity: 0, scale: 0.9, x: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: animationConstants.DELAYS.XP_MAIN, type: "spring", stiffness: animationConstants.SPRING.STIFF }}
        whileHover={{ scale: animationConstants.SCALE.HOVER, y: animationConstants.TRANSFORM.Y_HOVER_LARGE }}
        onTap={() => {
          haptics.cardTap()
          achievement.trigger(
            'XP Master! 💫',
            `${userData.totalXP.toLocaleString()} experience points achieved`,
            '⚡'
          )
        }}
      >
        <motion.div 
          className="xp-icon-container"
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="xp-lightning">◈</span>
        </motion.div>
        <div className="xp-main-content">
          <motion.span 
            className="xp-value-enhanced"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: animationConstants.DELAYS.PROGRESS }}
          >
            {userData.totalXP.toLocaleString()}
          </motion.span>
          <span className="xp-label-enhanced">Experience Points</span>
        </div>
      </motion.div>

      {/* Next Rank Card */}
      <motion.div 
        className="xp-card-next"
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: animationConstants.SCALE.HOVER, y: animationConstants.TRANSFORM.Y_HOVER_LARGE }}
        onTap={() => {
          haptics.selection()
          if (!isMaxRank) {
            achievement.trigger(
              `Next: ${nextRank.name} ${nextRank.icon}`,
              `${xpToNext.toLocaleString()} XP remaining to advance`,
              nextRank.icon
            )
          }
        }}
      >
        <motion.div 
          className="next-rank-icon"
          whileHover={{ scale: 1.1, rotate: -5 }}
        >
          {!isMaxRank ? nextRank.icon : '◈'}
        </motion.div>
        <div className="next-rank-content">
          {!isMaxRank ? (
            <>
              <span className="next-rank-xp">{xpToNext.toLocaleString()}</span>
              <span className="next-rank-label">to {nextRank.name}</span>
            </>
          ) : (
            <>
              <span className="max-rank-text">Max Level</span>
              <span className="max-rank-label">Elite Status</span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}