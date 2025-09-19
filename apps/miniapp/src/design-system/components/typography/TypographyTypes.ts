import React from 'react'
import { type VariantProps } from 'class-variance-authority'
import { typographyVariants } from './TypographyVariants'

/**
 * 🎯 Typography Props Interface
 */
export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** HTML элемент для рендеринга */
  as?: keyof JSX.IntrinsicElements
  /** Контент */
  children: React.ReactNode
  /** Дополнительные CSS классы */
  className?: string
}

/**
 * 🎯 Preset Components Props
 */
export interface DisplayTextProps extends Omit<TypographyProps, 'variant' | 'as'> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export interface HeadingProps extends Omit<TypographyProps, 'variant' | 'as'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export interface TextProps extends Omit<TypographyProps, 'variant' | 'as'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface CaptionProps extends Omit<TypographyProps, 'variant' | 'as'> {
  size?: 'sm' | 'md' | 'lg'
}

export interface LabelProps extends Omit<TypographyProps, 'variant' | 'as'> {
  size?: 'sm' | 'md' | 'lg'
}

export interface CodeProps extends Omit<TypographyProps, 'variant' | 'as'> {
  size?: 'sm' | 'md' | 'lg'
  inline?: boolean
}

/**
 * 🎯 Type Exports
 */
export type TypographyVariant = VariantProps<typeof typographyVariants>['variant']
export type TypographyColor = VariantProps<typeof typographyVariants>['color']
export type TypographyAlign = VariantProps<typeof typographyVariants>['align']
export type TypographyWeight = VariantProps<typeof typographyVariants>['weight']
export type TypographyTransform = VariantProps<typeof typographyVariants>['transform']