import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap } from 'lucide-react'
import { TelegramHaptics, useTelegramAnimations } from '../../lib/telegram/animations'

interface TelegramLevelUpEffectProps {
  isTriggered: boolean
  currentLevel: number
  onComplete?: () => void
}

/**
 * Telegram-специфичный Level Up эффект с haptic feedback
 */
export const TelegramLevelUpEffect: React.FC<TelegramLevelUpEffectProps> = ({
  isTriggered,
  currentLevel,
  onComplete
}) => {
  const { achievementVariants } = useTelegramAnimations()
  const [showEffect, setShowEffect] = useState(false)

  useEffect(() => {
    if (isTriggered) {
      setShowEffect(true)
      
      // Telegram-специфичная haptic последовательность для level up
      const playLevelUpSequence = async () => {
        await TelegramHaptics.levelUp()
        
        // Дополнительные haptic эффекты синхронизированно с анимацией
        setTimeout(() => TelegramHaptics.impact('medium'), 500)
        setTimeout(() => TelegramHaptics.impact('light'), 1000)
        setTimeout(() => TelegramHaptics.selection(), 1500)
      }
      
      playLevelUpSequence()
      
      // Скрыть эффект через 3 секунды
      const timer = setTimeout(() => {
        setShowEffect(false)
        onComplete?.()
      }, 3000)
      
      return () => clearTimeout(timer)
    }
  }, [isTriggered, onComplete])

  return (
    <AnimatePresence>
      {showEffect && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Main achievement animation */}
          <motion.div
            variants={achievementVariants}
            initial="initial"
            animate="animate"
            exit="initial"
            className="relative"
          >
            {/* Central trophy */}
            <motion.div
              className="flex flex-col items-center"
              animate="celebration"
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="relative mb-4"
                animate={{
                  scale: [1, 1.3, 1.1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{
                  duration: 1,
                  ease: "easeInOut",
                  times: [0, 0.5, 0.8, 1]
                }}
              >
                <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-2xl" />
                
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 w-24 h-24 bg-yellow-400/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
              
              {/* Level text */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h2
                  className="text-4xl font-bold text-white mb-2 drop-shadow-lg"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  Уровень {currentLevel}!
                </motion.h2>
                <motion.p
                  className="text-lg text-white/90 drop-shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Поздравляем! 🎉
                </motion.p>
              </motion.div>
            </motion.div>
            
            {/* Particle effects */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: Math.cos((i * 30) * Math.PI / 180) * 150,
                  y: Math.sin((i * 30) * Math.PI / 180) * 150,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  delay: 0.5 + (i * 0.05),
                  ease: "easeOut"
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  marginLeft: '-8px',
                  marginTop: '-8px'
                }}
              >
                {i % 3 === 0 ? (
                  <Star className="w-4 h-4 text-yellow-300" />
                ) : i % 3 === 1 ? (
                  <Zap className="w-4 h-4 text-blue-300" />
                ) : (
                  <div className="w-2 h-2 bg-purple-300 rounded-full" />
                )}
              </motion.div>
            ))}
            
            {/* Confetti burst */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: [
                    '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'
                  ][i % 6],
                  left: '50%',
                  top: '30%'
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0
                }}
                animate={{
                  x: (Math.random() - 0.5) * 400,
                  y: Math.random() * 200 + 100,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 3,
                  delay: 0.8 + (Math.random() * 0.5),
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}