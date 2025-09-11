import React, { useState } from 'react'
import { Card } from './Card'; import { Button } from './Button'; import { CodeBlock } from './CodeBlock'
export const WorkedExampleStepper: React.FC<{ title:string; steps:{id:string; code:string; explanation:string}[] }> = ({ title, steps }) => {
  const [i, setI] = useState(0)
  const s = steps[i]
  return <Card title={title}>
    <CodeBlock code={s.code} />
    <p>{s.explanation}</p>
    <div style={{ display:'flex', gap:8 }}>
      <Button onClick={()=>setI(Math.max(0,i-1))} disabled={i===0}>Назад</Button>
      <Button onClick={()=>setI(Math.min(steps.length-1,i+1))} disabled={i===steps.length-1}>Далее</Button>
    </div>
  </Card>
}