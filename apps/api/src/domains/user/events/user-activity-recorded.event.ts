import { DomainEvent } from '../../../shared/domain/domain-event';

export class UserActivityRecorded extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly userId: string,
    public readonly activityType: string,
    public readonly recordedAt: Date,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'UserActivityRecorded';
  }
}