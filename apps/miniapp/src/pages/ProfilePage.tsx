import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { Trophy, Crown, Zap, Target, Calendar, Flame, Star, Award, Settings } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

// Store
import { userDataAtom } from '../store/profileAtoms'

// APIs and utilities
import { getAvatarUrl, getFullName } from '../hooks/useTelegramUser'
import { useAuthVerification } from '../hooks/useApi'
import { getTelegramApi } from '../lib/telegram/api'
import { getRankByXP, getNextRank, getRankProgress } from '../lib/rankSystem'

// Performance hooks
import { usePersistedState } from '../hooks/usePersistedState'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { useTelegramDataCache, useTelegramThemeCache } from '../hooks/useTelegramCache'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

// Telegram animations
import { TelegramHaptics, useTelegramAnimations } from '../lib/telegram/animations'
import { TelegramPageTransition, TelegramSectionTransition } from '../components/telegram/TelegramPageTransition'

/**
 * НОВЫЙ HYLO-СТИЛЬ ПРОФИЛЬ
 * Полная переработка в стиле gaming/DeFi интерфейса
 */
export function ProfilePage() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const { data: authData, isSuccess: isAuthSuccess } = useAuthVerification()
  const navigate = useNavigate()
  
  // Telegram animations and haptics
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
  
  // Get Telegram user data from API client
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
          avatarUrl: undefined,
          isPremium: backendUser.is_premium || false,
          isAvailable: true
        })
      }))
    } else if (telegramUser.isAvailable && telegramUser.id > 0) {
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

  // Get user display name
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

  // Hylo-стиль данные (расширенные метрики)
  const hyloData = useMemo(() => ({
    // Основные метрики из userData
    totalXP: userData.totalXP,
    level: Math.floor(userData.totalXP / 1000) + 1, // Примерная формула
    rank: rankData.currentRank.name,
    
    // Дополнительные метрики в стиле Hylo
    globalRank: Math.floor(Math.random() * 1000) + 50, // Временные данные
    weeklyRank: Math.floor(Math.random() * 100) + 10,
    crowns: Math.floor(userData.totalXP / 100), // Crowns на основе XP
    xpToday: Math.floor(Math.random() * 3000) + 500,
    activeBoost: 150, // 150% boost
    
    // Прогресс к следующему уровню
    nextLevel: {
      level: Math.floor(userData.totalXP / 1000) + 2,
      xpNeeded: (Math.floor(userData.totalXP / 1000) + 2) * 1000 - userData.totalXP
    }
  }), [userData.totalXP, rankData.currentRank.name])

  // Настройки кнопка handler
  const handleSettingsClick = async () => {
    await TelegramHaptics.pageTransition()
    navigate({ to: '/settings' })
  }

  return (
    <TelegramPageTransition className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="relative min-h-screen p-4">
        
        {/* Settings Button - Fixed Position */}
        <motion.button 
          onClick={handleSettingsClick}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300"
          whileHover={{ 
            scale: 1.02, 
            y: -1,
            backgroundColor: "rgba(255, 255, 255, 0.15)"
          }}
          whileTap={{ 
            scale: 0.98
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Settings className="w-5 h-5 text-white/70" />
        </motion.button>

        {/* Header - Season Info */}
        <TelegramSectionTransition delay={0}>
          <div className="text-center mb-8 pt-4">
            <h1 className="text-2xl font-bold text-white mb-2">iOS Academy Season 1</h1>
            <p className="text-gray-400">Master Swift, build apps, climb the ranks. That's it, that's our learning system.</p>
          </div>
        </TelegramSectionTransition>

        {/* Hero Card - Hylo Style */}
        <TelegramSectionTransition delay={1}>
          <motion.div 
            className="relative mb-6 p-6 rounded-2xl border-2 border-yellow-400/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm"
            style={{
              boxShadow: '0 0 30px rgba(250, 204, 21, 0.3)'
            }}
            whileHover={{ scale: 1.01, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-6">
              {/* iOS Badge/Shield */}
              <div className="relative">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #1E40AF 100%)',
                    boxShadow: '0 8px 32px rgba(59, 130, 246, 0.4), inset 0 2px 8px rgba(255,255,255,0.2)'
                  }}
                >
                  <div className="text-white text-2xl font-bold">📱</div>
                </div>
                {/* Glow effect */}
                <div 
                  className="absolute inset-0 w-20 h-20 rounded-2xl blur-xl opacity-60"
                  style={{ background: 'linear-gradient(135deg, #3B82F6, #1D4ED8)' }}
                />
              </div>

              {/* XP Number - MASSIVE */}
              <div className="flex-1">
                <div 
                  className="text-5xl md:text-6xl font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontVariantNumeric: 'tabular-nums',
                    textShadow: '0 0 30px rgba(251, 191, 36, 0.5)'
                  }}
                >
                  {hyloData.totalXP.toLocaleString()}
                </div>
                <div className="text-gray-400 text-sm font-medium">Total XP</div>
              </div>

              {/* Level */}
              <div className="text-right">
                <div className="text-4xl font-bold text-white mb-1">Level {hyloData.level}</div>
                <div className="text-yellow-400 text-sm font-medium">{hyloData.rank}</div>
              </div>
            </div>
          </motion.div>
        </TelegramSectionTransition>

        {/* Progress Bar */}
        <TelegramSectionTransition delay={2}>
          <motion.div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress to Level {hyloData.nextLevel.level}</span>
              <span>Lv. {hyloData.nextLevel.level}</span>
            </div>
            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%)',
                  width: `${rankData.progressPercentage}%`
                }}
                initial={{ width: 0 }}
                animate={{ width: `${rankData.progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 50%, transparent 100%)',
                  animation: 'shimmer 2s infinite'
                }}
              />
            </div>
          </motion.div>
        </TelegramSectionTransition>

        {/* 2x2 Metrics Grid */}
        <TelegramSectionTransition delay={3}>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Global Rank */}
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => TelegramHaptics.selection()}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)'
                  }}
                >
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">#{hyloData.globalRank}</div>
                  <div className="text-gray-400 text-sm">Global Rank</div>
                </div>
              </div>
            </motion.div>

            {/* Crowns */}
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => TelegramHaptics.selection()}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 100%)',
                    boxShadow: '0 4px 16px rgba(251, 191, 36, 0.3)'
                  }}
                >
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{hyloData.crowns}</div>
                  <div className="text-gray-400 text-sm">Crowns</div>
                </div>
              </div>
            </motion.div>

            {/* XP Today */}
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => TelegramHaptics.selection()}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
                    boxShadow: '0 4px 16px rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{hyloData.xpToday.toLocaleString()}</div>
                  <div className="text-gray-400 text-sm">XP Today</div>
                </div>
              </div>
            </motion.div>

            {/* Active Boost */}
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => TelegramHaptics.selection()}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{hyloData.activeBoost}%</div>
                  <div className="text-gray-400 text-sm">Active Boost</div>
                </div>
              </div>
            </motion.div>
          </div>
        </TelegramSectionTransition>

        {/* Learning Boost Section */}
        <TelegramSectionTransition delay={4}>
          <motion.div 
            className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 mb-6"
            whileHover={{ scale: 1.01, y: -1 }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Swift Learning Boost</span>
              </div>
              <div className="text-gray-400 text-sm">End in: 24:15:30</div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[
                  { icon: '📱', color: 'bg-blue-500' },
                  { icon: '⚡', color: 'bg-yellow-500' },
                  { icon: '🚀', color: 'bg-green-500' },
                  { icon: '💎', color: 'bg-purple-500' },
                  { icon: '🔥', color: 'bg-red-500' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className={`w-8 h-8 ${item.color} rounded-lg flex items-center justify-center text-sm`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item.icon}
                  </motion.div>
                ))}
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">XP multiplier:</div>
                <div className="text-2xl font-bold text-white">x2</div>
              </div>
            </div>
          </motion.div>
        </TelegramSectionTransition>

        {/* Weekly Stats & Streak */}
        <TelegramSectionTransition delay={5}>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {/* Weekly Rank */}
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              whileHover={{ scale: 1.01, y: -1 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                      boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
                    }}
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">Weekly Rank</div>
                    <div className="text-gray-400 text-sm">This week's performance</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-400">#{hyloData.weeklyRank}</div>
              </div>
            </motion.div>

            {/* Current Streak */}
            <motion.div 
              className="bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-xl p-4"
              whileHover={{ scale: 1.01, y: -1 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                      boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)'
                    }}
                  >
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white">Learning Streak</div>
                    <div className="text-gray-400 text-sm">Days in a row</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-400">{userData.streak}</div>
              </div>
            </motion.div>
          </div>
        </TelegramSectionTransition>

        {/* Next Tier Preview */}
        <TelegramSectionTransition delay={6}>
          <motion.div 
            className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 backdrop-blur-sm border border-amber-500/30 rounded-xl p-4"
            whileHover={{ scale: 1.01, y: -1 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white font-medium">Next Tier</div>
                <div className="text-gray-400 text-sm">
                  {rankData.nextRank ? `${rankData.nextRank.name} at Level ${hyloData.nextLevel.level}` : 'Max Level Reached'} 
                  {!rankData.isMaxRank && ` • ${hyloData.nextLevel.xpNeeded.toLocaleString()} XP needed`}
                </div>
              </div>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #92400E 0%, #78350F 100%)',
                  boxShadow: '0 4px 16px rgba(146, 64, 14, 0.3)'
                }}
              >
                <Star className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </motion.div>
        </TelegramSectionTransition>

        {/* CSS для анимации */}
        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </div>
    </TelegramPageTransition>
  )
}