import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import { ANIMATION, TYPOGRAPHY, Z_INDEX } from '../../../shared/constants/design-tokens'

const inlineLevelBadgeVariants = cva(
  [
    `inline-flex items-center justify-center`,
    `rounded-full px-3 py-1 ml-2`,
    `font-bold text-xs leading-none`,
    `transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`,
    `cursor-default select-none`,
    `shadow-sm transform-gpu will-change-transform`,
    `border backdrop-blur-sm`
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-r from-blue-500/20 to-blue-600/20",
          "border-blue-400/30 text-blue-600 dark:text-blue-400",
          "shadow-blue-500/10"
        ],
        premium: [
          "bg-gradient-to-r from-purple-500/20 via-purple-600/20 to-pink-500/20",
          "border-purple-400/30 text-purple-600 dark:text-purple-400",
          "shadow-purple-500/15"
        ],
        elite: [
          "bg-gradient-to-r from-orange-500/20 via-red-500/20 to-pink-500/20",
          "border-orange-400/30 text-orange-600 dark:text-orange-400",
          "shadow-orange-500/15"
        ],
        master: [
          "bg-gradient-to-r from-yellow-400/20 via-yellow-500/20 to-orange-500/20",
          "border-yellow-400/40 text-yellow-600 dark:text-yellow-400",
          "shadow-yellow-500/20"
        ]
      },
      size: {
        sm: "px-2 py-0.5 text-xs min-w-[2rem]",
        md: "px-3 py-1 text-xs min-w-[2.5rem]", 
        lg: "px-4 py-1.5 text-sm min-w-[3rem]"
      },
      animated: {
        true: "hover:scale-105 hover:-translate-y-0.5",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      animated: true
    }
  }
)

const sparkleVariants = cva(
  "absolute -top-1 -right-1 text-xs pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-blue-400",
        premium: "text-purple-400", 
        elite: "text-orange-400",
        master: "text-yellow-400"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface InlineLevelBadgeProps {
  level: number
  variant?: 'default' | 'premium' | 'elite' | 'master'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
  showSparkle?: boolean
  className?: string
}

export const InlineLevelBadge: React.FC<InlineLevelBadgeProps> = ({
  level,
  variant = "default",
  size = "md",
  animated = true,
  showSparkle = true,
  className
}) => {
  const getVariantByLevel = (level: number) => {
    if (level >= 50) return 'master'
    if (level >= 30) return 'elite' 
    if (level >= 15) return 'premium'
    return 'default'
  }

  const actualVariant = variant === 'default' ? getVariantByLevel(level) : variant
  const shouldShowSparkle = showSparkle && level >= 15

  return (
    <motion.div
      className={cn(inlineLevelBadgeVariants({ 
        variant: actualVariant, 
        size, 
        animated 
      }), className)}
      style={{
        fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
        fontVariantNumeric: 'tabular-nums'
      }}
      initial={animated ? { scale: 0, opacity: 0 } : false}
      animate={animated ? { scale: 1, opacity: 1 } : false}
      whileHover={animated ? { 
        scale: 1.05,
        y: -2,
        boxShadow: actualVariant === 'master' 
          ? '0 4px 20px rgba(251, 191, 36, 0.3)' 
          : actualVariant === 'elite'
          ? '0 4px 20px rgba(251, 146, 60, 0.25)'
          : actualVariant === 'premium'
          ? '0 4px 20px rgba(168, 85, 247, 0.25)'
          : '0 4px 20px rgba(59, 130, 246, 0.2)'
      } : false}
      transition={{
        type: "spring",
        ...ANIMATION.SPRING.GENTLE,
        delay: 0.1
      }}
    >
      {/* Glow Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-40 blur-sm -z-10"
          style={{
            background: actualVariant === 'master' 
              ? 'linear-gradient(45deg, #fbbf24, #f59e0b)' 
              : actualVariant === 'elite'
              ? 'linear-gradient(45deg, #f97316, #ef4444)'
              : actualVariant === 'premium'
              ? 'linear-gradient(45deg, #a855f7, #ec4899)'
              : 'linear-gradient(45deg, #3b82f6, #1d4ed8)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Level Number */}
      <span className="relative z-10 font-extrabold">
        {level}
      </span>

      {/* Sparkle for high levels */}
      {shouldShowSparkle && animated && (
        <motion.div
          className={cn(sparkleVariants({ variant: actualVariant }))}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {level >= 50 ? '👑' : level >= 30 ? '✨' : '💎'}
        </motion.div>
      )}
    </motion.div>
  )
}