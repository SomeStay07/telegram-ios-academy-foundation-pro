/**
 * Profile Page with new Telegram Auth
 * 
 * Uses AuthProvider instead of direct Telegram API calls
 */

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAuth, useUser } from '../app/providers/AuthProvider'
import { getRankByXP, getNextRank, getRankProgress } from '../lib/rankSystem'

// Profile Components
import { ProfileHeader } from '../components/profile/ProfileHeader'
import { ProfileStats } from '../components/profile/ProfileStats'
import { ProfileAchievements } from '../components/profile/ProfileAchievements'
import { ProfileActivity } from '../components/profile/ProfileActivity'
import { TelegramDebugInfo } from '../components/debug/TelegramDebugInfo'

// Helper functions for avatar and display names
function getAvatarUrl(user: any): string {
  // Use Telegram photo URL if available
  if (user?.photo_url) {
    return user.photo_url
  }
  
  // Generate proper initials for fallback
  let initials = ''
  if (user?.first_name && user?.last_name) {
    initials = `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
  } else if (user?.first_name) {
    initials = user.first_name.charAt(0)
  } else if (user?.username) {
    initials = user.username.charAt(0).toUpperCase()
  } else {
    initials = 'U'
  }
  
  // Use DiceBear API for avatar generation
  return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=007AFF&textColor=ffffff&fontSize=36`
}

function getFullName(user: any): string {
  if (user?.first_name && user?.last_name) {
    return `${user.first_name} ${user.last_name}`
  } else if (user?.first_name) {
    return user.first_name
  } else if (user?.username) {
    return user.username
  }
  return 'User'
}

function getDisplayUsername(user: any): string {
  return user?.username ? `@${user.username}` : `User ${user?.id || ''}`
}

export function ProfilePageNew() {
  const { isAuthenticated, isLoading } = useAuth()
  const user = useUser()

  // Mock user data for now - in real app this would come from backend/store
  const userData = useMemo(() => ({
    id: user?.id || 0,
    firstName: user?.first_name || 'User',
    lastName: user?.last_name || '',
    username: user?.username || '',
    avatar: getAvatarUrl(user),
    totalXP: 1250,
    currentStreak: 7,
    longestStreak: 23,
    lessonsCompleted: 15,
    timeSpent: 340,
    certificatesEarned: 2
  }), [user])

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

  // Get user display name
  const displayName = useMemo(() => {
    return getFullName(user)
  }, [user])
  
  const username = useMemo(() => {
    return getDisplayUsername(user)
  }, [user])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    )
  }

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
      
      {/* Debug Info Component */}
      <TelegramDebugInfo />
      
      {/* Auth Status Debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-20 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
          Auth: {isAuthenticated ? '✅' : '❌'} | User: {user?.first_name || 'None'}
        </div>
      )}
    </motion.div>
  )
}