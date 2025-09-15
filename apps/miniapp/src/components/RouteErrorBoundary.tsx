import React from 'react'
import { reportError, CriticalErrorType } from '../lib/error-monitoring'

export function RouteErrorBoundary({ error }: { error: any }) {
  React.useEffect(() => {
    // Report through centralized error monitoring
    reportError(
      CriticalErrorType.ROUTE_ERROR,
      error.message || String(error),
      {
        stack: error.stack,
        componentStack: error.componentStack,
        errorBoundary: 'RouteErrorBoundary'
      }
    )
  }, [error])

  return (
    <div 
      role="alert" 
      className="flex items-center justify-center min-h-[400px] p-4"
    >
      <div className="text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-lg font-semibold mb-2">Navigation Error</h2>
        <p className="text-gray-600 mb-4">
          Something went wrong while loading this page.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    </div>
  )
}