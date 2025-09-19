import { AggregateRoot } from '../../../shared/domain/aggregate-root';
import { UserRegistered } from '../events/user-registered.event';
import { ProfileUpdated } from '../events/profile-updated.event';
import { UserActivityRecorded } from '../events/user-activity-recorded.event';
import { StreakMaintained } from '../events/streak-maintained.event';

export interface UserProfile {
  telegramId: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode: string;
  preferences: Record<string, any>;
}

export class User extends AggregateRoot {
  private constructor(
    id: string,
    private _profile: UserProfile,
    private _lastActiveAt: Date,
    private _streakCount: number = 0,
    version: number = 0
  ) {
    super(id, version);
  }

  public static create(id: string, profile: UserProfile): User {
    const user = new User(id, profile, new Date(), 0, 0);
    
    user.addDomainEvent(new UserRegistered(
      id,
      profile.telegramId,
      profile,
      0
    ));

    return user;
  }

  public static fromHistory(
    id: string,
    profile: UserProfile,
    lastActiveAt: Date,
    streakCount: number,
    version: number
  ): User {
    return new User(id, profile, lastActiveAt, streakCount, version);
  }

  get profile(): UserProfile {
    return { ...this._profile };
  }

  get lastActiveAt(): Date {
    return this._lastActiveAt;
  }

  get streakCount(): number {
    return this._streakCount;
  }

  public updateProfile(updates: Partial<UserProfile>): void {
    const previousProfile = { ...this._profile };
    this._profile = { ...this._profile, ...updates };

    this.addDomainEvent(new ProfileUpdated(
      this.id,
      previousProfile,
      this._profile,
      this.version + 1
    ));

    this.incrementVersion();
  }

  public recordActivity(): void {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    
    // Record the activity
    this.addDomainEvent(new UserActivityRecorded(
      this.id,
      this.id,
      'lesson_activity',
      now,
      this.version + 1
    ));
    
    // Check if this maintains streak
    const previousStreak = this._streakCount;
    if (this._lastActiveAt >= yesterday) {
      this._streakCount++;
    } else {
      this._streakCount = 1; // Reset streak
    }

    // If streak was maintained or improved, emit streak event
    if (this._streakCount > previousStreak) {
      this.addDomainEvent(new StreakMaintained(
        this.id,
        this.id,
        this._streakCount,
        now,
        this.version + 1
      ));
    }

    this._lastActiveAt = now;
    this.incrementVersion();
  }
}