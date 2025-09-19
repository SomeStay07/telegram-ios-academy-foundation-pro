/**
 * 🎯 Telegram WebApp API Types
 * 
 * Полная типизация Telegram WebApp API для enterprise приложений
 * Основано на официальной документации: https://core.telegram.org/bots/webapps
 */

// === CORE INTERFACES ===

/** Основная информация о пользователе Telegram */
export interface TelegramUser {
  /** Уникальный идентификатор пользователя */
  id: number
  /** Является ли пользователь ботом */
  is_bot?: boolean
  /** Имя пользователя */
  first_name: string
  /** Фамилия пользователя */
  last_name?: string
  /** Username пользователя */
  username?: string
  /** Код языка пользователя */
  language_code?: string
  /** Является ли пользователем Telegram Premium */
  is_premium?: boolean
  /** URL фотографии профиля */
  photo_url?: string
  /** Позволяет ли пользователь писать ему в приватные сообщения */
  allows_write_to_pm?: boolean
}

/** Информация о чате */
export interface TelegramChat {
  /** Уникальный идентификатор чата */
  id: number
  /** Тип чата */
  type: 'group' | 'supergroup' | 'channel'
  /** Название чата */
  title: string
  /** Username чата */
  username?: string
  /** URL фотографии чата */
  photo_url?: string
}

/** Данные инициализации WebApp */
export interface TelegramWebAppInitData {
  /** Строка с параметрами, полученными из кнопки inline клавиатуры */
  query_id?: string
  /** Объект с данными о пользователе */
  user?: TelegramUser
  /** Объект с данными о получателе (при отправке в чат) */
  receiver?: TelegramUser
  /** Объект с данными о чате */
  chat?: TelegramChat
  /** Тип чата, где была запущена WebApp */
  chat_type?: 'sender' | 'private' | 'group' | 'supergroup' | 'channel'
  /** Уникальная строка для идентификации сессии */
  chat_instance?: string
  /** Дата запуска WebApp */
  start_param?: string
  /** Время получения данных */
  auth_date: number
  /** Хеш для проверки подлинности данных */
  hash: string
}

/** Информация о теме */
export interface TelegramThemeParams {
  /** Цвет фона */
  bg_color?: string
  /** Цвет текста */
  text_color?: string
  /** Цвет подсказок */
  hint_color?: string
  /** Цвет ссылок */
  link_color?: string
  /** Цвет кнопок */
  button_color?: string
  /** Цвет текста кнопок */
  button_text_color?: string
  /** Вторичный цвет фона */
  secondary_bg_color?: string
  /** Цвет заголовка */
  header_bg_color?: string
  /** Цвет акцента */
  accent_text_color?: string
  /** Цвет секции */
  section_bg_color?: string
  /** Цвет заголовка секции */
  section_header_text_color?: string
  /** Цвет разделителя секции */
  section_separator_color?: string
  /** Цвет подзаголовка */
  subtitle_text_color?: string
  /** Цвет деструктивного текста */
  destructive_text_color?: string
}

/** Конфигурация главной кнопки */
export interface TelegramMainButton {
  /** Текст кнопки */
  text: string
  /** Цвет кнопки */
  color: string
  /** Цвет текста */
  textColor: string
  /** Видимость кнопки */
  isVisible: boolean
  /** Активность кнопки */
  isActive: boolean
  /** Состояние загрузки */
  isProgressVisible: boolean
  /** Установить текст кнопки */
  setText(text: string): void
  /** Показать кнопку */
  show(): void
  /** Скрыть кнопку */
  hide(): void
  /** Включить кнопку */
  enable(): void
  /** Отключить кнопку */
  disable(): void
  /** Показать/скрыть прогресс */
  showProgress(leaveActive?: boolean): void
  /** Скрыть прогресс */
  hideProgress(): void
  /** Установить параметры кнопки */
  setParams(params: {
    text?: string
    color?: string
    text_color?: string
    is_active?: boolean
    is_visible?: boolean
  }): void
  /** Обработчик нажатия */
  onClick(callback: () => void): void
  /** Удалить обработчик нажатия */
  offClick(callback: () => void): void
}

/** Конфигурация задней кнопки */
export interface TelegramBackButton {
  /** Видимость кнопки */
  isVisible: boolean
  /** Показать кнопку */
  show(): void
  /** Скрыть кнопку */
  hide(): void
  /** Обработчик нажатия */
  onClick(callback: () => void): void
  /** Удалить обработчик нажатия */
  offClick(callback: () => void): void
}

