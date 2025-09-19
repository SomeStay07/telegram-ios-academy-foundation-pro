import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../design-system/components/card/index'
import { Typography } from '../design-system/components/typography/index'
import { Button } from '../design-system/components/button/index'
import { Progress } from '../design-system/components/progress/index'
import { Calendar, Clock, Trophy, Target, CheckCircle2 } from 'lucide-react'

export function ChallengePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <Typography variant="display-lg" className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Ежедневный вызов
          </Typography>
          <Typography variant="body-lg" color="muted" className="max-w-md mx-auto">
            Развивайте свои навыки каждый день с персональными заданиями
          </Typography>
        </motion.div>

        {/* Today's Challenge Card */}
        <motion.div variants={itemVariants} className="mb-6">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Typography variant="heading-lg" className="text-white font-bold mb-2">
                  Сегодняшний вызов
                </Typography>
                <div className="flex items-center text-blue-100 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  <Typography variant="body-sm" className="text-blue-100">
                    Осталось 8 часов 24 минуты
                  </Typography>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <Typography variant="body-lg" className="text-white/90 mb-4">
              Изучите основы React Hooks и создайте простой компонент с useState
            </Typography>
            
            <div className="mb-4">
              <div className="flex justify-between text-white/80 mb-2">
                <Typography variant="caption-md">Прогресс</Typography>
                <Typography variant="caption-md">3/5 задач</Typography>
              </div>
              <Progress 
                value={60} 
                className="bg-white/20" 
                style={{'--progress-color': '#ffffff'} as React.CSSProperties}
              />
            </div>
            
            <Button 
              variant="secondary" 
              size="lg"
              className="w-full bg-white text-blue-600 hover:bg-white/90 font-semibold"
            >
              Продолжить вызов
            </Button>
          </Card>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <Typography variant="heading-sm" className="font-bold">12</Typography>
            <Typography variant="caption-sm" color="muted">Выполнено</Typography>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <Typography variant="heading-sm" className="font-bold">7</Typography>
            <Typography variant="caption-sm" color="muted">Дней подряд</Typography>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <Typography variant="heading-sm" className="font-bold">850</Typography>
            <Typography variant="caption-sm" color="muted">XP за неделю</Typography>
          </Card>
        </motion.div>

        {/* Upcoming Challenges */}
        <motion.div variants={itemVariants}>
          <Typography variant="heading-lg" className="font-bold mb-4">
            Предстоящие вызовы
          </Typography>
          
          <div className="space-y-3">
            {[
              { day: 'Завтра', title: 'Освоение useEffect Hook', difficulty: 'Средний', color: 'yellow' },
              { day: 'Понедельник', title: 'Создание Custom Hook', difficulty: 'Сложный', color: 'red' },
              { day: 'Вторник', title: 'Оптимизация производительности', difficulty: 'Экспертный', color: 'purple' },
            ].map((challenge, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="body-md" className="font-medium mb-1">
                      {challenge.title}
                    </Typography>
                    <Typography variant="caption-sm" color="muted">
                      {challenge.day}
                    </Typography>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    challenge.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    challenge.color === 'red' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {challenge.difficulty}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}