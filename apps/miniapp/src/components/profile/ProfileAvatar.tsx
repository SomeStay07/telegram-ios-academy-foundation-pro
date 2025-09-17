import React from 'react'
import { motion } from 'framer-motion'
import { haptics } from '../../lib/haptics'
import type { BasicAnimationConstants } from '../../types/animations'

interface ProfileAvatarProps {
  userData: {
    avatar?: string
    firstName: string
    lastName: string
    totalXP: number
  }
  currentRank: {
    id: number
    gradient: string
  }
  animationConstants: BasicAnimationConstants
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  userData,
  currentRank,
  animationConstants
}) => {
  return (
    <div className="avatar-section-clean">
      {/* Main Avatar Container */}
      <motion.div 
        className="avatar-main-container"
        style={{ overflow: 'visible' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: animationConstants.SCALE.HOVER }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          delay: animationConstants.DELAYS.AVATAR, 
          type: "spring", 
          stiffness: animationConstants.SPRING.STIFF 
        }}
        onClick={() => haptics.cardTap()}
      >
        {userData.avatar ? (
          <img 
            src={userData.avatar} 
            alt={`${userData.firstName} ${userData.lastName}`}
            className="avatar-xl-enhanced"
          />
        ) : (
          <div className="avatar-icon-grey">
            <motion.div 
              className="avatar-pattern"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="dev-icon-corner"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              💻
            </motion.div>
            <div className="code-lines">
              <div className="code-line line-1" />
              <div className="code-line line-2" />
              <div className="code-line line-3" />
            </div>
          </div>
        )}
        
        {/* Animated ring for real photos */}
        {userData.avatar && (
          <motion.div 
            className="avatar-ring"
            style={{ background: `conic-gradient(from 0deg, ${currentRank.gradient}, transparent)` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}
        
      </motion.div>
    </div>
  )
}