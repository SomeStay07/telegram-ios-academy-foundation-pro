import { z } from 'zod'
import { Lesson } from './schema'

export function parseLessonStrict(raw: unknown) {
  const parsed = Lesson.parse(raw)
  const ids = new Set<string>()
  for (const m of parsed.modules) {
    if (ids.has((m as any).id)) throw new Error(`Duplicate module id: ${(m as any).id}`)
    ids.add((m as any).id)
  }
  if (parsed.assessment.checkpoint) {
    for (const q of parsed.assessment.checkpoint.quizIds) {
      if (!parsed.modules.find(m => (m as any).id === q)) throw new Error(`Checkpoint references missing quizId ${q}`)
    }
  }
  // fading: steps explanations length descending
  for (const m of parsed.modules) {
    if (m.kind === 'workedExample') {
      const lens = m.steps.map(s => s.explanation.length)
      for (let i=1;i<lens.length;i++){
        if (lens[i] > lens[i-1]) throw new Error('WorkedExample fading rule violated: later step has longer explanation')
      }
    }
  }
  return parsed
}