import React, { Suspense, lazy } from 'react'

// Lazy load CodeBlock with the heavy Prism dependency
const CodeBlockImpl = lazy(() => 
  import('@telegram-ios-academy/ui').then(module => ({ 
    default: module.CodeBlock 
  }))
)

// Lightweight fallback while CodeBlock loads
const CodeBlockFallback: React.FC<{ code: string; language?: string }> = ({ code, language }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs text-gray-500 uppercase">
        {language || 'Code'}
      </span>
      <span className="text-xs text-gray-400">Loading...</span>
    </div>
    <pre className="text-sm text-gray-800 whitespace-pre-wrap">
      <code>{code}</code>
    </pre>
  </div>
)

export interface LazyCodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  copyable?: boolean
  maxHeight?: string
  filename?: string
  highlight?: number[]
}

export const LazyCodeBlock: React.FC<LazyCodeBlockProps> = (props) => {
  return (
    <Suspense fallback={<CodeBlockFallback code={props.code} language={props.language} />}>
      <CodeBlockImpl {...props} />
    </Suspense>
  )
}