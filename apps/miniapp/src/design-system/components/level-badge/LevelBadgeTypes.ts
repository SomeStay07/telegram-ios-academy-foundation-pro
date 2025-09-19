import { type VariantProps } from 'class-variance-authority'
import { levelBadgeVariants } from './LevelBadgeVariants'

/**
 * 🎯 LevelBadge TypeScript Types
 * 
 * Модульный файл содержащий все типы для компонента уровня
 * Разделен из основного LevelBadge.tsx для улучшения типизации
 */

/**
 * 🔧 Базовые типы для компонента бейджа уровня
 */
export interface LevelBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof levelBadgeVariants> {
  /** Номер уровня */
  level: number
  /** Максимальный уровень (для автоматического выбора варианта) */
  maxLevel?: number
  /** Лейбл "LVL" */
  showLabel?: boolean
  /** Функция при клике */
  onClick?: () => void
  /** Кастомные CSS классы */
  className?: string
  /** Анимация при изменении уровня */
  animated?: boolean
}

/**
 * 🎨 Экспортированные варианты типов
 */
export type LevelBadgeVariant = VariantProps<typeof levelBadgeVariants>['variant']
export type LevelBadgeSize = VariantProps<typeof levelBadgeVariants>['size']
export type LevelBadgeShape = VariantProps<typeof levelBadgeVariants>['shape']

/**
 * 🔧 Утилитарные типы
 */
export type LevelBadgeElement = React.ElementRef<"div">
export type LevelBadgeRef = React.ForwardedRef<LevelBadgeElement>

/**
 * ⚡ Типы для логики уровней
 */
export interface LevelThreshold {
  /** Минимальный процент для этого уровня */
  minPercentage: number
  /** Вариант стиля для этого уровня */
  variant: LevelBadgeVariant
  /** Название уровня */
  name: string
}

/**
 * 🎪 Типы для анимаций
 */
export interface LevelBadgeAnimation {
  /** Тип анимации */
  type: 'bounce' | 'pulse' | 'glow' | 'shimmer'
  /** Длительность анимации */
  duration?: number
  /** Задержка анимации */
  delay?: number
}

/**
 * 📊 Типы для форматирования чисел
 */
export interface LevelFormatOptions {
  /** Использовать сокращения (K, M) */
  useAbbreviation?: boolean
  /** Количество знаков после запятой */
  decimalPlaces?: number
  /** Минимальное число для сокращения */
  abbreviationThreshold?: number
}

/**
 * 🔊 Типы для accessibility
 */
export interface LevelBadgeA11y {
  /** Aria label */
  'aria-label'?: string
  /** Описание уровня */
  'aria-describedby'?: string
  /** Роль элемента */
  role?: string
  /** Подсказка */
  title?: string
}

/**
 * 🎭 Составные типы для расширенных бейджей
 */
export interface EnhancedLevelBadgeProps extends LevelBadgeProps {
  /** Показывать прогресс до следующего уровня */
  showProgress?: boolean
  /** Прогресс в процентах (0-100) */
  progress?: number
  /** Опыт до следующего уровня */
  nextLevelExp?: number
  /** Текущий опыт */
  currentExp?: number
  /** Звуковые эффекты при анимации */
  soundEnabled?: boolean
}

/**
 * 🌟 Типы для особых эффектов
 */
export interface LevelBadgeEffects {
  /** Эффект частиц */
  particles?: boolean
  /** Эффект свечения */
  glow?: boolean
  /** Эффект мерцания */
  shimmer?: boolean
  /** Пульсация */
  pulse?: boolean
}

/**
 * 📱 Типы для адаптивности
 */
export interface ResponsiveLevelBadgeProps extends LevelBadgeProps {
  /** Размер для мобильных устройств */
  mobileSize?: LevelBadgeSize
  /** Размер для планшетов */
  tabletSize?: LevelBadgeSize
  /** Размер для десктопа */
  desktopSize?: LevelBadgeSize
}