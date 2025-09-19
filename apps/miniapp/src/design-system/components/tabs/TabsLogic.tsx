import { useState } from 'react'
import type { TabItem } from './TabsTypes'

/**
 * 🎯 useTabs Hook - Логика управления табами
 */
export const useTabs = (
  tabs: TabItem[],
  defaultTab?: string,
  activeTab?: string,
  onTabChange?: (tabId: string) => void
) => {
  // Состояние для неконтролируемого режима
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || ''
  )
  
  // Определяем текущий активный таб
  const currentActiveTab = activeTab ?? internalActiveTab
  
  // Функция смены таба
  const handleTabChange = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId)
    } else {
      setInternalActiveTab(tabId)
    }
  }
  
  // Находим активный таб
  const activeTabData = tabs.find(tab => tab.id === currentActiveTab)

  return {
    currentActiveTab,
    activeTabData,
    handleTabChange
  }
}

/**
 * 🎯 Tab Accessibility Props
 */
export const createTabAccessibilityProps = (
  tabId: string,
  isSelected: boolean,
  isDisabled?: boolean
) => ({
  role: "tab" as const,
  "aria-selected": isSelected,
  "aria-controls": `tabpanel-${tabId}`,
  "data-selected": isSelected,
  disabled: isDisabled,
})

/**
 * 🎯 Tab Panel Accessibility Props
 */
export const createTabPanelAccessibilityProps = (tabId: string) => ({
  id: `tabpanel-${tabId}`,
  role: "tabpanel" as const,
  "aria-labelledby": `tab-${tabId}`,
})

/**
 * 🎯 Tab List Accessibility Props
 */
export const createTabListAccessibilityProps = () => ({
  role: "tablist" as const,
})

/**
 * 🎯 Badge Renderer
 */
export const renderBadge = (badge?: string | number) => {
  if (!badge) return null
  
  return (
    <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 text-xs font-medium bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full">
      {badge}
    </span>
  )
}