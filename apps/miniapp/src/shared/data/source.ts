import { getTelegramApi } from '../../lib/telegram/api'
import { MockDS } from './mockds'
import { TGDS } from './tgds'

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

