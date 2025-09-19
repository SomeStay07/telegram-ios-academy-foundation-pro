import React from 'react'
import { cn } from '../../../lib/utils'
import { profileNameVariants } from './ProfileNameVariants'
import { ProfileNameProps } from './ProfileNameTypes'

/**
 * 🎨 Enhanced ProfileName Component
 * 
 * Современный компонент для отображения имени профиля с полной поддержкой 
 * accessibility, анимаций и различных стилей.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <ProfileName>Тимур Себерда</ProfileName>
 * 
 * // С размером и вариантом
 * <ProfileName size="lg" variant="gradient">
 *   Александр Иванов
 * </ProfileName>
 * 
 * // Центрированное с интерактивностью
 * <ProfileName 
 *   align="center" 
 *   interactive
 *   onClick={() => console.log('Profile clicked')}
 * >
 *   Мария Петрова
 * </ProfileName>
 * 
 * // Gaming стиль для игровых профилей
 * <ProfileName 
 *   variant="gaming" 
 *   size="xl"
 *   as="h1"
 * >
 *   xXx_ProGamer_xXx
 * </ProfileName>
 */
export const ProfileName = React.forwardRef<HTMLHeadingElement, ProfileNameProps>(
  ({
    className,
    size = "md",
    variant = "default", 
    align = "left",
    interactive = false,
    as: Component = "h1",
    onClick,
    children,
    ...props
  }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          profileNameVariants({ 
            size, 
            variant, 
            align,
            interactive 
          }),
          className
        )}
        onClick={onClick}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

ProfileName.displayName = "ProfileName"

// Re-export everything from the modular files
export * from './ProfileNameTypes'
export * from './ProfileNameVariants'
export * from './ProfileNameLogic'