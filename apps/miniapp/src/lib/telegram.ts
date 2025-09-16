interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
      is_premium?: boolean
      photo_url?: string
    }
    start_param?: string
  }
  version: string
  platform: string
  colorScheme: 'light' | 'dark'
  themeParams: {
    link_color?: string
    button_color?: string
    button_text_color?: string
    secondary_bg_color?: string
    hint_color?: string
    bg_color?: string
    text_color?: string
  }
  isExpanded: boolean
  viewportHeight: number
  viewportStableHeight: number
  headerColor: string
  backgroundColor: string
  BackButton: {
    isVisible: boolean
    show(): void
    hide(): void
    onClick(callback: () => void): void
    offClick(callback: () => void): void
  }
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText(text: string): void
    show(): void
    hide(): void
    enable(): void
    disable(): void
    showProgress(leaveActive?: boolean): void
    hideProgress(): void
    setParams(params: {
      text?: string
      color?: string
      text_color?: string
      is_active?: boolean
      is_visible?: boolean
    }): void
    onClick(callback: () => void): void
    offClick(callback: () => void): void
  }
  ready(): void
  expand(): void
  close(): void
  sendData(data: string): void
  openLink(url: string, options?: { try_instant_view?: boolean }): void
  openTelegramLink(url: string): void
  openInvoice(url: string, callback?: (status: string) => void): void
  showPopup(params: {
    title?: string
    message: string
    buttons?: Array<{
      id?: string
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
      text?: string
    }>
  }, callback?: (buttonId: string) => void): void
  showAlert(message: string, callback?: () => void): void
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void
  showScanQrPopup(params: {
    text?: string
  }, callback?: (text: string) => boolean): void
  closeScanQrPopup(): void
  requestWriteAccess(callback?: (granted: boolean) => void): void
  requestContact(callback?: (granted: boolean) => void): void
  requestLocation(callback?: (granted: boolean) => void): void
  shareToStory(media_url: string, params?: {
    text?: string
    widget_link?: {
      url: string
      name?: string
    }
  }): void
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

export const getTelegramWebApp = (): TelegramWebApp | null => {
  return typeof window !== 'undefined' ? window.Telegram?.WebApp || null : null
}

export const isTelegramWebApp = (): boolean => {
  return getTelegramWebApp() !== null
}

export const getTelegramUser = () => {
  const webApp = getTelegramWebApp()
  return webApp?.initDataUnsafe?.user || null
}

export const getTelegramTheme = () => {
  const webApp = getTelegramWebApp()
  if (!webApp) return null
  
  return {
    colorScheme: webApp.colorScheme,
    themeParams: webApp.themeParams
  }
}

export const initializeTelegramWebApp = () => {
  const webApp = getTelegramWebApp()
  if (!webApp) return false
  
  try {
    webApp.ready()
    webApp.expand()
    return true
  } catch (error) {
    console.error('Failed to initialize Telegram WebApp:', error)
    return false
  }
}

export const setTelegramMainButton = (params: {
  text: string
  color?: string
  textColor?: string
  onClick?: () => void
}) => {
  const webApp = getTelegramWebApp()
  if (!webApp) return false
  
  try {
    webApp.MainButton.setParams({
      text: params.text,
      color: params.color,
      text_color: params.textColor,
      is_active: true,
      is_visible: true
    })
    
    if (params.onClick) {
      webApp.MainButton.onClick(params.onClick)
    }
    
    webApp.MainButton.show()
    return true
  } catch (error) {
    console.error('Failed to set Telegram main button:', error)
    return false
  }
}

export const hideTelegramMainButton = () => {
  const webApp = getTelegramWebApp()
  if (!webApp) return false
  
  try {
    webApp.MainButton.hide()
    return true
  } catch (error) {
    console.error('Failed to hide Telegram main button:', error)
    return false
  }
}

export const showTelegramAlert = (message: string) => {
  const webApp = getTelegramWebApp()
  if (!webApp) {
    alert(message)
    return
  }
  
  webApp.showAlert(message)
}

export const showTelegramConfirm = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const webApp = getTelegramWebApp()
    if (!webApp) {
      resolve(confirm(message))
      return
    }
    
    webApp.showConfirm(message, (confirmed) => {
      resolve(confirmed)
    })
  })
}

export const closeTelegramWebApp = () => {
  const webApp = getTelegramWebApp()
  if (!webApp) return false
  
  try {
    webApp.close()
    return true
  } catch (error) {
    console.error('Failed to close Telegram WebApp:', error)
    return false
  }
}

export const generateMockUserData = () => {
  const mockUsers = [
    {
      id: 123456789,
      first_name: 'Тимур',
      last_name: 'Цеберда',
      username: 'timurceberda',
      language_code: 'ru',
      is_premium: true,
      photo_url: 'https://avatars.githubusercontent.com/u/12345678?v=4'
    },
    {
      id: 987654321,
      first_name: 'Анна',
      last_name: 'Иванова',
      username: 'anna_dev',
      language_code: 'ru',
      is_premium: false,
      photo_url: 'https://avatars.githubusercontent.com/u/87654321?v=4'
    }
  ]
  
  return mockUsers[Math.floor(Math.random() * mockUsers.length)]
}

export const getUserData = () => {
  const telegramUser = getTelegramUser()
  
  if (telegramUser) {
    return {
      id: telegramUser.id,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name || '',
      username: telegramUser.username || `user${telegramUser.id}`,
      avatar: telegramUser.photo_url || `https://avatars.githubusercontent.com/u/${telegramUser.id}?v=4`,
      isPremium: telegramUser.is_premium || false,
      languageCode: telegramUser.language_code || 'en'
    }
  }
  
  // Fallback to mock data for development
  if (process.env.NODE_ENV === 'development') {
    const mockUser = generateMockUserData()
    return {
      id: mockUser.id,
      firstName: mockUser.first_name,
      lastName: mockUser.last_name || '',
      username: mockUser.username || `user${mockUser.id}`,
      avatar: mockUser.photo_url || `https://avatars.githubusercontent.com/u/${mockUser.id}?v=4`,
      isPremium: mockUser.is_premium || false,
      languageCode: mockUser.language_code || 'ru'
    }
  }
  
  return null
}