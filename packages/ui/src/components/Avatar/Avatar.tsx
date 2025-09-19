import React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '../../utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const avatarVariants = cva(
  'relative inline-flex shrink-0 overflow-hidden transition-all duration-300 hover:scale-105 ring-2 ring-background/20 shadow-lg',
  {
    variants: {
      size: {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-base',
        xl: 'w-20 h-20 text-lg',
        '2xl': 'w-24 h-24 text-xl',
      },
      variant: {
        circle: 'rounded-full',
        rounded: 'rounded-xl',
      },
      status: {
        default: '',
        premium: 'ring-amber-400/50 shadow-amber-400/25',
        developer: 'ring-blue-400/50 shadow-blue-400/25',
        mentor: 'ring-purple-400/50 shadow-purple-400/25',
        expert: 'ring-green-400/50 shadow-green-400/25',
      }
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
      status: 'default',
    },
  }
)

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
  className?: string
  onClick?: () => void
  online?: boolean
  badge?: React.ReactNode
  style?: React.CSSProperties
}

export function Avatar({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  variant = 'circle',
  status = 'default',
  className,
  onClick,
  online,
  badge,
  style,
  ...props
}: AvatarProps) {
  const initials = fallback || alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <AvatarPrimitive.Root
      className={cn(
        avatarVariants({ size, variant, status }),
        onClick && 'cursor-pointer hover:scale-110 active:scale-95',
        className
      )}
      onClick={onClick}
      style={style}
      {...props}
    >
      <AvatarPrimitive.Image
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-all duration-300 hover:brightness-110"
      />
      <AvatarPrimitive.Fallback className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 font-semibold text-foreground">
        {initials || 'U'}
      </AvatarPrimitive.Fallback>

      {/* Online status indicator */}
      {online !== undefined && (
        <div
          className={cn(
            'absolute bottom-0 right-0 border-2 border-background rounded-full transition-colors',
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
    </AvatarPrimitive.Root>
  )
}

Avatar.displayName = 'Avatar'