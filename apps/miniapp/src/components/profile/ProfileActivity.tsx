import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

// Design System Components
import { Card } from '../../design-system/components/card/index'
import { Typography } from '../../design-system/components/typography/index'
import { Button } from '../../design-system/components/button/index'
import { Progress } from '../../design-system/components/progress/index'

interface ProfileActivityProps {
  itemVariants: any
}

export const ProfileActivity = React.memo(function ProfileActivity({ itemVariants }: ProfileActivityProps) {
  // Memoized skills data
  const skills = useMemo(() => [
    { name: 'React Hooks', progress: 85 },
    { name: 'TypeScript', progress: 70 },
    { name: 'Node.js', progress: 45 },
    { name: 'GraphQL', progress: 30 },
  ], [])

  // Memoized progress color calculation
  const getProgressColor = useMemo(() => (progress: number) => {
    return progress >= 70 ? '#10b981' : progress >= 40 ? '#f59e0b' : '#6366f1'
  }, [])

  return (
    <motion.div variants={itemVariants}>
      <Card className="p-6">
        
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex justify-between items-center">
              <Typography variant="body-md">{skill.name}</Typography>
              <div className="flex items-center gap-2">
                <Progress 
                  value={skill.progress} 
                  className="w-24"
                  style={{
                    '--progress-color': getProgressColor(skill.progress)
                  } as React.CSSProperties}
                />
                <Typography 
                  variant="caption-sm" 
                  color="muted"
                  style={{
                    fontFamily: 'var(--font-gaming)',
                    fontVariantNumeric: 'tabular-nums'
                  }}
                >
                  {skill.progress}%
                </Typography>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full mt-4">
          Посмотреть все навыки
        </Button>
      </Card>
    </motion.div>
  )
})