/**
 * 🚀 Telegram WebApp API
 * 
 * Унифицированный API для работы с Telegram WebApp
 * Экспортирует все типы, хуки и утилиты
 */

// === TYPES ===
export type {
  TelegramUser,
  TelegramChat,
  TelegramWebApp,
  TelegramWebAppInitData,
  TelegramThemeParams,
  TelegramMainButton,
  TelegramBackButton,
  TelegramHapticFeedback,
  TelegramCloudStorage,
  TelegramEnvironment,
  TelegramEnvironmentInfo,
  TelegramMockConfig
} from './types'

// === API CLIENT ===
export {
  TelegramApiClient,
  getTelegramApi,
  resetTelegramApi,
  configureMocks,
  detectTelegramEnvironment
} from './api'

// === REACT HOOKS ===
export {
  // Core hooks
  useTelegramEnvironment,
  useTelegramAvailable,
  useTelegramWebApp,
  
  // User hooks
  useTelegramUser,
  useTelegramUserSafe,
  useTelegramUserHelpers,
  
  // Theme hooks
  useTelegramTheme,
  useTelegramThemeCssVars,
  
  // Interaction hooks
  useTelegramHaptic,
  useTelegramNavigation,
  useTelegramMainButton,
  useTelegramBackButton,
  useTelegramPopups,
  useTelegramViewport,
  
  // Compound hook
  useTelegram
} from './hooks'

// === RE-EXPORTS FOR COMPATIBILITY ===
// Поддерживаем старые импорты для плавного перехода

/** @deprecated Используйте useTelegramUserHelpers */
export { useTelegramUserHelpers as useTelegramUser_DEPRECATED } from './hooks'