import { cva } from 'class-variance-authority'

/**
 * 🎯 QuizItem Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * 
 * Модульный файл содержащий все CVA варианты для компонента викторины
 * Разделен из основного QuizItem.tsx для улучшения читаемости
 */

/**
 * 🎯 QuizItem Base Variants
 */
export const quizItemVariants = cva(
  // Базовые стили для элемента викторины
  [
    "w-full transition-all duration-300"
  ],
  {
    variants: {
      /**
       * Состояние викторины
       */
      state: {
        unanswered: "",
        correct: "border-l-4 border-l-emerald-500",
        incorrect: "border-l-4 border-l-red-500",
        disabled: "opacity-60 pointer-events-none"
      },

      /**
       * Размеры
       */
      size: {
        sm: "",
        md: "",
        lg: ""
      },

      /**
       * Варианты отображения
       */
      variant: {
        default: "",
        compact: "",
        card: ""
      }
    },
    defaultVariants: {
      state: "unanswered",
      size: "md",
      variant: "default"
    }
  }
)

/**
 * 🎨 Question Variants
 */
export const questionVariants = cva(
  [
    "font-semibold text-gray-900 dark:text-gray-100 mb-6",
    "leading-relaxed"
  ],
  {
    variants: {
      size: {
        sm: "text-base mb-4",
        md: "text-lg mb-6",
        lg: "text-xl mb-8"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
)

/**
 * 🎨 Option Button Variants
 */
export const optionVariants = cva(
  [
    "w-full p-4 text-left rounded-xl border-2 transition-all duration-200",
    "hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:cursor-not-allowed"
  ],
  {
    variants: {
      state: {
        default: [
          "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900",
          "hover:border-gray-300 dark:hover:border-gray-600",
          "focus:ring-indigo-500 text-gray-900 dark:text-gray-100"
        ],
        selected: [
          "border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-950/30",
          "text-indigo-900 dark:text-indigo-100"
        ],
        correct: [
          "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
          "text-emerald-900 dark:text-emerald-100"
        ],
        incorrect: [
          "border-red-500 bg-red-50 dark:bg-red-950/30",
          "text-red-900 dark:text-red-100"
        ],
        correctAnswer: [
          "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/40",
          "text-emerald-900 dark:text-emerald-100"
        ]
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
)

/**
 * 🎨 Result Message Variants
 */
export const resultVariants = cva(
  [
    "mt-6 p-4 rounded-xl border-l-4 transition-all duration-300",
    "animate-in slide-in-from-bottom-2"
  ],
  {
    variants: {
      type: {
        correct: [
          "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
          "text-emerald-900 dark:text-emerald-100"
        ],
        incorrect: [
          "border-l-red-500 bg-red-50 dark:bg-red-950/30",
          "text-red-900 dark:text-red-100"
        ]
      }
    },
    defaultVariants: {
      type: "correct"
    }
  }
)

/**
 * 🎨 Selection Indicator Variants
 */
export const selectionIndicatorVariants = cva(
  [
    "flex-shrink-0 mt-0.5 transition-all duration-200"
  ],
  {
    variants: {
      type: {
        checkbox: "w-4 h-4 border-2 rounded",
        radio: "w-4 h-4 border-2 rounded-full"
      },
      state: {
        default: "border-gray-300 dark:border-gray-600",
        selected: [
          "bg-indigo-500 border-indigo-500",
          "ring-2 ring-indigo-200 dark:ring-indigo-800"
        ],
        correct: "bg-emerald-500 border-emerald-500",
        incorrect: "bg-red-500 border-red-500"
      }
    },
    defaultVariants: {
      type: "radio",
      state: "default"
    }
  }
)

/**
 * 🎨 Progress Indicator Variants
 */
export const progressVariants = cva(
  [
    "w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2",
    "overflow-hidden transition-all duration-300"
  ],
  {
    variants: {
      variant: {
        default: "",
        animated: "animate-pulse",
        gradient: "bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

/**
 * 🎨 Timer Variants
 */
export const timerVariants = cva(
  [
    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
    "transition-all duration-200"
  ],
  {
    variants: {
      status: {
        normal: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300",
        warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
        critical: [
          "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
          "animate-pulse"
        ]
      }
    },
    defaultVariants: {
      status: "normal"
    }
  }
)

/**
 * 🎨 Animation Variants для результатов
 */
export const animationVariants = {
  slideIn: "animate-in slide-in-from-bottom-2 duration-300",
  fadeIn: "animate-in fade-in duration-300",
  bounceIn: "animate-bounce",
  pulseOnce: "animate-pulse",
  shakeOnError: "animate-pulse"
} as const

/**
 * 🎨 Feedback Icon Variants
 */
export const feedbackIconVariants = cva(
  [
    "flex-shrink-0 transition-all duration-200"
  ],
  {
    variants: {
      type: {
        success: "text-emerald-500",
        error: "text-red-500", 
        info: "text-indigo-500",
        warning: "text-amber-500"
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6"
      },
      animated: {
        true: "animate-pulse",
        false: ""
      }
    },
    defaultVariants: {
      type: "success",
      size: "md",
      animated: false
    }
  }
)

/**
 * 🔧 Утилиты для объединения вариантов
 */
export const combineQuizVariants = (
  baseVariant: keyof typeof quizItemVariants.variants.variant,
  additionalClasses: string[]
): string[] => {
  const base = quizItemVariants.variants.variant[baseVariant]
  return Array.isArray(base) ? [...base, ...additionalClasses] : [base, ...additionalClasses]
}

/**
 * 📱 Мобильные оптимизации для викторины
 */
export const mobileQuizOptimizations = {
  touchTarget: "min-h-[44px] min-w-[44px]", // Apple HIG recommendations
  tapHighlight: "tap-highlight-transparent",
  userSelect: "select-none",
  spacing: "gap-4 p-4" // Больше отступы на мобильных
} as const

/**
 * 🎭 Темные варианты (для темной темы)
 */
export const darkModeVariants = {
  background: "dark:bg-gray-900",
  text: "dark:text-gray-100",
  border: "dark:border-gray-700",
  hover: "dark:hover:bg-gray-800"
} as const

/**
 * ✨ Специальные эффекты
 */
export const specialEffects = {
  glow: "shadow-lg shadow-indigo-500/25",
  pulse: "animate-pulse",
  bounce: "animate-bounce",
  shake: "animate-shake"
} as const