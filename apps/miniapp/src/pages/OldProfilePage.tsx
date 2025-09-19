import React, { useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { getUserData, initializeTelegramWebApp, setTelegramMainButton } from '../lib/telegram'
import { getRankByXP, getNextRank, getRankProgress, getXPToNextRank } from '../lib/rankSystem'
import { userDataAtom } from '../store/profileAtoms'
import { useHaptics } from '../lib/haptics'
import { useTelegramUser, getAvatarUrl, getFullName, getDisplayUsername } from '../hooks/useTelegramUser'
import { AchievementNotification, useAchievement } from '../components/AchievementNotification'
import { ProfileHero } from '../components/profile/ProfileHero'
import { EnhancedStreak } from '../components/EnhancedStreak'
import { ActivitySection } from '../components/ActivitySection'

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
    if (telegramUser.isAvailable && telegramUser.id > 0) {
      const newUserData = {
        ...userData,
        id: telegramUser.id,
        firstName: telegramUser.firstName || '',
        lastName: telegramUser.lastName || '',
        username: telegramUser.username || '',
        avatar: getAvatarUrl(telegramUser)
      }
      
      setUserData(newUserData)
      
      console.log('✅ Profile updated with Telegram data:', {
        name: getFullName(telegramUser),
        username: telegramUser.username ? `@${telegramUser.username}` : 'No username',
        isPremium: telegramUser.isPremium,
        isRealTelegramData: telegramUser.isRealTelegramData,
        userId: telegramUser.id
      })
    }
  }, [telegramUser, setUserData, userData])

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

  // Telegram Main Button initialization
  useEffect(() => {
    if (telegramUser.isAvailable && telegramUser.id > 0) {
      setTelegramMainButton({
        text: '🚀 Start Challenge',
        color: currentRank.color,
        textColor: '#FFFFFF',
        onClick: () => console.log('Starting challenge for user:', telegramUser.firstName)
      })
    }
  }, [telegramUser, currentRank.color])

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
      {/* Секция 1 - Профиль */}
      <ProfileHero 
        userData={userData}
        currentRank={currentRank}
        nextRank={nextRank}
        progressPercentage={progressPercentage}
        isMaxRank={isMaxRank}
        animationConstants={ANIMATION_CONSTANTS}
      />

      {/* Секция 2 - Ежедневная Серия */}
      {(telegramUser.isAvailable || telegramUser.id > 0) && (
        <div className="enhanced-sections-container">
          <motion.div 
            className="enhanced-streak-section"
            variants={itemVariants}
          >
            <EnhancedStreak 
              currentStreak={userData.streak}
              maxStreak={30}
            />
          </motion.div>

          {/* Секция 3 - Активности и Навыки */}
          <motion.div 
            className="enhanced-activity-section"
            variants={itemVariants}
          >
            <ActivitySection />
          </motion.div>
        </div>
      )}
      

      {/* Achievement Notifications */}
      <AchievementNotification />
    </motion.div>
  )
}