import { forwardRef, useEffect, useState, type HTMLAttributes } from 'react'
import { cn } from '../../utils/cn'
import type { ComponentWithSize, ComponentWithVariant } from '../../types'

// Dynamically import Prism with minimal language support
const loadPrism = async (language: string) => {
  try {
    const Prism = await import('prismjs')
    
    // Load only required languages for MiniApp: Swift and JSON
    if (language === 'swift') {
      await import('prismjs/components/prism-swift' as any)
    } else if (language === 'json') {
      await import('prismjs/components/prism-json' as any)
    }
    
    return Prism.default
  } catch (error) {
    console.warn('Failed to load Prism.js:', error)
    return null
  }
}

export interface CodeBlockProps
  extends Omit<HTMLAttributes<HTMLPreElement>, 'children'>,
          ComponentWithSize {
  code: string
  language?: string
  showLineNumbers?: boolean
  copyable?: boolean
  maxHeight?: string
  filename?: string
  highlight?: number[]
}

const codeBlockStyles = {
  base: [
    'font-mono text-sm overflow-auto',
    'bg-[var(--ds-surface-codeblock)]',
    'text-[var(--ds-content-codeblock)]',
    'border border-[var(--ds-border-subtle)]',
    'scrollbar-thin scrollbar-thumb-[var(--ds-border-default)] scrollbar-track-transparent'
  ],
  size: {
    xs: 'text-xs p-2',
    sm: 'text-sm p-3', 
    md: 'text-sm p-4',
    lg: 'text-base p-4',
    xl: 'text-lg p-5'
  }
}

const headerStyles = [
  'flex items-center justify-between',
  'px-4 py-2 text-xs font-medium',
  'bg-[var(--ds-surface-codeblock-header)]',
  'text-[var(--ds-content-secondary)]',
  'border-b border-[var(--ds-border-subtle)]'
]

const lineNumberStyles = [
  'inline-block w-8 text-right mr-4 select-none',
  'text-[var(--ds-content-tertiary)]'
]

const copyButtonStyles = [
  'p-1.5 rounded-md transition-colors',
  'text-[var(--ds-content-secondary)]',
  'hover:bg-[var(--ds-surface-subtle)]',
  'hover:text-[var(--ds-content-primary)]',
  'focus-visible:outline-none focus-visible:ring-2',
  'focus-visible:ring-[var(--ds-border-focus)]'
]

// Sanitize code to prevent XSS
const sanitizeCode = (code: string): string => {
  return code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/&/g, '&amp;')
}

// Get language name for display
const getLanguageDisplayName = (language?: string): string => {
  const languageMap: Record<string, string> = {
    'swift': 'Swift',
    'json': 'JSON'
  }
  
  return languageMap[language || ''] || language?.toUpperCase() || 'Code'
}

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ 
    className,
    code,
    language = 'text',
    showLineNumbers = false,
    copyable = true,
    maxHeight,
    filename,
    highlight = [],
    size = 'md',
    style,
    ...props
  }, ref) => {
    const [highlightedCode, setHighlightedCode] = useState<string>('')
    const [copied, setCopied] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      let isMounted = true
      
      const highlightCode = async () => {
        try {
          const Prism = await loadPrism(language)
          
          if (!isMounted) return
          
          if (Prism && Prism.languages[language]) {
            const highlighted = Prism.highlight(
              code,
              Prism.languages[language],
              language
            )
            setHighlightedCode(highlighted)
          } else {
            // Fallback to sanitized plain text if language not supported
            setHighlightedCode(sanitizeCode(code))
          }
        } catch (error) {
          console.warn('Code highlighting failed:', error)
          if (isMounted) {
            setHighlightedCode(sanitizeCode(code))
          }
        } finally {
          if (isMounted) {
            setIsLoading(false)
          }
        }
      }

      highlightCode()

      return () => {
        isMounted = false
      }
    }, [code, language])

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        console.warn('Failed to copy code:', error)
      }
    }

    const lines = code.split('\n')
    const hasHeader = filename || copyable

    return (
      <div 
        className={cn(
          'rounded-[var(--ds-radius-lg)] overflow-hidden',
          'bg-[var(--ds-surface-codeblock)]',
          className
        )}
        style={{ maxHeight, ...style }}
      >
        {hasHeader && (
          <div className={cn(headerStyles)}>
            <div className="flex items-center gap-2">
              {filename && (
                <span className="font-semibold text-[var(--ds-content-primary)]">
                  {filename}
                </span>
              )}
              <span className="text-[var(--ds-content-tertiary)]">
                {getLanguageDisplayName(language)}
              </span>
            </div>
            
            {copyable && (
              <button
                onClick={handleCopy}
                className={cn(copyButtonStyles)}
                aria-label={copied ? 'Copied!' : 'Copy code'}
                title={copied ? 'Copied!' : 'Copy code'}
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
        
        <pre
          ref={ref}
          className={cn(
            codeBlockStyles.base,
            codeBlockStyles.size[size],
            hasHeader && 'rounded-t-none'
          )}
          {...props}
        >
          {isLoading ? (
            <code className="text-[var(--ds-content-tertiary)]">Loading...</code>
          ) : showLineNumbers ? (
            <code>
              {lines.map((line, index) => {
                const lineNumber = index + 1
                const isHighlighted = highlight.includes(lineNumber)
                
                return (
                  <div
                    key={lineNumber}
                    className={cn(
                      isHighlighted && 'bg-[var(--ds-surface-codeblock-highlight)] -mx-4 px-4'
                    )}
                  >
                    <span className={cn(lineNumberStyles)}>
                      {lineNumber}
                    </span>
                    <span 
                      dangerouslySetInnerHTML={{
                        __html: highlightedCode.split('\n')[index] || ''
                      }}
                    />
                  </div>
                )
              })}
            </code>
          ) : (
            <code 
              dangerouslySetInnerHTML={{
                __html: highlightedCode
              }}
            />
          )}
        </pre>
      </div>
    )
  }
)

CodeBlock.displayName = 'CodeBlock'