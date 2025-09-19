import React from 'react'
import { cn } from '../../../lib/utils'
import type { ProgressProps } from './ProgressTypes'
import { progressVariants, progressBarVariants } from './ProgressVariants'
import { 
  normalizeProgressValue,
  calculatePercentage,
  getDisplayText,
  createProgressAccessibilityProps,
  shouldShowAnimation
} from './ProgressLogic'

/**
 * 🎨 Enhanced Progress Component
 * 
 * Современный прогресс-бар с полной поддержкой accessibility, анимаций и дизайн-токенов.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <Progress value={75} />
 * 
 * // С вариантами и размерами
 * <Progress 
 *   value={60} 
 *   variant="success" 
 *   size="lg"
 *   showPercentage
 * />
 * 
 * // Анимированный с градиентом
 * <Progress 
 *   value={45}
 *   variant="gradient"
 *   animated
 *   striped
 *   label="Загрузка файла"
 * />
 */
export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    barClassName,
    textClassName,
    variant,
    size,
    shape,
    value,
    max = 100,
    min = 0,
    label,
    showPercentage = false,
    showValue = false,
    animated = false,
    striped = false,
    customText,
    ...props
  }, ref) => {
    // Нормализуем значение в пределах min-max
    const normalizedValue = normalizeProgressValue(value, min, max)
    const percentage = calculatePercentage(value, min, max)

    // Определяем текст для отображения
    const displayText = getDisplayText(
      customText,
      showPercentage,
      showValue,
      percentage,
      normalizedValue,
      max
    )

    const accessibilityProps = createProgressAccessibilityProps(
      normalizedValue,
      min,
      max,
      label,
      percentage
    )

    const showBarAnimation = shouldShowAnimation(animated, percentage)

    return (
      <div className="w-full">
        {/* Лейбл и текст */}
        {(label || displayText) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            )}
            {displayText && (
              <span 
                className={cn(
                  "text-sm font-medium text-gray-600 dark:text-gray-400",
                  textClassName
                )}
              >
                {displayText}
              </span>
            )}
          </div>
        )}

        {/* Progress Container */}
        <div
          className={cn(
            progressVariants({ 
              variant, 
              size, 
              shape,
              animated: animated && percentage < 100,
              striped 
            }),
            className
          )}
          ref={ref}
          {...accessibilityProps}
          {...props}
        >
          {/* Progress Bar */}
          <div
            className={cn(
              progressBarVariants({ 
                variant,
                animated: showBarAnimation,
                striped 
              }),
              shape === 'rounded' && 'rounded-full',
              shape === 'semi' && 'rounded-lg',
              barClassName
            )}
            style={{
              width: `${percentage}%`,
              transition: 'width 0.5s ease-out'
            }}
          >
            {/* Shimmer эффект для анимации */}
            {showBarAnimation && (
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                style={{
                  animation: 'shimmer 2s infinite linear'
                }}
              />
            )}
          </div>

          {/* Индетерминированный прогресс (когда value не указан или равен -1) */}
          {(value === -1 || (value === 0 && animated)) && (
            <div 
              className={cn(
                "absolute inset-0",
                progressBarVariants({ variant }),
                "animate-indeterminate"
              )}
              style={{
                background: `linear-gradient(90deg, transparent, currentColor, transparent)`,
                animation: 'indeterminate 1.5s infinite linear'
              }}
            />
          )}
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"