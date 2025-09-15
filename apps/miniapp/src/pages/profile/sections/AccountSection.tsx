import { Copy, User, Hash } from 'lucide-react'
import { Card, Avatar, Button, Separator } from '@telegram-ios-academy/ui'
import { TelegramUser } from '../../../shared/lib/telegram/useTelegramUser'
import { cn } from '../../../shared/lib/utils'

interface AccountSectionProps {
  user: TelegramUser
  onCopyId: (id: number) => void
}

export function AccountSection({ user, onCopyId }: AccountSectionProps) {
  return (
    <Card className="p-4 bg-card text-card-foreground border border-border rounded-2xl shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <Avatar
          src={user.avatarUrl}
          alt={user.fullName}
          fallback={user.fullName}
          size="lg"
          className="ring-2 ring-border"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">
            {user.fullName}
          </h3>
          {user.username && (
            <p className="text-sm text-muted-foreground truncate">
              @{user.username}
            </p>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <User className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">Full Name</p>
              <p className="text-sm text-muted-foreground truncate">{user.fullName}</p>
            </div>
          </div>
        </div>

        {user.username && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="w-4 h-4 text-muted-foreground flex-shrink-0 text-sm">@</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">Username</p>
                <p className="text-sm text-muted-foreground truncate">{user.username}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Hash className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">User ID</p>
              <p className="text-sm text-muted-foreground font-mono break-all">{user.id}</p>
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
    </Card>
  )
}