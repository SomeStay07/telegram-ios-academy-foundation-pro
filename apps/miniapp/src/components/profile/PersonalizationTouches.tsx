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
          <Heart className="w-4 h-4 text-red-400/80" />
        </motion.div>

        {/* Learning Goal Progress */}
        <motion.div
          className="mb-3"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400/80" />
              <span className="text-sm text-white/80">{personalInfo.learningGoal}</span>
            </div>
            <span 
              className="text-sm font-bold text-purple-400/80"
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
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-400/60 to-purple-300/60 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${personalInfo.goalProgress}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            
          </div>
        </motion.div>

        {/* Enhanced Personal Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          
          {/* Location - спокойная элегантность */}
          <motion.div
            className="bg-blue-400/10 backdrop-blur-sm rounded-lg border border-blue-400/20 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative z-10 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400/80" />
              <div>
                <div 
                  className="text-sm font-bold text-blue-400/80"
                  style={{ fontFamily: 'var(--font-gaming)' }}
                >
                  {personalInfo.location}
                </div>
                <div className="text-white/60 text-xs">{personalInfo.timezone}</div>
              </div>
            </div>
          </motion.div>

          {/* Learning Time - спокойная элегантность */}
          <motion.div
            className="bg-orange-400/10 backdrop-blur-sm rounded-lg border border-orange-400/20 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative z-10 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400/80" />
              <div>
                <div className="text-sm font-bold text-orange-400/80 flex items-center gap-1">
                  <span style={{ fontFamily: 'var(--font-gaming)' }}>
                    {getTimeEmoji(personalInfo.learningTime)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-gaming)' }}>
                    {personalInfo.learningTime}
                  </span>
                </div>
                <div className="text-white/60 text-xs">Время обучения</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Социальные метрики в стиле SocialProof */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          
          {/* Friends Online - спокойная элегантность */}
          <motion.div
            className="bg-green-400/10 backdrop-blur-sm rounded-lg border border-green-400/20 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative z-10 flex items-center gap-2">
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
                  8
                </div>
                <div className="text-white/60 text-xs">друзей онлайн</div>
              </div>
            </div>
          </motion.div>

          {/* Weekly Rank - спокойная элегантность */}
          <motion.div
            className="bg-indigo-400/10 backdrop-blur-sm rounded-lg border border-indigo-400/20 p-3 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative z-10 flex items-center gap-2">
              <Star className="w-4 h-4 text-indigo-400/80" />
              <div>
                <div 
                  className="text-sm font-bold text-indigo-400/80"
                  style={{ 
                    fontFamily: 'var(--font-gaming)'
                  }}
                >
                  ТОП 15%
                </div>
                <div className="text-white/60 text-xs">на этой неделе</div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Device Preference */}
        <motion.div
          className="mt-2 flex items-center justify-center gap-2 p-2 rounded-md bg-white/5"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        >
          <Smartphone className="w-3 h-3 text-green-400/80" />
          <span className="text-xs text-white/70">{personalInfo.devicePreference}</span>
          <span>📱</span>
        </motion.div>

      </div>
    </motion.div>
  )
}