/**
 * Auth Loading Screen
 * 
 * Shown while checking Telegram authentication
 */

import React from 'react'

export function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        {/* Telegram loading animation */}
        <div className="relative">
          <div className="w-16 h-16 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Подключаемся к Telegram
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Получаем данные профиля...
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}