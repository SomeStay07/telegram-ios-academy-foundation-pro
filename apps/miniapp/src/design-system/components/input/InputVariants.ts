import { cva } from 'class-variance-authority'

/**
 * 🎯 Input Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const inputVariants = cva(
  // Базовые стили для всех инпутов
  [
    "w-full px-4 py-3 text-sm font-medium transition-all duration-200",
    "border border-gray-200 rounded-xl bg-white",
    "placeholder:text-gray-400 text-gray-900",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
    // Тёмная тема
    "dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100",
    "dark:placeholder:text-gray-500 dark:disabled:bg-gray-800"
  ],
  {
    variants: {
      /**
       * Варианты инпутов - от базовых до акцентных
       */
      variant: {
        default: [
          "border-gray-200 focus:ring-indigo-500 focus:border-indigo-500",
          "hover:border-gray-300",
          "dark:border-gray-700 dark:focus:border-indigo-400 dark:hover:border-gray-600"
        ],
        filled: [
          "bg-gray-50 border-transparent focus:bg-white focus:ring-indigo-500",
          "hover:bg-gray-100",
          "dark:bg-gray-800 dark:focus:bg-gray-900 dark:hover:bg-gray-700"
        ],
        outline: [
          "border-2 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
          "hover:border-gray-400",
          "dark:border-gray-600 dark:focus:border-indigo-400 dark:hover:border-gray-500"
        ],
        ghost: [
          "border-transparent bg-transparent focus:ring-indigo-500 focus:bg-white focus:border-gray-200",
          "hover:bg-gray-50",
          "dark:focus:bg-gray-900 dark:focus:border-gray-700 dark:hover:bg-gray-800"
        ],
        success: [
          "border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500",
          "hover:border-emerald-300",
          "dark:border-emerald-800 dark:focus:border-emerald-400"
        ],
        warning: [
          "border-amber-200 focus:ring-amber-500 focus:border-amber-500",
          "hover:border-amber-300",
          "dark:border-amber-800 dark:focus:border-amber-400"
        ],
        error: [
          "border-red-200 focus:ring-red-500 focus:border-red-500",
          "hover:border-red-300",
          "dark:border-red-800 dark:focus:border-red-400"
        ]
      },

      /**
       * Размеры инпутов
       */
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
        xl: "px-6 py-5 text-lg"
      },

      /**
       * Дополнительные модификаторы
       */
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
 * 🎨 Input Label Variants
 */
export const labelVariants = cva(
  [
    "block text-sm font-medium mb-2",
    "text-gray-700 dark:text-gray-300"
  ],
  {
    variants: {
      variant: {
        default: "",
        required: "after:content-['*'] after:ml-1 after:text-red-500"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)