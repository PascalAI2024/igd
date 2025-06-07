import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceCardGSAPProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  link: string;
  color: string;
  index?: number;
}

const ServiceCardGSAP: React.FC<ServiceCardGSAPProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  link, 
  color,
  index = 0 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const hoverTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Create hover timeline
    const hoverTl = gsap.timeline({ paused: true });
    hoverTimelineRef.current = hoverTl;

    // Set initial states
    gsap.set(glowRef.current, { opacity: 0 });
    gsap.set(ctaRef.current, { x: -20, opacity: 0 });
    if (particlesRef.current?.children) {
      gsap.set(particlesRef.current.children, { 
        scale: 0, 
        x: 'random(-50, 50)', 
        y: 'random(-50, 50)' 
      });
    }

    // Build hover animation sequence
    hoverTl
      // Card lift and tilt
      .to(cardRef.current, {
        y: -10,
        scale: 1.02,
        rotationX: -5,
        rotationY: 5,
        transformPerspective: 1000,
        boxShadow: `0 20px 40px ${color}40`,
        duration: 0.3,
        ease: 'power2.out'
      })
      // Glow effect
      .to(glowRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0)
      // Icon animation
      .to(iconRef.current, {
        scale: 1.2,
        rotation: 360,
        duration: 0.6,
        ease: 'power2.inOut'
      }, 0)
      // Content shift
      .to(contentRef.current, {
        y: -5,
        duration: 0.3,
        ease: 'power2.out'
      }, 0.1)
      // CTA slide in
      .to(ctaRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      }, 0.2)
      // Particles
      .to(particlesRef.current?.children || [], {
        scale: 1,
        opacity: 0.6,
        duration: 0.6,
        stagger: {
          amount: 0.2,
          from: 'random'
        },
        ease: 'power2.out'
      }, 0.1)
      .to(particlesRef.current?.children || [], {
        y: '-=30',
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 0.3,
          from: 'random'
        },
        ease: 'power2.out'
      }, 0.4);

    // Mouse move effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(cardRef.current, {
        rotationY: x * 20,
        rotationX: -y * 20,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Move glow
      gsap.to(glowRef.current, {
        x: x * 20,
        y: y * 20,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Event listeners
    const card = cardRef.current;
    
    const handleMouseEnter = () => {
      hoverTl.play();
      card.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
      hoverTl.reverse();
      card.removeEventListener('mousemove', handleMouseMove);
      
      // Reset rotation
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    // Initial entrance animation
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
        rotationX: -30
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cleanup
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
      hoverTl.kill();
    };
  }, [color, index]);

  return (
    <Link to={link} className="block service-card magnetic-target">
      <div 
        ref={cardRef}
        className="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden transition-colors hover:border-white/20"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow effect */}
        <div 
          ref={glowRef}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
            filter: 'blur(20px)'
          }}
        />

        {/* Particles */}
        <div 
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: color
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div 
            ref={iconRef}
            className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="w-8 h-8" style={{ color }} />
          </div>

          {/* Text content */}
          <div ref={contentRef}>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed mb-6">{description}</p>
          </div>

          {/* CTA */}
          <div 
            ref={ctaRef}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Corner accent */}
        <div 
          className="absolute top-0 right-0 w-32 h-32 opacity-10"
          style={{
            background: `radial-gradient(circle at top right, ${color} 0%, transparent 70%)`
          }}
        />
      </div>
    </Link>
  );
};

export default ServiceCardGSAP;