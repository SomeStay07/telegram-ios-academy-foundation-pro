/**
 * 🚀 Telegram WebApp API Client
 * 
 * Унифицированный клиент для работы с Telegram WebApp API
 * Без fallback'ов - только реальные данные Telegram или моки для разработки
 */

import type { 
  TelegramWebApp, 
  TelegramEnvironmentInfo, 
  TelegramEnvironment,
  TelegramMockConfig,
  TelegramUser,
  TelegramThemeParams
} from './types'

// === ENVIRONMENT DETECTION ===

/**
 * Определяет текущее окружение выполнения
 */
export function detectTelegramEnvironment(): TelegramEnvironmentInfo {
  // Проверяем наличие Telegram WebApp API
  const webApp = window.Telegram?.WebApp
  
  if (webApp && typeof webApp.ready === 'function') {
    return {
      environment: 'telegram',
      isWebAppAvailable: true,
      version: webApp.version,
      platform: webApp.platform
    }
  }
  
  // Определяем среду разработки
  if (import.meta.env.DEV || process.env.NODE_ENV === 'development') {
    return {
      environment: 'development',
      isWebAppAvailable: false
    }
  }
  
  // Браузер без Telegram
  return {
    environment: 'browser',
    isWebAppAvailable: false
  }
}

// === MOCK CONFIGURATION ===

// Development-only mock configuration
const DEFAULT_MOCK_CONFIG: TelegramMockConfig = import.meta.env.DEV ? {
  enabled: import.meta.env.VITE_USE_MOCKS === 'true',  // Only enable when explicitly set in dev
  user: {
    id: 987654321,
    first_name: 'iOS',
    last_name: 'Developer',
    username: 'ios_developer',
    language_code: 'ru',
    is_premium: false,
    allows_write_to_pm: true
  },
  colorScheme: 'dark',
  themeParams: {
    bg_color: '#000000',
    text_color: '#ffffff',
    hint_color: '#999999',
    link_color: '#6ab7ff',
    button_color: '#5288c1',
    button_text_color: '#ffffff',
    secondary_bg_color: '#131313',
    header_bg_color: '#17212b',
    accent_text_color: '#6ab7ff',
    section_bg_color: '#1f1f1f',
    section_header_text_color: '#6ab7ff',
    destructive_text_color: '#ff3b30'
  }
} : {
  enabled: false,
  user: undefined,
  colorScheme: 'dark',
  themeParams: {}
}

let mockConfig: TelegramMockConfig = { ...DEFAULT_MOCK_CONFIG }

/**
 * Конфигурирует моки для локальной разработки
 */
export function configureMocks(config: Partial<TelegramMockConfig>): void {
  mockConfig = { ...mockConfig, ...config }
}

// === CORE API CLIENT ===

export class TelegramApiClient {
  private webApp: TelegramWebApp | null = null
  private environment: TelegramEnvironmentInfo
  
  constructor() {
    this.environment = detectTelegramEnvironment()
    
    if (this.environment.isWebAppAvailable) {
      this.webApp = window.Telegram!.WebApp
      this.initializeWebApp()
    }
  }
  
  /**
   * Инициализирует WebApp при первом запуске
   */
  private initializeWebApp(): void {
    if (!this.webApp) return
    
    // Сообщаем Telegram что приложение готово
    this.webApp.ready()
    
    // Разворачиваем на весь экран
    this.webApp.expand()
  }
  
  // === GETTERS ===
  
  /**
   * Получает информацию об окружении
   */
  getEnvironment(): TelegramEnvironmentInfo {
    return this.environment
  }
  
  /**
   * Проверяет доступность Telegram API
   */
  isAvailable(): boolean {
    return this.environment.isWebAppAvailable
  }
  
  /**
   * Получает экземпляр WebApp (только для прямого доступа к API)
   */
  getWebApp(): TelegramWebApp | null {
    return this.webApp
  }
  
  // === USER API ===
  
  /**
   * Получает данные пользователя
   * @throws {Error} Если данные недоступны и моки отключены
   */
  getUser(): TelegramUser {
    // Реальные данные Telegram
    if (this.webApp?.initDataUnsafe.user) {
      return this.webApp.initDataUnsafe.user
    }
    
    // Моки для разработки
    if (mockConfig.enabled && mockConfig.user) {
      return {
        id: mockConfig.user.id!,
        first_name: mockConfig.user.first_name!,
        last_name: mockConfig.user.last_name,
        username: mockConfig.user.username,
        language_code: mockConfig.user.language_code,
        is_premium: mockConfig.user.is_premium,
        allows_write_to_pm: mockConfig.user.allows_write_to_pm
      }
    }
    
    throw new Error('Telegram user data is not available')
  }
  
  /**
   * Проверяет доступность данных пользователя
   */
  hasUser(): boolean {
    return !!(this.webApp?.initDataUnsafe.user || (mockConfig.enabled && mockConfig.user))
  }
  
  // === THEME API ===
  
  /**
   * Получает текущую цветовую схему
   */
  getColorScheme(): 'light' | 'dark' {
    if (this.webApp) {
      return this.webApp.colorScheme
    }
    
    return mockConfig.colorScheme || 'dark'
  }
  
