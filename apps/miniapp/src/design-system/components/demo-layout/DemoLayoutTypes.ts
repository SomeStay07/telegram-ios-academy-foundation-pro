import { type VariantProps } from 'class-variance-authority'
import { demoSectionVariants, demoComponentVariants, demoGridVariants } from './DemoLayoutVariants'

/**
 * 🎯 DemoLayout TypeScript Types
 * 
 * Модульный файл содержащий все типы для демо компонентов
 * Разделен из основного DemoLayout.tsx для улучшения типизации
 */

/**
 * 🔧 Базовые типы для демо секций
 */
export interface DemoSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof demoSectionVariants> {
  /** Заголовок секции */
  title?: string
  /** Описание секции */
  description?: string
  /** Дети компонента */
  children: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
}

/**
 * 🔧 Базовые типы для демо компонентов
 */
export interface DemoComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof demoComponentVariants> {
  /** Заголовок компонента */
  title?: string
  /** Описание компонента */
  description?: string
  /** Дети компонента */
  children: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
  /** Функция при клике */
  onClick?: () => void
}

/**
 * 🔧 Базовые типы для демо сетки
 */
export interface DemoGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof demoGridVariants> {
  /** Дети компонента */
  children: React.ReactNode
  /** Кастомные CSS классы */
  className?: string
}

/**
 * 🎨 Экспортированные варианты типов
 */
export type DemoSectionVariant = VariantProps<typeof demoSectionVariants>['variant']
export type DemoSectionSize = VariantProps<typeof demoSectionVariants>['size']
export type DemoComponentVariant = VariantProps<typeof demoComponentVariants>['variant']
export type DemoComponentSize = VariantProps<typeof demoComponentVariants>['size']
export type DemoGridColumns = VariantProps<typeof demoGridVariants>['columns']

/**
 * 🔧 Утилитарные типы
 */
export type DemoSectionElement = React.ElementRef<"section">
export type DemoSectionRef = React.ForwardedRef<DemoSectionElement>
export type DemoComponentElement = React.ElementRef<"div">
export type DemoComponentRef = React.ForwardedRef<DemoComponentElement>
export type DemoGridElement = React.ElementRef<"div">
export type DemoGridRef = React.ForwardedRef<DemoGridElement>

/**
 * 🎭 Типы для предустановленных компонентов
 */
export interface ButtonDemoProps extends Omit<DemoComponentProps, 'variant'> {}
export interface FormDemoProps extends Omit<DemoComponentProps, 'size'> {}
export interface TwoColumnGridProps extends Omit<DemoGridProps, 'columns'> {}
export interface FourColumnGridProps extends Omit<DemoGridProps, 'columns'> {}

/**
 * ⚡ Обобщенный тип для всех демо компонентов
 */
export type AnyDemoProps = 
  | DemoSectionProps 
  | DemoComponentProps 
  | DemoGridProps
  | ButtonDemoProps
  | FormDemoProps
  | TwoColumnGridProps
  | FourColumnGridProps