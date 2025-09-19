import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Утилита для безопасного объединения CSS классов
 * Комбинирует clsx для условной логики и tailwind-merge для разрешения конфликтов
 * 
 * @example
 * cn('px-2 py-1', 'text-sm', { 'bg-red-500': isError, 'bg-green-500': isSuccess })
 * cn('px-2', 'px-4') // Результат: 'px-4' (последний класс побеждает)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Создаёт CSS переменную из design token
 * 
 * @example
 * cssVar('primary-500') // 'var(--primary-500)'
 */
export function cssVar(name: string) {
  return `var(--${name})`
}

/**
 * Форматирует px значения для CSS
 * 
 * @example
 * px(16) // '16px'
 * px('1rem') // '1rem' (оставляет как есть если уже строка)
 */
export function px(value: number | string): string {
  if (typeof value === 'string') return value
  return `${value}px`
}

/**
 * Создаёт rgba цвет с альфа-каналом
 * 
 * @example
 * rgba('255, 255, 255', 0.8) // 'rgba(255, 255, 255, 0.8)'
 */
export function rgba(rgb: string, alpha: number): string {
  return `rgba(${rgb}, ${alpha})`
}

/**
 * Безопасно форматирует строку для использования в CSS классах
 * 
 * @example
 * kebabCase('primaryButton') // 'primary-button'
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase()
}