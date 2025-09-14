import React from 'react'
export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary'|'secondary'|'danger' }> =
({ variant='primary', ...props }) => {
  const bg = variant==='primary'?'var(--color-primary)': variant==='danger'?'var(--ds-color-palette-red-600)':'var(--ds-color-palette-grey-500)'
  return <button {...props} style={{
    background:bg, color:'var(--ds-color-palette-grey-50)', padding:'var(--ds-spacing-2) var(--ds-spacing-3)', borderRadius:'var(--ds-spacing-3)', border:'none', boxShadow:'var(--shadow)', cursor:'pointer'
  }}/>
}