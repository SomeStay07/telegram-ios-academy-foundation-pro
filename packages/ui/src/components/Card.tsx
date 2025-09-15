import React from 'react'
export const Card: React.FC<React.PropsWithChildren<{title?:string}>> = ({ title, children }) => (
  <section style={{ background:'var(--color-bg)', color:'var(--color-fg)', border:'var(--ds-borderWidth-1) solid var(--color-muted)', borderRadius:'var(--ds-radius-lg)', padding:'var(--ds-spacing-4)', boxShadow:'var(--shadow)'}}>
    {title && <h2 style={{marginTop:0}}>{title}</h2>}
    {children}
  </section>
)