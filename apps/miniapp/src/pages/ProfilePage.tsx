import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { userDataAtom } from '../store/profileAtoms'
import { useTelegramUser, getAvatarUrl, getFullName } from '../hooks/useTelegramUser'
import { useAuthVerification } from '../hooks/useApi'
import { getRankByXP, getNextRank, getRankProgress } from '../lib/rankSystem'

// Profile Components
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileStats } from '../components/profile/ProfileStats'
import { ProfileAchievements } from '../components/profile/ProfileAchievements'
import { ProfileActivity } from '../components/profile/ProfileActivity'

export function ProfilePage() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const telegramUser = useTelegramUser()
  const { data: authData, isSuccess: isAuthSuccess } = useAuthVerification()

  // Update user data with authenticated Telegram information
  useEffect(() => {
    console.log('📊 ProfilePage useEffect Debug:', {
      isAuthSuccess,
      authData: authData?.user,
      telegramUser,
      'telegramUser.isAvailable': telegramUser.isAvailable,
      'telegramUser.id': telegramUser.id
    });

    // Prioritize validated backend auth data
    if (isAuthSuccess && authData?.user) {
      const backendUser = authData.user
      console.log('✅ Using BACKEND auth data for profile:', backendUser);
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
      console.log('✅ Using FRONTEND Telegram data for profile:', telegramUser);
      setUserData(prevData => ({
        ...prevData,
        id: telegramUser.id,
        firstName: telegramUser.firstName || 'User',
        lastName: telegramUser.lastName || '',
        username: telegramUser.username || '',
        avatar: getAvatarUrl(telegramUser)
      }))
    } else {
      console.log('⚠️ No valid user data available - using defaults');
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

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Profile Header */}
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

        {/* Quick Stats Pills */}
        <ProfileStats
          userData={userData}
          itemVariants={itemVariants}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Achievements */}
          <ProfileAchievements itemVariants={itemVariants} />

          {/* Activity Overview */}
          <ProfileActivity itemVariants={itemVariants} />
        </div>
      </div>
    </motion.div>
  )
}