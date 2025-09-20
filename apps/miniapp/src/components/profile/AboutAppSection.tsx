import React from 'react'
import { motion } from 'framer-motion'
import { Info, ChevronRight, Smartphone, Code, Zap } from 'lucide-react'

// Design System Components
import { Card } from '../../design-system/components/card'
import { Typography } from '../../design-system/components/typography'
import { Button } from '../../design-system/components/button'

// Telegram Integration
import { getTelegramApi } from '../../lib/telegram/api'

interface AboutAppSectionProps {
  itemVariants: any
}

export function AboutAppSection({ itemVariants }: AboutAppSectionProps) {
  const telegramApi = getTelegramApi()

  const handleAboutClick = () => {
    // Haptic feedback
    try {
      if (telegramApi.isAvailable() && telegramApi.hapticFeedback) {
        telegramApi.hapticFeedback.impactOccurred('light')
      }
    } catch (error) {
      console.warn('Haptic feedback not available:', error)
    }
    
    // Use Telegram navigation instead of React Router
    try {
      if (telegramApi.isAvailable()) {
        const webApp = telegramApi.getWebApp()
        if (webApp?.openLink) {
          // Open in same window with proper navigation
          window.location.href = '/about'
        } else {
          // Fallback for development
          window.location.href = '/about'
        }
      } else {
        // Fallback for development
        window.location.href = '/about'
      }
    } catch (error) {
      console.warn('Telegram navigation not available, using fallback:', error)
      window.location.href = '/about'
    }
  }

  const currentVersion = "1.2.0" // TODO: Get from package.json or env

  return (
    <motion.div variants={itemVariants}>
      <Card className="p-6 border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <motion.button
          onClick={handleAboutClick}
          className="w-full text-left group"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* App Icon */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white" />
                </div>
              </div>

              {/* App Info */}
              <div className="flex-1">
                <Typography variant="heading-sm" className="font-bold text-foreground mb-1">
                  Telegram iOS Academy
                </Typography>
                <Typography variant="body-sm" className="text-muted-foreground mb-1">
                  Изучай iOS разработку интерактивно
                </Typography>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 bg-primary/10 rounded-md">
                    <Typography variant="caption-xs" className="text-primary font-medium">
                      v{currentVersion}
                    </Typography>
                  </div>
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  <Typography variant="caption-xs" className="text-muted-foreground">
                    Обновлено
                  </Typography>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <ChevronRight 
              className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
            />
          </div>

          {/* Features Preview */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg">
              <Smartphone className="w-4 h-4 text-primary" />
              <Typography variant="caption-sm" className="text-muted-foreground">
                SwiftUI
              </Typography>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg">
              <Code className="w-4 h-4 text-success" />
              <Typography variant="caption-sm" className="text-muted-foreground">
                UIKit
              </Typography>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg">
              <Zap className="w-4 h-4 text-warning" />
              <Typography variant="caption-sm" className="text-muted-foreground">
                Core Data
              </Typography>
            </div>
          </div>
        </motion.button>
      </Card>
    </motion.div>
  )
}