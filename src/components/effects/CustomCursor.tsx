import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

interface CustomCursorProps {
  color?: string;
  size?: number;
  exclusionZones?: string[];
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  color = '#4169e1',
  size = 20,
  exclusionZones = ['.interactive-element', 'a', 'button', 'input', 'textarea', 'select']
}) => {
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'link' | 'text' | 'drag'>('default');
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerCursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = Array(3).fill(0).map(() => useRef<HTMLDivElement>(null));
  const isInitialized = useRef(false);
  
  // Use motion values for better performance
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Apply spring physics with optimized settings
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 25, mass: 0.5 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 25, mass: 0.5 });
  
  // Use requestAnimationFrame for trail effects
  useEffect(() => {
    if (!isInitialized.current) {
      // Only hide default cursor after custom cursor is confirmed visible
      // This prevents users from losing their cursor if the component fails
      const handleFirstMove = () => {
        if (visible) {
          document.documentElement.style.cursor = 'none';
          document.removeEventListener('pointermove', handleFirstMove);
        }
      };
      
      // Fix for cursor disappearing when leaving window
      const handleMouseLeave = () => setVisible(false);
      const handleMouseEnter = () => setVisible(true);
      
      document.addEventListener('mouseleave', handleMouseLeave);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('pointermove', handleFirstMove);
      
      isInitialized.current = true;
      
      // Initial position to avoid cursor jumping
      if (typeof window !== 'undefined') {
        mouseX.set(window.innerWidth / 2);
        mouseY.set(window.innerHeight / 2);
      }
    }
    
    return () => {
      // Restore default cursor when component unmounts
      document.documentElement.style.cursor = '';
      
      // Clear event listeners properly
      const handleMouseLeave = () => setVisible(false);
      const handleMouseEnter = () => setVisible(true);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, visible]);
  
  // Use pointer events for better performance and touch support
  useEffect(() => {
    const trailElements = trailRefs.map(ref => ref.current).filter(Boolean) as HTMLDivElement[];
    let animationFrameId: number;
    
    const handlePointerMove = (e: PointerEvent) => {
      // Only track mouse movements (not touch)
      if (e.pointerType === 'mouse') {
        // Show cursor when it moves
        if (!visible) setVisible(true);
        
        // Set motion values
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
        
        // Update inner cursor immediately for responsiveness
        if (innerCursorRef.current) {
          innerCursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        }
        
        // Check what element the cursor is over
        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
          const isOverLink = !!(element as Element).closest('a, button, [role="button"]');
          const isOverInput = !!(element as Element).closest('input, textarea, select, [contenteditable="true"]');
          const isOverDraggable = !!(element as Element).closest('[draggable="true"]');
          const isOverCustomInteractive = exclusionZones.some(selector => 
            !!(element as Element).closest(selector)
          );
          
          if (isOverLink || isOverCustomInteractive) {
            setCursorType('link');
          } else if (isOverInput) {
            setCursorType('text');
          } else if (isOverDraggable) {
            setCursorType('drag');
          } else {
            setCursorType('default');
          }
        }
      }
    };
    
    // Smooth trail animation with requestAnimationFrame
    const animateTrails = () => {
      const x = mouseX.get();
      const y = mouseY.get();
      
      trailElements.forEach((trail, i) => {
        if (trail) {
          // Apply delay based on trail index (more delay for later trails)
          const delay = 0.15 + i * 0.1;
          const trailX = trail.dataset.x ? parseFloat(trail.dataset.x) : x;
          const trailY = trail.dataset.y ? parseFloat(trail.dataset.y) : y;
          
          // Calculate new position with easing
          const newX = trailX + (x - trailX) * (1 - delay);
          const newY = trailY + (y - trailY) * (1 - delay);
          
          // Save position in dataset for next frame
          trail.dataset.x = newX.toString();
          trail.dataset.y = newY.toString();
          
          // Apply transform
          trail.style.transform = `translate3d(${newX}px, ${newY}px, 0) translate(-50%, -50%)`;
        }
      });
      
      animationFrameId = requestAnimationFrame(animateTrails);
    };
    
    // Add event listener and start animation
    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    animationFrameId = requestAnimationFrame(animateTrails);
    
    // Clean up
    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mouseX, mouseY, exclusionZones, visible]);
  
  // Handle cursor styles based on type
  const getCursorStyles = () => {
    switch (cursorType) {
      case 'link':
        return {
          borderColor: color,
          transform: 'scale(1.5)',
          backgroundColor: 'transparent'
        };
      case 'text':
        return {
          borderColor: color,
          width: '3px',
          height: '1.5rem',
          borderRadius: '1px',
          transform: 'scale(1)',
          backgroundColor: color
        };
      case 'drag':
        return {
          borderColor: color,
          transform: 'scale(1.2)',
          backgroundColor: `${color}33`
        };
      default:
        return {
          borderColor: color,
          transform: 'scale(1)',
          backgroundColor: 'transparent'
        };
    }
  };
  
  return (
    <>
      {/* Inner cursor (follows mouse exactly) */}
      <div
        ref={innerCursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: size / 3,
          height: size / 3,
          backgroundColor: color,
          borderRadius: '50%',
          opacity: visible ? 1 : 0,
          mixBlendMode: 'difference',
          willChange: 'transform',
          transition: 'opacity 0.2s'
        }}
      />
      
      {/* Outer cursor (spring physics) */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          width: size,
          height: size,
          borderRadius: cursorType === 'text' ? '1px' : '50%',
          border: `2px solid ${color}`,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s, width 0.3s, height 0.3s, border-radius 0.3s, background-color 0.3s, transform 0.3s',
          ...getCursorStyles()
        }}
      />
      
      {/* Cursor trails */}
      {trailRefs.map((ref, i) => (
        <div
          key={i}
          ref={ref}
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            width: size * (0.7 - i * 0.2),
            height: size * (0.7 - i * 0.2),
            borderRadius: '50%',
            border: `1px solid ${color}`,
            opacity: visible ? 0.5 - i * 0.15 : 0,
            willChange: 'transform',
            transition: 'opacity 0.2s'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;