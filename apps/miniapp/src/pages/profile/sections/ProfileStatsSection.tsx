import { Badge } from '@telegram-ios-academy/ui'
import { BookOpen, Clock, Trophy, Calendar } from 'lucide-react'

interface ProfileStatsSectionProps {
  stats: {
    completed: number
    hours: number
    streak: number
  }
  totalCourses?: number
  weeklyStreak?: number[]
}

export function ProfileStatsSection({
  stats,
  totalCourses = 6,
  weeklyStreak = [1, 1, 0, 1, 1, 1, 0]
}: ProfileStatsSectionProps) {
  const overallProgress = Math.min(100, Math.max(0, Math.round((stats.completed / totalCourses) * 100)))

  const getActivityIcon = (day: number, active: number) => {
    if (active) {
      return (
        <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center text-xs font-semibold shadow-sm">
          {day}
        </div>
      );
    }
    
    // Inactive day with gray breathing border animation
    return (
      <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-50/20">
        <div 
          className="absolute inset-0 rounded-xl"
          style={{ 
            animation: 'border-breathing-calm 3s ease-in-out infinite',
            border: '2px solid rgba(100, 116, 139, 0.25)'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-400/60">
          ·
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Statistics Grid */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">Статистика обучения</h3>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Course Progress */}
          <div className="bg-glass-secondary backdrop-blur-sm rounded-2xl p-5 border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-glass-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-icon-blue flex items-center justify-center shadow-sm">
                  <BookOpen className="w-6 h-6 text-icon-blue" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-content-primary leading-tight">Пройденные курсы</h4>
                  <p className="font-body text-sm text-content-secondary leading-normal">Завершено успешно</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-icon-blue leading-none">{stats.completed}</div>
                <div className="font-body text-sm text-content-secondary leading-normal">из {totalCourses}</div>
              </div>
            </div>
          </div>

          {/* Study Hours */}
          <div className="bg-glass-secondary backdrop-blur-sm rounded-2xl p-5 border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-glass-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-icon-purple flex items-center justify-center shadow-sm">
                  <Clock className="w-6 h-6 text-icon-purple" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-content-primary leading-tight">Время изучения</h4>
                  <p className="font-body text-sm text-content-secondary leading-normal">Активное время</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-icon-purple leading-none">{stats.hours}</div>
                <div className="font-body text-sm text-content-secondary leading-normal">часов</div>
              </div>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="bg-glass-secondary backdrop-blur-sm rounded-2xl p-5 border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-glass-primary">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-icon-orange flex items-center justify-center shadow-sm">
                  <Trophy className="w-6 h-6 text-icon-orange" />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold text-content-primary leading-tight">Серия изучения</h4>
                  <p className="font-body text-sm text-content-secondary leading-normal">Дней подряд</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl font-bold text-icon-orange leading-none">{stats.streak}</div>
                <div className="font-body text-sm text-content-secondary leading-normal">дней</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">Активность за неделю</h3>
        <div className="bg-glass-secondary backdrop-blur-sm rounded-2xl p-5 border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-glass-primary">
          <div className="flex justify-between items-center">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div className="font-body text-xs text-content-secondary font-medium leading-tight">{day}</div>
                {getActivityIcon(index + 1, weeklyStreak[index])}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Progress Section */}
      <div className="space-y-4">
        <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">Общий прогресс</h3>
        
        <div className="bg-glass-secondary backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-glass-primary">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6">
            {/* Left side: Enhanced Circular Progress Ring */}
            <div className="relative">
              <div className="relative w-20 h-20">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
                  {/* Background circle with subtle gradient */}
                  <circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke="url(#backgroundGradient)"
                    strokeWidth="6"
                  />
                  {/* Progress circle with simple gradient */}
                  <circle
                    cx="40" cy="40" r="34"
                    fill="none"
                    stroke="url(#progressGradient)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 34}`}
                    strokeDashoffset={`${2 * Math.PI * 34 * (1 - overallProgress / 100)}`}
                    className="transition-all duration-1500 ease-out"
                  />
                  <defs>
                    {/* Background gradient */}
                    <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(226, 232, 240)" />
                      <stop offset="100%" stopColor="rgb(203, 213, 225)" />
                    </linearGradient>
                    {/* Simple progress gradient */}
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                      <stop offset="100%" stopColor="rgb(147, 51, 234)" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* Enhanced Center Content - Compact Design */}
                <div className="absolute inset-2 flex flex-col items-center justify-center">
                  <div className="relative text-center">
                    <div className="font-display text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent leading-none">
                      {overallProgress}%
                    </div>
                    <div className="font-body text-xs text-content-secondary/70 mt-1 leading-none">
                      {overallProgress === 100 ? 'готово' : 'курсов'}
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
            {/* Center: Title and description */}
            <div className="space-y-1">
              <h3 className="font-display text-lg font-semibold text-content-primary leading-tight">Общий прогресс</h3>
              <p className="font-body text-sm text-content-secondary leading-normal">iOS разработка</p>
            </div>
              
            {/* Right side: Enhanced Achievement Level */}
            <div className="text-right space-y-2">
              {/* Animated Achievement Badge */}
              <div className="relative inline-block">
                <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${
                  overallProgress >= 80 ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                  overallProgress >= 60 ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
                  overallProgress >= 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' :
                  'bg-gradient-to-r from-gray-300 to-gray-400'
                }`}></div>
                
                <Badge className={`relative px-4 py-2 font-display font-bold text-sm border-2 transition-all duration-300 hover:scale-105 hover:rotate-1 ${
                  overallProgress >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-300 shadow-lg' :
                  overallProgress >= 60 ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-300 shadow-lg' :
                  overallProgress >= 40 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-yellow-300 shadow-lg' :
                  'bg-gradient-to-r from-gray-400 to-gray-500 text-white border-gray-300 shadow-md'
                }`} style={{
                  filter: overallProgress >= 80 ? 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))' :
                          overallProgress >= 60 ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.4))' :
                          overallProgress >= 40 ? 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.4))' :
                          'drop-shadow(0 0 4px rgba(156, 163, 175, 0.3))'
                }}>
                  <div className="flex items-center gap-2">
                    <div className={`text-lg ${
                      overallProgress >= 80 ? 'animate-bounce' :
                      overallProgress >= 60 ? 'animate-pulse' :
                      overallProgress >= 40 ? 'animate-ping' :
                      ''
                    }`} style={{animationDuration: '2s'}}>
                      {overallProgress >= 80 ? '👑' :
                       overallProgress >= 60 ? '🚀' :
                       overallProgress >= 40 ? '⭐' :
                       '🌱'}
                    </div>
                    <span className="font-display font-extrabold">
                      {overallProgress >= 80 ? 'iOS Мастер' :
                       overallProgress >= 60 ? 'Продвинутый' :
                       overallProgress >= 40 ? 'Развивающийся' :
                       'Новичок'}
                    </span>
                  </div>
                  
                  {/* Sparkle effects for high levels */}
                  {overallProgress >= 80 && (
                    <>
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
                      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                      <div className="absolute top-0 left-1/2 w-1 h-1 bg-yellow-200 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                    </>
                  )}
                </Badge>
              </div>
              
              {/* Progress status text */}
              <div className="space-y-1">
                <p className={`font-body text-xs font-semibold transition-colors duration-300 ${
                  overallProgress >= 80 ? 'text-green-600' :
                  overallProgress >= 60 ? 'text-blue-600' :
                  overallProgress >= 40 ? 'text-orange-600' :
                  'text-gray-600'
                }`}>
                  {overallProgress >= 80 ? 'Экспертный уровень' :
                   overallProgress >= 60 ? 'Уверенное развитие' :
                   overallProgress >= 40 ? 'Активное изучение' :
                   'Первые шаги'}
                </p>
                
                {/* Compact Next Level Indicator */}
                {overallProgress < 100 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <div className={`w-2 h-2 rounded-full ${
                        overallProgress >= 60 ? 'bg-blue-500' :
                        overallProgress >= 40 ? 'bg-orange-500' :
                        'bg-green-500'
                      } animate-pulse`}></div>
                      <span className="font-body text-content-secondary/80 font-medium">
                        {overallProgress < 40 ? `${40 - overallProgress}% до ⭐` :
                         overallProgress < 60 ? `${60 - overallProgress}% до 🚀` :
                         overallProgress < 80 ? `${80 - overallProgress}% до 👑` :
                         `${100 - overallProgress}% до 🏆`}
                      </span>
                    </div>
                    
                    {/* Elegant mini progress bar */}
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 relative ${
                          overallProgress >= 60 ? 'bg-gradient-to-r from-blue-400 to-purple-500' :
                          overallProgress >= 40 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                          'bg-gradient-to-r from-green-400 to-blue-500'
                        }`}
                        style={{ 
                          width: `${overallProgress < 40 ? (overallProgress / 40) * 100 :
                                  overallProgress < 60 ? ((overallProgress - 40) / 20) * 100 :
                                  overallProgress < 80 ? ((overallProgress - 60) / 20) * 100 :
                                  ((overallProgress - 80) / 20) * 100}%`
                        }}
                      >
                        {/* Subtle shimmer on mini progress */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Details */}
          <div className="space-y-3">
            {/* Enhanced Progress Bar */}
            <div className="relative">
              <div className="flex justify-between items-center mb-3">
                <span className="font-body text-sm font-medium text-content-primary">Завершено курсов</span>
                <span className="font-display text-sm font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {stats.completed} из {totalCourses}
                </span>
              </div>
              
              {/* Clean Progress Bar */}
              <div className="relative h-5 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
                {/* Subtle background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-full"></div>
                
                {/* Internal milestone markers - always visible */}
                <div className="absolute inset-0 flex items-center">
                  {[25, 50, 75].map((mark) => (
                    <div 
                      key={mark}
                      className="absolute flex flex-col items-center" 
                      style={{ left: `${mark}%`, transform: 'translateX(-50%)' }}
                    >
                      {/* Marker line */}
                      <div className="w-0.5 h-4 bg-white/50 rounded-full shadow-sm"></div>
                      {/* Milestone indicator */}
                      <div className="absolute -top-1 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
                    </div>
                  ))}
                </div>
                
                {/* Clean progress bar */}
                <div 
                  className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                  style={{ 
                    width: `${overallProgress}%`,
                    background: 'linear-gradient(90deg, rgb(59, 130, 246) 0%, rgb(99, 102, 241) 25%, rgb(168, 85, 247) 50%, rgb(147, 51, 234) 75%, rgb(236, 72, 153) 100%)'
                  }}
                >
                  {/* Subtle shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                  
                  {/* Enhanced milestone markers on progress */}
                  <div className="absolute inset-0 flex items-center">
                    {[25, 50, 75].map((mark) => (
                      <div 
                        key={mark}
                        className="absolute flex flex-col items-center transition-all duration-500" 
                        style={{ 
                          left: `${mark}%`, 
                          transform: 'translateX(-50%)',
                          opacity: overallProgress > mark ? 1 : 0
                        }}
                      >
                        {/* Enhanced marker line */}
                        <div className="w-0.5 h-4 bg-white/90 rounded-full shadow-md"></div>
                        {/* Completed milestone indicator */}
                        <div className="absolute -top-1 w-1.5 h-1.5 bg-white rounded-full shadow-lg animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Progress particles effect */}
                  {overallProgress > 20 && (
                    <div className="absolute inset-0">
                      <div 
                        className="absolute top-1/2 w-1 h-1 bg-white/80 rounded-full animate-ping"
                        style={{ 
                          left: '20%', 
                          transform: 'translateY(-50%)',
                          animationDelay: '0.5s',
                          animationDuration: '2s'
                        }}
                      ></div>
                      {overallProgress > 50 && (
                        <div 
                          className="absolute top-1/2 w-1 h-1 bg-white/70 rounded-full animate-ping"
                          style={{ 
                            left: '50%', 
                            transform: 'translateY(-50%)',
                            animationDelay: '1s',
                            animationDuration: '2.5s'
                          }}
                        ></div>
                      )}
                      {overallProgress > 75 && (
                        <div 
                          className="absolute top-1/2 w-1 h-1 bg-white/60 rounded-full animate-ping"
                          style={{ 
                            left: '75%', 
                            transform: 'translateY(-50%)',
                            animationDelay: '1.5s',
                            animationDuration: '3s'
                          }}
                        ></div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Simple progress indicator */}
                <div 
                  className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1500 ease-out" 
                  style={{ left: `${Math.max(overallProgress - 1, 0)}%` }}
                >
                  <div 
                    className="w-2 h-2 bg-white rounded-full shadow-md"
                    style={{
                      filter: 'drop-shadow(0 0 4px rgba(59, 130, 246, 0.6))'
                    }}
                  ></div>
                </div>
              </div>
              
              {/* Progress bar labels - single row only */}
              <div className="flex justify-between mt-2 text-xs text-body">
                <span className="text-xs">0%</span>
                <span className={`text-xs transition-colors duration-300 ${overallProgress >= 25 ? 'text-primary font-medium' : ''}`}>25%</span>
                <span className={`text-xs transition-colors duration-300 ${overallProgress >= 50 ? 'text-primary font-medium' : ''}`}>50%</span>
                <span className={`text-xs transition-colors duration-300 ${overallProgress >= 75 ? 'text-primary font-medium' : ''}`}>75%</span>
                <span className={`text-xs transition-colors duration-300 ${overallProgress >= 100 ? 'text-primary font-medium' : ''}`}>100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes border-breathing-calm {
          0%, 100% { 
            border-color: rgba(100, 116, 139, 0.15);
            transform: scale(1);
          }
          50% { 
            border-color: rgba(100, 116, 139, 0.35);
            transform: scale(1.02);
          }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        
        @keyframes background-wave {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        
        @keyframes progress-wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}