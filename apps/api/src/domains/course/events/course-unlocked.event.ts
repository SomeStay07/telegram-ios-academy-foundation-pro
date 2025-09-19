import { DomainEvent } from '../../../shared/domain/domain-event';

export class CourseUnlocked extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly unlockedAt: Date,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'CourseUnlocked';
  }
}