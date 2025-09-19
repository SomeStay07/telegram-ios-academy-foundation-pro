/**
 * 🎯 Tabs Component - Modular Barrel Export
 * 
 * Современная модульная архитектура с разделением на:
 * - TabsTypes.ts - Типы и интерфейсы
 * - TabsVariants.ts - CVA варианты стилей
 * - TabsLogic.ts - Бизнес-логика и хуки
 * - index.tsx - Основной компонент
 */

// Основной компонент
export { Tabs } from './tabs'

// Типы для внешнего использования
export type { 
  TabsProps,
  TabItem,
  TabsVariant,
  TabsSize,
  TabVariant
} from './tabs/TabsTypes'

// Варианты для переиспользования
export { 
  tabsVariants, 
  tabListVariants, 
  tabButtonVariants, 
  tabContentVariants 
} from './tabs/TabsVariants'

// Хуки и утилиты для расширения функциональности
export { 
  useTabs,
  createTabAccessibilityProps,
  createTabPanelAccessibilityProps,
  createTabListAccessibilityProps,
  renderBadge
} from './tabs/TabsLogic'