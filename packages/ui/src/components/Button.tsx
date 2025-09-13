import React from 'react'

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'danger' }> = ({ variant = 'primary', ...props }) => {
  const bg = variant === 'primary' ? 'var(--color-primary)' : variant === 'danger' ? '#dc2626' : '#64748b'
  
  return (
    <button 
      {...props} 
      style={{
        background: bg, 
        color: '#fff', 
        padding: '10px 14px', 
        borderRadius: '12px', 
        border: 'none', 
        boxShadow: 'var(--shadow)', 
        cursor: 'pointer'
      }}
    />
  )
}