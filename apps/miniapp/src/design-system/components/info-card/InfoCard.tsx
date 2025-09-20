import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import { InfoCardProps } from './InfoCardTypes'

const infoCardVariants = cva(
  "relative backdrop-blur-sm rounded-lg border transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-indigo-400/10 border-indigo-400/20 text-indigo-400/80",
        success: "bg-green-400/10 border-green-400/20 text-green-400/80", 
        warning: "bg-orange-400/10 border-orange-400/20 text-orange-400/80",
        info: "bg-blue-400/10 border-blue-400/20 text-blue-400/80",
        purple: "bg-purple-400/10 border-purple-400/20 text-purple-400/80",
        green: "bg-green-400/10 border-green-400/20 text-green-400/80",
        blue: "bg-blue-400/10 border-blue-400/20 text-blue-400/80",
        orange: "bg-orange-400/10 border-orange-400/20 text-orange-400/80"
      },
      size: {
        sm: "p-2",
        md: "p-3", 
        lg: "p-4"
      },
      animated: {
        true: "hover:scale-[1.02] hover:-translate-y-1 cursor-pointer",
        false: ""
      },
      glow: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      animated: false,
      glow: false
    }
  }
)

const iconVariants = cva(
  "flex-shrink-0 transition-all duration-300",
  {
    variants: {
      size: {
        sm: "w-3 h-3",
        md: "w-4 h-4", 
        lg: "w-5 h-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const titleVariants = cva(
  "font-medium transition-colors duration-300",
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

const valueVariants = cva(
  "font-bold transition-colors duration-300",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-sm", 
        lg: "text-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

const subtitleVariants = cva(
  "text-white/60 transition-colors duration-300",
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

export const InfoCard: React.FC<InfoCardProps> = ({
  icon: IconComponent,
  title,
  value,
  subtitle,
  variant = "primary",
  size = "md",
  animated = false,
  glow = false,
  className,
  onClick,
  style,
  ...props
}) => {
  const CardComponent = animated ? motion.div : 'div'
  
  const cardProps = animated ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } : {}

  return (
    <CardComponent
      className={cn(infoCardVariants({ variant, size, animated, glow }), className)}
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-gaming)',
        ...style
      }}
      {...cardProps}
      {...props}
    >
      {/* Glow effect for special variants */}
      {glow && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            repeatDelay: 2
          }}
        />
      )}

      <div className="relative z-10 flex items-center gap-2">
        {/* Icon with pulsing effect for important items */}
        <div className="relative">
          <IconComponent className={cn(iconVariants({ size }))} />
          {glow && (
            <motion.div
              className="absolute -inset-1 bg-current rounded-full opacity-30"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Value - most prominent */}
          <div 
            className={cn(valueVariants({ size }))}
            style={{ 
              fontVariantNumeric: 'tabular-nums',
              color: 'currentColor'
            }}
          >
            {value}
          </div>
          
          {/* Title */}
          <div className={cn(titleVariants({ size }), "text-white/80")}>
            {title}
          </div>
          
          {/* Subtitle if provided */}
          {subtitle && (
            <div className={cn(subtitleVariants({ size }))}>
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </CardComponent>
  )
}