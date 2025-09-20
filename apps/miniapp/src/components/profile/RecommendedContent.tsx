import React from 'react'
import { motion } from 'framer-motion'
import { Play, Lock, ArrowRight, BookOpen } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface ContentItem {
  id: string
  title: string
  subtitle: string
  type: 'video' | 'article' | 'roadmap'
  duration?: string
  isLocked: boolean
  thumbnail?: string
}

interface RecommendedContentProps {
  itemVariants?: any
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'SwiftUI Basics',
    subtitle: 'Fundamentals',
    type: 'video',
    duration: '12 мин',
    isLocked: false
  },
  {
    id: '2', 
    title: 'ARC & Memory Management',
    subtitle: 'Advanced Topic',
    type: 'article',
    duration: '8 мин',
    isLocked: false
  },
  {
    id: '3',
    title: 'iOS Interview Preparation',
    subtitle: 'Career Guide',
    type: 'roadmap',
    isLocked: true
  },
  {
    id: '4',
    title: 'Combine Framework Deep Dive',
    subtitle: 'Advanced Topic',
    type: 'video', 
    duration: '25 мин',
    isLocked: true
  }
]

function ContentCard({ item }: { item: ContentItem }) {
  const getIcon = () => {
    switch (item.type) {
      case 'video':
        return <Play className="w-4 h-4" />
      case 'article':
        return <BookOpen className="w-4 h-4" />
      case 'roadmap':
        return <ArrowRight className="w-4 h-4" />
    }
  }

  const getTypeColor = () => {
    switch (item.type) {
      case 'video':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      case 'article':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'roadmap':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-4 rounded-lg border transition-all duration-200
        ${item.isLocked 
          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 cursor-pointer'
        }
      `}
    >
      {/* Lock indicator */}
      {item.isLocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-4 h-4 text-gray-400" />
        </div>
      )}
      
      {/* Content type badge */}
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-2 ${getTypeColor()}`}>
        {getIcon()}
        <span className="capitalize">{item.type}</span>
      </div>
      
      {/* Title and subtitle */}
      <h3 className={`font-semibold text-sm mb-1 ${item.isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
        {item.title}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
        {item.subtitle}
      </p>
      
      {/* Duration */}
      {item.duration && (
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {item.duration}
        </div>
      )}
    </motion.div>
  )
}

export const RecommendedContent = React.memo<RecommendedContentProps>(({ itemVariants }) => {
  const navigate = useNavigate()

  const handleViewAll = () => {
    navigate({ to: '/content' })
  }

  return (
    <motion.div
      variants={itemVariants}
      className="mb-6"
    >
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Рекомендуемое
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAll}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            Смотреть все
          </motion.button>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-2 gap-3">
          {mockContent.slice(0, 4).map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </motion.div>
  )
})