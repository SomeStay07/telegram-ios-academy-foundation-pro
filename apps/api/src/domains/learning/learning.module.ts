import { Module } from '@nestjs/common';
import { LessonController } from './controllers/lesson.controller';
import { LearningPathRepository } from './repositories/learning-path.repository';
import { CompleteLessonHandler } from './handlers/complete-lesson.handler';
import { UpdateProgressHandler } from './handlers/update-progress.handler';
import { LessonCompletedHandler } from './handlers/lesson-completed.handler';
import { EventBus } from '../../shared/application/event-bus';
import { CommandBus } from '../../shared/application/command-bus';

@Module({
  controllers: [
    LessonController,
  ],
  providers: [
    // Repositories
    LearningPathRepository,
    
    // Command Handlers
    CompleteLessonHandler,
    UpdateProgressHandler,
    
    // Event Handlers
    LessonCompletedHandler,
  ],
  exports: [
    LearningPathRepository,
  ],
})
export class LearningModule {
  constructor(
    private readonly eventBus: EventBus,
    private readonly commandBus: CommandBus,
    private readonly lessonCompletedHandler: LessonCompletedHandler,
    private readonly completeLessonHandler: CompleteLessonHandler,
    private readonly updateProgressHandler: UpdateProgressHandler
  ) {
    // Subscribe event handlers to event bus
    this.eventBus.subscribe('LessonCompleted', this.lessonCompletedHandler);
    
    // Register command handlers
    this.commandBus.register('CompleteLessonCommand', this.completeLessonHandler);
    this.commandBus.register('UpdateProgressCommand', this.updateProgressHandler);
  }
}