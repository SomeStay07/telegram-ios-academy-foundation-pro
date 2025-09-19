import React from 'react'
import { Stack, Card, Text, Heading, StatCard } from '@telegram-ios-academy/ui'

interface Stats {
  challengesCompleted: number
  interviewsPassed: number
  streakDays: number
  codingHours: number
  rank: string
  battlesWon: number
}

interface StatsOverviewProps {
  stats: Stats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statItems = [
    {
      id: 1,
      title: 'Челленджи',
      value: stats.challengesCompleted,
      icon: '🎯',
      change: '+12',
      changeType: 'positive' as const,
      color: 'var(--color-accent-blue)'
    },
    {
      id: 2,
      title: 'Интервью',
      value: stats.interviewsPassed,
      icon: '💼',
      change: '+2',
      changeType: 'positive' as const,
      color: 'var(--color-accent-purple)'
    },
    {
      id: 3,
      title: 'Streak',
      value: stats.streakDays,
      icon: '🔥',
      change: 'активен',
      changeType: 'neutral' as const,
      color: 'var(--color-accent-orange)'
    },
    {
      id: 4,
      title: 'Часы кода',
      value: stats.codingHours,
      icon: '⏱️',
      change: '+8ч',
      changeType: 'positive' as const,
      color: 'var(--color-success)'
    },
    {
      id: 5,
      title: 'Победы',
      value: stats.battlesWon,
      icon: '⚔️',
      change: '+3',
      changeType: 'positive' as const,
      color: 'var(--color-accent-yellow)'
    }
  ]

  return (
    <Card style={{ 
      background: 'var(--color-surface-secondary)',
      border: '1px solid var(--color-border-secondary)'
    }}>
      <Stack spacing="lg">
        {/* Заголовок секции */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Heading level={3} style={{ color: 'var(--color-text-primary)', margin: 0 }}>
              📊 Статистика
            </Heading>
            <Text style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Твой прогресс за последние 30 дней
            </Text>
          </div>
          
          {/* Общий рейтинг */}
          <div style={{
            background: 'linear-gradient(135deg, var(--color-accent-yellow) 0%, var(--color-accent-orange) 100%)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-lg)',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}>
            🏆 {stats.rank}
          </div>
        </div>

        {/* Основная сетка статистики */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 'var(--space-3)'
        }}>
          {statItems.map((stat) => (
            <div
              key={stat.id}
              style={{
                background: 'var(--color-surface-weak)',
                border: '1px solid var(--color-border-weak)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3)',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
                e.currentTarget.style.borderColor = stat.color
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--color-border-weak)'
              }}
            >
              {/* Декоративная линия сверху */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: stat.color,
                borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
              }} />

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <span style={{ fontSize: '20px' }}>{stat.icon}</span>
                  <Text style={{ 
                    color: 'var(--color-text-secondary)', 
                    fontSize: '14px',
                    fontWeight: 500
                  }}>
                    {stat.title}
                  </Text>
                </div>
                
                {/* Change indicator */}
                <div style={{
                  background: stat.changeType === 'positive' 
                    ? 'rgba(34, 197, 94, 0.1)' 
                    : stat.changeType === 'negative' 
                    ? 'rgba(239, 68, 68, 0.1)'
                    : 'rgba(107, 114, 128, 0.1)',
                  color: stat.changeType === 'positive' 
                    ? 'var(--color-success)' 
                    : stat.changeType === 'negative' 
                    ? 'var(--color-error)'
                    : 'var(--color-text-secondary)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold'
                }}>
                  {stat.change}
                </div>
              </div>

              <Text style={{ 
                color: 'var(--color-text-primary)', 
                fontSize: '24px', 
                fontWeight: 'bold',
                display: 'block'
              }}>
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </Text>
            </div>
          ))}
        </div>

        {/* Дополнительные инсайты */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-surface-accent) 0%, var(--color-surface-strong) 100%)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border-accent)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--space-3)' }}>
            <div style={{ textAlign: 'center' }}>
              <Text style={{ 
                color: 'var(--color-text-accent)', 
                fontSize: '16px', 
                fontWeight: 'bold',
                display: 'block'
              }}>
                85%
              </Text>
              <Text style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '12px'
              }}>
                Точность решений
              </Text>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Text style={{ 
                color: 'var(--color-text-accent)', 
                fontSize: '16px', 
                fontWeight: 'bold',
                display: 'block'
              }}>
                4.8
              </Text>
              <Text style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '12px'
              }}>
                Средняя оценка
              </Text>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <Text style={{ 
                color: 'var(--color-text-accent)', 
                fontSize: '16px', 
                fontWeight: 'bold',
                display: 'block'
              }}>
                12
              </Text>
              <Text style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '12px'
              }}>
                Дней подряд
              </Text>
            </div>
          </div>
        </div>
      </Stack>
    </Card>
  )
}