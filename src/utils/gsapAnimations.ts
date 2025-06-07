import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

// Custom easing strings for GSAP
export const customEases = {
  smooth: 'power3.inOut',
  bounce: 'back.out(1.7)',
  elastic: 'elastic.out(1, 0.3)'
};

// Text reveal animations
export const createTextReveal = (element: HTMLElement | string, options: gsap.TweenVars = {}) => {
  const defaults = {
    duration: 1,
    ease: 'power3.out',
    stagger: 0.05,
    y: 100,
    opacity: 0,
    rotationX: 90,
    transformOrigin: '50% 50% -50',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  const chars = gsap.utils.toArray(`${element} .char`);
  if (chars.length > 0) {
    gsap.set(chars, { opacity: 0, y: 100, rotationX: 90 });
    return gsap.to(chars, { ...defaults, ...options });
  }

  return gsap.from(element, { ...defaults, ...options });
};

// Magnetic cursor effect
export class MagneticCursor {
  private cursor: HTMLElement;
  private cursorInner: HTMLElement;
  private isActive: boolean = false;

  constructor() {
    // Create cursor elements
    this.cursor = document.createElement('div');
    this.cursor.className = 'magnetic-cursor';
    this.cursorInner = document.createElement('div');
    this.cursorInner.className = 'magnetic-cursor-inner';
    this.cursor.appendChild(this.cursorInner);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .magnetic-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: opacity 0.3s ease;
      }
      
      .magnetic-cursor-inner {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid #fff;
        border-radius: 50%;
        transform: scale(1);
        transition: transform 0.3s ease, border-color 0.3s ease;
      }
      
      .magnetic-cursor.active .magnetic-cursor-inner {
        transform: scale(1.5);
        border-color: #ef4444;
      }
      
      .magnetic-target {
        cursor: none !important;
      }
      
      @media (hover: none) {
        .magnetic-cursor {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(this.cursor);

    this.init();
  }

  private init() {
    // Track mouse movement
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor movement
    gsap.ticker.add(() => {
      const speed = 0.15;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;
      
      gsap.set(this.cursor, {
        x: cursorX - 20,
        y: cursorY - 20
      });
    });

    // Handle magnetic elements
    const magneticElements = document.querySelectorAll('.magnetic-target');
    magneticElements.forEach((el) => {
      const element = el as HTMLElement;
      
      element.addEventListener('mouseenter', () => {
        this.cursor.classList.add('active');
        gsap.to(this.cursorInner, { scale: 1.5, duration: 0.3 });
      });

      element.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('active');
        gsap.to(element, { x: 0, y: 0, duration: 0.3 });
        gsap.to(this.cursorInner, { scale: 1, duration: 0.3 });
      });

      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(element, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3
        });
      });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        gsap.to(this.cursor, { opacity: 0, duration: 0.3 });
      }
    });

    document.addEventListener('mouseover', () => {
      gsap.to(this.cursor, { opacity: 1, duration: 0.3 });
    });
  }

  destroy() {
    this.cursor.remove();
  }
}

// Staggered animation for multiple elements
export const createStaggerAnimation = (
  elements: string | HTMLElement[],
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: {
      amount: 0.5,
      from: 'start' as any,
      ease: 'power2.inOut'
    },
    ease: 'power3.out',
    scrollTrigger: {
      trigger: elements,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  return gsap.from(elements, { ...defaults, ...options });
};

// Shape transformation animation (using scale/rotation instead of morphing)
export const createShapeTransform = (
  element: string | HTMLElement,
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    duration: 2,
    ease: 'power2.inOut',
    repeat: -1,
    yoyo: true,
    scale: 1.2,
    rotation: 180,
    transformOrigin: 'center center'
  };

  return gsap.to(element, { ...defaults, ...options });
};

// Parallax scrolling effect
export const createParallaxEffect = (
  element: string | HTMLElement,
  speed: number = 0.5,
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    y: `${speed * 100}%`,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true
    }
  };

  return gsap.to(element, { ...defaults, ...options });
};

