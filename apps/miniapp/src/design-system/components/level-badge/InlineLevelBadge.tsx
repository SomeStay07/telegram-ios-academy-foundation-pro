import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import { ANIMATION, TYPOGRAPHY, Z_INDEX } from '../../../shared/constants/design-tokens'

const inlineLevelBadgeVariants = cva(
  [
    `inline-flex items-center justify-center`,
    `rounded-full px-3 py-1 ml-2`,
    `font-semibold text-xs leading-none`,
    `transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`,
    `cursor-default select-none`,
    `transform-gpu will-change-transform`,
    `backdrop-blur-sm border`
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-white/15 border-white/25",
          "text-gray-700 dark:text-gray-200",
          "shadow-sm"
        ],
        premium: [
          "bg-white/20 border-white/30",
          "text-gray-600 dark:text-gray-100",
          "shadow-md"
        ],
        elite: [
          "bg-gradient-to-r from-white/25 to-white/20",
          "border-white/35 text-gray-600 dark:text-gray-100",
          "shadow-lg"
        ],
        master: [
          "bg-gradient-to-r from-yellow-400/10 via-white/25 to-yellow-400/10",
          "border-yellow-400/20 text-gray-700 dark:text-yellow-100",
          "shadow-lg shadow-yellow-400/5"
        ]
      },
      size: {
        sm: "min-w-[2rem]",
        md: "min-w-[2.5rem]", 
        lg: "min-w-[3rem]"
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

  return (
    <motion.div
      className={cn(inlineLevelBadgeVariants({ 
        variant: actualVariant, 
        size, 
        animated 
      }), className)}
      style={{
        fontFamily: TYPOGRAPHY.FONT_FAMILY.GAMING,
        fontVariantNumeric: 'tabular-nums',
        padding: 'clamp(0.25rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 0.75rem)',
        fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
        lineHeight: '1.2'
      }}
      initial={animated ? { scale: 0, opacity: 0 } : false}
      animate={animated ? { scale: 1, opacity: 1 } : false}
      whileHover={animated ? { 
        scale: 1.02,
        y: -1,
        backgroundColor: actualVariant === 'master' 
          ? 'rgba(255, 255, 255, 0.3)' 
          : 'rgba(255, 255, 255, 0.25)'
      } : false}
      transition={{
        type: "spring",
        ...ANIMATION.SPRING.GENTLE,
        delay: 0.1
      }}
    >
      {/* Subtle Glow Effect - Only for Master */}
      {animated && actualVariant === 'master' && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-20 blur-sm -z-10"
          style={{
            background: 'linear-gradient(45deg, rgba(251, 191, 36, 0.3), rgba(245, 158, 11, 0.2))'
          }}
          animate={{
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Level Number */}
      <span className="relative z-10 font-extrabold">
        {level}
      </span>

      {/* Subtle Icon for very high levels */}
      {level >= 50 && animated && (
        <motion.div
          className="absolute -top-1 -right-1 text-xs pointer-events-none text-yellow-600 dark:text-yellow-400 opacity-60"
          animate={{
            scale: [0.9, 1, 0.9]
          }}
          transition={{
            duration: ANIMATION.DURATION.SLOWEST / 1000 * 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👑
        </motion.div>
      )}
    </motion.div>
  )
}