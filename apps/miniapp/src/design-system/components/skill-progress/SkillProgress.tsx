import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { Progress } from '../progress'

const skillProgressVariants = cva(
  "flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
  {
    variants: {
      size: {
        sm: "gap-2 p-1.5",
        md: "gap-3 p-2", 
        lg: "gap-4 p-3"
      },
      interactive: {
        true: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      interactive: false
    }
  }
)

export interface SkillProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skillProgressVariants> {
  name: string
  progress: number
  showValue?: boolean
  progressWidth?: string
}

export const SkillProgress = React.forwardRef<HTMLDivElement, SkillProgressProps>(
  ({ 
    className, 
    size, 
    interactive, 
    name, 
    progress, 
    showValue = true, 
    progressWidth = "w-24",
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skillProgressVariants({ size, interactive }), className)}
        {...props}
      >
        {/* Skill Name */}
        <div className={cn(
          "flex-1 min-w-0 font-medium text-gray-900 dark:text-gray-100",
          size === "sm" ? "text-sm" : size === "lg" ? "text-lg" : "text-base"
        )}>
          <span className="truncate">{name}</span>
        </div>

        {/* Progress Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Progress 
            value={progress} 
            className={cn(
              progressWidth,
              size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2"
            )}
            variant="default"
          />
          
          {showValue && (
            <span className={cn(
              "font-medium text-gray-600 dark:text-gray-400 min-w-[3ch] text-right",
              size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
            )}>
              {progress}%
            </span>
          )}
        </div>
      </div>
    )
  }
)

SkillProgress.displayName = "SkillProgress"

export { skillProgressVariants }