import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const controls = useAnimation();
  const [showSkip, setShowSkip] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const noiseFieldRef = useRef<Array<{ x: number; y: number; intensity: number; vx: number; vy: number }>>([]);
  
  // Professional loading messages
  const loadingSteps = [
    { text: "Preparing experience" },
    { text: "Optimizing interface" },
    { text: "Loading resources" },
    { text: "Finalizing" }
  ];
  
  // Skip button appears after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle auto-progression through loading steps
  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => {
          const nextStep = prev + 1;
          if (nextStep >= loadingSteps.length) {
            // Final step reached, start exit animation
            startExitAnimation();
          }
          return nextStep;
        });
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, loadingSteps.length]);
  
  // Handle exit animation
  const startExitAnimation = async () => {
    await controls.start({
      y: -30,
      opacity: 0,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
    });
    
    // After animation completes, call onComplete
    setTimeout(onComplete, 200);
  };
  
  // Setup noise field animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Initialize or reinitialize the noise field
      initNoiseField();
    };
    
    // Create noise field particles
    const initNoiseField = () => {
      const fieldSize = Math.max(50, Math.min(150, window.innerWidth / 20));
      noiseFieldRef.current = [];
      
      for (let i = 0; i < fieldSize; i++) {
        noiseFieldRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          intensity: Math.random() * 0.3 + 0.1,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5
        });
      }
    };
    
    // Render loop
    const render = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas with fading effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw noise field
      noiseFieldRef.current.forEach(particle => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw noise particle
        const size = Math.random() * 3 + 1;
        ctx.fillStyle = `rgba(220, 38, 38, ${particle.intensity * Math.random() * 0.5})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        // Occasionally create flowing line effects
        if (Math.random() < 0.03) {
          const maxLength = Math.random() * 40 + 10;
          const angle = Math.random() * Math.PI * 2;
          const endX = particle.x + Math.cos(angle) * maxLength;
          const endY = particle.y + Math.sin(angle) * maxLength;
          
          ctx.strokeStyle = `rgba(220, 38, 38, ${particle.intensity * 0.3})`;
          ctx.lineWidth = Math.random() * 0.5 + 0.1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      });
      
      animationFrameRef.current = requestAnimationFrame(render);
    };
    
    // Initialize and start
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 z-50 flex flex-col items-center justify-center overflow-hidden"
      animate={controls}
    >
      {/* Background noise field */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />
      
      {/* Semi-transparent radial gradient */}
      <div 
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 20%, #000 70%)'
        }}
      />
      
      {/* Branding and loading animation */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Logo animation */}
        <motion.div
          className="mb-16"
          animate={{
            y: [0, -5, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-32 h-32 relative flex items-center justify-center">
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-red-600 to-red-800 opacity-20"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Logo container */}
            <div className="w-20 h-20 relative bg-black rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-700/20 rounded-lg" />
              <div className="w-12 h-12 relative">
                {/* Your company logo or icon goes here */}
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L2 20H22L12 4Z" fill="#DC2626" />
                  <path d="M12 12L17 20H7L12 12Z" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
            
            {/* Animated rings */}
            <motion.div
              className="absolute -inset-4 border border-red-500/20 rounded-full"
              animate={{ scale: [0.8, 1.2], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute -inset-8 border border-red-500/10 rounded-full"
              animate={{ scale: [0.8, 1.4], opacity: [0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.2 }}
            />
          </div>
        </motion.div>
        
        {/* Loading step text */}
        <div className="h-8 mb-4">
          <AnimatePresence mode="wait">
            {currentStep < loadingSteps.length && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <span className="text-gray-300 font-medium mr-2">
                  {loadingSteps[currentStep].text}
                </span>
                <LoadingDots />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Progress bar */}
        <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-600"
            initial={{ width: 0 }}
            animate={{ 
              width: `${Math.min(100, (currentStep / loadingSteps.length) * 100)}%` 
            }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
        
        {/* Skip button */}
        {showSkip && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={onComplete}
            className="mt-12 px-4 py-2 bg-gradient-to-r from-red-700/10 to-red-800/10 border border-red-500/20 rounded-md text-gray-300 text-sm flex items-center space-x-2 hover:bg-red-700/20 transition-all duration-300 group"
          >
            <span>Skip intro</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

// Loading dots animation
const LoadingDots = () => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-red-500 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default LoadingSequence;