import React from 'react'
import { cn } from '../../../lib/utils'
import type { AvatarProps } from './AvatarTypes'
import { avatarVariants, statusVariants } from './AvatarVariants'
import { 
  getInitials,
  DefaultUserIcon,
  createAvatarAccessibilityProps,
  handleImageError 
} from './AvatarLogic'

/**
 * 🎨 Enhanced Avatar Component
 * 
 * Современный аватар с полной поддержкой accessibility, анимаций и состояний.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <Avatar src="/user.jpg" alt="Пользователь" />
 * 
 * // С инициалами
 * <Avatar name="Иван Петров" size="lg" />
 * 
 * // С статусом и интерактивностью
 * <Avatar 
 *   src="/user.jpg"
 *   status="online"
 *   showStatus
 *   interactive
 *   ring="primary"
 *   onClick={() => console.log('avatar clicked')}
 * />
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({
    className,
    imageClassName,
    size = "md",
    shape = "circle",
    variant = "default",
    src,
    alt,
    initials,
    name,
    icon,
    status,
    showStatus = false,
    interactive = false,
    ring = false,
    onClick,
    ...props
  }, ref) => {
    // Определяем отображаемые инициалы
    const displayInitials = initials || (name ? getInitials(name) : '')
    
    // Определяем, показывать ли статус
    const shouldShowStatus = showStatus && status
    
    // Определяем кольцо
    const ringVariant = ring === true ? true : ring
    
    const accessibilityProps = createAvatarAccessibilityProps(interactive)

    return (
      <div
        ref={ref}
        className={cn(
          avatarVariants({ 
            size, 
            shape, 
            variant,
            interactive,
            ring: ringVariant 
          }),
          className
        )}
        onClick={onClick}
        {...accessibilityProps}
        {...props}
      >
        {/* Изображение */}
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className={cn(
              "h-full w-full object-cover",
              imageClassName
            )}
            onError={handleImageError}
          />
        ) : icon ? (
          /* Иконка */
          <div className="flex items-center justify-center h-full w-full">
            {icon}
          </div>
        ) : displayInitials ? (
          /* Инициалы */
          <span className="font-semibold leading-none">
            {displayInitials}
          </span>
        ) : (
          /* Дефолтная иконка пользователя */
          <DefaultUserIcon />
        )}

        {/* Статус */}
        {shouldShowStatus && (
          <div
            className={cn(
              statusVariants({ 
                size, 
                status 
              })
            )}
            aria-label={`Статус: ${status}`}
          />
        )}

        {/* Эффект hover для интерактивных аватаров */}
        {interactive && (
          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-200 rounded-inherit" />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"