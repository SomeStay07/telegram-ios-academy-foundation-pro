import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { userDataAtom } from '../store/profileAtoms'
import { getAvatarUrl, getFullName } from '../hooks/useTelegramUser'
import { useAuthVerification } from '../hooks/useApi'
import { getTelegramApi } from '../lib/telegram/api'
import { getRankByXP, getNextRank, getRankProgress } from '../lib/rankSystem'

// Performance: Caching hooks
import { usePersistedState } from '../hooks/usePersistedState'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useTelegramDataCache, useTelegramThemeCache } from '../hooks/useTelegramCache'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Telegram-specific animations
import { useTelegramAnimations } from '../lib/telegram/animations'
import { TelegramPageTransition, TelegramSectionTransition } from '../components/telegram/TelegramPageTransition'

// Profile Components
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileMetricsSection } from '../components/profile/ProfileMetricsSection'
import { RecommendedContent } from '../components/profile/RecommendedContent'
import { AboutAppSection } from '../components/profile/AboutAppSection'
import { ProfileAchievements } from '../components/profile/ProfileAchievements'
import { ProfileActivity } from '../components/profile/ProfileActivity'
// Debug import removed for production

export function ProfilePage() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const { data: authData, isSuccess: isAuthSuccess } = useAuthVerification()
  
  // Telegram-specific animations
  const { haptics, platform } = useTelegramAnimations()
  
  // Performance: Caching implementations
  const [profileSettings, setProfileSettings] = usePersistedState('profile-settings', {
    showAchievements: true,
    showActivity: true,
    compactMode: false
  })
  
  const [sessionData, setSessionData] = useSessionStorage('profile-session', {
    lastVisited: Date.now(),
    scrollPosition: 0
  })
  
  // Cached Telegram data
  const cachedTelegramUser = useTelegramDataCache()
  const cachedTheme = useTelegramThemeCache()
  
  // Get Telegram user data from API client instead of hook
  const telegramApi = getTelegramApi()
  const telegramUser = useMemo(() => {
    try {
      if (telegramApi.hasUser()) {
        const user = telegramApi.getUser()
        return {
          id: user.id,
          username: user.username,
          firstName: user.first_name,
          lastName: user.last_name,
          fullName: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.username || 'User',
          languageCode: user.language_code || 'en',
          avatarUrl: user.photo_url,
          isPremium: user.is_premium || false,
          isAvailable: true
        }
      }
      return {
        id: 0,
        username: undefined,
        firstName: undefined,
        lastName: undefined,
        fullName: 'User',
        languageCode: 'en',
        avatarUrl: undefined,
        isPremium: false,
        isAvailable: false
      }
    } catch (error) {
      // Failed to get Telegram user from API - fallback to default user
      return {
        id: 0,
        username: undefined,
        firstName: undefined,
        lastName: undefined,
        fullName: 'User',
        languageCode: 'en',
        avatarUrl: undefined,
        isPremium: false,
        isAvailable: false
      }
    }
  }, [telegramApi])

  // Update user data with authenticated Telegram information
  useEffect(() => {
    // Prioritize validated backend auth data
    if (isAuthSuccess && authData?.user) {
      const backendUser = authData.user
      setUserData(prevData => ({
        ...prevData,
        id: backendUser.id,
        firstName: backendUser.first_name || 'User',
        lastName: backendUser.last_name || '',
        username: backendUser.username || '',
        avatar: getAvatarUrl({
          id: backendUser.id,
          username: backendUser.username,
          firstName: backendUser.first_name,
          lastName: backendUser.last_name,
          fullName: `${backendUser.first_name || ''} ${backendUser.last_name || ''}`.trim(),
          languageCode: backendUser.language_code || 'en',
          avatarUrl: undefined, // Backend doesn't provide photo URL yet
          isPremium: backendUser.is_premium || false,
          isAvailable: true
        })
      }))
    } else if (telegramUser.isAvailable && telegramUser.id > 0) {
      // Fallback to frontend Telegram data
      setUserData(prevData => ({
        ...prevData,
        id: telegramUser.id,
        firstName: telegramUser.firstName || 'User',
        lastName: telegramUser.lastName || '',
        username: telegramUser.username || '',
        avatar: getAvatarUrl(telegramUser)
      }))
    }
  }, [isAuthSuccess, authData, telegramUser.isAvailable, telegramUser.id, telegramUser.firstName, telegramUser.lastName, telegramUser.username, setUserData])

  // Rank calculations
  const rankData = useMemo(() => {
    const currentRank = getRankByXP(userData.totalXP)
    const nextRank = getNextRank(userData.totalXP)
    const rankProgress = getRankProgress(userData.totalXP)
    const isMaxRank = !nextRank
    const progressPercentage = rankProgress * 100

    return {
      currentRank,
      nextRank,
      isMaxRank,
      progressPercentage
    }
  }, [userData.totalXP])

  const { currentRank, nextRank, isMaxRank, progressPercentage } = rankData

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }), [])

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), [])

  // Get user display name (memoized) - prioritize backend auth data
  const displayName = useMemo(() => {
    if (isAuthSuccess && authData?.user) {
      const { first_name, last_name, username } = authData.user
      return `${first_name || ''} ${last_name || ''}`.trim() || username || 'User'
    }
    if (telegramUser.isAvailable && telegramUser.id > 0) {
      return getFullName(telegramUser)
    }
    return `${userData.firstName} ${userData.lastName}`.trim() || 'User'
  }, [isAuthSuccess, authData, telegramUser.isAvailable, telegramUser.id, telegramUser.firstName, telegramUser.lastName, telegramUser.username, userData.firstName, userData.lastName])
  
  const username = useMemo(() => {
    if (isAuthSuccess && authData?.user?.username) {
      return authData.user.username
    }
    return telegramUser.username || userData.username
  }, [isAuthSuccess, authData, telegramUser.username, userData.username])

  // Performance: Update session data on page visit
  useEffect(() => {
    setSessionData(prev => ({
      ...prev,
      lastVisited: Date.now()
    }))
  }, [setSessionData])

  // Performance: Save scroll position on unmount
  useEffect(() => {
    const handleScroll = () => {
      setSessionData(prev => ({
        ...prev,
        scrollPosition: window.scrollY
      }))
    }

    const throttledScroll = (() => {
      let timeoutId: NodeJS.Timeout
      return () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(handleScroll, 100)
      }
    })()

    window.addEventListener('scroll', throttledScroll)
    return () => {
      window.removeEventListener('scroll', throttledScroll)
      handleScroll() // Save final position
    }
  }, [setSessionData])

  return (
    <TelegramPageTransition className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Profile Header - с Telegram анимацией */}
        <TelegramSectionTransition delay={0}>
          <ProfileHeader
            userData={userData}
            displayName={displayName}
            username={username}
            currentRank={currentRank}
            nextRank={nextRank}
            isMaxRank={isMaxRank}
            progressPercentage={progressPercentage}
            itemVariants={itemVariants}
          />
        </TelegramSectionTransition>

        {/* Metrics Section - с задержкой для stagger эффекта */}
        <TelegramSectionTransition delay={1}>
          <ProfileMetricsSection
            userData={userData}
            itemVariants={itemVariants}
          />
        </TelegramSectionTransition>

        {/* Recommended Content Section */}
        <TelegramSectionTransition delay={1.5}>
          <RecommendedContent itemVariants={itemVariants} />
        </TelegramSectionTransition>

        {/* Performance: Lazy loading for below-fold content */}
        <TelegramSectionTransition delay={2}>
          <LazyProfileSection
            profileSettings={profileSettings}
            itemVariants={itemVariants}
          />
        </TelegramSectionTransition>

        {/* About App Section - moved to bottom */}
        <TelegramSectionTransition delay={3}>
          <LazyAboutAppSection itemVariants={itemVariants} />
        </TelegramSectionTransition>
      </div>
      
      {/* Debug component removed for production */}
    </TelegramPageTransition>
  )
}

// Performance: Lazy loading components for below-fold content
const LazyProfileSection = React.memo(function LazyProfileSection({ 
  profileSettings, 
  itemVariants 
}: { 
  profileSettings: any
  itemVariants: any 
}) {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  })

  return (
    <div ref={ref}>
      {hasIntersected ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Recent Achievements */}
          {profileSettings.showAchievements && (
            <ProfileAchievements itemVariants={itemVariants} />
          )}

          {/* Activity Overview */}
          {profileSettings.showActivity && (
            <ProfileActivity itemVariants={itemVariants} />
          )}
        </div>
      ) : (
        // Skeleton loader while not intersected
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        </div>
      )}
    </div>
  )
})

const LazyAboutAppSection = React.memo(function LazyAboutAppSection({ 
  itemVariants 
}: { 
  itemVariants: any 
}) {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  })

  return (
    <div ref={ref}>
      {hasIntersected ? (
        <AboutAppSection itemVariants={itemVariants} />
      ) : (
        // Skeleton loader
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      )}
    </div>
  )
})