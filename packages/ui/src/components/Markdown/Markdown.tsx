import { forwardRef, useMemo, type HTMLAttributes } from 'react'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'
import { cn } from '../../utils/cn'
import { CodeBlock } from '../CodeBlock'

export interface MarkdownProps extends HTMLAttributes<HTMLDivElement> {
  content: string
  allowedTags?: string[]
  allowedAttributes?: Record<string, string[]>
  enableCodeBlocks?: boolean
  enableLinks?: boolean
  maxLength?: number
  className?: string
}

// Default security configuration
const DEFAULT_ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'div', 'span', 'br',
  'strong', 'b', 'em', 'i', 'u', 'del', 'ins', 'mark',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'table', 'thead', 'tbody', 'tr', 'td', 'th',
  'img', 'a',
  'hr'
]

const DEFAULT_ALLOWED_ATTRIBUTES = {
  'a': ['href', 'title', 'target', 'rel'],
  'img': ['src', 'alt', 'title', 'width', 'height'],
  'pre': ['class'],
  'code': ['class'],
  '*': ['id', 'class', 'data-*']
}

// Secure sanitization using single layer
const sanitizeContent = (
  html: string, 
  allowedTags: string[], 
  allowedAttributes: Record<string, string[]>
): string => {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: {
      img: ['http', 'https', 'data'],
      a: ['http', 'https', 'mailto']
    },
    selfClosing: ['img', 'br', 'hr'],
    transformTags: {
      'a': (tagName, attribs) => ({
        tagName,
        attribs: {
          ...attribs,
          rel: 'noopener noreferrer',
          target: '_blank'
        }
      })
    },
    exclusiveFilter: (frame) => {
      // Block any javascript: or data: URLs in links
      if (frame.tag === 'a' && frame.attribs.href) {
        const href = frame.attribs.href.toLowerCase()
        return href.startsWith('javascript:') || href.startsWith('vbscript:')
      }
      return false
    }
  })
}

// Extract and replace code blocks with placeholders
const extractCodeBlocks = (content: string): { content: string; blocks: Array<{ language?: string; code: string }> } => {
  const blocks: Array<{ language?: string; code: string }> = []
  let blockIndex = 0
  
  const processedContent = content.replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, language, code) => {
    blocks.push({
      language: language || 'text',
      code: code.trim()
    })
    return `__CODE_BLOCK_${blockIndex++}__`
  })

  return { content: processedContent, blocks }
}

const markdownStyles = {
  base: [
    'prose prose-sm max-w-none',
    'text-[var(--ds-content-primary)]',
    '[&>*:first-child]:mt-0',
    '[&>*:last-child]:mb-0'
  ],
  headings: [
    '[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-[var(--ds-content-primary)] [&_h1]:mb-4',
    '[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[var(--ds-content-primary)] [&_h2]:mb-3',
    '[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--ds-content-primary)] [&_h3]:mb-2',
    '[&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-[var(--ds-content-secondary)] [&_h4]:mb-2',
    '[&_h5]:text-sm [&_h5]:font-medium [&_h5]:text-[var(--ds-content-secondary)] [&_h5]:mb-1',
    '[&_h6]:text-sm [&_h6]:font-medium [&_h6]:text-[var(--ds-content-tertiary)] [&_h6]:mb-1'
  ],
  text: [
    '[&_p]:mb-4 [&_p]:text-[var(--ds-content-primary)] [&_p]:leading-relaxed',
    '[&_strong]:font-semibold [&_strong]:text-[var(--ds-content-primary)]',
    '[&_em]:italic [&_em]:text-[var(--ds-content-secondary)]',
    '[&_del]:line-through [&_del]:text-[var(--ds-content-tertiary)]',
    '[&_mark]:bg-[var(--ds-surface-accent)] [&_mark]:text-[var(--ds-content-on-accent)] [&_mark]:px-1 [&_mark]:rounded-sm'
  ],
  lists: [
    '[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4',
    '[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4',
    '[&_li]:mb-1 [&_li]:text-[var(--ds-content-primary)]',
    '[&_ul_ul]:mt-2 [&_ol_ol]:mt-2'
  ],
  links: [
    '[&_a]:text-[var(--ds-content-accent)]',
    '[&_a]:underline [&_a]:underline-offset-2',
    '[&_a:hover]:text-[var(--ds-content-accent-hover)]',
    '[&_a:focus]:outline-none [&_a:focus]:ring-2 [&_a:focus]:ring-[var(--ds-border-focus)]'
  ],
  blockquote: [
    '[&_blockquote]:border-l-4 [&_blockquote]:border-[var(--ds-border-accent)]',
    '[&_blockquote]:pl-4 [&_blockquote]:py-2',
    '[&_blockquote]:bg-[var(--ds-surface-subtle)]',
    '[&_blockquote]:text-[var(--ds-content-secondary)]',
    '[&_blockquote]:italic [&_blockquote]:mb-4'
  ],
  code: [
    '[&_:not(pre)>code]:bg-[var(--ds-surface-code)]',
    '[&_:not(pre)>code]:text-[var(--ds-content-code)]',
    '[&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5',
    '[&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:text-sm',
    '[&_:not(pre)>code]:font-mono'
  ],
  table: [
    '[&_table]:w-full [&_table]:border-collapse [&_table]:mb-4',
    '[&_table]:border [&_table]:border-[var(--ds-border-default)]',
    '[&_th]:bg-[var(--ds-surface-subtle)] [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold',
    '[&_th]:border-b [&_th]:border-[var(--ds-border-default)]',
    '[&_td]:p-2 [&_td]:border-b [&_td]:border-[var(--ds-border-subtle)]',
    '[&_tr:last-child_td]:border-b-0'
  ],
  divider: [
    '[&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--ds-border-default)]',
    '[&_hr]:my-6 [&_hr]:mx-0'
  ]
}

