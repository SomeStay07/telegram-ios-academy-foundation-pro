import { SpacerSize } from './SpacerTypes'

/**
 * 🔧 Utility Functions
 */
export const getResponsiveClasses = (size: string, direction: string): string => {
  const sizeMap = {
    'xs': '2',
    'sm': '4', 
    'md': '6',
    'lg': '8',
    'xl': '10',
    '2xl': '12',
    '3xl': '16',
    '4xl': '20',
    '5xl': '24'
  }
  
  const directionMap = {
    'bottom': 'mb',
    'top': 'mt',
    'both': 'my',
    'horizontal': 'mx',
    'all': 'm'
  }
  
  const baseClass = `${directionMap[direction as keyof typeof directionMap]}-${sizeMap[size as keyof typeof sizeMap]}`
  
  return [
    `${baseClass} md:${baseClass.replace(/\d+/, (match) => String(parseInt(match) + 2))}`,
    `lg:${baseClass.replace(/\d+/, (match) => String(parseInt(match) + 4))}`
  ].join(' ')
}

/**
 * 🔧 Hook для использования spacing значений в JavaScript
 */
export const useSpacing = () => {
  const spacing = {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '2.5rem',    // 40px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '5rem',   // 80px
    '5xl': '6rem'    // 96px
  }

  const getSpacing = (size: SpacerSize): string => {
    return spacing[size!] || spacing.lg
  }

  return { spacing, getSpacing }
}