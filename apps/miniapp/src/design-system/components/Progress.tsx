/**
 * 🎯 Progress Component - Modular Barrel Export
 * 
 * Современная модульная архитектура с разделением на:
 * - ProgressTypes.ts - Типы и интерфейсы
 * - ProgressVariants.ts - CVA варианты стилей
 * - ProgressLogic.ts - Бизнес-логика и утилиты
 * - index.tsx - Основной компонент
 */

// Основной компонент
export { Progress } from './progress'

// Типы для внешнего использования
export type { 
  ProgressProps,
  ProgressVariant,
  ProgressSize,
  ProgressShape
} from './progress/ProgressTypes'

// Варианты для переиспользования
export { progressVariants, progressBarVariants } from './progress/ProgressVariants'

// Утилиты для расширения функциональности
export { 
  normalizeProgressValue,
  calculatePercentage,
  getDisplayText,
  createProgressAccessibilityProps,
  shouldShowAnimation,
  progressAnimationStyles
} from './progress/ProgressLogic'