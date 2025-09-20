import { IDataSource, ProfileData, ActivityItem } from './source'

export class MockDS implements IDataSource {
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