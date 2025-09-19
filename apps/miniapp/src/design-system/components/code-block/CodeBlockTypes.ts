import { type VariantProps } from 'class-variance-authority'
import { codeBlockVariants, codeContentVariants, headerVariants } from './CodeBlockVariants'

/**
 * 🎯 CodeBlock TypeScript Types
 * 
 * Модульный файл содержащий все типы для компонента блока кода
 * Разделен из основного CodeBlock.tsx для улучшения типизации
 */

/**
 * 🎯 CodeBlock Props Interface
 */
export interface CodeBlockProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof codeBlockVariants> {
  /** Код для отображения */
  code: string
  /** Язык программирования */
  language?: string
  /** Заголовок блока кода */
  title?: string
  /** Показать номера строк */
  showLineNumbers?: boolean
  /** Включить копирование */
  copyable?: boolean
  /** Максимальная высота */
  maxHeight?: string | number
  /** Подсветка конкретных строк (например: "1,3-5,8") */
  highlightLines?: string
  /** Кастомные CSS классы */
  className?: string
  /** Показать язык в заголовке */
  showLanguage?: boolean
  /** Функция при копировании */
  onCopy?: (code: string) => void
  /** Функция при выборе строки */
  onLineSelect?: (lineNumber: number) => void
  /** Режим только для чтения */
  readOnly?: boolean
  /** Включить перенос строк */
  wrapLines?: boolean
}

/**
 * 🎨 Расширенные варианты типов
 */
export type CodeBlockTheme = VariantProps<typeof codeBlockVariants>['theme']
export type CodeBlockSize = VariantProps<typeof codeBlockVariants>['size']
export type CodeBlockVariant = VariantProps<typeof codeBlockVariants>['variant']
export type CodeBlockShowLineNumbers = VariantProps<typeof codeBlockVariants>['showLineNumbers']

/**
 * 🔧 Утилитарные типы
 */
export type CodeBlockElement = React.ElementRef<"div">
export type CodeBlockRef = React.ForwardedRef<CodeBlockElement>

/**
 * 📊 Типы языков программирования
 */
export type SupportedLanguage = 
  | 'javascript' | 'js'
  | 'typescript' | 'ts' 
  | 'jsx' | 'tsx'
  | 'python' | 'py'
  | 'java'
  | 'cpp' | 'c++'
  | 'c' | 'cs'
  | 'php'
  | 'ruby' | 'rb'
  | 'go'
  | 'rust' | 'rs'
  | 'swift'
  | 'kotlin' | 'kt'
  | 'scala'
  | 'html'
  | 'css' | 'scss' | 'less'
  | 'json'
  | 'xml'
  | 'yaml' | 'yml'
  | 'markdown' | 'md'
  | 'shell' | 'sh' | 'bash' | 'zsh' | 'fish'
  | 'sql'
  | 'dockerfile'
  | 'nginx'
  | 'apache'

/**
 * 🎨 Типы тем оформления
 */
export interface CodeTheme {
  /** Название темы */
  name: string
  /** Цвета фона */
  background: {
    primary: string
    secondary: string
    header: string
  }
  /** Цвета текста */
  text: {
    primary: string
    secondary: string
    comment: string
    keyword: string
    string: string
    number: string
    function: string
  }
  /** Цвета границ */
  border: {
    primary: string
    secondary: string
  }
}

/**
 * 📱 Типы для подсветки синтаксиса
 */
export interface SyntaxHighlight {
  /** Тип токена */
  type: 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'variable' | 'operator'
  /** Начальная позиция */
  start: number
  /** Конечная позиция */
  end: number
  /** Цвет */
  color?: string
  /** CSS классы */
  className?: string
}

/**
 * 🔧 Типы настроек
 */
export interface CodeBlockSettings {
  /** Размер табуляции */
  tabSize?: number
  /** Использовать пробелы вместо табов */
  insertSpaces?: boolean
  /** Автозавершение скобок */
  autoClosingBrackets?: boolean
  /** Автоотступы */
  autoIndent?: boolean
  /** Подсветка парных скобок */
  matchBrackets?: boolean
  /** Показать невидимые символы */
  renderWhitespace?: boolean
}

