import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Play, 
  Pause,
  Check,
  X,
  ArrowRight,
  Cpu,
  Database,
  Cloud,
  Mail,
  MessageSquare,
  Calendar,
  FileText,
  Users,
  BarChart,
  Settings,
  Zap
} from 'lucide-react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'output';
  category: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  x: number;
  y: number;
  connections: string[];
  config?: any;
}

interface Connection {
  from: string;
  to: string;
  id: string;
}

const nodeTemplates = {
  triggers: [
    { 
      type: 'trigger' as const, 
      category: 'Email', 
      title: 'Email Received', 
      description: 'Triggers when new email arrives',
      icon: Mail 
    },
    { 
      type: 'trigger' as const, 
      category: 'Schedule', 
      title: 'Time-based', 
      description: 'Run at scheduled times',
      icon: Calendar 
    },
    { 
      type: 'trigger' as const, 
      category: 'Form', 
      title: 'Form Submission', 
      description: 'When form is submitted',
      icon: FileText 
    },
    { 
      type: 'trigger' as const, 
      category: 'API', 
      title: 'Webhook', 
      description: 'External API trigger',
      icon: Zap 
    }
  ],
  actions: [
    { 
      type: 'action' as const, 
      category: 'Database', 
      title: 'Save to Database', 
      description: 'Store data in database',
      icon: Database 
    },
    { 
      type: 'action' as const, 
      category: 'Email', 
      title: 'Send Email', 
      description: 'Send automated email',
      icon: Mail 
    },
    { 
      type: 'action' as const, 
      category: 'Message', 
      title: 'Send SMS', 
      description: 'Send text message',
      icon: MessageSquare 
    },
    { 
      type: 'action' as const, 
      category: 'Cloud', 
      title: 'Upload to Cloud', 
      description: 'Store files in cloud',
      icon: Cloud 
    },
    { 
      type: 'action' as const, 
      category: 'CRM', 
      title: 'Update CRM', 
      description: 'Update customer records',
      icon: Users 
    },
    { 
      type: 'action' as const, 
      category: 'Analytics', 
      title: 'Track Event', 
      description: 'Log analytics event',
      icon: BarChart 
    }
  ],
  conditions: [
    { 
      type: 'condition' as const, 
      category: 'Logic', 
      title: 'If/Then', 
      description: 'Conditional branching',
      icon: Settings 
    },
    { 
      type: 'condition' as const, 
      category: 'Filter', 
      title: 'Data Filter', 
      description: 'Filter data by criteria',
      icon: Cpu 
    }
  ]
};

const InteractiveWorkflowBuilder: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [showNodePicker, setShowNodePicker] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  // Initialize canvas and draggable
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = gsap.context(() => {
      // Make nodes draggable
      nodes.forEach(node => {
        const element = nodeRefs.current[node.id];
        if (!element) return;

        Draggable.create(element, {
          type: "x,y",
          bounds: canvasRef.current,
          onDrag: function() {
            const newX = this.x;
            const newY = this.y;
            
            setNodes(prev => prev.map(n => 
              n.id === node.id ? { ...n, x: newX, y: newY } : n
            ));

            // Update connections
            updateConnectionPaths();
          }
        });
      });
    }, canvasRef);

    return () => ctx.revert();
  }, [nodes]);

  // Add a new node
  const addNode = (template: typeof nodeTemplates.triggers[0] | typeof nodeTemplates.actions[0] | typeof nodeTemplates.conditions[0]) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: template.type,
      category: template.category,
      title: template.title,
      description: template.description,
      icon: template.icon,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      connections: []
    };

    setNodes([...nodes, newNode]);
    setShowNodePicker(false);

    // Animate new node
    setTimeout(() => {
      const element = nodeRefs.current[newNode.id];
      if (element) {
        gsap.fromTo(element,
          { scale: 0, opacity: 0, rotation: -180 },
          { 
            scale: 1, 
            opacity: 1, 
            rotation: 0, 
            duration: 0.6, 
            ease: 'back.out(1.7)' 
          }
        );
      }
    }, 50);
  };

  // Delete a node
  const deleteNode = (nodeId: string) => {
    // Animate node removal
    const element = nodeRefs.current[nodeId];
    if (element) {
      gsap.to(element, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.4,
        ease: 'back.in(1.7)',
        onComplete: () => {
          setNodes(nodes.filter(n => n.id !== nodeId));
          setConnections(connections.filter(c => c.from !== nodeId && c.to !== nodeId));
          if (selectedNode?.id === nodeId) setSelectedNode(null);
        }
      });
    }
  };

  // Create connection between nodes
  const createConnection = (fromId: string, toId: string) => {
    if (fromId === toId) return;

    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      from: fromId,
      to: toId
    };

    setConnections([...connections, newConnection]);
    setIsConnecting(false);
    setConnectingFrom(null);

    // Animate connection
    setTimeout(() => {
      const path = document.getElementById(newConnection.id) as unknown as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        gsap.fromTo(path,
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    }, 50);
  };

  // Update connection paths
  const updateConnectionPaths = () => {
    connections.forEach(conn => {
      const path = document.getElementById(conn.id);
      if (path) {
        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (fromNode && toNode) {
          const d = calculatePath(fromNode, toNode);
          path.setAttribute('d', d);
        }
      }
    });
  };

  // Calculate bezier path between nodes
  const calculatePath = (from: WorkflowNode, to: WorkflowNode) => {
    const fromX = from.x + 120; // Right side of node
    const fromY = from.y + 40; // Center of node
    const toX = to.x; // Left side of node
    const toY = to.y + 40; // Center of node
    
    const controlX1 = fromX + (toX - fromX) * 0.5;
    const controlY1 = fromY;
    const controlX2 = fromX + (toX - fromX) * 0.5;
    const controlY2 = toY;

    return `M ${fromX} ${fromY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${toX} ${toY}`;
  };

  // Simulate workflow execution
  const runWorkflow = async () => {
    if (nodes.length === 0) return;

    setIsRunning(true);
    
    // Find trigger nodes
    const triggers = nodes.filter(n => n.type === 'trigger');
    
    for (const trigger of triggers) {
      await animateNode(trigger.id);
      
      // Follow connections
      const queue = [trigger.id];
      const visited = new Set<string>();
      
      while (queue.length > 0) {
        const currentId = queue.shift()!;
        if (visited.has(currentId)) continue;
        visited.add(currentId);
        
        const currentNode = nodes.find(n => n.id === currentId);
        if (!currentNode) continue;
        
        // Find connected nodes
        const nextNodes = connections
          .filter(c => c.from === currentId)
          .map(c => c.to);
        
        for (const nextId of nextNodes) {
          await animateConnection(currentId, nextId);
          await animateNode(nextId);
          queue.push(nextId);
        }
      }
    }
    
    setIsRunning(false);
    setActiveNodeId(null);
  };

  // Animate individual node
  const animateNode = (nodeId: string) => {
    return new Promise<void>((resolve) => {
      setActiveNodeId(nodeId);
      const element = nodeRefs.current[nodeId];
      
      if (element) {
        gsap.timeline()
          .to(element, {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
          })
          .to(element.querySelector('.node-glow'), {
            opacity: 1,
            duration: 0.3
          }, 0)
          .to(element, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: resolve
          })
          .to(element.querySelector('.node-glow'), {
            opacity: 0,
            duration: 0.3
          }, 0.3);
      } else {
        resolve();
      }
    });
  };

  // Animate connection path
  const animateConnection = (fromId: string, toId: string) => {
    return new Promise<void>((resolve) => {
      const connection = connections.find(c => c.from === fromId && c.to === toId);
      if (!connection) {
        resolve();
        return;
      }

      const path = document.getElementById(connection.id) as unknown as SVGPathElement;
      if (path) {
        const length = path.getTotalLength();
        
        // Create a pulse element
        const pulse = document.createElement('circle');
        pulse.setAttribute('r', '6');
        pulse.setAttribute('fill', '#ef4444');
        pulse.setAttribute('filter', 'url(#glow)');
        
        const svg = path.parentElement;
        svg?.appendChild(pulse);

        const animation = { distance: 0 };
        
        gsap.to(animation, {
          distance: length,
          duration: 0.8,
          ease: 'power2.inOut',
          onUpdate: () => {
            const point = (path as SVGPathElement).getPointAtLength(animation.distance);
            pulse.setAttribute('cx', point.x.toString());
            pulse.setAttribute('cy', point.y.toString());
          },
          onComplete: () => {
            pulse.remove();
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Interactive Workflow Builder</h2>
        <p className="text-lg text-gray-400 mb-6">
          Drag and drop to build your automation workflow
        </p>
        
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setShowNodePicker(true)}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            Add Node
          </button>
          
          <button
            onClick={runWorkflow}
            disabled={isRunning || nodes.length === 0}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Run Workflow
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              setNodes([]);
              setConnections([]);
              setSelectedNode(null);
            }}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <Trash2 className="w-5 h-5" />
            Clear
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div 
        ref={canvasRef}
        className="relative w-full h-[600px] bg-black/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
      >
        {/* SVG for connections */}
        <svg className="absolute inset-0 pointer-events-none">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <path
                key={conn.id}
                id={conn.id}
                d={calculatePath(fromNode, toNode)}
                stroke="#ef4444"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
                filter="url(#glow)"
              />
            );
          })}
        </svg>

        {/* Nodes */}
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
              className={`
                workflow-node relative select-none cursor-move
                ${selectedNode?.id === node.id ? 'ring-2 ring-red-500' : ''}
                ${activeNodeId === node.id ? 'animate-pulse' : ''}
              `}
              onClick={() => {
                if (isConnecting && connectingFrom && connectingFrom !== node.id) {
                  createConnection(connectingFrom, node.id);
                } else {
                  setSelectedNode(node);
                }
              }}
            >
              <div className="relative w-48 bg-gray-900/90 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:border-red-500/50 transition-all duration-300">
                {/* Glow effect */}
                <div className="node-glow absolute inset-0 bg-red-500/20 rounded-xl blur-xl opacity-0" />
                
                {/* Node type indicator */}
                <div className={`
                  absolute -top-2 -left-2 px-2 py-1 text-xs font-semibold rounded-full
                  ${node.type === 'trigger' ? 'bg-green-500 text-white' : ''}
                  ${node.type === 'action' ? 'bg-blue-500 text-white' : ''}
                  ${node.type === 'condition' ? 'bg-yellow-500 text-black' : ''}
                `}>
                  {node.type}
                </div>

                {/* Content */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-white">{node.title}</h4>
                    <p className="text-xs text-gray-400 mt-1">{node.description}</p>
                  </div>
                </div>

                {/* Connection points */}
                {node.type !== 'trigger' && (
                  <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full" />
                )}
                {node.type !== 'output' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsConnecting(true);
                      setConnectingFrom(node.id);
                    }}
                    className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500 rounded-full hover:scale-150 transition-transform"
                  />
                )}

                {/* Delete button */}
                {selectedNode?.id === node.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNode(node.id);
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Cpu className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Click "Add Node" to start building your workflow</p>
            </div>
          </div>
        )}
      </div>

      {/* Node Picker Modal */}
      <AnimatePresence>
        {showNodePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowNodePicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-3xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Choose a Node Type</h3>
              
              {/* Triggers */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-green-500 mb-4">Triggers</h4>
                <div className="grid grid-cols-2 gap-4">
                  {nodeTemplates.triggers.map((template, index) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => addNode(template)}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/50 transition-all duration-300 text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                            <Icon className="w-5 h-5 text-green-500" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white">{template.title}</h5>
                            <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-blue-500 mb-4">Actions</h4>
                <div className="grid grid-cols-2 gap-4">
                  {nodeTemplates.actions.map((template, index) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => addNode(template)}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                            <Icon className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white">{template.title}</h5>
                            <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditions */}
              <div>
                <h4 className="text-lg font-semibold text-yellow-500 mb-4">Conditions</h4>
                <div className="grid grid-cols-2 gap-4">
                  {nodeTemplates.conditions.map((template, index) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => addNode(template)}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500/50 transition-all duration-300 text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                            <Icon className="w-5 h-5 text-yellow-500" />
                          </div>
                          <div>
                            <h5 className="font-semibold text-white">{template.title}</h5>
                            <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractiveWorkflowBuilder;