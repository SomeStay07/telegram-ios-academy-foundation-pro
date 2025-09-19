/**
 * 🎯 StatCard Component - Modular Barrel Export
 * 
 * Современная модульная архитектура с разделением на:
 * - StatCardTypes.ts - Типы и интерфейсы
 * - StatCardVariants.ts - CVA варианты стилей
 * - StatCardLogic.ts - Бизнес-логика и утилиты
 * - index.tsx - Основной компонент
 */

// Основной компонент
export { StatCard } from './stat-card'

// Дополнительные компоненты
export { StatCardGroup } from './stat-card/StatCardLogic'

// Типы для внешнего использования
export type { 
  StatCardProps,
  StatCardGroupProps,
  StatCardVariant,
  StatCardSize,
  StatCardAccent,
  StatCardTrend
} from './stat-card/StatCardTypes'

// Варианты для переиспользования
export { statCardVariants, trendVariants } from './stat-card/StatCardVariants'

// Утилиты и компоненты для расширения функциональности
export { 
  StatCardSkeleton,
  GRID_COLUMNS,
  createStatCardAccessibilityProps,
  renderTrendArrow
} from './stat-card/StatCardLogic'