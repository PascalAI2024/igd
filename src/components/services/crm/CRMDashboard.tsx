import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Calendar, Mail, Phone,
  BarChart2, Settings, Database, Bell, FileText,
  TrendingUp, LucideIcon
} from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

const CRMDashboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: Node[] = [
    { id: 'contacts', x: 0.3, y: 0.3, icon: Users, label: 'Contacts', value: '2,500+', trend: '+15%' },
    { id: 'communication', x: 0.7, y: 0.3, icon: MessageSquare, label: 'Communication', value: '500/day', trend: '+25%' },
    { id: 'calendar', x: 0.5, y: 0.2, icon: Calendar, label: 'Calendar', value: '95% Booked', trend: '+30%' },
    { id: 'email', x: 0.8, y: 0.4, icon: Mail, label: 'Email', value: '98% Open Rate', trend: '+20%' },
    { id: 'calls', x: 0.2, y: 0.4, icon: Phone, label: 'Calls', value: '200/day', trend: '+40%' },
    { id: 'analytics', x: 0.5, y: 0.8, icon: BarChart2, label: 'Analytics', value: 'Real-time', trend: 'Live' },
    { id: 'automation', x: 0.5, y: 0.5, icon: Settings, label: 'Automation', value: '50+ Workflows', trend: '+35%' },
    { id: 'database', x: 0.3, y: 0.7, icon: Database, label: 'Database', value: '99.9% Uptime', trend: '+0.5%' },
    { id: 'notifications', x: 0.7, y: 0.7, icon: Bell, label: 'Notifications', value: 'Instant', trend: '-50ms' },
    { id: 'documents', x: 0.2, y: 0.6, icon: FileText, label: 'Documents', value: '10K+', trend: '+45%' }
  ];

  const connections: Connection[] = [
    { from: 'contacts', to: 'communication', active: true },
    { from: 'contacts', to: 'calendar', active: false },
    { from: 'communication', to: 'email', active: true },
    { from: 'communication', to: 'calls', active: false },
    { from: 'automation', to: 'notifications', active: true },
    { from: 'automation', to: 'database', active: true },
    { from: 'database', to: 'analytics', active: false },
    { from: 'analytics', to: 'documents', active: true },
    { from: 'contacts', to: 'automation', active: true },
    { from: 'calendar', to: 'automation', active: false }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    const animate = (currentTime: number) => {
      // Limit frame rate to 30fps for better performance
      if (currentTime - lastTime < 33) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections with gradient and glow effect
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from);
        const toNode = nodes.find(n => n.id === connection.to);
        if (!fromNode || !toNode) return;

        const fromX = fromNode.x * canvas.offsetWidth;
        const fromY = fromNode.y * canvas.offsetHeight;
        const toX = toNode.x * canvas.offsetWidth;
        const toY = toNode.y * canvas.offsetHeight;

        const isActive = connection.active || 
          [connection.from, connection.to].includes(activeNode || '') ||
          [connection.from, connection.to].includes(hoveredNode || '');

        // Create gradient for connection line
        const gradient = ctx.createLinearGradient(fromX, fromY, toX, toY);
        if (isActive) {
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
          gradient.addColorStop(1, 'rgba(239, 68, 68, 0.4)');
          
          // Add glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        } else {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
          ctx.shadowBlur = 0;
        }

        // Draw connection line
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.stroke();

        if (isActive) {
          // Multiple animated particles along the connection
          const particleCount = 3;
          for (let i = 0; i < particleCount; i++) {
            const offset = ((currentTime * 0.0002) + (i / particleCount)) % 1;
            const particleX = fromX + (toX - fromX) * offset;
            const particleY = fromY + (toY - fromY) * offset;
            const particleSize = 2 + Math.sin(currentTime * 0.01 + i) * 1;

            ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
            ctx.beginPath();
            ctx.arc(particleX, particleY, particleSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeNode, hoveredNode]);

  return (
    <div className="relative w-full h-[600px] bg-black/50 rounded-xl overflow-hidden backdrop-blur-sm">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10">
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const isHovered = hoveredNode === node.id;

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              style={{
                position: 'absolute',
                left: `${node.x * 100}%`,
                top: `${node.y * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => setActiveNode(isActive ? null : node.id)}
              onHoverStart={() => setHoveredNode(node.id)}
              onHoverEnd={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              <motion.div
                className={`relative p-3 rounded-xl backdrop-blur-sm border transition-all duration-300
                  ${isActive || isHovered ? 'bg-red-500/10 border-red-500/50 shadow-lg shadow-red-500/20' : 'bg-white/5 border-white/10'}`}
                whileHover={{ scale: 1.1 }}
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
              >
                <motion.div
                  animate={isActive || isHovered ? {
                    rotate: [0, 360],
                    transition: { duration: 2, repeat: Infinity, ease: "linear" }
                  } : {}}
                >
                  <node.icon className={`w-6 h-6 ${isActive || isHovered ? 'text-red-500' : 'text-white'}`} />
                </motion.div>
                
                <AnimatePresence>
                  {(isActive || isHovered) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                      className="absolute left-1/2 -bottom-16 -translate-x-1/2 bg-black/90 rounded-lg p-3 border border-red-500/20 whitespace-nowrap shadow-xl shadow-black/50"
                    >
                      <div className="text-sm font-semibold text-white mb-1">{node.label}</div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="text-red-500 font-bold">{node.value}</div>
                        <motion.div
                          className="flex items-center text-xs text-green-500"
                          animate={{
                            scale: [1, 1.1, 1],
                            transition: { duration: 2, repeat: Infinity }
                          }}
                        >
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {node.trend}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CRMDashboard;
