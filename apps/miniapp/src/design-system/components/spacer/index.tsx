import React from 'react'
import { cn } from '../../../lib/utils'
import { spacerVariants } from './SpacerVariants'
import { SpacerProps } from './SpacerTypes'
import { getResponsiveClasses } from './SpacerLogic'

/**
 * 🎨 Enhanced Spacer Component
 * 
 * Универсальный компонент для создания отступов в дизайн-системе.
 * Заменяет необходимость в CSS классах для отступов и обеспечивает 
 * консистентность spacing в приложении.
 * 
 * @example
 * // Базовое использование (заменяет .subsection-spacer)
 * <Spacer size="lg" />
 * 
 * // Заменяет .section-spacer  
 * <Spacer size="xl" />
 * 
 * // Отступ сверху и снизу
 * <Spacer size="md" direction="both" />
 * 
 * // Адаптивный отступ
 * <Spacer size="lg" responsive />
 * 
 * // Скрытие на мобильных
 * <Spacer size="xl" hideOn="mobile" />
 * 
 * // Горизонтальные отступы
 * <Spacer size="md" direction="horizontal" />
 */
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(
  ({
    className,
    size = "lg",
    direction = "bottom",
    responsive = false,
    hideOn,
    children,
    ...props
  }, ref) => {
    // Базовые классы
    const baseClasses = responsive 
      ? getResponsiveClasses(size!, direction!)
      : spacerVariants({ size, direction, responsive })

    // Классы для скрытия на определенных размерах
    const hideClasses = {
      'mobile': 'hidden sm:block',
      'tablet': 'block md:hidden lg:block', 
      'desktop': 'block lg:hidden'
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          hideOn && hideClasses[hideOn],
          className
        )}
        role="presentation"
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    )
  }
)

Spacer.displayName = "Spacer"

/**
 * 🔧 Convenient Spacer Shortcuts
 */

// Предустановленные компоненты для частых случаев
export const SectionSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'size'>>(
  (props, ref) => <Spacer ref={ref} size="xl" {...props} />
)
SectionSpacer.displayName = "SectionSpacer"

export const SubsectionSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'size'>>(
  (props, ref) => <Spacer ref={ref} size="lg" {...props} />
)
SubsectionSpacer.displayName = "SubsectionSpacer"

export const ComponentSpacer = React.forwardRef<HTMLDivElement, Omit<SpacerProps, 'size'>>(
  (props, ref) => <Spacer ref={ref} size="md" {...props} />
)
ComponentSpacer.displayName = "ComponentSpacer"

// Re-export everything from the modular files
export * from './SpacerTypes'
export * from './SpacerVariants'
export * from './SpacerLogic'