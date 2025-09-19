import React, { useState } from 'react'
import { cn } from '../../../lib/utils'
import { Card } from '../Card'
import { Button } from '../Button'

// Импорты из модульной архитектуры
import { QuizItemProps } from './QuizItemTypes'
import { 
  quizItemVariants, 
  questionVariants, 
  optionVariants, 
  resultVariants 
} from './QuizItemVariants'
import { 
  normalizeOptions,
  shuffleArray,
  checkSingleAnswer,
  checkMultipleAnswer,
  getOptionState 
} from './QuizItemLogic'

/**
 * 🎨 Enhanced QuizItem Component - Модульная архитектура
 * 
 * Современный компонент викторины с полной поддержкой accessibility и анимаций.
 * Основан на лучших практиках enterprise-дизайн систем.
 * Размер компонента сокращен благодаря модульной архитектуре! 🎉
 * 
 * @example
 * // Базовое использование
 * <QuizItem 
 *   question="Что такое React?"
 *   options={["Библиотека", "Фреймворк", "Язык программирования"]}
 *   correctIndex={0}
 *   explanation="React - это JavaScript библиотека для создания пользовательских интерфейсов"
 * />
 * 
 * // С расширенными опциями
 * <QuizItem 
 *   question="Выберите все хуки React:"
 *   options={[
 *     { text: "useState", explanation: "Управляет состоянием компонента" },
 *     { text: "useEffect", explanation: "Выполняет побочные эффекты" },
 *     { text: "jQuery", explanation: "Это не хук React" }
 *   ]}
 *   multipleChoice
 *   correctIndexes={[0, 1]}
 *   onAnswer={(correct, _, indexes) => console.log('Ответ:', correct, indexes)}
 * />
 */
