import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from '@tanstack/react-router'
import { TelegramHaptics, useTelegramAnimations } from '../../lib/telegram/animations'

interface TelegramPageTransitionProps {
  children: React.ReactNode
  className?: string
}

/**
 * Telegram-нативные page transitions с haptic feedback
 * Автоматически определяет направление перехода (вперед/назад)
 */
export const TelegramPageTransition: React.FC<TelegramPageTransitionProps> = ({ 
  children, 
  className = '' 
}) => {
  const location = useLocation()
  const { pageVariants, backVariants, platform, transition } = useTelegramAnimations()
  
  // Определение направления навигации
  const [isBackNavigation, setIsBackNavigation] = React.useState(false)
  
  useEffect(() => {
    // Проверяем, если это back navigation
    const isBack = window.history.state?.idx < (window.history.state?.previousIdx || 0)
    setIsBackNavigation(isBack)
    
    // Haptic feedback при переходе страниц
    TelegramHaptics.pageTransition()
  }, [location.pathname])

  const variants = isBackNavigation ? backVariants : pageVariants

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`telegram-page-transition ${className}`}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }}
        // Platform-specific optimizations
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * Компонент для секций внутри страницы
 */
export const TelegramSectionTransition: React.FC<{
  children: React.ReactNode
  delay?: number
  className?: string
}> = ({ children, delay = 0, className = '' }) => {
  const { listItemVariants } = useTelegramAnimations()

  return (
    <motion.div
      variants={listItemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      custom={delay}
      className={className}
      whileHover="hover"
      onHoverStart={() => TelegramHaptics.selection()}
    >
      {children}
    </motion.div>
  )
}

/**
 * Специальный wrapper для модалов в стиле Telegram
 */
export const TelegramModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}> = ({ isOpen, onClose, children, className = '' }) => {
  const { modalVariants, themeVariants } = useTelegramAnimations()
  
  useEffect(() => {
    if (isOpen) {
      TelegramHaptics.impact('light')
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`fixed bottom-0 left-0 right-0 z-50 ${className}`}
            style={{
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              ...themeVariants.dark // Адаптируется к теме
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}