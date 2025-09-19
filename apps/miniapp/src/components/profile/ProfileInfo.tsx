import React from 'react'
import { motion } from 'framer-motion'
import { haptics } from '../../lib/haptics'
import { useAchievement } from '../AchievementNotification'
import type { BasicAnimationConstants } from '../../types/animations'

interface ProfileInfoProps {
  userData: {
    firstName: string
    lastName: string
    username?: string
    totalXP: number
  }
  currentRank: {
    gradient: string
  }
  animationConstants: BasicAnimationConstants
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({
  userData,
  currentRank,
  animationConstants
}) => {
  const achievement = useAchievement()

  return (
    <div className="profile-info-enhanced">
      {/* Vertical Layout for Name & Username */}
      <div className="profile-text-stack">
        {/* Full Name */}
        <motion.h1 
          className="profile-name-elegant"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: animationConstants.DELAYS.NAME }}
        >
          {userData.firstName} {userData.lastName}
        </motion.h1>
        
        {/* Unified Badge Section - Username & Level */}
        <motion.div 
          className="unified-badges-container"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: animationConstants.DELAYS.USERNAME,
            type: "spring",
            stiffness: 300
          }}
        >
          {/* Username Badge */}
          {userData.username && (
            <motion.div 
              className="badge-unified badge-username"
              whileHover={{ 
                scale: animationConstants.SCALE.HOVER
              }}
              whileTap={{ scale: 0.95 }}
              onTap={() => {
                haptics.buttonPress()
                achievement.trigger(
                  'Username Explorer! 🏷️',
                  `Checked out @${userData.username}`,
                  '👤'
                )
              }}
              role="button"
              aria-label={`Username: ${userData.username}`}
              tabIndex={0}
            >
              <motion.span 
                className="badge-username-text"
                animate={{ 
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                @{userData.username}
              </motion.span>
            </motion.div>
          )}
          
          {/* Level Badge */}
          <motion.div 
            className="badge-unified badge-level"
            style={{
              background: `linear-gradient(135deg, ${currentRank.gradient})`
            }}
            initial={{ opacity: 0, x: 15, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              delay: animationConstants.DELAYS.LEVEL_BADGE,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ 
              scale: animationConstants.SCALE.HOVER
            }}
            whileTap={{ scale: 0.95 }}
            onTap={() => {
              haptics.impact('heavy')
              achievement.trigger(
                `Level ${Math.floor(userData.totalXP / 1000)} Elite! ⚡`,
                `Dominating with ${userData.totalXP.toLocaleString()} XP`,
                '🏆'
              )
            }}
          >
            <svg 
              className="badge-level-icon"
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" 
                fill="white" 
                stroke="rgba(255,255,255,0.3)" 
                strokeWidth="0.5"
                style={{
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                }}
              />
            </svg>
            <span className="badge-level-text">
              {Math.floor(userData.totalXP / 1000)}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}