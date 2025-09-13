import React from 'react'
import { useTranslation } from '../i18n/lazy'

export const HomePage = () => {
  const { t } = useTranslation()
  
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <h1 style={{ marginBottom: '30px' }}>Telegram iOS Academy</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px', margin: '0 auto' }}>
        <a 
          href="/course/ios-fundamentals" 
          style={{ 
            padding: '16px', 
            background: 'var(--color-primary)', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '12px',
            fontWeight: 'bold'
          }}
        >
          📱 iOS Fundamentals Course
        </a>
        
        <a 
          href="/lesson" 
          style={{ 
            padding: '16px', 
            background: '#f0f0f0', 
            color: '#333', 
            textDecoration: 'none', 
            borderRadius: '12px',
            fontWeight: 'bold'
          }}
        >
          📚 Single Lesson Demo
        </a>
        
        <a 
          href="/interview/swift-fundamentals/drill" 
          style={{ 
            padding: '16px', 
            background: '#e3f2fd', 
            color: '#1976d2', 
            textDecoration: 'none', 
            borderRadius: '12px',
            fontWeight: 'bold'
          }}
        >
          ⚡ Interview: Drill Mode
        </a>
        
        <a 
          href="/interview/swift-fundamentals/explain" 
          style={{ 
            padding: '16px', 
            background: '#f3e5f5', 
            color: '#7b1fa2', 
            textDecoration: 'none', 
            borderRadius: '12px',
            fontWeight: 'bold'
          }}
        >
          🎓 Interview: Explain Mode
        </a>
        
        <a 
          href="/interview/swift-fundamentals/mock" 
          style={{ 
            padding: '16px', 
            background: '#fff3e0', 
            color: '#f57c00', 
            textDecoration: 'none', 
            borderRadius: '12px',
            fontWeight: 'bold'
          }}
        >
          ⏱️ Interview: Mock Mode
        </a>
      </div>
    </div>
  )
}