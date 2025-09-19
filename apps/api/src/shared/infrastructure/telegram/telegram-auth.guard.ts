import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly telegramService: TelegramService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    
    // Check for session token first (preferred)
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        const payload = this.telegramService.validateSessionToken(token);
        request.user = payload;
        return true;
      } catch (error) {
        // Fall through to initData check
      }
    }

    // Fallback to initData validation
    const initData = request.headers['x-telegram-init-data'];
    if (!initData) {
      throw new UnauthorizedException('Missing Telegram authentication');
    }

    try {
      const telegramData = this.telegramService.validateAndParseInitData(initData);
      request.user = {
        userId: `tg_${telegramData.user.id}`,
        telegramId: telegramData.user.id,
        telegramUser: telegramData.user
      };
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram authentication');
    }
  }
}

// Decorator to extract user from request
export const GetTelegramUser = () => {
  return (target: any, propertyKey: string, parameterIndex: number) => {
    // This would be used with @GetTelegramUser() user: any parameter
  };
};