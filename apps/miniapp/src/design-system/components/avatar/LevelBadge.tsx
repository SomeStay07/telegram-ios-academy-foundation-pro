import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import { ANIMATION, TYPOGRAPHY, Z_INDEX } from '../../../shared/constants/design-tokens'

const levelBadgeVariants = cva(
  [
    `absolute z-[${Z_INDEX.FLOATING_ELEMENT}] flex items-center justify-center`,
    `rounded-full border-2 backdrop-blur-sm`,
    `font-bold transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`,
    `cursor-default select-none`,
    `shadow-lg transform-gpu will-change-transform`
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gradient-to-br from-blue-500 to-blue-600",
          "border-blue-400/60 text-white",
          "shadow-blue-500/25"
        ],
        premium: [
          "bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500",
          "border-purple-400/60 text-white",
          "shadow-purple-500/30"
        ],
        elite: [
          "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
          "border-orange-400/60 text-white",
          "shadow-orange-500/30"
        ],
        master: [
          "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500",
          "border-yellow-400/60 text-gray-900",
          "shadow-yellow-500/30"
        ]
      },
      size: {
        sm: "w-6 h-6 text-xs min-w-6",
        md: "w-8 h-8 text-sm min-w-8", 
        lg: "w-10 h-10 text-base min-w-10",
        xl: "w-12 h-12 text-lg min-w-12"
      },
      position: {
        'bottom-right': "bottom-1 right-1 transform translate-x-1/3 translate-y-1/3",
        'bottom-left': "bottom-1 left-1 transform -translate-x-1/3 translate-y-1/3",
        'top-right': "top-1 right-1 transform translate-x-1/3 -translate-y-1/3",
        'top-left': "top-1 left-1 transform -translate-x-1/3 -translate-y-1/3"
      },
      animated: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "bottom-right",
      animated: true
    }
  }
)

const glowVariants = cva(
  "absolute inset-0 rounded-full opacity-60 blur-sm -z-10",
  {
    variants: {
      variant: {
        default: "bg-blue-500",
        premium: "bg-purple-500", 
        elite: "bg-orange-500",
        master: "bg-yellow-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

interface LevelBadgeProps {
  level: number
  variant?: 'default' | 'premium' | 'elite' | 'master'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  glow?: boolean
  className?: string
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({
  level,
  variant = "default",
  position = "bottom-right", 
  size = "md",
  animated = true,
  glow = true,
  className
}) => {
  const getVariantByLevel = (level: number) => {
    if (level >= 50) return 'master'
    if (level >= 30) return 'elite' 
    if (level >= 15) return 'premium'
    return 'default'
  }

  const actualVariant = variant === 'default' ? getVariantByLevel(level) : variant

  const badgeContent = (
    <motion.div
      className={cn(levelBadgeVariants({ 
        variant: actualVariant, 
        size, 
        position, 
        animated 
      }), className)}
      style={{
        fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
        fontVariantNumeric: 'tabular-nums'
      }}
      initial={animated ? { scale: 0, rotate: -180 } : false}
      animate={animated ? { scale: 1, rotate: 0 } : false}
      whileHover={animated ? { 
        scale: 1.1, 
        rotate: 5,
        y: -2
      } : false}
      whileTap={animated ? { scale: 0.95 } : false}
      transition={{
        type: "spring",
        ...ANIMATION.SPRING.BOUNCY,
        delay: 0.2
      }}
    >
      {/* Glow Effect */}
      {glow && animated && (
        <motion.div
          className={cn(glowVariants({ variant: actualVariant }))}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Level Number */}
      <span className="relative z-10 font-extrabold leading-none">
        {level}
      </span>

      {/* Sparkle Effect for High Levels */}
      {level >= 30 && animated && (
        <motion.div
          className="absolute -top-1 -right-1 text-xs"
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
          ✨
        </motion.div>
      )}

      {/* Crown Effect for Masters */}
      {level >= 50 && animated && (
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs"
          animate={{
            y: [-2, -4, -2],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👑
        </motion.div>
      )}
    </motion.div>
  )

  return badgeContent
}