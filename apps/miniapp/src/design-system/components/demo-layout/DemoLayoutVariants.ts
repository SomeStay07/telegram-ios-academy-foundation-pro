import { cva } from 'class-variance-authority'

/**
 * 🎯 DemoLayout CVA Variants
 * 
 * Модульный файл содержащий все варианты стилизации для демо компонентов
 * Основан на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Разделен из основного DemoLayout.tsx для улучшения организации кода
 */

/**
 * 🎯 DemoSection Variants - Современная система для демо секций с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Заменяет CSS класс .demo-section
 */
export const demoSectionVariants = cva(
  [
    "p-8 rounded-2xl shadow-sm border transition-colors duration-200",
    "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"
  ],
  {
    variants: {
      /**
       * Размеры секции
       */
      size: {
        sm: "p-6 mb-8",
        md: "p-8 mb-10", 
        lg: "p-8 mb-12",
        xl: "p-10 mb-16"
      },

      /**
       * Варианты стилизации
       */
      variant: {
        default: "",
        elevated: "shadow-md hover:shadow-lg transition-shadow duration-200",
        bordered: "border-2",
        glass: [
          "bg-white/60 dark:bg-gray-900/60 backdrop-blur-md",
          "border-white/20 dark:border-gray-800/20"
        ]
      }
    },
    defaultVariants: {
      size: "lg",
      variant: "default"
    }
  }
)

/**
 * 🎯 DemoComponent Variants - Компонент для демонстрации элементов
 * Заменяет CSS класс .demo-component
 */
export const demoComponentVariants = cva(
  [
    "p-6 rounded-xl border transition-colors duration-200",
    "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
  ],
  {
    variants: {
      /**
       * Размеры компонента
       */
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8"
      },

      /**
       * Варианты стилизации
       */
      variant: {
        default: "",
        highlighted: [
          "bg-indigo-50 dark:bg-indigo-900/20",
          "border-indigo-200 dark:border-indigo-800"
        ],
        interactive: [
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "cursor-pointer transition-colors duration-200"
        ]
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
)

/**
 * 🎯 DemoGrid Variants - Система сетки для демо элементов
 * Заменяет CSS класс .demo-grid
 */
export const demoGridVariants = cva(
  "grid gap-6",
  {
    variants: {
      /**
       * Колонки сетки
       */
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      },

      /**
       * Размеры отступов
       */
      gap: {
        sm: "gap-4",
        md: "gap-6", 
        lg: "gap-8",
        xl: "gap-10"
      },

      /**
       * Адаптивность
       */
      responsive: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      columns: 3,
      gap: "md",
      responsive: true
    }
  }
)