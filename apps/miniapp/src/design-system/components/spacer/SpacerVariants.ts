import { cva } from 'class-variance-authority'

/**
 * 🎯 Spacer Variants - Современная система отступов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * Заменяет CSS классы .section-spacer, .subsection-spacer
 */
export const spacerVariants = cva(
  "block",
  {
    variants: {
      /**
       * Размеры отступов
       */
      size: {
        xs: "mb-2",      // 8px
        sm: "mb-4",      // 16px  
        md: "mb-6",      // 24px
        lg: "mb-8",      // 32px (subsection-spacer)
        xl: "mb-10",     // 40px (section-spacer)
        "2xl": "mb-12",  // 48px
        "3xl": "mb-16",  // 64px
        "4xl": "mb-20",  // 80px
        "5xl": "mb-24"   // 96px
      },

      /**
       * Направление отступа
       */
      direction: {
        bottom: "",      // по умолчанию
        top: "mt-",      // сверху
        both: "my-",     // сверху и снизу
        horizontal: "mx-", // слева и справа
        all: "m-"        // все стороны
      },

      /**
       * Адаптивность
       */
      responsive: {
        true: "", // будет добавлен в compoundVariants
        false: ""
      }
    },
    defaultVariants: {
      size: "lg",
      direction: "bottom", 
      responsive: false
    }
  }
)