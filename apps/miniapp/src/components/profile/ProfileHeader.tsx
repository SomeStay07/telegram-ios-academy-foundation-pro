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
        <Card className={`p-6 mb-6 text-white border-0 shadow-xl relative ${styles.profileCard}`}>
          {/* Level Up Celebration Effects */}
          <LevelUpCelebration isMaxRank={isMaxRank} currentRank={currentRank} />
          
          {/* Ultra Interactive Settings Button */}
          <motion.button 
            onClick={handleSettingsClick}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-300 group z-50"
            whileHover={{ 
              scale: 1.15, 
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              rotate: 180,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
            whileTap={{ 
              scale: 0.85,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              rotate: 270
            }}
            initial={{ rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20
            }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ 
                scale: 1.5, 
                opacity: 1,
                transition: { duration: 0.3 }
              }}
            />
            
            {/* Rotating border effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/40 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <Settings className="w-5 h-5 text-white group-hover:text-blue-100 transition-colors duration-300 relative z-10" />
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
            <Typography variant="display-md" className={`${styles.profileName} text-white font-bold`}>
              {displayName}
            </Typography>
            
            {username && (
              <div className={styles.profileUsername}>
                <motion.button
                  onClick={handleUsernameClick}
                  className="relative flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 group cursor-pointer transition-all duration-300 hover:bg-white/30 hover:border-white/50 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-white/25"
                  whileHover={{ 
                    boxShadow: "0 0 20px rgba(255,255,255,0.3), 0 0 8px rgba(59, 130, 246, 0.2)",
                    scale: 1.06,
                    y: -2,
                    backgroundColor: "rgba(255, 255, 255, 0.25)"
                  }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0.95 }}
                  animate={{ 
                    opacity: [0.95, 1, 0.95],
                    borderColor: [
                      "rgba(255,255,255,0.2)",
                      "rgba(255,255,255,0.35)", 
                      "rgba(255,255,255,0.2)"
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    borderColor: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatDelay: 3,
                      ease: "easeInOut"
                    }}
                  >
                    <AtSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-blue-200 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                  <Typography variant="body-sm" className="text-white font-medium group-hover:text-blue-100 transition-colors duration-300">
                    {username}
                  </Typography>
                  
                  {/* Subtle shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{
                      x: '100%',
                      transition: { duration: 0.6, ease: "easeInOut" }
                    }}
                    style={{ borderRadius: 'inherit' }}
                  />
                </motion.button>
              </div>
            )}

            {/* Adaptive Level & XP Pills */}
            <div className={styles.profileBadges}>
              <div className={styles.adaptiveBadge}>
                <Trophy className={styles.adaptiveBadgeIcon} />
                <span className="text-white font-semibold">
                  {currentRank.name}
                </span>
              </div>
              <div className={styles.adaptiveBadge}>
                <Zap className={styles.adaptiveBadgeIcon} />
                <span className="text-white font-semibold">
                  {userData.totalXP >= 1000 ? `${Math.floor(userData.totalXP / 1000)}K` : userData.totalXP}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Progress Bar */}
        {!isMaxRank && nextRank && (
          <div className={styles.profileProgress}>
            <div className="flex justify-between text-white/80 text-sm mb-2">
              <span>До {nextRank.name}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress 
              value={progressPercentage} 
              className="bg-white/20" 
              style={{
                '--progress-color': 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
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