import React from 'react'
import { motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '../../../lib/utils'
import { ActivityItemProps } from './ActivityItemTypes'

const activityItemVariants = cva(
  "relative flex items-start gap-3 p-3 rounded-lg border transition-all duration-300",
  {
    variants: {
      variant: {
        lesson: "bg-blue-400/10 border-blue-400/20 hover:bg-blue-400/15",
        achievement: "bg-yellow-400/10 border-yellow-400/20 hover:bg-yellow-400/15",
        streak: "bg-orange-400/10 border-orange-400/20 hover:bg-orange-400/15",
        xp: "bg-green-400/10 border-green-400/20 hover:bg-green-400/15",
        challenge: "bg-purple-400/10 border-purple-400/20 hover:bg-purple-400/15",
        social: "bg-pink-400/10 border-pink-400/20 hover:bg-pink-400/15"
      },
      size: {
        sm: "p-2 gap-2",
        md: "p-3 gap-3",
        lg: "p-4 gap-4"
      },
      animated: {
        true: "hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer",
        false: ""
      }
    },
    defaultVariants: {
      variant: "lesson",
      size: "md",
      animated: false
    }
  }
)

const iconVariants = cva(
  "flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300",
  {
    variants: {
      variant: {
        lesson: "bg-blue-400/20 text-blue-400",
        achievement: "bg-yellow-400/20 text-yellow-400",
        streak: "bg-orange-400/20 text-orange-400",
        xp: "bg-green-400/20 text-green-400",
        challenge: "bg-purple-400/20 text-purple-400",
        social: "bg-pink-400/20 text-pink-400"
      },
      size: {
        sm: "w-6 h-6",
        md: "w-8 h-8",
        lg: "w-10 h-10"
      }
    },
    defaultVariants: {
      variant: "lesson",
      size: "md"
    }
  }
)

const titleVariants = cva(
  "font-medium transition-colors duration-300",
  {
    variants: {
      size: {
        sm: "text-sm",
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

const timestampVariants = cva(
  "text-white/40 font-mono transition-colors duration-300",
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

export const ActivityItem: React.FC<ActivityItemProps> = ({
  icon: IconComponent,
  title,
  description,
  timestamp,
  variant = "lesson",
  size = "md",
  animated = false,
  showConnector = false,
  className,
  onClick,
  style,
  ...props
}) => {
  const ItemComponent = animated ? motion.div : 'div'
  
  const itemProps = animated ? {
    whileHover: { scale: 1.02, y: -2 },
    whileTap: { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  } : {}

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  return (
    <div className="relative">
      <ItemComponent
        className={cn(activityItemVariants({ variant, size, animated }), className)}
        onClick={onClick}
        style={{
          fontFamily: 'var(--font-gaming)',
          ...style
        }}
        {...itemProps}
        {...props}
      >
        {/* Timeline Connector */}
        {showConnector && (
          <div className="absolute left-7 top-12 w-0.5 h-4 bg-white/10" />
        )}

        {/* Activity Icon */}
        <div className={cn(iconVariants({ variant, size }))}>
          <IconComponent className={cn(iconSize)} />
        </div>
        
        {/* Activity Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Timestamp Row */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className={cn(titleVariants({ size }), "text-white/90 flex-1")}>
              {title}
            </div>
            <div className={cn(timestampVariants({ size }))}>
              {timestamp}
            </div>
          </div>
          
          {/* Description */}
          {description && (
            <div className={cn(descriptionVariants({ size }))}>
              {description}
            </div>
          )}
        </div>
      </ItemComponent>
    </div>
  )
}