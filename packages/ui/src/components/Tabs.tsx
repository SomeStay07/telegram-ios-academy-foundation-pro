import React, { useState } from 'react'
import { cn } from '../utils/cn'

export interface Tab {
  id: string
  label: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  defaultId?: string
  className?: string
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  'aria-label'?: string
}

export const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  defaultId, 
  className,
  variant = 'default',
  size = 'md',
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

  const getTabListStyles = () => {
    const baseStyles = "flex relative"
    
    switch (variant) {
      case 'pills':
        return cn(baseStyles, "bg-[var(--ds-color-bg-muted)] p-1 rounded-[var(--ds-radius-lg)] gap-[var(--ds-component-tabs-gap)]")
      case 'underline':
        return cn(baseStyles, "border-b border-[var(--ds-component-tabs-border)] gap-0")
      default:
        return cn(baseStyles, "gap-[var(--ds-spacing-2)]")
    }
  }

  const getTabStyles = (tab: Tab, isActive: boolean) => {
    const baseStyles = cn(
      "relative flex items-center justify-center gap-2 transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ds-component-tabs-focusRing)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ds-component-tabs-focusRingOffset)]",
      "disabled:pointer-events-none disabled:opacity-50",
      "font-[var(--ds-component-tabs-fontWeight)] text-[var(--ds-component-tabs-fontSize)] leading-[var(--ds-component-tabs-lineHeight)]",
      "duration-[var(--ds-motion-duration-fast)]",
      {
        'px-3 py-1.5 text-sm': size === 'sm',
        'px-4 py-2': size === 'md', 
        'px-5 py-2.5 text-base': size === 'lg'
      }
    )

    switch (variant) {
      case 'pills':
        return cn(
          baseStyles,
          "rounded-[var(--ds-radius-md)] flex-1",
          isActive 
            ? "bg-[var(--ds-component-tabs-bgActive)] text-[var(--ds-component-tabs-fgActive)] shadow-sm" 
            : "bg-[var(--ds-component-tabs-bg)] text-[var(--ds-component-tabs-fg)] hover:bg-[var(--ds-component-tabs-bgHover)] hover:text-[var(--ds-component-tabs-fgHover)]"
        )
      case 'underline':
        return cn(
          baseStyles,
          "border-b-2 rounded-none",
          isActive
            ? "border-[var(--ds-component-tabs-borderActive)] text-[var(--ds-component-tabs-fgActive)]"
            : "border-transparent text-[var(--ds-component-tabs-fg)] hover:text-[var(--ds-component-tabs-fgHover)] hover:border-[var(--ds-component-tabs-borderHover)]"
        )
      default:
        return cn(
          baseStyles,
          "rounded-[var(--ds-radius-lg)] border",
          isActive
            ? "bg-[var(--ds-color-primary-bg)] text-[var(--ds-color-primary-fgOnBg)] border-[var(--ds-color-primary-bg)] shadow-sm"
            : "bg-[var(--ds-component-tabs-bg)] text-[var(--ds-component-tabs-fg)] border-[var(--ds-component-tabs-border)] hover:bg-[var(--ds-component-tabs-bgHover)] hover:text-[var(--ds-component-tabs-fgHover)]"
        )
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div 
        role="tablist" 
        aria-label={ariaLabel}
        className={cn(getTabListStyles(), "mb-4")}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setActive(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              className={getTabStyles(tab, isActive)}
            >
              {tab.icon && (
                <span className="flex-shrink-0">
                  {tab.icon}
                </span>
              )}
              <span className="truncate">{tab.label}</span>
            </button>
          )
        })}
      </div>
      
      <div className="relative">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`panel-${tab.id}`}
            aria-labelledby={`tab-${tab.id}`}
            hidden={active !== tab.id}
            tabIndex={0}
            className={cn(
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              active === tab.id ? "block" : "hidden"
            )}
          >
            {active === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}