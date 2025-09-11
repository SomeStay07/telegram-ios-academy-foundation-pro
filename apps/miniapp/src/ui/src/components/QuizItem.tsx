import React, { useState } from 'react'
import { Card } from './Card'
import { Button } from './Button'
export const QuizItem: React.FC<{ question:string; options:string[]; correctIndex:number; explanation?:string; onAnswer?:(ok:boolean)=>void }> =
({ question, options, correctIndex, explanation, onAnswer }) => {
  const [picked, setPicked] = useState<number|null>(null)
  const correct = picked!==null && picked===correctIndex
  return <Card title={question}>
    <div style={{ display:'grid', gap:8 }}>
      {options.map((opt, i) => (
        <Button key={i} onClick={()=>{ setPicked(i); onAnswer?.(i===correctIndex) }} aria-pressed={picked===i}>{opt}</Button>
      ))}
      {picked!==null && <div role="status">{correct? 'Верно ✅' : 'Неверно ❌'} {explanation && <div>{explanation}</div>}</div>}
    </div>
  </Card>
}