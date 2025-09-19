import React from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, Code2, Smartphone } from 'lucide-react'

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

        {/* Personal Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          
          {/* Location & Time */}
          <motion.div
            className="flex items-center gap-1.5 p-2 rounded-md bg-white/5"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <MapPin className="w-3 h-3 text-blue-400 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-white/70 truncate">{personalInfo.location}</div>
              <div className="text-white/50">{personalInfo.timezone}</div>
            </div>
          </motion.div>

          {/* Learning Time */}
          <motion.div
            className="flex items-center gap-1.5 p-2 rounded-md bg-white/5"
            whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <Clock className="w-3 h-3 text-orange-400 flex-shrink-0" />
            <div className="min-w-0">
              <div className="text-white/70 truncate flex items-center gap-1">
                <span>{getTimeEmoji(personalInfo.learningTime)}</span>
                <span>{personalInfo.learningTime}</span>
              </div>
              <div className="text-white/50">Время обучения</div>
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