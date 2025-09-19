/**
 * 🎨 Design System - СПОКОЙНАЯ ЭЛЕГАНТНОСТЬ 2025
 * Централизованный экспорт всех компонентов дизайн-системы
 */

// Design Tokens
export { tokens, type DesignTokens, type ColorScale, type SpacingScale, type FontSize } from './tokens'

// Utilities
export { cn, cssVar, px, rgba, kebabCase } from '../lib/utils'

// Components - Новые современные компоненты
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/button'
export { Modal, ConfirmationModal, type ModalProps, type ConfirmationModalProps } from './components/modal'
export { Card, type CardProps, type CardVariant, type CardSize } from './components/card'
export { Input, type InputProps, type InputVariant, type InputSize } from './components/input'
export { Progress, type ProgressProps, type ProgressVariant, type ProgressSize, type ProgressShape } from './components/progress'
export { Tooltip, type TooltipProps, type TooltipVariant, type TooltipSize, type TooltipPosition } from './components/tooltip'
export { Avatar, AvatarGroup, type AvatarProps, type AvatarGroupProps, type AvatarVariant, type AvatarSize, type AvatarShape } from './components/avatar'
export { StatCard, StatCardGroup, type StatCardProps, type StatCardGroupProps, type StatCardVariant, type StatCardSize, type StatCardAccent } from './components/stat-card'
export { Tabs, type TabsProps, type TabItem, type TabsVariant, type TabsSize, type TabVariant } from './components/tabs'
export { CodeBlock, type CodeBlockProps, type CodeBlockTheme, type CodeBlockSize, type CodeBlockVariant } from './components/code-block'
export { QuizItem, type QuizItemProps, type QuizOption, type QuizItemVariant, type QuizItemSize, type QuizItemState } from './components/quiz-item'
export { Badge, type BadgeProps, type BadgeVariant, type BadgeSize, type BadgeColor } from './components/badge'
export { AchievementItem, type AchievementItemProps } from './components/achievement'
export { SkillProgress, type SkillProgressProps } from './components/skill-progress'

// Legacy exports removed - all components now use modern CVA + Tailwind approach ✨