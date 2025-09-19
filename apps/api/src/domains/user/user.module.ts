import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { RegisterUserHandler } from './handlers/register-user.handler';
import { UpdateProfileHandler } from './handlers/update-profile.handler';
import { RecordActivityHandler } from './handlers/record-activity.handler';
import { CommandBus } from '../../shared/application/command-bus';

@Module({
  controllers: [
    AuthController,
  ],
  providers: [
    // Repositories
    UserRepository,
    
    // Command Handlers
    RegisterUserHandler,
    UpdateProfileHandler,
    RecordActivityHandler,
  ],
  exports: [
    UserRepository,
  ],
})
export class UserModule {}