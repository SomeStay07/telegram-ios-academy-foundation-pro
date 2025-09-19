import React from 'react'
import { QuizOption, QuizState, QuizAction, QuizAnalytics } from './QuizItemTypes'

/**
 * 🎯 QuizItem Business Logic
 * 
 * Модульный файл содержащий всю бизнес-логику для компонента викторины
 * Разделен из основного QuizItem.tsx для улучшения читаемости и переиспользования
 */

/**
 * 🔧 Utility Functions
 */

/**
 * Нормализация опций викторины
 */
export const normalizeOptions = (options: (string | QuizOption)[]): QuizOption[] => {
  return options.map((option, index) => {
    if (typeof option === 'string') {
      return { text: option, id: `option-${index}` }
    }
    return { id: `option-${index}`, ...option }
  })
}

/**
 * Перемешивание массива (алгоритм Fisher-Yates)
 */
export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Проверка правильности ответа для одиночного выбора
 */
export const checkSingleAnswer = (
  selectedIndex: number | null,
  correctIndex: number
): boolean => {
  return selectedIndex !== null && selectedIndex === correctIndex
}

/**
 * Проверка правильности ответа для множественного выбора
 */
export const checkMultipleAnswer = (
  selectedIndexes: number[],
  correctIndexes?: number[]
): boolean => {
  if (!correctIndexes || selectedIndexes.length === 0) return false
  
  return selectedIndexes.every(i => correctIndexes.includes(i)) &&
         correctIndexes.every(i => selectedIndexes.includes(i))
}

/**
 * Определение состояния опции викторины
 */
export const getOptionState = (
  index: number,
  showResult: boolean,
  selectedIndex: number | null,
  selectedIndexes: number[],
  correctIndex: number,
  correctIndexes: number[] | undefined,
  multipleChoice: boolean
): 'default' | 'selected' | 'correct' | 'incorrect' | 'correctAnswer' => {
  if (!showResult) {
    if (multipleChoice) {
      return selectedIndexes.includes(index) ? "selected" : "default"
    }
    return selectedIndex === index ? "selected" : "default"
  }
  
  // Показываем результат
  if (multipleChoice) {
    if (correctIndexes?.includes(index)) {
      return "correctAnswer"
    }
    if (selectedIndexes.includes(index)) {
      return correctIndexes?.includes(index) ? "correct" : "incorrect"
    }
    return "default"
  } else {
    if (index === correctIndex) {
      return "correctAnswer"
    }
    if (index === selectedIndex) {
      return checkSingleAnswer(selectedIndex, correctIndex) ? "correct" : "incorrect"
    }
    return "default"
  }
}

/**
 * 📊 Reducer для управления состоянием викторины
 */
export const quizReducer = (state: QuizState, action: QuizAction): QuizState => {
  switch (action.type) {
    case 'SELECT_OPTION':
      return {
        ...state,
        selectedIndex: action.index,
        attempts: state.attempts + 1
      }
    
    case 'SELECT_MULTIPLE':
      return {
        ...state,
        selectedIndexes: action.indexes
      }
    
    case 'SHOW_RESULT':
      return {
        ...state,
        showResult: true,
        attempts: state.attempts + 1
      }
    
    case 'RETRY':
      return {
        ...state,
        selectedIndex: null,
        selectedIndexes: [],
        showResult: false,
        timeoutId: null
      }
    
    case 'SET_TIMEOUT':
      return {
        ...state,
        timeoutId: action.timeoutId
      }
    
    case 'CLEAR_TIMEOUT':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        ...state,
        timeoutId: null
      }
    
    case 'INCREMENT_ATTEMPTS':
      return {
        ...state,
        attempts: state.attempts + 1
      }
    
    default:
      return state
  }
}

/**
 * 🎯 Custom Hooks для работы с викториной
 */

/**
 * Основной хук для управления состоянием викторины
 */
export const useQuizState = (multipleChoice: boolean = false) => {
  const [state, dispatch] = React.useReducer(quizReducer, {
    selectedIndex: null,
    selectedIndexes: [],
    showResult: false,
    attempts: 0,
    timeoutId: null
  })

  const selectOption = React.useCallback((index: number) => {
    if (multipleChoice) {
      const newSelection = state.selectedIndexes.includes(index)
        ? state.selectedIndexes.filter(i => i !== index)
        : [...state.selectedIndexes, index]
      dispatch({ type: 'SELECT_MULTIPLE', indexes: newSelection })
    } else {
      dispatch({ type: 'SELECT_OPTION', index })
    }
  }, [multipleChoice, state.selectedIndexes])

  const showResult = React.useCallback(() => {
    dispatch({ type: 'SHOW_RESULT' })
  }, [])

  const retry = React.useCallback(() => {
    dispatch({ type: 'RETRY' })
  }, [])

  const setTimeout = React.useCallback((timeoutId: NodeJS.Timeout) => {
    dispatch({ type: 'SET_TIMEOUT', timeoutId })
  }, [])

  const clearTimeout = React.useCallback(() => {
    dispatch({ type: 'CLEAR_TIMEOUT' })
  }, [])

  return {
    state,
    selectOption,
    showResult,
    retry,
    setTimeout,
    clearTimeout
  }
}

