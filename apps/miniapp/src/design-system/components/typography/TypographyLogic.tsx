import React from 'react'
import { cn } from '../../../lib/utils'
import { Typography } from './index'
import type { 
  DisplayTextProps,
  HeadingProps,
  TextProps,
  CaptionProps,
  LabelProps,
  CodeProps,
  TypographyVariant
} from './TypographyTypes'

/**
 * 📚 Preset Components - Готовые компоненты для быстрого использования
 */

// Display Headers
export const DisplayText = React.forwardRef<HTMLHeadingElement, DisplayTextProps>(
  ({ size = 'lg', ...props }, ref) => (
    <Typography
      ref={ref}
      as="h1"
      variant={`display-${size}` as TypographyVariant}
      {...props}
    />
  )
)
DisplayText.displayName = "DisplayText"

// Section Headers
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level = 2, size = 'md', ...props }, ref) => (
    <Typography
      ref={ref}
      as={`h${level}` as keyof JSX.IntrinsicElements}
      variant={`heading-${size}` as TypographyVariant}
      {...props}
    />
  )
)
Heading.displayName = "Heading"

// Body Text
export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ size = 'md', ...props }, ref) => (
    <Typography
      ref={ref}
      as="p"
      variant={`body-${size}` as TypographyVariant}
      {...props}
    />
  )
)
Text.displayName = "Text"

// Caption Text
export const Caption = React.forwardRef<HTMLSpanElement, CaptionProps>(
  ({ size = 'md', color = 'muted', ...props }, ref) => (
    <Typography
      ref={ref}
      as="span"
      variant={`caption-${size}` as TypographyVariant}
      color={color}
      {...props}
    />
  )
)
Caption.displayName = "Caption"

// Label Text
export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ size = 'md', ...props }, ref) => (
    <Typography
      ref={ref}
      as="label"
      variant={`label-${size}` as TypographyVariant}
      {...props}
    />
  )
)
Label.displayName = "Label"

// Code Text
export const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ size = 'md', inline = true, className, ...props }, ref) => (
    <Typography
      ref={ref}
      as={inline ? "code" : "pre"}
      variant={`code-${size}` as TypographyVariant}
      className={cn(
        inline && "bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded",
        !inline && "bg-gray-50 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto",
        className
      )}
      {...props}
    />
  )
)
Code.displayName = "Code"

/**
 * 🎯 Typography Utility Functions
 */

/**
 * Определить семантический элемент для варианта
 */
export const getSemanticElement = (variant?: TypographyVariant): keyof JSX.IntrinsicElements => {
  if (!variant) return 'p'
  
  if (variant.startsWith('display-')) return 'h1'
  if (variant.startsWith('heading-')) return 'h2'
  if (variant.startsWith('body-')) return 'p'
  if (variant.startsWith('caption-')) return 'span'
  if (variant.startsWith('label-')) return 'label'
  if (variant.startsWith('code-')) return 'code'
  
  return 'p'
}

/**
 * Создать accessibility пропсы для типографики
 */
export const createTypographyAccessibilityProps = (variant?: TypographyVariant) => {
  const props: Record<string, any> = {}
  
  if (variant?.startsWith('heading-') || variant?.startsWith('display-')) {
    props['aria-level'] = variant.includes('xl') ? 1 : 
                         variant.includes('lg') ? 2 : 
                         variant.includes('md') ? 3 : 
                         variant.includes('sm') ? 4 : 5
  }
  
  return props
}