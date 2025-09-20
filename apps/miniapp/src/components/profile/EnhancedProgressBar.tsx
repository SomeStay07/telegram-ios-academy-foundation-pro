import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Star, Zap, Target } from 'lucide-react'

// Design Tokens
import { ANIMATION, TYPOGRAPHY } from '../../shared/constants/design-tokens'

interface EnhancedProgressBarProps {
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
  currentRank,
  nextRank,
  currentXP,
  progressPercentage,
  isMaxRank,
  className
}) => {
  const [showTooltip, setShowTooltip] = useState(false)

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
      <div className="flex items-center justify-between mb-3">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
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
          </div>
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
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
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
            </div>
          </motion.div>
        )}

        {isMaxRank && (
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full border border-yellow-400/30">
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
            </div>
          </motion.div>
        )}
      </div>

      {/* Enhanced Progress Bar Container */}
      <div className="relative">
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

          {/* Current Position Indicator with Tooltip */}
          {!isMaxRank && (
            <motion.div
              className="absolute top-1/2 transform -translate-y-1/2 cursor-pointer"
              style={{ 
                left: `${Math.min(progressPercentage, 100)}%`,
                marginLeft: 'clamp(-0.375rem, -1vw, -0.25rem)'
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.8, type: "spring", ...ANIMATION.SPRING.BOUNCY }}
            >
              <div 
                className="w-3 h-3 bg-white rounded-full border-2 border-white/50 shadow-lg relative z-10"
                style={{
                  width: 'clamp(0.75rem, 1.5vw, 1rem)',
                  height: 'clamp(0.75rem, 1.5vw, 1rem)',
                  boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)'
                }}
              />
              
              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -15, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm text-white rounded-lg border border-white/10 pointer-events-none"
                    style={{
                      fontSize: 'clamp(0.7rem, 1.8vw, 0.8rem)',
                      fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <div className="text-center">
                      <div className="font-bold text-white">{currentXP.toLocaleString()} XP</div>
                      {xpRange.needed > 0 && (
                        <div className="text-gray-300 text-xs">
                          Еще {xpRange.needed.toLocaleString()} до повышения
                        </div>
                      )}
                    </div>
                    
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
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