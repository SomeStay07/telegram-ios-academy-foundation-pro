import { type VariantProps } from 'class-variance-authority'
import { quizItemVariants, questionVariants, optionVariants, resultVariants } from './QuizItemVariants'

/**
 * 🎯 QuizItem TypeScript Types
 * 
 * Модульный файл содержащий все типы для компонента викторины
 * Разделен из основного QuizItem.tsx для улучшения типизации
 */

/**
 * 🎯 Quiz Option Interface
 */
export interface QuizOption {
  /** Текст варианта ответа */
  text: string
  /** Уникальный идентификатор */
  id?: string
  /** Объяснение для этого варианта */
  explanation?: string
}

/**
 * 🎯 QuizItem Props Interface
 */
export interface QuizItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof quizItemVariants> {
  /** Текст вопроса */
  question: string
  /** Варианты ответов */
  options: (string | QuizOption)[]
  /** Индекс правильного ответа */
  correctIndex: number
  /** Общее объяснение */
  explanation?: string
  /** Показать результат сразу после ответа */
  showResultImmediately?: boolean
  /** Разрешить повторный ответ */
  allowRetry?: boolean
  /** Перемешать варианты ответов */
  shuffleOptions?: boolean
  /** Множественный выбор */
  multipleChoice?: boolean
  /** Правильные индексы для множественного выбора */
  correctIndexes?: number[]
  /** Функция при ответе */
  onAnswer?: (isCorrect: boolean, selectedIndex: number, selectedIndexes?: number[]) => void
  /** Функция при завершении */
  onComplete?: (isCorrect: boolean, attempts: number) => void
  /** Кастомные CSS классы */
  className?: string
  /** Отключить викторину */
  disabled?: boolean
  /** Тайм-аут для автоматического показа ответа (мс) */
  timeout?: number
}

/**
 * 🎨 Расширенные варианты типов
 */
export type QuizItemVariant = VariantProps<typeof quizItemVariants>['variant']
export type QuizItemSize = VariantProps<typeof quizItemVariants>['size'] 
export type QuizItemState = VariantProps<typeof quizItemVariants>['state']
export type QuestionSize = VariantProps<typeof questionVariants>['size']
export type OptionState = VariantProps<typeof optionVariants>['state']
export type ResultType = VariantProps<typeof resultVariants>['type']

/**
 * 📊 Типы состояний викторины
 */
export interface QuizState {
  /** Выбранный индекс для одиночного выбора */
  selectedIndex: number | null
  /** Выбранные индексы для множественного выбора */
  selectedIndexes: number[]
  /** Показать результат */
  showResult: boolean
  /** Количество попыток */
  attempts: number
  /** ID таймаута */
  timeoutId: NodeJS.Timeout | null
}

/**
 * 🎭 Типы действий для reducer
 */
export type QuizAction = 
  | { type: 'SELECT_OPTION'; index: number }
  | { type: 'SELECT_MULTIPLE'; indexes: number[] }
  | { type: 'SHOW_RESULT' }
  | { type: 'RETRY' }
  | { type: 'SET_TIMEOUT'; timeoutId: NodeJS.Timeout }
  | { type: 'CLEAR_TIMEOUT' }
  | { type: 'INCREMENT_ATTEMPTS' }

/**
 * 🔧 Утилитарные типы
 */
export type QuizElement = React.ElementRef<"div">
export type QuizRef = React.ForwardedRef<QuizElement>

/**
 * 📱 Типы для анимаций и переходов
 */
export interface QuizAnimation {
  /** Тип анимации */
  type: 'fade' | 'slide' | 'bounce' | 'shake'
  /** Длительность в миллисекундах */
  duration?: number
  /** Задержка в миллисекундах */
  delay?: number
}

/**
 * 🔊 Типы для accessibility
 */
export interface QuizA11y {
  /** Aria label для викторины */
  'aria-label'?: string
  /** Описание викторины */
  'aria-describedby'?: string
  /** Текущий вопрос */
  'aria-current'?: boolean | 'step'
  /** Живая область для объявления результатов */
  'aria-live'?: 'off' | 'polite' | 'assertive'
}

/**
 * ⚡ Типы для настроек викторины
 */
export interface QuizSettings {
  /** Показывать прогресс */
  showProgress?: boolean
  /** Показывать таймер */
  showTimer?: boolean
  /** Лимит времени в секундах */
  timeLimit?: number
  /** Перемешать варианты ответов */
  shuffleOptions?: boolean
  /** Разрешить пропуск вопросов */
  allowSkip?: boolean
  /** Показать объяснения */
  showExplanations?: boolean
}

/**
 * 📈 Типы для аналитики викторины
 */
export interface QuizAnalytics {
  /** Время начала */
  startTime?: Date
  /** Время окончания */
  endTime?: Date
  /** Время ответа в миллисекундах */
  responseTime?: number
  /** Количество попыток */
  attempts: number
  /** Правильность ответа */
  isCorrect: boolean
  /** Выбранные варианты */
  selectedOptions: number[]
}

/**
 * 🌟 Расширенные типы для сложных викторин
 */
export interface AdvancedQuizItemProps extends QuizItemProps {
  /** Настройки викторины */
  settings?: QuizSettings
  /** Callback для аналитики */
  onAnalytics?: (analytics: QuizAnalytics) => void
  /** Кастомные анимации */
  animations?: QuizAnimation[]
  /** Accessibility настройки */
  a11y?: QuizA11y
}

/**
 * 🏭 Типы для фабрики компонентов
 */
export interface QuizItemFactory {
  /** Создать обычную викторину */
  createStandard: (props: QuizItemProps) => React.ReactElement
  /** Создать множественный выбор */
  createMultiple: (props: Omit<QuizItemProps, 'multipleChoice'>) => React.ReactElement
  /** Создать викторину с таймером */
  createTimed: (props: QuizItemProps & { timeLimit: number }) => React.ReactElement
}

/**
 * 📝 Типы для валидации
 */
export interface QuizValidation {
  /** Валидация вопроса */
  validateQuestion: (question: string) => boolean
  /** Валидация опций */
  validateOptions: (options: (string | QuizOption)[]) => boolean
  /** Валидация правильных ответов */
  validateCorrectAnswers: (correctIndex: number, correctIndexes?: number[], optionsLength?: number) => boolean
}