import React from 'react';
import { visuallyHiddenStyles, SROnlyProps } from '../../utils/accessibility';

export const ScreenReaderOnly: React.FC<SROnlyProps> = ({
  children,
  as: Component = 'span',
}) => {
  const Element = Component as any;
  return (
    <Element style={visuallyHiddenStyles}>
      {children}
    </Element>
  );
};

// Live region component for dynamic announcements
interface LiveRegionProps {
  message: string;
  ariaLive?: 'polite' | 'assertive';
  clearAfter?: number;
}

export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  ariaLive = 'polite',
  clearAfter = 1000,
}) => {
  const [currentMessage, setCurrentMessage] = React.useState(message);

  React.useEffect(() => {
    setCurrentMessage(message);
    
    if (message && clearAfter > 0) {
      const timer = setTimeout(() => {
        setCurrentMessage('');
      }, clearAfter);
      
      return () => clearTimeout(timer);
    }
  }, [message, clearAfter]);

  return (
    <div
      role="status"
      aria-live={ariaLive}
      aria-atomic="true"
      style={visuallyHiddenStyles}
    >
      {currentMessage}
    </div>
  );
};