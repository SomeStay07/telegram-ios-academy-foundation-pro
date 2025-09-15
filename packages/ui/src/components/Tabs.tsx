import React, { useState } from 'react'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  tabs: Tab[]
  defaultId?: string
  'aria-label'?: string
}

export const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultId, 
  'aria-label': ariaLabel = 'Tabs navigation' 
}) => {
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id)

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === tabId)
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
        setActive(tabs[prevIndex].id)
        break
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1
        setActive(tabs[nextIndex].id)
        break
      case 'Home':
        e.preventDefault()
        setActive(tabs[0].id)
        break
      case 'End':
        e.preventDefault()
        setActive(tabs[tabs.length - 1].id)
        break
    }
  }

  return (
    <div>
      <div 
        role="tablist" 
        aria-label={ariaLabel}
        style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-3)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            onClick={() => setActive(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
            style={{
              padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
              borderRadius: 'var(--ds-radius-lg)',
              border: active === tab.id 
                ? 'var(--ds-borderWidth-1) solid var(--color-primary)' 
                : 'var(--ds-borderWidth-1) solid var(--color-muted)',
              background: active === tab.id 
                ? 'var(--ds-color-palette-blue-50)' 
                : 'transparent',
              color: 'inherit',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all var(--ds-motion-duration-fast) ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={active !== tab.id}
            tabIndex={0}
          >
            {active === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}