import { ReactNode } from 'react'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'

export interface BaseProps {
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

export interface ComponentWithSize extends BaseProps {
  size?: Size
}

export interface ComponentWithVariant extends BaseProps {
  variant?: Variant
}