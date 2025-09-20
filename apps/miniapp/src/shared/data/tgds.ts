import { getTelegramApi } from '../../lib/telegram/api'
import { IDataSource, ProfileData, ActivityItem } from './source'

export class TGDS implements IDataSource {
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