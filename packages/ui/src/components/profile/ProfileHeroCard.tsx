import React, { useState, useEffect } from 'react'
import { Card } from '../Card'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { cn } from '../../utils/cn'
import { Crown, Shield, Star, Copy, MapPin, Zap, Trophy, Sparkles, Diamond, Gem } from 'lucide-react'
import './profile-hero.css'

type Props = {
  user: { 
    id?: number
    first_name?: string
    last_name?: string
    username?: string
    photo_url?: string
    is_premium?: boolean
    language_code?: string
  }
  stats?: {
    level?: number
    completed?: number
    streak?: number
  }
  className?: string
  onCopyId?: (id: number | undefined) => void
}

export function ProfileHeroCard({ user, stats, className, onCopyId }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  
  const initials = ((user.first_name?.[0] ?? "") + (user.last_name?.[0] ?? "")).trim() || "TG"
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ')
  const idText = user.id ? String(user.id) : "—"
  
  // Calculate user level based on completed courses
  const level = stats?.level || Math.floor((stats?.completed || 1) * 2.5) + 1
  const getLevelColor = (level: number) => {
    if (level >= 10) return "text-yellow-400"
    if (level >= 5) return "text-blue-400" 
    return "text-green-400"
  }
  
  const getLevelIcon = (level: number) => {
    if (level >= 10) return Crown
    if (level >= 5) return Trophy
    return Star
  }
  
  // Enhanced copy handler with feedback
  const handleCopyId = async () => {
    if (!user.id) return
    
    try {
      await navigator.clipboard.writeText(String(user.id))
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      onCopyId?.(user.id)
    } catch (error) {
      console.error('Failed to copy ID:', error)
    }
  }
  

  return (
    <Card 
      className={cn(
        "profile-hero relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
        "p-4 sm:p-5 transition-all duration-500 ease-out",
        "hover:scale-[1.02] hover:shadow-2xl",
        "group cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced animated background elements */}
      <div className="profile-hero_glow" aria-hidden="true" />
      
      {/* Floating particles animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute w-1 h-1 bg-white/30 rounded-full",
              "animate-float opacity-0",
              isHovered && "opacity-100"
            )}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {/* Shimmer effect on hover */}
      <div className={cn(
        "absolute inset-0 pointer-events-none transition-opacity duration-700",
        "bg-gradient-to-r from-transparent via-white/10 to-transparent",
        "transform -skew-x-12 translate-x-[-200%]",
        isHovered ? "opacity-100 translate-x-[200%] duration-1000" : "opacity-0"
      )} aria-hidden="true" />


      <div className="flex items-start gap-4 min-w-0">
        <div className={cn(
          "avatar-ring relative transition-all duration-500",
          isHovered && "scale-110 rotate-2"
        )}>
          {/* Интересное обрамление аватара */}
          <div className="relative">
            {/* Двойное вращающееся кольцо */}
            <div className={cn(
              "absolute inset-[-4px] rounded-full",
              "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
              "animate-spin-slow opacity-0 p-1",
              isHovered && "opacity-100"
            )}>
              <div className="w-full h-full bg-background rounded-full" />
            </div>
            
            {/* Внутреннее пульсирующее кольцо */}
            <div className={cn(
              "absolute inset-[-2px] rounded-full",
              "bg-gradient-to-br from-cyan-400 to-blue-600",
              "animate-pulse opacity-0 blur-sm",
              isHovered && "opacity-60"
            )} />
            
            {/* Орбитальные элементы вокруг аватара */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute w-2 h-2 rounded-full transition-all duration-500",
                    "bg-gradient-to-r from-blue-400 to-purple-500",
                    "animate-orbit opacity-0",
                    isHovered && "opacity-100"
                  )}
                  style={{
                    left: `${50 + Math.cos(i * 1.047) * 45}%`,
                    top: `${50 + Math.sin(i * 1.047) * 45}%`,
                    animationDelay: `${i * 0.3}s`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              ))}
            </div>
            
            {/* Голографический эффект */}
            <div className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-tr from-transparent via-white/10 to-transparent",
              "transform rotate-45 opacity-0 transition-opacity duration-500",
              isHovered && "opacity-100 animate-shimmer"
            )} />
            
            <Avatar
              src={user.photo_url}
              alt={fullName || user.username || 'User'}
              fallback={initials}
              size="xl"
              className={cn(
                "border-2 border-white/20 transition-all duration-500",
                "relative z-10 shadow-2xl",
                "ring-2 ring-white/10 ring-offset-2 ring-offset-transparent",
                isHovered && "brightness-110 contrast-115 saturate-110 scale-105"
              )}
              style={{
                boxShadow: isHovered 
                  ? '0 0 25px rgba(59, 130, 246, 0.3), 0 0 50px rgba(147, 51, 234, 0.2)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            />
            
            {/* Level badge статичный */}
            <div className="absolute -bottom-2 -right-2 z-20">
              <Badge 
                variant="outline" 
                className={cn(
                  "bg-gradient-to-br from-background via-background/95 to-background/90",
                  "backdrop-blur-md border-2 border-white/30",
                  "text-xs font-bold min-w-[36px] h-8",
                  "flex items-center justify-center gap-1.5",
                  "transition-all duration-300 hover:scale-110 hover:-translate-y-1",
                  "shadow-2xl hover:shadow-3xl rounded-full",
                  "ring-2 ring-white/10 ring-offset-1 ring-offset-transparent",
                  getLevelColor(level)
                )}
                style={{
                  boxShadow: `0 4px 15px rgba(0, 0, 0, 0.2), 0 0 20px ${level >= 10 ? 'rgba(250, 204, 21, 0.3)' : level >= 5 ? 'rgba(59, 130, 246, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                }}
              >
                {React.createElement(getLevelIcon(level), { 
                  className: cn(
                    "w-3.5 h-3.5 transition-transform duration-300",
                    isHovered && "rotate-12 scale-110",
                    "drop-shadow-sm"
                  )
                })}
                <span className="drop-shadow-sm">{level}</span>
              </Badge>
            </div>
            
            {/* Улучшенный Status indicator */}
            {stats?.streak && stats.streak >= 7 && (
              <div className="absolute -top-2 -left-2 z-20">
                <div className={cn(
                  "w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full",
                  "animate-pulse shadow-2xl ring-2 ring-orange-400/30",
                  "flex items-center justify-center",
                  "transition-all duration-300 hover:scale-125"
                )}
                style={{
                  boxShadow: '0 0 15px rgba(249, 115, 22, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)'
                }}>
                  <Zap className={cn(
                    "w-3 h-3 text-white transition-transform duration-300",
                    "drop-shadow-sm",
                    isHovered && "animate-wiggle scale-110"
                  )} />
                  
                  {/* Пульсирующий ореол */}
                  <div className={cn(
                    "absolute inset-0 bg-orange-400/30 rounded-full",
                    "animate-ping"
                  )} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              {/* Enhanced name with typing animation */}
              <div className={cn(
                "text-lg font-bold min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap",
                "bg-gradient-to-r from-white to-white/90 bg-clip-text",
                "transition-all duration-300",
                isHovered && "text-shadow-glow scale-105"
              )}>
                {fullName || user.username || 'Telegram User'}
              </div>
              
              {/* Enhanced Status badges */}
              <div className="flex items-center gap-1 flex-wrap">
                {stats?.streak && stats.streak >= 7 && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "bg-gradient-to-r from-orange-500/20 to-red-500/20",
                      "text-orange-300 border-orange-500/30 text-xs",
                      "transition-all duration-300 hover:scale-105",
                      "shadow-md hover:shadow-orange-500/25",
                      "animate-pulse"
                    )}
                  >
                    <Star className={cn(
                      "w-3 h-3 mr-1 transition-transform duration-300",
                      isHovered && "rotate-12 scale-110"
                    )} />
                    <span className="font-semibold">{stats.streak}🔥</span>
                  </Badge>
                )}
                
                {level >= 5 && (
                  <Badge 
                    variant="secondary" 
                    className={cn(
                      "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
                      "text-green-300 border-green-500/30 text-xs",
                      "transition-all duration-300 hover:scale-105",
                      "shadow-md hover:shadow-green-500/25"
                    )}
                  >
                    <Shield className={cn(
                      "w-3 h-3 mr-1 transition-transform duration-300",
                      isHovered && "rotate-6 scale-110"
                    )} />
                    <span className="font-semibold">Expert</span>
                  </Badge>
                )}
              </div>
            </div>
            
            {user.username && (
              <div className={cn(
                "text-sm opacity-80 min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap",
                "transition-all duration-300",
                isHovered && "opacity-100 transform translate-x-1"
              )}>
                @{user.username}
              </div>
            )}
          </div>

          {/* Enhanced Quick stats с анимацией */}
          <div className={cn(
            "flex items-center gap-3 text-xs opacity-90",
            "transition-all duration-300",
            isHovered && "opacity-100 transform translate-x-1"
          )}>
            {stats?.completed && (
              <div className={cn(
                "flex items-center gap-1 transition-all duration-300",
                "hover:scale-105 hover:text-yellow-300"
              )}>
                <Star className={cn(
                  "w-3 h-3 transition-transform duration-300",
                  isHovered && "rotate-180 text-yellow-400"
                )} />
                <span className="font-medium">{stats.completed} курсов</span>
              </div>
            )}
            
            {user.language_code && (
              <div className={cn(
                "flex items-center gap-1 transition-all duration-300",
                "hover:scale-105 hover:text-blue-300"
              )}>
                <MapPin className={cn(
                  "w-3 h-3 transition-transform duration-300",
                  isHovered && "bounce text-blue-400"
                )} />
                <span className="font-medium">{user.language_code.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Enhanced ID + copy с success feedback */}
          <div className={cn(
            "flex items-center gap-2 text-xs opacity-75",
            "transition-all duration-300",
            isHovered && "opacity-90 transform translate-x-1"
          )}>
            <span className="font-mono tracking-wide">{copySuccess ? "ID скопирован!" : `ID: ${idText}`}</span>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-6 w-6 p-0 flex-shrink-0 transition-all duration-300",
                "hover:bg-white/20 hover:scale-110",
                copySuccess ? "bg-green-500/20 text-green-300" : "hover:text-blue-300"
              )}
              onClick={handleCopyId}
              aria-label="Copy Telegram ID"
            >
              <Copy className={cn(
                "w-3 h-3 transition-all duration-300",
                copySuccess && "rotate-12 scale-110 text-green-400"
              )} />
            </Button>
            
            {/* Success checkmark animation */}
            {copySuccess && (
              <div className="animate-bounce text-green-400">
                ✓
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Enhanced hover indicator */}
      <div className={cn(
        "absolute bottom-2 right-2 transition-all duration-500",
        "text-xs opacity-0 pointer-events-none",
        isHovered && "opacity-60 transform translate-y-[-2px]"
      )}>
        <div className="flex items-center gap-1 text-white/60">
          <Sparkles className="w-3 h-3 animate-spin" />
          <span className="font-medium">Interactive</span>
        </div>
      </div>
    </Card>
  )
}

ProfileHeroCard.displayName = 'ProfileHeroCard'