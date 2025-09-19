import React from 'react'
import { cn } from '../../../lib/utils'

// Импорты модулей
import { levelBadgeVariants } from './LevelBadgeVariants'
import { type LevelBadgeProps } from './LevelBadgeTypes'
import {
  getLevelVariant,
  formatLevel,
  shouldGlow,
  shouldShowParticles,
  shouldShimmer,
  shouldShowLabel,
  getTextSizeClasses,
  getA11yProps,
  createKeyboardHandler,
  getTextShadowStyle,
  useAnimationState
} from './LevelBadgeLogic'

/**
 * 🎨 Enhanced LevelBadge Component
 * 
 * Современный компонент для отображения уровня игрока с автоматическим выбором стиля
 * на основе достижения, анимациями и различными эффектами.
 * Основан на лучших практиках gaming UI дизайна.
 * 
 * @example
 * // Базовое использование
 * <LevelBadge level={25} />
 * 
 * // С автоматическим вариантом на основе прогресса
 * <LevelBadge level={85} maxLevel={100} />
 * 
 * // Интерактивный с лейблом
 * <LevelBadge 
 *   level={42}
 *   showLabel
 *   interactive
 *   animated
 *   onClick={() => console.log('Level clicked')}
 * />
 * 
 * // Кастомный стиль для особых достижений
 * <LevelBadge 
 *   level={999}
 *   variant="legendary"
 *   size="xl"
 *   shape="circle"
 *   glow
 * />
 */
export const LevelBadge = React.forwardRef<HTMLDivElement, LevelBadgeProps>(
  ({
    className,
    variant,
    size = "md",
    shape = "rounded",
    interactive = false,
    glow = false,
    level,
    maxLevel = 100,
    showLabel = false,
    onClick,
    animated = false,
    ...props
  }, ref) => {
    // Автоматический выбор варианта если не указан
    const autoVariant = variant || getLevelVariant(level, maxLevel)
    
    // Форматирование числа уровня
    const displayLevel = formatLevel(level)
    
    // Состояние анимации
    const isAnimating = useAnimationState(level, animated)
    
    // Обработчик клавиатуры
    const keyboardHandler = createKeyboardHandler(onClick)

    return (
      <div
        ref={ref}
        className={cn(
          levelBadgeVariants({ 
            variant: autoVariant, 
            size, 
            shape,
            interactive,
            glow: glow || isAnimating || shouldGlow(autoVariant)
          }),
          // Анимация изменения уровня
          isAnimating && "animate-bounce",
          className
        )}
        onClick={onClick}
        onKeyDown={keyboardHandler}
        {...getA11yProps(!!interactive, level, maxLevel)}
        {...props}
      >
        {/* Фоновый эффект свечения для высоких уровней */}
        {shouldShimmer(autoVariant) && (
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" 
            style={{ animation: 'shimmer 3s infinite linear' }} 
          />
        )}
        
        {/* Контент */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Лейбл LVL для больших размеров */}
          {shouldShowLabel(size, showLabel) && (
            <span className="text-xs opacity-75 font-medium leading-none mb-0.5">
              LVL
            </span>
          )}
          
          {/* Номер уровня */}
          <span 
            className={cn(
              "font-bold tabular-nums leading-none",
              // Тень для читаемости
              "drop-shadow-sm",
              // Размер текста в зависимости от длины числа
              ...getTextSizeClasses(displayLevel)
            )}
            style={getTextShadowStyle(autoVariant)}
          >
            {displayLevel}
          </span>
        </div>
        
        {/* Эффект частиц для легендарного уровня */}
        {shouldShowParticles(autoVariant) && (
          <>
            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping opacity-75" />
            <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-300 opacity-75" />
            <div className="absolute top-1 right-2 w-0.5 h-0.5 bg-white rounded-full animate-ping animation-delay-700 opacity-75" />
          </>
        )}
      </div>
    )
  }
)

LevelBadge.displayName = "LevelBadge"

// Экспорт всех типов и утилит для использования в других файлах
export * from './LevelBadgeTypes'
export * from './LevelBadgeVariants'
export * from './LevelBadgeLogic'