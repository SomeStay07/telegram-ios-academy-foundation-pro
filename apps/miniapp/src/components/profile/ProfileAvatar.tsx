import React from 'react'
import { motion } from 'framer-motion'
import { Avatar } from '../../design-system/components/avatar/index'
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
    <div className="flex justify-center items-center p-6">
      {/* Main Avatar Container with Design System */}
      <motion.div 
        className="relative"
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
        {/* Design System Avatar */}
        <Avatar
          src={userData.avatar}
          alt={`${userData.firstName} ${userData.lastName}`}
          fallback={`${userData.firstName.charAt(0)}${userData.lastName.charAt(0)}`}
          size="2xl"
          variant="profile"
          status="online"
          className="cursor-pointer"
        />
        
        {/* Animated rank ring for avatars */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ 
            background: `conic-gradient(from 0deg, ${currentRank.gradient}, transparent)`,
            padding: '4px'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-white dark:bg-gray-900" />
        </motion.div>
        
        {/* Developer decoration for fallback avatars */}
        {!userData.avatar && (
          <motion.div 
            className="absolute -top-1 -right-1 text-2xl filter drop-shadow-md"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            💻
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}