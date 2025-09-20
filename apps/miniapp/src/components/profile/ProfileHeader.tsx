import React, { useState } from 'react'
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

// CSS Module
import styles from '../../pages/ProfilePage.module.css'

// Username Modal
import { UsernameModal } from './UsernameModal'

// New Profile Components
import { LevelUpCelebration } from './LevelUpCelebration'
import { RecentActivity } from './RecentActivity'
import { SocialProof } from './SocialProof'
import { PersonalizationTouches } from './PersonalizationTouches'

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

export function ProfileHeader({
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

  const handleSettingsClick = () => {
    // Enhanced haptic feedback sequence
    try {
      if (telegramApi.isAvailable()) {
        const webApp = telegramApi.getWebApp()
        // Double haptic feedback for better UX
        if (webApp?.HapticFeedback?.impactOccurred) {
          webApp.HapticFeedback.impactOccurred('medium')
          setTimeout(() => {
            if (webApp?.HapticFeedback?.selectionChanged) {
              webApp.HapticFeedback.selectionChanged()
            }
          }, 100)
        }
      }
    } catch (error) {
      // Gracefully handle haptic feedback errors
      console.warn('Haptic feedback not available:', error)
    }
    
    // Smooth navigation to settings page
    navigate({ to: '/settings' })
  }

  const handleUsernameClick = () => {
    // Haptic feedback for username click
    try {
      if (telegramApi.isAvailable() && telegramApi.hapticFeedback) {
        telegramApi.hapticFeedback.impactOccurred('light')
      }
    } catch (error) {
      // Gracefully handle haptic feedback errors
      console.warn('Haptic feedback not available:', error)
    }
    setIsUsernameModalOpen(true)
  }

  return (
    <>
      <motion.div variants={itemVariants}>
        <Card className={`p-6 mb-6 text-gray-900 dark:text-white border-0 shadow-xl relative ${styles.profileCard}`}>
          {/* Level Up Celebration Effects */}
          <LevelUpCelebration isMaxRank={isMaxRank} currentRank={currentRank} />
          
          {/* Settings Button - спокойная элегантность */}
          <motion.button 
            onClick={handleSettingsClick}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 group z-50"
            whileHover={{ 
              scale: 1.05, 
              rotate: 45,
              backgroundColor: "rgba(255, 255, 255, 0.15)"
            }}
            whileTap={{ 
              scale: 0.95,
              rotate: 90
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300" />
          </motion.button>
        
        {/* Adaptive Profile Layout */}
        <div className={styles.adaptiveProfileLayout}>
          {/* Avatar Section */}
          <div className={styles.profileAvatar}>
            <Avatar
              src={userData.avatar}
              alt={displayName}
              fallback={displayName.split(' ').map(n => n[0]).join('').substring(0, 2)}
              size="2xl"
              className={`ring-4 ring-white/30 shadow-2xl ${styles.adaptiveAvatar}`}
            />
            {/* Online Status */}
            <div className={styles.statusIndicator}></div>
          </div>

          {/* Profile Info */}
          <div className={styles.profileInfo}>
            {/* Name Section */}
            <div className="space-y-1">
              <Typography variant="display-md" className={`${styles.profileName} text-gray-900 dark:text-white font-bold leading-tight`}>
                {userData.firstName}
              </Typography>
              {userData.lastName && (
                <Typography variant="display-sm" className="text-gray-700 dark:text-white/90 font-semibold -mt-1">
                  {userData.lastName}
                </Typography>
              )}
            </div>
            
            {username && (
              <div className={styles.profileUsername}>
                <motion.button
                  onClick={handleUsernameClick}
                  className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 group cursor-pointer transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    y: -1,
                    backgroundColor: "rgba(255, 255, 255, 0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <AtSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-gray-600 dark:text-white/70 group-hover:text-gray-800 dark:group-hover:text-white transition-colors duration-300" />
                  <Typography variant="body-sm" className="text-gray-900 dark:text-white font-medium group-hover:text-gray-700 dark:group-hover:text-white/90 transition-colors duration-300">
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
              style={{
                '--progress-color': 'var(--gradient-xp)',
                '--progress-bg': 'rgba(255, 255, 255, 0.15)'
              } as React.CSSProperties}
            />
          </div>
        )}
      </Card>
      </motion.div>

      {/* Recent Activity Timeline */}
      <RecentActivity itemVariants={itemVariants} />

      {/* Social Proof Elements */}
      <SocialProof itemVariants={itemVariants} userData={userData} />

      {/* Personalization Touches */}
      <PersonalizationTouches itemVariants={itemVariants} userData={userData} />

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
}