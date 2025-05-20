import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Trail } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Wifi, Radio, Signal, MessageSquare, Mail, 
  Smartphone, Globe, Server, Cloud, User
} from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../../../AnimationErrorBoundary';

interface CommunicationNode {
  id: string;
  position: [number, number, number];
  icon: React.FC;
  label: string;
  type: 'device' | 'network' | 'server' | 'message';
  color: string;
  size: number;
  connections: {
    target: string;
    active: boolean;
    bidirectional: boolean;
  }[];
}

// Message object for signal animation
interface Message {
  id: string;
  sourceId: string;
  targetId: string;
  progress: number;
  speed: number;
  size: number;
  color: string;
}

// Communication node component
const CommNodeObject = ({ 
  node, 
  isActive, 
  isHovered, 
  setActiveNode, 
  setHoveredNode 
}: { 
  node: CommunicationNode; 
  isActive: boolean; 
  isHovered: boolean;
  setActiveNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Different geometry based on node type
  const NodeGeometry = () => {
    switch (node.type) {
      case 'device':
        return <boxGeometry args={[node.size, node.size * 1.5, node.size * 0.2]} />;
      case 'network':
        return <torusGeometry args={[node.size * 0.8, node.size * 0.2, 16, 32]} />;
      case 'server':
        return <cylinderGeometry args={[node.size * 0.6, node.size * 0.6, node.size * 1.5, 16]} />;
      case 'message':
        return <sphereGeometry args={[node.size * 0.7, 16, 16]} />;
      default:
        return <sphereGeometry args={[node.size, 16, 16]} />;
    }
  };
  
  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Float animation
      meshRef.current.position.y = node.position[1] + Math.sin(clock.getElapsedTime() * 0.5 + parseInt(node.id, 36)) * 0.05;
      
      // Type-based animations
      if (node.type === 'network') {
        meshRef.current.rotation.z += 0.005;
      } else if (isActive || isHovered) {
        meshRef.current.rotation.y += 0.01;
      }
    }
    
    // Glow effect
    if (glowRef.current) {
      if (isActive || isHovered) {
        glowRef.current.scale.set(
          1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.1,
          1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.1,
          1.5 + Math.sin(clock.getElapsedTime() * 2) * 0.1
        );
        
        // @ts-ignore - material typing
        glowRef.current.material.opacity = 0.2 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      } else {
        glowRef.current.scale.x = THREE.MathUtils.lerp(glowRef.current.scale.x, 1.2, 0.1);
        glowRef.current.scale.y = THREE.MathUtils.lerp(glowRef.current.scale.y, 1.2, 0.1);
        glowRef.current.scale.z = THREE.MathUtils.lerp(glowRef.current.scale.z, 1.2, 0.1);
        
        // @ts-ignore - material typing
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, 0.1, 0.1);
      }
    }
  });
  
  const handleClick = (e: React.MouseEvent<THREE.Object3D> & { stopPropagation: () => void }) => {
    e.stopPropagation();
    setActiveNode(isActive ? null : node.id);
  };
  
  const nodeColor = new THREE.Color(node.color);
  
  return (
    <group
      position={node.position}
      onPointerOver={() => setHoveredNode(node.id)}
      onPointerOut={() => setHoveredNode(null)}
      onClick={handleClick}
    >
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[node.size * 1.5, 16, 16]} />
        <meshBasicMaterial 
          color={nodeColor} 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </mesh>
      
      {/* Main node */}
      <mesh 
        ref={meshRef}
        castShadow
        receiveShadow
      >
        <NodeGeometry />
        <meshStandardMaterial 
          color={nodeColor} 
          emissive={nodeColor} 
          emissiveIntensity={isActive || isHovered ? 0.8 : 0.3} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Icon and label */}
      <Html position={[0, node.size * 1.5, 0]} center transform sprite>
        <div 
          className={`flex flex-col items-center px-2 py-1 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            isActive || isHovered ? 'scale-110 bg-white/10' : 'scale-100 bg-black/50'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <div className={`p-1 rounded-full mb-1 ${isActive || isHovered ? 'bg-white/20' : ''}`}>
            <node.icon className={`w-4 h-4 ${isActive || isHovered ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="text-xs font-semibold text-white whitespace-nowrap">{node.label}</div>
        </div>
      </Html>
      
      {/* Details tooltip */}
      {isActive && (
        <Html position={[0, -node.size * 2, 0]} center>
          <div className="bg-black/90 px-3 py-2 rounded-lg border border-white/10 text-white w-48">
            <div className="font-semibold mb-1">{node.label}</div>
            <div className="text-xs mb-1 text-gray-300">Type: {node.type}</div>
            <div className="text-xs text-gray-300">Connected to: {node.connections.length} {node.connections.length === 1 ? 'node' : 'nodes'}</div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Message animation component
const MessageSignal = ({ 
  message, 
  sourcePosition, 
  targetPosition,
  onComplete 
}: { 
  message: Message;
  sourcePosition: [number, number, number];
  targetPosition: [number, number, number];
  onComplete: (id: string) => void;
}) => {
  const ref = useRef<THREE.Mesh>(null);
  
  // Create curved path for message
  const curve = useMemo(() => {
    const start = new THREE.Vector3(...sourcePosition);
    const end = new THREE.Vector3(...targetPosition);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    
    // Add some height for a nice arc
    mid.y += 0.5;
    
    return new THREE.QuadraticBezierCurve3(start, mid, end);
  }, [sourcePosition, targetPosition]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!ref.current) return;
    
    // Update progress along curve
    message.progress += message.speed;
    
    if (message.progress >= 1) {
      onComplete(message.id);
      return;
    }
    
    // Get point on curve
    const point = curve.getPointAt(message.progress);
    
    // Update position
    ref.current.position.set(point.x, point.y, point.z);
    
    // Add some subtle movement
    ref.current.rotation.x += 0.05;
    ref.current.rotation.y += 0.05;
  });
  
  const color = new THREE.Color(message.color);
  
  return (
    <Trail
      width={5}
      length={5}
      color={message.color}
      attenuation={(t) => t * t}
    >
      <mesh ref={ref} position={sourcePosition}>
        <sphereGeometry args={[message.size, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </Trail>
  );
};

// Connection line component
const ConnectionLine = ({ 
  start, 
  end, 
  active
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  active: boolean;
}) => {
  const lineRef = useRef<THREE.Line>(null);
  
  // Create curved path
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    
    // Add some height to make arc
    midPoint.y += 0.3;
    
    const curve = new THREE.QuadraticBezierCurve3(
      startVec,
      midPoint,
      endVec
    );
    
    return curve.getPoints(10);
  }, [start, end]);
  
  // Animation
  useFrame(({ clock }) => {
    if (lineRef.current) {
      // Pulse the line
      // @ts-ignore - material typing
      lineRef.current.material.opacity = active ? 
        (0.5 + Math.sin(clock.getElapsedTime() * 3) * 0.2) : 
        0.2;
    }
  });
  
  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <float32BufferAttribute 
          attach="attributes-position" 
          args={[points.flatMap(p => [p.x, p.y, p.z]), 3]} 
        />
      </bufferGeometry>
      <lineBasicMaterial 
        color={active ? "#ef4444" : "#666666"} 
        transparent 
        opacity={active ? 0.7 : 0.2} 
        linewidth={1}
      />
    </line>
  );
};

// Main 3D scene
const CommunicationNetworkScene = ({ 
  activeNode,
  hoveredNode,
  setActiveNode,
  setHoveredNode
}: {
  activeNode: string | null;
  hoveredNode: string | null;
  setActiveNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
}) => {
  const { camera } = useThree();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageIdCounter = useRef(0);
  
  // Set up initial camera position
  React.useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Define communication nodes
  const commNodes: CommunicationNode[] = [
    {
      id: 'mobile',
      position: [-4, 0, 2],
      icon: Smartphone,
      label: 'Mobile Device',
      type: 'device',
      color: '#ef4444', // Red
      size: 0.8,
      connections: [
        { target: 'wifi', active: true, bidirectional: true },
        { target: 'cellular', active: true, bidirectional: true }
      ]
    },
    {
      id: 'desktop',
      position: [-3, 0, -2],
      icon: Globe,
      label: 'Desktop',
      type: 'device',
      color: '#3b82f6', // Blue
      size: 0.8,
      connections: [
        { target: 'wifi', active: true, bidirectional: true }
      ]
    },
    {
      id: 'phone',
      position: [-5, 0, -1],
      icon: Phone,
      label: 'Phone System',
      type: 'device',
      color: '#10b981', // Emerald
      size: 0.7,
      connections: [
        { target: 'voip', active: true, bidirectional: true }
      ]
    },
    {
      id: 'wifi',
      position: [-1, 1, 0],
      icon: Wifi,
      label: 'WiFi Network',
      type: 'network',
      color: '#f59e0b', // Amber
      size: 0.9,
      connections: [
        { target: 'router', active: true, bidirectional: true }
      ]
    },
    {
      id: 'cellular',
      position: [-2, 2, 2],
      icon: Signal,
      label: 'Cellular Network',
      type: 'network',
      color: '#8b5cf6', // Purple
      size: 0.85,
      connections: [
        { target: 'router', active: true, bidirectional: true }
      ]
    },
    {
      id: 'voip',
      position: [-3, 2, -2],
      icon: Radio,
      label: 'VoIP Gateway',
      type: 'network',
      color: '#ec4899', // Pink
      size: 0.8,
      connections: [
        { target: 'router', active: true, bidirectional: true }
      ]
    },
    {
      id: 'router',
      position: [0, 1, 0],
      icon: Server,
      label: 'Communication Hub',
      type: 'server',
      color: '#ef4444', // Red
      size: 1.0,
      connections: [
        { target: 'cloud', active: true, bidirectional: true },
        { target: 'email', active: true, bidirectional: false },
        { target: 'chat', active: true, bidirectional: false },
        { target: 'sms', active: true, bidirectional: false }
      ]
    },
    {
      id: 'cloud',
      position: [3, 3, 0],
      icon: Cloud,
      label: 'Cloud Services',
      type: 'server',
      color: '#0ea5e9', // Sky blue
      size: 1.2,
      connections: [
        { target: 'database', active: true, bidirectional: false }
      ]
    },
    {
      id: 'database',
      position: [5, 1, 0],
      icon: Server,
      label: 'Database',
      type: 'server',
      color: '#6366f1', // Indigo
      size: 0.9,
      connections: []
    },
    {
      id: 'email',
      position: [2, 0, 2],
      icon: Mail,
      label: 'Email Service',
      type: 'message',
      color: '#f59e0b', // Amber
      size: 0.7,
      connections: [
        { target: 'client', active: true, bidirectional: false }
      ]
    },
    {
      id: 'chat',
      position: [2, -1, 0],
      icon: MessageSquare,
      label: 'Chat Service',
      type: 'message',
      color: '#10b981', // Emerald
      size: 0.7,
      connections: [
        { target: 'client', active: true, bidirectional: false }
      ]
    },
    {
      id: 'sms',
      position: [2, 0, -2],
      icon: Phone,
      label: 'SMS Service',
      type: 'message',
      color: '#3b82f6', // Blue
      size: 0.7,
      connections: [
        { target: 'client', active: true, bidirectional: false }
      ]
    },
    {
      id: 'client',
      position: [5, -2, 0],
      icon: User,
      label: 'Client',
      type: 'device',
      color: '#8b5cf6', // Purple
      size: 0.9,
      connections: []
    }
  ];
  
  // Find a node by ID
  const getNodeById = (id: string) => commNodes.find(node => node.id === id);
  
  // Get node position by ID
  const getNodePosition = (id: string): [number, number, number] => {
    const node = getNodeById(id);
    return node ? node.position : [0, 0, 0];
  };
  
  // Check if a connection should be active
  const isConnectionActive = (fromId: string, toId: string): boolean => {
    return (activeNode === fromId || activeNode === toId || 
            hoveredNode === fromId || hoveredNode === toId);
  };
  
  // Add a new message to the animation
  const addMessage = (sourceId: string, targetId: string) => {
    const message: Message = {
      id: `msg_${messageIdCounter.current++}`,
      sourceId,
      targetId,
      progress: 0,
      speed: 0.01 + Math.random() * 0.01,
      size: 0.1 + Math.random() * 0.1,
      color: getNodeById(sourceId)?.color || '#ffffff'
    };
    
    setMessages(prevMessages => [...prevMessages, message]);
  };
  
  // Remove a message when it reaches its destination
  const removeMessage = (id: string) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  };
  
  // Generate messages periodically
  useFrame(({ clock }) => {
    // Only generate messages when there aren't too many
    if (messages.length > 20) return;
    
    // Generate a message every 2 seconds on average
    if (Math.random() < 0.01) {
      // Find a source and target node for the message
      const allConnections = commNodes.flatMap(node => 
        node.connections.map(conn => ({ 
          source: node.id, 
          target: conn.target 
        }))
      );
      
      // Prioritize connections involving active nodes
      const priorityConnections = allConnections.filter(
        conn => conn.source === activeNode || conn.target === activeNode
      );
      
      const connectionPool = priorityConnections.length > 0 ? 
        priorityConnections : allConnections;
      
      if (connectionPool.length > 0) {
        const randomConnection = connectionPool[Math.floor(Math.random() * connectionPool.length)];
        addMessage(randomConnection.source, randomConnection.target);
      }
    }
  });
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ef4444" />
      
      {/* Background elements */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Grid */}
      <gridHelper args={[30, 30, '#333333', '#222222']} position={[0, -0.9, 0]} />
      
      {/* Connection lines */}
      {commNodes.map(node => 
        node.connections.map(connection => (
          <ConnectionLine
            key={`${node.id}-${connection.target}`}
            start={getNodePosition(node.id)}
            end={getNodePosition(connection.target)}
            active={isConnectionActive(node.id, connection.target) || connection.active}
          />
        ))
      )}
      
      {/* Message signals */}
      {messages.map(message => (
        <MessageSignal
          key={message.id}
          message={message}
          sourcePosition={getNodePosition(message.sourceId)}
          targetPosition={getNodePosition(message.targetId)}
          onComplete={removeMessage}
        />
      ))}
      
      {/* Communication nodes */}
      {commNodes.map(node => (
        <CommNodeObject
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          isHovered={hoveredNode === node.id}
          setActiveNode={setActiveNode}
          setHoveredNode={setHoveredNode}
        />
      ))}
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={0.5} />
      </EffectComposer>
    </>
  );
};

