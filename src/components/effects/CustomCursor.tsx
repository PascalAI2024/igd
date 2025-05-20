import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import gsap from 'gsap';

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
  const trailElements = useRef<HTMLDivElement[]>([]);
  const trailRefs = Array(3).fill(0).map(() => useRef<HTMLDivElement>(null));
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 28 });
  
  // Track the mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Update the regular cursor position immediately (without spring)
      if (innerCursorRef.current) {
        innerCursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      
      // Update trail positions with delay
      if (trailElements.current.length > 0) {
        for (let i = 0; i < trailElements.current.length; i++) {
          gsap.to(trailElements.current[i], {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3 + i * 0.08,
            ease: "power2.out"
          });
        }
      }
      
      // Check if cursor is over any exclusion zone
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
    };
    
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);
    
    // Initialize trail elements
    trailElements.current = trailRefs.map(ref => ref.current).filter(Boolean) as HTMLDivElement[];
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, exclusionZones]);
  
  // Cursor styles based on state
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
          willChange: 'transform'
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
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, border-radius 0.3s, background-color 0.3s, transform 0.3s',
          ...getCursorStyles()
        }}
      />
      
      {/* Cursor trails */}
      {trailRefs.map((ref, i) => (
        <div
          key={i}
          ref={ref}
          className="fixed top-0 left-0 pointer-events-none z-[9997] transform -translate-x-1/2 -translate-y-1/2"
          style={{
            width: size * (0.7 - i * 0.2),
            height: size * (0.7 - i * 0.2),
            borderRadius: '50%',
            border: `1px solid ${color}`,
            opacity: visible ? 0.5 - i * 0.15 : 0,
            willChange: 'transform'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;