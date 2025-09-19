import { cva } from 'class-variance-authority'

/**
 * 🎯 NavLink Variants - Современная система навигационных ссылок с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Заменяет CSS класс .nav-link
 */
export const navLinkVariants = cva(
  // Базовые стили для навигационной ссылки
  [
    "block font-medium transition-all duration-200 select-none relative",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  ],
  {
    variants: {
      /**
       * Варианты стилизации
       */
      variant: {
        default: [
          "text-gray-600 dark:text-gray-400",
          "hover:text-gray-900 dark:hover:text-gray-100",
          "hover:bg-gray-100 dark:hover:bg-gray-800",
          "focus-visible:ring-gray-500"
        ],
        primary: [
          "text-indigo-600 dark:text-indigo-400",
          "hover:text-indigo-700 dark:hover:text-indigo-300",
          "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
          "focus-visible:ring-indigo-500"
        ],
        active: [
          "text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30",
          "hover:text-indigo-800 dark:hover:text-indigo-200",
          "hover:bg-indigo-100 dark:hover:bg-indigo-900/40",
          "focus-visible:ring-indigo-500"
        ],
        sidebar: [
          "text-gray-700 dark:text-gray-300",
          "hover:text-gray-900 dark:hover:text-gray-100",
          "hover:bg-white/60 dark:hover:bg-gray-800/60",
          "focus-visible:ring-gray-500"
        ]
      },

      /**
       * Размеры ссылки
       */
      size: {
        xs: "px-2 py-1 text-xs rounded-md",
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-2.5 text-sm rounded-lg",
        lg: "px-5 py-3 text-base rounded-xl"
      },

      /**
       * Состояние с иконкой
       */
      withIcon: {
        true: "flex items-center gap-2"
      },

      /**
       * Состояние активности
       */
      isActive: {
        true: "",
        false: ""
      },

      /**
       * Disabled состояние
       */
      disabled: {
        true: [
          "opacity-50 cursor-not-allowed pointer-events-none",
          "text-gray-400 dark:text-gray-600"
        ]
      }
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
      withIcon: false,
      isActive: false,
      disabled: false
    }
  }
)