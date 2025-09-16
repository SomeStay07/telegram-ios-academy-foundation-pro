import React, { useState, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modernButtonVariants = cva(
  "relative inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group",
  {
    variants: {
      variant: {
        // Premium gradient buttons like in top apps
        primary: "bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Duolingo-style success
        success: "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:shadow-green-500/25 transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Linear-style dark
        dark: "bg-gradient-to-r from-gray-900 via-gray-800 to-black hover:from-black hover:via-gray-900 hover:to-gray-800 text-white shadow-lg hover:shadow-xl hover:shadow-gray-500/25 transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Premium gold for special actions
        premium: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl hover:shadow-orange-500/25 transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Glassmorphism effect
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-gray-900 hover:bg-white/20 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Neon effect
        neon: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/75 transform hover:scale-[1.02] active:scale-[0.98] animate-pulse",
        
        // Minimal but modern
        minimal: "bg-gray-50 hover:bg-gray-100 text-gray-900 border border-gray-200 hover:border-gray-300 transform hover:scale-[1.02] active:scale-[0.98]",
        
        // Destructive with modern gradient
        destructive: "bg-gradient-to-r from-red-500 via-pink-500 to-red-600 hover:from-red-600 hover:via-pink-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
      },
      size: {
        xs: "px-3 py-1.5 text-xs rounded-lg min-h-[28px]",
        sm: "px-4 py-2 text-sm rounded-xl min-h-[36px]",
        md: "px-6 py-3 text-base rounded-xl min-h-[44px]",
        lg: "px-8 py-4 text-lg rounded-2xl min-h-[52px]",
        xl: "px-10 py-5 text-xl rounded-2xl min-h-[60px]"
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

const sparkleVariants = cva("absolute pointer-events-none", {
  variants: {
    size: {
      xs: "w-1 h-1",
      sm: "w-1.5 h-1.5",
      md: "w-2 h-2", 
      lg: "w-2.5 h-2.5",
      xl: "w-3 h-3"
    }
  }
});

interface Sparkle {
  id: number;
  x: number;
  y: number;
  delay: number;
}

export interface ModernButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof modernButtonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  hapticFeedback?: boolean;
  sparkleEffect?: boolean;
  pulseOnHover?: boolean;
  children?: React.ReactNode;
}

export const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({
    className,
    variant,
    size,
    loading = false,
    fullWidth,
    leftIcon,
    rightIcon,
    loadingText = "Loading...",
    hapticFeedback = false,
    sparkleEffect = false,
    pulseOnHover = false,
    children,
    onClick,
    disabled,
    ...props
  }, ref) => {
    const [sparkles, setSparkles] = useState<Sparkle[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;

      // Haptic feedback for Telegram
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      }

      // Sparkle effect on click
      if (sparkleEffect) {
        const rect = e.currentTarget.getBoundingClientRect();
        const newSparkles = Array.from({ length: 6 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          delay: i * 100
        }));
        
        setSparkles(prev => [...prev, ...newSparkles]);
        
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => !newSparkles.find(ns => ns.id === s.id)));
        }, 1000);
      }

      onClick?.(e);
    };

    const LoadingSpinner = () => (
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <div className="absolute inset-0 w-4 h-4 border border-current border-t-transparent rounded-full animate-ping opacity-75" />
        </div>
        {loadingText}
      </div>
    );

    return (
      <button
        ref={buttonRef}
        className={cn(
          modernButtonVariants({ variant, size, loading, fullWidth }),
          pulseOnHover && isHovered && "animate-pulse",
          className
        )}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled || loading}
        {...props}
      >
        {/* Shine effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Sparkle effects */}
        {sparkleEffect && sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className={cn(
              sparkleVariants({ size }),
              "bg-white rounded-full animate-ping opacity-75"
            )}
            style={{
              left: sparkle.x,
              top: sparkle.y,
              animationDelay: `${sparkle.delay}ms`,
              animationDuration: '600ms'
            }}
          />
        ))}

        {/* Content */}
        <span className="relative flex items-center justify-center gap-2 z-10">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              {leftIcon && (
                <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {leftIcon}
                </span>
              )}
              <span className="transition-all duration-200 group-hover:tracking-wide">
                {children}
              </span>
              {rightIcon && (
                <span className="flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                  {rightIcon}
                </span>
              )}
            </>
          )}
        </span>

        {/* Glow effect for premium variants */}
        {(variant === 'neon' || variant === 'premium') && (
          <div className="absolute inset-0 rounded-inherit opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300 -z-10 bg-gradient-to-r from-current to-current" />
        )}

        {/* Floating particles for special variants */}
        {variant === 'premium' && isHovered && (
          <>
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full animate-bounce opacity-75"
                style={{
                  left: `${20 + i * 30}%`,
                  animationDelay: `${i * 200}ms`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </>
        )}
      </button>
    );
  }
);

ModernButton.displayName = "ModernButton";