import React from 'react'
import { Stack, Card, Text, Heading, AchievementBadge } from '@telegram-ios-academy/ui'

interface Achievement {
  id: number
  title: string
  description: string
  icon: string
  unlocked: boolean
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

interface AchievementGridProps {
  achievements: Achievement[]
}

const rarityStyles = {
  common: {
    background: 'linear-gradient(135deg, #6b7280 0%, #9ca3af 100%)',
    border: '1px solid #6b7280',
    glow: 'rgba(107, 114, 128, 0.3)'
  },
  rare: {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    border: '1px solid #059669',
    glow: 'rgba(5, 150, 105, 0.3)'
  },
  epic: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    border: '1px solid #7c3aed',
    glow: 'rgba(124, 58, 237, 0.3)'
  },
  legendary: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    border: '1px solid #f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)'
  }
}

export function AchievementGrid({ achievements }: AchievementGridProps) {
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

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
              🏆 Достижения
            </Heading>
            <Text style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              {unlockedCount} из {totalCount} получено
            </Text>
          </div>
          
          {/* Прогресс достижений */}
          <div style={{
            background: 'var(--color-surface-weak)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border-weak)'
          }}>
            <Text style={{ 
              color: 'var(--color-text-accent)', 
              fontSize: '14px', 
              fontWeight: 'bold'
            }}>
              {Math.round((unlockedCount / totalCount) * 100)}%
            </Text>
          </div>
        </div>

        {/* Сетка достижений */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: 'var(--space-3)'
        }}>
          {achievements.map((achievement) => {
            const rarity = rarityStyles[achievement.rarity]
            const isUnlocked = achievement.unlocked

            return (
              <div
                key={achievement.id}
                style={{
                  background: isUnlocked 
                    ? rarity.background 
                    : 'var(--color-surface-weak)',
                  border: isUnlocked 
                    ? rarity.border 
                    : '1px solid var(--color-border-weak)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-3)',
                  position: 'relative',
                  opacity: isUnlocked ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: isUnlocked 
                    ? `0 4px 20px ${rarity.glow}` 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (isUnlocked) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 8px 30px ${rarity.glow}`
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = isUnlocked 
                    ? `0 4px 20px ${rarity.glow}` 
                    : 'none'
                }}
              >
                {/* Rarity indicator */}
                <div style={{
                  position: 'absolute',
                  top: 'var(--space-2)',
                  right: 'var(--space-2)',
                  background: isUnlocked ? 'rgba(255,255,255,0.2)' : 'var(--color-surface-strong)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: isUnlocked ? 'white' : 'var(--color-text-secondary)'
                }}>
                  {achievement.rarity}
                </div>

                {/* Sparkle effect for unlocked legendary achievements */}
                {isUnlocked && achievement.rarity === 'legendary' && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    width: '6px',
                    height: '6px',
                    background: 'white',
                    borderRadius: '50%',
                    animation: 'sparkle 2s infinite'
                  }} />
                )}

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                  {/* Achievement icon */}
                  <div style={{
                    fontSize: '32px',
                    background: isUnlocked 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'var(--color-surface-strong)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    position: 'relative'
                  }}>
                    {achievement.icon}
                    {!isUnlocked && (
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                      }}>
                        🔒
                      </div>
                    )}
                  </div>

                  {/* Achievement info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text style={{ 
                      color: isUnlocked ? 'white' : 'var(--color-text-primary)', 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      display: 'block',
                      marginBottom: 'var(--space-1)'
                    }}>
                      {achievement.title}
                    </Text>
                    <Text style={{ 
                      color: isUnlocked ? 'rgba(255,255,255,0.8)' : 'var(--color-text-secondary)', 
                      fontSize: '14px',
                      lineHeight: '1.4'
                    }}>
                      {achievement.description}
                    </Text>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Призыв к действию для заблокированных достижений */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-accent-purple) 0%, var(--color-accent-blue) 100%)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center'
        }}>
          <Text style={{ 
            color: 'white', 
            fontSize: '14px', 
            fontWeight: 500
          }}>
            ⭐ Продолжай учиться и получай новые достижения!
          </Text>
        </div>
      </Stack>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </Card>
  )
}