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
  showText?: boolean
  className?: string
}

export const InlineLevelBadge: React.FC<InlineLevelBadgeProps> = ({
  level,
  variant = "default",
  size = "md",
  animated = true,
  showSparkle = true,
  showText = false,
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
        scale: 1.05,
        y: -2,
        boxShadow: actualVariant === 'master' 
          ? '0 8px 25px rgba(251, 191, 36, 0.4), 0 0 20px rgba(251, 191, 36, 0.3)' 
          : actualVariant === 'elite'
          ? '0 8px 25px rgba(251, 146, 60, 0.3), 0 0 20px rgba(251, 146, 60, 0.25)'
          : actualVariant === 'premium'
          ? '0 8px 25px rgba(168, 85, 247, 0.3), 0 0 20px rgba(168, 85, 247, 0.25)'
          : '0 8px 25px rgba(59, 130, 246, 0.25), 0 0 20px rgba(59, 130, 246, 0.2)'
      } : false}
      transition={{
        type: "spring",
        ...ANIMATION.SPRING.GENTLE,
        delay: 0.1
      }}
    >
      {/* Enhanced Glow Effect for Higher Levels */}
      {animated && actualVariant !== 'default' && (
        <motion.div
          className="absolute -inset-1 rounded-full blur-sm -z-10"
          style={{
            background: actualVariant === 'master' 
              ? 'linear-gradient(45deg, rgba(251, 191, 36, 0.4), rgba(245, 158, 11, 0.3))' 
              : actualVariant === 'elite'
              ? 'linear-gradient(45deg, rgba(251, 146, 60, 0.3), rgba(239, 68, 68, 0.25))'
              : 'linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.25))'
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: actualVariant === 'master' ? 2.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Shimmer Effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-full opacity-0"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.6) 50%, transparent 70%)',
          }}
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-1.5 font-extrabold">
        {showText && (
          <span className="text-xs opacity-80">
            Уровень
          </span>
        )}
        <span>
          {level}
        </span>
      </div>

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