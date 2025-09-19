/**
 * 🔧 Utility Functions for NavLink
 */

/**
 * Проверяет, является ли ссылка текущей страницей
 */
export const isCurrentPage = (href: string): boolean => {
  if (typeof window === 'undefined') return false
  return window.location.hash === href || window.location.pathname === href
}

/**
 * Обработчик плавной прокрутки для якорных ссылок
 */
export const handleSmoothScroll = (
  href: string, 
  external: boolean,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
) => {
  return (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Плавная прокрутка для якорных ссылок
    if (href.startsWith('#') && !external) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
        // Обновляем URL без перезагрузки
        window.history.pushState(null, '', href)
      }
    }

    onClick?.(e)
  }
}

/**
 * Определяет эффективный вариант на основе активности
 */
export const getEffectiveVariant = (
  isActive: boolean, 
  variant: string = 'default'
): string => {
  return isActive ? 'active' : variant
}

/**
 * Проверяет наличие иконки
 */
export const hasIcon = (
  withIcon?: boolean, 
  icon?: React.ReactNode
): boolean => {
  return withIcon ?? !!icon
}