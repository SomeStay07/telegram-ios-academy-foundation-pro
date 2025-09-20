import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '../../design-system/components/card'
import { Typography } from '../../design-system/components/typography'
import { cn } from '../../lib/utils'

interface ProfileSectionProps {
  children: React.ReactNode
  title?: string
  icon?: React.ComponentType<{ className?: string }>
  className?: string
  itemVariants?: any
  variant?: 'default' | 'glass' | 'elevated'
}

export function ProfileSection({
  children,
  title,
  icon: Icon,
  className,
  itemVariants,
  variant = 'elevated'
}: ProfileSectionProps) {
  const content = (
    <Card 
      variant={variant} 
      className={cn("p-6 mb-6", className)}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon className="w-5 h-5 text-primary" />}
          <Typography variant="heading-lg" className="font-bold">
            {title}
          </Typography>
        </div>
      )}
      {children}
    </Card>
  )

  if (itemVariants) {
    return (
      <motion.div variants={itemVariants}>
        {content}
      </motion.div>
    )
  }

  return content
}