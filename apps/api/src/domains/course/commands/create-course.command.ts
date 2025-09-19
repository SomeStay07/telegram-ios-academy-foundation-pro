import { randomUUID } from 'crypto';
import { Command } from '../../../shared/application/command';
import { CourseMetadata } from '../entities/course.entity';

export class CreateCourseCommand implements Command {
  public readonly commandId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly courseId: string,
    public readonly metadata: CourseMetadata,
    commandId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.commandId = commandId;
    this.issuedAt = issuedAt;
  }
}