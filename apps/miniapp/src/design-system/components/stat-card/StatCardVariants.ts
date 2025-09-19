import { cva } from 'class-variance-authority'

/**
 * 🎯 StatCard Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const statCardVariants = cva(
  // Базовые стили для всех статистических карточек
  [
    "relative p-6 bg-white border border-gray-100 rounded-2xl",
    "transition-all duration-300 ease-out overflow-hidden",
    "dark:bg-gray-900 dark:border-gray-800",
    "group cursor-pointer"
  ],
  {
    variants: {
      /**
       * Варианты карточек статистики
       */
      variant: {
        default: [
          "hover:shadow-lg hover:-translate-y-1 hover:border-gray-200",
          "dark:hover:border-gray-700"
        ],
        elevated: [
          "shadow-md hover:shadow-xl hover:-translate-y-2",
          "hover:border-gray-200 dark:hover:border-gray-700"
        ],
        gradient: [
          "bg-gradient-to-br from-white to-gray-50",
          "dark:from-gray-900 dark:to-gray-800",
          "hover:shadow-lg hover:-translate-y-1"
        ],
        minimal: [
          "border-transparent bg-gray-50/50 backdrop-blur-sm",
          "dark:bg-gray-800/50",
          "hover:bg-white hover:border-gray-200 hover:shadow-md",
          "dark:hover:bg-gray-900 dark:hover:border-gray-700"
        ]
      },

      /**
       * Размеры карточек
       */
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      },

      /**
       * Цветовые акценты
       */
      accent: {
        none: "",
        primary: "border-l-4 border-l-indigo-500",
        success: "border-l-4 border-l-emerald-500",
        warning: "border-l-4 border-l-amber-500",
        danger: "border-l-4 border-l-red-500",
        info: "border-l-4 border-l-sky-500"
      },

      /**
       * Интерактивность
       */
      interactive: {
        true: "active:scale-[0.98] hover:scale-[1.02]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      accent: "none",
      interactive: true
    }
  }
)

/**
 * 🎨 Trend Indicator Variants
 */
export const trendVariants = cva(
  [
    "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
    "transition-colors duration-200"
  ],
  {
    variants: {
      trend: {
        up: [
          "bg-emerald-100 text-emerald-600",
          "dark:bg-emerald-900/30 dark:text-emerald-400"
        ],
        down: [
          "bg-red-100 text-red-600", 
          "dark:bg-red-900/30 dark:text-red-400"
        ],
        neutral: [
          "bg-gray-100 text-gray-600",
          "dark:bg-gray-800 dark:text-gray-400"
        ]
      }
    },
    defaultVariants: {
      trend: "neutral"
    }
  }
)