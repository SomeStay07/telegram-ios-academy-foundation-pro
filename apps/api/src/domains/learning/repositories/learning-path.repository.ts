import { Injectable } from '@nestjs/common';
import { EventSourcedRepository } from '../../../shared/domain/repository';
import { LearningPath, LessonProgress } from '../entities/learning-path.entity';
import { EventStore } from '../../../shared/infrastructure/event-store';
import { EventBus } from '../../../shared/application/event-bus';

@Injectable()
export class LearningPathRepository implements EventSourcedRepository<LearningPath> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus
  ) {}

  async getById(id: string): Promise<LearningPath | null> {
    return this.getByIdFromEvents(id);
  }

  async getByIdFromEvents(id: string): Promise<LearningPath | null> {
    try {
      const events = await this.eventStore.getEvents(id);
      
      if (events.length === 0) {
        return null;
      }

      // Rebuild aggregate from events
      let userId = '';
      let courseId = '';
      const progress = new Map<string, LessonProgress>();
      let version = 0;

      for (const event of events) {
        version = Math.max(version, event.eventVersion);
        
        switch (event.eventType) {
          case 'LearningPathCreated':
            // Handle learning path creation event
            // userId = event.userId;
            // courseId = event.courseId;
            break;
          case 'LessonStarted':
            // Handle lesson started event
            break;
          case 'LessonCompleted':
            // Handle lesson completed event
            break;
          case 'ProgressUpdated':
            // Handle progress updated event
            break;
        }
      }

      return LearningPath.fromHistory(id, userId, courseId, progress, version);
    } catch (error) {
      console.error(`Error retrieving learning path ${id}:`, error);
      return null;
    }
  }

  async save(aggregate: LearningPath): Promise<void> {
    await this.saveEvents(aggregate);
  }

  async saveEvents(aggregate: LearningPath): Promise<void> {
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
      console.error(`Error saving learning path ${aggregate.id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    // In event sourcing, we typically don't delete aggregates
    // Instead, we might add a "deleted" event
    throw new Error('Deletion not supported in event-sourced repository');
  }
}