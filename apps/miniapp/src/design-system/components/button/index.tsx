import React from 'react'
import { cn } from '../../../lib/utils'
import { buttonVariants, gradientVariants, neonVariants, socialVariants } from './ButtonVariants'
import { ButtonProps } from './ButtonTypes'

/**
 * 🎯 Button - Основной компонент кнопки (модульная версия)
 * 
 * Современный модульный компонент кнопки с полной поддержкой CVA,
 * TypeScript типизации и accessibility.
 * 
 * Файл сокращен с 577 до ~150 строк благодаря модульной архитектуре!
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    iconOnly,
    fullWidth = false,
    gradientVariant,
    neonVariant,
    socialVariant,
    asChild = false,
    children,
    disabled,
    ...props
  }, ref) => {
    // Определяем финальный вариант с учетом специальных типов
    const finalVariant = gradientVariant || neonVariant || socialVariant || variant
    
    // Получаем CSS классы для специальных вариантов
    const getSpecialVariantClasses = (): string => {
      if (gradientVariant && gradientVariants[gradientVariant]) {
        return gradientVariants[gradientVariant].join(' ')
      }
      if (neonVariant && neonVariants[neonVariant]) {
        return neonVariants[neonVariant].join(' ')
      }
      if (socialVariant && socialVariants[socialVariant]) {
        return socialVariants[socialVariant].join(' ')
      }
      return ''
    }

    const specialClasses = getSpecialVariantClasses()
    const isSpecialVariant = !!specialClasses

    // Состояние загрузки
    const isLoading = loading && !disabled
    const isDisabled = disabled || loading

    // Контент кнопки
    const renderContent = () => {
      if (iconOnly) {
        return (
          <span className="flex items-center justify-center">
            {isLoading ? <LoadingSpinner /> : iconOnly}
          </span>
        )
      }

      return (
        <>
          {leftIcon && !isLoading && (
            <span className="mr-2 flex-shrink-0">
              {leftIcon}
            </span>
          )}
          
          {isLoading && (
            <span className="mr-2 flex-shrink-0">
              <LoadingSpinner />
            </span>
          )}
          
          {children && (
            <span className={cn(
              "flex-1",
              (leftIcon || rightIcon || isLoading) && "truncate"
            )}>
              {children}
            </span>
          )}
          
          {rightIcon && !isLoading && (
            <span className="ml-2 flex-shrink-0">
              {rightIcon}
            </span>
          )}
        </>
      )
    }

    // Если используется как дочерний элемент (например, Link)
    if (asChild) {
      return React.cloneElement(
        React.Children.only(children) as React.ReactElement,
        {
          className: cn(
            isSpecialVariant 
              ? [buttonVariants({ size, fullWidth }), specialClasses]
              : buttonVariants({ variant: finalVariant, size, fullWidth }),
            isLoading && "cursor-wait",
            className
          ),
          disabled: isDisabled,
          'aria-busy': isLoading,
          ...props
        }
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn(
          isSpecialVariant 
            ? [buttonVariants({ size, fullWidth }), specialClasses]
            : buttonVariants({ variant: finalVariant, size, fullWidth }),
          isLoading && "cursor-wait",
          className
        )}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...props}
      >
        {renderContent()}
      </button>
    )
  }
)

Button.displayName = "Button"

/**
 * 🔄 LoadingSpinner - Компонент индикатора загрузки
 */
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
)

// Экспорт всех компонентов и типов
export * from './ButtonVariants'
export * from './ButtonTypes'
export * from './ButtonGroup'

// Дополнительные экспорты для удобства
export {
  buttonVariants,
  gradientVariants,
  neonVariants,
  socialVariants
} from './ButtonVariants'

export type {
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  GradientVariant,
  NeonVariant,
  SocialVariant,
  ButtonGroupProps,
  ToggleButtonProps,
  ToggleGroupProps
} from './ButtonTypes'

export {
  ButtonGroup,
  ToggleButton,
  ToggleGroup,
  useToggleGroup,
  useButtonGroupKeyboard
} from './ButtonGroup'