import React, { useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { getUserData, initializeTelegramWebApp, setTelegramMainButton } from '../lib/telegram'
import { getRankByXP, getNextRank, getRankProgress, getXPToNextRank } from '../lib/rankSystem'
import { userDataAtom } from '../store/profileAtoms'
import { useHaptics } from '../lib/haptics'
import { useTelegramUser, getAvatarUrl, getFullName, getDisplayUsername } from '../hooks/useTelegramUser'
import { AchievementNotification, useAchievement } from '../components/AchievementNotification'
import { DraggableStats } from '../components/DraggableStats'
import { ProfileHero } from '../components/profile/ProfileHero'

// Animation constants for performance and maintainability
const ANIMATION_CONSTANTS = {
  DELAYS: {
    AVATAR: 0.2,
    NAME: 0.3,
    LEVEL_BADGE: 0.4,
    BADGES_SECTION: 0.5,
    USERNAME: 0.6,
    SENIOR: 0.7,
    XP_SECTION: 0.8,
    XP_MAIN: 0.9,
    XP_NEXT: 1.0,
    PROGRESS: 1.1,
    XP_RANGE: 1.8,
    SPARKLE_1: 0,
    SPARKLE_2: 0.7,
    SPARKLE_3: 1.4,
  },
  DURATIONS: {
    ENTRANCE: 0.5,
    CONTAINER: 0.6,
    SPARKLE: 2,
    AVATAR_RING: 8,
    AVATAR_PATTERN: 20,
    GLOW_CYCLE: 3,
    BOX_SHADOW_CYCLE: 4,
    RANK_GLOW: 4,
  },
  SPRING: {
    STIFF: 200,
    MODERATE: 300,
    VERY_STIFF: 400,
    DAMPING: 25,
  },
  OPACITY: {
    GLOW_MIN: 0.2,
    GLOW_MAX: 0.4,
    RANK_GLOW_MIN: 0.3,
    RANK_GLOW_MAX: 0.6,
  },
  SCALE: {
    HOVER: 1.02,
    HOVER_LARGE: 1.05,
    HOVER_ICON: 1.15,
    TAP: 0.98,
    INITIAL: 0.8,
    FINAL: 1,
    GLOW: 1.05,
  },
  TRANSFORM: {
    Y_OFFSET: 20,
    Y_HOVER: -1,
    Y_HOVER_LARGE: -2,
    X_OFFSET: -20,
    ROTATE: 5,
    ROTATE_ICON: 10,
  }
} as const

// UI Constants
const UI_CONSTANTS = {
  XP_LEVEL_DIVISOR: 1000,
  STAGGER_CHILDREN: 0.1,
} as const

// Telegram WebApp type definitions for type safety
interface TelegramWebApp {
  initData?: string
  colorScheme?: 'light' | 'dark'
  themeParams?: Record<string, string>
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export function ProfilePage() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const telegramUser = useTelegramUser()
  const haptics = useHaptics()
  const achievement = useAchievement()

  // Memoized rank calculations for performance
  const rankData = useMemo(() => {
    const currentRank = getRankByXP(userData.totalXP)
    const nextRank = getNextRank(userData.totalXP)
    const rankProgress = getRankProgress(userData.totalXP)
    const xpToNext = getXPToNextRank(userData.totalXP)
    const isMaxRank = !nextRank
    const progressPercentage = rankProgress * 100

    return {
      currentRank,
      nextRank,
      rankProgress,
      xpToNext,
      isMaxRank,
      progressPercentage
    }
  }, [userData.totalXP])

  // Update user data with Telegram information
  useEffect(() => {
    console.log('🔍 ProfilePage useEffect triggered:', {
      telegramUser: {
        isAvailable: telegramUser.isAvailable,
        firstName: telegramUser.firstName,
        lastName: telegramUser.lastName,
        username: telegramUser.username
      }
    })
    
    if (telegramUser.isAvailable) {
      const newUserData = {
        ...userData,
        id: telegramUser.id,
        firstName: telegramUser.firstName,
        lastName: telegramUser.lastName,
        username: telegramUser.username,
        avatar: getAvatarUrl(telegramUser)
      }
      
      console.log('🔄 Updating profile data:', {
        before: { firstName: userData.firstName, lastName: userData.lastName, username: userData.username },
        after: { firstName: newUserData.firstName, lastName: newUserData.lastName, username: newUserData.username }
      })
      
      setUserData(newUserData)
      
      console.log('🔄 Updated profile with Telegram data:', {
        name: getFullName(telegramUser),
        username: getDisplayUsername(telegramUser),
        isPremium: telegramUser.isPremium
      })
    } else {
      console.log('⚠️ Telegram user not available, using mock data')
    }
  }, [telegramUser, setUserData])

  const { currentRank, nextRank, isMaxRank, progressPercentage, xpToNext } = rankData

  // Type-safe Telegram WebApp check
  const isTelegramWebApp = useMemo(() => {
    return Boolean(window?.Telegram?.WebApp?.initData)
  }, [])

  // Memoized event handlers
  const handleLevelBadgeClick = useCallback(() => {
    haptics.impact('heavy')
    achievement.trigger(
      `Level ${Math.floor(userData.totalXP / UI_CONSTANTS.XP_LEVEL_DIVISOR)} Unlocked! ⚡`,
      `Dominating with ${userData.totalXP.toLocaleString()} XP`,
      '⚡'
    )
  }, [haptics, achievement, userData.totalXP])

  const handleUsernameClick = useCallback(() => {
    haptics.buttonPress()
    achievement.trigger(
      'Profile ID! 👤',
      `Username: @${userData.username}`,
      '🏷️'
    )
  }, [haptics, achievement, userData.username])

  const handleRankClick = useCallback(() => {
    haptics.selection()
    achievement.trigger(
      `${currentRank.name} Level! ${currentRank.icon}`,
      `Elite developer with ${userData.totalXP.toLocaleString()} XP mastered`,
      currentRank.icon
    )
  }, [haptics, achievement, currentRank, userData.totalXP])

  useEffect(() => {
    const initialized = initializeTelegramWebApp()
    const user = getUserData()
    
    if (isTelegramWebApp && user) {
      // Use real Telegram data
      setUserData(prev => ({
        ...prev,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        avatar: user.avatar
      }))
    } else {
      // Use enhanced mock data for local development
      setUserData(prev => ({
        ...prev,
        firstName: 'Тимур',
        lastName: 'Цеберда',
        username: 'timurceberda',
        avatar: '' // Use default developer icon instead
      }))
    }

    if (initialized) {
      setTelegramMainButton({
        text: '🚀 Start Challenge',
        color: currentRank.color,
        textColor: '#FFFFFF',
        onClick: () => console.log('Starting challenge...')
      })
    }
  }, [currentRank.color, isTelegramWebApp, setUserData])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_CONSTANTS.DURATIONS.CONTAINER,
        staggerChildren: UI_CONSTANTS.STAGGER_CHILDREN
      }
    }
  }

  const itemVariants = {
    hidden: { y: ANIMATION_CONSTANTS.TRANSFORM.Y_OFFSET, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: ANIMATION_CONSTANTS.DURATIONS.ENTRANCE,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div 
      className="modern-profile"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ProfileHero 
        userData={userData}
        currentRank={currentRank}
        nextRank={nextRank}
        progressPercentage={progressPercentage}
        isMaxRank={isMaxRank}
        animationConstants={ANIMATION_CONSTANTS}
      />


      {/* Elegant Divider Section */}
      <motion.div 
        className="px-4 py-2"
        variants={itemVariants}
      >
        <motion.div 
          className="elegant-divider"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* Comprehensive Stats Section */}
      <motion.div 
        className="draggable-stats-container"
        variants={itemVariants}
      >
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm text-white/70 font-medium mb-2">
            📊 Performance Stats
          </h3>
          <p className="text-xs text-white/50">Drag to reorder • Tap for details</p>
        </motion.div>
        <DraggableStats initialStats={[
          { id: 'streak', icon: '🔥', label: 'Day Streak', value: userData.streak, gradient: true },
          { id: 'rank', icon: '🏅', label: 'Global Rank', value: `#${userData.globalRank.toLocaleString()}` },
          { id: 'challenges', icon: '🎯', label: 'Challenges', value: userData.challengesCompleted },
          { id: 'battles', icon: '🥊', label: 'Battles Won', value: userData.battlesWon },
          { id: 'achievements', icon: '🌟', label: 'Achievements', value: userData.achievements },
          { id: 'weekly', icon: '📅', label: 'Weekly XP', value: userData.weeklyXP.toLocaleString() }
        ]} />
      </motion.div>


      {/* Quick Actions - Responsive */}
      <motion.div 
        className="actions-section-responsive"
        variants={itemVariants}
      >
        <div className="actions-grid">
          <motion.div 
            className="action-card-primary"
            whileHover={{ 
              scale: 1.02, 
              y: -2,
              boxShadow: "0 12px 40px rgba(0, 122, 255, 0.4)"
            }}
            whileTap={{ scale: ANIMATION_CONSTANTS.SCALE.TAP }}
            onTap={() => {
              haptics.buttonPress()
              achievement.trigger(
                'Challenge Started! 🚀',
                'Good luck with your coding challenge!',
                '🎯'
              )
              console.log('Starting challenge...')
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div 
              className="action-icon-responsive"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              🚀
            </motion.div>
            <div className="action-text-responsive">Start Challenge</div>
          </motion.div>
          
          <div className="secondary-actions-row">
            <motion.div 
              className="action-card-secondary"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
              whileTap={{ scale: 0.95 }}
              onTap={() => {
                haptics.buttonPress()
                achievement.trigger(
                  'Battle Mode! ⚔️',
                  'May the code be with you!',
                  '⚔️'
                )
                console.log('Opening battle...')
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="action-icon-responsive"
                whileHover={{ scale: 1.2, rotate: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                ⚔️
              </motion.div>
              <div className="action-text-responsive">Battle</div>
            </motion.div>
            
            <motion.div 
              className="action-card-secondary"
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 }
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                backgroundColor: "rgba(255, 255, 255, 0.08)"
              }}
              whileTap={{ scale: 0.95 }}
              onTap={() => {
                haptics.buttonPress()
                console.log('Opening leaderboard...')
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="action-icon-responsive"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                📊
              </motion.div>
              <div className="action-text-responsive">Leaderboard</div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Debug Button - только для отладки */}
      <motion.div 
        className="fixed bottom-4 left-4 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          className="bg-red-500/80 text-white px-3 py-2 rounded-lg text-xs font-mono"
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const debugInfo = {
              hasTelegram: !!window.Telegram,
              hasWebApp: !!window.Telegram?.WebApp,
              hasInitData: !!window.Telegram?.WebApp?.initData,
              hasUser: !!window.Telegram?.WebApp?.initDataUnsafe?.user,
              userAgent: navigator.userAgent.substring(0, 60),
              telegramUserData: telegramUser
            }
            alert('🔍 Debug Info:\n' + JSON.stringify(debugInfo, null, 2))
          }}
        >
          DEBUG
        </motion.button>
      </motion.div>

      {/* Achievement Notifications */}
      <AchievementNotification />
    </motion.div>
  )
}