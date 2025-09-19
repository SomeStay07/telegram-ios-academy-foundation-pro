import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const mainButtonVariants = cva(
  "w-full py-4 px-6 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
        telegram: "bg-[var(--tg-theme-button-color,#007AFF)] hover:bg-[var(--tg-theme-button-color,#007AFF)]/90 text-[var(--tg-theme-button-text-color,white)] focus:ring-blue-500",
        success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
        warning: "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-500",
        destructive: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
        outline: "border-2 border-gray-200 hover:bg-gray-50 text-gray-900 focus:ring-gray-500",
        ghost: "hover:bg-gray-100 text-gray-900 focus:ring-gray-500"
      },
      size: {
        sm: "py-2 px-4 text-sm rounded-lg",
        md: "py-3 px-5 text-base rounded-xl",
        lg: "py-4 px-6 text-lg rounded-xl",
        xl: "py-5 px-8 text-xl rounded-2xl"
      },
      loading: {
        true: "cursor-wait"
      }
    },
    defaultVariants: {
      variant: "telegram",
      size: "lg"
    }
  }
);

export interface MainButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mainButtonVariants> {
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  hapticFeedback?: boolean;
}

export const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    loading = false,
    loadingText = "Загрузка...",
    icon,
    hapticFeedback = true,
    children, 
    onClick,
    disabled,
    ...props 
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      
      // Telegram haptic feedback
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      }
      
      onClick?.(e);
    };

    return (
      <button
        className={cn(mainButtonVariants({ variant, size, loading, className }))}
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                  fill="none"
                />
                <path 
                  className="opacity-75" 
                  fill="currentColor" 
                  d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              {loadingText}
            </>
          ) : (
            <>
              {icon && <span className="shrink-0">{icon}</span>}
              {children}
            </>
          )}
        </span>
      </button>
    );
  }
);

MainButton.displayName = "MainButton";