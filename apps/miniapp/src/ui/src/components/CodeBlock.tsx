import React from 'react'
export const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code }) => (
  <pre style={{ background:'#0b1020', color:'#d1e7ff', padding:'12px', borderRadius:'12px', overflow:'auto' }}>
    <code>{code}</code>
  </pre>
)