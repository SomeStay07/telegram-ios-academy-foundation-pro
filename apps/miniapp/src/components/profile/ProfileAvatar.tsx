import React from 'react'
import { motion } from 'framer-motion'
import { Avatar } from '../../design-system/components/avatar/index'
import { haptics } from '../../lib/haptics'
import { getUserLevel, ANIMATION, Z_INDEX } from '../../shared'
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
  const userLevel = getUserLevel(userData.totalXP)
  
  return (
    <div className="flex justify-center items-center p-6">
      {/* Enhanced Avatar Container */}
      <motion.div 
        className="relative group"
        style={{ overflow: 'visible' }}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ 
          scale: animationConstants.SCALE.HOVER,
          y: -4
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          delay: animationConstants.DELAYS.AVATAR, 
          type: "spring", 
          ...ANIMATION.SPRING.BOUNCY
        }}
        onClick={() => haptics.cardTap()}
      >
        {/* Design System Avatar */}
        <Avatar
          src={userData.avatar}
          alt={`${userData.firstName} ${userData.lastName}`}
          name={`${userData.firstName} ${userData.lastName}`}
          size="2xl"
          variant="profile"
          className="cursor-pointer"
        />
        
        {/* Enhanced Rank Ring with Glow */}
        <motion.div 
          className={`absolute inset-0 rounded-full pointer-events-none z-[${Z_INDEX.BEHIND}]`}
          style={{ 
            background: `conic-gradient(from 0deg, ${currentRank.gradient}, transparent, ${currentRank.gradient})`,
            padding: '3px',
            filter: 'blur(0.5px)'
          }}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
        </motion.div>

        {/* Subtle Glow Effect */}
        <motion.div
          className="absolute -inset-2 rounded-full pointer-events-none opacity-30 group-hover:opacity-50"
          style={{
            background: `radial-gradient(circle, ${currentRank.gradient.split(',')[0].replace('from-', '')} 0%, transparent 70%)`,
            filter: 'blur(8px)'
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Enhanced Developer decoration */}
        {!userData.avatar && (
          <motion.div 
            className={`absolute -top-2 -right-2 text-3xl filter drop-shadow-lg z-[${Z_INDEX.FLOATING_ELEMENT}]`}
            whileHover={{ 
              scale: 1.2, 
              rotate: 15,
              y: -2
            }}
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              type: "spring", 
              ...ANIMATION.SPRING.GENTLE,
              repeat: Infinity,
              duration: ANIMATION.DURATION.SLOWEST / 1000 * 4
            }}
          >
            💻
          </motion.div>
        )}

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 25}%`
              }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: ANIMATION.DURATION.SLOWEST / 1000 * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}