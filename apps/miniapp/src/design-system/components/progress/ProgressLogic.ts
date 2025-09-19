/**
 * 🎯 Progress Logic Utilities
 */

/**
 * Нормализовать значение прогресса в пределах min-max
 */
export const normalizeProgressValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value))
}

/**
 * Вычислить процент прогресса
 */
export const calculatePercentage = (value: number, min: number, max: number): number => {
  const normalizedValue = normalizeProgressValue(value, min, max)
  return Math.round(((normalizedValue - min) / (max - min)) * 100)
}

/**
 * Определить отображаемый текст прогресса
 */
export const getDisplayText = (
  customText?: string,
  showPercentage?: boolean,
  showValue?: boolean,
  percentage?: number,
  normalizedValue?: number,
  max?: number
): string => {
  if (customText) return customText
  if (showPercentage && percentage !== undefined) return `${percentage}%`
  if (showValue && normalizedValue !== undefined && max !== undefined) {
    return `${normalizedValue}/${max}`
  }
  return ''
}

/**
 * Создать accessibility пропсы для прогресса
 */
export const createProgressAccessibilityProps = (
  normalizedValue: number,
  min: number,
  max: number,
  label?: string,
  percentage?: number
) => ({
  role: "progressbar" as const,
  "aria-valuenow": normalizedValue,
  "aria-valuemin": min,
  "aria-valuemax": max,
  "aria-label": label || `Прогресс: ${percentage}%`,
})

/**
 * Определить, показывать ли анимацию
 */
export const shouldShowAnimation = (animated: boolean, percentage: number): boolean => {
  return animated && percentage < 100 && percentage > 0
}

/**
 * Дополнительные CSS стили для анимаций (экспорт для globals.css)
 */
export const progressAnimationStyles = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes indeterminate {
  0% { left: -50%; width: 20%; }
  50% { left: 50%; width: 30%; }
  100% { left: 100%; width: 20%; }
}

.animate-shimmer {
  animation: shimmer 2s infinite linear;
}

.animate-indeterminate {
  animation: indeterminate 1.5s infinite linear;
}
`