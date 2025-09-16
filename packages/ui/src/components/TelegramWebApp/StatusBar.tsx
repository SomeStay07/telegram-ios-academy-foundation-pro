import React, { useEffect, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const statusBarVariants = cva(
  "w-full flex items-center justify-between px-4 py-2 text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 border-b border-gray-200",
        telegram: "bg-[var(--tg-theme-bg-color,#ffffff)] text-[var(--tg-theme-text-color,#000000)]",
        transparent: "bg-transparent text-gray-900",
        dark: "bg-gray-900 text-white"
      },
      position: {
        static: "relative",
        fixed: "fixed top-0 left-0 right-0 z-50",
        sticky: "sticky top-0 z-40"
      }
    },
    defaultVariants: {
      variant: "telegram",
      position: "sticky"
    }
  }
);

export interface StatusBarProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBarVariants> {
  title?: string;
  showBattery?: boolean;
  showTime?: boolean;
  showSignal?: boolean;
  customLeft?: React.ReactNode;
  customRight?: React.ReactNode;
}

export const StatusBar = React.forwardRef<HTMLDivElement, StatusBarProps>(
  ({ 
    className, 
    variant, 
    position,
    title,
    showBattery = true,
    showTime = true,
    showSignal = true,
    customLeft,
    customRight,
    ...props 
  }, ref) => {
    const [currentTime, setCurrentTime] = useState('');
    const [batteryLevel, setBatteryLevel] = useState(100);

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString('ru-RU', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }));
      };

      updateTime();
      const interval = setInterval(updateTime, 1000);

      return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      if (showBattery && 'getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          setBatteryLevel(Math.round(battery.level * 100));
          
          const updateBattery = () => {
            setBatteryLevel(Math.round(battery.level * 100));
          };
          
          battery.addEventListener('levelchange', updateBattery);
          
          return () => {
            battery.removeEventListener('levelchange', updateBattery);
          };
        });
      }
    }, [showBattery]);

    return (
      <div
        className={cn(statusBarVariants({ variant, position, className }))}
        ref={ref}
        {...props}
      >
        <div className="flex items-center gap-2">
          {customLeft || (
            <>
              {showTime && (
                <span className="font-mono text-sm">
                  {currentTime}
                </span>
              )}
              {title && (
                <span className="font-semibold truncate max-w-32">
                  {title}
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {customRight || (
            <>
              {showSignal && (
                <div className="flex items-center gap-0.5">
                  <div className="w-1 h-2 bg-current rounded-full opacity-100"></div>
                  <div className="w-1 h-3 bg-current rounded-full opacity-80"></div>
                  <div className="w-1 h-4 bg-current rounded-full opacity-60"></div>
                  <div className="w-1 h-5 bg-current rounded-full opacity-40"></div>
                </div>
              )}
              
              {showBattery && (
                <div className="flex items-center gap-1">
                  <span className="text-xs font-mono">
                    {batteryLevel}%
                  </span>
                  <div className="relative w-6 h-3 border border-current rounded-sm">
                    <div 
                      className="absolute inset-0.5 bg-current rounded-sm transition-all duration-300"
                      style={{ width: `${batteryLevel}%` }}
                    />
                    <div className="absolute -right-0.5 top-1/2 transform -translate-y-1/2 w-0.5 h-1.5 bg-current rounded-r-sm" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
);

StatusBar.displayName = "StatusBar";