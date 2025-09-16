import React from 'react'
import { Stack, Card, Text, Heading, ProgressRing } from '@telegram-ios-academy/ui'

interface XPSystemProps {
  level: number
  currentXP: number
  nextLevelXP: number
  totalXP: number
}

export function XPSystem({ level, currentXP, nextLevelXP, totalXP }: XPSystemProps) {
  const progressPercentage = (currentXP / nextLevelXP) * 100
  const xpToNext = nextLevelXP - currentXP

  return (
    <Card style={{ 
      background: 'linear-gradient(135deg, var(--color-surface-accent) 0%, var(--color-surface-strong) 100%)',
      border: '1px solid var(--color-border-accent)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Gaming декоративные элементы */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '-30px',
        width: '120px',
        height: '120px',
        background: 'conic-gradient(from 0deg, transparent, var(--color-accent-purple), transparent)',
        borderRadius: '50%',
        opacity: 0.1,
        animation: 'rotate 20s linear infinite'
      }} />
      
      <Stack spacing="lg">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Heading level={3} style={{ color: 'var(--color-text-accent)', margin: 0 }}>
              ⚡ XP Система
            </Heading>
            <Text style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
              Уровень {level} • {totalXP.toLocaleString()} общего XP
            </Text>
          </div>
          
          {/* Circular progress для уровня */}
          <div style={{ position: 'relative' }}>
            <ProgressRing 
              progress={progressPercentage} 
              size={80}
              strokeWidth={6}
              color="var(--color-accent-purple)"
              style={{ 
                filter: 'drop-shadow(0 0 10px rgba(139, 69, 195, 0.3))'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <Text style={{ 
                color: 'var(--color-text-accent)', 
                fontSize: '18px', 
                fontWeight: 'bold',
                display: 'block'
              }}>
                {level}
              </Text>
              <Text style={{ 
                color: 'var(--color-text-secondary)', 
                fontSize: '10px'
              }}>
                LVL
              </Text>
            </div>
          </div>
        </div>

        {/* XP прогресс бар */}
        <div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--space-2)'
          }}>
            <Text style={{ 
              color: 'var(--color-text-primary)', 
              fontSize: '14px',
              fontWeight: 600
            }}>
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </Text>
            <Text style={{ 
              color: 'var(--color-accent-purple)', 
              fontSize: '12px',
              fontWeight: 500
            }}>
              {xpToNext.toLocaleString()} до следующего уровня
            </Text>
          </div>
          
          {/* Кастомный прогресс бар с gaming эффектами */}
          <div style={{
            width: '100%',
            height: '12px',
            background: 'var(--color-surface-weak)',
            borderRadius: '6px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid var(--color-border-weak)'
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--color-accent-purple) 0%, var(--color-accent-blue) 100%)',
              borderRadius: '6px',
              position: 'relative',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 10px rgba(139, 69, 195, 0.4)'
            }}>
              {/* Animated shine effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                animation: 'shine 2s infinite'
              }} />
            </div>
          </div>
        </div>

        {/* XP источники */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: 'var(--space-2)'
        }}>
          <div style={{
            background: 'rgba(139, 69, 195, 0.1)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(139, 69, 195, 0.2)',
            textAlign: 'center'
          }}>
            <Text style={{ 
              color: 'var(--color-accent-purple)', 
              fontSize: '16px', 
              fontWeight: 'bold',
              display: 'block'
            }}>
              +50
            </Text>
            <Text style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '11px'
            }}>
              За челлендж
            </Text>
          </div>
          
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            textAlign: 'center'
          }}>
            <Text style={{ 
              color: 'var(--color-success)', 
              fontSize: '16px', 
              fontWeight: 'bold',
              display: 'block'
            }}>
              +100
            </Text>
            <Text style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '11px'
            }}>
              За победу в батле
            </Text>
          </div>
          
          <div style={{
            background: 'rgba(245, 158, 11, 0.1)',
            padding: 'var(--space-2)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            textAlign: 'center'
          }}>
            <Text style={{ 
              color: 'var(--color-accent-yellow)', 
              fontSize: '16px', 
              fontWeight: 'bold',
              display: 'block'
            }}>
              +25
            </Text>
            <Text style={{ 
              color: 'var(--color-text-secondary)', 
              fontSize: '11px'
            }}>
              Ежедневный бонус
            </Text>
          </div>
        </div>
      </Stack>

      <style jsx>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </Card>
  )
}