// Premium hover effect for cards
export const createCardHoverEffect = (card: HTMLElement) => {
  const tl = gsap.timeline({ paused: true });
  
  // Get child elements
  const image = card.querySelector('.card-image');
  const content = card.querySelector('.card-content');
  const overlay = card.querySelector('.card-overlay');
  const cta = card.querySelector('.card-cta');

  // Setup timeline
  tl.to(image, {
    scale: 1.1,
    duration: 0.5,
    ease: 'power2.out'
  })
  .to(overlay, {
    opacity: 0.8,
    duration: 0.3
  }, 0)
  .from(content, {
    y: 20,
    opacity: 0,
    duration: 0.4,
    ease: 'power2.out'
  }, 0.1)
  .from(cta, {
    x: -20,
    opacity: 0,
    duration: 0.3,
    ease: 'power2.out'
  }, 0.2);

  // Add event listeners
  card.addEventListener('mouseenter', () => tl.play());
  card.addEventListener('mouseleave', () => tl.reverse());

  return tl;
};

// Loading sequence animation
export const createLoadingSequence = (
  container: string | HTMLElement,
  onComplete?: () => void
) => {
  const tl = gsap.timeline({
    onComplete: onComplete
  });

  const loader = gsap.utils.selector(container);

  tl.to(loader('.loading-bar'), {
    scaleX: 1,
    duration: 1.5,
    ease: 'power2.inOut'
  })
  .to(loader('.loading-text'), {
    scrambleText: {
      text: '100%',
      chars: '0123456789',
      speed: 0.3
    },
    duration: 1.5
  }, 0)
  .to(loader('.loading-overlay'), {
    yPercent: -100,
    duration: 0.8,
    ease: 'power3.inOut'
  }, 1.5)
  .from(loader('.content'), {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  }, 1.8);

  return tl;
};

// Smooth scroll to element
export const smoothScrollTo = (target: string | HTMLElement, options: ScrollToOptions = {}) => {
  const defaults = {
    duration: 1,
    ease: 'power3.inOut',
    offsetY: 0
  };

  const settings = { ...defaults, ...options };

  gsap.to(window, {
    duration: settings.duration,
    scrollTo: {
      y: target,
      offsetY: settings.offsetY
    },
    ease: settings.ease
  });
};

// Animated counter
export const createCounter = (
  element: string | HTMLElement,
  endValue: number,
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    duration: 2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  const obj = { value: 0 };

  return gsap.to(obj, {
    ...defaults,
    ...options,
    value: endValue,
    onUpdate: () => {
      const el = typeof element === 'string' ? document.querySelector(element) : element;
      if (el) {
        el.textContent = Math.round(obj.value).toLocaleString();
      }
    }
  });
};

// Reveal lines animation
export const createLineReveal = (
  lines: string | HTMLElement[],
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    scaleX: 0,
    transformOrigin: 'left center',
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.inOut',
    scrollTrigger: {
      trigger: lines,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  gsap.set(lines, { scaleX: 0, transformOrigin: 'left center' });
  return gsap.to(lines, { ...defaults, ...options, scaleX: 1 });
};

// 3D flip animation
export const create3DFlip = (
  element: string | HTMLElement,
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    rotationY: 180,
    duration: 1,
    ease: 'power2.inOut',
    transformPerspective: 1000,
    transformStyle: 'preserve-3d',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  };

  gsap.set(element, { 
    transformPerspective: 1000,
    transformStyle: 'preserve-3d'
  });

  return gsap.from(element, { ...defaults, ...options });
};

// Typewriter effect
export const createTypewriter = (
  element: string | HTMLElement,
  text: string,
  options: gsap.TweenVars = {}
) => {
  const defaults = {
    duration: text.length * 0.05,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  };

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.textContent = '';

  return gsap.to(el, {
    ...defaults,
    ...options,
    text: {
      value: text,
      delimiter: ''
    }
  });
};

// Utility function to split text into spans for animation
export const splitTextToSpans = (element: HTMLElement, type: 'chars' | 'words' | 'lines' = 'chars') => {
  const text = element.textContent || '';
  element.innerHTML = '';

  if (type === 'chars') {
    text.split('').forEach(char => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      element.appendChild(span);
    });
  } else if (type === 'words') {
    text.split(' ').forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'word';
      span.textContent = word;
      span.style.display = 'inline-block';
      element.appendChild(span);
      if (i < text.split(' ').length - 1) {
        element.appendChild(document.createTextNode(' '));
      }
    });
  }

  return element.querySelectorAll('.char, .word');
};