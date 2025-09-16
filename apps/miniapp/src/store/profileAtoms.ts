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

// Primary user data atom
export const userDataAtom = atom<UserData>({
  id: 1,
  firstName: 'Name',
  lastName: 'Username',
  username: 'developer',
  avatar: '',
  totalXP: 15750,
  streak: 7,
  challengesCompleted: 23,
  battlesWon: 12,
  globalRank: 1247,
  weeklyXP: 1250,
  monthlyXP: 4750,
  achievements: 8
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