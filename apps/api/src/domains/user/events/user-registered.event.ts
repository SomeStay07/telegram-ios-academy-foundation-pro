import { DomainEvent } from '../../../shared/domain/domain-event';
import { UserProfile } from '../entities/user.entity';

export class UserRegistered extends DomainEvent {
  constructor(
    aggregateId: string,
    public readonly telegramId: number,
    public readonly profile: UserProfile,
    eventVersion: number
  ) {
    super(aggregateId, eventVersion);
  }

  get eventType(): string {
    return 'UserRegistered';
  }
}