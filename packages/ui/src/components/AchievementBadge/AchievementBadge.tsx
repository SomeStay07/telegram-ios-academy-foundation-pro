import React from 'react'
import { cn } from '../../utils/cn'

export interface AchievementBadgeProps {
  title: string
  description?: string
  icon?: React.ReactNode
  emoji?: string
  unlocked?: boolean
  progress?: number // 0-100, shown only if not unlocked
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  date?: string
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
}

const tierConfig = {
  bronze: {
    bg: 'bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-800/20',
    border: 'border-amber-300 dark:border-amber-700',
    glow: 'shadow-amber-500/20',
    icon: 'text-amber-700 dark:text-amber-400'
  },
  silver: {
    bg: 'bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/20 dark:to-slate-700/20',
    border: 'border-gray-300 dark:border-gray-600',
    glow: 'shadow-gray-500/20',
    icon: 'text-gray-700 dark:text-gray-400'
  },
  gold: {
    bg: 'bg-gradient-to-br from-yellow-100 to-amber-200 dark:from-yellow-900/20 dark:to-amber-800/20',
    border: 'border-yellow-400 dark:border-yellow-600',
    glow: 'shadow-yellow-500/30',
    icon: 'text-yellow-700 dark:text-yellow-400'
  },
  platinum: {
    bg: 'bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/20 dark:to-indigo-800/20',
    border: 'border-blue-400 dark:border-blue-600',
    glow: 'shadow-blue-500/30',
    icon: 'text-blue-700 dark:text-blue-400'
  },
  diamond: {
    bg: 'bg-gradient-to-br from-purple-100 to-pink-200 dark:from-purple-900/20 dark:to-pink-800/20',
    border: 'border-purple-400 dark:border-purple-600',
    glow: 'shadow-purple-500/40',
    icon: 'text-purple-700 dark:text-purple-400'
  }
}

const rarityConfig = {
  common: { indicator: '●', color: 'text-gray-500' },
  rare: { indicator: '◆', color: 'text-blue-500' },
  epic: { indicator: '★', color: 'text-purple-500' },
  legendary: { indicator: '♦', color: 'text-orange-500' }
}

const sizeConfig = {
  sm: {
    container: 'w-20 h-24',
    icon: 'w-8 h-8 text-lg',
    title: 'text-xs',
    description: 'text-[10px]',
    date: 'text-[9px]'
  },
  md: {
    container: 'w-24 h-28',
    icon: 'w-10 h-10 text-xl',
    title: 'text-sm',
    description: 'text-xs',
    date: 'text-[10px]'
  },
  lg: {
    container: 'w-32 h-36',
    icon: 'w-12 h-12 text-2xl',
    title: 'text-base',
    description: 'text-sm',
    date: 'text-xs'
  }
}

export function AchievementBadge({
  title,
  description,
  icon,
  emoji,
  unlocked = false,
  progress,
  tier = 'bronze',
  size = 'md',
  className,
  onClick,
  date,
  rarity = 'common',
  ...props
}: AchievementBadgeProps) {
  const tierStyles = tierConfig[tier]
  const rarityStyles = rarityConfig[rarity]
  const sizeStyles = sizeConfig[size]

  return (
    <div
      className={cn(
        'relative flex flex-col items-center p-3 rounded-xl border-2 transition-all duration-300',
        sizeStyles.container,
        unlocked 
          ? cn(tierStyles.bg, tierStyles.border, 'shadow-lg', tierStyles.glow)
          : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700',
        onClick && 'cursor-pointer hover:scale-105 active:scale-95',
        !unlocked && 'opacity-60',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Rarity indicator */}
      {unlocked && (
        <div className={cn(
          'absolute -top-1 -right-1 text-sm',
          rarityStyles.color
        )}>
          {rarityStyles.indicator}
        </div>
      )}

      {/* Unlock date */}
      {unlocked && date && (
        <div className={cn(
          'absolute -top-2 left-1/2 transform -translate-x-1/2 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-full border text-center whitespace-nowrap',
          sizeStyles.date,
          'text-muted-foreground border-border'
        )}>
          {date}
        </div>
      )}

      {/* Icon/Emoji */}
      <div className={cn(
        'flex items-center justify-center mb-2 transition-transform duration-300',
        sizeStyles.icon,
        unlocked ? tierStyles.icon : 'text-gray-400 dark:text-gray-600',
        onClick && unlocked && 'group-hover:scale-110'
      )}>
        {emoji ? (
          <span className={sizeStyles.icon.includes('text-lg') ? 'text-lg' : 
                           sizeStyles.icon.includes('text-xl') ? 'text-xl' : 'text-2xl'}>
            {emoji}
          </span>
        ) : icon}
      </div>

      {/* Title */}
      <div className={cn(
        'font-semibold text-center leading-tight mb-1',
        sizeStyles.title,
        unlocked ? tierStyles.icon : 'text-gray-500 dark:text-gray-500'
      )}>
        {title}
      </div>

      {/* Description */}
      {description && (
        <div className={cn(
          'text-center leading-tight opacity-75',
          sizeStyles.description,
          unlocked ? tierStyles.icon : 'text-gray-400 dark:text-gray-600'
        )}>
          {description}
        </div>
      )}

      {/* Progress bar for locked achievements */}
      {!unlocked && progress !== undefined && (
        <div className="absolute bottom-1 left-2 right-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
            <div 
              className="bg-primary h-1 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
          <div className={cn(
            'text-center mt-0.5',
            sizeStyles.date,
            'text-muted-foreground'
          )}>
            {Math.round(progress)}%
          </div>
        </div>
      )}

      {/* Shimmer effect for unlocked achievements */}
      {unlocked && onClick && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-xl" />
      )}

      {/* Glow animation for newly unlocked */}
      {unlocked && (
        <div className={cn(
          'absolute inset-0 rounded-xl opacity-0 animate-pulse',
          tierStyles.bg
        )} />
      )}
    </div>
  )
}

AchievementBadge.displayName = 'AchievementBadge'