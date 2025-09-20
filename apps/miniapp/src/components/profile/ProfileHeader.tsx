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
import { EnhancedProgressBar } from './EnhancedProgressBar'

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
    console.log('Settings button clicked!')
    
    try {
      // Новая улучшенная haptic последовательность
      await TelegramHaptics.pageTransition()
      
      // Smooth navigation to settings page
      navigate({ to: '/settings' })
    } catch (error) {
      console.error('Settings navigation error:', error)
      // Fallback navigation
      navigate({ to: '/settings' })
    }
  }, [navigate])

  const handleUsernameClick = useCallback(async () => {
    // Улучшенный haptic feedback
    await TelegramHaptics.impact('light')
    setIsUsernameModalOpen(true)
  }, [])

  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={`text-white dark:text-white border-0 shadow-xl relative ${styles.profileCard}`} style={{ position: 'relative' }}>
          {/* Level Up Celebration Effects */}
          <LevelUpCelebration isMaxRank={isMaxRank} currentRank={currentRank} />
          
          {/* Settings Button - спокойная элегантность */}
          <motion.button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              console.log('Button clicked directly!')
              handleSettingsClick()
            }}
            className="absolute top-3 right-3 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 group shadow-lg cursor-pointer touch-manipulation"
            style={{ 
              zIndex: 1000, 
              pointerEvents: 'auto',
              padding: 'clamp(0.75rem, 2vw, 1rem)',
              minWidth: 'clamp(44px, 8vw, 52px)',
              minHeight: 'clamp(44px, 8vw, 52px)'
            }}
            whileHover={{ 
              scale: 1.1, 
              y: -3,
              rotate: 90,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)"
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
            <Settings 
              className="text-white/80 dark:text-white/70 group-hover:text-white dark:group-hover:text-white transition-colors duration-200 pointer-events-none" 
              style={{
                width: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                height: 'clamp(1.25rem, 2.5vw, 1.5rem)'
              }}
            />
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
            <div className="flex flex-col">
              <Typography variant="display-md" className={`${styles.profileName} text-white dark:text-white font-bold leading-tight`}>
                {userData.firstName} {userData.lastName || ''}
              </Typography>
            </div>
            
            {/* Username and Level Badge */}
            <div className={`${styles.profileUsername} ${styles.adaptiveUsernameLevel}`}>
              {username && (
                <motion.button
                  onClick={handleUsernameClick}
                  className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-full border border-white/20 group cursor-pointer overflow-hidden"
                  style={{
                    padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)',
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    lineHeight: '1.2'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2,
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 25px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.15)"
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ 
                    type: "spring",
                    ...ANIMATION.SPRING.GENTLE
                  }}
                >
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.5) 50%, transparent 70%)',
                    }}
                    animate={{
                      x: ['-100%', '200%'],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <AtSign 
                    className="text-white/80 dark:text-white/70 group-hover:text-white dark:group-hover:text-white relative z-10" 
                    style={{
                      width: 'clamp(0.875rem, 1.8vw, 1rem)',
                      height: 'clamp(0.875rem, 1.8vw, 1rem)',
                      marginRight: 'clamp(0.375rem, 1vw, 0.5rem)'
                    }}
                  />
                  <span className="text-white dark:text-white font-medium group-hover:text-white/90 dark:group-hover:text-white/90 relative z-10">
                    {username}
                  </span>
                </motion.button>
              )}
              <InlineLevelBadge level={userLevel} size="sm" showText={true} />
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className={styles.profileProgress}>
          <EnhancedProgressBar
            userData={userData}
            currentRank={currentRank}
            nextRank={nextRank}
            currentXP={userData.totalXP}
            progressPercentage={progressPercentage}
            isMaxRank={isMaxRank}
          />
        </div>
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