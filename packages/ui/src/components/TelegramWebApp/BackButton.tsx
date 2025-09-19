import React, { useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

const backButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
        telegram: "bg-[var(--tg-theme-secondary-bg-color,#f1f1f1)] hover:bg-[var(--tg-theme-secondary-bg-color,#f1f1f1)]/80 text-[var(--tg-theme-text-color,#000)] focus:ring-blue-500",
        ghost: "hover:bg-gray-100 text-gray-900 focus:ring-gray-500",
        outline: "border-2 border-gray-200 hover:bg-gray-50 text-gray-900 focus:ring-gray-500"
      },
      size: {
        sm: "h-8 w-8 p-1",
        md: "h-10 w-10 p-2",
        lg: "h-12 w-12 p-2.5"
      }
    },
    defaultVariants: {
      variant: "telegram",
      size: "md"
    }
  }
);

export interface BackButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof backButtonVariants> {
  hapticFeedback?: boolean;
  useTelegramBackButton?: boolean;
  onBack?: () => void;
}

export const BackButton = React.forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    hapticFeedback = true,
    useTelegramBackButton = true,
    onBack,
    onClick,
    ...props 
  }, ref) => {
    useEffect(() => {
      if (useTelegramBackButton && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Show Telegram's native back button
        tg.BackButton.show();
        
        const handleBackButton = () => {
          if (hapticFeedback) {
            tg.HapticFeedback.impactOccurred('light');
          }
          onBack?.();
        };
        
        tg.BackButton.onClick(handleBackButton);
        
        return () => {
          tg.BackButton.hide();
          tg.BackButton.offClick(handleBackButton);
        };
      }
    }, [useTelegramBackButton, hapticFeedback, onBack]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Telegram haptic feedback
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }
      
      onBack?.();
      onClick?.(e);
    };

    // If using Telegram's native back button, don't render the custom button
    if (useTelegramBackButton && typeof window !== 'undefined' && window.Telegram?.WebApp) {
      return null;
    }

    return (
      <button
        className={cn(backButtonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        aria-label="Назад"
        {...props}
      >
        <ChevronLeftIcon className="h-full w-full" />
      </button>
    );
  }
);

BackButton.displayName = "BackButton";