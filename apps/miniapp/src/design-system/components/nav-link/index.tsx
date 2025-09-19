import React from 'react'
import { cn } from '../../../lib/utils'
import { NavLinkProps } from './NavLinkTypes'
import { navLinkVariants } from './NavLinkVariants'
import { 
  isCurrentPage, 
  handleSmoothScroll, 
  getEffectiveVariant, 
  hasIcon 
} from './NavLinkLogic'

/**
 * 🎨 Enhanced NavLink Component
 * 
 * Современный компонент навигационной ссылки с полной поддержкой accessibility,
 * различных состояний и стилей.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <NavLink href="#overview">Обзор</NavLink>
 * 
 * // С иконкой и активным состоянием
 * <NavLink 
 *   href="/dashboard" 
 *   icon={<DashboardIcon />}
 *   variant="primary"
 *   isActive
 * >
 *   Дашборд
 * </NavLink>
 * 
 * // Боковая навигация
 * <NavLink 
 *   href="#settings"
 *   variant="sidebar"
 *   size="md"
 *   icon={<SettingsIcon />}
 * >
 *   Настройки
 * </NavLink>
 * 
 * // Внешняя ссылка
 * <NavLink 
 *   href="https://example.com"
 *   external
 *   icon={<ExternalIcon />}
 * >
 *   Документация
 * </NavLink>
 */
export const NavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({
    className,
    variant = "default",
    size = "sm", 
    withIcon,
    isActive: propIsActive,
    disabled = false,
    href,
    children,
    icon,
    external = false,
    onClick,
    ...props
  }, ref) => {
    // Автоматическое определение активности если не передано
    const isActive = propIsActive ?? isCurrentPage(href)
    
    // Определяем вариант на основе активности
    const effectiveVariant = getEffectiveVariant(isActive, variant)
    
    // Определяем наличие иконки
    const hasIconValue = hasIcon(withIcon, icon)

    const handleClick = disabled 
      ? (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()
      : handleSmoothScroll(href, external, onClick)

    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          navLinkVariants({ 
            variant: effectiveVariant, 
            size, 
            withIcon: hasIconValue,
            isActive,
            disabled 
          }),
          className
        )}
        onClick={handleClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-current={isActive ? "page" : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        {...props}
      >
        {/* Иконка */}
        {icon && (
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
            {icon}
          </span>
        )}
        
        {/* Текст ссылки */}
        <span className={cn(
          "flex-1",
          hasIconValue && "truncate"
        )}>
          {children}
        </span>
        
        {/* Индикатор внешней ссылки */}
        {external && (
          <span className="flex-shrink-0 w-3 h-3 opacity-60">
            <svg viewBox="0 0 12 12" fill="currentColor">
              <path d="M3.5 3C3.22386 3 3 3.22386 3 3.5C3 3.77614 3.22386 4 3.5 4H7.29289L3.14645 8.14645C2.95118 8.34171 2.95118 8.65829 3.14645 8.85355C3.34171 9.04882 3.65829 9.04882 3.85355 8.85355L8 4.70711V8.5C8 8.77614 8.22386 9 8.5 9C8.77614 9 9 8.77614 9 8.5V3.5C9 3.22386 8.77614 3 8.5 3H3.5Z"/>
            </svg>
          </span>
        )}
        
        {/* Активный индикатор */}
        {isActive && !disabled && (
          <span 
            className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-indigo-500 rounded-r-full"
            aria-hidden="true"
          />
        )}
      </a>
    )
  }
)

NavLink.displayName = "NavLink"

// Re-export types
export type { NavLinkProps, NavLinkVariant, NavLinkSize } from './NavLinkTypes'