import { Avatar, Card } from '../index'
import './account-card.css'

interface AccountCardProps {
  user: {
    first_name?: string
    last_name?: string
    username?: string
    photo_url?: string
  }
}

export function AccountCard({ user }: AccountCardProps) {
  const initials = (user.first_name?.[0] ?? '') + (user.last_name?.[0] ?? '')
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ')

  return (
    <Card className="account-card bg-card border border-border rounded-2xl relative overflow-hidden p-4 sm:p-5">
      <div className="flex items-center gap-4 min-w-0">
        <div className="avatar-ring">
          <Avatar
            src={user.photo_url}
            alt={fullName || user.username || 'User'}
            fallback={initials || 'TG'}
            size="lg"
            className="border-0"
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {fullName || user.username || 'Telegram User'}
          </div>
          {user.username && (
            <div className="text-sm min-w-0 truncate overflow-hidden text-ellipsis whitespace-nowrap">
              @{user.username}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}