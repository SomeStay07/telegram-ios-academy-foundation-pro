/**
 * 🎨 Modal Variants and Size Classes
 * 
 * Определяет размеры модалов и другие стилевые константы
 * для компонентов Modal и ConfirmationModal
 */

/**
 * Размеры модалов
 */
export const modalSizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl'
} as const

/**
 * Классы для анимации overlay
 */
export const overlayTransition = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0"
} as const

/**
 * Классы для анимации панели модала
 */
export const panelTransition = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95"
} as const

/**
 * Базовые классы для панели модала
 */
export const basePanelClasses = [
  // Базовые стили
  "w-full transform overflow-hidden rounded-2xl",
  "bg-white text-left align-middle shadow-xl transition-all",
  "border border-gray-100",
  // Тёмная тема
  "dark:bg-gray-900 dark:border-gray-800"
] as const

/**
 * Классы для overlay фона
 */
export const overlayClasses = "fixed inset-0 bg-black/25 backdrop-blur-sm"

/**
 * Классы для контейнера модала
 */
export const containerClasses = "fixed inset-0 overflow-y-auto"

/**
 * Классы для центрирования
 */
export const centeringClasses = "flex min-h-full items-center justify-center p-4 text-center"