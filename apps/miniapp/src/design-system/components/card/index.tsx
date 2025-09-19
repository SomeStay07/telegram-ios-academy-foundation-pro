import React from 'react'
import { cn } from '../../../lib/utils'
import { cardVariants, cardHeaderVariants } from './CardVariants'
import { CardProps } from './CardTypes'

/**
 * 🎨 Enhanced Card Component
 * 
 * Современная карточка с полной поддержкой дизайн-токенов, анимаций и состояний.
 * Основана на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <Card title="Заголовок">
 *   <p>Контент карточки</p>
 * </Card>
 * 
 * // С вариантами и размерами
 * <Card variant="elevated" size="lg" title="Большая карточка">
 *   <p>Контент с тенью</p>
 * </Card>
 * 
 * // Интерактивная карточка с иконкой
 * <Card 
 *   title="Кликабельная карточка" 
 *   icon={<StarIcon />}
 *   interactive
 *   onClick={() => console.log('clicked')}
 * >
 *   <p>Карточка с анимацией при наведении</p>
 * </Card>
 * 
 * // Минимальная карточка
 * <Card variant="ghost" headerVariant="minimal">
 *   <p>Почти невидимая карточка</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    size,
    interactive = false,
    fullWidth = false,
    title,
    description,
    icon,
    headerVariant = "default",
    headerClassName,
    contentClassName,
    children,
    ...props
  }, ref) => {
    return (
      <div
        className={cn(
          cardVariants({ 
            variant, 
            size,
            interactive,
            fullWidth 
          }),
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Header */}
        {(title || description || icon) && (
          <div 
            className={cn(
              cardHeaderVariants({ variant: headerVariant }),
              headerClassName
            )}
          >
            {/* Иконка */}
            {icon && (
              <div className="flex-shrink-0 text-gray-600 dark:text-gray-400">
                {icon}
              </div>
            )}
            
            {/* Заголовок и описание */}
            <div className="flex-1 min-w-0">
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className={cn("text-gray-700 dark:text-gray-300", contentClassName)}>
          {children}
        </div>
      </div>
    )
  }
)

Card.displayName = "Card"

// Re-export everything from the modular files
export * from './CardTypes'
export * from './CardVariants'
export * from './CardLogic'