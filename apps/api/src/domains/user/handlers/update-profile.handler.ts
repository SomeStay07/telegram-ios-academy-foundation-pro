import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/command';
import { UpdateProfileCommand } from '../commands/update-profile.command';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateProfileHandler implements CommandHandler<UpdateProfileCommand> {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: UpdateProfileCommand): Promise<void> {
    try {
      // Get user aggregate
      const user = await this.userRepository.getById(command.userId);
      if (!user) {
        throw new Error(`User ${command.userId} not found`);
      }

      // Update profile
      user.updateProfile(command.profileUpdates);

      // Save the aggregate
      await this.userRepository.save(user);

    } catch (error) {
      console.error('Error executing UpdateProfileCommand:', error);
      throw error;
    }
  }
}