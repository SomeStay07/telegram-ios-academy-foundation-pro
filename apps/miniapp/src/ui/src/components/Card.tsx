import React from 'react'
export const Card: React.FC<React.PropsWithChildren<{title?:string}>> = ({ title, children }) => (
  <section style={{ background:'var(--color-bg)', color:'var(--color-fg)', border:'1px solid var(--color-muted)', borderRadius:'16px', padding:'16px', boxShadow:'var(--shadow)'}}>
    {title && <h2 style={{marginTop:0}}>{title}</h2>}
    {children}
  </section>
)