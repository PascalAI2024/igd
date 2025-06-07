import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Database, 
  Cloud, 
  Shield, 
  Cpu,
  HardDrive,
  Network,
  Lock,
  Globe,
  Smartphone,
  Monitor,
  Wifi,
  Activity,
  Zap,
  AlertCircle,
  CheckCircle,
  ArrowUpDown
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface NetworkNode {
  id: string;
  type: 'server' | 'database' | 'cloud' | 'api' | 'device' | 'security';
  name: string;
  status: 'active' | 'warning' | 'error' | 'idle';
  icon: React.ComponentType<any>;
  x: number;
  y: number;
  connections: string[];
  metrics?: {
    cpu?: number;
    memory?: number;
    requests?: number;
    latency?: number;
  };
}

interface DataPacket {
  id: string;
  from: string;
  to: string;
  type: 'request' | 'response' | 'data' | 'error';
  size: number;
}

const initialNodes: NetworkNode[] = [
  {
    id: 'main-server',
    type: 'server',
    name: 'Main Server',
    status: 'active',
    icon: Server,
    x: 400,
    y: 200,
    connections: ['database-1', 'api-gateway', 'backup-server'],
    metrics: { cpu: 45, memory: 62, requests: 1250 }
  },
  {
    id: 'database-1',
    type: 'database',
    name: 'Primary Database',
    status: 'active',
    icon: Database,
    x: 200,
    y: 100,
    connections: ['backup-database'],
    metrics: { cpu: 30, memory: 78, requests: 850 }
  },
  {
    id: 'backup-database',
    type: 'database',
    name: 'Backup Database',
    status: 'idle',
    icon: Database,
    x: 100,
    y: 200,
    connections: [],
    metrics: { cpu: 10, memory: 45, requests: 0 }
  },
  {
    id: 'api-gateway',
    type: 'api',
    name: 'API Gateway',
    status: 'active',
    icon: Globe,
    x: 600,
    y: 100,
    connections: ['cloud-service', 'mobile-app', 'web-app'],
    metrics: { requests: 3200, latency: 45 }
  },
  {
    id: 'cloud-service',
    type: 'cloud',
    name: 'Cloud Services',
    status: 'active',
    icon: Cloud,
    x: 800,
    y: 200,
    connections: [],
    metrics: { cpu: 25, memory: 40 }
  },
  {
    id: 'backup-server',
    type: 'server',
    name: 'Backup Server',
    status: 'idle',
    icon: HardDrive,
    x: 400,
    y: 350,
    connections: [],
    metrics: { cpu: 5, memory: 20, requests: 0 }
  },
  {
    id: 'security-layer',
    type: 'security',
    name: 'Security Gateway',
    status: 'active',
    icon: Shield,
    x: 400,
    y: 50,
    connections: ['main-server', 'api-gateway'],
    metrics: { requests: 5000 }
  },
  {
    id: 'mobile-app',
    type: 'device',
    name: 'Mobile Apps',
    status: 'active',
    icon: Smartphone,
    x: 700,
    y: 300,
    connections: [],
    metrics: { requests: 1500 }
  },
  {
    id: 'web-app',
    type: 'device',
    name: 'Web Application',
    status: 'active',
    icon: Monitor,
    x: 500,
    y: 300,
    connections: [],
    metrics: { requests: 2100 }
  }
];

