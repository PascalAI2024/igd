import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom' | 'flip' | 'stagger';
  delay?: number;
  duration?: number;
  threshold?: number;
  staggerAmount?: number;
  className?: string;
  style?: React.CSSProperties;
  scrub?: boolean;
  markers?: boolean;
  startPosition?: string;
  endPosition?: string;
  once?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade',
  delay = 0,
  duration = 1,
  threshold = 0.2,
  staggerAmount = 0.1,
  className = '',
  style = {},
  scrub = false,
  markers = false,
  startPosition = 'top bottom-=100',
  endPosition = 'bottom top+=100',
  once = true
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current || !childrenRef.current) return;
    
    const element = sectionRef.current;
    const childrenElement = childrenRef.current;
    
    // Define initial state based on animation type
    let initialVars: gsap.TweenVars = {};
    let animateVars: gsap.TweenVars = {};
    
    switch (animation) {
      case 'fade':
        initialVars = { autoAlpha: 0 };
        animateVars = { autoAlpha: 1 };
        break;
        
      case 'slide-up':
        initialVars = { y: 100, autoAlpha: 0 };
        animateVars = { y: 0, autoAlpha: 1 };
        break;
        
      case 'slide-left':
        initialVars = { x: 100, autoAlpha: 0 };
        animateVars = { x: 0, autoAlpha: 1 };
        break;
        
      case 'slide-right':
        initialVars = { x: -100, autoAlpha: 0 };
        animateVars = { x: 0, autoAlpha: 1 };
        break;
        
      case 'zoom':
        initialVars = { scale: 0.5, autoAlpha: 0 };
        animateVars = { scale: 1, autoAlpha: 1 };
        break;
        
      case 'flip':
        initialVars = { rotationY: 90, autoAlpha: 0, transformPerspective: 600 };
        animateVars = { rotationY: 0, autoAlpha: 1 };
        break;
        
      case 'stagger':
        // Handle stagger differently
        break;
        
      default:
        initialVars = { autoAlpha: 0 };
        animateVars = { autoAlpha: 1 };
    }
    
    // Set initial state
    gsap.set(animation === 'stagger' ? childrenElement.children : childrenElement, initialVars);
    
    // Create the animation
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: startPosition,
        end: endPosition,
        scrub: scrub,
        markers: markers,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse'
      }
    });
    
    // Apply animation with delay
    if (animation === 'stagger') {
      tl.to(
        childrenElement.children,
        {
          ...animateVars,
          stagger: staggerAmount,
          duration: duration,
          delay: delay,
          ease: "power2.out"
        }
      );
    } else {
      tl.to(
        childrenElement,
        {
          ...animateVars,
          duration: duration,
          delay: delay,
          ease: "power2.out"
        }
      );
    }
    
    // Clean up
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [animation, delay, duration, threshold, staggerAmount, scrub, markers, startPosition, endPosition, once]);
  
  return (
    <div ref={sectionRef} className={className} style={style}>
      <div ref={childrenRef} style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
};

// Multiple item reveal component as a variation
export const StaggerReveal: React.FC<ScrollRevealProps & { itemSelector?: string }> = ({
  children,
  itemSelector = '.stagger-item',
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const items = container.querySelectorAll(itemSelector);
    
    if (!items.length) return;
    
    // Set initial state
    gsap.set(items, { y: 30, opacity: 0 });
    
    // Create staggered animations for each item
    items.forEach((item, index) => {
      gsap.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=50",
          toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: props.duration || 0.8,
        delay: (props.delay || 0) + (index * (props.staggerAmount || 0.1)),
        ease: "power2.out"
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [props.delay, props.duration, props.staggerAmount, itemSelector]);
  
  return (
    <div ref={containerRef} className={props.className}>
      {children}
    </div>
  );
};

export default ScrollReveal;