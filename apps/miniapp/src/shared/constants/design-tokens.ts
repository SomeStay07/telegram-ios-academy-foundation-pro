/**
 * Design Tokens - Centralized Design System Constants
 * 
 * This file contains all design constants to eliminate magic numbers
 * and ensure consistency across the application.
 */

// ===== Z-INDEX HIERARCHY =====
/**
 * Z-Index layer system for proper element stacking
 * Based on Slack's z-index system: https://slack.design/articles/z-index-in-css/
 */
export const Z_INDEX = {
  // Base layer elements
  BEHIND: -1,
  BASE: 0,
  
  // Content layers (1-99)
  CONTENT: 10,
  CONTENT_OVERLAY: 20, // Dropdowns, tooltips relative to content
  CONTENT_STICKY: 30,  // Sticky headers within content
  
  // Navigation and UI layers (100-199)  
  NAVIGATION: 100,     // Tab bars, navigation
  FLOATING_UI: 150,    // Floating buttons, badges
  
  // Overlay layers (200-299)
  OVERLAY_LOW: 200,    // Achievement notifications
  OVERLAY_MID: 250,    // Temporary overlays
  
  // Modal layers (300-399)
  MODAL_BACKDROP: 300, // Modal backdrops
  MODAL_CONTENT: 350,  // Modal content
  
  // Critical layers (400+)
  TOAST: 400,          // Toast notifications
  TOOLTIP: 450,        // Tooltips (always on top)
  SYSTEM_MODAL: 500,   // System modals (theme, error)
  LOADING: 550,        // Loading overlays
  
  // Maximum priority (900+)
  DEVELOPMENT: 9999    // Development overlays, debug tools
} as const

// ===== ANIMATION CONSTANTS =====
export const ANIMATION = {
  // Duration constants (in milliseconds)
  DURATION: {
    INSTANT: 0,
    FAST: 150,
    NORMAL: 200,
    SLOW: 300,
    SLOWER: 500,
    SLOWEST: 800
  },
  
  // Spring animation constants
  SPRING: {
    // Gentle springs for UI elements
    GENTLE: { stiffness: 300, damping: 25 },
    // Bouncy springs for interactive elements  
    BOUNCY: { stiffness: 400, damping: 25 },
    // Smooth springs for page transitions
    SMOOTH: { stiffness: 200, damping: 30 },
    // Quick springs for hover effects
    QUICK: { stiffness: 500, damping: 30 }
  },
  
  // Easing functions
  EASING: {
    // Telegram-like easing for native feel
    TELEGRAM: [0.4, 0, 0.2, 1] as const,
    // iOS-like easing
    IOS: [0.25, 0.46, 0.45, 0.94] as const,
    // Standard Material Design easing
    MATERIAL: [0.4, 0, 0.6, 1] as const
  },
  
  // Animation delays for staggered effects
  STAGGER: {
    ITEMS: 0.05,        // 50ms between list items
    CARDS: 0.1,         // 100ms between cards
    SECTIONS: 0.15      // 150ms between sections
  }
} as const

// ===== SIZE CONSTANTS =====
export const SIZE = {
  // Modal and overlay sizes
  MODAL: {
    MAX_WIDTH: 'max-w-md',
    MAX_HEIGHT: 'max-h-[90vh]',
    PADDING: {
      MOBILE: 'mx-2',
      DESKTOP: 'sm:mx-4'
    }
  },
  
  // Avatar sizes
  AVATAR: {
    XS: 'w-6 h-6',
    SM: 'w-8 h-8', 
    MD: 'w-10 h-10',
    LG: 'w-12 h-12',
    XL: 'w-16 h-16',
    PROFILE: 'clamp(3.5rem, 8vw, 6rem)' // Responsive profile avatar
  },
  
  // Icon sizes
  ICON: {
    XS: 'w-3 h-3',
    SM: 'w-4 h-4',
    MD: 'w-5 h-5', 
    LG: 'w-6 h-6',
    XL: 'w-8 h-8'
  }
} as const

// ===== COLOR CONSTANTS =====
export const COLORS = {
  // Design system colors (from CSS variables)
  PRIMARY: '#6366F1',
  PRIMARY_HOVER: '#5A5FCF', 
  PRIMARY_LIGHT: '#818CF8',
  
  SUCCESS: '#10b981',
  SUCCESS_LIGHT: '#059669',
  
  WARNING: '#f59e0b',
  WARNING_LIGHT: '#d97706',
  
  GOLD: '#F59E0B',
  GOLD_LIGHT: '#FBB04B',
  
  // Achievement type colors
  ACHIEVEMENT: {
    LOCKED: {
      background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
      border: '#6b7280'
    },
    UNLOCKED: {
      background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', 
      border: '#059669'
    },
    LEGENDARY: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      border: '#7c3aed'
    },
    MASTER: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      border: '#f59e0b'
    }
  },
  
  // Level-up effect colors
  CELEBRATION: [
    '#FFD700', '#FF6B6B', '#4ECDC4', 
    '#45B7D1', '#96CEB4', '#FECA57'
  ] as const
} as const

// ===== SPACING CONSTANTS =====
export const SPACING = {
  // Standard spacing scale (matches Tailwind)
  XS: '0.25rem',  // 4px
  SM: '0.5rem',   // 8px  
  MD: '0.75rem',  // 12px
  LG: '1rem',     // 16px
  XL: '1.25rem',  // 20px
  '2XL': '1.5rem', // 24px
  '3XL': '2rem'    // 32px
} as const

// ===== BREAKPOINTS =====
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px', 
  LG: '1024px',
  XL: '1280px'
} as const

// ===== COMPONENT VARIANTS =====
export const VARIANTS = {
  // Scale variants for hover effects
  SCALE: {
    NONE: 1,
    SUBTLE: 1.01,
    SMALL: 1.02, 
    MEDIUM: 1.05,
    LARGE: 1.1
  },
  
  // Border radius variants
  RADIUS: {
    NONE: '0',
    SM: '0.25rem',
    MD: '0.5rem', 
    LG: '0.75rem',
    XL: '1rem',
    FULL: '9999px'
  }
} as const

// ===== UTILITY FUNCTIONS =====
export const getProgressColor = (progress: number): string => {
  return progress >= 70 
    ? COLORS.SUCCESS 
    : progress >= 40 
      ? COLORS.WARNING 
      : COLORS.PRIMARY
}

export const getZIndex = (layer: keyof typeof Z_INDEX): number => {
  return Z_INDEX[layer]
}

export const getAnimationDelay = (index: number, type: keyof typeof ANIMATION.STAGGER = 'ITEMS'): number => {
  return index * ANIMATION.STAGGER[type]
}