const InteractiveNetworkDiagram: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<NetworkNode[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [dataPackets, setDataPackets] = useState<DataPacket[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [networkHealth, setNetworkHealth] = useState(100);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const animationRef = useRef<number>();

  // Initialize draggable nodes
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.network-node',
        {
          scale: 0,
          opacity: 0,
          rotation: -180
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );

      // Make nodes draggable
      nodes.forEach(node => {
        const element = nodeRefs.current[node.id];
        if (!element) return;

        Draggable.create(element, {
          type: "x,y",
          bounds: canvasRef.current,
          onDrag: function() {
            setNodes(prev => prev.map(n => 
              n.id === node.id ? { ...n, x: this.x, y: this.y } : n
            ));
          }
        });
      });

      // Animate connections
      gsap.to('.connection-line', {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'none'
      });

      // Pulse animation for active nodes
      gsap.to('.status-active', {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

    }, canvasRef);

    return () => ctx.revert();
  }, []);

  // Generate data packet
  const generateDataPacket = () => {
    const activeNodes = nodes.filter(n => n.status === 'active' && n.connections.length > 0);
    if (activeNodes.length === 0) return;

    const fromNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
    const toNodeId = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
    const toNode = nodes.find(n => n.id === toNodeId);

    if (!toNode) return;

    const packet: DataPacket = {
      id: `packet-${Date.now()}-${Math.random()}`,
      from: fromNode.id,
      to: toNode.id,
      type: Math.random() > 0.9 ? 'error' : 'data',
      size: Math.floor(Math.random() * 100) + 10
    };

    animateDataPacket(packet);
  };

  // Animate data packet
  const animateDataPacket = (packet: DataPacket) => {
    const fromNode = nodes.find(n => n.id === packet.from);
    const toNode = nodes.find(n => n.id === packet.to);
    
    if (!fromNode || !toNode) return;

    const dot = document.createElement('div');
    dot.className = `absolute w-4 h-4 rounded-full pointer-events-none z-20`;
    dot.style.backgroundColor = packet.type === 'error' ? '#ef4444' : '#10b981';
    dot.style.boxShadow = `0 0 20px ${packet.type === 'error' ? '#ef4444' : '#10b981'}`;
    
    if (canvasRef.current) {
      canvasRef.current.appendChild(dot);
    }

    // Calculate path
    const startX = fromNode.x + 40;
    const startY = fromNode.y + 40;
    const endX = toNode.x + 40;
    const endY = toNode.y + 40;

    gsap.set(dot, { x: startX - 8, y: startY - 8, scale: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        dot.remove();
        
        // Update node metrics
        if (packet.type === 'data') {
          setNodes(prev => prev.map(n => {
            if (n.id === toNode.id && n.metrics) {
              return {
                ...n,
                metrics: {
                  ...n.metrics,
                  requests: (n.metrics.requests || 0) + 1
                }
              };
            }
            return n;
          }));
        } else {
          // Handle error
          updateNodeStatus(toNode.id, 'warning');
          setTimeout(() => updateNodeStatus(toNode.id, 'active'), 3000);
        }
      }
    });

    // Animate packet movement
    tl.to(dot, {
      scale: 1,
      duration: 0.2,
      ease: 'back.out(2)'
    })
    .to(dot, {
      x: endX - 8,
      y: endY - 8,
      duration: 1,
      ease: 'none',
      onUpdate: function() {
        // Create trail effect
        if (Math.random() > 0.7) {
          const trail = dot.cloneNode() as HTMLElement;
          trail.style.opacity = '0.5';
          canvasRef.current?.appendChild(trail);
          
          gsap.to(trail, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            onComplete: () => trail.remove()
          });
        }
      }
    })
    .to(dot, {
      scale: 2,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Pulse effect on target node
    const targetElement = nodeRefs.current[toNode.id];
    if (targetElement) {
      gsap.to(targetElement.querySelector('.node-icon'), {
        scale: 1.3,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  // Update node status
  const updateNodeStatus = (nodeId: string, status: NetworkNode['status']) => {
    setNodes(prev => prev.map(n => 
      n.id === nodeId ? { ...n, status } : n
    ));
  };

  // Start network simulation
  const startSimulation = () => {
    setIsSimulating(true);
    
    const simulate = () => {
      generateDataPacket();
      
      // Randomly change node status
      if (Math.random() > 0.95) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        const statuses: NetworkNode['status'][] = ['active', 'warning', 'error', 'idle'];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        updateNodeStatus(randomNode.id, newStatus);
      }

      // Update network health
      const activeNodes = nodes.filter(n => n.status === 'active').length;
      const health = Math.round((activeNodes / nodes.length) * 100);
      setNetworkHealth(health);

      animationRef.current = window.setTimeout(simulate, Math.random() * 1000 + 500);
    };
    
    simulate();
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsSimulating(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Get connection path
  const getConnectionPath = (from: NetworkNode, to: NetworkNode) => {
    const startX = from.x + 40;
    const startY = from.y + 40;
    const endX = to.x + 40;
    const endY = to.y + 40;
    
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const curve = Math.abs(endX - startX) * 0.2;
    
    return `M ${startX} ${startY} Q ${midX} ${midY - curve} ${endX} ${endY}`;
  };

  // Get status color
  const getStatusColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      case 'idle': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Interactive System Network</h2>
        <p className="text-lg text-gray-400 mb-6">
          Visualize and monitor your integrated systems in real-time
        </p>
        
        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={isSimulating ? stopSimulation : startSimulation}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
          >
            <Activity className="w-5 h-5" />
            {isSimulating ? 'Stop Traffic' : 'Simulate Traffic'}
          </button>
          
          <button
            onClick={() => setNodes(initialNodes.map(n => ({ ...n, status: 'active' as const })))}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Reset Network
          </button>
        </div>

        {/* Network Health */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/50 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${networkHealth > 80 ? 'bg-green-500' : networkHealth > 50 ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`} />
                <span className="text-white font-semibold">Network Health</span>
              </div>
              <div className="text-2xl font-bold text-white">{networkHealth}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Network Canvas */}
      <div 
        ref={canvasRef}
        className="relative w-full h-[600px] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl border border-white/10 overflow-hidden"
      >
        {/* Grid background */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        {/* SVG for connections */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <filter id="network-glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {nodes.map(node => 
            node.connections.map(targetId => {
              const targetNode = nodes.find(n => n.id === targetId);
              if (!targetNode) return null;
              
              return (
                <path
                  key={`${node.id}-${targetId}`}
                  className="connection-line"
                  d={getConnectionPath(node, targetNode)}
                  stroke="#4b5563"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5 5"
                  opacity="0.5"
                />
              );
            })
          )}
        </svg>

        {/* Network Nodes */}
        {nodes.map(node => {
          const Icon = node.icon;
          return (
            <div
              key={node.id}
              ref={el => { if (el) nodeRefs.current[node.id] = el; }}
              style={{ 
                position: 'absolute', 
                left: node.x, 
                top: node.y,
                transform: 'translate(0, 0)'
              }}
              className="network-node cursor-move"
              onClick={() => setSelectedNode(node)}
            >
              <div className="relative group">
                {/* Status indicator */}
                <div 
                  className={`status-${node.status} absolute -inset-2 rounded-full opacity-30`}
                  style={{ backgroundColor: getStatusColor(node.status) }}
                />
                
                {/* Node container */}
                <div className="relative w-20 h-20 bg-gray-800/90 backdrop-blur-sm rounded-xl border-2 border-white/20 hover:border-white/40 transition-all duration-300 group-hover:scale-110">
                  <div 
                    className="node-icon w-full h-full flex items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${getStatusColor(node.status)}20` }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Status dot */}
                  <div 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: getStatusColor(node.status) }}
                  />
                </div>

                {/* Node name */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <p className="text-xs font-semibold text-white bg-black/50 px-2 py-1 rounded">
                    {node.name}
                  </p>
                </div>

                {/* Metrics tooltip on hover */}
                {node.metrics && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-gray-900 rounded-lg p-3 text-xs text-white whitespace-nowrap border border-white/20">
                      {node.metrics.cpu && <div>CPU: {node.metrics.cpu}%</div>}
                      {node.metrics.memory && <div>Memory: {node.metrics.memory}%</div>}
                      {node.metrics.requests && <div>Requests: {node.metrics.requests}</div>}
                      {node.metrics.latency && <div>Latency: {node.metrics.latency}ms</div>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <p className="text-xs font-semibold text-white mb-2">Status</p>
          <div className="space-y-2">
            {[
              { status: 'active' as const, label: 'Active' },
              { status: 'warning' as const, label: 'Warning' },
              { status: 'error' as const, label: 'Error' },
              { status: 'idle' as const, label: 'Idle' }
            ].map(({ status, label }) => (
              <div key={status} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getStatusColor(status) }}
                />
                <span className="text-xs text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Node Details Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${getStatusColor(selectedNode.status)}20` }}
                >
                  <selectedNode.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedNode.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getStatusColor(selectedNode.status) }}
                    />
                    <span className="text-sm capitalize" style={{ color: getStatusColor(selectedNode.status) }}>
                      {selectedNode.status}
                    </span>
                  </div>
                </div>
              </div>

              {selectedNode.metrics && (
                <div className="space-y-3 mb-6">
                  {selectedNode.metrics.cpu !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">CPU Usage</span>
                        <span className="text-white">{selectedNode.metrics.cpu}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${selectedNode.metrics.cpu}%`,
                            backgroundColor: selectedNode.metrics.cpu > 80 ? '#ef4444' : selectedNode.metrics.cpu > 50 ? '#f59e0b' : '#10b981'
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedNode.metrics.memory !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Memory Usage</span>
                        <span className="text-white">{selectedNode.metrics.memory}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${selectedNode.metrics.memory}%`,
                            backgroundColor: selectedNode.metrics.memory > 80 ? '#ef4444' : selectedNode.metrics.memory > 50 ? '#f59e0b' : '#10b981'
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                  Configure
                </button>
                <button className="flex-1 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300">
                  View Logs
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveNetworkDiagram;