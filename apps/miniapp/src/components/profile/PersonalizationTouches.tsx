import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, Code2, Smartphone, Users, Star } from 'lucide-react'

interface PersonalizationTouchesProps {
  itemVariants: any
  userData: {
    totalXP: number
  }
}

export function PersonalizationTouches({ itemVariants, userData }: PersonalizationTouchesProps) {
  // Mock personalization data - в реальном приложении из профиля пользователя
  const personalInfo = {
    favoriteStack: 'React + TypeScript',
    location: 'Москва',
    timezone: 'UTC+3',
    learningGoal: 'Full-Stack разработчик',
    goalProgress: 73, // %
    learningTime: 'Вечерами',
    devicePreference: 'Mobile First'
  }

  const getStackIcon = (stack: string) => {
    if (stack.includes('React')) return '⚛️'
    if (stack.includes('Vue')) return '💚'
    if (stack.includes('Angular')) return '🅰️'
    return '💻'
  }

  const getTimeEmoji = (time: string) => {
    if (time.includes('Утр')) return '🌅'
    if (time.includes('Днём')) return '☀️'
    if (time.includes('Вечер')) return '🌆'
    return '🌙'
  }

  return (
    <motion.div 
      variants={itemVariants}
      className="mb-4"
    >
      <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-3">
        
        {/* Favorite Tech Stack */}
        <motion.div
          className="flex items-center justify-between mb-3 p-2 rounded-md bg-white/5"
          whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">{getStackIcon(personalInfo.favoriteStack)}</span>
            <div>
              <div 
                className="text-sm font-medium text-white/90"
                style={{ fontFamily: 'var(--font-gaming)' }}
              >
                {personalInfo.favoriteStack}
              </div>
              <div className="text-xs text-white/60">Любимый стек</div>
            </div>
          </div>
          <Heart className="w-4 h-4 text-red-400" />
        </motion.div>

        {/* Learning Goal Progress */}
        <motion.div
          className="mb-3"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-white/80">{personalInfo.learningGoal}</span>
            </div>
            <span 
              className="text-sm font-bold text-purple-400"
              style={{ 
                fontFamily: 'var(--font-gaming)',
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {personalInfo.goalProgress}%
            </span>
          </div>
          
          {/* Goal Progress Bar */}
          <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${personalInfo.goalProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
            {/* Progress shimmer */}
            <motion.div
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: [-32, 200] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 3
              }}
            />
          </div>
        </motion.div>

        {/* Enhanced Personal Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          
          {/* Location - стилизовано как в SocialProof */}
          <motion.div
            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-lg border border-blue-400/30 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Location shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/15 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 2
              }}
            />
            
            <div className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MapPin className="w-4 h-4 text-blue-300" />
              </motion.div>
              <div>
                <div 
                  className="text-sm font-bold text-blue-200"
                  style={{ fontFamily: 'var(--font-gaming)' }}
                >
                  {personalInfo.location}
                </div>
                <div className="text-blue-300/60 text-xs">{personalInfo.timezone}</div>
              </div>
            </div>
          </motion.div>

          {/* Learning Time - стилизовано как в SocialProof */}
          <motion.div
            className="bg-gradient-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-sm rounded-lg border border-orange-400/30 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Time glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-amber-400/15 to-orange-400/10"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
            
            <div className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Clock className="w-4 h-4 text-orange-300" />
              </motion.div>
              <div>
                <div className="text-sm font-bold text-orange-200 flex items-center gap-1">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ fontFamily: 'var(--font-gaming)' }}
                  >
                    {getTimeEmoji(personalInfo.learningTime)}
                  </motion.span>
                  <span style={{ fontFamily: 'var(--font-gaming)' }}>
                    {personalInfo.learningTime}
                  </span>
                </div>
                <div className="text-orange-300/60 text-xs">Время обучения</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Социальные метрики в стиле SocialProof */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          
          {/* Friends Online */}
          <motion.div
            className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-lg border border-green-400/30 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative z-10 flex items-center gap-2">
              <div className="relative">
                <Users className="w-4 h-4 text-green-300" />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <div 
                  className="text-sm font-bold text-green-200"
                  style={{ 
                    fontFamily: 'var(--font-gaming)',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  8
                </div>
                <div className="text-green-300/60 text-xs">друзей онлайн</div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Rank */}
          <motion.div
            className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-sm rounded-lg border border-purple-400/30 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {/* Rank shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/15 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 2
              }}
            />
            
            <div className="relative z-10 flex items-center gap-2">
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity }
                }}
              >
                <Star className="w-4 h-4 text-purple-300" />
              </motion.div>
              <div>
                <div 
                  className="text-sm font-bold text-purple-200"
                  style={{ 
                    fontFamily: 'var(--font-gaming)'
                  }}
                >
                  ТОП 15%
                </div>
                <div className="text-purple-300/60 text-xs">на этой неделе</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Device Preference */}
        <motion.div
          className="mt-2 flex items-center justify-center gap-2 p-2 rounded-md bg-white/5"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <Smartphone className="w-3 h-3 text-green-400" />
          <span className="text-xs text-white/70">{personalInfo.devicePreference}</span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            📱
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  )
}