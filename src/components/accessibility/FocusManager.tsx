import React, { useEffect } from 'react';
import { useFocusTrap, useFocusRestore } from '../../utils/accessibility';

interface FocusTrapProps {
  children: React.ReactNode;
  isActive?: boolean;
  restoreFocus?: boolean;
  className?: string;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({
  children,
  isActive = true,
  restoreFocus = true,
  className = '',
}) => {
  const containerRef = useFocusTrap(isActive);
  const { saveFocus, restoreFocus: restore } = useFocusRestore();

  useEffect(() => {
    if (isActive && restoreFocus) {
      saveFocus();
      
      return () => {
        restore();
      };
    }
  }, [isActive, restoreFocus, saveFocus, restore]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// Focus indicator component for better visibility
interface FocusIndicatorProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export const FocusIndicator: React.FC<FocusIndicatorProps> = ({
  children,
  className = '',
  offset = 4,
}) => {
  return (
    <div className={`focus-indicator ${className}`}>
      {children}
      <style jsx>{`
        .focus-indicator {
          position: relative;
        }
        
        .focus-indicator :global(*:focus) {
          outline: none;
          position: relative;
        }
        
        .focus-indicator :global(*:focus)::after {
          content: '';
          position: absolute;
          top: -${offset}px;
          right: -${offset}px;
          bottom: -${offset}px;
          left: -${offset}px;
          border: 2px solid #2563eb;
          border-radius: 4px;
          pointer-events: none;
          z-index: 1;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .focus-indicator :global(*:focus)::after {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};