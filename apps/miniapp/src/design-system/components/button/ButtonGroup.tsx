import React from 'react'
import { cn } from '../../../lib/utils'
import { ButtonGroupProps, ToggleGroupProps, ToggleButtonProps } from './ButtonTypes'

/**
 * 🎯 ButtonGroup - Компонент для группировки кнопок
 * 
 * Позволяет группировать кнопки вместе с единообразным стилем
 * и поведением. Поддерживает горизонтальное и вертикальное размещение.
 */
export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({
    className,
    size,
    variant,
    orientation = 'horizontal',
    attached = false,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === 'horizontal' ? "flex-row" : "flex-col",
          attached ? (
            orientation === 'horizontal' 
              ? "[&>*:not(:first-child)]:ml-[-1px] [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none"
              : "[&>*:not(:first-child)]:mt-[-1px] [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none"
          ) : (
            orientation === 'horizontal' ? "gap-2" : "gap-2"
          ),
          className
        )}
        role="group"
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              size: child.props.size || size,
              variant: child.props.variant || variant,
              ...child.props
            })
          }
          return child
        })}
      </div>
    )
  }
)

ButtonGroup.displayName = "ButtonGroup"

/**
 * 🔄 ToggleButton - Кнопка с toggle состоянием
 * 
 * Кнопка которая может быть в нажатом/отжатом состоянии.
 * Используется для создания переключателей и toggle групп.
 */
export const ToggleButton = React.forwardRef<HTMLButtonElement, ToggleButtonProps>(
  ({
    className,
    pressed = false,
    onPressedChange,
    onClick,
    value,
    children,
    ...props
  }, ref) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPressedChange?.(!pressed)
      onClick?.(event)
    }

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={pressed}
        data-state={pressed ? "on" : "off"}
        data-value={value}
        className={cn(
          // Базовые стили toggle кнопки
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl",
          "text-sm font-medium transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Toggle специфичные стили
          pressed ? [
            "bg-indigo-100 text-indigo-900 shadow-inner",
            "dark:bg-indigo-900 dark:text-indigo-100"
          ] : [
            "bg-transparent text-gray-700 hover:bg-gray-100",
            "dark:text-gray-300 dark:hover:bg-gray-800"
          ],
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  }
)

ToggleButton.displayName = "ToggleButton"

/**
 * 📊 ToggleGroup - Группа toggle кнопок
 * 
 * Группирует toggle кнопки с возможностью single или multiple выбора.
 * Управляет состоянием всех кнопок в группе.
 */
export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({
    className,
    type,
    value,
    values,
    defaultValue,
    defaultValues,
    onValueChange,
    onValuesChange,
    size,
    variant,
    orientation = 'horizontal',
    disabled,
    children,
    ...props
  }, ref) => {
    // Состояние для single режима
    const [singleValue, setSingleValue] = React.useState(defaultValue || '')
    const currentSingleValue = value !== undefined ? value : singleValue

    // Состояние для multiple режима  
    const [multipleValues, setMultipleValues] = React.useState(defaultValues || [])
    const currentMultipleValues = values !== undefined ? values : multipleValues

    const handleSingleToggle = (toggleValue: string) => {
      const newValue = currentSingleValue === toggleValue ? '' : toggleValue
      setSingleValue(newValue)
      onValueChange?.(newValue)
    }

    const handleMultipleToggle = (toggleValue: string) => {
      const newValues = currentMultipleValues.includes(toggleValue)
        ? currentMultipleValues.filter(v => v !== toggleValue)
        : [...currentMultipleValues, toggleValue]
      setMultipleValues(newValues)
      onValuesChange?.(newValues)
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          orientation === 'horizontal' ? "flex-row" : "flex-col",
          orientation === 'horizontal' ? "gap-1" : "gap-1",
          className
        )}
        role={type === 'single' ? 'radiogroup' : 'group'}
        aria-orientation={orientation}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.value) {
            const childValue = child.props.value
            const isPressed = type === 'single' 
              ? currentSingleValue === childValue
              : currentMultipleValues.includes(childValue)

            return React.cloneElement(child, {
              pressed: isPressed,
              onPressedChange: type === 'single' 
                ? () => handleSingleToggle(childValue)
                : () => handleMultipleToggle(childValue),
              disabled: disabled || child.props.disabled,
              size: child.props.size || size,
              variant: child.props.variant || variant,
              role: type === 'single' ? 'radio' : 'checkbox',
              'aria-checked': isPressed,
              ...child.props
            })
          }
          return child
        })}
      </div>
    )
  }
)

ToggleGroup.displayName = "ToggleGroup"

/**
 * 🔧 Utility Hooks для работы с группами
 */

/**
 * Hook для управления состоянием toggle группы
 */
export const useToggleGroup = (
  type: 'single' | 'multiple',
  defaultValue?: string | string[]
) => {
  const [value, setValue] = React.useState(
    type === 'single' 
      ? (defaultValue as string) || ''
      : (defaultValue as string[]) || []
  )

  const toggle = React.useCallback((itemValue: string) => {
    if (type === 'single') {
      setValue(prev => prev === itemValue ? '' : itemValue)
    } else {
      setValue(prev => {
        const currentArray = prev as string[]
        return currentArray.includes(itemValue)
          ? currentArray.filter(v => v !== itemValue)
          : [...currentArray, itemValue]
      })
    }
  }, [type])

  const isSelected = React.useCallback((itemValue: string) => {
    return type === 'single' 
      ? value === itemValue
      : (value as string[]).includes(itemValue)
  }, [type, value])

  const clear = React.useCallback(() => {
    setValue(type === 'single' ? '' : [])
  }, [type])

  return {
    value,
    setValue,
    toggle,
    isSelected,
    clear
  }
}

/**
 * Hook для keyboard navigation в группах
 */
export const useButtonGroupKeyboard = (
  orientation: 'horizontal' | 'vertical' = 'horizontal'
) => {
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    const { key } = event
    const isHorizontal = orientation === 'horizontal'
    
    const moveNext = (isHorizontal && key === 'ArrowRight') || 
                     (!isHorizontal && key === 'ArrowDown')
    const movePrev = (isHorizontal && key === 'ArrowLeft') || 
                     (!isHorizontal && key === 'ArrowUp')

    if (moveNext || movePrev) {
      event.preventDefault()
      const currentElement = event.target as HTMLElement
      const group = currentElement.closest('[role="group"], [role="radiogroup"]')
      if (!group) return

      const focusableElements = Array.from(
        group.querySelectorAll('button:not(:disabled)')
      ) as HTMLElement[]
      
      const currentIndex = focusableElements.indexOf(currentElement)
      let nextIndex: number

      if (moveNext) {
        nextIndex = currentIndex + 1 >= focusableElements.length ? 0 : currentIndex + 1
      } else {
        nextIndex = currentIndex - 1 < 0 ? focusableElements.length - 1 : currentIndex - 1
      }

      focusableElements[nextIndex]?.focus()
    }
  }, [orientation])

  return { handleKeyDown }
}