/** Haptic Feedback API */
export interface TelegramHapticFeedback {
  /** Легкая вибрация при выборе */
  selectionChanged(): void
  /** Вибрация при успешном действии */
  notificationOccurred(type: 'error' | 'success' | 'warning'): void
  /** Вибрация при действии */
  impactOccurred(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft'): void
}

/** Cloud Storage API */
export interface TelegramCloudStorage {
  /** Сохранить элементы */
  setItem(key: string, value: string, callback?: (error: string | null, success: boolean) => void): void
  /** Получить элементы */
  getItem(key: string, callback: (error: string | null, value: string | null) => void): void
  /** Получить несколько элементов */
  getItems(keys: string[], callback: (error: string | null, values: Record<string, string>) => void): void
  /** Удалить элементы */
  removeItem(key: string, callback?: (error: string | null, success: boolean) => void): void
  /** Удалить несколько элементов */
  removeItems(keys: string[], callback?: (error: string | null, success: boolean) => void): void
  /** Получить все ключи */
  getKeys(callback: (error: string | null, keys: string[]) => void): void
}

/** Основной интерфейс Telegram WebApp */
export interface TelegramWebApp {
  /** Данные инициализации */
  initData: string
  /** Распарсенные данные инициализации */
  initDataUnsafe: TelegramWebAppInitData
  /** Версия API */
  version: string
  /** Платформа */
  platform: string
  /** Цветовая схема */
  colorScheme: 'light' | 'dark'
  /** Параметры темы */
  themeParams: TelegramThemeParams
  /** Развернуто ли приложение */
  isExpanded: boolean
  /** Высота области просмотра */
  viewportHeight: number
  /** Стабильная высота области просмотра */
  viewportStableHeight: number
  /** Высота заголовка */
  headerColor: string
  /** Цвет фона */
  backgroundColor: string
  /** Видна ли задняя кнопка */
  isClosingConfirmationEnabled: boolean
  /** Главная кнопка */
  MainButton: TelegramMainButton
  /** Задняя кнопка */
  BackButton: TelegramBackButton
  /** Haptic Feedback */
  HapticFeedback: TelegramHapticFeedback
  /** Cloud Storage */
  CloudStorage: TelegramCloudStorage

  // === МЕТОДЫ ===
  /** Готовность приложения */
  ready(): void
  /** Развернуть приложение */
  expand(): void
  /** Закрыть приложение */
  close(): void
  /** Включить подтверждение закрытия */
  enableClosingConfirmation(): void
  /** Отключить подтверждение закрытия */
  disableClosingConfirmation(): void
  /** Установить цвет заголовка */
  setHeaderColor(color: string): void
  /** Установить цвет фона */
  setBackgroundColor(color: string): void
  /** Показать попап */
  showPopup(params: {
    title?: string
    message: string
    buttons?: Array<{
      id?: string
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive'
      text?: string
    }>
  }, callback?: (buttonId: string) => void): void
  /** Показать уведомление */
  showAlert(message: string, callback?: () => void): void
  /** Показать подтверждение */
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void
  /** Показать сканер QR */
  showScanQrPopup(params: {
    text?: string
  }, callback?: (text: string) => boolean): void
  /** Закрыть сканер QR */
  closeScanQrPopup(): void
  /** Запросить права на запись */
  requestWriteAccess(callback?: (granted: boolean) => void): void
  /** Запросить контакт */
  requestContact(callback?: (granted: boolean) => void): void
  /** Открыть ссылку */
  openLink(url: string, options?: { try_instant_view?: boolean }): void
  /** Открыть телеграм ссылку */
  openTelegramLink(url: string): void
  /** Открыть счет */
  openInvoice(url: string, callback?: (status: 'paid' | 'cancelled' | 'failed' | 'pending') => void): void

  // === СОБЫТИЯ ===
  /** Обработчик события изменения области просмотра */
  onEvent(eventType: 'viewportChanged', eventHandler: () => void): void
  /** Обработчик события изменения темы */
  onEvent(eventType: 'themeChanged', eventHandler: () => void): void
  /** Обработчик события изменения главной кнопки */
  onEvent(eventType: 'mainButtonClicked', eventHandler: () => void): void
  /** Обработчик события изменения задней кнопки */
  onEvent(eventType: 'backButtonClicked', eventHandler: () => void): void
  /** Обработчик события закрытия сканера QR */
  onEvent(eventType: 'qrTextReceived', eventHandler: (data: { data: string }) => void): void
  /** Удалить обработчик события */
  offEvent(eventType: string, eventHandler: () => void): void
}

// === WINDOW INTERFACE ===

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp
    }
  }
}

// === UTILITY TYPES ===

/** Статус окружения Telegram */
export type TelegramEnvironment = 'telegram' | 'browser' | 'development'

/** Конфигурация моков для разработки */
export interface TelegramMockConfig {
  /** Включить моки */
  enabled: boolean
  /** Данные пользователя */
  user?: Partial<TelegramUser>
  /** Тема */
  colorScheme?: 'light' | 'dark'
  /** Параметры темы */
  themeParams?: Partial<TelegramThemeParams>
}

/** Результат определения окружения */
export interface TelegramEnvironmentInfo {
  /** Тип окружения */
  environment: TelegramEnvironment
  /** Доступен ли WebApp API */
  isWebAppAvailable: boolean
  /** Версия API (если доступна) */
  version?: string
  /** Платформа (если доступна) */
  platform?: string
}