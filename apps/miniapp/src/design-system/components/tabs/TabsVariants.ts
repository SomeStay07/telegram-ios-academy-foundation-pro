import { cva } from 'class-variance-authority'
import { ANIMATION } from '../../../shared/constants/design-tokens'

/**
 * 🎯 Tabs Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const tabsVariants = cva(
  // Базовые стили для контейнера табов
  [
    "flex flex-col",
    `transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`
  ],
  {
    variants: {
      /**
       * Варианты табов
       */
      variant: {
        default: "bg-transparent",
        card: [
          "bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800",
          "p-6"
        ],
        minimal: "bg-transparent"
      },

      /**
       * Размеры
       */
      size: {
        sm: "",
        md: "",
        lg: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/**
 * 🎨 Tab List Variants
 */
export const tabListVariants = cva(
  [
    "flex gap-2 mb-6",
    `transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`
  ],
  {
    variants: {
      variant: {
        default: "border-b border-gray-200 dark:border-gray-700 pb-2",
        pills: "bg-gray-100 dark:bg-gray-800 p-1 rounded-xl",
        buttons: "gap-3"
      },
      size: {
        sm: "mb-4",
        md: "mb-6", 
        lg: "mb-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/**
 * 🎨 Tab Button Variants
 */
export const tabButtonVariants = cva(
  [
    `relative px-4 py-2 text-sm font-medium transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`,
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "select-none cursor-pointer"
  ],
  {
    variants: {
      variant: {
        default: [
          "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
          "border-b-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600",
          "data-[selected=true]:text-indigo-600 dark:data-[selected=true]:text-indigo-400",
          "data-[selected=true]:border-indigo-600 dark:data-[selected=true]:border-indigo-400"
        ],
        pills: [
          "rounded-lg text-gray-600 dark:text-gray-400",
          "hover:text-gray-900 dark:hover:text-gray-100",
          "data-[selected=true]:bg-white dark:data-[selected=true]:bg-gray-700",
          "data-[selected=true]:text-gray-900 dark:data-[selected=true]:text-gray-100",
          "data-[selected=true]:shadow-sm"
        ],
        buttons: [
          "rounded-xl border border-gray-200 dark:border-gray-700",
          "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400",
          "hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600",
          "data-[selected=true]:bg-indigo-50 dark:data-[selected=true]:bg-indigo-950/30",
          "data-[selected=true]:text-indigo-600 dark:data-[selected=true]:text-indigo-400",
          "data-[selected=true]:border-indigo-200 dark:data-[selected=true]:border-indigo-800"
        ]
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

/**
 * 🎨 Tab Content Variants
 */
export const tabContentVariants = cva(
  [
    "focus:outline-none",
    `transition-all duration-[${ANIMATION.DURATION.NORMAL}ms]`
  ],
  {
    variants: {
      variant: {
        default: "",
        card: "bg-gray-50 dark:bg-gray-800 rounded-xl p-4",
        minimal: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)