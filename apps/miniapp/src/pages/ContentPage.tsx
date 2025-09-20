import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Play, BookOpen, ArrowRight, Lock, Star, Clock } from 'lucide-react'

interface ContentItem {
  id: string
  title: string
  subtitle: string
  category: string
  type: 'video' | 'article' | 'roadmap'
  duration?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  isLocked: boolean
  rating?: number
  views?: number
  tags: string[]
}

const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'SwiftUI Basics',
    subtitle: 'Fundamentals of declarative UI',
    category: 'SwiftUI',
    type: 'video',
    duration: '12 мин',
    difficulty: 'beginner',
    isLocked: false,
    rating: 4.8,
    views: 1200,
    tags: ['SwiftUI', 'UI', 'Basics']
  },
  {
    id: '2',
    title: 'ARC & Memory Management',
    subtitle: 'Deep dive into automatic reference counting',
    category: 'Memory Management',
    type: 'article',
    duration: '8 мин',
    difficulty: 'advanced',
    isLocked: false,
    rating: 4.9,
    views: 800,
    tags: ['ARC', 'Memory', 'Performance']
  },
  {
    id: '3',
    title: 'iOS Interview Preparation',
    subtitle: 'Complete roadmap for interviews',
    category: 'Career',
    type: 'roadmap',
    difficulty: 'intermediate',
    isLocked: true,
    rating: 4.7,
    views: 2100,
    tags: ['Interview', 'Career', 'Preparation']
  },
  {
    id: '4',
    title: 'Combine Framework Deep Dive',
    subtitle: 'Reactive programming with Combine',
    category: 'Frameworks',
    type: 'video',
    duration: '25 мин',
    difficulty: 'advanced',
    isLocked: true,
    rating: 4.6,
    views: 650,
    tags: ['Combine', 'Reactive', 'Programming']
  },
  {
    id: '5',
    title: 'Auto Layout Mastery',
    subtitle: 'Create responsive layouts',
    category: 'UI/UX',
    type: 'video',
    duration: '18 мин',
    difficulty: 'intermediate',
    isLocked: false,
    rating: 4.5,
    views: 980,
    tags: ['AutoLayout', 'UI', 'Responsive']
  },
  {
    id: '6',
    title: 'Core Data Best Practices',
    subtitle: 'Efficient data persistence',
    category: 'Data',
    type: 'article',
    duration: '15 мин',
    difficulty: 'intermediate',
    isLocked: true,
    rating: 4.4,
    views: 720,
    tags: ['CoreData', 'Persistence', 'Database']
  }
]

const categories = ['Все', 'SwiftUI', 'Memory Management', 'Career', 'Frameworks', 'UI/UX', 'Data']
const difficulties = ['Все', 'beginner', 'intermediate', 'advanced']
const types = ['Все', 'video', 'article', 'roadmap']

function ContentCard({ item }: { item: ContentItem }) {
  const getIcon = () => {
    switch (item.type) {
      case 'video':
        return <Play className="w-5 h-5" />
      case 'article':
        return <BookOpen className="w-5 h-5" />
      case 'roadmap':
        return <ArrowRight className="w-5 h-5" />
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

  const getDifficultyColor = () => {
    switch (item.difficulty) {
      case 'beginner':
        return 'text-green-600 dark:text-green-400'
      case 'intermediate':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'advanced':
        return 'text-red-600 dark:text-red-400'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-5 rounded-xl border transition-all duration-200 cursor-pointer
        ${item.isLocked 
          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
        }
      `}
    >
      {/* Lock indicator */}
      {item.isLocked && (
        <div className="absolute top-3 right-3">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}
      
      {/* Content type badge */}
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${getTypeColor()}`}>
        {getIcon()}
        <span className="capitalize">{item.type}</span>
      </div>
      
      {/* Title and subtitle */}
      <h3 className={`font-bold text-lg mb-2 ${item.isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {item.subtitle}
      </p>
      
      {/* Category */}
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
        {item.category}
      </div>
      
      {/* Meta information */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-3">
          {item.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{item.duration}</span>
            </div>
          )}
          {item.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{item.rating}</span>
            </div>
          )}
          {item.views && (
            <span>{item.views} просмотров</span>
          )}
        </div>
        <span className={`font-medium capitalize ${getDifficultyColor()}`}>
          {item.difficulty}
        </span>
      </div>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3">
        {item.tags.slice(0, 3).map((tag) => (
          <span 
            key={tag}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export function ContentPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Все')
  const [selectedDifficulty, setSelectedDifficulty] = useState('Все')
  const [selectedType, setSelectedType] = useState('Все')
  const [showFilters, setShowFilters] = useState(false)

  const filteredContent = useMemo(() => {
    return mockContent.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === 'Все' || item.difficulty === selectedDifficulty
      const matchesType = selectedType === 'Все' || item.type === selectedType
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesType
    })
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedType])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Контент
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Образовательные материалы iOS Academy
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по контенту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-gray-900 dark:text-white"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Найдено: {filteredContent.length} материалов
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Фильтры
          </motion.button>
        </div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Категория
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Сложность
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'Все' ? difficulty : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Тип
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                >
                  {types.map(type => (
                    <option key={type} value={type}>
                      {type === 'Все' ? type : type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Контент не найден
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Попробуйте изменить параметры поиска или фильтры
          </p>
        </div>
      )}
    </div>
  )
}