export const QuizItem = React.forwardRef<HTMLDivElement, QuizItemProps>(
  ({
    className,
    variant = "default",
    size = "md",
    state,
    question,
    options,
    correctIndex,
    correctIndexes,
    explanation,
    showResultImmediately = true,
    allowRetry = false,
    shuffleOptions = false,
    multipleChoice = false,
    onAnswer,
    onComplete,
    disabled = false,
    timeout,
    ...props
  }, ref) => {
    // Состояние компонента
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>([])
    const [showResult, setShowResult] = useState(false)
    const [attempts, setAttempts] = useState(0)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
    
    // Нормализация и перемешивание опций
    const [normalizedOptions] = useState(() => {
      const normalized = normalizeOptions(options)
      return shuffleOptions ? shuffleArray(normalized) : normalized
    })
    
    // Определение правильности ответа
    const isCorrect = multipleChoice
      ? checkMultipleAnswer(selectedIndexes, correctIndexes)
      : checkSingleAnswer(selectedIndex, correctIndex)
    
    // Определение состояния викторины
    const currentState = disabled 
      ? "disabled"
      : showResult 
        ? (isCorrect ? "correct" : "incorrect")
        : state || "unanswered"
    
    // Обработка выбора опции
    const handleOptionSelect = (index: number) => {
      if (disabled || (showResult && !allowRetry)) return
      
      if (multipleChoice) {
        const newSelection = selectedIndexes.includes(index)
          ? selectedIndexes.filter(i => i !== index)
          : [...selectedIndexes, index]
        setSelectedIndexes(newSelection)
      } else {
        setSelectedIndex(index)
        setAttempts(prev => prev + 1)
        
        if (showResultImmediately) {
          setShowResult(true)
          const correct = index === correctIndex
          onAnswer?.(correct, index)
          onComplete?.(correct, attempts + 1)
        } else {
          onAnswer?.(index === correctIndex, index)
        }
        
        // Установка таймаута для автоматического показа результата
        if (timeout && !showResultImmediately) {
          const id = setTimeout(() => {
            setShowResult(true)
            const correct = index === correctIndex
            onComplete?.(correct, attempts + 1)
          }, timeout)
          setTimeoutId(id)
        }
      }
    }
    
    // Обработка подтверждения ответа для множественного выбора
    const handleSubmit = () => {
      if (multipleChoice && selectedIndexes.length > 0) {
        setAttempts(prev => prev + 1)
        setShowResult(true)
        const correct = checkMultipleAnswer(selectedIndexes, correctIndexes)
        onAnswer?.(correct, -1, selectedIndexes)
        onComplete?.(correct, attempts + 1)
      }
    }
    
    // Сброс викторины
    const handleRetry = () => {
      setSelectedIndex(null)
      setSelectedIndexes([])
      setShowResult(false)
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(null)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          quizItemVariants({ variant, size, state: currentState }),
          className
        )}
        {...props}
      >
        <Card variant="default" className="w-full">
          {/* Вопрос */}
          <h3 className={cn(questionVariants({ size }))}>
            {question}
          </h3>
          
          {/* Варианты ответов */}
          <div className="space-y-3 mb-6">
            {normalizedOptions.map((option, index) => {
              const optionState = getOptionState(
                index, 
                showResult, 
                selectedIndex, 
                selectedIndexes, 
                correctIndex, 
                correctIndexes, 
                multipleChoice
              )
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionSelect(index)}
                  disabled={disabled || (showResult && !allowRetry)}
                  className={cn(optionVariants({ state: optionState }))}
                  aria-pressed={
                    multipleChoice 
                      ? selectedIndexes.includes(index)
                      : selectedIndex === index
                  }
                >
                  <div className="flex items-start gap-3">
                    {/* Индикатор выбора */}
                    <div className="flex-shrink-0 mt-0.5">
                      {multipleChoice ? (
                        <div className={cn(
                          "w-4 h-4 border-2 rounded",
                          selectedIndexes.includes(index)
                            ? "bg-indigo-500 border-indigo-500"
                            : "border-gray-300 dark:border-gray-600"
                        )}>
                          {selectedIndexes.includes(index) && (
                            <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      ) : (
                        <div className={cn(
                          "w-4 h-4 border-2 rounded-full",
                          selectedIndex === index
                            ? "bg-indigo-500 border-indigo-500 ring-2 ring-indigo-200 dark:ring-indigo-800"
                            : "border-gray-300 dark:border-gray-600"
                        )} />
                      )}
                    </div>
                    
                    {/* Текст опции */}
                    <div className="flex-1 text-left">
                      <div className="font-medium">{option.text}</div>
                      {showResult && option.explanation && (
                        <div className="text-sm opacity-75 mt-1">
                          {option.explanation}
                        </div>
                      )}
                    </div>
                    
                    {/* Иконка результата */}
                    {showResult && (
                      <div className="flex-shrink-0">
                        {(multipleChoice ? correctIndexes?.includes(index) : index === correctIndex) && (
                          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        )}
                        {showResult && (
                          multipleChoice 
                            ? (selectedIndexes.includes(index) && !correctIndexes?.includes(index))
                            : (index === selectedIndex && !isCorrect)
                        ) && (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
          
          {/* Кнопка подтверждения для множественного выбора */}
          {multipleChoice && !showResult && selectedIndexes.length > 0 && (
            <div className="mb-6">
              <Button 
                onClick={handleSubmit}
                disabled={disabled}
                variant="primary"
                size="md"
              >
                Подтвердить ответ
              </Button>
            </div>
          )}
          
          {/* Результат */}
          {showResult && (
            <div className={cn(
              resultVariants({ type: isCorrect ? "correct" : "incorrect" })
            )}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {isCorrect ? (
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="font-semibold mb-1">
                    {isCorrect ? 'Правильно!' : 'Неправильно'}
                  </div>
                  
                  {explanation && (
                    <div className="text-sm opacity-90">
                      {explanation}
                    </div>
                  )}
                  
                  {/* Кнопка повтора */}
                  {allowRetry && (
                    <button
                      onClick={handleRetry}
                      className="mt-3 text-sm font-medium hover:underline focus:outline-none"
                    >
                      Попробовать снова
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    )
  }
)

QuizItem.displayName = "QuizItem"

// Экспорт всех типов и утилит для удобства использования
export * from './QuizItemTypes'
export * from './QuizItemVariants' 
export * from './QuizItemLogic'