import React from 'react'
import { LazyCodeBlock } from '../../../components/LazyCodeBlock'
import { Card } from '../components/Card'
import { QuizItem } from '../components/QuizItem'
import { WorkedExampleStepper } from '../components/WorkedExampleStepper'

type Module =
  | { kind:'hook'; id:string; title:string; body:string }
  | { kind:'concept'; id:string; title:string; explanation:string; references?:string[] }
  | { kind:'analogy'; id:string; conceptId:string; text:string }
  | { kind:'callout'; id:string; tone?:'info'|'success'|'warning'|'danger'; text:string }
  | { kind:'workedExample'; id:string; title:string; outcomeId:string; steps:{id:string; code:string; explanation:string}[] }
  | { kind:'snippet'; id:string; title:string; code:string; language?:string }
  | { kind:'media'; id:string; mediaType:'image'|'video'|'diagram'; url:string; caption?:string }
  | { kind:'quiz'; id:string; question:string; options:string[]; correctAnswer:number; explanation?:string; difficulty?:'easy'|'medium'|'hard' }

export const ModuleRenderer: React.FC<{ module: Module; onQuizAnswer?:(id:string, ok:boolean)=>void }> = ({ module, onQuizAnswer }) => {
  switch (module.kind) {
    case 'hook': return <Card title={module.title}><p>{module.body}</p></Card>
    case 'concept': return <Card title={module.title}><p>{module.explanation}</p></Card>
    case 'analogy': return <Card title='Аналогия'><p>{module.text}</p></Card>
    case 'callout': return <Card title='Важно'><p>{module.text}</p></Card>
    case 'workedExample': return <WorkedExampleStepper title={module.title} steps={module.steps} />
    case 'snippet': return <Card title={module.title}><LazyCodeBlock code={module.code} language={module.language ?? 'swift'} /></Card>
    case 'media': return <Card title={module.caption || module.mediaType}>
      {module.mediaType==='image' ? <img src={module.url} alt={module.caption||'image'} style={{maxWidth:'100%',borderRadius:12}}/> : <a href={module.url} target='_blank' rel='noreferrer'>Открыть медиа</a>}
    </Card>
    case 'quiz': return <QuizItem question={module.question} options={module.options} correctIndex={module.correctAnswer} explanation={module.explanation} onAnswer={(ok)=>onQuizAnswer?.(module.id, ok)} />
  }
}