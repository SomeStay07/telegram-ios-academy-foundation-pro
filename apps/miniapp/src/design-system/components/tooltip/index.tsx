import React from 'react'
import { cn } from '../../../lib/utils'
import type { TooltipProps } from './TooltipTypes'
import { tooltipVariants, arrowVariants } from './TooltipVariants'
import { 
  useTooltipLogic, 
  createTooltipHandlers, 
  createAccessibilityProps 
} from './TooltipLogic'

/**
 * 🎨 Enhanced Tooltip Component
 * 
 * Современный тултип с полной поддержкой accessibility, анимаций и состояний.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <Tooltip content="Подсказка">
 *   <button>Наведи на меня</button>
 * </Tooltip>
 * 
 * // С вариантами и позицией
 * <Tooltip 
 *   content="Успешная операция" 
 *   variant="success" 
 *   position="bottom"
 *   showArrow
 * >
 *   <span>✅ Готово</span>
 * </Tooltip>
 * 
 * // С задержкой
 * <Tooltip 
 *   content="Эта подсказка появится через 500мс" 
 *   delay={500}
 * >
 *   <div>Элемент с задержкой</div>
 * </Tooltip>
 */
export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({
    content,
    children,
    variant = "default",
    size = "md",
    position = "top",
    delay = 200,
    disabled = false,
    showArrow = true,
    richContent = false,
    touchEnabled = true,
    className,
    containerClassName,
    ...props
  }, ref) => {
    const {
      isVisible,
      actualPosition,
      containerRef,
      tooltipRef,
      showTooltip,
      hideTooltip,
      handleTouch,
      getPositionClasses
    } = useTooltipLogic(position, delay, disabled)

    const tooltipHandlers = createTooltipHandlers(
      showTooltip,
      hideTooltip,
      handleTouch,
      touchEnabled
    )

    const accessibilityProps = createAccessibilityProps(isVisible)

    if (disabled) {
      return <>{children}</>
    }

    return (
      <div 
        ref={containerRef}
        className={cn("relative inline-block", containerClassName)}
        {...tooltipHandlers}
        {...props}
      >
        {children}
        
        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className={cn(
            tooltipVariants({ 
              variant, 
              size, 
              position: actualPosition,
              visible: isVisible 
            }),
            getPositionClasses(),
            className
          )}
          {...accessibilityProps}
        >
          {content}
          
          {/* Arrow */}
          {showArrow && (
            <div
              className={cn(
                arrowVariants({ 
                  variant, 
                  position: actualPosition 
                })
              )}
            />
          )}
        </div>
      </div>
    )
  }
)

Tooltip.displayName = "Tooltip"