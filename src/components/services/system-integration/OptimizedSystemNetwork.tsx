import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Server, Laptop, Cloud, 
  ArrowRight, Globe, Smartphone, Shield,
  Clock, AlertCircle, ChevronRight
} from 'lucide-react';

// System node type definitions
interface SystemNode {
  id: string;
  title: string;
  icon: React.ElementType;
  type: 'legacy' | 'cloud' | 'mobile' | 'middleware' | 'security';
  connections: string[];
  description: string;
  features: string[];
  color: string;
  position: { x: number, y: number };
}

// Define system nodes
const systemNodes: SystemNode[] = [
  {
    id: 'legacy_db',
    title: 'Legacy Database',
    icon: Database,
    type: 'legacy',
    connections: ['middleware_api', 'middleware_etl'],
    description: 'Your existing database systems that store critical business data',
    features: [
      'SQL/NoSQL Database Integration',
      'Data Extraction & Transformation',
      'Legacy System Connectivity',
      'Real-time Synchronization'
    ],
    color: '#3b82f6', // Blue
    position: { x: 0, y: 0 }
  },
  {
    id: 'legacy_app',
    title: 'Legacy Applications',
    icon: Server,
    type: 'legacy',
    connections: ['middleware_api'],
    description: 'Existing software applications critical to your business operations',
    features: [
      'API Enablement',
      'Application Extension',
      'Function Wrapping',
      'Legacy Code Integration'
    ],
    color: '#8b5cf6', // Purple
    position: { x: 0, y: 1 }
  },
  {
    id: 'middleware_api',
    title: 'API Gateway',
    icon: Globe,
    type: 'middleware',
    connections: ['cloud_app', 'security', 'mobile_app'],
    description: 'Central hub for API management, routing, and transformation',
    features: [
      'Request Routing',
      'Load Balancing',
      'Rate Limiting',
      'API Versioning'
    ],
    color: '#ef4444', // Red
    position: { x: 1, y: 0 }
  },
  {
    id: 'middleware_etl',
    title: 'ETL Pipeline',
    icon: ArrowRight,
    type: 'middleware',
    connections: ['cloud_storage', 'cloud_app'],
    description: 'Data extraction, transformation, and loading processes',
    features: [
      'Automated Data Flows',
      'Format Conversion',
      'Data Cleansing',
      'Scheduled Jobs'
    ],
    color: '#f97316', // Amber
    position: { x: 1, y: 1 }
  },
  {
    id: 'cloud_storage',
    title: 'Cloud Storage',
    icon: Cloud,
    type: 'cloud',
    connections: ['cloud_app'],
    description: 'Scalable cloud storage solutions for your data',
    features: [
      'Secure Object Storage',
      'Automatic Scaling',
      'Geo-redundancy',
      'High Availability'
    ],
    color: '#0ea5e9', // Sky blue
    position: { x: 2, y: 0 }
  },
  {
    id: 'cloud_app',
    title: 'Cloud Applications',
    icon: Cloud,
    type: 'cloud',
    connections: ['mobile_app', 'monitoring'],
    description: 'Modern cloud-native applications and services',
    features: [
      'Microservices Architecture',
      'Containerized Deployment',
      'Auto-scaling',
      'Serverless Functions'
    ],
    color: '#10b981', // Emerald
    position: { x: 2, y: 1 }
  },
  {
    id: 'mobile_app',
    title: 'Mobile Applications',
    icon: Smartphone,
    type: 'mobile',
    connections: ['monitoring'],
    description: 'Native and web-based mobile applications',
    features: [
      'iOS/Android Support',
      'Push Notifications',
      'Offline Capability',
      'Responsive Design'
    ],
    color: '#ec4899', // Pink
    position: { x: 3, y: 0 }
  },
  {
    id: 'security',
    title: 'Security Layer',
    icon: Shield,
    type: 'security',
    connections: ['monitoring'],
    description: 'Comprehensive security measures for your integrated systems',
    features: [
      'Identity Management',
      'Access Control',
      'Encryption',
      'Threat Protection'
    ],
    color: '#6366f1', // Indigo
    position: { x: 3, y: 1 }
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    icon: AlertCircle,
    type: 'middleware',
    connections: [],
    description: 'Real-time monitoring and alerting system',
    features: [
      'Performance Metrics',
      'Error Tracking',
      'Uptime Monitoring',
      'Alert Management'
    ],
    color: '#14b8a6', // Teal
    position: { x: 4, y: 0 }
  }
];

