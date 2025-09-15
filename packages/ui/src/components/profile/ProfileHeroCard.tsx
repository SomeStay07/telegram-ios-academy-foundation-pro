import React from 'react'
import { Card } from '../Card'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { Badge } from '../Badge'
import { cn } from '../../utils/cn'
import { Crown, Shield, Star, Copy, MapPin } from 'lucide-react'
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

  return (
    <Card className={cn(
      "profile-hero relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
      "p-4 sm:p-5",
      className
    )}>
      {/* верхний тихий блик */}
      <div className="profile-hero_glow" aria-hidden="true" />

      {/* Premium badge в углу */}
      {user.is_premium && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            <Crown className="w-3 h-3 mr-1" />
            Premium
          </Badge>
        </div>
      )}

      <div className="flex items-start gap-4 min-w-0">
        <div className="avatar-ring relative">
          <Avatar
            src={user.photo_url}
            alt={fullName || user.username || 'User'}
            fallback={initials}
            size="xl"
            className="border-0"
          />
          
          {/* Level badge на аватаре */}
          <div className="absolute -bottom-1 -right-1 z-10">
            <Badge variant="outline" className={cn(
              "bg-background/90 backdrop-blur-sm border-2 text-xs font-bold min-w-[28px] h-6 flex items-center justify-center",
              getLevelColor(level)
            )}>
              {level}
            </Badge>
          </div>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-lg font-bold min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                {fullName || user.username || 'Telegram User'}
              </div>
              
              {/* Status badges */}
              <div className="flex items-center gap-1 flex-wrap">
                {stats?.streak && stats.streak >= 7 && (
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    {stats.streak}🔥
                  </Badge>
                )}
                
                {level >= 5 && (
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                    <Shield className="w-3 h-3 mr-1" />
                    Expert
                  </Badge>
                )}
              </div>
            </div>
            
            {user.username && (
              <div className="text-sm opacity-80 min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
                @{user.username}
              </div>
            )}
          </div>

          {/* Quick stats */}
          <div className="flex items-center gap-3 text-xs opacity-90">
            {stats?.completed && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span>{stats.completed} курсов</span>
              </div>
            )}
            
            {user.language_code && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{user.language_code.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* ID + copy - компактно */}
          <div className="flex items-center gap-2 text-xs opacity-75">
            <span className="font-mono">ID: {idText}</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-white/20 flex-shrink-0"
              onClick={() => onCopyId?.(user.id)}
              aria-label="Copy Telegram ID"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

ProfileHeroCard.displayName = 'ProfileHeroCard'