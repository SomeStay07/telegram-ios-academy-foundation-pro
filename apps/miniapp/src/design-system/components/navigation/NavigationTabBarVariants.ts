import { cva } from 'class-variance-authority'

// Base container variants
export const navigationTabBarVariants = cva(
  [
    // Base positioning and structure
    "sticky bottom-0 inset-x-0 z-50",
    // Background with glassmorphism support
    "bg-white/80 dark:bg-gray-900/80",
    "supports-[backdrop-filter]:backdrop-blur-xl",
    // Borders
    "border-t border-gray-200/30 dark:border-gray-700/30",
    // Safe area support for mobile devices
    "pb-[env(safe-area-inset-bottom)]",
    // Smooth transitions
    "transition-all duration-300 ease-in-out"
  ],
  {
    variants: {
      variant: {
        default: "",
        minimal: "bg-transparent border-transparent backdrop-blur-none",
        glassmorphism: [
          "bg-white/10 dark:bg-gray-900/10",
          "backdrop-blur-2xl backdrop-saturate-150",
          "border-white/20 dark:border-white/10"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

// Inner container variants
export const navigationTabBarContainerVariants = cva(
  [
    "mx-auto flex px-4 py-2 gap-1",
    "transition-all duration-300"
  ],
  {
    variants: {
      maxWidth: {
        sm: "max-w-sm",
        md: "max-w-md", 
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full"
      }
    },
    defaultVariants: {
      maxWidth: "md"
    }
  }
)

// Tab item variants  
export const navigationTabItemVariants = cva(
  [
    // Base layout
    "flex-1 flex flex-col items-center relative",
    "transition-all duration-300 ease-out",
    "rounded-xl overflow-hidden isolate",
    // Interactive states
    "group cursor-pointer",
    // Focus states for accessibility
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30",
    "focus-visible:z-10"
  ],
  {
    variants: {
      size: {
        sm: "py-1.5 px-2 gap-1",
        md: "py-2 px-3 gap-1",
        lg: "py-3 px-4 gap-2"
      },
      variant: {
        default: [
          // Hover states
          "hover:bg-white/20 dark:hover:bg-white/10",
          "hover:backdrop-blur-sm hover:shadow-lg hover:shadow-black/5",
          "hover:border hover:border-white/20 dark:hover:border-white/10",
          "hover:scale-[1.02] hover:-translate-y-0.5",
          "hover:z-10 hover:mx-1",
          // Active press states
          "active:scale-[0.98] active:bg-white/30 dark:active:bg-white/15",
          "active:shadow-inner active:shadow-black/10"
        ],
        minimal: [
          "hover:bg-gray-100/50 dark:hover:bg-gray-800/50",
          "hover:scale-105",
          "active:scale-95"
        ],
        glassmorphism: [
          "hover:bg-white/15 dark:hover:bg-white/5",
          "hover:backdrop-blur-lg hover:shadow-xl hover:shadow-black/10",
          "hover:border hover:border-white/30 dark:hover:border-white/20",
          "hover:scale-[1.03] hover:-translate-y-1",
          "hover:z-10",
          "active:scale-[0.97] active:bg-white/25 dark:active:bg-white/10"
        ]
      },
      isActive: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      // Default variant active states
      {
        variant: "default",
        isActive: true,
        class: [
          "bg-white/25 dark:bg-white/15",
          "backdrop-blur-sm shadow-md shadow-black/5",
          "border border-white/25 dark:border-white/15",
          "z-20"
        ]
      },
      // Minimal variant active states
      {
        variant: "minimal", 
        isActive: true,
        class: [
          "bg-blue-50 dark:bg-blue-900/20",
          "border-b-2 border-blue-600 dark:border-blue-400"
        ]
      },
      // Glassmorphism variant active states
      {
        variant: "glassmorphism",
        isActive: true,
        class: [
          "bg-white/20 dark:bg-white/10",
          "backdrop-blur-xl shadow-xl shadow-black/10",
          "border border-white/40 dark:border-white/30",
          "scale-[1.02] -translate-y-0.5",
          "z-20"
        ]
      }
    ],
    defaultVariants: {
      size: "md",
      variant: "default", 
      isActive: false
    }
  }
)

// Icon variants
export const navigationTabIconVariants = cva(
  [
    "transition-all duration-300",
    "group-hover:drop-shadow-sm",
    "group-active:scale-95"
  ],
  {
    variants: {
      size: {
        sm: "w-4 h-4 mb-0.5",
        md: "w-5 h-5 mb-1", 
        lg: "w-6 h-6 mb-1.5"
      },
      variant: {
        default: "group-hover:scale-110",
        minimal: "group-hover:scale-105",
        glassmorphism: "group-hover:scale-110 group-hover:drop-shadow-md"
      },
      isActive: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      // Active icon colors for all variants
      {
        isActive: true,
        class: "text-blue-600 dark:text-blue-400 drop-shadow-sm"
      },
      {
        isActive: false,
        class: "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
      }
    ],
    defaultVariants: {
      size: "md",
      variant: "default",
      isActive: false
    }
  }
)

// Label variants
export const navigationTabLabelVariants = cva(
  [
    "transition-all duration-300",
    "group-hover:font-medium group-hover:drop-shadow-sm"
  ],
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-xs",
        lg: "text-sm"
      },
      variant: {
        default: "",
        minimal: "",
        glassmorphism: "group-hover:drop-shadow-md"
      },
      isActive: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      // Active label colors for all variants
      {
        isActive: true,
        class: "text-blue-600 dark:text-blue-400 font-semibold drop-shadow-sm"
      },
      {
        isActive: false,
        class: "text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
      }
    ],
    defaultVariants: {
      size: "md",
      variant: "default",
      isActive: false
    }
  }
)

// Active indicator variants
export const navigationTabIndicatorVariants = cva(
  [
    "absolute rounded-full shadow-sm transition-all duration-300"
  ],
  {
    variants: {
      variant: {
        default: [
          "top-1 left-1/2 transform -translate-x-1/2",
          "w-6 h-0.5",
          "bg-blue-600 dark:bg-blue-400",
          "animate-pulse"
        ],
        minimal: [
          "bottom-0 left-0 right-0",
          "h-0.5",
          "bg-blue-600 dark:bg-blue-400"
        ],
        glassmorphism: [
          "top-0.5 left-1/2 transform -translate-x-1/2",
          "w-8 h-1",
          "bg-blue-500 dark:bg-blue-300",
          "shadow-md shadow-blue-500/50",
          "animate-pulse"
        ]
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

// Ripple effect variants
export const navigationTabRippleVariants = cva(
  [
    "absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
  ],
  {
    variants: {
      variant: {
        default: "",
        minimal: "rounded-none",
        glassmorphism: "rounded-2xl"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export const navigationTabRippleEffectVariants = cva(
  [
    "absolute inset-0 transition-opacity duration-300",
    "opacity-0 group-hover:opacity-100 group-hover:animate-pulse"
  ],
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-transparent via-white/5 to-transparent",
        minimal: "bg-gradient-to-r from-transparent via-gray-200/20 to-transparent dark:via-gray-700/20",
        glassmorphism: "bg-gradient-to-r from-transparent via-white/10 to-transparent"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)