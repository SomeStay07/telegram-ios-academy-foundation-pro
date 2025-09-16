import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
        outline: "border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
        ghost: "hover:bg-gray-100 text-gray-700 focus:ring-gray-500",
        destructive: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl",
        success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 shadow-lg hover:shadow-xl",
        gradient: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl",
        glassmorphism: "bg-white/20 backdrop-blur-md border border-white/30 text-gray-900 hover:bg-white/30 focus:ring-white/50",
        telegram: "bg-[var(--tg-theme-button-color,#007AFF)] hover:bg-[var(--tg-theme-button-color,#007AFF)]/90 text-[var(--tg-theme-button-text-color,white)] focus:ring-blue-500 shadow-lg hover:shadow-xl"
      },
      size: {
        xs: "px-2 py-1 text-xs rounded-md min-h-[24px]",
        sm: "px-3 py-2 text-sm rounded-lg min-h-[32px]",
        md: "px-4 py-2.5 text-base rounded-xl min-h-[40px]",
        lg: "px-6 py-3 text-lg rounded-xl min-h-[48px]",
        xl: "px-8 py-4 text-xl rounded-2xl min-h-[56px]"
      },
      loading: {
        true: "cursor-wait",
        false: ""
      },
      fullWidth: {
        true: "w-full",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false,
      fullWidth: false
    }
  }
);

const iconVariants = cva("transition-all duration-200", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4", 
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-7 w-7"
    },
    position: {
      left: "mr-2",
      right: "ml-2",
      only: ""
    }
  },
  defaultVariants: {
    size: "md",
    position: "left"
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  hapticFeedback?: boolean;
  animateOnHover?: boolean;
  rippleEffect?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    loading = false,
    fullWidth,
    leftIcon,
    rightIcon,
    loadingText = "Загрузка...",
    hapticFeedback = false,
    animateOnHover = true,
    rippleEffect = true,
    children,
    onClick,
    disabled,
    ...props
  }, ref) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;

      // Haptic feedback for Telegram
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      }

      // Ripple effect
      if (rippleEffect) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { id: Date.now(), x, y };
        
        setRipples(prev => [...prev, newRipple]);
        
        setTimeout(() => {
          setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);
      }

      onClick?.(e);
    };

    const LoadingSpinner = () => (
      <svg 
        className={cn(iconVariants({ size, position: leftIcon ? 'left' : 'only' }))}
        viewBox="0 0 24 24"
      >
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
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="1s"
          from="0 12 12"
          to="360 12 12"
          repeatCount="indefinite"
        />
      </svg>
    );

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, loading, fullWidth }),
          animateOnHover && "hover:scale-105",
          "relative overflow-hidden",
          className
        )}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        {/* Ripple Effects */}
        {rippleEffect && ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute bg-white/30 rounded-full animate-ping"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
            }}
          />
        ))}

        {/* Content */}
        <span className="relative flex items-center justify-center">
          {loading ? (
            <>
              <LoadingSpinner />
              {loadingText}
            </>
          ) : (
            <>
              {leftIcon && (
                <span className={cn(iconVariants({ size, position: 'left' }))}>
                  {leftIcon}
                </span>
              )}
              {children}
              {rightIcon && (
                <span className={cn(iconVariants({ size, position: 'right' }))}>
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </span>

        {/* Shine effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
      </button>
    );
  }
);

Button.displayName = "Button";