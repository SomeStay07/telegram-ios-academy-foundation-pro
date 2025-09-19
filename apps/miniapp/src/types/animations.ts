// Animation types for consistent typing across components
export interface AnimationConstants {
  DELAYS: {
    AVATAR: number
    NAME: number
    LEVEL_BADGE: number
    BADGES_SECTION: number
    USERNAME: number
    SENIOR: number
    XP_SECTION: number
    XP_MAIN: number
    XP_NEXT: number
    PROGRESS: number
    XP_RANGE: number
    SPARKLE_1: number
    SPARKLE_2: number
    SPARKLE_3: number
  }
  DURATIONS: {
    ENTRANCE: number
    CONTAINER: number
    SPARKLE: number
    AVATAR_RING: number
    AVATAR_PATTERN: number
    GLOW_CYCLE: number
    BOX_SHADOW_CYCLE: number
    RANK_GLOW: number
  }
  SPRING: {
    STIFF: number
    MODERATE: number
    VERY_STIFF: number
    DAMPING: number
  }
  OPACITY: {
    GLOW_MIN: number
    GLOW_MAX: number
    RANK_GLOW_MIN: number
    RANK_GLOW_MAX: number
  }
  SCALE: {
    HOVER: number
    HOVER_LARGE: number
    HOVER_ICON: number
    TAP: number
    INITIAL: number
    FINAL: number
    GLOW: number
  }
  TRANSFORM: {
    Y_OFFSET: number
    Y_HOVER: number
    Y_HOVER_LARGE: number
    X_OFFSET: number
    ROTATE: number
    ROTATE_ICON: number
  }
}

// Common animation subsets for components that don't need full animation constants
export interface BasicAnimationConstants {
  DELAYS: {
    AVATAR: number
    NAME: number
    LEVEL_BADGE: number
    USERNAME: number
  }
  SCALE: {
    HOVER: number
    HOVER_LARGE: number
  }
  SPRING: {
    STIFF: number
  }
}