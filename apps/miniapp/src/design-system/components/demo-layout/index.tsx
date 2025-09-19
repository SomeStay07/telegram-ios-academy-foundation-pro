import React from 'react'
import { cn } from '../../../lib/utils'

// Импорты модулей
import { demoSectionVariants, demoComponentVariants, demoGridVariants } from './DemoLayoutVariants'
import {
  type DemoSectionProps,
  type DemoComponentProps,
  type DemoGridProps,
  type ButtonDemoProps,
  type FormDemoProps,
  type TwoColumnGridProps,
  type FourColumnGridProps
} from './DemoLayoutTypes'
import {
  hasHeaderContent,
  getHeaderClassName,
  getTitleClassName,
  getDescriptionClassName,
  getInteractiveVariant,
  getA11yProps,
  createKeyboardHandler,
  buttonDemoConfig,
  formDemoConfig,
  gridConfigs
} from './DemoLayoutLogic'

/**
 * 🎨 DemoSection Component
 * 
 * Компонент для создания секций демонстрации в дизайн-системе.
 * Заменяет CSS класс .demo-section с дополнительным функционалом.
 * 
 * @example
 * <DemoSection title="Кнопки" description="Различные варианты кнопок">
 *   <DemoGrid>
 *     <DemoComponent title="Primary">
 *       <Button variant="primary">Кнопка</Button>
 *     </DemoComponent>
 *   </DemoGrid>
 * </DemoSection>
 */
export const DemoSection = React.forwardRef<HTMLDivElement, DemoSectionProps>(
  ({
    className,
    size = "lg",
    variant = "default",
    title,
    description,
    children,
    ...props
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(demoSectionVariants({ size, variant }), className)}
        {...props}
      >
        {/* Заголовок и описание */}
        {hasHeaderContent(title, description) && (
          <div className={getHeaderClassName('section')}>
            {title && (
              <h2 className={getTitleClassName('section')}>
                {title}
              </h2>
            )}
            {description && (
              <p className={getDescriptionClassName('section')}>
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Контент */}
        {children}
      </section>
    )
  }
)

DemoSection.displayName = "DemoSection"

/**
 * 🎨 DemoComponent Component
 * 
 * Компонент для демонстрации отдельных элементов дизайн-системы.
 * Заменяет CSS класс .demo-component с дополнительным функционалом.
 */
export const DemoComponent = React.forwardRef<HTMLDivElement, DemoComponentProps>(
  ({
    className,
    size = "md",
    variant = "default",
    title,
    description,
    children,
    onClick,
    ...props
  }, ref) => {
    const keyboardHandler = createKeyboardHandler(onClick)

    return (
      <div
        ref={ref}
        className={cn(
          demoComponentVariants({ 
            size, 
            variant: getInteractiveVariant(onClick, variant)
          }),
          className
        )}
        onClick={onClick}
        onKeyDown={keyboardHandler}
        {...getA11yProps(onClick)}
        {...props}
      >
        {/* Заголовок и описание */}
        {hasHeaderContent(title, description) && (
          <div className={getHeaderClassName('component')}>
            {title && (
              <h3 className={getTitleClassName('component')}>
                {title}
              </h3>
            )}
            {description && (
              <p className={getDescriptionClassName('component')}>
                {description}
              </p>
            )}
          </div>
        )}
        
        {/* Демонстрируемый компонент */}
        <div className="flex items-center justify-center min-h-[60px]">
          {children}
        </div>
      </div>
    )
  }
)

DemoComponent.displayName = "DemoComponent"

/**
 * 🎨 DemoGrid Component
 * 
 * Адаптивная сетка для демонстрации компонентов.
 * Заменяет CSS класс .demo-grid с дополнительными возможностями.
 */
export const DemoGrid = React.forwardRef<HTMLDivElement, DemoGridProps>(
  ({
    className,
    columns = 3,
    gap = "md",
    responsive = true,
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          demoGridVariants({ columns, gap, responsive }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

DemoGrid.displayName = "DemoGrid"

/**
 * 🔧 Предустановленные компоненты
 */

// Компонент для демонстрации кнопок
export const ButtonDemo = React.forwardRef<HTMLDivElement, ButtonDemoProps>(
  (props, ref) => (
    <DemoComponent 
      ref={ref} 
      variant={buttonDemoConfig.variant}
      size={buttonDemoConfig.size}
      {...props} 
    />
  )
)
ButtonDemo.displayName = "ButtonDemo"

// Компонент для демонстрации форм
export const FormDemo = React.forwardRef<HTMLDivElement, FormDemoProps>(
  (props, ref) => (
    <DemoComponent 
      ref={ref} 
      size={formDemoConfig.size}
      variant={formDemoConfig.variant}
      {...props} 
    />
  )
)
FormDemo.displayName = "FormDemo"

// Двухколоночная сетка
export const TwoColumnGrid = React.forwardRef<HTMLDivElement, TwoColumnGridProps>(
  (props, ref) => (
    <DemoGrid 
      ref={ref} 
      {...gridConfigs.twoColumn}
      {...props} 
    />
  )
)
TwoColumnGrid.displayName = "TwoColumnGrid"

// Четырёхколоночная сетка  
export const FourColumnGrid = React.forwardRef<HTMLDivElement, FourColumnGridProps>(
  (props, ref) => (
    <DemoGrid 
      ref={ref} 
      {...gridConfigs.fourColumn}
      {...props} 
    />
  )
)
FourColumnGrid.displayName = "FourColumnGrid"

// Экспорт всех типов для использования в других файлах
export * from './DemoLayoutTypes'
export * from './DemoLayoutVariants'
export * from './DemoLayoutLogic'