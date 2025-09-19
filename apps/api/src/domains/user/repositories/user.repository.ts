import { Injectable } from '@nestjs/common';
import { EventSourcedRepository } from '../../../shared/domain/repository';
import { User, UserProfile } from '../entities/user.entity';
import { EventStore } from '../../../shared/infrastructure/event-store';
import { EventBus } from '../../../shared/application/event-bus';
import { UserRegistered } from '../events/user-registered.event';
import { ProfileUpdated } from '../events/profile-updated.event';

@Injectable()
export class UserRepository implements EventSourcedRepository<User> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus
  ) {}

  async getById(id: string): Promise<User | null> {
    return this.getByIdFromEvents(id);
  }

  async getByIdFromEvents(id: string): Promise<User | null> {
    try {
      const events = await this.eventStore.getEvents(id);
      
      if (events.length === 0) {
        return null;
      }

      // Rebuild user aggregate from events
      let profile: UserProfile | null = null;
      let lastActiveAt = new Date();
      let streakCount = 0;
      let version = 0;

      for (const event of events) {
        version = Math.max(version, event.eventVersion);
        
        switch (event.eventType) {
          case 'UserRegistered':
            const userRegisteredEvent = event as UserRegistered;
            profile = userRegisteredEvent.profile;
            lastActiveAt = event.occurredOn;
            streakCount = 0;
            break;
            
          case 'ProfileUpdated':
            const profileUpdatedEvent = event as ProfileUpdated;
            profile = profileUpdatedEvent.newProfile;
            break;
            
          case 'UserActivityRecorded':
            lastActiveAt = event.occurredOn;
            // Calculate streak based on activity pattern
            streakCount = this.calculateStreakFromEvents(events, event.occurredOn);
            break;
        }
      }

      if (!profile) {
        return null;
      }

      return User.fromHistory(id, profile, lastActiveAt, streakCount, version);
    } catch (error) {
      console.error(`Error retrieving user ${id}:`, error);
      return null;
    }
  }

  async save(aggregate: User): Promise<void> {
    await this.saveEvents(aggregate);
  }

  async saveEvents(aggregate: User): Promise<void> {
    const events = aggregate.domainEvents;
    
    if (events.length === 0) {
      return;
    }

    try {
      // Save events to event store
      await this.eventStore.append(
        aggregate.id,
        events,
        aggregate.version - events.length
      );

      // Publish events to event bus
      await this.eventBus.publish(events);

      // Mark events as committed
      aggregate.markEventsAsCommitted();
    } catch (error) {
      console.error(`Error saving user ${aggregate.id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    // In event sourcing, we typically don't delete aggregates
    throw new Error('User deletion not supported in event-sourced repository');
  }

  private calculateStreakFromEvents(events: any[], currentDate: Date): number {
    // Simple streak calculation - in production this would be more sophisticated
    const activityEvents = events.filter(e => e.eventType === 'UserActivityRecorded');
    
    if (activityEvents.length === 0) return 1;

    // Count consecutive days with activity
    let streak = 1;
    const today = new Date(currentDate);
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i < activityEvents.length; i++) {
      const prevActivity = new Date(activityEvents[i - 1].occurredOn);
      const currentActivity = new Date(activityEvents[i].occurredOn);
      
      prevActivity.setHours(0, 0, 0, 0);
      currentActivity.setHours(0, 0, 0, 0);

      const diffDays = Math.floor((currentActivity.getTime() - prevActivity.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else if (diffDays > 1) {
        streak = 1; // Reset streak
      }
    }

    return streak;
  }
}