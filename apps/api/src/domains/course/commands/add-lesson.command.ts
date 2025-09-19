import { randomUUID } from 'crypto';
import { Command } from '../../../shared/application/command';
import { Lesson } from '../entities/course.entity';

export class AddLessonCommand implements Command {
  public readonly commandId: string;
  public readonly issuedAt: Date;

  constructor(
    public readonly courseId: string,
    public readonly lesson: Lesson,
    commandId: string = randomUUID(),
    issuedAt: Date = new Date()
  ) {
    this.commandId = commandId;
    this.issuedAt = issuedAt;
  }
}