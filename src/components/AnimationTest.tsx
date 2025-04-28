import React, { useState } from 'react';
import { useAnimation } from '../hooks/useAnimation';
import { AnimationErrorBoundary } from './AnimationErrorBoundary';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

/**
 * Test component for animation performance and error handling
 */
export const AnimationTest: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showStats, setShowStats] = useState(true);

  const {
    canvasRef,
    start,
    stop,
    pause,
    resume,
    fps,
    isRunning,
    isPaused,
    error
  } = useAnimation((deltaTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    const updatedParticles = particles.map(particle => {
      // Update position
      particle.x += particle.vx * (deltaTime / 16);
      particle.y += particle.vy * (deltaTime / 16);

      // Bounce off walls
      if (particle.x < particle.radius || particle.x > canvas.width - particle.radius) {
        particle.vx *= -1;
      }
      if (particle.y < particle.radius || particle.y > canvas.height - particle.radius) {
        particle.vy *= -1;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      return particle;
    });

    setParticles(updatedParticles);
  }, {
    targetFPS: 60,
    batterySaver: true,
    showError: true,
    onError: (err) => console.error('Animation Error:', err)
  });

  // Add particles
  const addParticles = (count: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        radius: Math.random() * 10 + 5,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  };

  // Clear particles
  const clearParticles = () => {
    setParticles([]);
  };

  // Force error for testing
  const forceError = () => {
    throw new Error('Forced animation error for testing');
  };

  return (
    <AnimationErrorBoundary>
      <div className="p-4">
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => isRunning ? stop() : start()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            onClick={() => isPaused ? resume() : pause()}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            disabled={!isRunning}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button
            onClick={() => addParticles(10)}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add Particles
          </button>
          <button
            onClick={clearParticles}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
          <button
            onClick={forceError}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Test Error
          </button>
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {showStats ? 'Hide Stats' : 'Show Stats'}
          </button>
        </div>

        {showStats && (
          <div className="mb-4 space-y-2 text-sm">
            <p>FPS: {Math.round(fps)}</p>
            <p>Particles: {particles.length}</p>
            <p>Status: {isPaused ? 'Paused' : isRunning ? 'Running' : 'Stopped'}</p>
            {error && <p className="text-red-500">Error: {error.message}</p>}
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border border-gray-200 rounded bg-black"
        />
      </div>
    </AnimationErrorBoundary>
  );
};
