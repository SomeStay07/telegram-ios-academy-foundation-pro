import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const inputVariants = cva(
  "w-full transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        filled: "bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        outlined: "border-2 border-gray-200 focus:border-blue-500",
        floating: "border-b-2 border-gray-300 bg-transparent focus:border-blue-500 rounded-none",
        telegram: "bg-[var(--tg-theme-secondary-bg-color,#f1f1f1)] border border-transparent focus:bg-white focus:border-[var(--tg-theme-link-color,#007AFF)] focus:ring-2 focus:ring-[var(--tg-theme-link-color,#007AFF)]/20"
      },
      size: {
        sm: "px-3 py-2 text-sm rounded-lg",
        md: "px-4 py-3 text-base rounded-xl", 
        lg: "px-5 py-4 text-lg rounded-xl"
      },
      state: {
        default: "",
        error: "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        success: "border-green-500 focus:border-green-500 focus:ring-green-500/20",
        warning: "border-orange-500 focus:border-orange-500 focus:ring-orange-500/20"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md", 
      state: "default"
    }
  }
);

const labelVariants = cva(
  "absolute left-4 transition-all duration-200 pointer-events-none",
  {
    variants: {
      variant: {
        default: "text-gray-500",
        floating: "text-gray-500"
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      },
      focused: {
        true: "text-blue-500 scale-90",
        false: ""
      },
      floating: {
        true: "-top-2 left-3 px-1 bg-white scale-90",
        false: "top-1/2 -translate-y-1/2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      focused: false,
      floating: false
    }
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  floating?: boolean;
  showPasswordToggle?: boolean;
  onClear?: () => void;
  showClearButton?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    variant,
    size,
    state,
    label,
    helperText,
    errorMessage,
    successMessage,
    leftIcon,
    rightIcon,
    loading = false,
    floating = false,
    showPasswordToggle = false,
    showClearButton = false,
    onClear,
    type = 'text',
    value,
    onChange,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value));
    const internalRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

    useEffect(() => {
      setHasValue(Boolean(value));
    }, [value]);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(e.target.value));
      onChange?.(e);
    };

    const handleClear = () => {
      if (inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, '');
        
        const ev = new Event('input', { bubbles: true });
        inputRef.current.dispatchEvent(ev);
      }
      setHasValue(false);
      onClear?.();
    };

    const finalState = errorMessage ? 'error' : successMessage ? 'success' : state;
    const inputType = showPasswordToggle && showPassword ? 'text' : type;
    const isFloatingActive = floating && (focused || hasValue);

    const StateIcon = () => {
      if (loading) {
        return (
          <svg className="animate-spin h-4 w-4 text-gray-400" viewBox="0 0 24 24">
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
        );
      }

      if (finalState === 'error') {
        return <ExclamationCircleIcon className="h-4 w-4 text-red-500" />;
      }

      if (finalState === 'success') {
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      }

      return null;
    };

    return (
      <div className="space-y-1">
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={inputRef}
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              inputVariants({ variant, size, state: finalState }),
              leftIcon && "pl-10",
              (rightIcon || showPasswordToggle || showClearButton || loading || StateIcon()) && "pr-10",
              className
            )}
            {...props}
          />

          {/* Floating Label */}
          {floating && label && (
            <label
              className={cn(
                labelVariants({ 
                  variant, 
                  size, 
                  focused,
                  floating: isFloatingActive 
                })
              )}
            >
              {label}
            </label>
          )}

          {/* Right Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <StateIcon />
            
            {showClearButton && hasValue && !loading && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            )}
            
            {showPasswordToggle && type === 'password' && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            )}
            
            {rightIcon && !showPasswordToggle && !showClearButton && !loading && !StateIcon() && (
              <div className="text-gray-400">
                {rightIcon}
              </div>
            )}
          </div>
        </div>

        {/* Non-floating Label */}
        {!floating && label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        {/* Helper/Error/Success Text */}
        {(errorMessage || successMessage || helperText) && (
          <p className={cn(
            "text-sm",
            errorMessage ? "text-red-600" : 
            successMessage ? "text-green-600" : 
            "text-gray-500"
          )}>
            {errorMessage || successMessage || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";