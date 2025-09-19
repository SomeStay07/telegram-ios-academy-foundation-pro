import { DomainEvent } from '../../../shared/domain/domain-event';

export class LessonStarted extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly lessonId: string,
    public readonly startedAt: Date,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'LessonStarted';
  }
}