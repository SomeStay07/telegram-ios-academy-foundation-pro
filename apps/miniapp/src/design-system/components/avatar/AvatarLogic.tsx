import React from 'react'
import { cn } from '../../../lib/utils'
import type { AvatarGroupProps, AvatarSize } from './AvatarTypes'

/**
 * 🔤 Функция генерации инициалов
 */
export const getInitials = (name: string): string => {
  return name
    .split(' ')
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

/**
 * 🎯 Default User Icon SVG
 */
export const DefaultUserIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn("h-3/5 w-3/5", className)}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

/**
 * 🎯 Avatar Group Component - Группа аватаров
 */
export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  max = 5,
  size = "md",
  className,
  children
}) => {
  const childrenArray = React.Children.toArray(children)
  const visibleChildren = childrenArray.slice(0, max)
  const remainingCount = Math.max(0, childrenArray.length - max)

  return (
    <div className={cn("flex -space-x-2", className)}>
      {visibleChildren.map((child, index) =>
        React.cloneElement(child as React.ReactElement, {
          key: index,
          size,
          ring: true,
          className: "relative z-10 hover:z-20"
        })
      )}
      
      {/* Показать количество оставшихся */}
      {remainingCount > 0 && (
        <div
          className={cn(
            // Avatar styles would be imported here
            "relative z-10 hover:z-20 ring-2 ring-white dark:ring-gray-900"
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

/**
 * 🎯 Avatar Accessibility Props
 */
export const createAvatarAccessibilityProps = (interactive?: boolean) => ({
  role: interactive ? "button" as const : undefined,
  tabIndex: interactive ? 0 : undefined,
})

/**
 * 🎯 Image Error Handler
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  // При ошибке загрузки скрываем изображение
  e.currentTarget.style.display = 'none'
}