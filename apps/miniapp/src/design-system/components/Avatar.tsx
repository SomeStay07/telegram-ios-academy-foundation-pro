/**
 * 🎯 Avatar Component - Modular Barrel Export
 * 
 * Современная модульная архитектура с разделением на:
 * - AvatarTypes.ts - Типы и интерфейсы
 * - AvatarVariants.ts - CVA варианты стилей
 * - AvatarLogic.ts - Бизнес-логика и утилиты
 * - index.tsx - Основной компонент
 */

// Основной компонент
export { Avatar } from './avatar'

// Дополнительные компоненты
export { AvatarGroup } from './avatar/AvatarLogic'

// Типы для внешнего использования
export type { 
  AvatarProps,
  AvatarGroupProps,
  AvatarVariant,
  AvatarSize,
  AvatarShape,
  AvatarStatus
} from './avatar/AvatarTypes'

// Варианты для переиспользования
export { avatarVariants, statusVariants } from './avatar/AvatarVariants'

// Утилиты и компоненты для расширения функциональности
export { 
  getInitials,
  DefaultUserIcon,
  createAvatarAccessibilityProps,
  handleImageError
} from './avatar/AvatarLogic'