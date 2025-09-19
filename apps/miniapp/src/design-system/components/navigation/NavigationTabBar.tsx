import React from 'react'
import { cn } from '../../../lib/utils'
import { getTelegramApi } from '../../../lib/telegram/api'
import type { NavigationTabBarProps, NavigationTabItemProps } from './NavigationTabBarTypes'
import {
  navigationTabBarVariants,
  navigationTabBarContainerVariants,
  navigationTabItemVariants,
  navigationTabIconVariants,
  navigationTabLabelVariants,
  navigationTabIndicatorVariants,
  navigationTabRippleVariants,
  navigationTabRippleEffectVariants
} from './NavigationTabBarVariants'

/**
 * 🎯 NavigationTabItem Component
 * Отдельный элемент таба навигации с поддержкой всех интерактивных состояний
 */
const NavigationTabItem = React.memo<NavigationTabItemProps>(({
  item,
  isActive,
  size,
  variant,
  onClick
}) => {
  const handleClick = () => {
    if (!item.disabled) {
      onClick(item)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <div
      role="tab"
      tabIndex={item.disabled ? -1 : 0}
      aria-selected={isActive}
      aria-disabled={item.disabled}
      aria-label={item.label}
      className={cn(
        navigationTabItemVariants({ size, variant, isActive }),
        item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Active Indicator */}
      {isActive && (
        <div 
          className={navigationTabIndicatorVariants({ variant })}
          aria-hidden="true"
        />
      )}
      
      {/* Ripple Effect Container */}
      <div 
        className={navigationTabRippleVariants({ variant })}
        aria-hidden="true"
      >
        <div className={navigationTabRippleEffectVariants({ variant })} />
      </div>
      
      {/* Icon */}
      <item.icon 
        className={navigationTabIconVariants({ size, variant, isActive })}
        aria-hidden="true"
      />
      
      {/* Label */}
      <span className={navigationTabLabelVariants({ size, variant, isActive })}>
        {item.label}
      </span>

      {/* Badge */}
      {item.badge && (
        <div className="absolute -top-1 -right-1" aria-hidden="true">
          {item.badge}
        </div>
      )}
    </div>
  )
})

NavigationTabItem.displayName = "NavigationTabItem"

/**
 * 🧭 NavigationTabBar Component
 * 
 * Современный компонент навигации для мобильных приложений с поддержкой:
 * - Множественных вариантов дизайна (default, minimal, glassmorphism)
 * - Адаптивных размеров (sm, md, lg)
 * - Полной accessibility поддержки
 * - Анимаций и интерактивных состояний
 * - Telegram WebApp интеграции
 * 
 * @example
 * // Базовое использование
 * <NavigationTabBar
 *   tabs={navigationTabs}
 *   currentPath="/profile"
 *   onTabClick={(item) => navigate(item.path)}
 * />
 * 
 * // С кастомизацией
 * <NavigationTabBar
 *   tabs={tabs}
 *   currentPath={pathname}
 *   variant="glassmorphism"
 *   size="lg"
 *   maxWidth="lg"
 *   onTabClick={handleNavigation}
 * />
 */
export const NavigationTabBar = React.forwardRef<HTMLElement, NavigationTabBarProps>(
  ({
    tabs,
    currentPath,
    size = 'md',
    variant = 'default',
    maxWidth = 'md',
    onTabClick,
    className,
    ...props
  }, ref) => {
    
    const handleTabClick = (item: NavigationTabBarProps['tabs'][0]) => {
      // Вызываем пользовательский коллбек
      onTabClick?.(item)
      
      // Интеграция с Telegram WebApp для haptic feedback
      try {
        const api = getTelegramApi()
        api.hapticSelectionChanged()
        
        // Скроллим наверх при клике на активный таб
        if (currentPath.startsWith(item.path)) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch (error) {
        // Игнорируем ошибки API
        console.debug('Telegram API not available:', error)
      }
    }

    return (
      <nav
        ref={ref}
        role="tablist" 
        aria-orientation="horizontal"
        className={cn(
          navigationTabBarVariants({ variant }),
          className
        )}
        {...props}
      >
        <div className={navigationTabBarContainerVariants({ maxWidth })}>
          {tabs.map((tab) => {
            const isActive = currentPath.startsWith(tab.path)
            
            return (
              <NavigationTabItem
                key={tab.id}
                item={tab}
                isActive={isActive}
                size={size}
                variant={variant}
                onClick={handleTabClick}
              />
            )
          })}
        </div>
      </nav>
    )
  }
)

NavigationTabBar.displayName = "NavigationTabBar"