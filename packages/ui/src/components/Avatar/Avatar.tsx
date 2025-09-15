import React from 'react'
import { cn } from '../../utils/cn'

export interface AvatarProps {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  variant?: 'circle' | 'rounded'
  className?: string
  onClick?: () => void
  online?: boolean
  badge?: React.ReactNode
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
  '2xl': 'w-24 h-24 text-xl'
}

const radiusClasses = {
  circle: 'rounded-full',
  rounded: 'rounded-xl'
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  variant = 'circle',
  className,
  onClick,
  online,
  badge,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false)
  
  // Debug: log avatar src
  console.log('Avatar - src:', src, 'alt:', alt, 'fallback:', fallback)
  
  const handleImageError = () => {
    console.log('Avatar - Image failed to load:', src)
    setImgError(true)
  }

  const showFallback = !src || imgError
  const initials = fallback || alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  
  console.log('Avatar - showFallback:', showFallback, 'initials:', initials)

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden bg-muted transition-all duration-200',
        sizeClasses[size],
        radiusClasses[variant],
        onClick && 'cursor-pointer hover:scale-105 active:scale-95',
        'ring-2 ring-background shadow-lg',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      ) : (
        <span
          className={cn(
            'font-semibold text-muted-foreground select-none',
            size === 'sm' && 'text-xs',
            size === 'md' && 'text-sm', 
            size === 'lg' && 'text-base',
            size === 'xl' && 'text-lg',
            size === '2xl' && 'text-xl'
          )}
        >
          {initials}
        </span>
      )}

      {/* Online status indicator */}
      {online !== undefined && (
        <div
          className={cn(
            'absolute bottom-0 right-0 border-2 border-background rounded-full',
            online ? 'bg-green-500' : 'bg-gray-400',
            size === 'sm' && 'w-2 h-2',
            size === 'md' && 'w-3 h-3',
            size === 'lg' && 'w-4 h-4',
            size === 'xl' && 'w-5 h-5',
            size === '2xl' && 'w-6 h-6'
          )}
        />
      )}

      {/* Custom badge */}
      {badge && (
        <div className="absolute -top-1 -right-1">
          {badge}
        </div>
      )}
    </div>
  )
}

Avatar.displayName = 'Avatar'