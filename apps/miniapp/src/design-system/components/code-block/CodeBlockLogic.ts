import React from 'react'
import { SupportedLanguage, CodeBlockState, CodeBlockAction } from './CodeBlockTypes'

/**
 * 🎯 CodeBlock Business Logic
 * 
 * Модульный файл содержащий всю бизнес-логику для компонента блока кода
 * Разделен из основного CodeBlock.tsx для улучшения читаемости и переиспользования
 */

/**
 * 🔧 Utility Functions
 */

/**
 * Получение отображаемого имени языка программирования
 */
export const getLanguageDisplayName = (language?: string): string => {
  const languageMap: Record<string, string> = {
    'js': 'JavaScript',
    'jsx': 'JSX',
    'ts': 'TypeScript',
    'tsx': 'TSX',
    'py': 'Python',
    'python': 'Python',
    'java': 'Java',
    'cpp': 'C++',
    'c': 'C',
    'cs': 'C#',
    'php': 'PHP',
    'rb': 'Ruby',
    'ruby': 'Ruby',
    'go': 'Go',
    'golang': 'Go',
    'rs': 'Rust',
    'rust': 'Rust',
    'swift': 'Swift',
    'kt': 'Kotlin',
    'kotlin': 'Kotlin',
    'scala': 'Scala',
    'html': 'HTML',
    'css': 'CSS',
    'scss': 'SCSS',
    'sass': 'Sass',
    'less': 'LESS',
    'stylus': 'Stylus',
    'json': 'JSON',
    'xml': 'XML',
    'yaml': 'YAML',
    'yml': 'YAML',
    'toml': 'TOML',
    'ini': 'INI',
    'md': 'Markdown',
    'markdown': 'Markdown',
    'sh': 'Shell',
    'bash': 'Bash',
    'zsh': 'Zsh',
    'fish': 'Fish',
    'powershell': 'PowerShell',
    'ps1': 'PowerShell',
    'sql': 'SQL',
    'mysql': 'MySQL',
    'postgresql': 'PostgreSQL',
    'sqlite': 'SQLite',
    'dockerfile': 'Dockerfile',
    'docker': 'Docker',
    'nginx': 'Nginx',
    'apache': 'Apache',
    'vim': 'Vim',
    'lua': 'Lua',
    'perl': 'Perl',
    'r': 'R',
    'matlab': 'MATLAB',
    'octave': 'Octave',
    'haskell': 'Haskell',
    'clojure': 'Clojure',
    'erlang': 'Erlang',
    'elixir': 'Elixir',
    'dart': 'Dart',
    'flutter': 'Flutter'
  }
  
  return languageMap[language?.toLowerCase() || ''] || language || 'Code'
}

/**
 * Добавление номеров строк к коду
 */
export const addLineNumbers = (code: string): string => {
  const lines = code.split('\n')
  const maxLineLength = lines.length.toString().length
  
  return lines
    .map((line, index) => {
      const lineNumber = (index + 1).toString().padStart(maxLineLength, ' ')
      return `${lineNumber} │ ${line}`
    })
    .join('\n')
}

/**
 * Копирование текста в буфер обмена
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback для старых браузеров
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.left = '-999999px'
      textArea.style.opacity = '0'
      textArea.setAttribute('aria-hidden', 'true')
      document.body.appendChild(textArea)
      textArea.select()
      textArea.setSelectionRange(0, 99999)
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (err) {
    console.warn('Failed to copy to clipboard:', err)
    return false
  }
}

/**
 * Парсинг строк для подсветки (например: "1,3-5,8")
 */
export const parseHighlightLines = (highlightLines: string): number[] => {
  if (!highlightLines.trim()) return []
  
  const lines: number[] = []
  const parts = highlightLines.split(',')
  
  for (const part of parts) {
    const trimmed = part.trim()
    if (trimmed.includes('-')) {
      // Диапазон строк (например: "3-5")
      const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()))
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          lines.push(i)
        }
      }
    } else {
      // Одиночная строка
      const lineNum = parseInt(trimmed)
      if (!isNaN(lineNum)) {
        lines.push(lineNum)
      }
    }
  }
  
  return [...new Set(lines)].sort((a, b) => a - b)
}

/**
 * Получение языка по расширению файла
 */
