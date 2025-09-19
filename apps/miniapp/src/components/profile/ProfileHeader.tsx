import React from 'react'
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

  const handleSettingsClick = () => {
    // Haptic feedback
    if (telegramApi.isAvailable()) {
      telegramApi.getWebApp()?.HapticFeedback?.impactOccurred('light')
    }
    
    // Navigate to settings page
    navigate({ to: '/settings' })
  }

  return (
    <motion.div variants={itemVariants}>
      <Card className={`p-6 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl relative ${styles.profileCard}`}>
        {/* Settings Icon */}
        <motion.button 
          onClick={handleSettingsClick}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4 h-4 text-white" />
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
                <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                  <AtSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-blue-200" />
                  <Typography variant="body-sm" className="text-white font-medium">
                    {username}
                  </Typography>
                </div>
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
    </motion.div>
  )
}