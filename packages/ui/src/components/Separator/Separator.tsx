import { cn } from '../../utils/cn'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Separator({ orientation = 'horizontal', className }: SeparatorProps) {
  return (
    <div
      className={cn(
        'bg-border flex-shrink-0',
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        className
      )}
      role="separator"
      aria-orientation={orientation}
    />
  )
}