export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(
  ({ 
    content,
    allowedTags = DEFAULT_ALLOWED_TAGS,
    allowedAttributes = DEFAULT_ALLOWED_ATTRIBUTES,
    enableCodeBlocks = true,
    enableLinks = true,
    maxLength,
    className,
    ...props
  }, ref) => {
    const processedContent = useMemo(() => {
      if (!content) return ''
      
      // Truncate content if maxLength is specified
      let processedText = maxLength && content.length > maxLength 
        ? content.substring(0, maxLength) + '...'
        : content
      
      let codeBlocks: Array<{ language?: string; code: string }> = []
      
      // Extract code blocks if enabled
      if (enableCodeBlocks) {
        const extracted = extractCodeBlocks(processedText)
        processedText = extracted.content
        codeBlocks = extracted.blocks
      }
      
      // Filter allowed tags based on settings
      const filteredTags = allowedTags.filter(tag => {
        if (!enableLinks && tag === 'a') return false
        if (!enableCodeBlocks && ['pre', 'code'].includes(tag)) return false
        return true
      })
      
      try {
        // Parse markdown to HTML
        const html = marked(processedText, {
          breaks: true,
          gfm: true
        })
        
        // Sanitize the HTML
        const sanitized = sanitizeContent(html, filteredTags, allowedAttributes)
        
        // Replace code block placeholders with actual CodeBlock components
        if (enableCodeBlocks && codeBlocks.length > 0) {
          let result = sanitized
          codeBlocks.forEach((block, index) => {
            const placeholder = `__CODE_BLOCK_${index}__`
            const codeBlockHtml = `<div data-code-block="${index}" data-language="${block.language || 'text'}" data-code="${encodeURIComponent(block.code)}"></div>`
            result = result.replace(placeholder, codeBlockHtml)
          })
          return { html: result, codeBlocks }
        }
        
        return { html: sanitized, codeBlocks }
      } catch (error) {
        console.error('Markdown processing failed:', error)
        // Fallback to plain text
        const escaped = processedText
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;')
        
        return { html: `<p>${escaped}</p>`, codeBlocks: [] }
      }
    }, [content, allowedTags, allowedAttributes, enableCodeBlocks, enableLinks, maxLength])
    
    return (
      <div
        className={cn(
          markdownStyles.base,
          markdownStyles.headings,
          markdownStyles.text,
          markdownStyles.lists,
          enableLinks && markdownStyles.links,
          markdownStyles.blockquote,
          markdownStyles.code,
          markdownStyles.table,
          markdownStyles.divider,
          className
        )}
        {...props}
        dangerouslySetInnerHTML={{ 
          __html: processedContent.html
        }}
        // Custom rendering for code blocks
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          
          // Replace code block placeholders with actual CodeBlock components
          if (node && enableCodeBlocks && processedContent.codeBlocks.length > 0) {
            const codeBlockElements = node.querySelectorAll('[data-code-block]')
            codeBlockElements.forEach((element, index) => {
              const codeIndex = parseInt(element.getAttribute('data-code-block') || '0')
              const language = element.getAttribute('data-language') || 'text'
              const code = decodeURIComponent(element.getAttribute('data-code') || '')
              
              if (processedContent.codeBlocks[codeIndex]) {
                // Create a temporary container for React rendering
                const container = document.createElement('div')
                element.replaceWith(container)
                
                // Note: This is a simplified approach. In a real implementation,
                // you might want to use a proper React portal or ref callback
                // to render the CodeBlock component properly
                container.innerHTML = `
                  <div class="my-4 rounded-lg border border-[var(--ds-border-subtle)] bg-[var(--ds-surface-codeblock)] overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-2 text-xs font-medium bg-[var(--ds-surface-codeblock-header)] text-[var(--ds-content-secondary)] border-b border-[var(--ds-border-subtle)]">
                      <span class="text-[var(--ds-content-tertiary)]">${language.toUpperCase()}</span>
                    </div>
                    <pre class="p-4 overflow-auto font-mono text-sm text-[var(--ds-content-codeblock)]"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                  </div>
                `
              }
            })
          }
        }}
      />
    )
  }
)

Markdown.displayName = 'Markdown'