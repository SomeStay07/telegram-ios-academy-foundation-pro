import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Medal, Crown, Star } from 'lucide-react'

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

        {/* League Position */}
        <motion.div
          className="bg-purple-400/20 backdrop-blur-sm rounded-lg border border-white/10 p-3"
          whileHover={{ scale: 1.02, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center gap-2">
            <div className="relative">
              <Medal className="w-4 h-4 text-purple-400" />
              {socialStats.leaguePosition <= 3 && (
                <motion.div
                  className="absolute -inset-1 bg-purple-400/30 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
            <div>
              <div 
                className="text-sm font-bold text-purple-400"
                style={{ 
                  fontFamily: 'var(--font-gaming)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                #{socialStats.leaguePosition}
              </div>
              <div className="text-xs text-white/60 truncate">
                {socialStats.leagueName}
              </div>
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

        {/* Community Size */}
        <motion.div
          className="bg-blue-400/20 backdrop-blur-sm rounded-lg border border-white/10 p-3"
          whileHover={{ scale: 1.02, y: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <div>
              <div 
                className="text-sm font-bold text-blue-400"
                style={{ 
                  fontFamily: 'var(--font-gaming)',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {(socialStats.totalLearners / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-white/60">изучающих</div>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  )
}