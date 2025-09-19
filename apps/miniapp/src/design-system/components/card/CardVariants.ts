import { cva } from 'class-variance-authority'

/**
 * 🎯 Card Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const cardVariants = cva(
  // Базовые стили для всех карточек
  [
    "bg-white border border-gray-100 rounded-2xl transition-all duration-200",
    "dark:bg-gray-900 dark:border-gray-800",
    "overflow-hidden"
  ],
  {
    variants: {
      /**
       * Варианты карточек - от минимальных до акцентных
       */
      variant: {
        default: [
          "shadow-sm hover:shadow-md",
          "hover:-translate-y-0.5"
        ],
        elevated: [
          "shadow-lg hover:shadow-xl",
          "hover:-translate-y-1"
        ],
        outline: [
          "border-2 border-gray-200 shadow-none",
          "hover:border-gray-300 hover:shadow-sm",
          "dark:border-gray-700 dark:hover:border-gray-600"
        ],
        ghost: [
          "border-transparent shadow-none bg-transparent",
          "hover:bg-gray-50 hover:border-gray-100",
          "dark:hover:bg-gray-800/50 dark:hover:border-gray-800"
        ],
        gradient: [
          "bg-gradient-to-br from-white to-gray-50 shadow-md",
          "hover:shadow-lg hover:-translate-y-0.5",
          "dark:from-gray-900 dark:to-gray-800"
        ]
      },

      /**
       * Размеры карточек
       */
      size: {
        sm: "p-4",
        md: "p-6", 
        lg: "p-8",
        xl: "p-10"
      },

      /**
       * Дополнительные модификаторы
       */
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/**
 * 🎨 Card Header Variants
 */
export const cardHeaderVariants = cva(
  [
    "flex items-center gap-3 mb-4",
    "border-b border-gray-100 pb-4",
    "dark:border-gray-800"
  ],
  {
    variants: {
      variant: {
        default: "",
        minimal: "border-none pb-2 mb-2",
        bold: "border-b-2 border-gray-200 dark:border-gray-700"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)