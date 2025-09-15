import React from 'react'
import { Card } from '../Card'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { cn } from '../../utils/cn'
import './profile-hero.css'

type Props = {
  user: { 
    id?: number
    first_name?: string
    last_name?: string
    username?: string
    photo_url?: string
  }
  className?: string
  onCopyId?: (id: number | undefined) => void
}

export function ProfileHeroCard({ user, className, onCopyId }: Props) {
  const initials = ((user.first_name?.[0] ?? "") + (user.last_name?.[0] ?? "")).trim() || "TG"
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ')
  const idText = user.id ? String(user.id) : "—"

  return (
    <Card className={cn(
      "profile-hero relative overflow-hidden rounded-2xl border border-border bg-card text-card-foreground",
      "p-4 sm:p-5",
      className
    )}>
      {/* верхний тихий блик */}
      <div className="profile-hero_glow" aria-hidden="true" />

      <div className="flex items-center gap-4 min-w-0">
        <div className="avatar-ring">
          <Avatar
            src={user.photo_url}
            alt={fullName || user.username || 'User'}
            fallback={initials}
            size="lg"
            className="border-0"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {fullName || user.username || 'Telegram User'}
          </div>
          {user.username && (
            <div className="text-sm text-muted-foreground min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              @{user.username}
            </div>
          )}

          {/* ID + copy */}
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground min-w-0">
            <span className="min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              ID: <span className="font-medium text-foreground/90">{idText}</span>
            </span>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 flex-shrink-0"
              onClick={() => onCopyId?.(user.id)}
              aria-label="Copy Telegram ID"
            >
              Copy
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

ProfileHeroCard.displayName = 'ProfileHeroCard'