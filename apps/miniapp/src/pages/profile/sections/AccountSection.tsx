import { Copy, Edit, User, Hash, Crown } from 'lucide-react'
import { CardSurface, Avatar, Button, Badge } from '@telegram-ios-academy/ui'
import { TelegramUser } from '../../../shared/lib/telegram/useTelegramUser'

interface AccountSectionProps {
  user: TelegramUser
  onCopyId: (id: number) => void
  onEdit?: () => void
}

export function AccountSection({ user, onCopyId, onEdit }: AccountSectionProps) {
  // Helper to get avatar initials from first_name + last_name
  const getInitials = () => {
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
    }
    if (user.firstName) {
      return user.firstName[0].toUpperCase()
    }
    if (user.fullName) {
      return user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    }
    return 'U'
  }

  return (
    <CardSurface interactive className="p-4 sm:p-5 transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Avatar with premium indicator */}
        <div className="relative flex-shrink-0">
          <Avatar
            src={user.avatarUrl}
            alt={user.fullName}
            fallback={getInitials()}
            size="xl"
            className="ring-1 ring-border"
          />
          {user.isPremium && (
            <div className="absolute -top-1 -right-1 premium-indicator rounded-full p-1">
              <Crown className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        
        {/* User info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="card-section-header text-lg font-semibold text-foreground truncate">
                {user.fullName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                {user.username && (
                  <p className="text-sm text-muted-foreground truncate">
                    @{user.username}
                  </p>
                )}
                <Badge variant="outline" className="text-xs flex-shrink-0">
                  {user.languageCode.toUpperCase()}
                </Badge>
              </div>
            </div>
            
            {/* Edit button */}
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={onEdit}
                className="flex-shrink-0"
              >
                <Edit className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 pt-4 border-t border-border space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <User className="card-icon w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Full Name</p>
              <p className="text-sm text-foreground truncate">{user.fullName}</p>
            </div>
          </div>
        </div>

        {user.username && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="w-4 h-4 text-muted-foreground flex-shrink-0 text-sm font-bold">@</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Username</p>
                <p className="text-sm text-foreground truncate">{user.username}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Hash className="card-icon w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">User ID</p>
              <p className="text-sm text-foreground font-mono break-all">{user.id}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopyId(user.id)}
            className="ml-2 flex-shrink-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardSurface>
  )
}