  /**
   * Получает параметры темы
   */
  getThemeParams(): TelegramThemeParams {
    if (this.webApp) {
      return this.webApp.themeParams
    }
    
    return mockConfig.themeParams || {}
  }
  
  // === HAPTIC FEEDBACK ===
  
  /**
   * Вибрация при изменении выбора
   */
  hapticSelectionChanged(): void {
    if (!this.webApp?.HapticFeedback) return
    
    try {
      this.webApp.HapticFeedback.selectionChanged()
    } catch (error) {
      // Haptic feedback not available
    }
  }
  
  /**
   * Вибрация при уведомлении
   */
  hapticNotification(type: 'error' | 'success' | 'warning'): void {
    if (!this.webApp?.HapticFeedback) return
    
    try {
      this.webApp.HapticFeedback.notificationOccurred(type)
    } catch (error) {
      // Haptic notification not available
    }
  }
  
  /**
   * Вибрация при воздействии
   */
  hapticImpact(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void {
    if (!this.webApp?.HapticFeedback) return
    
    try {
      this.webApp.HapticFeedback.impactOccurred(style)
    } catch (error) {
      // Haptic impact not available
    }
  }
  
  // === NAVIGATION ===
  
  /**
   * Закрывает WebApp
   */
  close(): void {
    if (!this.webApp) return
    
    try {
      this.webApp.close()
    } catch (error) {
      // WebApp close not available
    }
  }
  
  /**
   * Открывает ссылку
   */
  openLink(url: string, options?: { try_instant_view?: boolean }): void {
    if (this.webApp) {
      try {
        this.webApp.openLink(url, options)
        return
      } catch (error) {
        // WebApp openLink not available
      }
    }
    
    // Fallback для разработки
    if (mockConfig.enabled) {
      window.open(url, '_blank')
    }
  }
  
  /**
   * Открывает Telegram ссылку
   */
  openTelegramLink(url: string): void {
    if (!this.webApp) return
    
    try {
      this.webApp.openTelegramLink(url)
    } catch (error) {
      // WebApp openTelegramLink not available
    }
  }
  
  // === UI CONTROLS ===
  
  /**
   * Показывает главную кнопку
   */
  showMainButton(text: string, onClick: () => void): void {
    if (!this.webApp?.MainButton) return
    
    try {
      this.webApp.MainButton.setText(text)
      this.webApp.MainButton.onClick(onClick)
      this.webApp.MainButton.show()
    } catch (error) {
      // Main button not available
    }
  }
  
  /**
   * Скрывает главную кнопку
   */
  hideMainButton(): void {
    if (!this.webApp?.MainButton) return
    
    try {
      this.webApp.MainButton.hide()
    } catch (error) {
      // Main button not available
    }
  }
  
  /**
   * Показывает кнопку назад
   */
  showBackButton(onClick: () => void): void {
    if (!this.webApp?.BackButton) return
    
    try {
      this.webApp.BackButton.onClick(onClick)
      this.webApp.BackButton.show()
    } catch (error) {
      // Back button not available
    }
  }
  
  /**
   * Скрывает кнопку назад
   */
  hideBackButton(): void {
    if (!this.webApp?.BackButton) return
    
    try {
      this.webApp.BackButton.hide()
    } catch (error) {
      // Back button not available
    }
  }
  
  // === POPUPS ===
  
  /**
   * Показывает всплывающее окно
   */
  showPopup(
    message: string, 
    title?: string, 
    buttons?: Array<{ id?: string; type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'; text?: string }>
  ): Promise<string | null> {
    if (!this.webApp) {
      return Promise.resolve(null)
    }
    
    return new Promise((resolve) => {
      try {
        this.webApp!.showPopup({
          title,
          message,
          buttons
        }, (buttonId) => {
          resolve(buttonId)
        })
      } catch (error) {
        // Popup not available
        resolve(null)
      }
    })
  }
  
  /**
   * Показывает уведомление
   */
  showAlert(message: string): Promise<void> {
    if (!this.webApp) {
      return Promise.resolve()
    }
    
    return new Promise((resolve) => {
      try {
        this.webApp!.showAlert(message, () => {
          resolve()
        })
      } catch (error) {
        // Alert not available
        resolve()
      }
    })
  }
  
  /**
   * Показывает подтверждение
   */
  showConfirm(message: string): Promise<boolean> {
    if (!this.webApp) {
      return Promise.resolve(false)
    }
    
    return new Promise((resolve) => {
      try {
        this.webApp!.showConfirm(message, (confirmed) => {
          resolve(confirmed)
        })
      } catch (error) {
        // Confirm not available
        resolve(false)
      }
    })
  }
}

// === SINGLETON INSTANCE ===

let apiClient: TelegramApiClient | null = null

/**
 * Получает единственный экземпляр API клиента
 */
export function getTelegramApi(): TelegramApiClient {
  if (!apiClient) {
    apiClient = new TelegramApiClient()
  }
  return apiClient
}

/**
 * Сбрасывает API клиент (для тестирования)
 */
export function resetTelegramApi(): void {
  apiClient = null
}