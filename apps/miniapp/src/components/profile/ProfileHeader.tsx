import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, AtSign, Trophy, Zap } from 'lucide-react'
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

interface ProfileHeaderProps {
  userData: {
    avatar: string
    totalXP: number
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
    if (telegramApi.isAvailable()) {
      const webApp = telegramApi.getWebApp()
      // Double haptic feedback for better UX
      webApp?.HapticFeedback?.impactOccurred('medium')
      setTimeout(() => {
        webApp?.HapticFeedback?.selectionChanged()
      }, 100)
    }
    
    // Smooth navigation to settings page
    navigate({ to: '/settings' })
  }

  const handleUsernameClick = () => {
    console.log('🎯 Username clicked!', username)
    // Haptic feedback for username click
    if (telegramApi.isAvailable()) {
      telegramApi.hapticFeedback.impactOccurred('light')
    }
    setIsUsernameModalOpen(true)
    console.log('📋 Modal state:', isUsernameModalOpen)
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className={`p-6 mb-6 text-white border-0 shadow-xl relative ${styles.profileCard}`}>
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
                  className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20 group cursor-pointer transition-all duration-300 hover:bg-white/25 hover:border-white/40 hover:scale-105 active:scale-95"
                  whileHover={{ 
                    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
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
                <Typography variant="body-md" className="text-white font-semibold">
                  {currentRank.name}
                </Typography>
              </div>
              <div className={styles.adaptiveBadge}>
                <Zap className={styles.adaptiveBadgeIcon} />
                <Typography variant="body-md" className="text-white font-semibold">
                  {userData.totalXP >= 1000 ? `${Math.floor(userData.totalXP / 1000)}K` : userData.totalXP}
                </Typography>
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
              style={{'--progress-color': '#ffffff'} as React.CSSProperties}
            />
          </div>
        )}
      </Card>

      {/* Username Modal */}
      {username && (
        <UsernameModal
          isOpen={isUsernameModalOpen}
          onClose={() => setIsUsernameModalOpen(false)}
          username={username}
          displayName={displayName}
        />
      )}
    </motion.div>
  )
}