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

const isTG = !!(window as any).Telegram?.WebApp?.initData;
const useMocks = import.meta.env.VITE_USE_MOCKS === '1';

export function getDataSource(): IDataSource {
  return useMocks ? new MockDS() : (isTG ? new TGDS() : new MockDS());
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