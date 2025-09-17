import React from 'react'
import { motion } from 'framer-motion'
import { haptics } from '../../lib/haptics'
import { ProfileAvatar } from './ProfileAvatar'
import { ProfileInfo } from './ProfileInfo'
import { ProgressBar } from './ProgressBar'
import { XPSystem } from './XPSystem'
import type { AnimationConstants } from '../../types/animations'

interface ProfileHeroProps {
  userData: {
    firstName: string
    lastName: string
    username?: string
    avatar?: string
    totalXP: number
  }
  currentRank: {
    id: number
    name: string
    gradient: string
    minXP: number
  }
  nextRank: {
    name: string
    minXP: number
  }
  progressPercentage: number
  isMaxRank: boolean
  animationConstants: AnimationConstants
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  userData,
  currentRank,
  nextRank,
  progressPercentage,
  isMaxRank,
  animationConstants
}) => {
  return (
    <motion.div 
      className="hero-section-combined"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className={`hero-bg rank-${currentRank.id}`} />
      <motion.div 
        className="hero-card-premium glass-card mx-4 my-6 p-6 bg-white/3 border-white/8"
        whileHover={{ 
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          scale: 1.005,
          y: -2
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onTap={() => haptics.cardTap()}
      >
        {/* Profile Header with Avatar & Info */}
        <div className="profile-header-premium">
          <ProfileAvatar 
            userData={userData}
            currentRank={currentRank}
            animationConstants={animationConstants}
          />
          
          <ProfileInfo 
            userData={userData}
            currentRank={currentRank}
            animationConstants={animationConstants}
          />
        </div>

        {/* Enhanced XP Progress Section */}
        <motion.div 
          className="xp-progress-enhanced"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: animationConstants.DELAYS.XP_SECTION }}
        >
          <XPSystem 
            userData={userData}
            currentRank={currentRank}
            nextRank={nextRank}
            isMaxRank={isMaxRank}
            animationConstants={animationConstants}
          />

          <ProgressBar 
            progressPercentage={progressPercentage}
            currentRank={currentRank}
            nextRank={nextRank}
            userData={userData}
            isMaxRank={isMaxRank}
            animationDelays={{
              PROGRESS: animationConstants.DELAYS.PROGRESS,
              XP_RANGE: animationConstants.DELAYS.XP_RANGE
            }}
            animationConstants={{
              SCALE: {
                HOVER_LARGE: animationConstants.SCALE.HOVER_LARGE
              }
            }}
          />

        </motion.div>
      </motion.div>
    </motion.div>
  )
}