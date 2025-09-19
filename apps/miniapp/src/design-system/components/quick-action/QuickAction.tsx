import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '../../../lib/utils'
import { QuickActionProps } from './QuickActionTypes'

const quickActionVariants = cva(
  "relative flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-300 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400/50",
        secondary: "bg-white/10 border-white/20 text-white/80 hover:bg-white/15 hover:border-white/30",
        success: "bg-green-500/20 border-green-400/30 text-green-300 hover:bg-green-500/30 hover:border-green-400/50",
        warning: "bg-orange-500/20 border-orange-400/30 text-orange-300 hover:bg-orange-500/30 hover:border-orange-400/50",
        danger: "bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 hover:border-red-400/50",
        fire: "bg-gradient-to-br from-orange-500/30 to-red-500/30 border-orange-400/50 text-orange-200 hover:from-orange-500/40 hover:to-red-500/40",
        premium: "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400/50 text-purple-200 hover:from-purple-500/40 hover:to-pink-500/40"
      },
      size: {
        sm: "p-2 gap-1 min-w-16",
        md: "p-3 gap-2 min-w-20",
        lg: "p-4 gap-3 min-w-24"
      },
      state: {
        default: "",
        loading: "pointer-events-none opacity-75",
        disabled: "pointer-events-none opacity-50 grayscale",
        active: "ring-2 ring-white/30"
      },
      glow: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      variant: "secondary",
      size: "md", 
      state: "default",
      glow: false
    }
  }
)

const iconVariants = cva(
  "transition-all duration-300",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const labelVariants = cva(
  "font-medium text-center transition-colors duration-300",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const descriptionVariants = cva(
  "text-center opacity-70 transition-colors duration-300",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs", 
        lg: "text-sm"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const badgeVariants = cva(
  "absolute -top-1 -right-1 flex items-center justify-center rounded-full text-white text-xs font-bold min-w-5 h-5 px-1",
  {
    variants: {
      color: {
        red: "bg-red-500 border-2 border-red-400",
        blue: "bg-blue-500 border-2 border-blue-400",
        green: "bg-green-500 border-2 border-green-400",
        yellow: "bg-yellow-500 border-2 border-yellow-400",
        purple: "bg-purple-500 border-2 border-purple-400",
        orange: "bg-orange-500 border-2 border-orange-400"
      }
    },
    defaultVariants: {
      color: "red"
    }
  }
)

export const QuickAction: React.FC<QuickActionProps> = ({
  icon: IconComponent,
  label,
  description,
  variant = "secondary",
  size = "md",
  state = "default", 
  glow = false,
  pulse = false,
  badge,
  badgeColor = "red",
  className,
  onClick,
  style,
  ...props
}) => {
  const getGlowStyle = () => {
    if (!glow) return {}
    
    const glowColors = {
      primary: '59, 130, 246',
      secondary: '255, 255, 255',
      success: '34, 197, 94',
      warning: '251, 146, 60',
      danger: '239, 68, 68',
      fire: '251, 146, 60',
      premium: '168, 85, 247'
    }
    
    const color = glowColors[variant] || '255, 255, 255'
    return {
      boxShadow: `0 0 20px rgba(${color}, 0.3), 0 0 8px rgba(${color}, 0.2)`
    }
  }

  const buttonProps = {
    whileHover: { 
      scale: 1.05,
      y: -2,
      ...getGlowStyle()
    },
    whileTap: { scale: 0.95 },
    transition: { 
      type: "spring", 
      stiffness: 400, 
      damping: 25 
    }
  }

  const pulseProps = pulse ? {
    animate: { 
      scale: [1, 1.02, 1],
      opacity: [0.9, 1, 0.9]
    },
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  } : {}

  return (
    <motion.button
      className={cn(quickActionVariants({ variant, size, state, glow }), className)}
      onClick={state === 'loading' || state === 'disabled' ? undefined : onClick}
      style={{
        fontFamily: 'var(--font-gaming)',
        ...style
      }}
      {...buttonProps}
      {...pulseProps}
      {...props}
    >
      {/* Badge */}
      {badge && (
        <motion.div
          className={cn(badgeVariants({ color: badgeColor }))}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          {badge}
        </motion.div>
      )}

      {/* Glow Effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.02, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: variant === 'fire' 
              ? 'linear-gradient(45deg, rgba(251, 146, 60, 0.1), rgba(239, 68, 68, 0.1))'
              : variant === 'premium'
              ? 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))'
              : 'rgba(255, 255, 255, 0.05)'
          }}
        />
      )}

      {/* Icon */}
      <div className="relative">
        {state === 'loading' ? (
          <Loader2 className={cn(iconVariants({ size }), "animate-spin")} />
        ) : (
          <IconComponent className={cn(iconVariants({ size }))} />
        )}
        
        {/* Fire effect for fire variant */}
        {variant === 'fire' && !state && (
          <motion.div
            className="absolute -inset-1 pointer-events-none"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔥
          </motion.div>
        )}
      </div>

      {/* Label */}
      <div className={cn(labelVariants({ size }))}>
        {label}
      </div>

      {/* Description */}
      {description && (
        <div className={cn(descriptionVariants({ size }))}>
          {description}
        </div>
      )}

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pointer-events-none rounded-inherit"
        whileHover={{
          opacity: 1,
          x: ['-100%', '100%'],
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
      />
    </motion.button>
  )
}