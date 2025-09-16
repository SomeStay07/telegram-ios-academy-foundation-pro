/**
 * 🏆 iOS Academy Rank System
 * Система рангов основанная на XP для iOS разработчиков
 * 
 * Inspired by: Duolingo, Discord, Valorant ranking systems
 * Design: Gaming-first approach with meaningful progression
 */

export interface RankInfo {
  id: string
  name: string
  shortName: string
  minXP: number
  maxXP: number
  color: string
  gradient: string
  icon: string
  description: string
  benefits: string[]
}

export const RANKS: RankInfo[] = [
  // Beginner Tier (0 - 2999 XP)
  {
    id: 'newcomer',
    name: 'iOS Newcomer',
    shortName: 'Newcomer',
    minXP: 0,
    maxXP: 999,
    color: '#8E8E93',
    gradient: 'linear-gradient(135deg, #8E8E93 0%, #C7C7CC 100%)',
    icon: '🌱',
    description: 'Welcome to iOS development journey!',
    benefits: ['Access to beginner challenges', 'Basic learning materials']
  },
  {
    id: 'explorer',
    name: 'Code Explorer',
    shortName: 'Explorer',
    minXP: 1000,
    maxXP: 2999,
    color: '#34C759',
    gradient: 'linear-gradient(135deg, #34C759 0%, #30D158 100%)',
    icon: '🔍',
    description: 'Exploring the iOS ecosystem',
    benefits: ['Intermediate challenges', 'Code reviews', 'Community access']
  },

  // Intermediate Tier (3000 - 9999 XP)
  {
    id: 'developer',
    name: 'iOS Developer',
    shortName: 'Developer',
    minXP: 3000,
    maxXP: 6999,
    color: '#007AFF',
    gradient: 'linear-gradient(135deg, #007AFF 0%, #5AC8FA 100%)',
    icon: '👨‍💻',
    description: 'Building real iOS applications',
    benefits: ['Advanced challenges', 'Mock interviews', 'Portfolio reviews']
  },
  {
    id: 'specialist',
    name: 'Swift Specialist',
    shortName: 'Specialist',
    minXP: 7000,
    maxXP: 9999,
    color: '#FF9500',
    gradient: 'linear-gradient(135deg, #FF9500 0%, #FFCC02 100%)',
    icon: '⚡',
    description: 'Swift language expert',
    benefits: ['Expert challenges', 'Mentorship opportunities', 'Beta features']
  },

  // Advanced Tier (10000 - 24999 XP)
  {
    id: 'engineer',
    name: 'Senior Engineer',
    shortName: 'Senior',
    minXP: 10000,
    maxXP: 17999,
    color: '#AF52DE',
    gradient: 'linear-gradient(135deg, #AF52DE 0%, #BF5AF2 100%)',
    icon: '🛠️',
    description: 'Senior iOS engineering skills',
    benefits: ['Leadership challenges', 'Team building', 'Technical interviews']
  },
  {
    id: 'architect',
    name: 'iOS Architect',
    shortName: 'Architect',
    minXP: 18000,
    maxXP: 24999,
    color: '#FF2D92',
    gradient: 'linear-gradient(135deg, #FF2D92 0%, #FF375F 100%)',
    icon: '🏗️',
    description: 'Designing iOS architectures',
    benefits: ['Architecture reviews', 'System design', 'Principal role prep']
  },

  // Expert Tier (25000 - 49999 XP)
  {
    id: 'lead',
    name: 'Tech Lead',
    shortName: 'Lead',
    minXP: 25000,
    maxXP: 39999,
    color: '#FF3B30',
    gradient: 'linear-gradient(135deg, #FF3B30 0%, #FF6347 100%)',
    icon: '👑',
    description: 'Leading iOS development teams',
    benefits: ['Leadership training', 'Team management', 'Strategic planning']
  },
  {
    id: 'principal',
    name: 'Principal Engineer',
    shortName: 'Principal',
    minXP: 40000,
    maxXP: 49999,
    color: '#5856D6',
    gradient: 'linear-gradient(135deg, #5856D6 0%, #7C4DFF 100%)',
    icon: '🎯',
    description: 'Principal-level iOS expertise',
    benefits: ['Cross-team influence', 'Technical strategy', 'Industry recognition']
  },

  // Master Tier (50000+ XP)
  {
    id: 'master',
    name: 'iOS Master',
    shortName: 'Master',
    minXP: 50000,
    maxXP: 99999,
    color: '#FFD60A',
    gradient: 'linear-gradient(135deg, #FFD60A 0%, #FF9500 50%, #FF3B30 100%)',
    icon: '🏆',
    description: 'iOS development mastery achieved',
    benefits: ['Exclusive masterclasses', 'Industry partnerships', 'Personal branding']
  },

  // Legendary Tier (100000+ XP)
  {
    id: 'legend',
    name: 'iOS Legend',
    shortName: 'Legend',
    minXP: 100000,
    maxXP: Infinity,
    color: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #FFD60A 0%, #FF9500 25%, #FF3B30 50%, #AF52DE 75%, #007AFF 100%)',
    icon: '⭐',
    description: 'Legendary status in iOS community',
    benefits: ['Hall of fame', 'Mentorship program', 'Conference speaking', 'Open source contributions']
  }
]

/**
 * Получить информацию о ранге по XP
 */
export function getRankByXP(xp: number): RankInfo {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    const rank = RANKS[i]
    if (xp >= rank.minXP) {
      return rank
    }
  }
  return RANKS[0] // Fallback to first rank
}

/**
 * Получить следующий ранг
 */
export function getNextRank(currentXP: number): RankInfo | null {
  const currentRank = getRankByXP(currentXP)
  const currentRankIndex = RANKS.findIndex(rank => rank.id === currentRank.id)
  
  if (currentRankIndex < RANKS.length - 1) {
    return RANKS[currentRankIndex + 1]
  }
  
  return null // Already at max rank
}

/**
 * Получить прогресс до следующего ранга (0-1)
 */
export function getRankProgress(xp: number): number {
  const currentRank = getRankByXP(xp)
  const nextRank = getNextRank(xp)
  
  if (!nextRank) {
    return 1 // Max rank achieved
  }
  
  const progressInCurrentRank = xp - currentRank.minXP
  const totalXPNeededForNextRank = nextRank.minXP - currentRank.minXP
  
  return Math.min(progressInCurrentRank / totalXPNeededForNextRank, 1)
}

/**
 * Получить XP до следующего ранга
 */
export function getXPToNextRank(xp: number): number {
  const nextRank = getNextRank(xp)
  
  if (!nextRank) {
    return 0 // Already at max rank
  }
  
  return Math.max(nextRank.minXP - xp, 0)
}

/**
 * Проверить, повысился ли ранг после получения XP
 */
export function checkRankUp(oldXP: number, newXP: number): {
  rankUp: boolean
  oldRank: RankInfo
  newRank: RankInfo
} {
  const oldRank = getRankByXP(oldXP)
  const newRank = getRankByXP(newXP)
  
  return {
    rankUp: oldRank.id !== newRank.id,
    oldRank,
    newRank
  }
}

/**
 * Получить статистику рангов (для dashboard)
 */
export function getRankStats() {
  return {
    totalRanks: RANKS.length,
    tiers: {
      beginner: RANKS.slice(0, 2),
      intermediate: RANKS.slice(2, 4),
      advanced: RANKS.slice(4, 6),
      expert: RANKS.slice(6, 8),
      master: RANKS.slice(8, 9),
      legendary: RANKS.slice(9, 10)
    }
  }
}