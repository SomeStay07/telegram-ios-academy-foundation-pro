import React from 'react'
import { cn } from '../../../lib/utils'
import { UsernameBadgeProps } from './UsernameBadgeTypes'
import { usernameBadgeVariants } from './UsernameBadgeVariants'
import { 
  createClickHandler, 
  isInteractive, 
  createTooltip 
} from './UsernameBadgeLogic'

/**
 * 🎨 Enhanced UsernameBadge Component
 * 
 * Современный компонент для отображения юзернейма с поддержкой различных стилей,
 * интерактивности и accessibility.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <UsernameBadge username="timurceberda" />
 * 
 * // С символом @ и современным стилем
 * <UsernameBadge 
 *   username="alex_dev" 
 *   showAtSymbol
 *   variant="modern"
 *   size="lg"
 * />
 * 
 * // Интерактивный с иконкой и онлайн статусом
 * <UsernameBadge 
 *   username="maria_design"
 *   variant="telegram"
 *   interactive
 *   online
 *   copyOnClick
 *   icon={<VerifiedIcon />}
 * />
 * 
 * // Gaming стиль
 * <UsernameBadge 
 *   username="xXx_ProGamer_xXx"
 *   variant="gaming"
 *   size="xl"
 * />
 */
export const UsernameBadge = React.forwardRef<HTMLSpanElement, UsernameBadgeProps>(
  ({
    className,
    variant = "default",
    size = "md",
    interactive = false,
    online = false,
    username,
    showAtSymbol = true,
    icon,
    onClick,
    copyOnClick = false,
    ...props
  }, ref) => {
    const [copied, setCopied] = React.useState(false)

    const handleClick = createClickHandler(copyOnClick, username, onClick, setCopied)
    const isInteractiveValue = isInteractive(interactive, copyOnClick, onClick)
    const tooltip = createTooltip(copied, copyOnClick)

    return (
      <span
        ref={ref}
        className={cn(
          usernameBadgeVariants({ 
            variant, 
            size, 
            interactive: isInteractiveValue,
            online 
          }),
          className
        )}
        onClick={isInteractiveValue ? handleClick : undefined}
        role={isInteractiveValue ? "button" : undefined}
        tabIndex={isInteractiveValue ? 0 : undefined}
        title={tooltip}
        {...props}
      >
        {/* Символ @ */}
        {showAtSymbol && (
          <span className="opacity-80 font-semibold">@</span>
        )}
        
        {/* Юзернейм */}
        <span className="font-mono tabular-nums whitespace-nowrap">
          {username}
        </span>
        
        {/* Иконка */}
        {icon && (
          <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
            {icon}
          </span>
        )}
        
        {/* Индикатор копирования */}
        {copied && (
          <span className="text-xs opacity-75 ml-1">
            ✓
          </span>
        )}
      </span>
    )
  }
)

UsernameBadge.displayName = "UsernameBadge"

// Re-export types
export type { UsernameBadgeProps, UsernameBadgeVariant, UsernameBadgeSize } from './UsernameBadgeTypes'