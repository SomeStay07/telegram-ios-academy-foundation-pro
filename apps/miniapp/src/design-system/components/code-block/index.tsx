import React, { useState } from 'react'
import { cn } from '../../../lib/utils'

// Импорты из модульной архитектуры
import { CodeBlockProps } from './CodeBlockTypes'
import { 
  codeBlockVariants, 
  codeContentVariants, 
  headerVariants,
  copyButtonVariants,
  terminalDotsVariants
} from './CodeBlockVariants'
import { 
  getLanguageDisplayName,
  addLineNumbers,
  useCopyToClipboard
} from './CodeBlockLogic'

/**
 * 🎨 Enhanced CodeBlock Component - Модульная архитектура
 * 
 * Современный блок кода с подсветкой синтаксиса, копированием и accessibility.
 * Основан на лучших практиках enterprise-дизайн систем.
 * Размер компонента сокращен благодаря модульной архитектуре! 🎉
 * 
 * @example
 * // Базовое использование
 * <CodeBlock code="console.log('Hello, World!')" language="javascript" />
 * 
 * // С заголовком и копированием
 * <CodeBlock 
 *   title="API Response"
 *   code={jsonData}
 *   language="json"
 *   copyable
 *   theme="github"
 * />
 * 
 * // С номерами строк
 * <CodeBlock 
 *   code={longCode}
 *   language="typescript"
 *   showLineNumbers
 *   maxHeight={400}
 * />
 */
export const CodeBlock = React.forwardRef<HTMLDivElement, CodeBlockProps>(
  ({
    className,
    theme = "dark",
    size = "md",
    variant = "default",
    code,
    language,
    title,
    showLineNumbers = false,
    copyable = true,
    maxHeight,
    highlightLines,
    showLanguage = true,
    onCopy,
    ...props
  }, ref) => {
    // Использование хука для копирования
    const { copied, copy } = useCopyToClipboard(code, onCopy)
    
    // Подготовка кода для отображения
    const displayCode = showLineNumbers ? addLineNumbers(code) : code
    
    // Определение заголовка
    const hasHeader = title || showLanguage || copyable
    const displayTitle = title || (showLanguage ? getLanguageDisplayName(language) : '')

    return (
      <div
        ref={ref}
        className={cn(
          codeBlockVariants({ theme, size, variant, showLineNumbers }),
          className
        )}
        style={{
          maxHeight: maxHeight ? (typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight) : undefined
        }}
        {...props}
      >
        {/* Header */}
        {hasHeader && (
          <div className={cn(headerVariants({ theme }))}>
            <div className="flex items-center gap-3">
              {/* Terminal Dots (macOS style) */}
              <div className={cn(terminalDotsVariants())}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              
              {/* Title/Language */}
              {displayTitle && (
                <span className="text-sm font-medium text-gray-300 dark:text-gray-400">
                  {displayTitle}
                </span>
              )}
            </div>
            
            {/* Copy Button */}
            {copyable && (
              <button
                onClick={copy}
                className={cn(
                  copyButtonVariants({ 
                    theme, 
                    state: copied ? "copied" : "default" 
                  })
                )}
                aria-label="Копировать код"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Скопировано
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Копировать
                  </>
                )}
              </button>
            )}
          </div>
        )}
        
        {/* Code Content */}
        <div className="relative">
          <pre 
            className={cn(
              codeContentVariants({ showLineNumbers }),
              size === 'xs' ? 'p-2' : 
              size === 'sm' ? 'p-3' : 
              size === 'lg' ? 'p-6' : 
              size === 'xl' ? 'p-8' : 'p-4'
            )}
            style={{
              maxHeight: maxHeight && hasHeader 
                ? `calc(${typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight} - 60px)` 
                : undefined
            }}
          >
            <code className="text-inherit">
              {displayCode}
            </code>
          </pre>
          
          {/* Gradient overlay for long content */}
          {maxHeight && (
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-current opacity-10 pointer-events-none"></div>
          )}
        </div>
      </div>
    )
  }
)

CodeBlock.displayName = "CodeBlock"

// Экспорт всех типов и утилит для удобства использования
export * from './CodeBlockTypes'
export * from './CodeBlockVariants' 
export * from './CodeBlockLogic'