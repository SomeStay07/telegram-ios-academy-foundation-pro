import React from 'react'
import { motion } from 'framer-motion'
import { Play, Calendar, Users, Target, Flame } from 'lucide-react'

// Design System Components
import { Button } from '../../design-system/components/button/index'

// Telegram Integration
import { getTelegramApi } from '../../lib/telegram/api'

interface QuickActionsBarProps {
  itemVariants: any
  hasActiveLesson?: boolean
  streakCount: number
}

export function QuickActionsBar({ itemVariants, hasActiveLesson = true, streakCount }: QuickActionsBarProps) {
  const telegramApi = getTelegramApi()

  const handleHapticFeedback = (type: 'light' | 'medium' | 'heavy' = 'light') => {
    try {
      if (telegramApi.isAvailable()) {
        const webApp = telegramApi.getWebApp()
        if (webApp?.HapticFeedback?.impactOccurred) {
          webApp.HapticFeedback.impactOccurred(type)
        }
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
  }

  const handleContinueLesson = () => {
    handleHapticFeedback('medium')
    // Navigation logic here
    console.log('Continue lesson clicked')
  }

  const handleDailyChallenge = () => {
    handleHapticFeedback('light')
    console.log('Daily challenge clicked')
  }

  const handleInviteFriends = () => {
    handleHapticFeedback('light')
    console.log('Invite friends clicked')
  }

  return (
    <motion.div 
      variants={itemVariants}
      className="mb-4"
    >
      <div className="flex flex-wrap gap-2 justify-center">
        
        {/* Primary Action - Continue Lesson */}
        {hasActiveLesson && (
          <motion.div
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="primary"
              size="sm"
              onClick={handleContinueLesson}
              className="gaming-button"
              style={{
                background: 'var(--gradient-xp)',
                border: 'none',
                fontFamily: 'var(--font-gaming)',
                fontWeight: '600',
                boxShadow: 'var(--shadow-gaming-success)'
              }}
            >
              <Play className="w-4 h-4 mr-2" />
              Продолжить урок
            </Button>
          </motion.div>
        )}

        {/* Daily Challenge */}
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDailyChallenge}
            className="gaming-button relative overflow-hidden"
            style={{
              background: streakCount >= 7 ? 'var(--gradient-streak)' : 'rgba(255, 255, 255, 0.1)',
              border: streakCount >= 7 ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontFamily: 'var(--font-gaming)',
              fontWeight: '600'
            }}
          >
            <Flame className={`w-4 h-4 mr-2 ${streakCount >= 7 ? 'text-white' : 'text-orange-400'}`} />
            {streakCount >= 7 ? 'Fire Streak!' : 'Вызов дня'}
            
            {/* Streak indicator */}
            {streakCount >= 7 && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatDelay: 1 
                }}
              />
            )}
          </Button>
        </motion.div>

        {/* Invite Friends */}
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={handleInviteFriends}
            className="gaming-button"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'var(--font-gaming)',
              fontWeight: '500'
            }}
          >
            <Users className="w-4 h-4 mr-2" />
            Пригласить
          </Button>
        </motion.div>

        {/* Weekly Goal (if applicable) */}
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleHapticFeedback('light')}
            className="gaming-button"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'var(--font-gaming)',
              fontWeight: '500'
            }}
          >
            <Target className="w-4 h-4 mr-2" />
            Цель недели
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}