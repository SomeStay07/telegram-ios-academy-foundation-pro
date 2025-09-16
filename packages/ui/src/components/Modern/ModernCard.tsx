import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modernCardVariants = cva(
  "relative overflow-hidden transition-all duration-500 group cursor-pointer",
  {
    variants: {
      variant: {
        // Notion-style elegant card
        elegant: "bg-white border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transform hover:-translate-y-1",
        
        // Linear-style dark with glow
        dark: "bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-gray-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transform hover:-translate-y-1",
        
        // Glassmorphism like in top iOS apps
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl hover:bg-white/20 transform hover:-translate-y-1",
        
        // Premium gradient like Duolingo Plus
        premium: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-0 shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transform hover:-translate-y-1 hover:scale-[1.02]",
        
        // Neon cyber effect
        neon: "bg-gradient-to-br from-cyan-900 to-blue-900 border border-cyan-500/50 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/50 transform hover:-translate-y-1",
        
        // Minimal modern
        minimal: "bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5",
        
        // Floating like Discord cards
        floating: "bg-white border-0 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:rotate-1",
        
        // Interactive like Telegram mini apps
        interactive: "bg-white border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-lg hover:shadow-blue-200/50 transform hover:-translate-y-1 hover:scale-[1.01]"
      },
      size: {
        sm: "p-4 rounded-xl",
        md: "p-6 rounded-2xl",
        lg: "p-8 rounded-3xl",
        xl: "p-10 rounded-3xl"
      },
      glow: {
        true: "before:absolute before:inset-0 before:rounded-inherit before:p-[1px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 before:-z-10",
        false: ""
      }
    },
    defaultVariants: {
      variant: "elegant",
      size: "md",
      glow: false
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
}

export interface ModernCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modernCardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onCardClick?: () => void;
  hapticFeedback?: boolean;
  shimmerEffect?: boolean;
  floatingParticles?: boolean;
  magneticEffect?: boolean;
  tiltEffect?: boolean;
}

export const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({
    className,
    variant,
    size,
    glow,
    header,
    footer,
    children,
    onCardClick,
    hapticFeedback = false,
    shimmerEffect = false,
    floatingParticles = false,
    magneticEffect = false,
    tiltEffect = false,
    onClick,
    onMouseMove,
    onMouseLeave,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState<FloatingParticle[]>([]);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const cardRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();

    // Particle animation
    useEffect(() => {
      if (!floatingParticles || !isHovered) return;

      const animate = () => {
        setParticles(prev => {
          const updated = prev.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          })).filter(p => p.life > 0);

          // Add new particles
          if (Math.random() < 0.3 && updated.length < 10) {
            updated.push({
              id: Date.now(),
              x: Math.random() * 100,
              y: Math.random() * 100,
              vx: (Math.random() - 0.5) * 0.5,
              vy: (Math.random() - 0.5) * 0.5,
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
    }, [floatingParticles, isHovered]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePos({ x, y });

      // Magnetic effect
      if (magneticEffect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        e.currentTarget.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
      }

      // Tilt effect
      if (tiltEffect) {
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * 10;
        const rotateY = (centerX - x) / centerX * 10;
        
        setTilt({ rotateX, rotateY });
      }

      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      setParticles([]);
      
      if (magneticEffect) {
        e.currentTarget.style.transform = '';
      }
      
      if (tiltEffect) {
        setTilt({ rotateX: 0, rotateY: 0 });
      }

      onMouseLeave?.(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // Haptic feedback for Telegram
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }

      onCardClick?.();
      onClick?.(e);
    };

    return (
      <div
        ref={cardRef}
        className={cn(modernCardVariants({ variant, size, glow }), className)}
        style={tiltEffect ? {
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 0.1s ease-out'
        } : undefined}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {/* Shimmer effect */}
        {shimmerEffect && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        )}

        {/* Floating particles */}
        {floatingParticles && particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full pointer-events-none animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.life / 60
            }}
          />
        ))}

        {/* Spotlight effect */}
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: mousePos.x - 100,
              top: mousePos.y - 100,
              width: 200,
              height: 200,
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              borderRadius: '50%'
            }}
          />
        )}

        {/* Content container */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Header */}
          {header && (
            <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
              {header}
            </div>
          )}

          {/* Main content */}
          <div className="flex-1">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="mt-4 pt-4 border-t border-gray-200/50 transform group-hover:scale-105 transition-transform duration-300">
              {footer}
            </div>
          )}
        </div>

        {/* Decorative elements for premium variant */}
        {variant === 'premium' && (
          <>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-sm opacity-75 animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-gradient-to-br from-red-400 to-pink-500 rounded-full blur-sm opacity-75 animate-pulse delay-500" />
          </>
        )}

        {/* Neon glow for neon variant */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl group-hover:from-cyan-400/30 group-hover:to-blue-400/30 transition-all duration-500 -z-10" />
        )}

        {/* Border gradient for glass variant */}
        {variant === 'glass' && (
          <div className="absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-br from-white/30 to-white/10 group-hover:from-white/40 group-hover:to-white/20 transition-all duration-500">
            <div className="w-full h-full rounded-inherit bg-transparent" />
          </div>
        )}
      </div>
    );
  }
);

ModernCard.displayName = "ModernCard";