/**
 * Хук для работы с таймером викторины
 */
export const useQuizTimer = (
  timeLimit?: number,
  onTimeUp?: () => void
) => {
  const [timeLeft, setTimeLeft] = React.useState(timeLimit || 0)
  const [isActive, setIsActive] = React.useState(false)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  const startTimer = React.useCallback(() => {
    if (!timeLimit) return
    setIsActive(true)
    setTimeLeft(timeLimit)
  }, [timeLimit])

  const stopTimer = React.useCallback(() => {
    setIsActive(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const resetTimer = React.useCallback(() => {
    stopTimer()
    setTimeLeft(timeLimit || 0)
  }, [timeLimit, stopTimer])

  React.useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsActive(false)
            onTimeUp?.()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, timeLeft, onTimeUp])

  return {
    timeLeft,
    isActive,
    startTimer,
    stopTimer,
    resetTimer,
    isWarning: timeLeft <= 30,
    isCritical: timeLeft <= 10
  }
}

/**
 * Хук для аналитики викторины
 */
export const useQuizAnalytics = () => {
  const [analytics, setAnalytics] = React.useState<QuizAnalytics>({
    attempts: 0,
    isCorrect: false,
    selectedOptions: []
  })

  const startAnalytics = React.useCallback(() => {
    setAnalytics(prev => ({
      ...prev,
      startTime: new Date()
    }))
  }, [])

  const recordAnswer = React.useCallback((
    isCorrect: boolean,
    selectedOptions: number[],
    attempts: number
  ) => {
    const endTime = new Date()
    const startTime = analytics.startTime
    const responseTime = startTime ? endTime.getTime() - startTime.getTime() : 0

    setAnalytics(prev => ({
      ...prev,
      endTime,
      responseTime,
      attempts,
      isCorrect,
      selectedOptions
    }))
  }, [analytics.startTime])

  const resetAnalytics = React.useCallback(() => {
    setAnalytics({
      attempts: 0,
      isCorrect: false,
      selectedOptions: []
    })
  }, [])

  return {
    analytics,
    startAnalytics,
    recordAnswer,
    resetAnalytics
  }
}

/**
 * Хук для keyboard navigation в викторине
 */
export const useQuizKeyboard = (
  optionsLength: number,
  onSelectOption: (index: number) => void,
  onSubmit?: () => void
) => {
  const [focusedIndex, setFocusedIndex] = React.useState(0)

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        setFocusedIndex(prev => (prev + 1) % optionsLength)
        break
      
      case 'ArrowUp':
        event.preventDefault()
        setFocusedIndex(prev => prev === 0 ? optionsLength - 1 : prev - 1)
        break
      
      case ' ':
      case 'Enter':
        event.preventDefault()
        onSelectOption(focusedIndex)
        break
      
      case 'Tab':
        if (event.shiftKey) {
          event.preventDefault()
          setFocusedIndex(prev => prev === 0 ? optionsLength - 1 : prev - 1)
        } else {
          event.preventDefault()
          setFocusedIndex(prev => (prev + 1) % optionsLength)
        }
        break
      
      case 'Escape':
        event.preventDefault()
        setFocusedIndex(0)
        break
        
      case 's':
      case 'S':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onSubmit?.()
        }
        break
    }
  }, [focusedIndex, optionsLength, onSelectOption, onSubmit])

  return {
    focusedIndex,
    setFocusedIndex,
    handleKeyDown
  }
}

/**
 * 🔧 Вспомогательные утилиты
 */

/**
 * Форматирование времени в читаемый вид
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

/**
 * Вычисление процента правильных ответов
 */
export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0
  return Math.round((correct / total) * 100)
}

/**
 * Получение случайного элемента из массива
 */
export const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)]
}

/**
 * Генерация уникального ID для викторины
 */
export const generateQuizId = (): string => {
  return `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Валидация данных викторины
 */
export const validateQuizData = (
  question: string,
  options: (string | QuizOption)[],
  correctIndex: number,
  correctIndexes?: number[]
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (!question.trim()) {
    errors.push('Вопрос не может быть пустым')
  }

  if (options.length < 2) {
    errors.push('Должно быть минимум 2 варианта ответа')
  }

  if (correctIndex < 0 || correctIndex >= options.length) {
    errors.push('Индекс правильного ответа выходит за границы массива вариантов')
  }

  if (correctIndexes) {
    const invalidIndexes = correctIndexes.filter(index => index < 0 || index >= options.length)
    if (invalidIndexes.length > 0) {
      errors.push('Некоторые индексы правильных ответов выходят за границы массива вариантов')
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}