import React, { useEffect, useRef } from 'react';
import { ShoppingBag, CreditCard, Package, Truck, Users, BarChart2 } from 'lucide-react';
import { useHighPerformanceAnimation } from '../../../hooks/useAnimation';
import { AnimationErrorBoundary } from '../../AnimationErrorBoundary';

interface Node {
  id: string;
  type: 'store' | 'payment' | 'inventory' | 'shipping' | 'customer' | 'analytics';
  x: number;
  y: number;
  angle: number;
  radius: number;
  icon: React.ElementType;
  label: string;
  color: string;
  connections: string[];
}

interface Transaction {
  sourceId: string;
  targetId: string;
  progress: number;
  opacity: number;
  color: string;
  size: number;
  speed: number;
}

const RetailVisualization = () => {
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
        id: 'store',
        type: 'store',
        x: 0,
        y: 0,
        angle: time * 0.2,
        radius: orbitRadius,
        icon: ShoppingBag,
        label: 'Store',
        color: '#ef4444', // red-500
        connections: ['payment', 'inventory', 'customer']
      },
      {
        id: 'payment',
        type: 'payment',
        x: 0,
        y: 0,
        angle: time * 0.2 + Math.PI * (2/6),
        radius: orbitRadius,
        icon: CreditCard,
        label: 'Payments',
        color: '#3b82f6', // blue-500
        connections: ['store', 'analytics']
      },
      {
        id: 'inventory',
        type: 'inventory',
        x: 0,
        y: 0,
        angle: time * 0.2 + Math.PI * (4/6),
        radius: orbitRadius,
        icon: Package,
        label: 'Inventory',
        color: '#22c55e', // green-500
        connections: ['store', 'shipping']
      },
      {
        id: 'shipping',
        type: 'shipping',
        x: 0,
        y: 0,
        angle: time * 0.2 + Math.PI * (6/6),
        radius: orbitRadius,
        icon: Truck,
        label: 'Shipping',
        color: '#f59e0b', // amber-500
        connections: ['inventory', 'customer']
      },
      {
        id: 'customer',
        type: 'customer',
        x: 0,
        y: 0,
        angle: time * 0.2 + Math.PI * (8/6),
        radius: orbitRadius,
        icon: Users,
        label: 'Customers',
        color: '#8b5cf6', // violet-500
        connections: ['store', 'analytics']
      },
      {
        id: 'analytics',
        type: 'analytics',
        x: 0,
        y: 0,
        angle: time * 0.2 + Math.PI * (10/6),
        radius: orbitRadius,
        icon: BarChart2,
        label: 'Analytics',
        color: '#ec4899', // pink-500
        connections: ['payment', 'customer']
      }
    ];

    // Update node positions with smoother motion
    nodes.forEach(node => {
      node.x = centerX + Math.cos(node.angle) * node.radius;
      node.y = centerY + Math.sin(node.angle) * node.radius;
    });

    // Create transactions with more predictable timing
    const transactions: Transaction[] = [];
    
    // Generate transactions based on time
    if (Math.sin(time * 3) > 0.95) {
      const sourceIndex = Math.floor(time * 0.5) % nodes.length;
      const sourceNode = nodes[sourceIndex];
      const connectionIndex = Math.floor(time) % sourceNode.connections.length;
      const targetId = sourceNode.connections[connectionIndex];
      
      transactions.push({
        sourceId: sourceNode.id,
        targetId,
        progress: 0,
        opacity: 1,
        color: sourceNode.color,
        size: 4 + Math.random() * 4,
        speed: 0.05 + Math.random() * 0.05
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

    // Update and draw transactions
    transactions.forEach((transaction, i) => {
      const sourceNode = nodes.find(n => n.id === transaction.sourceId);
      const targetNode = nodes.find(n => n.id === transaction.targetId);
      if (!sourceNode || !targetNode) return;

      // Update transaction progress
      transaction.progress += transaction.speed * (deltaTime / 16);
      transaction.opacity = Math.max(0, 1 - transaction.progress);

      if (transaction.progress <= 1) {
        // Calculate position along the path
        const x = sourceNode.x + (targetNode.x - sourceNode.x) * transaction.progress;
        const y = sourceNode.y + (targetNode.y - sourceNode.y) * transaction.progress;
        
        // Draw transaction dot with glow
        const glowRadius = transaction.size * 2;
        const gradient = ctx.createRadialGradient(x, y, transaction.size / 2, x, y, glowRadius);
        gradient.addColorStop(0, transaction.color + 'ff');
        gradient.addColorStop(1, transaction.color + '00');
        
        ctx.beginPath();
        ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw transaction dot
        ctx.beginPath();
        ctx.arc(x, y, transaction.size, 0, Math.PI * 2);
        ctx.fillStyle = transaction.color;
        ctx.fill();
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
    onError: (err) => console.error('Retail Visualization Error:', err)
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
        {/* Retail Visualization */}
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

export default RetailVisualization;
