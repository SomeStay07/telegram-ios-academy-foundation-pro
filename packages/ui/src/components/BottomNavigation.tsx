import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../utils/cn'

export interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
  activeIcon?: React.ReactNode
  badge?: string | number
  disabled?: boolean
  href?: string
  onClick?: () => void
}

const bottomNavigationVariants = cva(
  'fixed bottom-0 left-0 right-0 z-50 border-t transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-background/95 backdrop-blur-md border-border shadow-sm',
        filled: 'bg-background/98 backdrop-blur-lg border-border/50 shadow-lg',
        minimal: 'bg-transparent border-transparent',
        floating: 'bg-background/90 backdrop-blur-xl border-border/30 shadow-2xl mx-4 mb-4 rounded-2xl',
        telegram: 'bg-[var(--tg-bg-color,theme(colors.background))] border-[var(--tg-hint-color,theme(colors.border))]'
      },
      size: {
        compact: 'pb-safe-bottom',
        comfortable: 'pb-safe-bottom-lg',
        spacious: 'pb-safe-bottom-xl'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'comfortable'
    }
  }
)

const navItemVariants = cva(
  'relative flex flex-col items-center justify-center gap-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-xs font-medium flex-1 group',
  {
    variants: {
      variant: {
        default: 'py-2 px-1 rounded-lg min-h-[56px]',
        filled: 'py-2 px-1 rounded-xl min-h-[56px]',
        minimal: 'py-3 px-2 min-h-[52px]',
        floating: 'py-3 px-2 rounded-xl min-h-[60px]',
        telegram: 'py-2 px-1 rounded-lg min-h-[56px]'
      },
      state: {
        active: '',
        inactive: ''
      }
    },
    compoundVariants: [
      {
        variant: 'default',
        state: 'active',
        class: 'text-primary bg-primary/10 scale-[1.02]'
      },
      {
        variant: 'default',
        state: 'inactive',
        class: 'text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-[1.02]'
      },
      {
        variant: 'filled',
        state: 'active',
        class: 'text-primary-foreground bg-primary shadow-lg scale-105 -translate-y-1'
      },
      {
        variant: 'filled',
        state: 'inactive',
        class: 'text-muted-foreground hover:text-foreground hover:bg-muted hover:scale-[1.02]'
      },
      {
        variant: 'minimal',
        state: 'active',
        class: 'text-primary'
      },
      {
        variant: 'minimal',
        state: 'inactive',
        class: 'text-muted-foreground hover:text-foreground'
      },
      {
        variant: 'floating',
        state: 'active',
        class: 'text-primary bg-primary/15 shadow-md scale-105'
      },
      {
        variant: 'floating',
        state: 'inactive',
        class: 'text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:scale-[1.02]'
      },
      {
        variant: 'telegram',
        state: 'active',
        class: 'text-[var(--tg-button-color,theme(colors.primary))] bg-[var(--tg-button-color,theme(colors.primary))]/10'
      },
      {
        variant: 'telegram',
        state: 'inactive',
        class: 'text-[var(--tg-hint-color,theme(colors.muted.foreground))] hover:text-[var(--tg-text-color,theme(colors.foreground))]'
      }
    ]
  }
)

