import React from 'react'
import { cn } from '../../../lib/utils'
import type { TypographyProps } from './TypographyTypes'
import { typographyVariants } from './TypographyVariants'
import { createTypographyAccessibilityProps } from './TypographyLogic'

/**
 * 🎨 Enhanced Typography Component
 * 
 * Современный компонент типографики с полной шкалой размеров и стилей.
 * Основан на принципах accessibility и responsive design.
 * 
 * @example
 * // Заголовки
 * <Typography variant="display-xl" as="h1">Главный заголовок</Typography>
 * <Typography variant="heading-lg" as="h2">Заголовок секции</Typography>
 * 
 * // Основной текст
 * <Typography variant="body-lg">Крупный текст для важной информации</Typography>
 * <Typography variant="body-md">Обычный текст параграфа</Typography>
 * 
 * // Цветные варианты
 * <Typography variant="body-md" color="primary">Основной цвет</Typography>
 * <Typography variant="caption-md" color="muted">Приглушенная подпись</Typography>
 */
export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({
    as: Component = "p",
    variant,
    color,
    align,
    weight,
    transform,
    truncate,
    className,
    children,
    ...props
  }, ref) => {
    const accessibilityProps = createTypographyAccessibilityProps(variant)
    
    return (
      <Component
        ref={ref}
        className={cn(
          typographyVariants({
            variant,
            color,
            align,
            weight,
            transform,
            truncate
          }),
          className
        )}
        {...accessibilityProps}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Typography.displayName = "Typography"