export type TGUser = { 
  id: number; 
  first_name?: string; 
  last_name?: string; 
  username?: string; 
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
}

export type ProfileData = { 
  user: TGUser; 
  stats: { 
    completed: number; 
    hours: number; 
    streak: number;
  };
}

export interface IDataSource {
  getProfile(): Promise<ProfileData>;
  getActivity(): Promise<Array<{ 
    id: string; 
    title: string; 
    subtitle: string; 
    at: string;
  }>>;
}

export function getDataSource(): IDataSource {
  const isTG = !!(window as any)?.Telegram?.WebApp?.initData;
  const useMocks = import.meta.env.VITE_USE_MOCKS === '1';
  
  // Use mocks if explicitly requested, otherwise use TG if available, fallback to mocks
  return useMocks ? new MockDataSource() : (isTG ? new TelegramDataSource() : new MockDataSource());
}

class TelegramDataSource implements IDataSource {
  async getProfile(): Promise<ProfileData> {
    const wa = (window as any).Telegram?.WebApp;
    const u = wa?.initDataUnsafe?.user ?? {};
    
    // TODO: здесь только клиентское отображение. Для сервера — верификация initData по докам TG.
    return { 
      user: {
        id: u.id || 999999999,
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username,
        photo_url: u.photo_url,
        language_code: u.language_code || 'en',
        is_premium: u.is_premium || false,
      }, 
      stats: { 
        completed: 7, 
        hours: 23, 
        streak: 4 
      } 
    };
  }

  async getActivity() {
    // При отсутствии бекенда верни лёгкий mock
    return [
      { 
        id: '1', 
        title: 'Completed: Concurrency', 
        subtitle: '+1 module', 
        at: '2h ago' 
      }
    ];
  }
}

class MockDataSource implements IDataSource {
  async getProfile(): Promise<ProfileData> {
    return {
      user: { 
        id: 123456789, 
        first_name: 'Timur', 
        last_name: 'C.', 
        username: 'somestay07',
        language_code: 'en',
        is_premium: false,
      },
      stats: { 
        completed: 5, 
        hours: 12, 
        streak: 3 
      }
    };
  }

  async getActivity() {
    return [
      { 
        id: '1', 
        title: 'Watched: SwiftUI Basics', 
        subtitle: '+25 min', 
        at: '1h ago' 
      },
      { 
        id: '2', 
        title: 'Quiz: ARC & CoW', 
        subtitle: '8/10', 
        at: 'yesterday' 
      }
    ];
  }
}