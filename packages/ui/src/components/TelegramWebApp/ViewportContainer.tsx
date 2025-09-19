import React, { useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const viewportContainerVariants = cva(
  "min-h-screen w-full transition-all duration-300 ease-in-out",
  {
    variants: {
      theme: {
        auto: "",
        light: "bg-white text-black",
        dark: "bg-gray-900 text-white",
        telegram: "bg-[var(--tg-theme-bg-color,#ffffff)] text-[var(--tg-theme-text-color,#000000)]"
      },
      safeArea: {
        none: "",
        top: "pt-safe-top",
        bottom: "pb-safe-bottom", 
        both: "pt-safe-top pb-safe-bottom"
      },
      padding: {
        none: "",
        sm: "p-2",
        md: "p-4", 
        lg: "p-6",
        xl: "p-8"
      }
    },
    defaultVariants: {
      theme: "telegram",
      safeArea: "both",
      padding: "none"
    }
  }
);

export interface ViewportContainerProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof viewportContainerVariants> {
  expandViewport?: boolean;
  enableClosingConfirmation?: boolean;
  headerColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

export const ViewportContainer = React.forwardRef<HTMLDivElement, ViewportContainerProps>(
  ({ 
    className, 
    theme,
    safeArea,
    padding,
    expandViewport = true,
    enableClosingConfirmation = false,
    headerColor,
    backgroundColor,
    children,
    ...props 
  }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [viewportHeight, setViewportHeight] = useState('100vh');

    useEffect(() => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Initialize Telegram WebApp
        tg.ready();
        
        // Expand viewport if requested
        if (expandViewport && !isExpanded) {
          tg.expand();
          setIsExpanded(true);
        }
        
        // Enable closing confirmation
        if (enableClosingConfirmation) {
          tg.enableClosingConfirmation();
        }
        
        // Set header color
        if (headerColor) {
          tg.setHeaderColor(headerColor);
        }
        
        // Set background color  
        if (backgroundColor) {
          tg.setBackgroundColor(backgroundColor);
        }
        
        // Update viewport height based on Telegram's viewport
        const updateViewportHeight = () => {
          const height = tg.viewportStableHeight || tg.viewportHeight || window.innerHeight;
          setViewportHeight(`${height}px`);
        };
        
        updateViewportHeight();
        tg.onEvent('viewportChanged', updateViewportHeight);
        
        return () => {
          tg.offEvent('viewportChanged', updateViewportHeight);
          if (enableClosingConfirmation) {
            tg.disableClosingConfirmation();
          }
        };
      } else {
        // Fallback for non-Telegram environments
        const updateHeight = () => {
          setViewportHeight(`${window.innerHeight}px`);
        };
        
        updateHeight();
        window.addEventListener('resize', updateHeight);
        
        return () => {
          window.removeEventListener('resize', updateHeight);
        };
      }
    }, [expandViewport, enableClosingConfirmation, headerColor, backgroundColor, isExpanded]);

    return (
      <div
        className={cn(viewportContainerVariants({ theme, safeArea, padding, className }))}
        style={{ 
          minHeight: viewportHeight,
          height: viewportHeight
        }}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ViewportContainer.displayName = "ViewportContainer";