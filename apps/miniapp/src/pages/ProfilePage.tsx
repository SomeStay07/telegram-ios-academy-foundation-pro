import React, { useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAtom } from 'jotai'
import { getUserData, initializeTelegramWebApp, setTelegramMainButton } from '../lib/telegram'
import { getRankByXP, getNextRank, getRankProgress, getXPToNextRank } from '../lib/rankSystem'
import { userDataAtom } from '../store/profileAtoms'
import { useHaptics } from '../lib/haptics'
import { AchievementNotification, useAchievement } from '../components/AchievementNotification'
import { DraggableStats } from '../components/DraggableStats'

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
      {/* Combined Hero & Progress Section */}
      <motion.div 
        className="hero-section-combined"
        variants={itemVariants}
      >
        <div className={`hero-bg rank-${currentRank.id}`} />
        <motion.div 
          className="hero-card-premium glass-card mx-4 my-6 p-6 bg-white/3 border-white/8"
          whileHover={{ 
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            scale: 1.005,
            y: -2
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          onTap={() => haptics.cardTap()}
          role="button"
          aria-label="View profile details"
          tabIndex={0}
        >
          {/* Profile Header with Avatar & Info */}
          <div className="profile-header-premium">
            <motion.div 
              className="avatar-wrapper-enhanced"
              whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER_LARGE }}
              whileTap={{ scale: 0.95 }}
              onTap={() => haptics.cardTap()}
              role="button"
              aria-label="View avatar"
              tabIndex={0}
            >
              {/* Enhanced Avatar or Beautiful Icon */}
              <motion.div 
                className="avatar-container-enhanced"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: ANIMATION_CONSTANTS.DELAYS.AVATAR, type: "spring", stiffness: ANIMATION_CONSTANTS.SPRING.STIFF }}
              >
                {userData.avatar && userData.avatar !== 'https://avatars.githubusercontent.com/u/12345678?v=4' ? (
                  <motion.img 
                    src={userData.avatar} 
                    alt={`${userData.firstName} ${userData.lastName}`}
                    className="avatar-xl-enhanced"
                  />
                ) : (
                  /* Elegant Grey Developer Icon */
                  <motion.div 
                    className="avatar-icon-grey"
                    whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Subtle pattern background */}
                    <motion.div 
                      className="avatar-pattern"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    
                    {/* Clean developer icon in corner */}
                    <motion.div 
                      className="dev-icon-corner"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      💻
                    </motion.div>
                    
                    {/* Minimalist code lines */}
                    <motion.div 
                      className="code-lines"
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: [0.6, 0.8, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="code-line line-1" />
                      <div className="code-line line-2" />
                      <div className="code-line line-3" />
                    </motion.div>
                  </motion.div>
                )}
                
                {/* Animated ring around avatar - only for real photos */}
                {userData.avatar && userData.avatar !== 'https://avatars.githubusercontent.com/u/12345678?v=4' && (
                  <motion.div 
                    className="avatar-ring"
                    style={{ background: `conic-gradient(from 0deg, ${currentRank.gradient}, transparent)` }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.div>
              
              {/* Enhanced level badge inside avatar */}
              <motion.div 
                className="level-badge-inside" 
                style={{ background: currentRank.gradient }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: ANIMATION_CONSTANTS.DELAYS.LEVEL_BADGE, type: "spring", stiffness: ANIMATION_CONSTANTS.SPRING.STIFF }}
                whileHover={{ scale: 1.2, rotate: 12, y: -1 }}
                whileTap={{ scale: 0.85 }}
                onTap={() => {
                  haptics.impact('heavy')
                  achievement.trigger(
                    `Level ${Math.floor(userData.totalXP / 1000)} Unlocked! ⚡`,
                    `Dominating with ${userData.totalXP.toLocaleString()} XP`,
                    '⚡'
                  )
                }}
              >
                <motion.span 
                  className="level-number-inside"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {Math.floor(userData.totalXP / 1000)}
                </motion.span>
                
                {/* Sparkling particles */}
                <motion.div 
                  className="level-sparkle level-sparkle-1"
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: ANIMATION_CONSTANTS.DURATIONS.SPARKLE, repeat: Infinity, delay: ANIMATION_CONSTANTS.DELAYS.SPARKLE_1 }}
                >
                  ✨
                </motion.div>
                <motion.div 
                  className="level-sparkle level-sparkle-2"
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, -180, -360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: ANIMATION_CONSTANTS.DURATIONS.SPARKLE, repeat: Infinity, delay: ANIMATION_CONSTANTS.DELAYS.SPARKLE_2 }}
                >
                  ✨
                </motion.div>
                <motion.div 
                  className="level-sparkle level-sparkle-3"
                  animate={{ 
                    scale: [0, 1, 0],
                    rotate: [0, 90, 180],
                    opacity: [0, 1, 0]
                  }}
                  transition={{ duration: ANIMATION_CONSTANTS.DURATIONS.SPARKLE, repeat: Infinity, delay: ANIMATION_CONSTANTS.DELAYS.SPARKLE_3 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </motion.div>
            
            <div className="profile-info-full">
              {/* Profile Name Section */}
              <div className="name-section-proper">
                {/* Simple Clean Name */}
                <motion.h1 
                  className="profile-name-clean"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ANIMATION_CONSTANTS.DELAYS.NAME }}
                >
                  <span className="name-text">{userData.firstName}</span>
                  {userData.lastName && (
                    <span className="name-text"> {userData.lastName}</span>
                  )}
                </motion.h1>
                
                {/* Username + Senior Engineer Unified Section */}
                <motion.div 
                  className="unified-badges-section"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    boxShadow: [
                      "0 6px 20px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(59, 130, 246, 0.1)",
                      "0 8px 24px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(59, 130, 246, 0.15)",
                      "0 6px 20px rgba(0, 0, 0, 0.25), 0 2px 8px rgba(59, 130, 246, 0.1)"
                    ]
                  }}
                  transition={{ 
                    delay: 0.5, 
                    type: "spring", 
                    stiffness: 200,
                    boxShadow: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    scale: 1.02,
                    y: -2
                  }}
                >
                  {/* Username Badge */}
                  <motion.div 
                    className="username-badge-unified"
                    initial={{ opacity: 0, x: -20, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: ANIMATION_CONSTANTS.DELAYS.USERNAME, type: "spring", stiffness: ANIMATION_CONSTANTS.SPRING.STIFF }}
                    whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER, y: ANIMATION_CONSTANTS.TRANSFORM.Y_HOVER }}
                    whileTap={{ scale: ANIMATION_CONSTANTS.SCALE.TAP }}
                    onTap={() => {
                      haptics.buttonPress()
                      achievement.trigger(
                        'Profile ID! 👤',
                        `Username: @${userData.username}`,
                        '🏷️'
                      )
                    }}
                    role="button"
                    aria-label={`Username @${userData.username}`}
                    tabIndex={0}
                  >
                    <motion.span 
                      className="username-symbol-unified"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      @
                    </motion.span>
                    <span className="username-text-unified">{userData.username}</span>
                    
                    {/* Username badge glow */}
                    <motion.div 
                      className="username-glow-unified"
                      animate={{ 
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </motion.div>

                  {/* Senior Engineer Badge */}
                  <motion.div 
                    className="senior-engineer-badge-unified"
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: ANIMATION_CONSTANTS.DELAYS.SENIOR, type: "spring", stiffness: ANIMATION_CONSTANTS.SPRING.STIFF }}
                    whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER, y: ANIMATION_CONSTANTS.TRANSFORM.Y_HOVER }}
                    whileTap={{ scale: ANIMATION_CONSTANTS.SCALE.TAP }}
                    onTap={() => {
                      haptics.selection()
                      achievement.trigger(
                        `${currentRank.name} Level! ${currentRank.icon}`,
                        `Elite developer with ${userData.totalXP.toLocaleString()} XP mastered`,
                        currentRank.icon
                      )
                    }}
                    role="button"
                    aria-label={`Rank: ${currentRank.name}`}
                    tabIndex={0}
                  >
                    <motion.div 
                      className="senior-badge-content"
                      whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.span 
                        className="senior-badge-icon"
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {currentRank.icon}
                      </motion.span>
                      <span className="senior-badge-text">{currentRank.name}</span>
                    </motion.div>
                    
                    {/* Professional glow effect */}
                    <motion.div 
                      className="rank-glow-effect"
                      animate={{ 
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Enhanced XP Progress Section */}
          <motion.div 
            className="xp-progress-enhanced"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ANIMATION_CONSTANTS.DELAYS.XP_SECTION }}
          >
            {/* XP Stats Cards */}
            <div className="xp-stats-grid">
              {/* Current XP Card */}
              <motion.div 
                className="xp-card-main"
                initial={{ opacity: 0, scale: 0.9, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: ANIMATION_CONSTANTS.DELAYS.XP_MAIN, type: "spring", stiffness: ANIMATION_CONSTANTS.SPRING.STIFF }}
                whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER, y: ANIMATION_CONSTANTS.TRANSFORM.Y_HOVER_LARGE }}
                onTap={() => {
                  haptics.cardTap()
                  achievement.trigger(
                    'XP Master! 💫',
                    `${userData.totalXP.toLocaleString()} experience points achieved`,
                    '⚡'
                  )
                }}
              >
                <motion.div 
                  className="xp-icon-container"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="xp-lightning">💫</span>
                </motion.div>
                <div className="xp-main-content">
                  <motion.span 
                    className="xp-value-enhanced"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ANIMATION_CONSTANTS.DELAYS.PROGRESS }}
                  >
                    {userData.totalXP.toLocaleString()}
                  </motion.span>
                  <span className="xp-label-enhanced">Experience Points</span>
                </div>
              </motion.div>

              {/* Next Rank Card */}
              <motion.div 
                className="xp-card-next"
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER, y: ANIMATION_CONSTANTS.TRANSFORM.Y_HOVER_LARGE }}
                onTap={() => {
                  haptics.selection()
                  if (!isMaxRank) {
                    achievement.trigger(
                      `Next: ${nextRank.name} ${nextRank.icon}`,
                      `${xpToNext.toLocaleString()} XP remaining to advance`,
                      nextRank.icon
                    )
                  }
                }}
              >
                <motion.div 
                  className="next-rank-icon"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  {!isMaxRank ? nextRank.icon : '👑'}
                </motion.div>
                <div className="next-rank-content">
                  {!isMaxRank ? (
                    <>
                      <span className="next-rank-xp">{xpToNext.toLocaleString()}</span>
                      <span className="next-rank-label">to {nextRank.name}</span>
                    </>
                  ) : (
                    <>
                      <span className="max-rank-text">Max Level</span>
                      <span className="max-rank-label">Elite Status</span>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Dynamic Progress Bar */}
            <motion.div 
              className="progress-container-enhanced"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ANIMATION_CONSTANTS.DELAYS.PROGRESS }}
              whileHover={{ scale: 1.005 }}
              role="progressbar"
              aria-valuenow={Math.round(progressPercentage)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Progress to ${isMaxRank ? 'maximum rank' : nextRank.name}: ${Math.round(progressPercentage)}%`}
            >
              <div className={`progress-bar-dynamic rank-${currentRank.id} ${progressPercentage > 80 ? 'near-complete' : ''} ${isMaxRank ? 'max-rank' : ''}`}>
                {/* Segment markers for visual breaks */}
                <div className="progress-segments">
                  {[25, 50, 75].map((segment, index) => (
                    <motion.div
                      key={segment}
                      className="segment-marker"
                      style={{ left: `${segment}%` }}
                      animate={{
                        opacity: progressPercentage > segment ? [0.3, 0.8, 0.3] : 0.2,
                        scale: progressPercentage > segment ? [1, 1.2, 1] : 1
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: progressPercentage > segment ? Infinity : 0,
                        delay: index * 0.2 
                      }}
                    />
                  ))}
                </div>

                {/* Background particles for high-level users */}
                {currentRank.id >= 3 && (
                  <motion.div 
                    className="progress-particles"
                    animate={{ 
                      background: [
                        `radial-gradient(circle at 20% 50%, ${currentRank.gradient.split(',')[0]} 0%, transparent 50%)`,
                        `radial-gradient(circle at 80% 50%, ${currentRank.gradient.split(',')[1] || currentRank.gradient.split(',')[0]} 0%, transparent 50%)`,
                        `radial-gradient(circle at 20% 50%, ${currentRank.gradient.split(',')[0]} 0%, transparent 50%)`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                {/* Charging effect for high levels */}
                {currentRank.id >= 2 && progressPercentage > 60 && (
                  <motion.div 
                    className="progress-energy"
                    animate={{
                      opacity: [0.2, 0.6, 0.2],
                      transform: ['translateX(-100%)', 'translateX(400%)', 'translateX(-100%)']
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  />
                )}
                
                <motion.div 
                  className="progress-fill-dynamic" 
                  style={{ background: currentRank.gradient }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${progressPercentage}%`,
                    boxShadow: progressPercentage > 50 ? [
                      `0 0 20px ${currentRank.gradient.includes('rgb') ? currentRank.gradient.match(/rgb\([^)]+\)/)?.[0] : 'rgba(59, 130, 246, 0.4)'}`,
                      `0 0 40px ${currentRank.gradient.includes('rgb') ? currentRank.gradient.match(/rgb\([^)]+\)/)?.[0] : 'rgba(59, 130, 246, 0.6)'}`,
                      `0 0 20px ${currentRank.gradient.includes('rgb') ? currentRank.gradient.match(/rgb\([^)]+\)/)?.[0] : 'rgba(59, 130, 246, 0.4)'}`
                    ] : undefined
                  }}
                  transition={{ 
                    delay: 1.2, 
                    duration: 1.8, 
                    ease: "easeOut",
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  onAnimationComplete={() => haptics.levelUp()}
                />
                
                {/* Dynamic glow effect */}
                <motion.div 
                  className="progress-glow-dynamic"
                  style={{ background: currentRank.gradient }}
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ 
                    width: `${progressPercentage}%`, 
                    opacity: progressPercentage > 30 ? 0.8 : 0.4,
                    filter: `blur(${Math.min(progressPercentage / 10, 6)}px)`
                  }}
                  transition={{ delay: 1.4, duration: 1.5, ease: "easeOut" }}
                />
                
                {/* Overflow effect for nearly complete progress */}
                {progressPercentage > 85 && (
                  <motion.div 
                    className="progress-overflow"
                    style={{ background: currentRank.gradient }}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                
                {/* Progress Percentage Badge with Animated Elements */}
                <motion.div 
                  className="progress-percentage-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    textShadow: [
                      "0 1px 2px rgba(0, 0, 0, 0.5)",
                      "0 2px 8px rgba(255, 255, 255, 0.3)",
                      "0 1px 2px rgba(0, 0, 0, 0.5)"
                    ]
                  }}
                  transition={{ 
                    delay: 1.6,
                    textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    textShadow: "0 0 15px rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  style={{ left: `${Math.min(progressPercentage, 95)}%` }}
                >
                  {Math.round(progressPercentage)}%
                  
                  {/* Animated Sparkles around percentage */}
                  <motion.div
                    className="absolute -top-3 -left-2 text-xs"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute -top-2 -right-2 text-xs"
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, -180, -360],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: 0.7
                    }}
                  >
                    ⭐
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-xs"
                    animate={{
                      scale: [0, 1, 0],
                      y: [0, -3, 0],
                      opacity: [0, 1, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 1.2
                    }}
                  >
                    💫
                  </motion.div>
                  
                  {/* Floating dots */}
                  <motion.div
                    className="absolute -left-4 top-1/2 w-1 h-1 bg-white/60 rounded-full"
                    animate={{
                      x: [0, -8, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className="absolute -right-4 top-1/2 w-1 h-1 bg-white/60 rounded-full"
                    animate={{
                      x: [0, 8, 0],
                      opacity: [0.3, 1, 0.3],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1.5,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* XP Range Indicators */}
              <motion.div 
                className="flex justify-between items-center mt-3 px-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ANIMATION_CONSTANTS.DELAYS.XP_RANGE }}
              >
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER_LARGE }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-2 h-2 rounded-full bg-white/30"></div>
                  <span className="text-xs text-white/60 font-medium">
                    {currentRank.minXP.toLocaleString()} XP
                  </span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-2"
                  whileHover={{ scale: ANIMATION_CONSTANTS.SCALE.HOVER_LARGE }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs text-white/80 font-semibold">
                    {!isMaxRank ? nextRank.minXP.toLocaleString() : userData.totalXP.toLocaleString()} XP
                  </span>
                  <div className="w-2 h-2 rounded-full" style={{ background: currentRank.gradient }}></div>
                </motion.div>
              </motion.div>
            </motion.div>
            
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Elegant Divider */}
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
        className="px-4 py-2"
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


      {/* Quick Actions - Tailwind Hybrid */}
      <motion.div 
        className="px-4 pb-10 grid grid-cols-1 gap-3"
        variants={itemVariants}
      >
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
            className="text-2xl w-8 text-center"
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            🚀
          </motion.div>
          <div className="text-base font-semibold text-white flex-1">Start Challenge</div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-2 gap-3"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
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
              className="text-xl w-6 text-center"
              whileHover={{ scale: 1.2, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              ⚔️
            </motion.div>
            <div className="text-sm font-semibold text-white flex-1">Battle</div>
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
              className="text-xl w-6 text-center"
              whileHover={{ scale: 1.2, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              📊
            </motion.div>
            <div className="text-sm font-semibold text-white flex-1">Leaderboard</div>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Achievement Notifications */}
      <AchievementNotification />
    </motion.div>
  )
}