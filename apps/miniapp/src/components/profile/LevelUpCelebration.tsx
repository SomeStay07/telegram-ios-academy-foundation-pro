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

      {/* Subtle particle effects - спокойная элегантность */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${25 + (i * 25)}%`,
            top: `${30 + (i % 2) * 20}%`
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
            ease: "easeInOut"
          }}
        >
          <Star className="w-2 h-2 text-yellow-400/60" fill="currentColor" />
        </motion.div>
      ))}

      {/* Master Badge - спокойная элегантность */}
      <motion.div
        className="absolute top-2 right-2 flex items-center gap-1 bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-400 px-2 py-1 rounded-full text-xs font-bold"
        style={{
          fontFamily: 'var(--font-gaming)'
        }}
      >
        <Crown className="w-3 h-3" />
        <span>MASTER</span>
      </motion.div>


      {/* Subtle Border - спокойная элегантность */}
      <div className="absolute inset-0 border border-yellow-400/30 rounded-inherit"></div>

      {/* Achievement Text - спокойная элегантность */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
        <div 
          className="text-yellow-400 text-xs font-bold text-center px-2 py-1 bg-black/20 rounded-full backdrop-blur-sm"
          style={{ fontFamily: 'var(--font-gaming)' }}
        >
          Максимальный уровень
        </div>
      </div>
    </motion.div>
  )
}