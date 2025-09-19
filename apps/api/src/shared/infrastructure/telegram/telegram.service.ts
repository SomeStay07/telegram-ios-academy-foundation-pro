import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'crypto';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
}

export interface TelegramInitData {
  user: TelegramUser;
  auth_date: number;
  hash: string;
  query_id?: string;
  start_param?: string;
}

@Injectable()
export class TelegramService {
  private readonly botToken: string;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!this.botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is required');
    }
  }

  /**
   * Validates and parses Telegram WebApp initData
   * Returns parsed user data if valid, throws if invalid
   */
  public validateAndParseInitData(initData: string): TelegramInitData {
    if (!initData) {
      throw new UnauthorizedException('initData is required');
    }

    const urlSearchParams = new URLSearchParams(initData);
    
    // Check auth_date (not older than 24 hours)
    const authDate = Number(urlSearchParams.get('auth_date') || '0');
    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - authDate) > 86400) { // 24 hours
      throw new UnauthorizedException('initData is too old');
    }

    // Verify HMAC signature
    const hash = urlSearchParams.get('hash');
    if (!hash) {
      throw new UnauthorizedException('hash is missing');
    }

    urlSearchParams.delete('hash');
    const dataCheckString = Array.from(urlSearchParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = createHmac('sha256', 'WebAppData')
      .update(this.botToken)
      .digest();
    
    const calculatedHash = createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (calculatedHash !== hash) {
      throw new UnauthorizedException('Invalid signature');
    }

    // Parse user data
    const userParam = urlSearchParams.get('user');
    if (!userParam) {
      throw new UnauthorizedException('User data is missing');
    }

    let user: TelegramUser;
    try {
      user = JSON.parse(userParam);
    } catch (error) {
      throw new UnauthorizedException('Invalid user data format');
    }

    return {
      user,
      auth_date: authDate,
      hash,
      query_id: urlSearchParams.get('query_id') || undefined,
      start_param: urlSearchParams.get('start_param') || undefined
    };
  }

  /**
   * Extracts user ID from initData for quick access
   */
  public extractUserId(initData: string): string {
    const parsed = this.validateAndParseInitData(initData);
    return `tg_${parsed.user.id}`;
  }

  /**
   * Converts Telegram user to our UserProfile format
   */
  public telegramUserToProfile(telegramUser: TelegramUser): any {
    return {
      telegramId: telegramUser.id,
      firstName: telegramUser.first_name,
      lastName: telegramUser.last_name,
      username: telegramUser.username,
      languageCode: telegramUser.language_code || 'en',
      preferences: {
        isPremium: telegramUser.is_premium || false,
        photoUrl: telegramUser.photo_url
      }
    };
  }

  /**
   * Generates JWT token for session management
   */
  public generateSessionToken(telegramUser: TelegramUser): string {
    // TODO: Implement proper JWT generation
    // For now, return a simple token
    const payload = {
      userId: `tg_${telegramUser.id}`,
      telegramId: telegramUser.id,
      username: telegramUser.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    // In production, use proper JWT library
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  /**
   * Validates session token
   */
  public validateSessionToken(token: string): any {
    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException('Token expired');
      }
      
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}