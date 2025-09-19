import { cva } from 'class-variance-authority'

/**
 * 🎯 Avatar Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const avatarVariants = cva(
  // Базовые стили для всех аватаров
  [
    "relative inline-flex items-center justify-center flex-shrink-0",
    "bg-gray-100 text-gray-600 font-medium",
    "dark:bg-gray-800 dark:text-gray-300",
    "overflow-hidden transition-all duration-200",
    "select-none"
  ],
  {
    variants: {
      /**
       * Размеры аватаров
       */
      size: {
        xs: "h-6 w-6 text-xs",
        sm: "h-8 w-8 text-sm",
        md: "h-10 w-10 text-base",
        lg: "h-12 w-12 text-lg",
        xl: "h-16 w-16 text-xl",
        "2xl": "h-20 w-20 text-2xl",
        "3xl": "h-24 w-24 text-3xl"
      },

      /**
       * Форма аватара
       */
      shape: {
        circle: "rounded-full",
        rounded: "rounded-xl",
        square: "rounded-lg"
      },

      /**
       * Варианты цветовых схем
       */
      variant: {
        default: [
          "bg-gray-100 text-gray-600",
          "dark:bg-gray-800 dark:text-gray-300"
        ],
        primary: [
          "bg-indigo-100 text-indigo-600",
          "dark:bg-indigo-900/30 dark:text-indigo-400"
        ],
        success: [
          "bg-emerald-100 text-emerald-600",
          "dark:bg-emerald-900/30 dark:text-emerald-400"
        ],
        warning: [
          "bg-amber-100 text-amber-600",
          "dark:bg-amber-900/30 dark:text-amber-400"
        ],
        danger: [
          "bg-red-100 text-red-600",
          "dark:bg-red-900/30 dark:text-red-400"
        ],
        info: [
          "bg-sky-100 text-sky-600",
          "dark:bg-sky-900/30 dark:text-sky-400"
        ]
      },

      /**
       * Дополнительные модификаторы
       */
      interactive: {
        true: "cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
      },
      ring: {
        true: "ring-2 ring-white dark:ring-gray-900",
        primary: "ring-2 ring-indigo-500",
        success: "ring-2 ring-emerald-500",
        warning: "ring-2 ring-amber-500",
        danger: "ring-2 ring-red-500"
      }
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      variant: "default"
    }
  }
)

/**
 * 🎨 Avatar Status Variants
 */
export const statusVariants = cva(
  [
    "absolute rounded-full border-2 border-white dark:border-gray-900",
    "transition-all duration-200"
  ],
  {
    variants: {
      size: {
        xs: "h-2 w-2 -bottom-0 -right-0",
        sm: "h-2.5 w-2.5 -bottom-0 -right-0",
        md: "h-3 w-3 -bottom-0.5 -right-0.5",
        lg: "h-3.5 w-3.5 -bottom-0.5 -right-0.5",
        xl: "h-4 w-4 -bottom-1 -right-1",
        "2xl": "h-5 w-5 -bottom-1 -right-1",
        "3xl": "h-6 w-6 -bottom-1.5 -right-1.5"
      },
      status: {
        online: "bg-emerald-500",
        offline: "bg-gray-400",
        away: "bg-amber-500",
        busy: "bg-red-500"
      }
    },
    defaultVariants: {
      size: "md",
      status: "offline"
    }
  }
)