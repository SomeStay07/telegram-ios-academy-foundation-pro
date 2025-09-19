import { cva } from 'class-variance-authority'

/**
 * 🎯 Typography Variants - Современная типографическая система
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 */
export const typographyVariants = cva(
  // Базовые стили для всех текстов
  [
    "text-gray-900 dark:text-gray-100",
    "transition-colors duration-200"
  ],
  {
    variants: {
      /**
       * Варианты типографики - от крупных заголовков до мелких подписей
       */
      variant: {
        // Display - самые крупные заголовки
        "display-2xl": [
          "text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight",
          "leading-none"
        ],
        "display-xl": [
          "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
          "leading-none"
        ],
        "display-lg": [
          "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight",
          "leading-tight"
        ],
        "display-md": [
          "text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight",
          "leading-tight"
        ],
        "display-sm": [
          "text-xl md:text-2xl lg:text-3xl font-bold tracking-tight",
          "leading-tight"
        ],

        // Headings - заголовки секций
        "heading-xl": [
          "text-2xl md:text-3xl font-bold",
          "leading-tight tracking-tight"
        ],
        "heading-lg": [
          "text-xl md:text-2xl font-bold",
          "leading-tight"
        ],
        "heading-md": [
          "text-lg md:text-xl font-semibold",
          "leading-snug"
        ],
        "heading-sm": [
          "text-base md:text-lg font-semibold",
          "leading-snug"
        ],
        "heading-xs": [
          "text-sm md:text-base font-semibold",
          "leading-snug"
        ],

        // Body - основной текст
        "body-xl": [
          "text-lg md:text-xl font-normal",
          "leading-relaxed"
        ],
        "body-lg": [
          "text-base md:text-lg font-normal",
          "leading-relaxed"
        ],
        "body-md": [
          "text-sm md:text-base font-normal",
          "leading-normal"
        ],
        "body-sm": [
          "text-xs md:text-sm font-normal",
          "leading-normal"
        ],

        // Caption - подписи и метаданные
        "caption-lg": [
          "text-sm font-medium",
          "leading-tight"
        ],
        "caption-md": [
          "text-xs font-medium",
          "leading-tight"
        ],
        "caption-sm": [
          "text-xs font-normal",
          "leading-tight"
        ],

        // Label - лейблы форм
        "label-lg": [
          "text-base font-medium",
          "leading-tight"
        ],
        "label-md": [
          "text-sm font-medium",
          "leading-tight"
        ],
        "label-sm": [
          "text-xs font-medium",
          "leading-tight"
        ],

        // Code - моноширинный текст
        "code-lg": [
          "text-base font-mono",
          "leading-normal"
        ],
        "code-md": [
          "text-sm font-mono",
          "leading-normal"
        ],
        "code-sm": [
          "text-xs font-mono",
          "leading-normal"
        ]
      },

      /**
       * Цветовые варианты текста
       */
      color: {
        default: "text-gray-900 dark:text-gray-100",
        muted: "text-gray-600 dark:text-gray-400",
        subtle: "text-gray-500 dark:text-gray-500",
        primary: "text-indigo-600 dark:text-indigo-400",
        secondary: "text-gray-700 dark:text-gray-300",
        success: "text-emerald-600 dark:text-emerald-400",
        warning: "text-amber-600 dark:text-amber-400",
        danger: "text-red-600 dark:text-red-400",
        info: "text-sky-600 dark:text-sky-400",
        white: "text-white",
        inherit: "text-inherit"
      },

      /**
       * Выравнивание текста
       */
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify"
      },

      /**
       * Насыщенность шрифта
       */
      weight: {
        thin: "font-thin",
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black"
      },

      /**
       * Трансформация текста
       */
      transform: {
        none: "normal-case",
        uppercase: "uppercase",
        lowercase: "lowercase",
        capitalize: "capitalize"
      },

      /**
       * Поведение текста при переполнении
       */
      truncate: {
        true: "truncate",
        false: ""
      }
    },
    defaultVariants: {
      variant: "body-md",
      color: "default",
      align: "left",
      truncate: false
    }
  }
)