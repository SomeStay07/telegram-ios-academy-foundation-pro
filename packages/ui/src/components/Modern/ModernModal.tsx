import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modernModalVariants = cva(
  "relative bg-white rounded-3xl shadow-2xl transition-all duration-500 overflow-hidden",
  {
    variants: {
      variant: {
        // iOS-style modal with blur
        ios: "bg-white/95 backdrop-blur-xl shadow-xl shadow-black/20 border border-gray-200/50",
        
        // Glassmorphism like premium apps
        glass: "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/40",
        
        // Dark mode glass
        dark: "bg-gray-900/90 backdrop-blur-2xl border border-white/10 text-white shadow-2xl shadow-black/60",
        
        // Premium gradient modal
        premium: "bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl shadow-purple-500/20 border border-purple-200/50",
        
        // Neon cyberpunk modal
        neon: "bg-gray-900/95 backdrop-blur-xl border border-cyan-500/50 text-cyan-100 shadow-2xl shadow-cyan-500/40",
        
        // Floating modern style
        floating: "bg-white shadow-2xl shadow-black/10 border-0 hover:shadow-3xl",
        
        // Notion-style clean modal
        clean: "bg-white shadow-xl shadow-gray-200/50 border border-gray-200",
        
        // Telegram-style modal
        telegram: "bg-white shadow-xl shadow-blue-500/20 border border-blue-200/50"
      },
      size: {
        sm: "w-full max-w-md p-6",
        md: "w-full max-w-lg p-8", 
        lg: "w-full max-w-2xl p-10",
        xl: "w-full max-w-4xl p-12",
        fullscreen: "w-full h-full max-w-none max-h-none p-8 rounded-none"
      },
      animation: {
        slide: "animate-in slide-in-from-bottom-4 duration-300",
        scale: "animate-in zoom-in-95 duration-300",
        fade: "animate-in fade-in duration-300",
        bounce: "animate-in zoom-in-95 animate-bounce duration-500"
      }
    },
    defaultVariants: {
      variant: "glass",
      size: "md", 
      animation: "scale"
    }
  }
);

const overlayVariants = cva(
  "fixed inset-0 z-50 transition-all duration-300",
  {
    variants: {
      variant: {
        ios: "bg-black/50 backdrop-blur-sm",
        glass: "bg-black/30 backdrop-blur-md",
        dark: "bg-black/70 backdrop-blur-sm", 
        premium: "bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-md",
        neon: "bg-gray-900/80 backdrop-blur-sm",
        floating: "bg-black/40 backdrop-blur-sm",
        clean: "bg-black/50",
        telegram: "bg-blue-900/50 backdrop-blur-sm"
      }
    },
    defaultVariants: {
      variant: "glass"
    }
  }
);

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface ModernModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modernModalVariants> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  hapticFeedback?: boolean;
  particleEffect?: boolean;
  morphingBackground?: boolean;
  glowEffect?: boolean;
  magneticEffect?: boolean;
  shimmerEffect?: boolean;
}

export const ModernModal = React.forwardRef<HTMLDivElement, ModernModalProps>(
  ({
    className,
    variant,
    size,
    animation,
    isOpen,
    onClose,
    title,
    children,
    footer,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    showCloseButton = true,
    hapticFeedback = false,
    particleEffect = false,
    morphingBackground = false,
    glowEffect = false,
    magneticEffect = false,
    shimmerEffect = false,
    ...props
  }, ref) => {
    const [particles, setParticles] = useState<FloatingParticle[]>([]);
    const [isClosing, setIsClosing] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const modalRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();

    // Particle animation
    useEffect(() => {
      if (!particleEffect || !isOpen) return;

      const animate = () => {
        setParticles(prev => {
          const updated = prev.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          })).filter(p => p.life > 0);

          // Add new particles
          if (Math.random() < 0.2 && updated.length < 15) {
            const colors = variant === 'neon' 
              ? ['#06B6D4', '#3B82F6', '#8B5CF6'] 
              : ['#3B82F6', '#8B5CF6', '#06B6D4', '#F59E0B'];
            
            updated.push({
              id: Date.now(),
              x: Math.random() * 100,
              y: Math.random() * 100,
              vx: (Math.random() - 0.5) * 1,
              vy: (Math.random() - 0.5) * 1,
              life: 60,
              color: colors[Math.floor(Math.random() * colors.length)]
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
    }, [particleEffect, isOpen, variant]);

    // Escape key handler
    useEffect(() => {
      if (!closeOnEscape || !isOpen) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [closeOnEscape, isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    const handleClose = () => {
      // Haptic feedback for Telegram
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }

      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        onClose();
      }, 300);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!magneticEffect) return;
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    if (!isOpen && !isClosing) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <div
          className={cn(
            overlayVariants({ variant }),
            isClosing && "animate-out fade-out duration-300"
          )}
          onClick={handleOverlayClick}
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={cn(
            modernModalVariants({ variant, size, animation }),
            isClosing && "animate-out zoom-out-95 fade-out duration-300",
            className
          )}
          onMouseMove={handleMouseMove}
          {...props}
        >
          {/* Morphing background */}
          {morphingBackground && (
            <div 
              className="absolute inset-0 opacity-20 transition-all duration-1000"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, #3B82F6, #8B5CF6, transparent)`
              }}
            />
          )}

          {/* Glow effect */}
          {glowEffect && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10 animate-pulse" />
          )}

          {/* Shimmer effect */}
          {shimmerEffect && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
          )}

          {/* Particles */}
          {particleEffect && particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full pointer-events-none"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                backgroundColor: particle.color,
                opacity: particle.life / 60
              }}
            />
          ))}

          {/* Close Button */}
          {showCloseButton && (
            <button
              onClick={handleClose}
              className={cn(
                "absolute top-4 right-4 w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center z-10",
                "hover:scale-110 active:scale-95",
                variant === 'dark' || variant === 'neon' 
                  ? "bg-white/10 hover:bg-white/20 text-white" 
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              )}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Header */}
          {title && (
            <div className="mb-6">
              <h2 className={cn(
                "text-2xl font-bold transition-all duration-200",
                variant === 'dark' || variant === 'neon' ? "text-white" : "text-gray-900"
              )}>
                {title}
              </h2>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 relative z-10">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="mt-6 pt-6 border-t border-gray-200/50">
              {footer}
            </div>
          )}

          {/* Decorative elements for premium variant */}
          {variant === 'premium' && (
            <>
              <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-sm opacity-75 animate-pulse" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-sm opacity-75 animate-pulse delay-500" />
            </>
          )}

          {/* Neon glow for neon variant */}
          {variant === 'neon' && (
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl -z-10 animate-pulse" />
          )}

          {/* Glass border gradient */}
          {variant === 'glass' && (
            <div className="absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-br from-white/30 to-white/10">
              <div className="w-full h-full rounded-inherit bg-transparent" />
            </div>
          )}

          {/* iOS-style handle for dragging */}
          {variant === 'ios' && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-300 rounded-full" />
          )}
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
        `}</style>
      </div>
    );
  }
);

ModernModal.displayName = "ModernModal";