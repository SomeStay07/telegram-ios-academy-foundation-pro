/**
 * 🔧 Modal Logic and Utilities
 * 
 * Содержит вспомогательные функции и логику для модальных компонентов
 */

/**
 * Обработчик закрытия модала с проверкой closable
 */
export const createCloseHandler = (
  closable: boolean,
  onClose: () => void
) => {
  return closable ? onClose : () => {}
}

/**
 * Генерирует close button для модала без заголовка
 */
export const CloseIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

/**
 * Проверяет, нужно ли показывать header
 */
export const shouldShowHeader = (
  title?: string,
  description?: string
): boolean => {
  return !!(title || description)
}

/**
 * Проверяет, нужно ли показывать кнопку закрытия
 */
export const shouldShowCloseButton = (
  closable: boolean,
  title?: string
): boolean => {
  return closable && !title
}