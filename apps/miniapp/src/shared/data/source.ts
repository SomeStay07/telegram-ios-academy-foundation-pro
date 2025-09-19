import { getTelegramApi } from '../../lib/telegram/api'

export type TGUser = { 
  id: number; 
  first_name?: string; 
  last_name?: string; 
  username?: string; 
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface ProfileStats {
  completed: number;
  total: number;
  streak: number;
}

export interface ProfileData {
  user: TGUser;
  stats: ProfileStats;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  at: string;
}

export interface IDataSource {
  getProfile(): Promise<ProfileData>;
  getActivity(): Promise<ActivityItem[]>;
}

// Determine which data source to use: TG vs Mock (no third fallbacks)
export function getDataSource(): IDataSource {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'
  
  // Explicit mocks mode
  if (useMocks) {
    return new MockDS()
  }
  
  // Check if Telegram API has user data
  try {
    const api = getTelegramApi()
    if (api.isAvailable() && api.hasUser()) {
      return new TGDS()
    }
  } catch (error) {
    // Telegram API not available, falling back to mocks
  }
  
  // Default to mocks for development
  return new MockDS()
}

class TGDS implements IDataSource {
  async getProfile(): Promise<ProfileData> {
    const api = getTelegramApi()
    const user = api.getUser()
    
    return {
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        photo_url: user.photo_url,
        language_code: user.language_code,
        is_premium: user.is_premium
      },
      stats: {
        completed: 0,
        total: 10,
        streak: 0
      }
    }
  }
  
  async getActivity(): Promise<ActivityItem[]> {
    return [
      {
        id: 'activity_1',
        title: 'Started: iOS Fundamentals',
        subtitle: 'Course Progress',
        at: new Date().toISOString()
      }
    ]
  }
}

class MockDS implements IDataSource {
  async getProfile(): Promise<ProfileData> {
    return {
      user: {
        id: 777,
        first_name: 'Timur',
        last_name: 'C.',
        username: 'somestay07',
        language_code: 'en',
        is_premium: false
      },
      stats: {
        completed: 5,
        total: 10,
        streak: 3
      }
    }
  }
  
  async getActivity(): Promise<ActivityItem[]> {
    return [
      {
        id: 'activity_1',
        title: 'Watched: SwiftUI Basics',
        subtitle: 'Video Tutorial',
        at: '2024-01-15T10:30:00Z'
      },
      {
        id: 'activity_2',
        title: 'Quiz: ARC & CoW',
        subtitle: 'Knowledge Check',
        at: '2024-01-14T15:45:00Z'
      }
    ]
  }
}