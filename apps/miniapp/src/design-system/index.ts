/**
 * 🎨 Design System - СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ 2025
 * Централизованный экспорт всех компонентов дизайн-системы
 */

// Design Tokens
export { tokens, type DesignTokens, type ColorScale, type SpacingScale, type FontSize } from './tokens'

// Utilities
export { cn, cssVar, px, rgba, kebabCase } from '../lib/utils'

// Components - Новые современные компоненты
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button'
export { Modal, ConfirmationModal, type ModalProps, type ConfirmationModalProps } from './components/Modal'
export { Card, type CardProps, type CardVariant, type CardSize } from './components/Card'
export { Input, type InputProps, type InputVariant, type InputSize } from './components/Input'
export { Progress, type ProgressProps, type ProgressVariant, type ProgressSize, type ProgressShape } from './components/Progress'
export { Tooltip, type TooltipProps, type TooltipVariant, type TooltipSize, type TooltipPosition } from './components/Tooltip'
export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps, type AvatarVariant, type AvatarSize, type AvatarShape } from './components/Avatar'
export { StatCard, StatCardGroup, type StatCardProps, type StatCardGroupProps, type StatCardVariant, type StatCardSize, type StatCardAccent } from './components/StatCard'
export { Tabs, type TabsProps, type TabItem, type TabsVariant, type TabsSize, type TabVariant } from './components/Tabs'
export { CodeBlock, type CodeBlockProps, type CodeBlockTheme, type CodeBlockSize, type CodeBlockVariant } from './components/CodeBlock'
export { QuizItem, type QuizItemProps, type QuizOption, type QuizItemVariant, type QuizItemSize, type QuizItemState } from './components/QuizItem'

// Legacy exports removed - all components now use modern CVA + Tailwind approach ✨