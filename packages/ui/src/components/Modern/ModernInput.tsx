import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modernInputVariants = cva(
  "w-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // Floating like in top mobile apps
        floating: "bg-transparent border-0 border-b-2 border-gray-300 focus:border-blue-500 rounded-none px-0 py-3",
        
        // Glassmorphism like iOS
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 focus:border-white/40 focus:bg-white/20 rounded-2xl px-4 py-3",
        
        // Notion-style clean
        clean: "bg-gray-50 hover:bg-gray-100 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl px-4 py-3 shadow-sm focus:shadow-md",
        
        // Premium with gradient border
        premium: "bg-white border-2 border-transparent focus:border-transparent rounded-2xl px-4 py-3 shadow-lg focus:shadow-xl relative overflow-hidden",
        
        // Minimal modern
        minimal: "bg-white border border-gray-200 hover:border-gray-300 focus:border-blue-500 rounded-xl px-4 py-3",
        
        // Neon cyber effect
        neon: "bg-gray-900 border border-cyan-500/50 focus:border-cyan-400 text-cyan-100 placeholder-cyan-300/50 rounded-xl px-4 py-3 shadow-lg shadow-cyan-500/25 focus:shadow-cyan-500/50",
        
        // Soft modern
        soft: "bg-blue-50 hover:bg-blue-100 focus:bg-white border border-blue-200 focus:border-blue-500 rounded-2xl px-4 py-3"
      },
      size: {
        sm: "text-sm py-2 px-3 rounded-lg",
        md: "text-base py-3 px-4 rounded-xl",
        lg: "text-lg py-4 px-5 rounded-2xl"
      },
      state: {
        default: "",
        success: "border-green-500 focus:border-green-600 bg-green-50 focus:bg-white",
        error: "border-red-500 focus:border-red-600 bg-red-50 focus:bg-white",
        warning: "border-orange-500 focus:border-orange-600 bg-orange-50 focus:bg-white"
      }
    },
    defaultVariants: {
      variant: "clean",
      size: "md",
      state: "default"
    }
  }
);

const floatingLabelVariants = cva(
  "absolute left-4 transition-all duration-300 pointer-events-none origin-left",
  {
    variants: {
      variant: {
        floating: "left-0",
        glass: "left-4",
        clean: "left-4",
        premium: "left-4",
        minimal: "left-4",
        neon: "left-4 text-cyan-300",
        soft: "left-4"
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      },
      focused: {
        true: "scale-75 -translate-y-6 text-blue-500",
        false: "top-1/2 -translate-y-1/2 text-gray-500"
      },
      hasValue: {
        true: "scale-75 -translate-y-6",
        false: ""
      }
    },
    defaultVariants: {
      variant: "clean",
      size: "md",
      focused: false,
      hasValue: false
    }
  }
);

export interface ModernInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof modernInputVariants> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  floatingLabel?: boolean;
  animatedBorder?: boolean;
  glowEffect?: boolean;
  particleEffect?: boolean;
  magneticLabel?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
}

export const ModernInput = React.forwardRef<HTMLInputElement, ModernInputProps>(
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
    floatingLabel = false,
    animatedBorder = false,
    glowEffect = false,
    particleEffect = false,
    magneticLabel = false,
    type = 'text',
    value,
    onChange,
    onFocus,
    onBlur,
    ...props
  }, ref) => {
    const [focused, setFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value));
    const [particles, setParticles] = useState<Particle[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();

    useEffect(() => {
      setHasValue(Boolean(value));
    }, [value]);

    // Particle animation
    useEffect(() => {
      if (!particleEffect || !focused) {
        setParticles([]);
        return;
      }

      const animate = () => {
        setParticles(prev => {
          const updated = prev.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          })).filter(p => p.life > 0);

          // Add new particles
          if (Math.random() < 0.2 && updated.length < 5) {
            updated.push({
              id: Date.now(),
              x: Math.random() * 100,
              y: 50 + Math.random() * 20,
              vx: (Math.random() - 0.5) * 0.5,
              vy: -Math.random() * 0.5,
              life: 60
            });
          }

          return updated;
        });

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [particleEffect, focused]);

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

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!magneticLabel) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    const finalState = errorMessage ? 'error' : successMessage ? 'success' : state;

    return (
      <div className="relative space-y-1">
        <div 
          ref={containerRef}
          className="relative"
          onMouseMove={handleMouseMove}
        >
          {/* Premium gradient border */}
          {variant === 'premium' && (
            <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 focus-within:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full bg-white rounded-[calc(1rem-2px)]" />
            </div>
          )}

          {/* Animated border */}
          {animatedBorder && focused && (
            <div className="absolute inset-0 rounded-inherit">
              <div className="absolute inset-0 rounded-inherit border-2 border-blue-500 animate-pulse" />
              <div className="absolute inset-0 rounded-inherit border border-blue-400 animate-ping" />
            </div>
          )}

          {/* Glow effect */}
          {glowEffect && focused && (
            <div className="absolute inset-0 rounded-inherit bg-blue-500/20 blur-lg -z-10 animate-pulse" />
          )}

          {/* Particles */}
          {particleEffect && particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                opacity: particle.life / 60
              }}
            />
          ))}

          {/* Left Icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 transition-transform duration-200 group-focus-within:scale-110">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref || inputRef}
            type={type}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              modernInputVariants({ variant, size, state: finalState }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              glowEffect && focused && "relative z-10",
              className
            )}
            {...props}
          />

          {/* Floating Label */}
          {floatingLabel && label && (
            <label
              className={cn(
                floatingLabelVariants({ 
                  variant, 
                  size, 
                  focused, 
                  hasValue: hasValue || focused 
                }),
                magneticLabel && "transition-transform duration-100",
                variant === 'floating' && "top-8",
                (variant !== 'floating') && (focused || hasValue) && "top-0"
              )}
              style={magneticLabel && focused ? {
                transform: `translate(${(mousePos.x - 50) * 0.1}px, ${(mousePos.y - 50) * 0.1}px) scale(0.75) translateY(-1.5rem)`
              } : undefined}
            >
              {label}
            </label>
          )}

          {/* Right Icons */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {loading && (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
            
            {rightIcon && !loading && (
              <div className="text-gray-400 transition-transform duration-200 group-focus-within:scale-110">
                {rightIcon}
              </div>
            )}
          </div>

          {/* Animated underline for floating variant */}
          {variant === 'floating' && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transform origin-left scale-x-0 focus-within:scale-x-100 transition-transform duration-300 w-full" />
          )}

          {/* Status indicator */}
          {finalState !== 'default' && (
            <div className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full",
              finalState === 'success' && "bg-green-500",
              finalState === 'error' && "bg-red-500",
              finalState === 'warning' && "bg-orange-500"
            )} />
          )}
        </div>

        {/* Non-floating Label */}
        {!floatingLabel && label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        {/* Helper/Error/Success Text */}
        {(errorMessage || successMessage || helperText) && (
          <div className="flex items-center gap-2">
            {finalState === 'error' && (
              <div className="w-4 h-4 text-red-500">⚠️</div>
            )}
            {finalState === 'success' && (
              <div className="w-4 h-4 text-green-500">✅</div>
            )}
            <p className={cn(
              "text-sm transition-colors duration-200",
              errorMessage ? "text-red-600" : 
              successMessage ? "text-green-600" : 
              "text-gray-500"
            )}>
              {errorMessage || successMessage || helperText}
            </p>
          </div>
        )}
      </div>
    );
  }
);

ModernInput.displayName = "ModernInput";