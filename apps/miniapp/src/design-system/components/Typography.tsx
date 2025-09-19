/**
 * 🎯 Typography Component - Modular Barrel Export
 * 
 * Современная модульная архитектура с разделением на:
 * - TypographyTypes.ts - Типы и интерфейсы
 * - TypographyVariants.ts - CVA варианты стилей
 * - TypographyLogic.ts - Готовые компоненты и логика
 * - index.tsx - Основной компонент
 */

// Основной компонент
export { Typography } from './typography'

// Готовые компоненты
export { 
  DisplayText,
  Heading,
  Text,
  Caption,
  Label,
  Code
} from './typography/TypographyLogic'

// Типы для внешнего использования
export type { 
  TypographyProps,
  DisplayTextProps,
  HeadingProps,
  TextProps,
  CaptionProps,
  LabelProps,
  CodeProps,
  TypographyVariant,
  TypographyColor,
  TypographyAlign,
  TypographyWeight,
  TypographyTransform
} from './typography/TypographyTypes'

// Варианты для переиспользования
export { typographyVariants } from './typography/TypographyVariants'

// Утилиты для расширения функциональности
export { 
  getSemanticElement,
  createTypographyAccessibilityProps
} from './typography/TypographyLogic'