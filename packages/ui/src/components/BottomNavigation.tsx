import React from 'react'
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

export interface BottomNavigationProps {
  items: NavItem[]
  activeId: string
  className?: string
  variant?: 'default' | 'filled' | 'minimal'
  onItemClick?: (item: NavItem) => void
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  items,
  activeId,
  className,
  variant = 'default',
  onItemClick,
}) => {
  const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
    if (item.disabled) {
      event.preventDefault()
      return
    }

    if (item.onClick) {
      event.preventDefault()
      item.onClick()
    }

    onItemClick?.(item)
  }

  const getItemStyles = (item: NavItem, isActive: boolean) => {
    const baseStyles = cn(
      "relative flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "text-xs font-medium min-h-[56px] flex-1"
    )

    switch (variant) {
      case 'filled':
        return cn(
          baseStyles,
          isActive
            ? "bg-primary text-primary-foreground shadow-lg scale-105"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )
      case 'minimal':
        return cn(
          baseStyles,
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )
      default:
        return cn(
          baseStyles,
          isActive
            ? "text-primary bg-primary/10"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
        )
    }
  }

  const getContainerStyles = () => {
    return cn(
      "fixed bottom-0 left-0 right-0 z-50",
      "bg-background/95 backdrop-blur-md border-t border-border",
      "safe-area-bottom"
    )
  }

  return (
    <nav className={cn(getContainerStyles(), className)}>
      <div className="flex items-center justify-around px-2 py-1 max-w-[640px] mx-auto">
        {items.map((item) => {
          const isActive = activeId === item.id
          const ItemComponent = item.href ? 'a' : 'button'

          return (
            <ItemComponent
              key={item.id}
              href={item.href}
              disabled={item.disabled}
              onClick={(e) => handleItemClick(item, e)}
              className={getItemStyles(item, isActive)}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Icon container with badge */}
              <div className="relative flex items-center justify-center">
                <span className={cn(
                  "transition-transform duration-200",
                  isActive && variant === 'filled' ? "scale-110" : ""
                )}>
                  {isActive && item.activeIcon ? item.activeIcon : item.icon}
                </span>
                
                {/* Badge */}
                {item.badge && (
                  <span className={cn(
                    "absolute -top-1 -right-1 min-w-[16px] h-4 px-1",
                    "bg-destructive text-destructive-foreground text-xs font-bold",
                    "rounded-full flex items-center justify-center",
                    "border-2 border-background"
                  )}>
                    {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={cn(
                "truncate max-w-full",
                isActive ? "font-semibold" : ""
              )}>
                {item.label}
              </span>

              {/* Active indicator for minimal variant */}
              {variant === 'minimal' && isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </ItemComponent>
          )
        })}
      </div>
    </nav>
  )
}

BottomNavigation.displayName = 'BottomNavigation'