// System types for filtering
const systemTypes = [
  { id: 'legacy', label: 'Legacy Systems', icon: Database, color: '#3b82f6' },
  { id: 'middleware', label: 'Middleware', icon: ArrowRight, color: '#ef4444' },
  { id: 'cloud', label: 'Cloud Services', icon: Cloud, color: '#10b981' },
  { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, color: '#ec4899' },
  { id: 'security', label: 'Security', icon: Shield, color: '#6366f1' }
];

// Helper to find node by ID
const findNodeById = (id: string): SystemNode | undefined => {
  return systemNodes.find(node => node.id === id);
};

// Connection line component
const ConnectionLine = ({ 
  fromNode, 
  toNode, 
  isActive,
  isAnimated
}: { 
  fromNode: SystemNode; 
  toNode: SystemNode;
  isActive: boolean;
  isAnimated: boolean;
}) => {
  // Calculate positions based on grid layout
  return (
    <div className="absolute pointer-events-none" style={{ 
      left: `${25 + (fromNode.position.x * 25)}%`, 
      top: `${fromNode.position.y * 200 + 80}px`, 
      width: `${(toNode.position.x - fromNode.position.x) * 25}%`,
      height: `${(toNode.position.y - fromNode.position.y) * 200 + (toNode.position.y !== fromNode.position.y ? 0 : 0)}px`,
      zIndex: 1,
      overflow: 'visible'
    }}>
      <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <marker
            id={`arrow-${fromNode.id}-${toNode.id}`}
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
            className={isActive ? 'text-red-500' : 'text-gray-600'}
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
          </marker>
        </defs>
        
        <path
          d={`M 0,${fromNode.position.y === toNode.position.y ? 0 : 0} C ${(toNode.position.x - fromNode.position.x) * 50}%,${fromNode.position.y === toNode.position.y ? 50 : 0} ${(toNode.position.x - fromNode.position.x) * 50}%,${toNode.position.y * 200 - fromNode.position.y * 200} ${(toNode.position.x - fromNode.position.x) * 100}%,${toNode.position.y * 200 - fromNode.position.y * 200}`}
          stroke={isActive ? fromNode.color : '#555555'}
          strokeWidth={isActive ? 2 : 1}
          fill="none"
          strokeDasharray={isAnimated ? "5,5" : "none"}
          className={isAnimated ? "animate-flow" : ""}
          markerEnd={`url(#arrow-${fromNode.id}-${toNode.id})`}
          opacity={isActive ? 1 : 0.4}
        />
        
        {isActive && isAnimated && (
          <motion.circle
            cx="0"
            cy="0"
            r="5"
            fill={fromNode.color}
            className="drop-shadow-glow"
            initial={{ cx: 0, cy: fromNode.position.y === toNode.position.y ? 0 : 0 }}
            animate={{
              cx: `${(toNode.position.x - fromNode.position.x) * 100}%`,
              cy: toNode.position.y * 200 - fromNode.position.y * 200
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }}
          />
        )}
      </svg>
    </div>
  );
};

