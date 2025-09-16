import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const modernNavigationVariants = cva(
  "relative flex transition-all duration-500 overflow-hidden",
  {
    variants: {
      variant: {
        // iOS-style bottom navigation
        ios: "bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-lg shadow-black/5",
        
        // Telegram-style navigation
        telegram: "bg-blue-500 text-white shadow-xl shadow-blue-500/25",
        
        // Discord-style sidebar
        discord: "bg-gray-900 text-white shadow-2xl border-r border-gray-800",
        
        // Notion-style sidebar
        notion: "bg-gray-50 text-gray-900 border-r border-gray-200 shadow-sm",
        
        // Linear-style with gradient
        linear: "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25",
        
        // Glassmorphism floating nav
        glass: "bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl",
        
        // Neon cyberpunk style
        neon: "bg-gray-900 border border-cyan-500/50 text-cyan-100 shadow-lg shadow-cyan-500/25",
        
        // Premium floating navigation
        premium: "bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-xl shadow-orange-500/30"
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col"
      },
      position: {
        top: "top-0 left-0 right-0",
        bottom: "bottom-0 left-0 right-0",
        left: "top-0 left-0 bottom-0",
        right: "top-0 right-0 bottom-0",
        floating: "fixed inset-x-4 bottom-4 rounded-2xl"
      },
      size: {
        sm: "p-2",
        md: "p-4",
        lg: "p-6"
      }
    },
    defaultVariants: {
      variant: "ios",
      orientation: "horizontal", 
      position: "bottom",
      size: "md"
    }
  }
);

const navigationItemVariants = cva(
  "relative flex items-center justify-center transition-all duration-300 cursor-pointer group overflow-hidden",
  {
    variants: {
      variant: {
        ios: "text-gray-600 hover:text-blue-500 active:scale-95",
        telegram: "text-white/70 hover:text-white active:scale-95",
        discord: "text-gray-400 hover:text-white hover:bg-gray-800 active:scale-95",
        notion: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 active:scale-95",
        linear: "text-white/80 hover:text-white active:scale-95",
        glass: "text-white/70 hover:text-white hover:bg-white/10 active:scale-95",
        neon: "text-cyan-300/70 hover:text-cyan-100 hover:shadow-lg hover:shadow-cyan-500/50 active:scale-95",
        premium: "text-white/80 hover:text-white active:scale-95"
      },
      orientation: {
        horizontal: "flex-col gap-1 px-4 py-2 min-w-0 flex-1",
        vertical: "flex-row gap-3 px-4 py-3 w-full"
      },
      active: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      variant: "ios",
      orientation: "horizontal",
      active: false
    }
  }
);

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  onClick?: () => void;
}

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export interface ModernNavigationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modernNavigationVariants> {
  items: NavigationItem[];
  activeItem?: string;
  onItemClick?: (itemId: string) => void;
  showActiveIndicator?: boolean;
  hapticFeedback?: boolean;
  magneticEffect?: boolean;
  particleEffect?: boolean;
  morphingBackground?: boolean;
  glowEffect?: boolean;
}

