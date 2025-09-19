import React, { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'
import { Badge } from '../Badge'
import { Progress } from '../Progress'
import { 
  EducationIcons,
  DeveloperIcons,
  AchievementIcons,
  AnalyticsIcons,
  PlatformIcons
} from '../../icons'

// Course card variants with modern design patterns
const courseCardVariants = cva(
  'group relative overflow-hidden transition-all duration-500 ease-out cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: 'hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1',
        featured: 'ring-2 ring-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-2',
        compact: 'hover:scale-[1.01] hover:shadow-lg',
        path: 'hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-2 border-2 border-dashed border-primary/30',
        completed: 'ring-2 ring-green-500/30 bg-gradient-to-br from-green-50/50 via-transparent to-emerald-50/30 dark:from-green-950/20 dark:to-emerald-950/10',
        locked: 'opacity-60 grayscale hover:grayscale-0 hover:opacity-80'
      },
      size: {
        sm: 'p-3',
        md: 'p-4', 
        lg: 'p-6',
        xl: 'p-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md'
    }
  }
)

const iconContainerVariants = cva(
  'relative flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110',
  {
    variants: {
      category: {
        swift: 'bg-gradient-to-br from-orange-500/10 to-orange-600/20 text-orange-600 border border-orange-500/20 shadow-orange-500/10',
        uikit: 'bg-gradient-to-br from-blue-500/10 to-blue-600/20 text-blue-600 border border-blue-500/20 shadow-blue-500/10',
        swiftui: 'bg-gradient-to-br from-cyan-500/10 to-cyan-600/20 text-cyan-600 border border-cyan-500/20 shadow-cyan-500/10',
        architecture: 'bg-gradient-to-br from-purple-500/10 to-purple-600/20 text-purple-600 border border-purple-500/20 shadow-purple-500/10',
        performance: 'bg-gradient-to-br from-red-500/10 to-red-600/20 text-red-600 border border-red-500/20 shadow-red-500/10',
        testing: 'bg-gradient-to-br from-green-500/10 to-green-600/20 text-green-600 border border-green-500/20 shadow-green-500/10',
        advanced: 'bg-gradient-to-br from-yellow-500/10 to-amber-600/20 text-amber-600 border border-yellow-500/20 shadow-yellow-500/10'
      },
      size: {
        sm: 'w-8 h-8 p-1.5',
        md: 'w-10 h-10 p-2',
        lg: 'w-12 h-12 p-2.5',
        xl: 'w-16 h-16 p-3'
      }
    },
    defaultVariants: {
      category: 'swift',
      size: 'md'
    }
  }
)

interface Course {
  id: string
  title: string
  description: string
  category: 'swift' | 'uikit' | 'swiftui' | 'architecture' | 'performance' | 'testing' | 'advanced'
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  duration: number // in hours
  progress?: number // 0-100
  completed?: boolean
  locked?: boolean
  lessons: number
  completedLessons?: number
  xpReward?: number
  streak?: number
  rating?: number
  students?: number
  instructor?: string
  imageUrl?: string
  tags?: string[]
  isNew?: boolean
  isPremium?: boolean
  estimatedTime?: string
}

interface CourseCardProps extends Course, VariantProps<typeof courseCardVariants> {
  className?: string
  onStart?: () => void
  onContinue?: () => void
  onBookmark?: () => void
  isBookmarked?: boolean
  showImage?: boolean
  telegramOptimized?: boolean
}

