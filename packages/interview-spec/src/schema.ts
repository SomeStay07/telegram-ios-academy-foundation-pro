import { z } from 'zod'
export const InterviewQuestion = z.object({
  id: z.string(),
  category: z.enum(['swift','ios-sdk','memory','patterns','best-practices','concurrency','architecture']),
  difficulty: z.enum(['beginner','intermediate','advanced']),
  prompt: z.string(),
  modelAnswer: z.string(),
  pitfalls: z.array(z.string()).default([]),
  codeSample: z.string().default(''),
  tags: z.array(z.string()).default([]),
  references: z.array(z.string()).default([])
})
export const InterviewSet = z.object({ id: z.string(), title: z.string(), questions: z.array(InterviewQuestion).min(1) })
export type InterviewSet = z.infer<typeof InterviewSet>

export function parseInterviewStrict(data: unknown): InterviewSet {
  return InterviewSet.parse(data)
}