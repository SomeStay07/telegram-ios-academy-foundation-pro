import { z } from 'zod'
export const Course = z.object({
  meta: z.object({ id: z.string(), title: z.string(), description: z.string().default(''), level: z.enum(['beginner','intermediate','advanced']), tags: z.array(z.string()).default([]) }),
  lessons: z.array(z.object({ id: z.string(), order: z.number().int().nonnegative() })).default([]),
  gatePolicy: z.object({ gatesNextLesson: z.boolean().default(true), minCheckpointScore: z.number().min(0.5).max(1).default(0.8) })
})
export type Course = z.infer<typeof Course>

export function parseCourseStrict(data: unknown): Course {
  return Course.parse(data)
}