// Analytics types
export type AnalyticsEvent = 
  | 'interview_started'
  | 'answer_submitted'
  | 'interview_completed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'quiz_submitted'
  | 'checkpoint_passed'

export type AnalyticsProps = Record<string, string | number | boolean>

export interface AnalyticsTracker {
  init(): Promise<void>
  track(event: AnalyticsEvent, props?: AnalyticsProps): void
}