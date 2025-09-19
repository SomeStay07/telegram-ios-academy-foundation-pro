import React from 'react'
import { type LevelBadgeVariant, type LevelFormatOptions, type LevelThreshold } from './LevelBadgeTypes'

/**
 * 🎯 LevelBadge Logic & Utilities
 * 
 * Модульный файл содержащий утилиты и бизнес-логику для компонента уровня
 * Разделен из основного LevelBadge.tsx для улучшения организации кода
 */

/**
 * 🔧 Основные функции для логики уровней
 */

/**
 * Автоматически определяет вариант стиля на основе уровня и максимального уровня
 */
export const getLevelVariant = (level: number, maxLevel: number = 100): LevelBadgeVariant => {
  const percentage = (level / maxLevel) * 100
  
  if (percentage >= 95) return 'legendary'
  if (percentage >= 85) return 'diamond'
  if (percentage >= 75) return 'platinum'
  if (percentage >= 60) return 'gold'
  if (percentage >= 40) return 'success'
  if (percentage >= 20) return 'primary'
  return 'default'
}

/**
 * Форматирует число уровня с сокращениями
 */
export const formatLevel = (
  level: number, 
  options: LevelFormatOptions = {}
): string => {
  const {
    useAbbreviation = true,
    decimalPlaces = 1,
    abbreviationThreshold = 1000
  } = options

  if (!useAbbreviation || level < abbreviationThreshold) {
    return level.toString()
  }

  if (level >= 1000000) {
    return `${(level / 1000000).toFixed(decimalPlaces)}M`
  }
  
  if (level >= 1000) {
    return `${(level / 1000).toFixed(decimalPlaces)}K`
  }
  
  return level.toString()
}

/**
 * 🎯 Пороговые значения для автоматического определения варианта
 */
export const levelThresholds: LevelThreshold[] = [
  { minPercentage: 95, variant: 'legendary', name: 'Легендарный' },
  { minPercentage: 85, variant: 'diamond', name: 'Алмазный' },
  { minPercentage: 75, variant: 'platinum', name: 'Платиновый' },
  { minPercentage: 60, variant: 'gold', name: 'Золотой' },
  { minPercentage: 40, variant: 'success', name: 'Продвинутый' },
  { minPercentage: 20, variant: 'primary', name: 'Опытный' },
  { minPercentage: 0, variant: 'default', name: 'Новичок' }
]

/**
 * Получает название уровня на основе процента прогресса
 */
export const getLevelName = (level: number, maxLevel: number = 100): string => {
  const percentage = (level / maxLevel) * 100
  
  const threshold = levelThresholds.find(t => percentage >= t.minPercentage)
  return threshold?.name || 'Новичок'
}

/**
 * 🎨 Функции для работы с анимациями
 */

/**
 * Определяет нужна ли анимация свечения для высоких уровней
 */
export const shouldGlow = (variant: LevelBadgeVariant): boolean => {
  return variant === 'legendary' || variant === 'diamond'
}

/**
 * Определяет нужен ли эффект частиц
 */
export const shouldShowParticles = (variant: LevelBadgeVariant): boolean => {
  return variant === 'legendary'
}

/**
 * Определяет нужен ли эффект мерцания
 */
export const shouldShimmer = (variant: LevelBadgeVariant): boolean => {
  return variant === 'legendary' || variant === 'diamond'
}

/**
 * 📏 Функции для размеров и отображения
 */

/**
 * Определяет нужно ли показывать лейбл LVL на основе размера
 */
export const shouldShowLabel = (size: string, showLabel: boolean): boolean => {
  return showLabel && (size === 'lg' || size === 'xl')
}

/**
 * Получает классы для текста в зависимости от длины числа
 */
export const getTextSizeClasses = (displayLevel: string): string[] => {
  const classes: string[] = []
  
  if (displayLevel.length > 3) {
    classes.push("text-xs")
  } else if (displayLevel.length > 2) {
    classes.push("text-sm")
  }
  
  return classes
}

