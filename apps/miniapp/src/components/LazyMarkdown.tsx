import React, { Suspense, lazy } from 'react'

import { lazyImport } from '../utils/lazyImport'

// Lazy load Markdown with the heavy sanitize-html dependency
const MarkdownImpl = lazy(() => 
  lazyImport(() => import(/* @vite-ignore */ '@telegram-ios-academy/ui'))().then(module => ({ 
    default: module.Markdown 
  }))
)

// Lightweight fallback while Markdown loads
const MarkdownFallback: React.FC<{ content: string }> = ({ content }) => (
  <div className="prose prose-sm max-w-none">
    <div className="text-gray-400 text-sm mb-2">Loading content...</div>
    <div className="whitespace-pre-wrap text-gray-600">
      {content.substring(0, 200)}{content.length > 200 ? '...' : ''}
    </div>
  </div>
)

export interface LazyMarkdownProps {
  content: string
  allowedTags?: string[]
  allowedAttributes?: Record<string, string[]>
  enableCodeBlocks?: boolean
  enableLinks?: boolean
  maxLength?: number
  className?: string
}

export const LazyMarkdown: React.FC<LazyMarkdownProps> = (props) => {
  return (
    <Suspense fallback={<MarkdownFallback content={props.content} />}>
      <MarkdownImpl {...props} />
    </Suspense>
  )
}