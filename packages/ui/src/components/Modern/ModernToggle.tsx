import React, { useState, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modernToggleVariants = cva(
  "relative inline-flex items-center cursor-pointer transition-all duration-300 rounded-full",
  {
    variants: {
      variant: {
        // iOS-style toggle
        ios: "bg-gray-300 data-[checked=true]:bg-blue-500 shadow-inner",
        
        // Telegram-style toggle
        telegram: "bg-gray-300 data-[checked=true]:bg-blue-500 shadow-md",
        
        // Premium gradient toggle
        premium: "bg-gray-300 data-[checked=true]:bg-gradient-to-r data-[checked=true]:from-yellow-400 data-[checked=true]:to-orange-500 shadow-lg",
        
        // Glass morphism toggle
        glass: "bg-white/20 backdrop-blur-xl border border-white/30 data-[checked=true]:bg-white/30 data-[checked=true]:border-white/50 shadow-xl",
        
        // Neon cyberpunk toggle
        neon: "bg-gray-800 border border-gray-700 data-[checked=true]:bg-cyan-900 data-[checked=true]:border-cyan-500 data-[checked=true]:shadow-lg data-[checked=true]:shadow-cyan-500/50",
        
        // Minimal modern toggle
        minimal: "bg-gray-200 data-[checked=true]:bg-gray-900 shadow-sm",
        
        // Floating 3D toggle
        floating: "bg-gray-300 shadow-lg hover:shadow-xl data-[checked=true]:bg-blue-500 data-[checked=true]:shadow-blue-500/25",
        
        // Notion-style toggle
        notion: "bg-gray-200 data-[checked=true]:bg-blue-500 border border-gray-300 data-[checked=true]:border-blue-500"
      },
      size: {
        sm: "w-8 h-5 p-0.5",
        md: "w-11 h-6 p-0.5", 
        lg: "w-14 h-8 p-1",
        xl: "w-16 h-10 p-1"
      }
    },
    defaultVariants: {
      variant: "ios",
      size: "md"
    }
  }
);

const toggleThumbVariants = cva(
  "bg-white rounded-full shadow-md transition-all duration-300 flex items-center justify-center",
  {
    variants: {
      variant: {
        ios: "shadow-lg",
        telegram: "shadow-md",
        premium: "shadow-lg bg-white",
        glass: "bg-white/90 backdrop-blur-sm shadow-xl",
        neon: "bg-gray-100 shadow-lg",
        minimal: "shadow-sm",
        floating: "shadow-xl",
        notion: "shadow-md"
      },
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6", 
        xl: "w-8 h-8"
      },
      checked: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      variant: "ios",
      size: "md",
      checked: false
    }
  }
);

export interface ModernToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof modernToggleVariants> {
  label?: string;
  description?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  hapticFeedback?: boolean;
  morphingAnimation?: boolean;
  glowEffect?: boolean;
  sparkleEffect?: boolean;
  magneticEffect?: boolean;
  onToggle?: (checked: boolean) => void;
}

export const ModernToggle = React.forwardRef<HTMLInputElement, ModernToggleProps>(
  ({
    className,
    variant,
    size,
    label,
    description,
    leftIcon,
    rightIcon,
    hapticFeedback = false,
    morphingAnimation = false,
    glowEffect = false,
    sparkleEffect = false,
    magneticEffect = false,
    checked = false,
    onChange,
    onToggle,
    disabled = false,
    ...props
  }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);
    const [isAnimating, setIsAnimating] = useState(false);
    const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);
    const toggleRef = useRef<HTMLDivElement>(null);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      setIsAnimating(true);

      // Haptic feedback for Telegram
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }

      // Sparkle effect
      if (sparkleEffect && newChecked) {
        const newSparkles = Array.from({ length: 6 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100
        }));
        setSparkles(newSparkles);
        
        setTimeout(() => setSparkles([]), 1000);
      }

      onChange?.(e);
      onToggle?.(newChecked);

      setTimeout(() => setIsAnimating(false), 300);
    };

    const getThumbTransform = () => {
      const baseTransform = isChecked ? 'translateX(100%)' : 'translateX(0%)';
      
      if (morphingAnimation && isAnimating) {
        return isChecked 
          ? 'translateX(100%) scale(1.2) rotate(180deg)' 
          : 'translateX(0%) scale(1.2) rotate(-180deg)';
      }
      
      return baseTransform;
    };

    return (
      <div className="flex items-center gap-3">
        {/* Left Icon */}
        {leftIcon && (
          <div className={cn(
            "transition-all duration-200",
            disabled ? "opacity-50" : "opacity-100"
          )}>
            {leftIcon}
          </div>
        )}

        {/* Toggle Container */}
        <div className="relative">
          {/* Glow Effect */}
          {glowEffect && isChecked && (
            <div className={cn(
              "absolute inset-0 rounded-full blur-lg animate-pulse -z-10",
              variant === 'ios' && "bg-blue-500/50",
              variant === 'telegram' && "bg-blue-500/50",
              variant === 'premium' && "bg-orange-500/50",
              variant === 'glass' && "bg-white/50",
              variant === 'neon' && "bg-cyan-500/50",
              variant === 'minimal' && "bg-gray-900/50",
              variant === 'floating' && "bg-blue-500/50",
              variant === 'notion' && "bg-blue-500/50"
            )} />
          )}

          {/* Sparkles */}
          {sparkleEffect && sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping pointer-events-none"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
                animationDelay: `${Math.random() * 0.5}s`
              }}
            />
          ))}

          {/* Main Toggle */}
          <div
            ref={toggleRef}
            className={cn(
              modernToggleVariants({ variant, size }),
              disabled && "opacity-50 cursor-not-allowed",
              magneticEffect && !disabled && "hover:scale-105",
              className
            )}
            data-checked={isChecked}
          >
            {/* Background Pattern for Premium */}
            {variant === 'premium' && isChecked && (
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full opacity-20 animate-pulse" />
            )}

            {/* Neon Inner Glow */}
            {variant === 'neon' && isChecked && (
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full animate-pulse" />
            )}

            {/* Toggle Thumb */}
            <div
              className={cn(
                toggleThumbVariants({ variant, size, checked: isChecked }),
                "relative z-10"
              )}
              style={{
                transform: getThumbTransform(),
                transition: morphingAnimation 
                  ? 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                  : 'transform 0.3s ease-in-out'
              }}
            >
              {/* Thumb Icons */}
              {isChecked ? (
                variant === 'neon' ? (
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                ) : variant === 'premium' ? (
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                ) : null
              ) : (
                variant === 'minimal' && (
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                )
              )}
            </div>

            {/* Hidden Input */}
            <input
              ref={ref}
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
              disabled={disabled}
              className="sr-only"
              {...props}
            />
          </div>
        </div>

        {/* Label and Description */}
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label className={cn(
                "text-sm font-medium cursor-pointer transition-colors duration-200",
                disabled ? "text-gray-400" : "text-gray-900 hover:text-gray-700"
              )}>
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                "text-xs mt-1 transition-colors duration-200",
                disabled ? "text-gray-300" : "text-gray-500"
              )}>
                {description}
              </p>
            )}
          </div>
        )}

        {/* Right Icon */}
        {rightIcon && (
          <div className={cn(
            "transition-all duration-200",
            disabled ? "opacity-50" : "opacity-100"
          )}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

ModernToggle.displayName = "ModernToggle";