/**
 * 🔧 Функции для интерактивности
 */

/**
 * Определяет нужны ли accessibility атрибуты
 */
export const getA11yProps = (interactive: boolean, level: number, maxLevel?: number) => {
  if (!interactive) {
    return {
      title: `Уровень ${level}${maxLevel ? ` из ${maxLevel}` : ''}`
    }
  }

  return {
    role: "button" as const,
    tabIndex: 0,
    title: `Уровень ${level}${maxLevel ? ` из ${maxLevel}` : ''}`
  }
}

/**
 * Создает обработчик клавиатурных событий для интерактивных бейджей
 */
export const createKeyboardHandler = (onClick?: () => void) => {
  if (!onClick) return undefined

  return (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }
}

/**
 * 📊 Функции для прогресса и опыта
 */

/**
 * Вычисляет процент прогресса до следующего уровня
 */
export const calculateProgressPercentage = (
  currentExp: number,
  levelExp: number,
  nextLevelExp: number
): number => {
  const expInCurrentLevel = currentExp - levelExp
  const expNeededForNextLevel = nextLevelExp - levelExp
  
  return Math.min(100, Math.max(0, (expInCurrentLevel / expNeededForNextLevel) * 100))
}

/**
 * Вычисляет опыт, необходимый для следующего уровня
 */
export const getExpToNextLevel = (
  currentExp: number,
  nextLevelExp: number
): number => {
  return Math.max(0, nextLevelExp - currentExp)
}

/**
 * 🎪 Функции для эффектов
 */

/**
 * Генерирует случайные позиции для частиц
 */
export const generateParticlePositions = (count: number = 3) => {
  return Array.from({ length: count }, (_, index) => ({
    top: Math.random() * 80 + 10, // 10-90%
    left: Math.random() * 80 + 10, // 10-90%
    delay: index * 200 + Math.random() * 100
  }))
}

/**
 * Получает стили для тени текста в зависимости от варианта
 */
export const getTextShadowStyle = (variant: LevelBadgeVariant): React.CSSProperties => {
  const shadows = {
    default: '0 1px 2px rgba(0, 0, 0, 0.5)',
    primary: '0 1px 2px rgba(99, 102, 241, 0.5)',
    success: '0 1px 2px rgba(16, 185, 129, 0.5)',
    warning: '0 1px 2px rgba(245, 158, 11, 0.5)',
    danger: '0 1px 2px rgba(239, 68, 68, 0.5)',
    gold: '0 1px 2px rgba(0, 0, 0, 0.3)',
    platinum: '0 1px 2px rgba(0, 0, 0, 0.3)',
    diamond: '0 1px 2px rgba(139, 92, 246, 0.5)',
    legendary: '0 1px 2px rgba(168, 85, 247, 0.6)'
  }

  return {
    textShadow: shadows[variant || 'default']
  }
}

/**
 * 🔄 Утилиты для анимации уровня
 */

/**
 * Управление состоянием анимации
 */
export const useAnimationState = (level: number, animated: boolean) => {
  const [isAnimating, setIsAnimating] = React.useState(false)
  
  React.useEffect(() => {
    if (animated) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 600)
      return () => clearTimeout(timer)
    }
  }, [level, animated])
  
  return isAnimating
}

/**
 * 🎯 Константы для конфигурации
 */
export const LEVEL_CONFIG = {
  // Длительности анимаций
  ANIMATION_DURATION: 600,
  SHIMMER_DURATION: 3000,
  
  // Пороги для форматирования
  THOUSAND_THRESHOLD: 1000,
  MILLION_THRESHOLD: 1000000,
  
  // Настройки частиц
  PARTICLE_COUNT: 3,
  PARTICLE_ANIMATION_DELAY: 200,
  
  // Размеры
  MIN_SIZE_FOR_LABEL: ['lg', 'xl']
} as const