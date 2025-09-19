import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-200 shadow-sm hover:shadow-md",
        elevated: "bg-white shadow-lg hover:shadow-xl border border-gray-100",
        outlined: "bg-white border-2 border-gray-200 hover:border-gray-300",
        filled: "bg-gray-50 hover:bg-gray-100 border border-gray-200",
        glassmorphism: "bg-white/80 backdrop-blur-md border border-white/20 shadow-lg",
        telegram: "bg-[var(--tg-theme-bg-color,#ffffff)] border border-[var(--tg-theme-secondary-bg-color,#f1f1f1)] shadow-sm hover:shadow-md",
        floating: "bg-white shadow-2xl hover:shadow-3xl border border-gray-100 hover:-translate-y-1",
        gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md hover:shadow-lg"
      },
      size: {
        sm: "p-4 rounded-lg",
        md: "p-6 rounded-xl",
        lg: "p-8 rounded-2xl",
        xl: "p-10 rounded-3xl"
      },
      interactive: {
        true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98] transform",
        false: ""
      },
      loading: {
        true: "animate-pulse",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
      loading: false
    }
  }
);

const headerVariants = cva(
  "flex items-center justify-between",
  {
    variants: {
      size: {
        sm: "mb-3",
        md: "mb-4",
        lg: "mb-6",
        xl: "mb-8"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const contentVariants = cva(
  "space-y-2",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const footerVariants = cva(
  "flex items-center justify-between",
  {
    variants: {
      size: {
        sm: "mt-3 pt-3 border-t border-gray-100",
        md: "mt-4 pt-4 border-t border-gray-100",
        lg: "mt-6 pt-6 border-t border-gray-100",
        xl: "mt-8 pt-8 border-t border-gray-100"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  onCardClick?: () => void;
  hapticFeedback?: boolean;
  shimmer?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant,
    size,
    interactive,
    loading,
    header,
    footer,
    children,
    onCardClick,
    hapticFeedback = false,
    shimmer = false,
    onClick,
    ...props
  }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (interactive && !loading) {
        // Haptic feedback for Telegram
        if (hapticFeedback && typeof window !== 'undefined' && window.Telegram?.WebApp) {
          window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
        }
        
        onCardClick?.();
        onClick?.(e);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, interactive, loading }),
          className
        )}
        onClick={handleClick}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        {...props}
      >
        {/* Shimmer effect */}
        {shimmer && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" />
        )}

        {/* Header */}
        {header && (
          <div className={cn(headerVariants({ size }))}>
            {header}
          </div>
        )}

        {/* Content */}
        {children && (
          <div className={cn(contentVariants({ size }))}>
            {children}
          </div>
        )}

        {/* Footer */}
        {footer && (
          <div className={cn(footerVariants({ size }))}>
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = "Card";

// Compound Components
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ className, size = 'md', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(headerVariants({ size }), className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ className, size = 'md', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(contentVariants({ size }), className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: 'sm' | 'md' | 'lg' | 'xl' }
>(({ className, size = 'md', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(footerVariants({ size }), className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";