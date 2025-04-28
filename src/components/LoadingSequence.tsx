import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Cpu, Network, Zap, SkipForward } from 'lucide-react';

const LoadingSequence = ({ onComplete }: { onComplete: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const [showSkip, setShowSkip] = useState(false);

  // Show skip button immediately
  useEffect(() => {
    // Show skip button immediately
    setShowSkip(true);
  }, []);

  useEffect(() => {
    const messages = [
      'Initializing Neural Network',
      'Synthesizing Digital Pathways',
      'Calibrating Innovation Matrix',
      'Engaging Quantum Processors',
      'Activating Digital Excellence'
    ];

    let currentMessageIndex = 0;
    let currentCharIndex = 0;

    const textElement = document.querySelector('.loading-text');
    if (!textElement) return;

    const typeMessage = () => {
      if (!textElement) return;

      if (currentMessageIndex >= messages.length) {
        clearInterval(glitchInterval);
        setTimeout(() => {
          onComplete();
        }, 800);
        return;
      }

      const currentMessage = messages[currentMessageIndex];
      if (currentCharIndex < currentMessage.length) {
        textElement.textContent = currentMessage.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeMessage, 30 + Math.random() * 40);
      } else {
        setTimeout(() => {
          currentMessageIndex++;
          currentCharIndex = 0;
          typeMessage();
        }, 800);
      }
    };

    typeMessage();

    const glitchInterval = setInterval(() => {
      if (!textElement) return;
      const currentMessage = messages[currentMessageIndex];
      if (!currentMessage) return;

      const glitchedText = currentMessage
        .split('')
        .map((char, index) => {
          if (index >= currentCharIndex) return '';
          return Math.random() < 0.1
            ? String.fromCharCode(33 + Math.floor(Math.random() * 94))
            : char;
        })
        .join('');

      textElement.textContent = glitchedText;
    }, 50);

    return () => clearInterval(glitchInterval);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    class ParticleClass implements Particle {
      x: number;
      y: number;
      lastX: number;
      lastY: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;

      constructor() {
        if (!canvas) throw new Error('Canvas not initialized');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.lastX = this.x;
        this.lastY = this.y;
        this.size = Math.random() * 3 + 2;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = `rgba(255, ${Math.random() * 50}, 0`;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        if (!canvas) return;
        this.lastX = this.x;
        this.lastY = this.y;
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = `${this.color}, ${this.opacity})`;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < 70; i++) {
      particlesRef.current.push(new ParticleClass());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      for (let i = 0; i < particlesRef.current.length; i += 2) {
        for (let j = i + 2; j < particlesRef.current.length; j += 2) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(255, 0, 0, ${0.05 * (1 - distance / 150)})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="loading"
        className="fixed inset-0 bg-black z-50 flex items-center justify-center"
        exit={{
          clipPath: 'circle(0% at 50% 50%)',
          transition: {
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1]
          }
        }}
        style={{
          clipPath: 'circle(150% at 50% 50%)'
        }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div className="relative z-10 w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                duration: 0.4,
                ease: [0.65, 0, 0.35, 1]
              }
            }}
            className="text-center"
          >
            <div className="relative w-32 h-32 mx-auto mb-8 sm:w-48 sm:h-48">
              <div className="absolute inset-0">
                <div className="absolute inset-0 border-4 border-red-500/20 rounded-full animate-[spin_8s_linear_infinite]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-transparent blur-xl" />
                </div>
                <div className="absolute inset-4 border-4 border-red-500/30 rounded-full animate-[spin_6s_linear_infinite_reverse]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/30 to-transparent blur-lg" />
                </div>
                <div className="absolute inset-8 border-4 border-red-500/40 rounded-full animate-[spin_4s_linear_infinite]">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/40 to-transparent blur-md" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg sm:w-24 sm:h-24"
                  >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-lg" />
                    <div className="absolute inset-1 border border-white/20 rounded-lg" />
                  </motion.div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="h-6">
                <span
                  className="loading-text text-red-500 font-mono text-sm sm:text-base"
                >
                  Initializing...
                </span>
              </div>

              {/* Skip Button */}
              {showSkip && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="mt-8 px-6 py-3 bg-red-500 text-white font-medium rounded-lg text-base flex items-center justify-center mx-auto transition-all duration-300 shadow-lg shadow-red-500/30"
                  aria-label="Skip loading animation"
                >
                  <span>Skip Intro</span>
                  <SkipForward className="ml-2 w-5 h-5" />
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="fixed top-1/4 left-4 transform -translate-y-1/2 opacity-20 hidden sm:block"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          exit={{ x: -50, opacity: 0 }}
        >
          <Code2 className="w-24 h-24 text-red-500" />
        </motion.div>
        <motion.div
          className="fixed top-3/4 left-4 transform -translate-y-1/2 opacity-20 hidden sm:block"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Cpu className="w-24 h-24 text-red-500" />
        </motion.div>
        <motion.div
          className="fixed top-1/4 right-4 transform -translate-y-1/2 opacity-20 hidden sm:block"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          exit={{ x: 50, opacity: 0 }}
        >
          <Network className="w-24 h-24 text-red-500" />
        </motion.div>
        <motion.div
          className="fixed top-3/4 right-4 transform -translate-y-1/2 opacity-20 hidden sm:block"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 0.2 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Zap className="w-24 h-24 text-red-500" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

interface Particle {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export default LoadingSequence;
