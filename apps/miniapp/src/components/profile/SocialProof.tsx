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
    totalLearners: 12450
  }

  const getPerformanceBadge = (rank: number) => {
    if (rank <= 5) return { text: 'ТОП 5%', color: 'text-yellow-400/80', bg: 'bg-yellow-400/20', icon: Crown }
    if (rank <= 15) return { text: 'ТОП 15%', color: 'text-blue-400/80', bg: 'bg-blue-400/20', icon: Medal }
    if (rank <= 30) return { text: 'ТОП 30%', color: 'text-green-400/80', bg: 'bg-green-400/20', icon: TrendingUp }
    return { text: 'В прогрессе', color: 'text-gray-400', bg: 'bg-gray-400/20', icon: Star }
  }

  const performanceBadge = getPerformanceBadge(socialStats.weeklyRank)
  const BadgeIcon = performanceBadge.icon

  return (
    <motion.div 
      variants={itemVariants}
      className="mb-4"
    >

      {/* Социальные метрики */}
      <div className="grid grid-cols-2 gap-2">
        
        {/* Weekly Performance - спокойная элегантность */}
        <motion.div
          className="bg-indigo-400/10 backdrop-blur-sm rounded-lg border border-indigo-400/20 p-3 relative overflow-hidden"
          whileHover={{ scale: 1.02, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="relative z-10 flex items-center gap-2">
            <BadgeIcon className="w-4 h-4 text-indigo-400/80" />
            <div>
              <div 
                className="text-sm font-bold text-indigo-400/80"
                style={{ fontFamily: 'var(--font-gaming)' }}
              >
                {performanceBadge.text}
              </div>
              <div className="text-xs text-gray-600 dark:text-white/60">на этой неделе</div>
            </div>
          </div>
        </motion.div>

        {/* Friends Online - спокойная элегантность */}
        <motion.div
          className="bg-green-400/10 backdrop-blur-sm rounded-lg border border-green-400/20 p-3"
          whileHover={{ scale: 1.02, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Users className="w-4 h-4 text-green-400/80" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400/80 rounded-full"></div>
            </div>
            <div>
              <div 
                className="text-sm font-bold text-green-400/80"
                style={{ 
                  fontFamily: 'var(--font-gaming)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {socialStats.friendsOnline}
              </div>
              <div className="text-xs text-gray-600 dark:text-white/60">друзей онлайн</div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}