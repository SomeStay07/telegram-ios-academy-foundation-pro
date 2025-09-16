import { useState, useEffect } from 'react'
import { Card, Avatar } from '@telegram-ios-academy/ui'
import { Trophy, Code2, BookOpen, Calendar } from 'lucide-react'

// Clean gaming animations
const gameAnimations = `
@keyframes magicParticles {
  0% { transform: translateY(40px) scale(0); opacity: 0; }
  50% { transform: translateY(-10px) scale(1); opacity: 1; }
  100% { transform: translateY(-80px) scale(0); opacity: 0; }
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.8); }
}

@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
}
`

interface TelegramUser {
  id?: number
  first_name?: string
  last_name?: string
  username?: string
  language_code?: string
  photo_url?: string
  is_premium?: boolean
}

export function ProfilePage() {
  const [telegramUser, setTelegramUser] = useState<TelegramUser>({})

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = gameAnimations
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    const webApp = (window as any)?.Telegram?.WebApp
    if (webApp?.initDataUnsafe?.user) {
      const tgUser = webApp.initDataUnsafe.user
      setTelegramUser({
        ...tgUser,
        is_premium: true
      })
    } else {
      // Расширенные мок-данные
      setTelegramUser({
        id: 123456789,
        first_name: 'Тимур',
        last_name: 'Цеберда',
        username: 'timurceberda', 
        is_premium: true,
        photo_url: undefined // будем использовать лаконичную иконку
      })
    }
  }, [])

  const displayName = telegramUser.first_name 
    ? `${telegramUser.first_name}${telegramUser.last_name ? ` ${telegramUser.last_name}` : ''}`
    : telegramUser.username || 'Разработчик'

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container max-w-2xl mx-auto space-y-6">
        
        {/* Main Profile Card */}
        <Card className="group relative bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
          <div className="p-8">
            
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              
              {/* Avatar с красивым обрамлением */}
              <div className="relative">
                {/* Градиентное обрамление */}
                <div className="absolute inset-0 rounded-full p-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600">
                  <div className="bg-white rounded-full w-full h-full"></div>
                </div>
                
                {/* Hover glow effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    animation: 'glow 2s ease-in-out infinite',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    transform: 'scale(1.3)'
                  }}
                />
                
                {/* Аватар с лаконичной иконкой если нет фото */}
                <div className="relative z-10">
                  {telegramUser.photo_url ? (
                    <Avatar
                      src={telegramUser.photo_url}
                      alt={displayName}
                      fallback={displayName}
                      size="xl"
                      className="border-2 border-white"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-white">
                      <Code2 className="w-8 h-8 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {displayName}
                  </h1>
                  
                  {/* Премиум Badge */}
                  {telegramUser.is_premium && (
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-full">
                      <Trophy 
                        className="w-4 h-4 text-amber-600"
                        style={{ animation: 'bounce 2s ease-in-out infinite' }}
                      />
                      <span className="text-sm font-medium text-amber-700">Премиум</span>
                    </div>
                  )}
                </div>
                
                {telegramUser.username && (
                  <p className="text-gray-600 mb-2">@{telegramUser.username}</p>
                )}
                
                <div className="text-sm text-gray-500">
                  iOS Developer Community Member
                </div>
              </div>
            </div>

            {/* Professional Stats */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">12</div>
                  <div className="text-sm text-gray-500">Курсы завершены</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">127ч</div>
                  <div className="text-sm text-gray-500">Время обучения</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold text-gray-900">23</div>
                  <div className="text-sm text-gray-500">Дней подряд</div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Прогресс обучения</span>
                <span className="text-sm text-gray-500">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: '89%' }}
                />
              </div>
            </div>
            
          </div>
          
          {/* Subtle hover effect particles */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${20 + i * 20}%`,
                  animation: `sparkle ${2 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
        </Card>

        {/* Bio Card */}
        <Card className="group relative bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">О себе</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                iOS разработчик с 3+ годами опыта. Специализируюсь на SwiftUI, UIKit и создании современных мобильных приложений. 
                Активный участник сообщества разработчиков.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Swift</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">SwiftUI</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">UIKit</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">Core Data</span>
              </div>
              
              <div className="pt-4 border-t border-gray-100 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Присоединился: Март 2023</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hover shimmer effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%)',
              animation: 'shimmer 2s ease-in-out infinite'
            }}
          />
        </Card>
        
      </div>
    </div>
  )
}