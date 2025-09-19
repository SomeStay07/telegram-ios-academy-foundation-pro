import { cva } from 'class-variance-authority'

/**
 * 🎯 UsernameBadge Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Заменяет CSS класс .username-badge-modern
 */
export const usernameBadgeVariants = cva(
  // Базовые стили для бейджа юзернейма
  [
    "inline-flex items-center gap-1 font-medium transition-all duration-200",
    "rounded-xl select-none"
  ],
  {
    variants: {
      /**
       * Варианты стилизации
       */
      variant: {
        default: [
          "bg-white/10 text-white/90 border border-white/20",
          "backdrop-blur-sm"
        ],
        modern: [
          "bg-gradient-to-r from-white/15 to-white/5 text-white",
          "border border-white/25 backdrop-blur-md",
          "shadow-lg shadow-black/20"
        ],
        glass: [
          "bg-white/5 text-white border border-white/10",
          "backdrop-blur-xl"
        ],
        solid: [
          "bg-gray-800 text-gray-100 border border-gray-700",
          "dark:bg-gray-200 dark:text-gray-800 dark:border-gray-300"
        ],
        telegram: [
          "bg-sky-500/20 text-sky-200 border border-sky-400/30",
          "backdrop-blur-sm"
        ],
        gaming: [
          "bg-gradient-to-r from-indigo-500/20 to-purple-500/20",
          "text-indigo-200 border border-indigo-400/30 backdrop-blur-sm"
        ]
      },

      /**
       * Размеры бейджа
       */
      size: {
        xs: "px-2 py-1 text-xs rounded-lg",
        sm: "px-3 py-1.5 text-xs rounded-xl", 
        md: "px-3 py-2 text-sm rounded-xl",
        lg: "px-4 py-2.5 text-base rounded-xl",
        xl: "px-5 py-3 text-lg rounded-2xl"
      },

      /**
       * Интерактивность
       */
      interactive: {
        true: [
          "cursor-pointer hover:scale-105 active:scale-95",
          "hover:shadow-lg hover:shadow-white/10"
        ]
      },

      /**
       * Состояние "онлайн"
       */
      online: {
        true: [
          "before:absolute before:w-2 before:h-2 before:bg-emerald-400",
          "before:rounded-full before:-top-1 before:-right-1",
          "before:ring-2 before:ring-white/50 relative"
        ]
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
      online: false
    }
  }
)