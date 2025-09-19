import { Injectable } from '@nestjs/common';
import { EventSourcedRepository } from '../../../shared/domain/repository';
import { Course, CourseMetadata, Lesson } from '../entities/course.entity';
import { EventStore } from '../../../shared/infrastructure/event-store';
import { EventBus } from '../../../shared/application/event-bus';
import { CourseCreated } from '../events/course-created.event';
import { LessonAdded } from '../events/lesson-added.event';
import { CourseUnlocked } from '../events/course-unlocked.event';

@Injectable()
export class CourseRepository implements EventSourcedRepository<Course> {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus
  ) {}

  async getById(id: string): Promise<Course | null> {
    return this.getByIdFromEvents(id);
  }

  async getByIdFromEvents(id: string): Promise<Course | null> {
    try {
      const events = await this.eventStore.getEvents(id);
      
      if (events.length === 0) {
        return null;
      }

      // Rebuild course aggregate from events
      let metadata: CourseMetadata | null = null;
      const lessons = new Map<string, Lesson>();
      const unlockedForUsers = new Set<string>();
      let version = 0;

      for (const event of events) {
        version = Math.max(version, event.eventVersion);
        
        switch (event.eventType) {
          case 'CourseCreated':
            const courseCreatedEvent = event as CourseCreated;
            metadata = courseCreatedEvent.metadata;
            break;
            
          case 'LessonAdded':
            const lessonAddedEvent = event as LessonAdded;
            lessons.set(lessonAddedEvent.lesson.id, lessonAddedEvent.lesson);
            break;
            
          case 'CourseUnlocked':
            const courseUnlockedEvent = event as CourseUnlocked;
            unlockedForUsers.add(courseUnlockedEvent.userId);
            break;
        }
      }

      if (!metadata) {
        return null;
      }

      return Course.fromHistory(id, metadata, lessons, unlockedForUsers, version);
    } catch (error) {
      console.error(`Error retrieving course ${id}:`, error);
      return null;
    }
  }

  async save(aggregate: Course): Promise<void> {
    await this.saveEvents(aggregate);
  }

  async saveEvents(aggregate: Course): Promise<void> {
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
      console.error(`Error saving course ${aggregate.id}:`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    throw new Error('Course deletion not supported in event-sourced repository');
  }
}