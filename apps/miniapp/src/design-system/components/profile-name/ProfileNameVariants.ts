import { cva } from 'class-variance-authority'

/**
 * 🎯 ProfileName Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Заменяет CSS класс .profile-name-clean
 */
export const profileNameVariants = cva(
  // Базовые стили для имени профиля
  [
    "font-bold leading-tight tracking-tight transition-all duration-200",
    "text-white drop-shadow-sm"
  ],
  {
    variants: {
      /**
       * Размеры имени профиля
       */
      size: {
        sm: "text-2xl md:text-3xl mb-2",
        md: "text-3xl md:text-4xl lg:text-5xl mb-3", 
        lg: "text-4xl md:text-5xl lg:text-6xl mb-4",
        xl: "text-5xl md:text-6xl lg:text-7xl mb-4"
      },

      /**
       * Варианты стилизации
       */
      variant: {
        default: "",
        gradient: [
          "bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent",
          "dark:from-gray-100 dark:to-gray-300"
        ],
        glow: [
          "text-shadow-glow",
          "[text-shadow:_0_0_10px_rgba(255,255,255,0.5)]"
        ],
        gaming: [
          "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent",
          "dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300"
        ]
      },

      /**
       * Выравнивание
       */
      align: {
        left: "text-left",
        center: "text-center", 
        right: "text-right"
      },

      /**
       * Интерактивность
       */
      interactive: {
        true: "cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-200"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      align: "left",
      interactive: false
    }
  }
)