import { cva } from 'class-variance-authority'

/**
 * 🎯 LevelBadge CVA Variants
 * 
 * Модульный файл содержащий все варианты стилизации для компонента уровня
 * Основан на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Разделен из основного LevelBadge.tsx для улучшения организации кода
 */

/**
 * 🎯 LevelBadge Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Заменяет CSS класс .level-number-inside
 */
export const levelBadgeVariants = cva(
  // Базовые стили для бейджа уровня
  [
    "inline-flex items-center justify-center font-bold transition-all duration-200",
    "text-white shadow-lg relative overflow-hidden select-none"
  ],
  {
    variants: {
      /**
       * Варианты стилизации
       */
      variant: {
        default: [
          "bg-gradient-to-br from-gray-600 to-gray-800",
          "border border-gray-500"
        ],
        primary: [
          "bg-gradient-to-br from-indigo-500 to-indigo-700",
          "border border-indigo-400 shadow-indigo-500/25"
        ],
        success: [
          "bg-gradient-to-br from-emerald-500 to-emerald-700",
          "border border-emerald-400 shadow-emerald-500/25"
        ],
        warning: [
          "bg-gradient-to-br from-amber-500 to-amber-700",
          "border border-amber-400 shadow-amber-500/25"
        ],
        danger: [
          "bg-gradient-to-br from-red-500 to-red-700",
          "border border-red-400 shadow-red-500/25"
        ],
        gold: [
          "bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600",
          "border border-yellow-300 shadow-yellow-500/30",
          "text-yellow-900"
        ],
        platinum: [
          "bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500",
          "border border-slate-200 shadow-slate-400/30",
          "text-slate-800"
        ],
        diamond: [
          "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600",
          "border border-cyan-300 shadow-purple-500/30"
        ],
        legendary: [
          "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500",
          "border border-purple-300 shadow-purple-500/40",
          "animate-pulse"
        ]
      },

      /**
       * Размеры бейджа
       */
      size: {
        xs: "w-6 h-6 text-xs rounded-md",
        sm: "w-8 h-8 text-sm rounded-lg",
        md: "w-10 h-10 text-base rounded-xl", 
        lg: "w-12 h-12 text-lg rounded-xl",
        xl: "w-16 h-16 text-xl rounded-2xl"
      },

      /**
       * Форма бейджа
       */
      shape: {
        circle: "rounded-full",
        rounded: "", // использует размерные классы
        square: "rounded-none",
        hexagon: "clip-path-hexagon"
      },

      /**
       * Интерактивность
       */
      interactive: {
        true: [
          "cursor-pointer hover:scale-110 active:scale-95",
          "hover:shadow-xl transform-gpu"
        ]
      },

      /**
       * Эффект свечения
       */
      glow: {
        true: "animate-pulse shadow-2xl",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
      interactive: false,
      glow: false
    }
  }
)

/**
 * 🎨 Дополнительные CSS стили для анимаций
 * Эти стили должны быть добавлены в globals.css
 */
export const levelBadgeAnimationStyles = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-700 {
  animation-delay: 700ms;
}

.clip-path-hexagon {
  clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
}
`