export const getLanguageFromFilename = (filename: string): string => {
  const extension = filename.split('.').pop()?.toLowerCase()
  
  const extensionMap: Record<string, string> = {
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'cc': 'cpp',
    'cxx': 'cpp',
    'c': 'c',
    'cs': 'cs',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'md': 'markdown',
    'sh': 'bash',
    'bash': 'bash',
    'zsh': 'zsh',
    'fish': 'fish',
    'sql': 'sql',
    'dockerfile': 'dockerfile',
    'vim': 'vim',
    'lua': 'lua',
    'pl': 'perl',
    'r': 'r'
  }
  
  return extensionMap[extension || ''] || 'text'
}

/**
 * Форматирование кода с базовой подсветкой синтаксиса
 */
export const formatCodeWithSyntaxHighlight = (code: string, language: string): string => {
  // Простая подсветка синтаксиса без внешних библиотек
  // В реальном проекте стоит использовать Prism.js или highlight.js
  
  const keywords: Record<string, string[]> = {
    javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export'],
    typescript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'import', 'export', 'interface', 'type'],
    python: ['def', 'class', 'import', 'from', 'return', 'if', 'elif', 'else', 'for', 'while', 'try', 'except'],
    java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'return', 'if', 'else'],
    go: ['func', 'var', 'const', 'type', 'struct', 'interface', 'package', 'import', 'return', 'if', 'else', 'for'],
    rust: ['fn', 'let', 'mut', 'const', 'struct', 'enum', 'impl', 'trait', 'use', 'mod', 'pub', 'return', 'if', 'else'],
  }
  
  const langKeywords = keywords[language] || []
  let highlightedCode = code
  
  // Подсветка ключевых слов
  langKeywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g')
    highlightedCode = highlightedCode.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`)
  })
  
  // Подсветка строк
  highlightedCode = highlightedCode.replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-400">$&</span>')
  
  // Подсветка чисел
  highlightedCode = highlightedCode.replace(/\b\d+\.?\d*\b/g, '<span class="text-orange-400">$&</span>')
  
  // Подсветка комментариев
  highlightedCode = highlightedCode.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="text-gray-500 italic">$&</span>')
  
  return highlightedCode
}

/**
 * 📊 Reducer для управления состоянием блока кода
 */
export const codeBlockReducer = (state: CodeBlockState, action: CodeBlockAction): CodeBlockState => {
  switch (action.type) {
    case 'SET_COPIED':
      return {
        ...state,
        copied: action.copied
      }
    
    case 'SELECT_LINE':
      return {
        ...state,
        selectedLine: action.lineNumber
      }
    
    case 'TOGGLE_EXPANDED':
      return {
        ...state,
        expanded: !state.expanded
      }
    
    case 'SET_FOCUSED':
      return {
        ...state,
        focused: action.focused
      }
    
    case 'RESET':
      return {
        copied: false,
        selectedLine: null,
        expanded: false,
        focused: false
      }
    
    default:
      return state
  }
}

/**
 * 🎯 Custom Hooks для работы с блоком кода
 */

/**
 * Основной хук для управления состоянием блока кода
 */
export const useCodeBlockState = () => {
  const [state, dispatch] = React.useReducer(codeBlockReducer, {
    copied: false,
    selectedLine: null,
    expanded: false,
    focused: false
  })

  const setCopied = React.useCallback((copied: boolean) => {
    dispatch({ type: 'SET_COPIED', copied })
  }, [])

  const selectLine = React.useCallback((lineNumber: number | null) => {
    dispatch({ type: 'SELECT_LINE', lineNumber })
  }, [])

  const toggleExpanded = React.useCallback(() => {
    dispatch({ type: 'TOGGLE_EXPANDED' })
  }, [])

  const setFocused = React.useCallback((focused: boolean) => {
    dispatch({ type: 'SET_FOCUSED', focused })
  }, [])

  const reset = React.useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  return {
    state,
    setCopied,
    selectLine,
    toggleExpanded,
    setFocused,
    reset
  }
}

/**
 * Хук для копирования с обратной связью
 */
export const useCopyToClipboard = (text: string, onCopy?: (text: string) => void) => {
  const [copied, setCopied] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const copy = React.useCallback(async () => {
    try {
      setError(null)
      const success = await copyToClipboard(text)
      
      if (success) {
        setCopied(true)
        onCopy?.(text)
        
        // Сброс состояния через 2 секунды
        setTimeout(() => setCopied(false), 2000)
      } else {
        setError('Не удалось скопировать')
      }
    } catch (err) {
      setError('Ошибка копирования')
      console.error('Copy error:', err)
    }
  }, [text, onCopy])

  return {
    copied,
    error,
    copy
  }
}

/**
 * Хук для работы с подсветкой строк
 */
export const useLineHighlight = (highlightLines?: string) => {
  const highlightedLines = React.useMemo(() => {
    return highlightLines ? parseHighlightLines(highlightLines) : []
  }, [highlightLines])

  const isLineHighlighted = React.useCallback((lineNumber: number) => {
    return highlightedLines.includes(lineNumber)
  }, [highlightedLines])

  return {
    highlightedLines,
    isLineHighlighted
  }
}

/**
 * Хук для keyboard navigation в блоке кода
 */
export const useCodeKeyboard = (
  onCopy?: () => void,
  onToggleExpand?: () => void,
  onSelectLine?: (line: number) => void
) => {
  const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    // Ctrl/Cmd + C для копирования
    if ((event.ctrlKey || event.metaKey) && event.key === 'c' && !event.shiftKey) {
      event.preventDefault()
      onCopy?.()
      return
    }

    // Ctrl/Cmd + A для выделения всего кода
    if ((event.ctrlKey || event.metaKey) && event.key === 'a') {
      event.preventDefault()
      const selection = window.getSelection()
      const range = document.createRange()
      const codeElement = event.currentTarget as HTMLElement
      range.selectNodeContents(codeElement)
      selection?.removeAllRanges()
      selection?.addRange(range)
      return
    }

    // Space для раскрытия/сворачивания
    if (event.key === ' ' && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault()
      onToggleExpand?.()
      return
    }

    // Enter для выбора строки
    if (event.key === 'Enter' && !event.ctrlKey && !event.metaKey) {
      event.preventDefault()
      // Определяем номер строки по позиции курсора
      const target = event.target as HTMLElement
      const text = target.textContent || ''
      const selectionStart = window.getSelection()?.anchorOffset || 0
      const textBeforeCursor = text.substring(0, selectionStart)
      const lineNumber = textBeforeCursor.split('\n').length
      onSelectLine?.(lineNumber)
      return
    }
  }, [onCopy, onToggleExpand, onSelectLine])

  return {
    handleKeyDown
  }
}

/**
 * Хук для автоматического определения языка
 */
export const useLanguageDetection = (code: string, filename?: string) => {
  const detectedLanguage = React.useMemo(() => {
    if (filename) {
      return getLanguageFromFilename(filename)
    }

    // Простое определение языка по содержимому
    const trimmedCode = code.trim()
    
    // HTML
    if (trimmedCode.startsWith('<!DOCTYPE') || trimmedCode.includes('<html>')) {
      return 'html'
    }
    
    // JSON
    if ((trimmedCode.startsWith('{') && trimmedCode.endsWith('}')) || 
        (trimmedCode.startsWith('[') && trimmedCode.endsWith(']'))) {
      try {
        JSON.parse(trimmedCode)
        return 'json'
      } catch {
        // Не JSON
      }
    }
    
    // JavaScript/TypeScript
    if (trimmedCode.includes('function') || trimmedCode.includes('=>') || 
        trimmedCode.includes('const ') || trimmedCode.includes('let ')) {
      if (trimmedCode.includes(': ') && trimmedCode.includes('interface ')) {
        return 'typescript'
      }
      return 'javascript'
    }
    
    // Python
    if (trimmedCode.includes('def ') || trimmedCode.includes('import ') || 
        trimmedCode.includes('print(')) {
      return 'python'
    }
    
    // CSS
    if (trimmedCode.includes('{') && trimmedCode.includes('}') && 
        trimmedCode.includes(':') && !trimmedCode.includes('function')) {
      return 'css'
    }
    
    return 'text'
  }, [code, filename])

  return detectedLanguage
}

/**
 * 🔧 Вспомогательные утилиты
 */

/**
 * Валидация номеров строк для подсветки
 */
export const validateHighlightLines = (highlightLines: string, totalLines: number): boolean => {
  const lines = parseHighlightLines(highlightLines)
  return lines.every(line => line >= 1 && line <= totalLines)
}

/**
 * Подсчет строк кода
 */
export const countLines = (code: string): number => {
  return code.split('\n').length
}

/**
 * Получение размера кода в байтах
 */
export const getCodeSize = (code: string): number => {
  return new Blob([code]).size
}

/**
 * Форматирование размера файла
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

/**
 * Определение, является ли код "длинным"
 */
export const isLongCode = (code: string, maxLines: number = 50): boolean => {
  return countLines(code) > maxLines
}

/**
 * Обрезка кода для превью
 */
export const truncateCode = (code: string, maxLines: number = 10): string => {
  const lines = code.split('\n')
  if (lines.length <= maxLines) return code
  
  return lines.slice(0, maxLines).join('\n') + '\n...'
}