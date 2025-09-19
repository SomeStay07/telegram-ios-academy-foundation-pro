import React, { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { userDataAtom } from '../store/profileAtoms'
import { useTelegramUser, getAvatarUrl, getFullName } from '../hooks/useTelegramUser'
import { getRankByXP, getNextRank, getRankProgress } from '../lib/rankSystem'

// Design System Components
import { Avatar } from '../design-system/components/avatar/index'
import { Card } from '../design-system/components/card/index'
import { Typography } from '../design-system/components/typography/index'
import { Button } from '../design-system/components/button/index'
import { Progress } from '../design-system/components/progress/index'

// Icons
import { Trophy, Star, Zap, Target, Calendar, Award, TrendingUp, Settings, AtSign } from 'lucide-react'

export function ProfilePage() {
  const [userData, setUserData] = useAtom(userDataAtom)
  const telegramUser = useTelegramUser()

  // Update user data with Telegram information
  useEffect(() => {
    if (telegramUser.isAvailable && telegramUser.id > 0) {
      const newUserData = {
        ...userData,
        id: telegramUser.id,
        firstName: telegramUser.firstName || 'Разработчик',
        lastName: telegramUser.lastName || '',
        username: telegramUser.username || '',
        avatar: getAvatarUrl(telegramUser)
      }
      setUserData(newUserData)
    }
  }, [telegramUser, setUserData, userData])

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  // Get user display name
  const displayName = getFullName(telegramUser) || `${userData.firstName} ${userData.lastName}`.trim() || 'Разработчик'
  const username = telegramUser.username || userData.username

  return (
    <>
      <style jsx>{`
        .adaptive-profile-layout {
          display: grid;
          grid-template-columns: auto 1fr;
          grid-template-areas: "avatar info";
          gap: 1.5rem;
          align-items: start;
        }
        
        .profile-avatar {
          grid-area: avatar;
          position: relative;
          justify-self: center;
        }
        
        .profile-info {
          grid-area: info;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: left;
        }
        
        .profile-name {
          font-size: clamp(1.25rem, 4vw, 2rem);
          line-height: 1.2;
        }
        
        .profile-username {
          align-self: flex-start;
        }
        
        .profile-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .profile-progress {
          grid-column: 1 / -1;
          margin-top: 1rem;
        }
        
        @media (max-width: 640px) {
          .adaptive-profile-layout {
            grid-template-columns: 1fr;
            grid-template-areas: 
              "avatar"
              "info";
            text-align: center;
            gap: 1rem;
          }
          
          .profile-avatar {
            justify-self: center;
          }
          
          .profile-info {
            text-align: center;
            align-items: center;
          }
          
          .profile-username {
            align-self: center;
          }
          
          .profile-badges {
            justify-content: center;
          }
        }
      `}</style>
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Profile Header */}
        <motion.div variants={itemVariants}>
          <Card className="p-6 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl relative">
            {/* Settings Icon */}
            <button className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
              <Settings className="w-4 h-4 text-white" />
            </button>
            
            {/* Adaptive Profile Layout */}
            <div className="adaptive-profile-layout">
              {/* Avatar Section */}
              <div className="profile-avatar">
                <Avatar
                  src={userData.avatar}
                  alt={displayName}
                  fallback={displayName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  size="2xl"
                  className="ring-4 ring-white/30 shadow-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
                />
                {/* Online Status */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-500 rounded-full border-2 sm:border-3 md:border-4 border-white shadow-lg"></div>
              </div>

              {/* Profile Info */}
              <div className="profile-info">
                <Typography variant="display-md" className="profile-name text-white font-bold">
                  {displayName}
                </Typography>
                
                {username && (
                  <div className="profile-username">
                    <div className="flex items-center bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                      <AtSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-blue-200" />
                      <Typography variant="body-sm" className="text-white font-medium">
                        {username}
                      </Typography>
                    </div>
                  </div>
                )}

                {/* Adaptive Level & XP Pills */}
                <div className="profile-badges">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-yellow-300" />
                    <Typography variant="body-md" className="text-white font-semibold text-sm sm:text-base">
                      {currentRank.name}
                    </Typography>
                  </div>
                  <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-1.5 sm:mr-2 text-yellow-300" />
                    <Typography variant="body-md" className="text-white font-semibold text-sm sm:text-base">
                      {userData.totalXP >= 1000 ? `${Math.floor(userData.totalXP / 1000)}K` : userData.totalXP}
                    </Typography>
                  </div>
                </div>

              </div>
            </div>

            {/* Adaptive Progress Bar */}
            {!isMaxRank && (
              <div className="profile-progress">
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

              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick Stats Pills */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-6 px-2">
          {/* Streak Pill */}
          <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-full px-4 py-2 border border-blue-200/50 dark:border-blue-700/30 hover:scale-105 transition-transform cursor-pointer">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            <Typography variant="body-sm" className="font-semibold text-blue-800 dark:text-blue-200 mr-1">
              {userData.streak}
            </Typography>
            <Typography variant="caption-sm" className="text-blue-600 dark:text-blue-300">
              дней
            </Typography>
          </div>

          {/* Completed Pill */}
          <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-full px-4 py-2 border border-green-200/50 dark:border-green-700/30 hover:scale-105 transition-transform cursor-pointer">
            <Target className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
            <Typography variant="body-sm" className="font-semibold text-green-800 dark:text-green-200 mr-1">
              24
            </Typography>
            <Typography variant="caption-sm" className="text-green-600 dark:text-green-300">
              выполнено
            </Typography>
          </div>

          {/* Achievements Pill */}
          <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 rounded-full px-4 py-2 border border-purple-200/50 dark:border-purple-700/30 hover:scale-105 transition-transform cursor-pointer">
            <Star className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2" />
            <Typography variant="body-sm" className="font-semibold text-purple-800 dark:text-purple-200 mr-1">
              12
            </Typography>
            <Typography variant="caption-sm" className="text-purple-600 dark:text-purple-300">
              достижений
            </Typography>
          </div>

          {/* Growth Pill */}
          <div className="flex items-center bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 rounded-full px-4 py-2 border border-yellow-200/50 dark:border-yellow-700/30 hover:scale-105 transition-transform cursor-pointer">
            <TrendingUp className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mr-2" />
            <Typography variant="body-sm" className="font-semibold text-yellow-800 dark:text-yellow-200 mr-1">
              +15%
            </Typography>
            <Typography variant="caption-sm" className="text-yellow-600 dark:text-yellow-300">
              рост
            </Typography>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Achievements */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Typography variant="heading-lg" className="font-bold">
                  Достижения
                </Typography>
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
              
              <div className="space-y-4">
                {[
                  { icon: '🏆', title: 'Первый уровень', description: 'Достигли 1000 XP', achieved: true },
                  { icon: '🔥', title: 'Неделя подряд', description: '7 дней активности', achieved: true },
                  { icon: '⭐', title: 'Мастер React', description: 'Изучили основы React', achieved: true },
                  { icon: '🎯', title: 'Целеустремленный', description: 'Выполнили 20 заданий', achieved: false },
                ].map((achievement, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    achievement.achieved 
                      ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                      : 'bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700'
                  }`}>
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <Typography variant="body-md" className={`font-medium ${
                        achievement.achieved ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </Typography>
                      <Typography variant="caption-sm" className={
                        achievement.achieved ? 'text-green-600 dark:text-green-300' : 'text-gray-500'
                      }>
                        {achievement.description}
                      </Typography>
                    </div>
                    {achievement.achieved && (
                      <div className="text-green-500">
                        <Trophy className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Activity Overview */}
          <motion.div variants={itemVariants}>
            <Card className="p-6">
              <Typography variant="heading-lg" className="font-bold mb-4">
                Активность
              </Typography>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Typography variant="body-md">React Hooks</Typography>
                  <div className="flex items-center gap-2">
                    <Progress value={85} className="w-24" />
                    <Typography variant="caption-sm" color="muted">85%</Typography>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Typography variant="body-md">TypeScript</Typography>
                  <div className="flex items-center gap-2">
                    <Progress value={70} className="w-24" />
                    <Typography variant="caption-sm" color="muted">70%</Typography>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Typography variant="body-md">Node.js</Typography>
                  <div className="flex items-center gap-2">
                    <Progress value={45} className="w-24" />
                    <Typography variant="caption-sm" color="muted">45%</Typography>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <Typography variant="body-md">GraphQL</Typography>
                  <div className="flex items-center gap-2">
                    <Progress value={30} className="w-24" />
                    <Typography variant="caption-sm" color="muted">30%</Typography>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Посмотреть все навыки
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </>
  )
}