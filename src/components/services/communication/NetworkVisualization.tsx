import React from 'react';
import { Phone, Wifi, Radio, Signal, LucideIcon } from 'lucide-react';
import { useAnimation } from '../../../hooks/useAnimation';
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
  const { canvasRef, fps } = useAnimation((deltaTime) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Create nodes
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const orbitRadius = Math.min(canvas.width, canvas.height) * 0.3;

    const nodes: Node[] = [
      {
        id: 'phone1',
        type: 'phone',
        x: 0,
        y: 0,
        angle: Date.now() * 0.0005,
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
        angle: Date.now() * 0.0005 + Math.PI * 0.5,
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
        angle: Date.now() * 0.0005 + Math.PI,
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
        angle: Date.now() * 0.0005 + Math.PI * 1.5,
        radius: orbitRadius,
        icon: Signal,
        label: 'Signal Tower',
        color: '#ef4444',
        connections: ['phone1', 'wifi1']
      }
    ];

    // Update node positions
    nodes.forEach(node => {
      node.x = centerX + Math.cos(node.angle) * node.radius;
      node.y = centerY + Math.sin(node.angle) * node.radius;
    });

    // Create signals
    const signals: Signal[] = [];
    if (Math.random() < 0.05) {
      const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
      const targetId = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
      
      signals.push({
        sourceId: sourceNode.id,
        targetId,
        radius: 0,
        opacity: 1,
        color: sourceNode.color
      });
    }

    // Draw connections
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const targetNode = nodes.find(n => n.id === targetId);
        if (!targetNode) return;

        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
      });
    });

    // Draw signals
    signals.forEach(signal => {
      const sourceNode = nodes.find(n => n.id === signal.sourceId);
      const targetNode = nodes.find(n => n.id === signal.targetId);
      if (!sourceNode || !targetNode) return;

      signal.radius += 2 * (deltaTime / 16);
      signal.opacity = Math.max(0, 1 - signal.radius / 100);

      if (signal.opacity > 0) {
        // Draw expanding circle
        ctx.beginPath();
        ctx.arc(sourceNode.x, sourceNode.y, signal.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `${signal.color}${Math.floor(signal.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.stroke();

        // Draw signal line
        ctx.beginPath();
        ctx.moveTo(sourceNode.x, sourceNode.y);
        ctx.lineTo(targetNode.x, targetNode.y);
        ctx.strokeStyle = `${signal.color}${Math.floor(signal.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.stroke();
      }
    });

    // Draw nodes
    nodes.forEach(node => {
      // Draw node background
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fillStyle = node.color + '20';
      ctx.fill();
      ctx.strokeStyle = node.color;
      ctx.stroke();

      // Draw node pulse
      const pulseRadius = 30 + Math.sin(Date.now() * 0.005) * 5;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = node.color + '40';
      ctx.stroke();

      // Draw label
      ctx.font = '12px Arial';
      ctx.fillStyle = '#9ca3af';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + 40);
    });
  }, {
    targetFPS: 60,
    batterySaver: true,
    showError: true,
    onError: (err) => console.error('Network Visualization Error:', err)
  });

  return (
    <AnimationErrorBoundary>
      <div className="relative min-h-[600px]">
        {/* Network Visualization */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
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
