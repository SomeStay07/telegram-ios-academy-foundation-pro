import { z } from 'zod'
export const Outcome = z.object({
  id: z.string(),
  text: z.string(),
  bloom: z.enum(['remember','understand','apply','analyze','evaluate','create']),
  verifiedBy: z.array(z.object({ kind: z.enum(['quiz','workedExample','checkpoint']), refId: z.string() })).default([])
})
export const ModuleHook = z.object({ kind: z.literal('hook'), id: z.string(), title: z.string(), body: z.string() })
export const ModuleConcept = z.object({ kind: z.literal('concept'), id: z.string(), title: z.string(), explanation: z.string(), references: z.array(z.string()).optional() })
export const ModuleAnalogy = z.object({ kind: z.literal('analogy'), id: z.string(), conceptId: z.string(), text: z.string() })
export const ModuleCallout = z.object({ kind: z.literal('callout'), id: z.string(), tone: z.enum(['info','success','warning','danger']).default('info'), text: z.string() })
export const ModuleWorked = z.object({ kind: z.literal('workedExample'), id: z.string(), title: z.string(), outcomeId: z.string(), steps: z.array(z.object({ id:z.string(), code:z.string(), explanation:z.string() })).min(1) })
export const ModuleSnippet = z.object({ kind: z.literal('snippet'), id: z.string(), title: z.string(), code: z.string(), language: z.string().default('swift') })
export const ModuleMedia = z.object({ kind: z.literal('media'), id: z.string(), mediaType: z.enum(['image','video','diagram']), url: z.string(), caption: z.string().optional() })
export const ModuleQuiz = z.object({
  kind: z.literal('quiz'), id: z.string(), question: z.string(),
  options: z.array(z.string()).min(2), correctAnswer: z.number().int().nonnegative(), explanation: z.string().default(''), difficulty: z.enum(['easy','medium','hard']).default('easy')
})
export const ContentModule = z.discriminatedUnion('kind', [ModuleHook, ModuleConcept, ModuleAnalogy, ModuleCallout, ModuleWorked, ModuleSnippet, ModuleMedia, ModuleQuiz])

export const LessonMeta = z.object({
  id: z.string(), title: z.string(), description: z.string().default(''), duration: z.number().int().positive(),
  level: z.enum(['beginner','intermediate','advanced']), order: z.number().int().nonnegative(), tags: z.array(z.string()).optional()
})
export const Assessment = z.object({ formativeQuizIds: z.array(z.string()).default([]), checkpoint: z.object({ id:z.string(), quizIds: z.array(z.string()).min(1), passThreshold: z.number().min(0.5).max(1) }).optional() })
export const SpacedReview = z.object({ schedule: z.array(z.enum(['D1','D7','D30'])).default(['D1','D7','D30']) })
export const Lesson = z.object({ meta: LessonMeta, outcomes: z.array(Outcome).min(1), modules: z.array(ContentModule).min(1), assessment: Assessment, spacedReview: SpacedReview })
export type Lesson = z.infer<typeof Lesson>