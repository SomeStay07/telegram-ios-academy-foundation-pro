export type TGUser = { 
  id: number; 
  first_name?: string; 
  last_name?: string; 
  username?: string; 
  photo_url?: string;
}

export interface IDataSource {
  getProfile(): Promise<{ user: TGUser }>;
}

// Determine which data source to use: TG vs Mock (no third fallbacks)
export function getDataSource(): IDataSource {
  const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'
  const hasWebApp = !!(window as any).Telegram?.WebApp
  const hasInitData = !!(window as any).Telegram?.WebApp?.initData
  
  // Explicit mocks mode
  if (useMocks) {
    return new MockDS()
  }
  
  // TG environment with data
  if (hasWebApp && hasInitData) {
    return new TGDS()
  }
  
  // Default to mocks for development
  return new MockDS()
}

class TGDS implements IDataSource {
  async getProfile() {
    const wa = (window as any).Telegram.WebApp;
    return { user: wa?.initDataUnsafe?.user ?? {} };
  }
}

class MockDS implements IDataSource {
  async getProfile() {
    return { user: { id: 777, first_name: 'Timur', last_name: 'C.', username: 'somestay07' } };
  }
}