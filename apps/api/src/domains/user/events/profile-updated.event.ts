import { DomainEvent } from '../../../shared/domain/domain-event';
import { UserProfile } from '../entities/user.entity';

export class ProfileUpdated extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly previousProfile: UserProfile,
    public readonly newProfile: UserProfile,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'ProfileUpdated';
  }
}