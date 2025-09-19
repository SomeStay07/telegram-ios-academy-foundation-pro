import React from 'react'
import { motion } from 'framer-motion'
import { Crown, Star, Trophy, Sparkles } from 'lucide-react'

interface LevelUpCelebrationProps {
  isMaxRank: boolean
  currentRank: {
    name: string
  }
}

export function LevelUpCelebration({ isMaxRank, currentRank }: LevelUpCelebrationProps) {
  if (!isMaxRank) return null

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Golden Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-yellow-300/20 to-yellow-400/10"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Particle Effects */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${15 + (i * 10)}%`,
            top: `${20 + (i % 3) * 20}%`
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + (i * 0.2),
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        >
          <Star className="w-2 h-2 text-yellow-400" fill="currentColor" />
        </motion.div>
      ))}

      {/* Master Badge */}
      <motion.div
        className="absolute top-2 right-2 flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          fontFamily: 'var(--font-gaming)',
          boxShadow: '0 0 15px rgba(251, 191, 36, 0.5)'
        }}
      >
        <Crown className="w-3 h-3" />
        <span>MASTER</span>
      </motion.div>

      {/* Sparkle Trails */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${25 + (i * 15)}%`,
            top: `${30 + (i % 2) * 30}%`
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 3 + (i * 0.5),
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </motion.div>
      ))}

      {/* Border Glow */}
      <motion.div
        className="absolute inset-0 border-2 border-yellow-400/50 rounded-inherit"
        animate={{
          borderColor: [
            'rgba(251, 191, 36, 0.3)',
            'rgba(251, 191, 36, 0.7)',
            'rgba(251, 191, 36, 0.3)'
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Achievement Celebration Text */}
      <motion.div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div 
          className="text-yellow-300 text-xs font-bold text-center px-2 py-1 bg-black/20 rounded-full backdrop-blur-sm"
          style={{ fontFamily: 'var(--font-gaming)' }}
        >
          🎉 Максимальный уровень!
        </div>
      </motion.div>
    </motion.div>
  )
}