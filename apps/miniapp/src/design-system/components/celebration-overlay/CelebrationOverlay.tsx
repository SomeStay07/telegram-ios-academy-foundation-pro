import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { Star, Sparkles, Crown, Trophy } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { CelebrationOverlayProps } from './CelebrationOverlayTypes'
import { ANIMATION, TYPOGRAPHY } from '../../../shared/constants/design-tokens'

const overlayVariants = cva(
  "absolute inset-0 pointer-events-none overflow-hidden rounded-inherit",
  {
    variants: {
      theme: {
        gold: "text-yellow-400",
        blue: "text-blue-400", 
        green: "text-green-400",
        purple: "text-purple-400",
        orange: "text-orange-400",
        rainbow: "text-yellow-400"
      },
      intensity: {
        subtle: "opacity-70",
        normal: "opacity-90", 
        intense: "opacity-100"
      }
    },
    defaultVariants: {
      theme: "gold",
      intensity: "normal"
    }
  }
)

const glowVariants = cva(
  "absolute inset-0",
  {
    variants: {
      theme: {
        gold: "bg-gradient-to-r from-yellow-400/10 via-yellow-300/20 to-yellow-400/10",
        blue: "bg-gradient-to-r from-blue-400/10 via-blue-300/20 to-blue-400/10",
        green: "bg-gradient-to-r from-green-400/10 via-green-300/20 to-green-400/10", 
        purple: "bg-gradient-to-r from-purple-400/10 via-purple-300/20 to-purple-400/10",
        orange: "bg-gradient-to-r from-orange-400/10 via-orange-300/20 to-orange-400/10",
        rainbow: "bg-gradient-to-r from-yellow-400/10 via-pink-300/20 to-blue-400/10"
      }
    },
    defaultVariants: {
      theme: "gold"
    }
  }
)

const badgeVariants = cva(
  "absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold",
  {
    variants: {
      theme: {
        gold: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900",
        blue: "bg-gradient-to-r from-blue-400 to-blue-600 text-blue-900",
        green: "bg-gradient-to-r from-green-400 to-green-600 text-green-900",
        purple: "bg-gradient-to-r from-purple-400 to-purple-600 text-purple-900", 
        orange: "bg-gradient-to-r from-orange-400 to-orange-600 text-orange-900",
        rainbow: "bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 text-white"
      }
    },
    defaultVariants: {
      theme: "gold"
    }
  }
)

const borderVariants = cva(
  "absolute inset-0 border-2 rounded-inherit",
  {
    variants: {
      theme: {
        gold: "border-yellow-400/50",
        blue: "border-blue-400/50",
        green: "border-green-400/50", 
        purple: "border-purple-400/50",
        orange: "border-orange-400/50",
        rainbow: "border-yellow-400/50"
      }
    },
    defaultVariants: {
      theme: "gold"
    }
  }
)

export const CelebrationOverlay: React.FC<CelebrationOverlayProps> = ({
  type,
  isVisible,
  title,
  subtitle,
  badgeText,
  badgeIcon: BadgeIcon = Crown,
  theme = "gold",
  intensity = "normal", 
  autoHideDuration = 0,
  particles = true,
  glow = true,
  sparkles = true,
  className,
  onDismiss,
  style,
  ...props
}) => {
  useEffect(() => {
    if (isVisible && autoHideDuration > 0 && onDismiss) {
      const timer = setTimeout(onDismiss, autoHideDuration)
      return () => clearTimeout(timer)
    }
  }, [isVisible, autoHideDuration, onDismiss])

  const getThemeColors = (theme: string) => {
    switch (theme) {
      case 'blue': return { primary: 'blue-400', secondary: 'blue-300' }
      case 'green': return { primary: 'green-400', secondary: 'green-300' }
      case 'purple': return { primary: 'purple-400', secondary: 'purple-300' }
      case 'orange': return { primary: 'orange-400', secondary: 'orange-300' }
      case 'rainbow': return { primary: 'yellow-400', secondary: 'pink-300' }
      default: return { primary: 'yellow-400', secondary: 'yellow-300' }
    }
  }

  const colors = getThemeColors(theme)
  const particleCount = intensity === 'subtle' ? 4 : intensity === 'intense' ? 12 : 8
  const sparkleCount = intensity === 'subtle' ? 2 : intensity === 'intense' ? 6 : 4

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(overlayVariants({ theme, intensity }), className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION.DURATION.NORMAL / 1000 }}
          style={{
            fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
            ...style
          }}
          {...props}
        >
          {/* Glow Effect */}
          {glow && (
            <motion.div
              className={cn(glowVariants({ theme }))}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: ANIMATION.DURATION.SLOWEST / 1000 * 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Particle Effects */}
          {particles && Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute"
              style={{
                left: `${15 + (i * (70 / particleCount))}%`,
                top: `${20 + (i % 3) * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: (ANIMATION.DURATION.SLOWEST / 1000 * 2) + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              <Star className={`w-2 h-2 text-${colors.primary}`} fill="currentColor" />
            </motion.div>
          ))}

          {/* Badge */}
          {badgeText && (
            <motion.div
              className={cn(badgeVariants({ theme }))}
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: ANIMATION.DURATION.SLOWEST / 1000 * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                boxShadow: theme === 'gold' 
                  ? '0 0 15px rgba(251, 191, 36, 0.5)'
                  : `0 0 15px rgba(${theme === 'blue' ? '59, 130, 246' : theme === 'green' ? '34, 197, 94' : theme === 'purple' ? '168, 85, 247' : '251, 146, 60'}, 0.5)`
              }}
            >
              <BadgeIcon className="w-3 h-3" />
              <span>{badgeText}</span>
            </motion.div>
          )}

          {/* Sparkle Trails */}
          {sparkles && Array.from({ length: sparkleCount }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${25 + (i * (50 / sparkleCount))}%`,
                top: `${30 + (i % 2) * 30}%`
              }}
              animate={{
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: (ANIMATION.DURATION.SLOWEST / 1000 * 3) + (i * 0.5),
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className={`w-3 h-3 text-${colors.secondary}`} />
            </motion.div>
          ))}

          {/* Border Glow */}
          {glow && (
            <motion.div
              className={cn(borderVariants({ theme }))}
              animate={{
                borderColor: theme === 'gold' ? [
                  'rgba(251, 191, 36, 0.3)',
                  'rgba(251, 191, 36, 0.7)', 
                  'rgba(251, 191, 36, 0.3)'
                ] : theme === 'blue' ? [
                  'rgba(59, 130, 246, 0.3)',
                  'rgba(59, 130, 246, 0.7)',
                  'rgba(59, 130, 246, 0.3)'
                ] : [
                  'rgba(168, 85, 247, 0.3)',
                  'rgba(168, 85, 247, 0.7)',
                  'rgba(168, 85, 247, 0.3)'
                ]
              }}
              transition={{
                duration: ANIMATION.DURATION.SLOWEST / 1000 * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}

          {/* Achievement Text */}
          {(title || subtitle) && (
            <motion.div
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: ANIMATION.DURATION.NORMAL / 1000 * 0.8 }}
            >
              <div className={`text-${colors.primary} text-xs font-bold text-center px-2 py-1 bg-black/20 rounded-full backdrop-blur-sm`}>
                {title}
                {subtitle && <div className="text-white/80 text-xs mt-1">{subtitle}</div>}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}