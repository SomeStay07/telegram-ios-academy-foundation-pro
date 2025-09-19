import { cva } from 'class-variance-authority'

/**
 * 🎯 Tooltip Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const tooltipVariants = cva(
  // Базовые стили для всех тултипов
  [
    "absolute z-50 px-3 py-2 text-sm font-medium transition-all duration-200 ease-out",
    "bg-gray-900 text-gray-100 rounded-lg shadow-lg",
    "dark:bg-gray-100 dark:text-gray-900",
    "pointer-events-none select-none",
    "whitespace-nowrap max-w-xs",
    "border border-gray-700 dark:border-gray-300",
    "backdrop-blur-sm transform-gpu"
  ],
  {
    variants: {
      /**
       * Варианты тултипов - от базовых до акцентных
       */
      variant: {
        default: [
          "bg-gray-900 text-gray-100 border-gray-700",
          "dark:bg-gray-100 dark:text-gray-900 dark:border-gray-300"
        ],
        primary: [
          "bg-indigo-600 text-white border-indigo-500",
          "dark:bg-indigo-500 dark:border-indigo-400"
        ],
        success: [
          "bg-emerald-600 text-white border-emerald-500",
          "dark:bg-emerald-500 dark:border-emerald-400"
        ],
        warning: [
          "bg-amber-600 text-white border-amber-500",
          "dark:bg-amber-500 dark:border-amber-400"
        ],
        danger: [
          "bg-red-600 text-white border-red-500",
          "dark:bg-red-500 dark:border-red-400"
        ],
        info: [
          "bg-sky-600 text-white border-sky-500",
          "dark:bg-sky-500 dark:border-sky-400"
        ],
        
        // Новые полезные варианты
        dark: [
          "bg-gray-800 text-gray-100 border-gray-600",
          "dark:bg-gray-200 dark:text-gray-800 dark:border-gray-400"
        ],
        light: [
          "bg-white text-gray-900 border-gray-300 shadow-lg",
          "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
        ],
        telegram: [
          "bg-sky-500 text-white border-sky-400",
          "dark:bg-sky-400 dark:border-sky-300"
        ],
        minimal: [
          "bg-gray-50 text-gray-800 border-gray-200 shadow-sm",
          "dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
        ]
      },

      /**
       * Размеры тултипов
       */
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base"
      },

      /**
       * Позиция тултипа
       */
      position: {
        top: "mb-2",
        bottom: "mt-2",
        left: "mr-2",
        right: "ml-2"
      },

      /**
       * Состояние видимости с улучшенными анимациями
       */
      visible: {
        true: "opacity-100 scale-100 translate-y-0",
        false: "opacity-0 scale-95 translate-y-1 pointer-events-none"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      position: "top",
      visible: false
    }
  }
)

/**
 * 🎯 Tooltip Arrow Variants
 */
export const arrowVariants = cva(
  [
    "absolute w-2 h-2 rotate-45 border",
    "bg-gray-900 border-gray-700",
    "dark:bg-gray-100 dark:border-gray-300"
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gray-900 border-gray-700",
          "dark:bg-gray-100 dark:border-gray-300"
        ],
        primary: [
          "bg-indigo-600 border-indigo-500",
          "dark:bg-indigo-500 dark:border-indigo-400"
        ],
        success: [
          "bg-emerald-600 border-emerald-500",
          "dark:bg-emerald-500 dark:border-emerald-400"
        ],
        warning: [
          "bg-amber-600 border-amber-500",
          "dark:bg-amber-500 dark:border-amber-400"
        ],
        danger: [
          "bg-red-600 border-red-500",
          "dark:bg-red-500 dark:border-red-400"
        ],
        info: [
          "bg-sky-600 border-sky-500",
          "dark:bg-sky-500 dark:border-sky-400"
        ],
        dark: [
          "bg-gray-800 border-gray-600",
          "dark:bg-gray-200 dark:border-gray-400"
        ],
        light: [
          "bg-white border-gray-300",
          "dark:bg-gray-800 dark:border-gray-600"
        ],
        telegram: [
          "bg-sky-500 border-sky-400",
          "dark:bg-sky-400 dark:border-sky-300"
        ],
        minimal: [
          "bg-gray-50 border-gray-200",
          "dark:bg-gray-800 dark:border-gray-700"
        ]
      },
      position: {
        top: "-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0",
        bottom: "-top-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0",
        left: "-right-1 top-1/2 -translate-y-1/2 border-l-0 border-b-0",
        right: "-left-1 top-1/2 -translate-y-1/2 border-r-0 border-t-0"
      }
    },
    defaultVariants: {
      variant: "default",
      position: "top"
    }
  }
)