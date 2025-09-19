import { atom } from 'jotai'

// User Profile Data Atom
export interface UserData {
  id: number
  firstName: string
  lastName: string
  username: string
  avatar: string
  totalXP: number
  streak: number
  challengesCompleted: number
  battlesWon: number
  globalRank: number
  weeklyXP: number
  monthlyXP: number
  achievements: number
}

// Primary user data atom with enhanced demo data
export const userDataAtom = atom<UserData>({
  id: 1,
  firstName: 'Name',
  lastName: 'Username',
  username: 'developer',
  avatar: '',
  totalXP: 12750,
  streak: 14,
  challengesCompleted: 47,
  battlesWon: 23,
  globalRank: 892,
  weeklyXP: 2150,
  monthlyXP: 8950,
  achievements: 15
})

// Derived atoms for computed values
export const totalXPAtom = atom((get) => get(userDataAtom).totalXP)
export const streakAtom = atom((get) => get(userDataAtom).streak)
export const globalRankAtom = atom((get) => get(userDataAtom).globalRank)

// Achievement notification atom for micro-interactions
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  timestamp: number
}

export const achievementNotificationAtom = atom<Achievement | null>(null)

// Haptic feedback state
export const hapticEnabledAtom = atom(true)

// Animation preferences
export const animationPreferencesAtom = atom({
  reduceMotion: false,
  enableParticles: true,
  enableSounds: true
})

// Level up animation trigger
export const levelUpTriggerAtom = atom<{ show: boolean; newLevel: number }>({
  show: false,
  newLevel: 0
})