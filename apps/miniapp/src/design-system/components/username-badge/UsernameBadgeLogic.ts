/**
 * 🔧 Utility Functions for UsernameBadge
 */

/**
 * Копирует текст в буфер обмена
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      textArea.setSelectionRange(0, 99999)
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (err) {
    console.warn('Failed to copy username to clipboard:', err)
    return false
  }
}

/**
 * Создает обработчик клика для UsernameBadge
 */
export const createClickHandler = (
  copyOnClick: boolean,
  username: string,
  onClick?: () => void,
  setCopied?: (value: boolean) => void
) => {
  return async () => {
    if (copyOnClick) {
      const success = await copyToClipboard(username)
      if (success && setCopied) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }
    onClick?.()
  }
}

/**
 * Определяет является ли компонент интерактивным
 */
export const isInteractive = (
  interactive: boolean,
  copyOnClick: boolean,
  onClick?: () => void
): boolean => {
  return interactive || copyOnClick || !!onClick
}

/**
 * Создает подсказку для UsernameBadge
 */
export const createTooltip = (
  copied: boolean,
  copyOnClick: boolean
): string | undefined => {
  if (copied) return "Скопировано!"
  if (copyOnClick) return "Нажмите, чтобы скопировать"
  return undefined
}