import { useState, useRef, useEffect } from 'react'
import type { TooltipPosition, TooltipState, PositionConfig } from './TooltipTypes'

/**
 * 🎯 Position Classes Configuration
 */
export const POSITION_CLASSES: PositionConfig = {
  top: 'bottom-full left-1/2 -translate-x-1/2',
  bottom: 'top-full left-1/2 -translate-x-1/2',
  left: 'right-full top-1/2 -translate-y-1/2',
  right: 'left-full top-1/2 -translate-y-1/2'
}

/**
 * 🎯 useTooltipLogic Hook - Основная логика тултипа
 */
export const useTooltipLogic = (
  position: TooltipPosition = 'top',
  delay: number = 200,
  disabled: boolean = false
) => {
  const [isVisible, setIsVisible] = useState(false)
  const [actualPosition, setActualPosition] = useState(position)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Автоматическое позиционирование для предотвращения выхода за границы экрана
  useEffect(() => {
    if (isVisible && containerRef.current && tooltipRef.current) {
      const container = containerRef.current.getBoundingClientRect()
      const tooltip = tooltipRef.current.getBoundingClientRect()
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      let newPosition = position

      // Проверяем, выходит ли тултип за границы и корректируем позицию
      if (position === 'top' && container.top - tooltip.height < 10) {
        newPosition = 'bottom'
      } else if (position === 'bottom' && container.bottom + tooltip.height > viewport.height - 10) {
        newPosition = 'top'
      } else if (position === 'left' && container.left - tooltip.width < 10) {
        newPosition = 'right'
      } else if (position === 'right' && container.right + tooltip.width > viewport.width - 10) {
        newPosition = 'left'
      }

      setActualPosition(newPosition)
    }
  }, [isVisible, position])

  /**
   * Показать тултип
   */
  const showTooltip = () => {
    if (disabled) return
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true)
    }, delay)
  }

  /**
   * Скрыть тултип
   */
  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsVisible(false)
  }

  /**
   * Touch обработчик для мобильных устройств
   */
  const handleTouch = (touchEnabled: boolean) => {
    if (!touchEnabled) return
    
    if (isVisible) {
      hideTooltip()
    } else {
      showTooltip()
    }
  }

  /**
   * Получить CSS классы для позиционирования
   */
  const getPositionClasses = () => {
    return POSITION_CLASSES[actualPosition] || POSITION_CLASSES.top
  }

  /**
   * Cleanup при размонтировании
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    isVisible,
    actualPosition,
    containerRef,
    tooltipRef,
    showTooltip,
    hideTooltip,
    handleTouch,
    getPositionClasses
  }
}

/**
 * 🎯 Tooltip Event Handlers
 */
export const createTooltipHandlers = (
  showTooltip: () => void,
  hideTooltip: () => void,
  handleTouch: (touchEnabled: boolean) => void,
  touchEnabled: boolean = true
) => ({
  onMouseEnter: showTooltip,
  onMouseLeave: hideTooltip,
  onFocus: showTooltip,
  onBlur: hideTooltip,
  onTouchStart: touchEnabled ? () => handleTouch(touchEnabled) : undefined,
})

/**
 * 🎯 Tooltip Accessibility Props
 */
export const createAccessibilityProps = (isVisible: boolean) => ({
  role: "tooltip" as const,
  "aria-hidden": !isVisible,
})