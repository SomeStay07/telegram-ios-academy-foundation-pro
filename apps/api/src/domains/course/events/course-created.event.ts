import { DomainEvent } from '../../../shared/domain/domain-event';
import { CourseMetadata } from '../entities/course.entity';

export class CourseCreated extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly metadata: CourseMetadata,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'CourseCreated';
  }
}