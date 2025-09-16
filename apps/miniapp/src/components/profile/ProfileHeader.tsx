import React from 'react'
import { Stack, Card, Text, Heading, Avatar, Badge } from '@telegram-ios-academy/ui'

interface User {
  id: number
  firstName: string
  lastName: string
  username: string
  avatar: string
  level: number
  rank: string
  streak: number
}

interface Stats {
  rank: string
  battlesWon: number
}

interface ProfileHeaderProps {
  user: User
  stats: Stats
}

export function ProfileHeader({ user, stats }: ProfileHeaderProps) {
  return (
    <Card style={{ 
      background: 'linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-blue) 100%)',
      border: '1px solid var(--color-border-accent)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Gaming декоративные элементы */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '100px',
        height: '100px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      
      <Stack spacing="lg">
        {/* Верхняя секция с аватаром и основной информацией */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{ position: 'relative' }}>
            <Avatar 
              src={user.avatar} 
              alt={`${user.firstName} ${user.lastName}`}
              size={72}
              style={{ 
                border: '3px solid var(--color-accent-yellow)',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
              }}
            />
            {/* Level badge */}
            <div style={{
              position: 'absolute',
              bottom: '-8px',
              right: '-8px',
              background: 'linear-gradient(135deg, var(--color-accent-yellow) 0%, var(--color-accent-orange) 100%)',
              color: 'var(--color-surface-primary)',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 'bold',
              border: '2px solid var(--color-surface-primary)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}>
              {user.level}
            </div>
          </div>
          
          <Stack spacing="xs" style={{ flex: 1 }}>
            <Heading level={2} style={{ 
              color: 'white', 
              margin: 0,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}>
              {user.firstName} {user.lastName}
            </Heading>
            <Text style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '14px',
              fontWeight: 500
            }}>
              @{user.username}
            </Text>
            <Badge variant="warning" style={{
              background: 'rgba(255, 215, 0, 0.2)',
              color: 'var(--color-accent-yellow)',
              border: '1px solid var(--color-accent-yellow)',
              alignSelf: 'flex-start'
            }}>
              {user.rank}
            </Badge>
          </Stack>
        </div>

        {/* Нижняя секция со статистикой */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 'var(--space-3)',
          background: 'rgba(255,255,255,0.1)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-lg)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Text style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: 'bold',
              display: 'block'
            }}>
              {stats.rank}
            </Text>
            <Text style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '12px'
            }}>
              Рейтинг
            </Text>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Text style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: 'bold',
              display: 'block'
            }}>
              {user.streak}
            </Text>
            <Text style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '12px'
            }}>
              Дней подряд
            </Text>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <Text style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontWeight: 'bold',
              display: 'block'
            }}>
              {stats.battlesWon}
            </Text>
            <Text style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: '12px'
            }}>
              Побед
            </Text>
          </div>
        </div>
      </Stack>
    </Card>
  )
}