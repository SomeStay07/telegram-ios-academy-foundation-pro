import { ReactNode } from 'react'

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost'
export type Color = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'
export type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

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

export interface ComponentWithColor extends BaseProps {
  color?: Color
}

export interface ComponentWithSpacing extends BaseProps {
  spacing?: Spacing
}

export interface ComponentWithRadius extends BaseProps {
  radius?: Radius
}