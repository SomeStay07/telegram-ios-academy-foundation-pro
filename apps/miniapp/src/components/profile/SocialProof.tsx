import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Medal, Crown, Star, Calendar, CheckCircle, BarChart3 } from 'lucide-react'

interface SocialProofProps {
  itemVariants: any
  userData: {
    totalXP: number
  }
}

export function SocialProof({ itemVariants, userData }: SocialProofProps) {
  // Mock data - в реальном приложении это будет из API
  const socialStats = {
    weeklyRank: 15, // Top 15%
    leaguePosition: 3,
    leagueName: 'React Мастера',
    friendsOnline: 8,
    totalLearners: 12450,
    streakDays: 14,
    completedTasks: 24,
    weeklyGrowth: 15 // %
  }

  const getPerformanceBadge = (rank: number) => {
    if (rank <= 5) return { text: 'ТОП 5%', color: 'text-yellow-400', bg: 'bg-yellow-400/20', icon: Crown }
    if (rank <= 15) return { text: 'ТОП 15%', color: 'text-blue-400', bg: 'bg-blue-400/20', icon: Medal }
    if (rank <= 30) return { text: 'ТОП 30%', color: 'text-green-400', bg: 'bg-green-400/20', icon: TrendingUp }
    return { text: 'В прогрессе', color: 'text-gray-400', bg: 'bg-gray-400/20', icon: Star }
  }

  const performanceBadge = getPerformanceBadge(socialStats.weeklyRank)
  const BadgeIcon = performanceBadge.icon

  return (
    <motion.div 
      variants={itemVariants}
      className="mb-4"
    >
      <div className="grid grid-cols-3 gap-2 mb-3">
        
        {/* Streak Days - выделено */}
        <motion.div
          className="bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-sm rounded-lg border border-orange-400/50 p-3 relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Fire glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-400/30 to-orange-400/20"
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Calendar className="w-4 h-4 text-orange-300 mb-1" />
            </motion.div>
            <motion.div 
              className="text-lg font-bold text-orange-200"
              style={{ 
                fontFamily: 'var(--font-gaming)',
                fontVariantNumeric: 'tabular-nums'
              }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {socialStats.streakDays}
            </motion.div>
            <div className="text-xs text-orange-300/70">дней</div>
          </div>
        </motion.div>

        {/* Completed Tasks - выделено */}
        <motion.div
          className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-sm rounded-lg border border-green-400/50 p-3 relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Success shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-green-300/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatDelay: 1
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 360] 
              }}
              transition={{ 
                scale: { duration: 1.5, repeat: Infinity },
                rotate: { duration: 4, repeat: Infinity, ease: "linear" }
              }}
            >
              <CheckCircle className="w-4 h-4 text-green-300 mb-1" />
            </motion.div>
            <motion.div 
              className="text-lg font-bold text-green-200"
              style={{ 
                fontFamily: 'var(--font-gaming)',
                fontVariantNumeric: 'tabular-nums'
              }}
              animate={{ 
                textShadow: [
                  '0 0 0px rgba(34, 197, 94, 0)',
                  '0 0 8px rgba(34, 197, 94, 0.4)',
                  '0 0 0px rgba(34, 197, 94, 0)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {socialStats.completedTasks}
            </motion.div>
            <div className="text-xs text-green-300/70">выполнено</div>
          </div>
        </motion.div>

        {/* Weekly Growth - выделено */}
        <motion.div
          className="bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm rounded-lg border border-blue-400/50 p-3 relative overflow-hidden"
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Growth pulse */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10"
            animate={{ 
              opacity: [0.2, 0.6, 0.2],
              scale: [0.95, 1.05, 0.95]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{ 
                y: [0, -2, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <BarChart3 className="w-4 h-4 text-blue-300 mb-1" />
            </motion.div>
            <motion.div 
              className="text-lg font-bold text-blue-200 flex items-center"
              style={{ 
                fontFamily: 'var(--font-gaming)',
                fontVariantNumeric: 'tabular-nums'
              }}
              animate={{ 
                color: ['rgb(196 222 255)', 'rgb(147 197 253)', 'rgb(196 222 255)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              +{socialStats.weeklyGrowth}%
            </motion.div>
            <div className="text-xs text-blue-300/70">рост</div>
          </div>
        </motion.div>

      </div>

      {/* Второй ряд - социальные метрики */}
      <div className="grid grid-cols-2 gap-2">
        
        {/* Weekly Performance */}
        <motion.div
          className={`${performanceBadge.bg} backdrop-blur-sm rounded-lg border border-white/10 p-3 relative overflow-hidden`}
          whileHover={{ scale: 1.02, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {/* Performance glow effect */}
          {socialStats.weeklyRank <= 15 && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 2
              }}
            />
          )}
          
          <div className="relative z-10 flex items-center gap-2">
            <BadgeIcon className={`w-4 h-4 ${performanceBadge.color}`} />
            <div>
              <div 
                className={`text-sm font-bold ${performanceBadge.color}`}
                style={{ fontFamily: 'var(--font-gaming)' }}
              >
                {performanceBadge.text}
              </div>
              <div className="text-xs text-white/60">на этой неделе</div>
            </div>
          </div>
        </motion.div>

        {/* Friends Online */}
        <motion.div
          className="bg-green-400/20 backdrop-blur-sm rounded-lg border border-white/10 p-3"
          whileHover={{ scale: 1.02, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Users className="w-4 h-4 text-green-400" />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div>
              <div 
                className="text-sm font-bold text-green-400"
                style={{ 
                  fontFamily: 'var(--font-gaming)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {socialStats.friendsOnline}
              </div>
              <div className="text-xs text-white/60">друзей онлайн</div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}