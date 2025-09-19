import { cva } from 'class-variance-authority'

/**
 * 🎯 CodeBlock Variants - Современная система вариантов с CVA
 * Основана на принципах "СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ"
 * 
 * Модульный файл содержащий все CVA варианты для компонента блока кода
 * Разделен из основного CodeBlock.tsx для улучшения читаемости
 */

/**
 * 🎯 CodeBlock Main Variants
 */
export const codeBlockVariants = cva(
  // Базовые стили для блока кода
  [
    "relative rounded-2xl border transition-all duration-200",
    "font-mono text-sm leading-relaxed",
    "overflow-hidden"
  ],
  {
    variants: {
      /**
       * Цветовые темы для кода
       */
      theme: {
        dark: [
          "bg-gray-900 border-gray-800 text-gray-100",
          "dark:bg-gray-950 dark:border-gray-700"
        ],
        light: [
          "bg-gray-50 border-gray-200 text-gray-900",
          "dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        ],
        nord: [
          "bg-[#2e3440] border-[#3b4252] text-[#d8dee9]"
        ],
        github: [
          "bg-[#0d1117] border-[#21262d] text-[#e6edf3]"
        ],
        vscode: [
          "bg-[#1e1e1e] border-[#2d2d30] text-[#d4d4d4]"
        ],
        dracula: [
          "bg-[#282a36] border-[#44475a] text-[#f8f8f2]"
        ],
        monokai: [
          "bg-[#272822] border-[#3e3d32] text-[#f8f8f2]"
        ],
        solarizedDark: [
          "bg-[#002b36] border-[#073642] text-[#839496]"
        ],
        solarizedLight: [
          "bg-[#fdf6e3] border-[#eee8d5] text-[#657b83]"
        ]
      },

      /**
       * Размеры
       */
      size: {
        xs: "text-xs p-2",
        sm: "text-xs p-3",
        md: "text-sm p-4", 
        lg: "text-base p-6",
        xl: "text-lg p-8"
      },

      /**
       * Варианты отображения
       */
      variant: {
        default: "",
        elevated: "shadow-lg",
        minimal: "border-transparent bg-transparent",
        card: "shadow-sm hover:shadow-md",
        floating: "shadow-xl border-0",
        outlined: "border-2",
        filled: "border-0"
      },

      /**
       * Показать номера строк
       */
      showLineNumbers: {
        true: "pl-0",
        false: ""
      },

      /**
       * Полная высота
       */
      fullHeight: {
        true: "h-full",
        false: ""
      }
    },
    defaultVariants: {
      theme: "dark",
      size: "md",
      variant: "default",
      showLineNumbers: false,
      fullHeight: false
    }
  }
)

/**
 * 🎨 Code Content Variants
 */
export const codeContentVariants = cva(
  [
    "block w-full overflow-x-auto",
    "whitespace-pre font-mono",
    "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent",
    "focus:outline-none"
  ],
  {
    variants: {
      showLineNumbers: {
        true: "pl-0",
        false: "p-0"
      },
      wrapLines: {
        true: "whitespace-pre-wrap break-words",
        false: "whitespace-pre"
      },
      editable: {
        true: [
          "resize-none border-none bg-transparent",
          "focus:ring-0 focus:border-transparent"
        ],
        false: ""
      }
    },
    defaultVariants: {
      showLineNumbers: false,
      wrapLines: false,
      editable: false
    }
  }
)

/**
 * 🎨 Header Variants
 */
export const headerVariants = cva(
  [
    "flex items-center justify-between px-4 py-3",
    "border-b transition-colors duration-200"
  ],
  {
    variants: {
      theme: {
        dark: [
          "border-gray-700 dark:border-gray-600",
          "bg-gray-800 dark:bg-gray-900"
        ],
        light: [
          "border-gray-200 dark:border-gray-700", 
          "bg-gray-100 dark:bg-gray-800"
        ],
        nord: "border-[#3b4252] bg-[#3b4252]",
        github: "border-[#21262d] bg-[#161b22]",
        vscode: "border-[#2d2d30] bg-[#252526]",
        dracula: "border-[#44475a] bg-[#44475a]",
        monokai: "border-[#3e3d32] bg-[#3e3d32]",
        solarizedDark: "border-[#073642] bg-[#073642]",
        solarizedLight: "border-[#eee8d5] bg-[#eee8d5]"
      },
      compact: {
        true: "px-3 py-2",
        false: "px-4 py-3"
      }
    },
    defaultVariants: {
      theme: "dark",
      compact: false
    }
  }
)

/**
 * 🎨 Line Number Variants
 */
export const lineNumberVariants = cva(
  [
    "select-none text-right pr-4 shrink-0",
    "border-r border-gray-600 dark:border-gray-500",
    "bg-gray-800 dark:bg-gray-900"
  ],
  {
    variants: {
      theme: {
        dark: "text-gray-500 border-gray-700 bg-gray-850",
        light: "text-gray-400 border-gray-300 bg-gray-100",
        nord: "text-[#4c566a] border-[#4c566a] bg-[#3b4252]",
        github: "text-[#6e7681] border-[#30363d] bg-[#0d1117]",
        vscode: "text-[#858585] border-[#3e3e42] bg-[#1e1e1e]",
        dracula: "text-[#6272a4] border-[#6272a4] bg-[#44475a]",
        monokai: "text-[#75715e] border-[#75715e] bg-[#3e3d32]",
        solarizedDark: "text-[#586e75] border-[#586e75] bg-[#073642]",
        solarizedLight: "text-[#93a1a1] border-[#93a1a1] bg-[#eee8d5]"
      },
      size: {
        xs: "text-xs px-2",
        sm: "text-xs px-2", 
        md: "text-sm px-3",
        lg: "text-base px-4",
        xl: "text-lg px-5"
      }
    },
    defaultVariants: {
      theme: "dark",
      size: "md"
    }
  }
)

/**
 * 🎨 Copy Button Variants
 */
export const copyButtonVariants = cva(
  [
    "flex items-center gap-2 px-3 py-1.5 text-xs font-medium",
    "transition-all duration-200 rounded-lg",
    "hover:scale-105 active:scale-95"
  ],
  {
    variants: {
      theme: {
        dark: [
          "text-gray-300 hover:text-white",
          "hover:bg-gray-700 dark:hover:bg-gray-800"
        ],
        light: [
          "text-gray-600 hover:text-gray-900",
          "hover:bg-gray-200 dark:hover:bg-gray-700"
        ],
        nord: "text-[#d8dee9] hover:text-white hover:bg-[#5e81ac]",
        github: "text-[#e6edf3] hover:text-white hover:bg-[#30363d]",
        vscode: "text-[#cccccc] hover:text-white hover:bg-[#2d2d30]",
        dracula: "text-[#f8f8f2] hover:text-white hover:bg-[#6272a4]",
        monokai: "text-[#f8f8f2] hover:text-white hover:bg-[#66d9ef]",
        solarizedDark: "text-[#839496] hover:text-[#fdf6e3] hover:bg-[#268bd2]",
        solarizedLight: "text-[#657b83] hover:text-[#002b36] hover:bg-[#268bd2]"
      },
      state: {
        default: "",
        copied: "text-green-400 bg-green-400/10",
        error: "text-red-400 bg-red-400/10"
      }
    },
    defaultVariants: {
      theme: "dark",
      state: "default"
    }
  }
)

/**
 * 🎨 Terminal Dots Variants (macOS style)
 */
export const terminalDotsVariants = cva(
  [
    "flex gap-1.5"
  ],
  {
    variants: {
      variant: {
        default: "",
        large: "gap-2",
        small: "gap-1"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

/**
 * 🎨 Language Badge Variants
 */
export const languageBadgeVariants = cva(
  [
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
    "transition-colors duration-200"
  ],
  {
    variants: {
      language: {
        javascript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        typescript: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        python: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        java: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        cpp: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
        go: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
        rust: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        html: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
        css: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        json: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
        default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      }
    },
    defaultVariants: {
      language: "default"
    }
  }
)

/**
 * 🎨 Highlight Line Variants
 */
export const highlightLineVariants = cva(
  [
    "absolute left-0 right-0 pointer-events-none",
    "border-l-4 transition-all duration-200"
  ],
  {
    variants: {
      type: {
        highlight: "bg-yellow-400/10 border-l-yellow-400",
        error: "bg-red-400/10 border-l-red-400",
        warning: "bg-orange-400/10 border-l-orange-400",
        info: "bg-blue-400/10 border-l-blue-400",
        success: "bg-green-400/10 border-l-green-400"
      }
    },
    defaultVariants: {
      type: "highlight"
    }
  }
)

/**
 * 🎨 Scroll Bar Variants
 */
export const scrollBarVariants = cva(
  [
    "scrollbar-thin scrollbar-track-transparent"
  ],
  {
    variants: {
      theme: {
        dark: "scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500",
        light: "scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500",
        nord: "scrollbar-thumb-[#4c566a] hover:scrollbar-thumb-[#5e81ac]",
        github: "scrollbar-thumb-[#6e7681] hover:scrollbar-thumb-[#8b949e]",
        vscode: "scrollbar-thumb-[#424242] hover:scrollbar-thumb-[#4f4f4f]",
        dracula: "scrollbar-thumb-[#6272a4] hover:scrollbar-thumb-[#bd93f9]",
        monokai: "scrollbar-thumb-[#75715e] hover:scrollbar-thumb-[#a6e22e]",
        solarizedDark: "scrollbar-thumb-[#586e75] hover:scrollbar-thumb-[#268bd2]",
        solarizedLight: "scrollbar-thumb-[#93a1a1] hover:scrollbar-thumb-[#268bd2]"
      }
    },
    defaultVariants: {
      theme: "dark"
    }
  }
)

/**
 * 🔧 Утилиты для объединения вариантов
 */
export const combineCodeVariants = (
  baseVariant: keyof typeof codeBlockVariants.variants.variant,
  additionalClasses: string[]
): string[] => {
  const base = codeBlockVariants.variants.variant[baseVariant]
  return Array.isArray(base) ? [...base, ...additionalClasses] : [base, ...additionalClasses]
}

/**
 * 📱 Мобильные оптимизации для кода
 */
export const mobileCodeOptimizations = {
  touchTarget: "min-h-[44px] min-w-[44px]", // Apple HIG recommendations
  tapHighlight: "tap-highlight-transparent",
  userSelect: "select-all", // Для выделения кода на мобильных
  fontSize: "text-sm sm:text-base", // Адаптивный размер шрифта
  padding: "p-3 sm:p-4" // Адаптивные отступы
} as const

/**
 * 🎭 Темы с расширенными настройками
 */
export const extendedThemes = {
  cyberpunk: {
    background: "bg-black border-cyan-400",
    text: "text-cyan-400",
    header: "bg-gray-900 border-cyan-400",
    accent: "text-magenta-400"
  },
  matrix: {
    background: "bg-black border-green-400",
    text: "text-green-400",
    header: "bg-gray-900 border-green-400",
    accent: "text-green-300"
  },
  retro: {
    background: "bg-amber-50 border-amber-600",
    text: "text-amber-900",
    header: "bg-amber-100 border-amber-600",
    accent: "text-amber-700"
  }
} as const

/**
 * ✨ Специальные эффекты для кода
 */
export const codeEffects = {
  typewriter: "animate-pulse",
  glow: "shadow-lg shadow-current/25",
  neon: "text-shadow-neon",
  vintage: "sepia filter",
  blur: "backdrop-blur-sm"
} as const