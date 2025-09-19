import React from 'react'
import { cn } from '../../../lib/utils'
import type { StatCardProps } from './StatCardTypes'
import { statCardVariants, trendVariants } from './StatCardVariants'
import { 
  StatCardSkeleton, 
  createStatCardAccessibilityProps,
  renderTrendArrow 
} from './StatCardLogic'

/**
 * 🎨 Enhanced StatCard Component
 * 
 * Современная статистическая карточка с полной поддержкой анимаций, трендов и accessibility.
 * Основана на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <StatCard value="1,234" label="Пользователи" />
 * 
 * // С иконкой и трендом
 * <StatCard 
 *   value="₽89,432"
 *   label="Выручка"
 *   icon={<TrendingUpIcon />}
 *   trend="up"
 *   trendValue="+12.5%"
 *   accent="success"
 * />
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({
    className,
    variant = "default",
    size = "md",
    accent = "none",
    interactive = true,
    value,
    label,
    subValue,
    description,
    icon,
    trend,
    trendValue,
    valueColor,
    backgroundGradient,
    onClick,
    loading = false,
    ...props
  }, ref) => {
    const accessibilityProps = createStatCardAccessibilityProps(onClick)

    if (loading) {
      return (
        <div
          className={cn(
            statCardVariants({ variant, size, accent, interactive: false }),
            className
          )}
        >
          <StatCardSkeleton />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          statCardVariants({ variant, size, accent, interactive }),
          className
        )}
        onClick={onClick}
        {...accessibilityProps}
        style={{
          background: backgroundGradient || undefined
        }}
        {...props}
      >
        {/* Фоновый эффект при наведении */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        {/* Header с иконкой и трендом */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:scale-110 transition-transform duration-200">
                {icon}
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {label}
              </h3>
              {description && (
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {/* Индикатор тренда */}
          {trend && trendValue && (
            <div className={cn(trendVariants({ trend }))}>
              <span className="text-xs">
                {renderTrendArrow(trend)}
              </span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* Основное значение */}
        <div className="space-y-1">
          <div 
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:scale-105 transition-transform duration-200 origin-left"
            style={{ color: valueColor || undefined }}
          >
            {value}
          </div>
          
          {/* Дополнительное значение */}
          {subValue && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subValue}
            </p>
          )}
        </div>

        {/* Декоративные элементы */}
        <div className="absolute -top-4 -right-4 h-24 w-24 bg-gradient-to-br from-gray-100/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute -bottom-4 -left-4 h-16 w-16 bg-gradient-to-tr from-gray-100/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    )
  }
)

StatCard.displayName = "StatCard"