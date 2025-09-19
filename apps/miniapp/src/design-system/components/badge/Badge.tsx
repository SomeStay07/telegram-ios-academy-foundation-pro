import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-medium transition-all duration-300 cursor-pointer hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-blue-400/20 active:scale-95 transform-gpu will-change-transform",
  {
    variants: {
      variant: {
        default: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600",
        primary: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border-blue-200/50 dark:border-blue-700/30 text-blue-800 dark:text-blue-200 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/30 hover:border-blue-300/60 dark:hover:border-blue-600/40",
        success: "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border-green-200/50 dark:border-green-700/30 text-green-800 dark:text-green-200 hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/40 dark:hover:to-green-700/30 hover:border-green-300/60 dark:hover:border-green-600/40",
        warning: "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/20 border-yellow-200/50 dark:border-yellow-700/30 text-yellow-800 dark:text-yellow-200 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-800/40 dark:hover:to-yellow-700/30 hover:border-yellow-300/60 dark:hover:border-yellow-600/40",
        danger: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 border-red-200/50 dark:border-red-700/30 text-red-800 dark:text-red-200 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/40 dark:hover:to-red-700/30 hover:border-red-300/60 dark:hover:border-red-600/40",
        info: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border-purple-200/50 dark:border-purple-700/30 text-purple-800 dark:text-purple-200 hover:from-purple-100 hover:to-purple-200 dark:hover:from-purple-800/40 dark:hover:to-purple-700/30 hover:border-purple-300/60 dark:hover:border-purple-600/40"
      },
      size: {
        sm: "px-2.5 py-1 text-xs gap-1",
        md: "px-4 py-2 text-sm gap-2", 
        lg: "px-6 py-3 text-base gap-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
)

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  icon?: LucideIcon
  value?: string | number
  label?: string
  interactive?: boolean
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, children, icon: Icon, value, label, interactive = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size }),
          !interactive && "cursor-default hover:scale-100 hover:shadow-none",
          interactive && "group relative overflow-hidden",
          className
        )}
        style={{
          WebkitTapHighlightColor: 'transparent'
        }}
        {...props}
      >
        {interactive && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        )}
        
        {Icon && (
          <Icon className={cn(
            "flex-shrink-0 transition-transform duration-200",
            interactive && "group-hover:rotate-12 group-active:rotate-6",
            size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4",
            variant === "primary" && "text-blue-600 dark:text-blue-400",
            variant === "success" && "text-green-600 dark:text-green-400", 
            variant === "warning" && "text-yellow-600 dark:text-yellow-400",
            variant === "danger" && "text-red-600 dark:text-red-400",
            variant === "info" && "text-purple-600 dark:text-purple-400"
          )} />
        )}
        
        {value && (
          <span className={cn(
            "font-semibold transition-all duration-200 relative z-10",
            interactive && "group-hover:scale-110",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
          )}>
            {value}
          </span>
        )}
        
        {label && (
          <span className={cn(
            "opacity-75 transition-all duration-200 relative z-10",
            interactive && "group-hover:opacity-90",
            size === "sm" ? "text-xs" : size === "lg" ? "text-sm" : "text-xs"
          )}>
            {label}
          </span>
        )}
        
        {children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export type { VariantProps }
export { badgeVariants }