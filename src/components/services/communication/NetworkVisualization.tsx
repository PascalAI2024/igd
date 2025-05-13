import React, { useEffect, useRef } from 'react';
import { Phone, Wifi, Radio, Signal, LucideIcon } from 'lucide-react';
import { useHighPerformanceAnimation } from '../../../hooks/useAnimation';
import { AnimationErrorBoundary } from '../../AnimationErrorBoundary';

interface Node {
  id: string;
  type: 'phone' | 'wifi' | 'radio' | 'signal';
  x: number;
  y: number;
  angle: number;
  radius: number;
  icon: LucideIcon;
  label: string;
  color: string;
  connections: string[];
}

interface Signal {
  sourceId: string;
  targetId: string;
  radius: number;
  opacity: number;
  color: string;
}

const NetworkVisualization = () => {
  // Use high performance animation hook for smoother rendering
  const { canvasRef, fps } = useHighPerformanceAnimation((deltaTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enable anti-aliasing for smoother rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Clear canvas with a slight fade effect for smoother transitions
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Create nodes
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.3;

    // Use a more stable time base for animations
    const time = performance.now() * 0.001;

    const nodes: Node[] = [
      {
        id: 'phone1',
        type: 'phone',
        x: 0,
        y: 0,
        angle: time * 0.3,
        radius: orbitRadius,
        icon: Phone,
        label: 'Mobile Device',
        color: '#3b82f6',
        connections: ['wifi1', 'signal1']
      },
      {
        id: 'wifi1',
        type: 'wifi',
        x: 0,
        y: 0,
        angle: time * 0.3 + Math.PI * 0.5,
        radius: orbitRadius,
        icon: Wifi,
        label: 'WiFi Router',
        color: '#22c55e',
        connections: ['radio1']
      },
      {
        id: 'radio1',
        type: 'radio',
        x: 0,
        y: 0,
        angle: time * 0.3 + Math.PI,
        radius: orbitRadius,
        icon: Radio,
        label: 'Radio Tower',
        color: '#f59e0b',
        connections: ['signal1']
      },
      {
        id: 'signal1',
        type: 'signal',
        x: 0,
        y: 0,
        angle: time * 0.3 + Math.PI * 1.5,
        radius: orbitRadius,
        icon: Signal,
        label: 'Signal Tower',
        color: '#ef4444',
        connections: ['phone1', 'wifi1']
      }
    ];

    // Update node positions with smoother motion
    nodes.forEach(node => {
      node.x = centerX + Math.cos(node.angle) * node.radius;
      node.y = centerY + Math.sin(node.angle) * node.radius;
    });

    // Create signals with more predictable timing
    const signals: Signal[] = [];
    // Use time-based signal generation for more consistent visuals
    if (Math.sin(time * 2) > 0.95) {
      const sourceIndex = Math.floor(time * 0.5) % nodes.length;
      const sourceNode = nodes[sourceIndex];
      const connectionIndex = Math.floor(time) % sourceNode.connections.length;
      const targetId = sourceNode.connections[connectionIndex];

      signals.push({
        sourceId: sourceNode.id,
        targetId,
        radius: 0,
        opacity: 1,
        color: sourceNode.color
      });
    }

    // Draw connections with improved styling
    ctx.lineWidth = 1.5;
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = nodes.find(n => n.id === targetId);
        if (!targetNode) return;

        // Create gradient for connection lines
        const gradient = ctx.createLinearGradient(node.x, node.y, targetNode.x, targetNode.y);
        gradient.addColorStop(0, node.color + '30');
        gradient.addColorStop(1, targetNode.color + '30');

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = gradient;
        ctx.stroke();
      });
    });

    // Draw signals with improved visual effects
    signals.forEach(signal => {
      const sourceNode = nodes.find(n => n.id === signal.sourceId);
      const targetNode = nodes.find(n => n.id === signal.targetId);
      if (!sourceNode || !targetNode) return;

      // Smoother signal animation
      signal.radius += 3 * (deltaTime / 16);
      signal.opacity = Math.max(0, 1 - signal.radius / 120);

      if (signal.opacity > 0) {
        // Draw expanding circle with glow effect
        ctx.beginPath();
        ctx.arc(sourceNode.x, sourceNode.y, signal.radius, 0, Math.PI * 2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = `${signal.color}${Math.floor(signal.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.stroke();

        // Draw signal line with gradient
        const dx = targetNode.x - sourceNode.x;
        const dy = targetNode.y - sourceNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const progress = Math.min(1, signal.radius / distance);

        if (progress > 0) {
          const endX = sourceNode.x + dx * progress;
          const endY = sourceNode.y + dy * progress;

          // Create gradient for signal line
          const gradient = ctx.createLinearGradient(sourceNode.x, sourceNode.y, endX, endY);
          gradient.addColorStop(0, `${signal.color}${Math.floor(signal.opacity * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, `${signal.color}00`);

          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(endX, endY);
          ctx.lineWidth = 2;
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
      }
    });

    // Draw nodes with improved styling
    nodes.forEach(node => {
      // Draw node glow
      const glowRadius = 30 + Math.sin(time * 3) * 5;
      const gradient = ctx.createRadialGradient(node.x, node.y, 20, node.x, node.y, glowRadius);
      gradient.addColorStop(0, node.color + '30');
      gradient.addColorStop(1, node.color + '00');

      ctx.beginPath();
      ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw node background with inner glow
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fillStyle = node.color + '20';
      ctx.fill();

      // Draw node border with shadow
      ctx.lineWidth = 2;
      ctx.strokeStyle = node.color;
      ctx.stroke();

      // Draw node pulse with smoother animation
      const pulseRadius = 30 + Math.sin(time * 3 + Math.PI * 0.5) * 5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = node.color + '60';
      ctx.stroke();

      // Draw label with shadow for better readability
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(node.label, node.x, node.y + 45);
    });
  }, {
    showError: true,
    onError: (err) => console.error('Network Visualization Error:', err)
  });

  // Add a resize handler to ensure canvas is properly sized
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      canvasRef.current.width = width * window.devicePixelRatio;
      canvasRef.current.height = height * window.devicePixelRatio;

      // Set CSS size (display size)
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;
    };

    // Initial sizing
    resizeCanvas();

    // Add resize listener
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <AnimationErrorBoundary>
      <div ref={containerRef} className="relative min-h-[600px] w-full">
        {/* Network Visualization */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ touchAction: 'none' }} // Prevent touch actions for better mobile performance
        />

        {/* Performance Stats (Development Only) */}
        {import.meta.env.DEV && (
          <div className="absolute top-2 left-2 bg-black/50 rounded p-2 text-xs text-white">
            FPS: {Math.round(fps)}
          </div>
        )}
      </div>
    </AnimationErrorBoundary>
  );
};

export default NetworkVisualization;