// System node component
const SystemNodeComponent = ({
  node,
  isActive,
  isHovered,
  isHighlighted,
  onClick,
  onHover
}: {
  node: SystemNode;
  isActive: boolean;
  isHovered: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  onHover: (id: string | null) => void;
}) => {
  const typeInfo = systemTypes.find(type => type.id === node.type);
  
  return (
    <motion.div
      className={`absolute cursor-pointer w-40 transition-all ${
        isActive || isHovered ? 'z-20' : 'z-10'
      }`}
      style={{ 
        left: `${25 + (node.position.x * 25) - 10}%`, 
        top: `${node.position.y * 200 + 50}px` 
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        filter: isActive || isHovered ? 'drop-shadow(0 0 8px rgba(255,255,255,0.3))' : 'none'
      }}
      transition={{ duration: 0.5, delay: node.position.x * 0.1 + node.position.y * 0.1 }}
      onClick={onClick}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      whileHover={{ scale: 1.05 }}
    >
      <div className={`p-4 rounded-xl transition-all duration-300 border ${
        isActive ? 'border-2 bg-black/80' : 
        isHovered ? 'bg-black/70 border-white/20' : 
        isHighlighted ? 'bg-black/60 border-white/10' : 'bg-black/50 border-white/5'
      }`} style={{ borderColor: isActive || isHovered ? node.color : '' }}>
        <div className="flex items-center justify-center mb-2">
          <motion.div 
            className="w-12 h-12 rounded-full flex items-center justify-center" 
            style={{ backgroundColor: `${node.color}20` }}
            animate={{ 
              boxShadow: isActive || isHovered ? `0 0 15px ${node.color}50` : 'none'
            }}
          >
            {React.createElement(node.icon, { 
              size: 24, 
              color: node.color, 
              className: isActive || isHovered ? 'animate-pulse' : '' 
            })}
          </motion.div>
        </div>
        
        <div className="text-center">
          <h4 className="text-sm font-bold text-white mb-1">{node.title}</h4>
          <div className="text-xs text-gray-400">
            {typeInfo?.label || node.type}
          </div>
        </div>
        
        {/* Expand button */}
        {!isActive && (
          <motion.div 
            className="absolute -right-1 -bottom-1 bg-black/70 border border-white/10 rounded-full p-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={14} className="text-white" />
          </motion.div>
        )}
      </div>
      
      {/* Details panel */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mt-2 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 overflow-hidden shadow-lg"
            style={{ borderColor: `${node.color}40` }}
          >
            <h4 className="font-bold mb-2" style={{ color: node.color }}>{node.title}</h4>
            <p className="text-xs text-gray-300 mb-3">{node.description}</p>
            
            <div className="text-xs font-semibold mb-1 text-white">Key Features:</div>
            <div className="space-y-1">
              {node.features.map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start text-xs"
                >
                  <div className="w-1 h-1 rounded-full mt-1.5 mr-1.5 flex-shrink-0" style={{ backgroundColor: node.color }}></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              className="text-center mt-3"
              whileHover={{ scale: 1.05 }}
            >
              <button 
                className="text-xs py-1 px-3 rounded-full transition-colors"
                style={{ backgroundColor: `${node.color}30`, color: node.color }}
                onClick={e => {
                  e.stopPropagation();
                  onClick();
                }}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Main component
const OptimizedSystemNetwork = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'diagram' | 'list'>('diagram');
  
  // Check if connection is active
  const isConnectionActive = (fromId: string, toId: string): boolean => {
    return (activeNode === fromId || activeNode === toId || 
            hoveredNode === fromId || hoveredNode === toId) ||
           (activeType !== null && 
            findNodeById(fromId)?.type === activeType && 
            findNodeById(toId)?.type === activeType);
  };
  
  // Check if node should be highlighted
  const isNodeHighlighted = (node: SystemNode): boolean => {
    return activeType === node.type;
  };

  return (
    <div className="relative w-full border border-white/10 rounded-xl bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-sm overflow-hidden">
      {/* System type filters */}
      <div className="p-4 border-b border-white/10">
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {systemTypes.map(type => (
            <motion.button 
              key={type.id}
              className={`px-3 py-1 text-xs rounded-lg flex items-center transition-all duration-300 ${
                activeType === type.id 
                  ? 'bg-white/20 text-white border border-white/30' 
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setActiveType(activeType === type.id ? null : type.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {React.createElement(type.icon, { 
                size: 14, 
                className: "mr-1.5",
                color: type.color
              })}
              {type.label}
            </motion.button>
          ))}
          
          <motion.button 
            className="px-3 py-1 text-xs rounded-lg flex items-center bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all duration-300"
            onClick={() => {
              setActiveType(null);
              setActiveNode(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Reset
          </motion.button>
          
          <motion.button 
            className="px-3 py-1 text-xs rounded-lg flex items-center bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 transition-all duration-300"
            onClick={() => setViewMode(viewMode === 'diagram' ? 'list' : 'diagram')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {viewMode === 'diagram' ? 'View as List' : 'View as Diagram'}
          </motion.button>
        </div>
        
        <h3 className="text-2xl font-bold text-white text-center">System Integration Network</h3>
        <p className="text-sm text-gray-400 text-center mt-1">Visualizing your interconnected systems</p>
      </div>
      
      {/* Diagram view */}
      {viewMode === 'diagram' && (
        <div className="relative min-h-[600px] overflow-hidden p-4">
          {/* Connection lines */}
          {systemNodes.map(node => 
            node.connections.map(targetId => {
              const targetNode = findNodeById(targetId);
              if (!targetNode) return null;
              
              return (
                <ConnectionLine
                  key={`${node.id}-${targetId}`}
                  fromNode={node}
                  toNode={targetNode}
                  isActive={isConnectionActive(node.id, targetId)}
                  isAnimated={activeNode === node.id || hoveredNode === node.id}
                />
              );
            })
          )}
          
          {/* Nodes */}
          {systemNodes.map(node => (
            <SystemNodeComponent
              key={node.id}
              node={node}
              isActive={activeNode === node.id}
              isHovered={hoveredNode === node.id}
              isHighlighted={isNodeHighlighted(node)}
              onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
              onHover={setHoveredNode}
            />
          ))}
        </div>
      )}
      
      {/* List view */}
      {viewMode === 'list' && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {systemNodes
              .filter(node => !activeType || node.type === activeType)
              .map(node => {
                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/5 rounded-lg p-4 border transition-all duration-300 hover:bg-white/10"
                    style={{ borderColor: `${node.color}30` }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start">
                      <div 
                        className="p-2 rounded-lg mr-3 flex-shrink-0" 
                        style={{ backgroundColor: `${node.color}20` }}
                      >
                        {React.createElement(node.icon, { 
                          size: 18, 
                          color: node.color
                        })}
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{node.title}</h4>
                        <div 
                          className="text-xs px-2 py-0.5 rounded-full inline-block mt-1" 
                          style={{ backgroundColor: `${node.color}20`, color: node.color }}
                        >
                          {systemTypes.find(type => type.id === node.type)?.label}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">{node.description}</p>
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {activeNode === node.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 pt-3 border-t border-white/10"
                        >
                          <div className="text-xs font-semibold mb-1 text-white">Features:</div>
                          <div className="space-y-1">
                            {node.features.map((feature, i) => (
                              <div key={i} className="flex items-start text-xs">
                                <div className="w-1 h-1 rounded-full mt-1.5 mr-1.5 flex-shrink-0" style={{ backgroundColor: node.color }}></div>
                                <span className="text-gray-300">{feature}</span>
                              </div>
                            ))}
                          </div>
                          
                          {node.connections.length > 0 && (
                            <div className="mt-3">
                              <div className="text-xs font-semibold mb-1 text-white">Connects to:</div>
                              <div className="flex flex-wrap gap-1">
                                {node.connections.map(connId => {
                                  const connNode = findNodeById(connId);
                                  return connNode ? (
                                    <div 
                                      key={connId} 
                                      className="text-xs px-2 py-0.5 rounded-full" 
                                      style={{ backgroundColor: `${connNode.color}20`, color: connNode.color }}
                                    >
                                      {connNode.title}
                                    </div>
                                  ) : null;
                                })}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <div className="text-right mt-3">
                      <button
                        className="text-xs font-medium text-white/70 hover:text-white transition-colors flex items-center justify-end w-full"
                        onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                      >
                        {activeNode === node.id ? 'Less details' : 'More details'}
                        <ChevronRight 
                          size={14} 
                          className={`ml-1 transition-transform ${activeNode === node.id ? 'rotate-90' : ''}`} 
                        />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      )}
      
      {/* Info panel */}
      <div className="p-4 border-t border-white/10 bg-black/30">
        <div className="text-center">
          <h4 className="font-semibold text-white">System Integration Benefits</h4>
          <div className="grid grid-cols-3 gap-4 mt-3">
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-red-500 font-bold text-xl">90%</div>
              <div className="text-xs text-gray-400">Efficiency Improvement</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-blue-500 font-bold text-xl">100%</div>
              <div className="text-xs text-gray-400">System Connectivity</div>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <div className="text-green-500 font-bold text-xl">65%</div>
              <div className="text-xs text-gray-400">Cost Reduction</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add styles for the animation */}
      <style jsx>{`
        @keyframes flow {
          0% {
            stroke-dashoffset: 20;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        .animate-flow {
          animation: flow 1s linear infinite;
        }
        
        .drop-shadow-glow {
          filter: drop-shadow(0 0 3px currentColor);
        }
      `}</style>
    </div>
  );
};

export default OptimizedSystemNetwork;