import React from 'react'
import { cn } from '../../../lib/utils'
import type { TabsProps } from './TabsTypes'
import { 
  tabsVariants, 
  tabListVariants, 
  tabButtonVariants, 
  tabContentVariants 
} from './TabsVariants'
import { 
  useTabs,
  createTabAccessibilityProps,
  createTabPanelAccessibilityProps,
  createTabListAccessibilityProps,
  renderBadge
} from './TabsLogic'

/**
 * 🎨 Enhanced Tabs Component
 * 
 * Современный компонент табов с полной поддержкой accessibility, анимаций и состояний.
 * Основан на лучших практиках enterprise-дизайн систем.
 * 
 * @example
 * // Базовое использование
 * <Tabs tabs={[
 *   { id: 'tab1', label: 'Таб 1', content: <div>Контент 1</div> },
 *   { id: 'tab2', label: 'Таб 2', content: <div>Контент 2</div> }
 * ]} />
 * 
 * // С иконками и вариантами
 * <Tabs 
 *   variant="card"
 *   tabVariant="pills"
 *   tabs={[
 *     { id: 'settings', label: 'Настройки', icon: <SettingsIcon />, content: <Settings /> },
 *     { id: 'profile', label: 'Профиль', icon: <UserIcon />, content: <Profile /> }
 *   ]}
 * />
 */
export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({
    className,
    variant = "default",
    size = "md",
    tabs,
    defaultTab,
    activeTab,
    onTabChange,
    tabVariant = "default",
    tabListClassName,
    contentClassName,
    ...props
  }, ref) => {
    const {
      currentActiveTab,
      activeTabData,
      handleTabChange
    } = useTabs(tabs, defaultTab, activeTab, onTabChange)

    const tabListAccessibilityProps = createTabListAccessibilityProps()

    return (
      <div
        ref={ref}
        className={cn(
          tabsVariants({ variant, size }),
          className
        )}
        {...props}
      >
        {/* Tab List */}
        <div
          className={cn(
            tabListVariants({ variant: tabVariant, size }),
            tabListClassName
          )}
          {...tabListAccessibilityProps}
        >
          {tabs.map((tab) => {
            const isSelected = currentActiveTab === tab.id
            const tabAccessibilityProps = createTabAccessibilityProps(
              tab.id,
              isSelected,
              tab.disabled
            )
            
            return (
              <button
                key={tab.id}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                className={cn(
                  tabButtonVariants({ variant: tabVariant, size })
                )}
                {...tabAccessibilityProps}
              >
                <div className="flex items-center gap-2">
                  {/* Иконка */}
                  {tab.icon && (
                    <span className="flex-shrink-0">
                      {tab.icon}
                    </span>
                  )}
                  
                  {/* Заголовок */}
                  <span>{tab.label}</span>
                  
                  {/* Значок */}
                  {renderBadge(tab.badge)}
                </div>
              </button>
            )
          })}
        </div>
        
        {/* Tab Content */}
        {activeTabData && (
          <div
            className={cn(
              tabContentVariants({ variant }),
              contentClassName
            )}
            {...createTabPanelAccessibilityProps(activeTabData.id)}
          >
            {activeTabData.content}
          </div>
        )}
      </div>
    )
  }
)

Tabs.displayName = "Tabs"