import { DomainEvent } from '../../../shared/domain/domain-event';

export class ProgressUpdated extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly courseId: string,
    public readonly overallProgress: number,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'ProgressUpdated';
  }
}