export interface BottomNavigationProps extends VariantProps<typeof bottomNavigationVariants> {
  items: NavItem[]
  activeId: string
  className?: string
  onItemClick?: (item: NavItem) => void
  hapticFeedback?: boolean
  animateOnChange?: boolean
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeId,
  className,
  variant = 'default',
  size = 'comfortable',
  onItemClick,
  hapticFeedback = true,
  animateOnChange = true,
}) => {
  const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault()
      return
    }

    // Haptic feedback for Telegram WebApp
    if (hapticFeedback && (window as any).Telegram?.WebApp?.HapticFeedback) {
      (window as any).Telegram.WebApp.HapticFeedback.impactOccurred('light')
    }

    if (item.onClick) {
      event.preventDefault()
      item.onClick()
    }

    onItemClick?.(item)
  }

  // Auto-detect Telegram environment
  const isTelegramEnv = typeof window !== 'undefined' && (window as any).Telegram?.WebApp
  const effectiveVariant = isTelegramEnv && variant === 'default' ? 'telegram' : variant

  const getIconSize = () => {
    switch (size) {
      case 'compact': return 'w-5 h-5'
      case 'spacious': return 'w-6 h-6'
      default: return 'w-5 h-5'
    }
  }

  const getBadgeStyles = (variant: string, isActive: boolean) => {
    const baseStyles = 'absolute -top-1 -right-1 min-w-[16px] h-4 px-1 text-xs font-bold rounded-full flex items-center justify-center border-2 transition-all duration-200'
    
    if (variant === 'telegram') {
      return cn(baseStyles, 'bg-[var(--tg-button-color,theme(colors.destructive))] text-[var(--tg-button-text-color,theme(colors.destructive.foreground))] border-[var(--tg-bg-color,theme(colors.background))]')
    }
    
    return cn(baseStyles, 'bg-destructive text-destructive-foreground border-background', isActive && variant === 'filled' ? 'scale-110' : '')
  }

  return (
    <nav 
      className={cn(bottomNavigationVariants({ variant: effectiveVariant, size }), className)}
      role="tablist"
      aria-label="Bottom navigation"
    >
      <div className={cn(
        "flex items-center max-w-[640px] mx-auto",
        variant === 'floating' ? 'px-3 py-2' : 'px-2 py-1',
        items.length <= 3 ? 'justify-around' : 'justify-between'
      )}>
        {items.map((item) => {
          const isActive = activeId === item.id
          const ItemComponent = item.href ? 'a' : 'button'
          const iconSize = getIconSize()

          return (
            <ItemComponent
              key={item.id}
              href={item.href}
              disabled={item.disabled}
              onClick={(e) => handleItemClick(item, e)}
              className={navItemVariants({ 
                variant: effectiveVariant, 
                state: isActive ? 'active' : 'inactive' 
              })}
              aria-current={isActive ? 'page' : undefined}
              role="tab"
              aria-selected={isActive}
              tabIndex={item.disabled ? -1 : 0}
            >
              {/* Icon container with enhanced animations */}
              <div className="relative flex items-center justify-center">
                <span className={cn(
                  "transition-all duration-300 ease-out",
                  isActive ? {
                    'filled': 'scale-110 rotate-3',
                    'floating': 'scale-110 -translate-y-0.5',
                    'default': 'scale-105',
                    'telegram': 'scale-105',
                    'minimal': 'scale-105'
                  }[effectiveVariant || 'default'] || 'scale-105' : 'scale-100',
                  animateOnChange && isActive ? 'animate-pulse' : ''
                )}>
                  <div className={cn(
                    "flex items-center justify-center transition-colors duration-200",
                    iconSize
                  )}>
                    {React.cloneElement(
                      (isActive && item.activeIcon ? item.activeIcon : item.icon) as React.ReactElement,
                      { className: iconSize }
                    )}
                  </div>
                </span>
                
                {/* Enhanced Badge */}
                {item.badge && (
                  <span className={getBadgeStyles(effectiveVariant || 'default', isActive)}>
                    {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}

                {/* Active glow effect for floating variant */}
                {effectiveVariant === 'floating' && isActive && (
                  <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md -z-10 animate-pulse" />
                )}
              </div>

              {/* Enhanced Label */}
              <span className={cn(
                "truncate max-w-full transition-all duration-200",
                isActive ? "font-semibold" : "font-medium",
                size === 'compact' ? 'text-xs' : 'text-xs',
                isActive && effectiveVariant === 'filled' ? 'scale-105' : ''
              )}>
                {item.label}
              </span>

              {/* Active indicators */}
              {effectiveVariant === 'minimal' && isActive && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
              )}
              
              {effectiveVariant === 'telegram' && isActive && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-[var(--tg-button-color,theme(colors.primary))] rounded-full" />
              )}

              {/* Ripple effect container */}
              <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
                <div className={cn(
                  "absolute inset-0 bg-current opacity-0 group-active:opacity-10 transition-opacity duration-150",
                  effectiveVariant === 'filled' && isActive ? 'bg-white' : 'bg-current'
                )} />
              </div>
            </ItemComponent>
          )
        })}
      </div>

      {/* iOS-style home indicator for floating variant */}
      {variant === 'floating' && (
        <div className="flex justify-center pb-2">
          <div className="w-32 h-1 bg-foreground/20 rounded-full" />
        </div>
      )}
    </nav>
  )
}

BottomNavigation.displayName = 'BottomNavigation'