// Visibility detection hook
const useIsVisible = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

// Fallback UI for when 3D rendering fails
const CommunicationNetworkFallback = () => {
  // Define key components to display in fallback
  const keyComponents = [
    { name: 'Mobile Device', type: 'device', icon: Smartphone, color: '#ef4444', description: 'Smartphones and tablets' },
    { name: 'WiFi Network', type: 'network', icon: Wifi, color: '#f59e0b', description: 'Wireless connectivity' },
    { name: 'Communication Hub', type: 'server', icon: Server, color: '#ef4444', description: 'Central routing system' },
    { name: 'Email Service', type: 'message', icon: Mail, color: '#f59e0b', description: 'Email delivery system' },
    { name: 'Chat Service', type: 'message', icon: MessageSquare, color: '#10b981', description: 'Real-time messaging' },
    { name: 'Cloud Services', type: 'server', icon: Cloud, color: '#0ea5e9', description: 'Hosted applications' }
  ];
  
  return (
    <div className="bg-black/30 p-6 rounded-lg backdrop-blur-md border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Communication Network</h3>
      <p className="text-gray-300 text-sm mb-6">Integrated communication system overview</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {keyComponents.map((component, index) => (
          <div 
            key={index} 
            className="bg-white/5 p-4 rounded-lg border border-white/10"
            style={{ borderLeftColor: component.color, borderLeftWidth: '3px' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${component.color}20` }}>
                <component.icon className="w-4 h-4" style={{ color: component.color }} />
              </div>
              <div className="font-semibold">{component.name}</div>
            </div>
            <p className="text-sm text-gray-400">{component.description}</p>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-red-500">4</div>
          <div className="text-xs text-gray-400">Channels</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-blue-500">99.9%</div>
          <div className="text-xs text-gray-400">Uptime</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-green-500">&lt; 5ms</div>
          <div className="text-xs text-gray-400">Latency</div>
        </div>
        <div className="text-center p-2 bg-white/5 rounded-lg">
          <div className="text-lg font-bold text-amber-500">24/7</div>
          <div className="text-xs text-gray-400">Support</div>
        </div>
      </div>
    </div>
  );
};

// Main component
const CommunicationNetwork3D = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
    >
      <AnimationErrorBoundary fallback={<CommunicationNetworkFallback />}>
        {isVisible && (
          <Canvas 
            camera={{ position: [0, 5, 10], fov: 50 }}
            shadows
          >
            <CommunicationNetworkScene 
              activeNode={activeNode} 
              hoveredNode={hoveredNode}
              setActiveNode={setActiveNode}
              setHoveredNode={setHoveredNode}
            />
          </Canvas>
        )}
      </AnimationErrorBoundary>
      
      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-4">
        <h3 className="text-xl font-bold text-white mb-2">Communication Network</h3>
        <p className="text-gray-300 text-sm mb-4">Interactive visualization of our integrated communication system</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg font-bold text-red-500">4</div>
            <div className="text-xs text-gray-400">Channels</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg font-bold text-blue-500">99.9%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg font-bold text-green-500">&lt; 5ms</div>
            <div className="text-xs text-gray-400">Latency</div>
          </div>
          <div className="text-center p-2 bg-white/5 rounded-lg">
            <div className="text-lg font-bold text-amber-500">24/7</div>
            <div className="text-xs text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationNetwork3D;