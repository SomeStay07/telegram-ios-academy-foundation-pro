// Telegram WebApp Types
interface TelegramWebApp {
  initData?: string
  initDataUnsafe?: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      is_premium?: boolean
      photo_url?: string
    }
    chat?: {
      id: number
      type: string
      title?: string
      username?: string
      photo_url?: string
    }
    start_param?: string
    auth_date?: number
    hash?: string
  }
  version?: string
  platform?: string
  colorScheme?: 'light' | 'dark'
  themeParams?: {
    bg_color?: string
    text_color?: string
    hint_color?: string
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
  }
  isExpanded?: boolean
  viewportHeight?: number
  viewportStableHeight?: number
  headerColor?: string
  backgroundColor?: string
  isClosingConfirmationEnabled?: boolean
  isVerticalSwipesEnabled?: boolean
  
  // Methods
  ready?: () => void
  expand?: () => void
  close?: () => void
  enableClosingConfirmation?: () => void
  disableClosingConfirmation?: () => void
  enableVerticalSwipes?: () => void
  disableVerticalSwipes?: () => void
  setHeaderColor?: (color: string) => void
  setBackgroundColor?: (color: string) => void
  showPopup?: (params: {
    title?: string
    message: string
    buttons?: Array<{
      id?: string
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
      text: string
    }>
  }, callback?: (buttonId?: string) => void) => void
  showAlert?: (message: string, callback?: () => void) => void
  showConfirm?: (message: string, callback?: (confirmed: boolean) => void) => void
  showScanQrPopup?: (params?: {
    text?: string
  }, callback?: (text: string) => void) => void
  closeScanQrPopup?: () => void
  readTextFromClipboard?: (callback?: (text: string) => void) => void
  requestWriteAccess?: (callback?: (granted: boolean) => void) => void
  requestContact?: (callback?: (granted: boolean) => void) => void
  
  // Events
  onEvent?: (eventType: string, callback: (params: any) => void) => void
  offEvent?: (eventType: string, callback: (params: any) => void) => void
  
  // Haptic feedback
  HapticFeedback?: {
    impactOccurred?: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void
    notificationOccurred?: (type: 'error' | 'success' | 'warning') => void
    selectionChanged?: () => void
  }
  
  // Cloud storage
  CloudStorage?: {
    setItem?: (key: string, value: string, callback?: (error?: string) => void) => void
    getItem?: (key: string, callback?: (error?: string, value?: string) => void) => void
    getItems?: (keys: string[], callback?: (error?: string, values?: Record<string, string>) => void) => void
    removeItem?: (key: string, callback?: (error?: string) => void) => void
    removeItems?: (keys: string[], callback?: (error?: string) => void) => void
    getKeys?: (callback?: (error?: string, keys?: string[]) => void) => void
  }
  
  // Main button
  MainButton?: {
    text?: string
    color?: string
    textColor?: string
    isVisible?: boolean
    isActive?: boolean
    isProgressVisible?: boolean
    setText?: (text: string) => void
    onClick?: (callback: () => void) => void
    offClick?: (callback: () => void) => void
    show?: () => void
    hide?: () => void
    enable?: () => void
    disable?: () => void
    showProgress?: (leaveActive?: boolean) => void
    hideProgress?: () => void
    setParams?: (params: {
      text?: string
      color?: string
      text_color?: string
      is_active?: boolean
      is_visible?: boolean
    }) => void
  }
  
  // Back button
  BackButton?: {
    isVisible?: boolean
    onClick?: (callback: () => void) => void
    offClick?: (callback: () => void) => void
    show?: () => void
    hide?: () => void
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp
    }
  }
}

export {}