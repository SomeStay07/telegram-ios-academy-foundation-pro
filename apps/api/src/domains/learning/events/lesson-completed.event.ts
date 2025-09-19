import { DomainEvent } from '../../../shared/domain/domain-event';

export class LessonCompleted extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly lessonId: string,
    public readonly score: number,
    public readonly timeSpentSeconds: number,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'LessonCompleted';
  }
}