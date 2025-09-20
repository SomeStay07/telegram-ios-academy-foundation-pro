import React, { useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Code, Hash, User, Terminal, Coffee } from 'lucide-react'

// Design System Components
import { Typography } from '../../design-system/components/typography/index'
import { Button } from '../../design-system/components/button/index'

// Design Tokens
import { Z_INDEX, ANIMATION, SIZE } from '../../shared/constants/design-tokens'

interface UsernameModalProps {
  isOpen: boolean
  onClose: () => void
  username: string
  displayName: string
}

// Memoized programmer facts generator
const generateProgrammerFacts = (username: string, displayName: string) => {
  const length = username.length
  const firstChar = username[0].toLowerCase()
  const lastChar = username[username.length - 1].toLowerCase()
  const hasNumbers = /\d/.test(username)
  const hasUnderscores = username.includes('_')
  const capitalLetters = username.match(/[A-Z]/g)?.length || 0
  
  const facts = [
    {
      icon: Hash,
      title: "Username Analysis",
      content: `Длина: ${length} символов. ${hasNumbers ? 'Содержит цифры - признак системного мышления!' : 'Без цифр - минималистичный подход!'}`
    },
    {
      icon: Code,
      title: "Кодовое имя",
      content: `В hex: ${username.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('').toUpperCase()}. В ASCII сумма: ${username.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)}`
    },
    {
      icon: Terminal,
      title: "Командная строка",
      content: `$ whoami\n${username}\n$ echo "${displayName}" | wc -c\n${displayName.length + 1}`
    },
    {
      icon: User,
      title: "Dev Profile",
      content: `${hasUnderscores ? 'snake_case стиль - Python developer vibes 🐍' : 'camelCase подход - JavaScript energy ⚡'}`
    },
    {
      icon: Coffee,
      title: "Статистика кода",
      content: `Потенциальных багов в нике: ${Math.max(0, length - 8)}. Читаемость: ${length <= 12 ? 'Отлично' : length <= 20 ? 'Хорошо' : 'Рефакторинг не помешает'} 📊`
    }
  ]

  // Add special facts based on username characteristics
  if (firstChar === lastChar) {
    facts.push({
      icon: Code,
      title: "Симметрия",
      content: `Ник начинается и заканчивается на "${firstChar}" - признак внимания к деталям! 🎯`
    })
  }

  if (capitalLetters > 0) {
    facts.push({
      icon: Terminal,
      title: "CamelCase Detected",
      content: `${capitalLetters} заглавных букв найдено. Явно JavaScript/TypeScript разработчик! 🚀`
    })
  }

  return facts.slice(0, 4) // Show 4 most interesting facts
}

export const UsernameModal = React.memo(function UsernameModal({ isOpen, onClose, username, displayName }: UsernameModalProps) {
  // Memoized facts calculation - only recalculates when username/displayName changes
  const facts = useMemo(() => generateProgrammerFacts(username, displayName), [username, displayName])

  // Memoized close handler
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[${Z_INDEX.SYSTEM_MODAL}]`}
          onClick={onClose}
        >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", ...ANIMATION.SPRING.GENTLE }}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl ${SIZE.MODAL.MAX_WIDTH} w-full ${SIZE.MODAL.PADDING.MOBILE} ${SIZE.MODAL.PADDING.DESKTOP} ${SIZE.MODAL.MAX_HEIGHT} overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-indigo-800 p-6 text-white">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: ANIMATION.DURATION.NORMAL / 1000, type: "spring", ...ANIMATION.SPRING.GENTLE }}
                className="mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Hash className="w-6 h-6" />
                  </div>
                  <div>
                    <Typography variant="heading-lg" className="font-bold text-white">
                      @{username}
                    </Typography>
                    <Typography variant="body-sm" className="text-indigo-200">
                      Developer Analysis
                    </Typography>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Facts */}
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * ANIMATION.STAGGER.ITEMS, duration: ANIMATION.DURATION.SLOW / 1000 }}
                  className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:scale-[1.02]"
                >
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
                    <fact.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <Typography variant="body-md" className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {fact.title}
                    </Typography>
                    <Typography variant="body-sm" className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                      {fact.content}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: ANIMATION.DURATION.NORMAL * 2 / 1000 }}
              >
                <Button
                  onClick={handleClose}
                  variant="primary"
                  className="w-full"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  exit(0) // Закрыть
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
})