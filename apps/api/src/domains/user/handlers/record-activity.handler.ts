import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/command';
import { RecordActivityCommand } from '../commands/record-activity.command';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class RecordActivityHandler implements CommandHandler<RecordActivityCommand> {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: RecordActivityCommand): Promise<void> {
    try {
      // Get user aggregate
      const user = await this.userRepository.getById(command.userId);
      if (!user) {
        throw new Error(`User ${command.userId} not found`);
      }

      // Record activity (this will update streak if needed)
      user.recordActivity();

      // Save the aggregate
      await this.userRepository.save(user);

    } catch (error) {
      console.error('Error executing RecordActivityCommand:', error);
      throw error;
    }
  }
}