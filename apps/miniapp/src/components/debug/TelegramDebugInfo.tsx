import React, { useState } from 'react'
import { useTelegramUser } from '../../hooks/useTelegramUser'
import { useAuthVerification } from '../../hooks/useApi'

export function TelegramDebugInfo() {
  const [isVisible, setIsVisible] = useState(false)
  const telegramUser = useTelegramUser()
  const { data: authData, isSuccess: isAuthSuccess, error: authError } = useAuthVerification()

  // Get all Telegram WebApp data
  const tg = window.Telegram?.WebApp
  
  // Check script loading
  const telegramScripts = Array.from(document.querySelectorAll('script[src*="telegram"]'))
  const scriptInfo = telegramScripts.map(script => ({
    src: script.src,
    loaded: script.readyState,
    hasOnload: !!script.onload,
    hasOnerror: !!script.onerror
  }))
  
  const debugData = {
    // Basic checks
    hasTelegram: !!window.Telegram,
    hasWebApp: !!window.Telegram?.WebApp,
    hasInitData: !!tg?.initData,
    hasInitDataUnsafe: !!tg?.initDataUnsafe,
    hasUser: !!tg?.initDataUnsafe?.user,
    
    // Environment
    userAgent: navigator.userAgent,
    isProduction: import.meta.env.PROD,
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    useMocks: import.meta.env.VITE_USE_MOCKS,
    
    // Telegram WebApp info
    platform: tg?.platform,
    version: tg?.version,
    initData: tg?.initData?.substring(0, 100) + '...' || 'NO_INIT_DATA',
    
    // User data
    userDataRaw: tg?.initDataUnsafe?.user,
    
    // Our processed data
    telegramUser,
    
    // Backend auth
    isAuthSuccess,
    authData: authData?.user,
    authError: authError?.message,
    
    // Script loading info
    scriptLoading: {
      scriptsFound: telegramScripts.length,
      scripts: scriptInfo
    },
    
    // Other WebApp properties
    webAppData: {
      isExpanded: tg?.isExpanded,
      viewportHeight: tg?.viewportHeight,
      viewportStableHeight: tg?.viewportStableHeight,
      headerColor: tg?.headerColor,
      backgroundColor: tg?.backgroundColor,
      isClosingConfirmationEnabled: tg?.isClosingConfirmationEnabled,
      isVerticalSwipesEnabled: tg?.isVerticalSwipesEnabled
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-lg"
        >
          🔍 DEBUG
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-lg p-4 max-w-4xl mx-auto my-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🔍 Telegram WebApp Debug Info</h2>
          <button
            onClick={() => setIsVisible(false)}
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm"
          >
            ✕ Close
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Quick Status */}
          <div className="bg-gray-100 p-3 rounded">
            <h3 className="font-bold mb-2">📊 Quick Status:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>Telegram Available: <span className={debugData.hasTelegram ? 'text-green-600' : 'text-red-600'}>{debugData.hasTelegram ? '✅' : '❌'}</span></div>
              <div>WebApp Available: <span className={debugData.hasWebApp ? 'text-green-600' : 'text-red-600'}>{debugData.hasWebApp ? '✅' : '❌'}</span></div>
              <div>Init Data: <span className={debugData.hasInitData ? 'text-green-600' : 'text-red-600'}>{debugData.hasInitData ? '✅' : '❌'}</span></div>
              <div>User Data: <span className={debugData.hasUser ? 'text-green-600' : 'text-red-600'}>{debugData.hasUser ? '✅' : '❌'}</span></div>
            </div>
          </div>

          {/* Environment */}
          <div className="bg-blue-50 p-3 rounded">
            <h3 className="font-bold mb-2">🌍 Environment:</h3>
            <div className="text-sm font-mono space-y-1">
              <div>Production: {debugData.isProduction ? 'true' : 'false'}</div>
              <div>API URL: {debugData.apiBaseUrl || 'undefined'}</div>
              <div>Use Mocks: {debugData.useMocks || 'false'}</div>
              <div>Platform: {debugData.platform || 'unknown'}</div>
              <div>TG Version: {debugData.version || 'unknown'}</div>
            </div>
          </div>

          {/* Raw User Data */}
          <div className="bg-green-50 p-3 rounded">
            <h3 className="font-bold mb-2">👤 Raw Telegram User Data:</h3>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {JSON.stringify(debugData.userDataRaw, null, 2)}
            </pre>
          </div>

          {/* Processed Data */}
          <div className="bg-yellow-50 p-3 rounded">
            <h3 className="font-bold mb-2">⚙️ Processed Telegram User:</h3>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {JSON.stringify(debugData.telegramUser, null, 2)}
            </pre>
          </div>

          {/* Backend Auth */}
          <div className="bg-purple-50 p-3 rounded">
            <h3 className="font-bold mb-2">🔐 Backend Auth Status:</h3>
            <div className="text-sm space-y-1">
              <div>Auth Success: <span className={debugData.isAuthSuccess ? 'text-green-600' : 'text-red-600'}>{debugData.isAuthSuccess ? '✅' : '❌'}</span></div>
              {debugData.authError && <div className="text-red-600">Error: {debugData.authError}</div>}
            </div>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto mt-2">
              {JSON.stringify(debugData.authData, null, 2)}
            </pre>
          </div>

          {/* Init Data Sample */}
          <div className="bg-orange-50 p-3 rounded">
            <h3 className="font-bold mb-2">📝 Init Data (first 100 chars):</h3>
            <div className="text-xs font-mono bg-white p-2 rounded border break-all">
              {debugData.initData}
            </div>
          </div>

          {/* Script Loading Info */}
          <div className="bg-red-50 p-3 rounded">
            <h3 className="font-bold mb-2">📜 Script Loading Status:</h3>
            <div className="text-sm space-y-1">
              <div>Scripts Found: <span className={debugData.scriptLoading.scriptsFound > 0 ? 'text-green-600' : 'text-red-600'}>{debugData.scriptLoading.scriptsFound}</span></div>
            </div>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto mt-2">
              {JSON.stringify(debugData.scriptLoading.scripts, null, 2)}
            </pre>
          </div>

          {/* WebApp Properties */}
          <div className="bg-indigo-50 p-3 rounded">
            <h3 className="font-bold mb-2">🖥️ WebApp Properties:</h3>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {JSON.stringify(debugData.webAppData, null, 2)}
            </pre>
          </div>

          {/* Copy Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                const debugText = JSON.stringify(debugData, null, 2)
                navigator.clipboard.writeText(debugText).then(() => {
                  alert('Debug info copied to clipboard!')
                }).catch(() => {
                  // Fallback - show in alert
                  prompt('Copy this debug info:', debugText.substring(0, 1000) + '...')
                })
              }}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg"
            >
              📋 Copy Debug Info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}