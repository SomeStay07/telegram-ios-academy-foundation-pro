import React, { useState, useMemo, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Settings, AtSign, Trophy, Zap, Info } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

// Design System Components
import { Avatar } from '../../design-system/components/avatar/index'
import { Card } from '../../design-system/components/card/index'
import { Typography } from '../../design-system/components/typography/index'
import { Progress } from '../../design-system/components/progress/index'

// Telegram Integration
import { getTelegramApi } from '../../lib/telegram/api'
import { TelegramHaptics, useTelegramAnimations } from '../../lib/telegram/animations'

// CSS Module
import styles from '../../pages/ProfilePage.module.css'

// Username Modal
import { UsernameModal } from './UsernameModal'

// New Profile Components
import { LevelUpCelebration } from './LevelUpCelebration'
import { SocialProof } from './SocialProof'
import { PersonalizationTouches } from './PersonalizationTouches'

// Design Tokens
import { Z_INDEX, ANIMATION } from '../../shared/constants/design-tokens'
import { getUserLevel } from '../../shared'
import { InlineLevelBadge } from '../../design-system/components/level-badge/InlineLevelBadge'

interface ProfileHeaderProps {
  userData: {
    avatar: string
    totalXP: number
    streak: number
    firstName: string
    lastName: string
  }
  displayName: string
  username?: string
  currentRank: {
    name: string
  }
  nextRank?: {
    name: string
  }
  isMaxRank: boolean
  progressPercentage: number
  itemVariants: any
}

export const ProfileHeader = React.memo(function ProfileHeader({
  userData,
  displayName,
  username,
  currentRank,
  nextRank,
  isMaxRank,
  progressPercentage,
  itemVariants
}: ProfileHeaderProps) {
  const navigate = useNavigate()
  const telegramApi = getTelegramApi()
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false)
  
  // Calculate user level
  const userLevel = getUserLevel(userData.totalXP)
  
  // Telegram animations and haptics
  const { cardVariants, transition } = useTelegramAnimations()

  // Memoized fallback calculation for avatar
  const avatarFallback = useMemo(() => 
    displayName.split(' ').map(n => n[0]).join('').substring(0, 2)
  , [displayName])

  // Memoized style calculation for progress
  const progressStyle = useMemo(() => ({
    '--progress-color': 'var(--gradient-xp)',
    '--progress-bg': 'rgba(255, 255, 255, 0.15)'
  } as React.CSSProperties), [])

  const handleSettingsClick = useCallback(async () => {
    // Новая улучшенная haptic последовательность
    await TelegramHaptics.pageTransition()
    
    // Smooth navigation to settings page
    navigate({ to: '/settings' })
  }, [navigate])

  const handleUsernameClick = useCallback(async () => {
    // Улучшенный haptic feedback
    await TelegramHaptics.impact('light')
    setIsUsernameModalOpen(true)
  }, [])

  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={`p-6 mb-6 text-gray-900 dark:text-white border-0 shadow-xl relative ${styles.profileCard}`}>
          {/* Level Up Celebration Effects */}
          <LevelUpCelebration isMaxRank={isMaxRank} currentRank={currentRank} />
          
          {/* Settings Button - спокойная элегантность */}
          <motion.button 
            onClick={handleSettingsClick}
            className={`absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 group shadow-lg z-[${Z_INDEX.FLOATING_UI}]`}
            whileHover={{ 
              scale: 1.1, 
              y: -3,
              rotate: 90,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)"
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: 180
            }}
            transition={{
              type: "spring",
              ...ANIMATION.SPRING.BOUNCY
            }}
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ type: "spring", ...ANIMATION.SPRING.GENTLE }}
            >
              <Settings className="w-5 h-5 text-gray-600 dark:text-white/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" />
            </motion.div>
          </motion.button>
        
        {/* Adaptive Profile Layout */}
        <div className={styles.adaptiveProfileLayout}>
          {/* Avatar Section */}
          <div className={styles.profileAvatar}>
            <Avatar
              src={userData.avatar}
              alt={displayName}
              name={displayName}
              size="2xl"
              className={`ring-2 ring-white/20 shadow-xl hover:ring-4 hover:ring-white/40 transition-all duration-[${ANIMATION.DURATION.NORMAL}ms] ${styles.adaptiveAvatar}`}
            />
          </div>

          {/* Profile Info */}
          <div className={styles.profileInfo}>
            {/* Name Section */}
            <div className="flex items-center flex-wrap gap-2">
              <Typography variant="display-md" className={`${styles.profileName} text-gray-900 dark:text-white font-bold leading-tight`}>
                {userData.firstName} {userData.lastName || ''}
              </Typography>
              <InlineLevelBadge level={userLevel} />
            </div>
            
            {username && (
              <div className={styles.profileUsername}>
                <motion.button
                  onClick={handleUsernameClick}
                  className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 group cursor-pointer"
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: ANIMATION.DURATION.NORMAL / 1000, ease: ANIMATION.EASING.TELEGRAM }}
                >
                  <AtSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white" />
                  <Typography variant="body-sm" className="text-gray-900 dark:text-white font-medium group-hover:text-gray-700 dark:group-hover:text-white/90">
                    {username}
                  </Typography>
                  
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Adaptive Progress Bar */}
        {!isMaxRank && nextRank && (
          <div className={styles.profileProgress}>
            <div className="flex justify-between text-gray-700 dark:text-white/80 text-sm mb-2">
              <span>До {nextRank.name}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="bg-white/20" 
              style={progressStyle}
            />
          </div>
        )}
      </Card>
      </motion.div>

      {/* Username Modal */}
      {username && (
        <UsernameModal
          isOpen={isUsernameModalOpen}
          onClose={() => setIsUsernameModalOpen(false)}
          username={username}
          displayName={displayName}
        />
      )}
    </>
  )
})