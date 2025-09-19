import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { userDataAtom } from '../store/profileAtoms'
import { useTelegramUser, getAvatarUrl, getFullName } from '../hooks/useTelegramUser'
import { getRankByXP, getNextRank, getRankProgress } from '../lib/rankSystem'

// Profile Components
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileStats } from '../components/profile/ProfileStats'
import { ProfileAchievements } from '../components/profile/ProfileAchievements'
import { ProfileActivity } from '../components/profile/ProfileActivity'

export function ProfilePage() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const telegramUser = useTelegramUser()

  // Update user data with Telegram information
  useEffect(() => {
    if (telegramUser.isAvailable && telegramUser.id > 0) {
      setUserData(prevData => ({
        ...prevData,
        id: telegramUser.id,
        firstName: telegramUser.firstName || 'Разработчик',
        lastName: telegramUser.lastName || '',
        username: telegramUser.username || '',
        avatar: getAvatarUrl(telegramUser)
      }))
    }
  }, [telegramUser.isAvailable, telegramUser.id, telegramUser.firstName, telegramUser.lastName, telegramUser.username, setUserData])

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

  // Get user display name (memoized)
  const displayName = useMemo(() => {
    return getFullName(telegramUser) || `${userData.firstName} ${userData.lastName}`.trim() || 'Разработчик'
  }, [telegramUser.firstName, telegramUser.lastName, userData.firstName, userData.lastName])
  
  const username = useMemo(() => {
    return telegramUser.username || userData.username
  }, [telegramUser.username, userData.username])

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