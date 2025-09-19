import { DomainEvent } from '../../../shared/domain/domain-event';
import { Lesson } from '../entities/course.entity';

export class LessonAdded extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly lesson: Lesson,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'LessonAdded';
  }
}