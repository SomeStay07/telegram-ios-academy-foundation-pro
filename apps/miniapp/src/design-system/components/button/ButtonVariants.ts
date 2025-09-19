import { cva } from 'class-variance-authority'

/**
 * 🎯 Button Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * 
 * Модульный файл содержащий все CVA варианты кнопок
 * Разделен из основного Button.tsx для улучшения читаемости
 */
export const buttonVariants = cva(
  // Базовые стили для всех кнопок
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-xl",
    "text-sm font-medium transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "relative overflow-hidden transform-gpu",
    // Улучшенные hover эффекты
    "hover:-translate-y-0.5 hover:shadow-lg hover:scale-[1.02]",
    "active:translate-y-0 active:scale-100",
    // Анимация пульсации для focus
    "focus-visible:animate-pulse"
  ],
  {
    variants: {
      /**
       * 🎨 Основные варианты кнопок
       */
      variant: {
        // Базовые варианты
        primary: [
          "bg-indigo-500 text-white shadow-md",
          "hover:bg-indigo-600 hover:shadow-indigo-500/25",
          "focus-visible:ring-indigo-500"
        ],
        secondary: [
          "bg-gray-100 text-gray-900 border border-gray-200",
          "hover:bg-gray-200 hover:shadow-gray-500/10",
          "focus-visible:ring-gray-500",
          "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
        ],
        tertiary: [
          "bg-transparent text-gray-700 border border-transparent",
          "hover:bg-gray-100 hover:text-gray-900",
          "focus-visible:ring-gray-500",
          "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        ],

        // Семантические варианты
        success: [
          "bg-emerald-600 text-white shadow-md",
          "hover:bg-emerald-700 hover:shadow-emerald-500/25",
          "focus-visible:ring-emerald-500"
        ],
        warning: [
          "bg-amber-600 text-white shadow-md",
          "hover:bg-amber-700 hover:shadow-amber-500/25",
          "focus-visible:ring-amber-500"
        ],
        danger: [
          "bg-red-600 text-white shadow-md",
          "hover:bg-red-700 hover:shadow-red-500/25",
          "focus-visible:ring-red-500"
        ],
        info: [
          "bg-sky-600 text-white shadow-md",
          "hover:bg-sky-700 hover:shadow-sky-500/25",
          "focus-visible:ring-sky-500"
        ],

        // Специальные варианты
        telegram: [
          "bg-sky-500 text-white shadow-md",
          "hover:bg-sky-600 hover:shadow-sky-500/25",
          "focus-visible:ring-sky-500"
        ],
        gold: [
          "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md",
          "hover:from-amber-600 hover:to-orange-600 hover:shadow-amber-500/25",
          "focus-visible:ring-amber-500"
        ],

        // Минимальные варианты
        outline: [
          "border border-gray-300 bg-transparent text-gray-700",
          "hover:bg-gray-50 hover:text-gray-900",
          "focus-visible:ring-gray-500",
          "dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        ],
        ghost: [
          "bg-transparent text-gray-700 shadow-none",
          "hover:bg-gray-100 hover:text-gray-900",
          "focus-visible:ring-gray-500",
          "dark:text-gray-300 dark:hover:bg-gray-800"
        ],
        subtle: [
          "bg-gray-50 text-gray-700 shadow-none",
          "hover:bg-gray-100 hover:text-gray-900",
          "focus-visible:ring-gray-500",
          "dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
        ],

        // Дополнительные варианты
        destructive: [
          "bg-red-50 text-red-700 border border-red-200",
          "hover:bg-red-100 hover:text-red-800 hover:border-red-300",
          "focus-visible:ring-red-500",
          "dark:bg-red-950 dark:text-red-300 dark:border-red-800 dark:hover:bg-red-900"
        ],
        link: [
          "bg-transparent text-indigo-600 shadow-none underline-offset-4",
          "hover:underline hover:text-indigo-700",
          "focus-visible:ring-indigo-500",
          "dark:text-indigo-400 dark:hover:text-indigo-300"
        ],
        floating: [
          "bg-white text-gray-900 shadow-xl border border-gray-200",
          "hover:shadow-2xl hover:bg-gray-50",
          "focus-visible:ring-gray-500",
          "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
        ]
      },

      /**
       * 📏 Размеры кнопок
       */
      size: {
        xs: "h-7 px-2 text-xs rounded-lg",
        sm: "h-9 px-3 text-sm rounded-lg",
        md: "h-10 px-4 text-sm rounded-xl",
        lg: "h-11 px-6 text-base rounded-xl",
        xl: "h-12 px-8 text-lg rounded-2xl",
        icon: "h-10 w-10 rounded-xl"
      },

      /**
       * 🎭 Специальные состояния
       */
      loading: {
        true: "cursor-wait",
        false: ""
      },

      pressed: {
        true: "shadow-inner scale-95 transform-none",
        false: ""
      },

      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false,
      pressed: false,
      fullWidth: false
    }
  }
)

/**
 * 🌈 Градиентные варианты (отдельный объект для модульности)
 */
export const gradientVariants = {
  gradientBlue: [
    "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md",
    "hover:from-blue-600 hover:to-indigo-700 hover:shadow-blue-500/25",
    "focus-visible:ring-blue-500"
  ],
  gradientPurple: [
    "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md",
    "hover:from-purple-600 hover:to-pink-700 hover:shadow-purple-500/25",
    "focus-visible:ring-purple-500"
  ],
  gradientGreen: [
    "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md",
    "hover:from-emerald-600 hover:to-teal-700 hover:shadow-emerald-500/25",
    "focus-visible:ring-emerald-500"
  ],
  gradientOrange: [
    "bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-md",
    "hover:from-orange-600 hover:to-red-700 hover:shadow-orange-500/25",
    "focus-visible:ring-orange-500"
  ]
} as const

/**
 * ✨ Неоновые варианты (отдельный объект для модульности)
 */
export const neonVariants = {
  neonBlue: [
    "bg-blue-500 text-white shadow-md border-2 border-blue-400",
    "hover:bg-blue-600 hover:shadow-blue-500/50 hover:shadow-lg",
    "focus-visible:ring-blue-500",
    "shadow-blue-500/25"
  ],
  neonPink: [
    "bg-pink-500 text-white shadow-md border-2 border-pink-400",
    "hover:bg-pink-600 hover:shadow-pink-500/50 hover:shadow-lg",
    "focus-visible:ring-pink-500",
    "shadow-pink-500/25"
  ],
  neonGreen: [
    "bg-emerald-500 text-white shadow-md border-2 border-emerald-400",
    "hover:bg-emerald-600 hover:shadow-emerald-500/50 hover:shadow-lg",
    "focus-visible:ring-emerald-500",
    "shadow-emerald-500/25"
  ]
} as const

/**
 * 🎪 Социальные варианты (отдельный объект для модульности)
 */
export const socialVariants = {
  github: [
    "bg-gray-900 text-white shadow-md",
    "hover:bg-gray-800 hover:shadow-gray-900/25",
    "focus-visible:ring-gray-500",
    "dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-50"
  ],
  google: [
    "bg-white text-gray-900 shadow-md border border-gray-300",
    "hover:bg-gray-50 hover:shadow-gray-500/25",
    "focus-visible:ring-gray-500"
  ],
  facebook: [
    "bg-blue-600 text-white shadow-md",
    "hover:bg-blue-700 hover:shadow-blue-500/25",
    "focus-visible:ring-blue-500"
  ],
  twitter: [
    "bg-sky-500 text-white shadow-md",
    "hover:bg-sky-600 hover:shadow-sky-500/25",
    "focus-visible:ring-sky-500"
  ],
  discord: [
    "bg-indigo-600 text-white shadow-md",
    "hover:bg-indigo-700 hover:shadow-indigo-500/25",
    "focus-visible:ring-indigo-500"
  ]
} as const

/**
 * 🔧 Утилиты для объединения вариантов
 */
export const combineVariants = (
  baseVariant: keyof typeof buttonVariants.variants.variant,
  additionalClasses: string[]
): string[] => {
  const base = buttonVariants.variants.variant[baseVariant]
  return Array.isArray(base) ? [...base, ...additionalClasses] : [base, ...additionalClasses]
}

/**
 * 📱 Мобильные оптимизации
 */
export const mobileOptimizations = {
  touchTarget: "min-h-[44px] min-w-[44px]", // Apple HIG recommendations
  tapHighlight: "tap-highlight-transparent",
  userSelect: "select-none"
} as const