/**
 * ⚡ Типы событий
 */
export interface CodeBlockEvents {
  /** Копирование кода */
  onCopy?: (code: string) => void
  /** Выбор строки */
  onLineSelect?: (lineNumber: number) => void
  /** Изменение кода (если редактируемый) */
  onChange?: (code: string) => void
  /** Фокус */
  onFocus?: () => void
  /** Потеря фокуса */
  onBlur?: () => void
  /** Нажатие клавиши */
  onKeyDown?: (event: React.KeyboardEvent) => void
}

/**
 * 📊 Типы состояний
 */
export interface CodeBlockState {
  /** Скопирован ли код */
  copied: boolean
  /** Выбранная строка */
  selectedLine: number | null
  /** Развернут ли код */
  expanded: boolean
  /** В фокусе ли */
  focused: boolean
}

/**
 * 🎭 Типы действий для reducer
 */
export type CodeBlockAction = 
  | { type: 'SET_COPIED'; copied: boolean }
  | { type: 'SELECT_LINE'; lineNumber: number | null }
  | { type: 'TOGGLE_EXPANDED' }
  | { type: 'SET_FOCUSED'; focused: boolean }
  | { type: 'RESET' }

/**
 * 🔊 Типы для accessibility
 */
export interface CodeBlockA11y {
  /** Aria label */
  'aria-label'?: string
  /** Описание кода */
  'aria-describedby'?: string
  /** Язык программирования */
  'aria-roledescription'?: string
  /** Живая область для объявления изменений */
  'aria-live'?: 'off' | 'polite' | 'assertive'
}

/**
 * 📏 Типы размеров и позиционирования
 */
export interface CodeBlockDimensions {
  /** Ширина */
  width?: string | number
  /** Высота */
  height?: string | number
  /** Минимальная высота */
  minHeight?: string | number
  /** Максимальная высота */
  maxHeight?: string | number
  /** Минимальная ширина */
  minWidth?: string | number
  /** Максимальная ширина */
  maxWidth?: string | number
}

/**
 * 🎪 Типы для анимаций
 */
export interface CodeBlockAnimation {
  /** Тип анимации */
  type: 'typing' | 'fade' | 'highlight' | 'slide'
  /** Длительность в миллисекундах */
  duration?: number
  /** Задержка в миллисекундах */
  delay?: number
  /** Повторения */
  iterations?: number | 'infinite'
}

/**
 * 🏭 Типы для фабрики компонентов
 */
export interface CodeBlockFactory {
  /** Создать простой блок кода */
  createSimple: (code: string, language?: string) => React.ReactElement
  /** Создать блок с заголовком */
  createWithHeader: (code: string, title: string, language?: string) => React.ReactElement
  /** Создать редактируемый блок */
  createEditable: (code: string, onChange: (code: string) => void) => React.ReactElement
  /** Создать блок с подсветкой строк */
  createWithHighlight: (code: string, highlightLines: string) => React.ReactElement
}

/**
 * 📝 Типы для валидации
 */
export interface CodeBlockValidation {
  /** Валидация кода */
  validateCode: (code: string) => boolean
  /** Валидация языка */
  validateLanguage: (language: string) => boolean
  /** Валидация подсветки строк */
  validateHighlightLines: (highlightLines: string, totalLines: number) => boolean
}

/**
 * 🔍 Типы для поиска
 */
export interface CodeBlockSearch {
  /** Поисковый запрос */
  query: string
  /** Результаты поиска */
  matches: Array<{
    line: number
    column: number
    length: number
  }>
  /** Текущий результат */
  currentMatch: number
  /** Опции поиска */
  options: {
    caseSensitive?: boolean
    wholeWord?: boolean
    regex?: boolean
  }
}

/**
 * 📈 Типы для производительности
 */
export interface CodeBlockPerformance {
  /** Виртуализация для больших файлов */
  virtualized?: boolean
  /** Размер окна виртуализации */
  windowSize?: number
  /** Ленивая загрузка подсветки */
  lazyHighlight?: boolean
  /** Дебаунс для изменений */
  debounceMs?: number
}