export const ModernNavigation = React.forwardRef<HTMLDivElement, ModernNavigationProps>(
  ({
    className,
    variant,
    orientation,
    position,
    size,
    items,
    activeItem,
    onItemClick,
    showActiveIndicator = true,
    hapticFeedback = false,
    magneticEffect = false,
    particleEffect = false,
    morphingBackground = false,
    glowEffect = false,
    ...props
  }, ref) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [particles, setParticles] = useState<FloatingParticle[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
    const navRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const animationRef = useRef<number>();

    // Particle animation
    useEffect(() => {
      if (!particleEffect || !hoveredItem) return;

      const animate = () => {
        setParticles(prev => {
          const updated = prev.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 1
          })).filter(p => p.life > 0);

          // Add new particles
          if (Math.random() < 0.3 && updated.length < 8) {
            const colors = ['#3B82F6', '#8B5CF6', '#06B6D4', '#F59E0B'];
            updated.push({
              id: Date.now(),
              x: Math.random() * 100,
              y: Math.random() * 100,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              life: 30,
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
    }, [particleEffect, hoveredItem]);

    // Update active indicator position
    useEffect(() => {
      if (!showActiveIndicator || !activeItem || !itemRefs.current[activeItem]) return;

      const activeElement = itemRefs.current[activeItem];
      if (!activeElement || !navRef.current) return;

      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeElement.getBoundingClientRect();

      if (orientation === 'horizontal') {
        setIndicatorStyle({
          position: 'absolute',
          bottom: '8px',
          left: itemRect.left - navRect.left + 'px',
          width: itemRect.width + 'px',
          height: '3px',
          transform: 'translateX(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        });
      } else {
        setIndicatorStyle({
          position: 'absolute',
          left: '8px',
          top: itemRect.top - navRect.top + 'px',
          width: '3px',
          height: itemRect.height + 'px',
          transform: 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        });
      }
    }, [activeItem, orientation, showActiveIndicator, items]);

    const handleItemClick = (item: NavigationItem) => {
      // Haptic feedback for Telegram
      if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      }

      item.onClick?.();
      onItemClick?.(item.id);
    };

    const handleItemHover = (itemId: string | null) => {
      setHoveredItem(itemId);
    };

    return (
      <nav
        ref={navRef}
        className={cn(
          modernNavigationVariants({ variant, orientation, position, size }),
          position === 'floating' && 'fixed',
          position !== 'floating' && 'fixed',
          className
        )}
        {...props}
      >
        {/* Morphing background */}
        {morphingBackground && hoveredItem && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-inherit transition-opacity duration-500" />
        )}

        {/* Glow effect */}
        {glowEffect && activeItem && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl -z-10 animate-pulse" />
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
              opacity: particle.life / 30
            }}
          />
        ))}

        {/* Navigation Items */}
        {items.map((item) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[item.id] = el)}
            className={cn(
              navigationItemVariants({ 
                variant, 
                orientation, 
                active: activeItem === item.id 
              }),
              activeItem === item.id && variant === 'ios' && "text-blue-500",
              activeItem === item.id && variant === 'telegram' && "text-white",
              activeItem === item.id && variant === 'discord' && "bg-gray-800 text-white",
              activeItem === item.id && variant === 'notion' && "bg-gray-100 text-gray-900",
              activeItem === item.id && variant === 'linear' && "text-white",
              activeItem === item.id && variant === 'glass' && "bg-white/20 text-white",
              activeItem === item.id && variant === 'neon' && "text-cyan-100 shadow-lg shadow-cyan-500/50",
              activeItem === item.id && variant === 'premium' && "text-white"
            )}
            onClick={() => handleItemClick(item)}
            onMouseEnter={() => handleItemHover(item.id)}
            onMouseLeave={() => handleItemHover(null)}
          >
            {/* Magnetic effect */}
            {magneticEffect && hoveredItem === item.id && (
              <div className="absolute inset-0 bg-current opacity-10 rounded-lg transform scale-110 transition-transform duration-200" />
            )}

            {/* Icon with animation */}
            <div className={cn(
              "relative transition-transform duration-200",
              hoveredItem === item.id && "scale-110",
              activeItem === item.id && "scale-105"
            )}>
              {item.icon}
              
              {/* Badge */}
              {item.badge && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 animate-pulse">
                  {item.badge}
                </div>
              )}

              {/* Sparkle effect for active item */}
              {activeItem === item.id && variant === 'premium' && (
                <>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping delay-300" />
                </>
              )}
            </div>

            {/* Label */}
            <span className={cn(
              "text-xs font-medium transition-all duration-200",
              orientation === 'vertical' && "text-sm",
              hoveredItem === item.id && "scale-105"
            )}>
              {item.label}
            </span>

            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-current opacity-0 group-active:opacity-20 transition-opacity duration-150 transform scale-0 group-active:scale-100" />
            </div>
          </div>
        ))}

        {/* Active Indicator */}
        {showActiveIndicator && activeItem && (
          <div
            className={cn(
              "absolute rounded-full transition-all duration-300",
              variant === 'ios' && "bg-blue-500",
              variant === 'telegram' && "bg-white",
              variant === 'discord' && "bg-white",
              variant === 'notion' && "bg-gray-900",
              variant === 'linear' && "bg-white",
              variant === 'glass' && "bg-white",
              variant === 'neon' && "bg-cyan-400 shadow-lg shadow-cyan-400/50",
              variant === 'premium' && "bg-gradient-to-r from-yellow-300 to-orange-400"
            )}
            style={indicatorStyle}
          />
        )}

        {/* Premium decorative elements */}
        {variant === 'premium' && (
          <>
            <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse delay-500" />
          </>
        )}

        {/* Neon glow */}
        {variant === 'neon' && (
          <div className="absolute inset-0 bg-cyan-500/10 blur-xl -z-10 animate-pulse" />
        )}

        {/* Glass border gradient */}
        {variant === 'glass' && (
          <div className="absolute inset-0 rounded-inherit p-[1px] bg-gradient-to-r from-white/30 to-white/10">
            <div className="w-full h-full rounded-inherit bg-transparent" />
          </div>
        )}
      </nav>
    );
  }
);

ModernNavigation.displayName = "ModernNavigation";