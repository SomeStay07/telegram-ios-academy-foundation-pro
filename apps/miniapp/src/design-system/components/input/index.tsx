import React from 'react'
import { cn } from '../../../lib/utils'
import { inputVariants, labelVariants } from './InputVariants'
import { InputProps } from './InputTypes'
import { InputSpinner } from './InputLogic'

/**
 * 🎨 Enhanced Input Component
 * 
 * Современный инпут с полной поддержкой accessibility, анимаций и состояний.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <Input placeholder="Введите текст" />
 * 
 * // С лейблом и вариантами
 * <Input 
 *   label="Email"
 *   variant="filled" 
 *   size="lg"
 *   placeholder="example@email.com"
 * />
 * 
 * // С иконками и состояниями
 * <Input 
 *   label="Пароль"
 *   type="password"
 *   leftIcon={<LockIcon />}
 *   rightIcon={<EyeIcon />}
 *   helperText="Минимум 8 символов"
 *   required
 * />
 * 
 * // Состояние ошибки
 * <Input 
 *   variant="error"
 *   errorText="Обязательное поле"
 *   placeholder="Имя пользователя"
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    containerClassName,
    labelClassName,
    variant,
    size,
    fullWidth = true,
    label,
    helperText,
    errorText,
    leftIcon,
    rightIcon,
    required = false,
    disabled,
    ...props
  }, ref) => {
    // Автоматически выбираем error вариант если есть errorText
    const finalVariant = errorText ? 'error' : variant
    const isLoading = rightIcon === 'loading'

    return (
      <div className={cn("", containerClassName)}>
        {/* Лейбл */}
        {label && (
          <label 
            className={cn(
              labelVariants({ variant: required ? 'required' : 'default' }),
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Левая иконка */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
              <div className="h-5 w-5 flex items-center justify-center">
                {leftIcon}
              </div>
            </div>
          )}

          {/* Input */}
          <input
            className={cn(
              inputVariants({ 
                variant: finalVariant, 
                size,
                fullWidth 
              }),
              // Отступы для иконок
              leftIcon && "pl-10",
              (rightIcon || isLoading) && "pr-10",
              className
            )}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {/* Правая иконка или спиннер */}
          {(rightIcon || isLoading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <div className="h-5 w-5 flex items-center justify-center">
                {isLoading ? <InputSpinner /> : rightIcon}
              </div>
            </div>
          )}
        </div>

        {/* Helper Text или Error Text */}
        {(helperText || errorText) && (
          <div className="mt-2">
            {errorText ? (
              <p className="text-sm text-red-600 dark:text-red-400">
                {errorText}
              </p>
            ) : helperText ? (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

// Re-export everything from the modular files
export * from './InputTypes'
export * from './InputVariants'
export * from './InputLogic'