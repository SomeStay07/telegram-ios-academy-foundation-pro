import { cva } from 'class-variance-authority'

/**
 * 🎯 Progress Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const progressVariants = cva(
  // Базовые стили для контейнера прогресса
  [
    "relative overflow-hidden transition-all duration-300",
    "bg-gray-100 dark:bg-gray-800"
  ],
  {
    variants: {
      /**
       * Варианты прогресса - от базовых до акцентных
       */
      variant: {
        default: [
          "bg-gray-200 dark:bg-gray-700"
        ],
        primary: [
          "bg-indigo-100 dark:bg-indigo-900/30"
        ],
        success: [
          "bg-emerald-100 dark:bg-emerald-900/30"
        ],
        warning: [
          "bg-amber-100 dark:bg-amber-900/30"
        ],
        danger: [
          "bg-red-100 dark:bg-red-900/30"
        ],
        info: [
          "bg-sky-100 dark:bg-sky-900/30"
        ],
        gradient: [
          "bg-gradient-to-r from-gray-100 to-gray-200",
          "dark:from-gray-800 dark:to-gray-700"
        ]
      },

      /**
       * Размеры прогресса
       */
      size: {
        xs: "h-1",
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-6"
      },

      /**
       * Форма прогресса
       */
      shape: {
        rounded: "rounded-full",
        square: "rounded-none",
        semi: "rounded-lg"
      },

      /**
       * Дополнительные модификаторы
       */
      animated: {
        true: "animate-pulse"
      },
      striped: {
        true: "bg-stripe-pattern"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded"
    }
  }
)

/**
 * 🎨 Progress Bar Variants
 */
export const progressBarVariants = cva(
  // Базовые стили для полоски прогресса
  [
    "h-full transition-all duration-500 ease-out",
    "relative overflow-hidden"
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-gray-600 dark:bg-gray-400"
        ],
        primary: [
          "bg-indigo-500 dark:bg-indigo-400"
        ],
        success: [
          "bg-emerald-500 dark:bg-emerald-400"
        ],
        warning: [
          "bg-amber-500 dark:bg-amber-400"
        ],
        danger: [
          "bg-red-500 dark:bg-red-400"
        ],
        info: [
          "bg-sky-500 dark:bg-sky-400"
        ],
        gradient: [
          "bg-gradient-to-r from-indigo-500 to-purple-500",
          "dark:from-indigo-400 dark:to-purple-400"
        ]
      },
      animated: {
        true: [
          "before:absolute before:inset-0",
          "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
          "before:animate-shimmer before:-translate-x-full"
        ]
      },
      striped: {
        true: [
          "bg-stripe-diagonal bg-stripe-size-sm",
          "bg-stripe-color-white/20"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)