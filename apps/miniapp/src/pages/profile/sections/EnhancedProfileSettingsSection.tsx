import React, { useState, useEffect, useRef } from 'react'
import { Card, Button } from '@telegram-ios-academy/ui'
import { Settings, Palette, Bell, Languages, Globe, Shield, Smartphone, ChevronRight, Moon, Sun, Monitor } from 'lucide-react'
import { ThemeMode, setThemeMode } from '../../../shared/lib/telegram/useTelegramTheme'

interface ProfileSettingsSectionProps {
  preferences?: {
    theme?: ThemeMode
    language?: string
    notifications?: boolean
  }
  onThemeChange?: (theme: ThemeMode) => void
  onLanguageChange?: (language: string) => void
  onNotificationsToggle?: (enabled: boolean) => void
}

export function EnhancedProfileSettingsSection({
  preferences = {
    theme: 'system',
    language: 'en',
    notifications: true
  },
  onThemeChange,
  onLanguageChange,
  onNotificationsToggle
}: ProfileSettingsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredSetting, setHoveredSetting] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer для анимации
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const getThemeIcon = (theme: ThemeMode) => {
    switch (theme) {
      case 'light': return Sun
      case 'dark': return Moon
      case 'system': return Monitor
      default: return Monitor
    }
  }

  const getThemeLabel = (theme: ThemeMode) => {
    switch (theme) {
      case 'light': return 'Светлая'
      case 'dark': return 'Темная'
      case 'system': return 'Система'
      default: return 'Система'
    }
  }

  const settingsItems = [
    {
      id: 'theme',
      icon: <Palette className="w-5 h-5 text-purple-400" />,
      title: 'Тема оформления',
      description: 'Следовать Telegram или установить свою',
      gradientFrom: 'from-purple-500/10',
      gradientTo: 'to-pink-500/10',
      hoverGradient: 'hover:from-purple-500/20 hover:to-pink-500/20',
      iconBg: 'bg-purple-500/20',
      action: (
        <div className="flex bg-muted/50 rounded-lg p-1 backdrop-blur-sm">
          {(['system', 'light', 'dark'] as const).map((theme) => {
            const Icon = getThemeIcon(theme)
            return (
              <button
                key={theme}
                onClick={() => {
                  setThemeMode(theme)
                  onThemeChange?.(theme)
                }}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded transition-all duration-300 ${
                  preferences.theme === theme
                    ? 'bg-background text-foreground shadow-sm scale-105'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{getThemeLabel(theme)}</span>
              </button>
            )
          })}
        </div>
      )
    },
    {
      id: 'language',
      icon: <Languages className="w-5 h-5 text-blue-400" />,
      title: 'Язык интерфейса',
      description: 'Выберите язык приложения',
      gradientFrom: 'from-blue-500/10',
      gradientTo: 'to-cyan-500/10',
      hoverGradient: 'hover:from-blue-500/20 hover:to-cyan-500/20',
      iconBg: 'bg-blue-500/20',
      action: (
        <div className="relative">
          <select
            value={preferences.language}
            onChange={(e) => onLanguageChange?.(e.target.value)}
            className="appearance-none px-4 py-2 pr-8 text-sm bg-muted/50 border border-border/50 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <option value="en">🇺🇸 English</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="es">🇪🇸 Español</option>
          </select>
          <ChevronRight className="absolute right-2 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      )
    },
    {
      id: 'notifications',
      icon: <Bell className="w-5 h-5 text-orange-400" />,
      title: 'Уведомления',
      description: 'Обновления курсов и напоминания',
      gradientFrom: 'from-orange-500/10',
      gradientTo: 'to-red-500/10',
      hoverGradient: 'hover:from-orange-500/20 hover:to-red-500/20',
      iconBg: 'bg-orange-500/20',
      action: (
        <div 
          className="relative"
          onClick={() => onNotificationsToggle?.(!preferences.notifications)}
        >
          <div className={`w-12 h-6 rounded-full transition-all duration-300 cursor-pointer ${
            preferences.notifications 
              ? 'bg-gradient-to-r from-green-500 to-green-600' 
              : 'bg-muted/50'
          }`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform translate-y-0.5 ${
              preferences.notifications ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </div>
        </div>
      )
    }
  ]

  const quickActions = [
    {
      icon: <Shield className="w-4 h-4" />,
      label: 'Приватность',
      description: 'Настройки безопасности',
      gradientFrom: 'from-green-500/10',
      gradientTo: 'to-emerald-500/10'
    },
    {
      icon: <Globe className="w-4 h-4" />,
      label: 'Регион',
      description: 'Часовой пояс и локализация',
      gradientFrom: 'from-blue-500/10',
      gradientTo: 'to-indigo-500/10'
    },
    {
      icon: <Smartphone className="w-4 h-4" />,
      label: 'Устройства',
      description: 'Управление сессиями',
      gradientFrom: 'from-purple-500/10',
      gradientTo: 'to-violet-500/10'
    }
  ]

  return (
    <div ref={sectionRef} className={`space-y-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
    }`}>
      {/* Enhanced Main Settings Card */}
      <Card className="bg-gradient-to-br from-card to-card/50 text-card-foreground border-border rounded-2xl p-4 sm:p-6 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative">
          <div className={`flex items-center gap-3 mb-6 transition-all duration-500 ${
            isVisible ? 'animate-in slide-in-from-left-4 duration-700 delay-100' : 'opacity-0'
          }`}>
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl backdrop-blur-sm shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <Settings className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                Настройки
              </h3>
              <p className="text-sm text-muted-foreground">Персонализация приложения</p>
            </div>
            <div className={`h-0.5 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full transition-all duration-1000 delay-300 ${
              isVisible ? 'scale-x-100' : 'scale-x-0'
            } origin-left ml-4`} />
          </div>
          
          <div className="space-y-4">
            {settingsItems.map((item, index) => (
              <div 
                key={item.id}
                className={`group/item relative overflow-hidden rounded-xl transition-all duration-500 ${
                  isVisible ? 'animate-in slide-in-from-right-4' : 'opacity-0'
                } ${item.hoverGradient} ${
                  hoveredSetting === item.id ? 'scale-102 shadow-lg' : ''
                }`}
                style={{ animationDelay: `${200 + index * 100}ms` }}
                onMouseEnter={() => setHoveredSetting(item.id)}
                onMouseLeave={() => setHoveredSetting(null)}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradientFrom} ${item.gradientTo} opacity-0 group-hover/item:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative flex items-center justify-between gap-4 p-4 border border-border/50 rounded-xl backdrop-blur-sm group-hover/item:border-primary/30 transition-all duration-300">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`p-2 ${item.iconBg} rounded-lg flex-shrink-0 backdrop-blur-sm transition-all duration-300 group-hover/item:scale-110 group-hover/item:rotate-3`}>
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium text-foreground transition-colors duration-300 ${
                        hoveredSetting === item.id ? 'text-primary' : ''
                      }`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1 transition-colors duration-300 group-hover/item:text-muted-foreground/80">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {item.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Enhanced Quick Actions Grid */}
      <div className={`grid grid-cols-3 gap-3 ${
        isVisible ? 'animate-in slide-in-from-bottom-4 duration-700 delay-500' : 'opacity-0'
      }`}>
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            className="group bg-gradient-to-br from-card to-card/30 text-card-foreground border-border rounded-xl p-3 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer overflow-hidden relative"
            style={{ animationDelay: `${600 + index * 100}ms` }}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${action.gradientFrom} ${action.gradientTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative text-center space-y-2">
              <div className="p-2 bg-muted/30 rounded-lg mx-auto w-fit backdrop-blur-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                {action.icon}
              </div>
              <div>
                <div className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                  {action.label}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1 group-hover:text-muted-foreground/80 transition-colors duration-300">
                  {action.description}
                </div>
              </div>
            </div>
            
            {/* Hover indicator */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-primary/50 transition-all duration-300 group-hover:w-full w-0" />
          </Card>
        ))}
      </div>

      {/* Enhanced Info Card */}
      <Card className={`bg-gradient-to-br from-muted/20 to-muted/10 border-border/50 rounded-xl p-4 backdrop-blur-sm transition-all duration-500 hover:bg-muted/30 group overflow-hidden relative ${
        isVisible ? 'animate-in slide-in-from-bottom-4 duration-700 delay-700' : 'opacity-0'
      }`}>
        {/* Subtle animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
              Настройки синхронизируются с вашим аккаунтом Telegram
            </p>
          </div>
          <p className="text-xs text-muted-foreground/75 group-hover:text-muted-foreground transition-colors duration-300">
            Изменения применяются автоматически
          </p>
        </div>
        
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
      </Card>
    </div>
  )
}