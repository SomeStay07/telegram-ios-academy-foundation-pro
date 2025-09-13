import React, { Suspense, lazy } from 'react'

const UIShowcaseImpl = lazy(() => import('../pages/UIShowcasePage'))

const UIShowcaseFallback: React.FC = () => (
  <div className="p-6 max-w-4xl mx-auto">
    <div className="animate-pulse space-y-6">
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="flex space-x-2">
          <div className="h-8 bg-gray-200 rounded w-20"></div>
          <div className="h-8 bg-gray-200 rounded w-24"></div>
          <div className="h-8 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 text-sm">
        Loading UI Showcase...
      </div>
    </div>
  </div>
)

export const LazyUIShowcase: React.FC = () => (
  <Suspense fallback={<UIShowcaseFallback />}>
    <UIShowcaseImpl />
  </Suspense>
)