export function CourseCard({
  title,
  description,
  category,
  difficulty,
  duration,
  progress = 0,
  completed = false,
  locked = false,
  lessons,
  completedLessons = 0,
  xpReward = 100,
  streak = 0,
  rating = 4.8,
  students = 1250,
  instructor = 'iOS Expert',
  imageUrl,
  tags = [],
  isNew = false,
  isPremium = false,
  estimatedTime,
  className,
  onStart,
  onContinue,
  onBookmark,
  isBookmarked = false,
  variant,
  size = 'md',
  showImage = true,
  telegramOptimized = false,
}: CourseCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // Auto-detect variant based on state
  const effectiveVariant = 
    locked ? 'locked' : 
    completed ? 'completed' : 
    variant === 'path' ? 'path' :
    variant === 'featured' ? 'featured' : 
    variant || 'default'

  const getCategoryIcon = () => {
    const iconProps = { className: size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5' }
    switch (category) {
      case 'swift': return <PlatformIcons.Swift {...iconProps} />
      case 'uikit': return <PlatformIcons.UIKit {...iconProps} />
      case 'swiftui': return <PlatformIcons.Apple {...iconProps} />
      case 'architecture': return <AnalyticsIcons.LightBulb {...iconProps} />
      case 'performance': return <AnalyticsIcons.Lightning {...iconProps} />
      case 'testing': return <DeveloperIcons.Bug {...iconProps} />
      case 'advanced': return <AchievementIcons.Crown {...iconProps} />
      default: return <EducationIcons.Book {...iconProps} />
    }
  }

  const getDifficultyInfo = () => {
    switch (difficulty) {
      case 'beginner': return { color: 'bg-green-500/15 text-green-700 border-green-500/30', label: '👶 Beginner', dots: 1 }
      case 'intermediate': return { color: 'bg-yellow-500/15 text-yellow-700 border-yellow-500/30', label: '🔥 Intermediate', dots: 2 }
      case 'advanced': return { color: 'bg-red-500/15 text-red-700 border-red-500/30', label: '💪 Advanced', dots: 3 }
      case 'expert': return { color: 'bg-purple-500/15 text-purple-700 border-purple-500/30', label: '🚀 Expert', dots: 4 }
      default: return { color: 'bg-gray-500/15 text-gray-700 border-gray-500/30', label: '📚 Unknown', dots: 1 }
    }
  }

  const difficultyInfo = getDifficultyInfo()

  const handleCardClick = () => {
    if (locked) return
    if (completed) {
      onContinue?.()
    } else if (progress > 0) {
      onContinue?.()
    } else {
      onStart?.()
    }
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    onBookmark?.()
  }

  const progressPercentage = Math.round((completedLessons / lessons) * 100)

  // Compact variant for lists and mobile
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          courseCardVariants({ variant: effectiveVariant, size: 'sm' }),
          telegramOptimized && 'bg-[var(--tg-bg-color,theme(colors.background))] border-[var(--tg-hint-color,theme(colors.border))]',
          className
        )}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={iconContainerVariants({ category, size: 'sm' })}>
            {locked ? '🔒' : getCategoryIcon()}
            {isNew && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                {title}
              </h4>
              {onBookmark && (
                <button
                  onClick={handleBookmark}
                  className="ml-2 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <EducationIcons.Heart className={cn(
                    'w-3 h-3 transition-colors',
                    isBookmarked ? 'text-red-500 fill-current' : 'text-muted-foreground hover:text-red-500'
                  )} />
                </button>
              )}
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
              {description}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className={cn('text-xs px-1.5 py-0.5', difficultyInfo.color)}>
                {difficulty}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {completedLessons}/{lessons} lessons
              </span>
              {xpReward > 0 && (
                <span className="text-xs text-amber-600 font-medium">
                  +{xpReward} XP
                </span>
              )}
            </div>

            {/* Mini progress */}
            {progress > 0 && !completed && (
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Status indicator */}
          {completed && (
            <div className="flex-shrink-0">
              <AchievementIcons.Star className="w-4 h-4 text-green-500" />
            </div>
          )}
        </div>
      </div>
    )
  }

  // Full card variant
  return (
    <div
      className={cn(
        courseCardVariants({ variant: effectiveVariant, size }),
        telegramOptimized && 'bg-[var(--tg-bg-color,theme(colors.background))] border-[var(--tg-hint-color,theme(colors.border))]',
        className
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {/* Header with badges */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          {isNew && (
            <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs px-2 py-1 animate-pulse">
              🆕 New
            </Badge>
          )}
          {isPremium && (
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs px-2 py-1">
              ⭐ Premium
            </Badge>
          )}
          {variant === 'featured' && (
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-2 py-1">
              🔥 Featured
            </Badge>
          )}
          {completed && (
            <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white text-xs px-2 py-1">
              ✅ Completed
            </Badge>
          )}
        </div>

        {onBookmark && (
          <button
            onClick={handleBookmark}
            className={cn(
              'p-2 rounded-lg transition-all duration-200',
              'opacity-0 group-hover:opacity-100',
              isBookmarked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
            )}
          >
            <EducationIcons.Heart className={cn(
              'w-4 h-4 transition-all duration-200',
              isBookmarked && 'fill-current scale-110'
            )} />
          </button>
        )}
      </div>

      {/* Course image */}
      {showImage && imageUrl && (
        <div className="relative mb-4 rounded-xl overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          {locked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
          )}
        </div>
      )}

      {/* Main content */}
      <div className="flex items-start gap-4 mb-4">
        {/* Category icon */}
        <div className={iconContainerVariants({ category, size })}>
          {locked ? '🔒' : getCategoryIcon()}
          {/* Streak indicator */}
          {streak > 0 && !locked && (
            <div className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {streak}
            </div>
          )}
        </div>

        {/* Title and description */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Metadata row */}
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
        {/* Category */}
        <Badge variant="outline" className={iconContainerVariants({ category }).split(' ').slice(-3).join(' ')}>
          {category.toUpperCase()}
        </Badge>

        {/* Difficulty with visual indicator */}
        <Badge variant="outline" className={cn('flex items-center gap-1', difficultyInfo.color)}>
          <span>{difficultyInfo.label}</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 4 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  'w-1 h-1 rounded-full',
                  i < difficultyInfo.dots ? 'bg-current' : 'bg-current/20'
                )}
              />
            ))}
          </div>
        </Badge>

        {/* Duration */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <AnalyticsIcons.Clock className="w-3 h-3" />
          <span>{duration}h</span>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <EducationIcons.Book className="w-3 h-3" />
          <span>{lessons} lessons</span>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 text-amber-600">
            <AchievementIcons.Star className="w-3 h-3 fill-current" />
            <span className="font-medium">{rating}</span>
          </div>
        )}

        {/* Student count */}
        {students > 0 && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <EducationIcons.Person className="w-3 h-3" />
            <span>{students > 1000 ? `${(students/1000).toFixed(1)}k` : students}</span>
          </div>
        )}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Progress section */}
      {!locked && !completed && progress > 0 && (
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">
              Progress: {completedLessons}/{lessons} lessons
            </span>
            <span className="text-primary font-semibold">
              {progressPercentage}%
            </span>
          </div>
          <Progress
            value={progressPercentage}
            max={100}
            className="h-2"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{estimatedTime || `${Math.ceil((lessons - completedLessons) * 0.5)} hours left`}</span>
            {xpReward > 0 && (
              <span className="text-amber-600 font-medium">
                +{Math.round(xpReward * (lessons - completedLessons) / lessons)} XP remaining
              </span>
            )}
          </div>
        </div>
      )}

      {/* Instructor info */}
      {instructor && !locked && (
        <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
          <EducationIcons.Person className="w-3 h-3" />
          <span>by {instructor}</span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2">
        {locked ? (
          <button 
            disabled 
            className="w-full opacity-60 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground"
          >
            <span className="mr-2">🔒</span>
            {isPremium ? 'Premium Required' : 'Locked'}
          </button>
        ) : completed ? (
          <div className="flex gap-2 w-full">
            <button
              onClick={onContinue}
              className="flex-1 px-4 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted/50 transition-colors"
            >
              <AchievementIcons.Star className="w-4 h-4 mr-2" />
              Review
            </button>
            <button
              onClick={() => {/* Share functionality */}}
              className="px-3 py-2 rounded-lg text-sm font-medium border border-border bg-background hover:bg-muted/50 transition-colors"
            >
              📤
            </button>
          </div>
        ) : progress > 0 ? (
          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02] px-4 py-2 rounded-lg text-sm font-medium text-white"
          >
            <AnalyticsIcons.Rocket className="w-4 h-4 mr-2" />
            Continue Learning
          </button>
        ) : (
          <button
            onClick={onStart}
            className="w-full transform transition-all duration-200 hover:scale-[1.02] px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <EducationIcons.Book className="w-4 h-4 mr-2" />
            Start Course
          </button>
        )}
      </div>

      {/* Hover effects and animations */}
      {isHovered && variant === 'featured' && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>
      )}

      {/* Path progression indicator for Duolingo-style layout */}
      {variant === 'path' && (
        <>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background" />
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-primary/30" />
        </>
      )}

      {/* Telegram WebApp specific optimizations */}
      {telegramOptimized && (
        <div className="absolute inset-0 rounded-xl pointer-events-none bg-gradient-to-br from-[var(--tg-button-color,theme(colors.primary))]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  )
}

CourseCard.displayName = 'CourseCard'