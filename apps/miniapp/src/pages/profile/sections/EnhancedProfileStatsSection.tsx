import React, { useState, useEffect, useRef } from 'react'
import { Badge } from '@telegram-ios-academy/ui'
import { BookOpen, Clock, Trophy, Calendar, TrendingUp, Target, Award, Flame } from 'lucide-react'
import { AnimatedCounter } from '../../../components/AnimatedCounter'

interface ProfileStatsSectionProps {
  stats: {
    completed: number
    hours: number
    streak: number
  }
  totalCourses?: number
  weeklyStreak?: number[]
}

export function EnhancedProfileStatsSection({
  stats,
  totalCourses = 6,
  weeklyStreak = [1, 1, 0, 1, 1, 1, 0]
}: ProfileStatsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [progressAnimated, setProgressAnimated] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  
  const overallProgress = Math.min(100, Math.max(0, Math.round((stats.completed / totalCourses) * 100)))
  
  // Intersection Observer для анимаций при скролле
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setProgressAnimated(true), 500)
        }
      },
      { threshold: 0.3 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  const getActivityIcon = (day: number, active: number, dayIndex: number) => {
    const isToday = dayIndex === 6 // Assuming Sunday is today for demo
    
    if (active) {
      return (
        <div className={`group relative w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center text-xs font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
          isToday ? 'ring-2 ring-primary/50 ring-offset-2 ring-offset-background animate-pulse' : ''
        }`}>
          <div className="relative z-10">{day}</div>
          {active && (
            <Flame className={`absolute inset-0 m-auto w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isToday ? 'animate-bounce' : ''
            }`} />
          )}
          
          {/* Success ripple effect */}
          <div className="absolute inset-0 rounded-xl bg-green-400/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
        </div>
      );
    }
    
    // Enhanced inactive day
    return (
      <div className="group relative w-10 h-10 rounded-xl overflow-hidden bg-muted/30 border-2 border-muted/50 transition-all duration-300 hover:border-muted hover:bg-muted/50">
        <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-muted-foreground/60 group-hover:text-muted-foreground transition-colors">
          <div className={`w-2 h-2 rounded-full bg-muted-foreground/30 group-hover:bg-muted-foreground/50 transition-colors ${
            isToday ? 'animate-pulse' : ''
          }`} />
        </div>
      </div>
    );
  };
  
  const getStatColor = (statType: string) => {
    switch (statType) {
      case 'completed': return 'from-blue-500 to-blue-600'
      case 'hours': return 'from-purple-500 to-purple-600'
      case 'streak': return 'from-orange-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <div ref={sectionRef} className={`space-y-6 transition-all duration-1000 ${
      isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
    }`}>
      {/* Enhanced Statistics Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className={`w-5 h-5 text-primary transition-all duration-500 ${
            isVisible ? 'rotate-0 scale-100' : 'rotate-45 scale-0'
          }`} />
          <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">
            Статистика обучения
          </h3>
          <div className={`h-0.5 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full transition-all duration-1000 delay-300 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          } origin-left`} />
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Enhanced Course Progress Card */}
          <div 
            className={`group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-5 border border-border transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden relative ${
              hoveredStat === 'completed' ? 'border-blue-500/50 shadow-blue-500/25' : 'hover:border-primary/50'
            } ${isVisible ? 'animate-in slide-in-from-left-4 duration-700 delay-100' : 'opacity-0'}`}
            onMouseEnter={() => setHoveredStat('completed')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            {/* Animated background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getStatColor('completed')}/5 transition-opacity duration-500 ${
              hoveredStat === 'completed' ? 'opacity-100' : 'opacity-0'
            }`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatColor('completed')} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-content-primary leading-tight group-hover:text-blue-600 transition-colors duration-300">
                    Пройденные курсы
                  </h4>
                  <p className="font-body text-sm text-content-secondary leading-normal">
                    Завершено успешно
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-display text-3xl font-bold leading-none transition-all duration-500 ${
                  hoveredStat === 'completed' ? 'text-blue-600 scale-110' : 'text-content-primary'
                }`}>
                  {isVisible ? (
                    <AnimatedCounter target={stats.completed} duration={1000} />
                  ) : (
                    stats.completed
                  )}
                </div>
                <div className="font-body text-sm text-content-secondary leading-normal">из {totalCourses}</div>
              </div>
            </div>
            
            {/* Hover effect indicator */}
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${getStatColor('completed')} transition-all duration-300 ${
              hoveredStat === 'completed' ? 'w-full' : 'w-0'
            }`} />
          </div>

          {/* Enhanced Study Hours Card */}
          <div 
            className={`group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-5 border border-border transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden relative ${
              hoveredStat === 'hours' ? 'border-purple-500/50 shadow-purple-500/25' : 'hover:border-primary/50'
            } ${isVisible ? 'animate-in slide-in-from-left-4 duration-700 delay-200' : 'opacity-0'}`}
            onMouseEnter={() => setHoveredStat('hours')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getStatColor('hours')}/5 transition-opacity duration-500 ${
              hoveredStat === 'hours' ? 'opacity-100' : 'opacity-0'
            }`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatColor('hours')} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-content-primary leading-tight group-hover:text-purple-600 transition-colors duration-300">
                    Время изучения
                  </h4>
                  <p className="font-body text-sm text-content-secondary leading-normal">
                    Активное время
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-display text-3xl font-bold leading-none transition-all duration-500 ${
                  hoveredStat === 'hours' ? 'text-purple-600 scale-110' : 'text-content-primary'
                }`}>
                  {isVisible ? (
                    <AnimatedCounter target={stats.hours} duration={1200} />
                  ) : (
                    stats.hours
                  )}
                </div>
                <div className="font-body text-sm text-content-secondary leading-normal">часов</div>
              </div>
            </div>
            
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${getStatColor('hours')} transition-all duration-300 ${
              hoveredStat === 'hours' ? 'w-full' : 'w-0'
            }`} />
          </div>

          {/* Enhanced Learning Streak Card */}
          <div 
            className={`group bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-5 border border-border transition-all duration-500 shadow-lg hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden relative ${
              hoveredStat === 'streak' ? 'border-orange-500/50 shadow-orange-500/25' : 'hover:border-primary/50'
            } ${isVisible ? 'animate-in slide-in-from-left-4 duration-700 delay-300' : 'opacity-0'}`}
            onMouseEnter={() => setHoveredStat('streak')}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getStatColor('streak')}/5 transition-opacity duration-500 ${
              hoveredStat === 'streak' ? 'opacity-100' : 'opacity-0'
            }`} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatColor('streak')} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 relative`}>
                  <Trophy className="w-6 h-6 text-white relative z-10" />
                  {stats.streak >= 7 && (
                    <div className="absolute inset-0 rounded-xl bg-yellow-400/30 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-content-primary leading-tight group-hover:text-orange-600 transition-colors duration-300">
                    Серия изучения
                  </h4>
                  <p className="font-body text-sm text-content-secondary leading-normal">
                    Дней подряд {stats.streak >= 7 && '🔥'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-display text-3xl font-bold leading-none transition-all duration-500 flex items-center gap-2 ${
                  hoveredStat === 'streak' ? 'text-orange-600 scale-110' : 'text-content-primary'
                }`}>
                  {isVisible ? (
                    <AnimatedCounter target={stats.streak} duration={800} />
                  ) : (
                    stats.streak
                  )}
                  {stats.streak >= 7 && (
                    <Flame className={`w-6 h-6 text-orange-500 ${
                      hoveredStat === 'streak' ? 'animate-bounce' : 'animate-pulse'
                    }`} />
                  )}
                </div>
                <div className="font-body text-sm text-content-secondary leading-normal">дней</div>
              </div>
            </div>
            
            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${getStatColor('streak')} transition-all duration-300 ${
              hoveredStat === 'streak' ? 'w-full' : 'w-0'
            }`} />
          </div>
        </div>
      </div>

      {/* Enhanced Weekly Activity */}
      <div className={`space-y-4 ${isVisible ? 'animate-in slide-in-from-bottom-4 duration-700 delay-500' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <Calendar className={`w-5 h-5 text-primary transition-all duration-500 ${
            isVisible ? 'rotate-0 scale-100' : 'rotate-45 scale-0'
          }`} />
          <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">
            Активность за неделю
          </h3>
          <div className={`h-0.5 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full transition-all duration-1000 delay-700 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          } origin-left`} />
        </div>
        
        <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border transition-all duration-500 shadow-lg hover:shadow-2xl group overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
          </div>
          
          <div className="relative flex justify-between items-center gap-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
              <div 
                key={day} 
                className={`flex flex-col items-center gap-3 transition-all duration-500 ${
                  isVisible ? 'animate-in slide-in-from-bottom-2' : 'opacity-0'
                }`}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="font-body text-xs text-content-secondary font-medium leading-tight transition-colors duration-300 group-hover:text-content-primary">
                  {day}
                </div>
                {getActivityIcon(index + 1, weeklyStreak[index], index)}
              </div>
            ))}
          </div>
          
          {/* Activity streak indicator */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between text-xs">
              <span className="text-content-secondary">
                Активных дней: {weeklyStreak.filter(Boolean).length}/7
              </span>
              <div className="flex items-center gap-1">
                <Target className="w-3 h-3 text-primary" />
                <span className="text-primary font-medium">
                  {Math.round((weeklyStreak.filter(Boolean).length / 7) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Overall Progress Section */}
      <div className={`space-y-4 ${isVisible ? 'animate-in slide-in-from-bottom-4 duration-700 delay-700' : 'opacity-0'}`}>
        <div className="flex items-center gap-3">
          <Award className={`w-5 h-5 text-primary transition-all duration-500 ${
            isVisible ? 'rotate-0 scale-100' : 'rotate-45 scale-0'
          }`} />
          <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">Общий прогресс</h3>
          <div className={`h-0.5 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full transition-all duration-1000 delay-900 ${
            isVisible ? 'scale-x-100' : 'scale-x-0'
          } origin-left`} />
        </div>
        
        <div className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border transition-all duration-500 shadow-lg hover:shadow-2xl group overflow-hidden relative">
          {/* Enhanced Progress visualization */}
          <div className="flex items-center justify-between mb-6">
            {/* Circular progress */}
            <div className="relative">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                  <circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="6"
                    className="text-muted/30"
                  />
                  <circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - (progressAnimated ? overallProgress : 0) / 100)}`}
                    className="transition-all duration-2000 ease-out"
                  />
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                      <stop offset="50%" stopColor="rgb(147, 51, 234)" />
                      <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-display text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {progressAnimated ? <AnimatedCounter target={overallProgress} duration={2000} /> : overallProgress}%
                  </div>
                  <div className="font-body text-xs text-content-secondary/70 mt-1">
                    готово
                  </div>
                </div>
              </div>
            </div>
            
            {/* Progress details */}
            <div className="flex-1 ml-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm font-medium text-content-primary">Завершено курсов</span>
                  <span className="font-display text-sm font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {stats.completed} из {totalCourses}
                  </span>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="relative h-3 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden`}
                    style={{ 
                      width: `${progressAnimated ? overallProgress : 0}%`,
                      background: 'linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(147, 51, 234) 50%, rgb(236, 72, 153) 100%)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                  </div>
                  
                  {/* Milestone markers */}
                  {[25, 50, 75].map((mark) => (
                    <div 
                      key={mark}
                      className="absolute top-0 w-0.5 h-full bg-background/50"
                      style={{ left: `${mark}%` }}
                    />
                  ))}
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>25%</span>
                  <span>50%</span>
                  <span>75%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}