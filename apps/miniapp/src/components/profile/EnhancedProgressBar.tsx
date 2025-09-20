import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from '@tanstack/react-router'
import { Trophy, Star, Zap, Target } from 'lucide-react'

// Design Tokens
import { ANIMATION, TYPOGRAPHY } from '../../shared/constants/design-tokens'

interface EnhancedProgressBarProps {
  userData: {
    totalXP: number
    streak: number
    firstName: string
    lastName: string
  }
  currentRank: {
    name: string
    minXP?: number
  }
  nextRank?: {
    name: string
    minXP?: number
  }
  currentXP: number
  progressPercentage: number
  isMaxRank: boolean
  className?: string
}

export const EnhancedProgressBar: React.FC<EnhancedProgressBarProps> = ({
  userData,
  currentRank,
  nextRank,
  currentXP,
  progressPercentage,
  isMaxRank,
  className
}) => {
  const navigate = useNavigate()

  // Calculate XP range for current level
  const xpRange = useMemo(() => {
    if (isMaxRank || !nextRank) {
      return {
        current: currentXP,
        start: currentRank.minXP || 0,
        end: currentXP,
        needed: 0
      }
    }

    const start = currentRank.minXP || 0
    const end = nextRank.minXP || currentXP
    const needed = Math.max(0, end - currentXP)
    
    return {
      current: currentXP,
      start,
      end,
      needed
    }
  }, [currentRank, nextRank, currentXP, isMaxRank])

  // Enhanced gradient based on progress
  const progressGradient = useMemo(() => {
    if (isMaxRank) {
      return 'linear-gradient(90deg, rgba(245, 158, 11, 0.8) 0%, rgba(251, 191, 36, 0.9) 50%, rgba(245, 158, 11, 0.8) 100%)'
    }
    
    if (progressPercentage >= 80) {
      return 'linear-gradient(90deg, rgba(16, 185, 129, 0.8) 0%, rgba(34, 197, 94, 0.9) 50%, rgba(16, 185, 129, 0.8) 100%)'
    } else if (progressPercentage >= 50) {
      return 'linear-gradient(90deg, rgba(99, 102, 241, 0.8) 0%, rgba(129, 140, 248, 0.9) 50%, rgba(99, 102, 241, 0.8) 100%)'
    } else {
      return 'linear-gradient(90deg, rgba(156, 163, 175, 0.6) 0%, rgba(209, 213, 219, 0.8) 50%, rgba(156, 163, 175, 0.6) 100%)'
    }
  }, [progressPercentage, isMaxRank])

  const getRankIcon = (rankName: string) => {
    if (rankName.toLowerCase().includes('мастер') || rankName.toLowerCase().includes('master')) return Trophy
    if (rankName.toLowerCase().includes('эксперт') || rankName.toLowerCase().includes('expert')) return Star
    if (rankName.toLowerCase().includes('про') || rankName.toLowerCase().includes('pro')) return Zap
    return Target
  }

  const CurrentIcon = getRankIcon(currentRank.name)
  const NextIcon = nextRank ? getRankIcon(nextRank.name) : Target

  return (
    <div className={`w-full ${className}`}>
      {/* Enhanced Progress Text */}
      <div className="flex items-center justify-between mb-3 px-2 py-1" style={{ overflow: 'visible' }}>
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 cursor-pointer"
            onClick={() => navigate({ to: '/level-system' })}
            whileHover={{ 
              scale: 1.02,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderColor: "rgba(255, 255, 255, 0.4)",
              boxShadow: "0 4px 15px rgba(255, 255, 255, 0.1)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", ...ANIMATION.SPRING.GENTLE }}
          >
            <CurrentIcon 
              className="text-white/80" 
              style={{
                width: 'clamp(0.875rem, 2vw, 1rem)',
                height: 'clamp(0.875rem, 2vw, 1rem)'
              }}
            />
            <span 
              className="text-white/90 font-medium"
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING
              }}
            >
              {currentRank.name}
            </span>
          </motion.div>
        </motion.div>

        {!isMaxRank && nextRank && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span 
              className="text-white/70 font-medium"
              style={{
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING
              }}
            >
              До {nextRank.name}
            </span>
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 cursor-pointer"
              onClick={() => navigate({ to: '/level-system' })}
              whileHover={{ 
                scale: 1.03,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 6px 20px rgba(255, 255, 255, 0.15)"
              }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", ...ANIMATION.SPRING.BOUNCY }}
            >
              <NextIcon 
                className="text-white/60" 
                style={{
                  width: 'clamp(0.875rem, 2vw, 1rem)',
                  height: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              />
              <span 
                className="text-white/80 font-bold"
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {Math.round(progressPercentage)}%
              </span>
            </motion.div>
          </motion.div>
        )}

        {isMaxRank && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30 cursor-pointer"
              whileHover={{ 
                scale: 1.03,
                background: "linear-gradient(to right, rgba(245, 158, 11, 0.4), rgba(251, 146, 60, 0.4))",
                borderColor: "rgba(245, 158, 11, 0.5)",
                boxShadow: "0 8px 25px rgba(245, 158, 11, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", ...ANIMATION.SPRING.BOUNCY }}
            >
              <Trophy 
                className="text-yellow-400/90" 
                style={{
                  width: 'clamp(0.875rem, 2vw, 1rem)',
                  height: 'clamp(0.875rem, 2vw, 1rem)'
                }}
              />
              <span 
                className="text-yellow-400/90 font-bold"
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                  fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING
                }}
              >
                Максимум
              </span>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Enhanced Progress Bar Container */}
      <div className="relative px-1" style={{ overflow: 'visible' }}>
        {/* Progress Track */}
        <div 
          className="relative h-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 overflow-hidden"
          style={{
            height: 'clamp(0.75rem, 2vw, 1rem)'
          }}
        >
          {/* Background Shimmer */}
          <motion.div
            className="absolute inset-0 rounded-full opacity-30"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
            }}
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut"
            }}
          />

          {/* Progress Fill */}
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            style={{
              background: progressGradient,
              width: `${Math.min(progressPercentage, 100)}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressPercentage, 100)}%` }}
            transition={{ 
              duration: 1.5, 
              ease: "easeOut",
              delay: 0.5 
            }}
          >
            {/* Progress Shimmer */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.4) 50%, transparent 70%)',
              }}
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut"
              }}
            />

            {/* Glow Effect */}
            <div 
              className="absolute inset-0 rounded-full blur-sm -z-10"
              style={{
                background: progressGradient,
                filter: 'blur(4px)',
                opacity: 0.6
              }}
            />
          </motion.div>

        </div>

        {/* Start and End Points */}
        <motion.div 
          className="flex justify-between items-center mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          {/* Start Point */}
          <div className="flex items-center gap-1.5">
            <div 
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              style={{
                width: 'clamp(0.375rem, 1vw, 0.5rem)',
                height: 'clamp(0.375rem, 1vw, 0.5rem)'
              }}
            />
            <span 
              className="text-white/70 font-medium"
              style={{
                fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
                fontVariantNumeric: 'tabular-nums'
              }}
            >
              {xpRange.start.toLocaleString()}
            </span>
          </div>

          {/* End Point */}
          {!isMaxRank && nextRank && (
            <div className="flex items-center gap-1.5">
              <span 
                className="text-white/70 font-medium"
                style={{
                  fontSize: 'clamp(0.65rem, 1.8vw, 0.75rem)',
                  fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {xpRange.end.toLocaleString()}
              </span>
              <div 
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
                style={{
                  width: 'clamp(0.375rem, 1vw, 0.5rem)',
                  height: 'clamp(0.375rem, 1vw, 0.5rem)'
                }}
              />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}