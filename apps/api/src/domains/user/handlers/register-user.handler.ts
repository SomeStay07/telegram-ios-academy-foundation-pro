import { Injectable } from '@nestjs/common';
import { CommandHandler } from '../../../shared/application/command';
import { RegisterUserCommand } from '../commands/register-user.command';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../entities/user.entity';

@Injectable()
export class RegisterUserHandler implements CommandHandler<RegisterUserCommand> {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute(command: RegisterUserCommand): Promise<void> {
    try {
      // Check if user already exists
      const existingUser = await this.userRepository.getById(command.userId);
      if (existingUser) {
        throw new Error(`User ${command.userId} already exists`);
      }

      // Create new user aggregate
      const user = User.create(command.userId, command.profile);

      // Save the aggregate (this will persist events and publish them)
      await this.userRepository.save(user);

    } catch (error) {
      console.error('Error executing RegisterUserCommand:', error);
      throw error;
    }
  }
}