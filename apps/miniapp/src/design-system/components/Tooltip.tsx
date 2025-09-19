/**
 * 🎯 Tooltip Component - Modular Barrel Export
 * 
 * Современная модульная архитектура с разделением на:
 * - TooltipTypes.ts - Типы и интерфейсы
 * - TooltipVariants.ts - CVA варианты стилей
 * - TooltipLogic.ts - Бизнес-логика и хуки
 * - index.tsx - Основной компонент
 */

// Основной компонент
export { Tooltip } from './tooltip'

// Типы для внешнего использования
export type { 
  TooltipProps,
  TooltipVariant,
  TooltipSize,
  TooltipPosition
} from './tooltip/TooltipTypes'

// Варианты для переиспользования
export { tooltipVariants, arrowVariants } from './tooltip/TooltipVariants'

// Утилиты и хуки для расширения функциональности
export { 
  useTooltipLogic,
  createTooltipHandlers,
  createAccessibilityProps,
  POSITION_CLASSES
} from './tooltip/TooltipLogic'