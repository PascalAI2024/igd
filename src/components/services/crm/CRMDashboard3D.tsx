import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, useHelper } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MessageSquare, Calendar, Mail, Phone,
  BarChart2, Settings, Database, Bell, FileText,
  TrendingUp, LucideIcon
} from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../../../components/AnimationErrorBoundary';

interface Node {
  id: string;
  position: [number, number, number];
  icon: LucideIcon;
  label: string;
  value: string;
  trend: string;
  color: string;
}

interface Connection {
  from: string;
  to: string;
  active: boolean;
}

// Node Component
const NodeObject = ({ 
  node, 
  isActive, 
  isHovered, 
  setActiveNode, 
  setHoveredNode 
}: { 
  node: Node; 
  isActive: boolean; 
  isHovered: boolean;
  setActiveNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Animation
  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Float animation
      meshRef.current.position.y = node.position[1] + Math.sin(clock.getElapsedTime() * 0.5 + parseInt(node.id, 36)) * 0.05;
      
      // Rotation when active
      if (isActive || isHovered) {
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
  
  const handleClick = (e: THREE.Event) => {
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
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial 
          color={nodeColor} 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </mesh>
      
      {/* Main node */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.2, 1]} />
        <meshStandardMaterial 
          color={nodeColor} 
          emissive={nodeColor} 
          emissiveIntensity={isActive || isHovered ? 0.8 : 0.3} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Icon and label */}
      <Html position={[0, 0.4, 0]} center transform sprite>
        <div 
          className={`flex flex-col items-center px-2 py-1 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            isActive || isHovered ? 'scale-110 bg-white/10' : 'scale-100 bg-black/50'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <div className={`p-1 rounded-full mb-1 ${isActive || isHovered ? `bg-${node.color}/20` : ''}`}>
            <node.icon className={`w-4 h-4 ${isActive || isHovered ? 'text-' + node.color.split('#')[1] : 'text-white'}`} />
          </div>
          <div className="text-xs font-semibold text-white whitespace-nowrap">{node.label}</div>
        </div>
      </Html>
      
      {/* Details tooltip */}
      {isActive && (
        <Html position={[0, -0.4, 0]} center>
          <div className="bg-black/90 px-3 py-2 rounded-lg border border-white/10 text-white w-40">
            <div className="font-semibold mb-1">{node.label}</div>
            <div className="text-xs mb-1">{node.value}</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{node.trend}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Connection Line Component
const ConnectionLine = ({ 
  start, 
  end, 
  color, 
  isActive 
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  color: string; 
  isActive: boolean;
}) => {
  const ref = useRef<THREE.Line>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 5;
  const particlePositions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  
  // Create points for curved line
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    
    // Add some height to mid point for curve
    midPoint.y += 0.5;
    
    const curve = new THREE.QuadraticBezierCurve3(
      startVec,
      midPoint,
      endVec
    );
    
    return curve.getPoints(10);
  }, [start, end]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!isActive || !pointsRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Move particles along the connection line
    for (let i = 0; i < particleCount; i++) {
      const t = ((time * 0.1) + (i / particleCount)) % 1;
      const idx = i * 3;
      
      const point = points[Math.floor(t * points.length)];
      positions[idx] = point.x;
      positions[idx + 1] = point.y;
      positions[idx + 2] = point.z;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Pulse the line
    if (ref.current) {
      // @ts-ignore - material typing
      ref.current.material.opacity = 0.5 + Math.sin(time * 3) * 0.2;
    }
  });
  
  return (
    <group>
      {/* Connection line */}
      <line ref={ref}>
        <bufferGeometry>
          <float32BufferAttribute 
            attach="attributes-position" 
            args={[points.flatMap(p => [p.x, p.y, p.z]), 3]} 
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={isActive ? 0.7 : 0.2} 
          linewidth={1}
        />
      </line>
      
      {/* Moving particles */}
      {isActive && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              count={particleCount}
              array={particlePositions.current}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            color={color} 
            size={0.1} 
            sizeAttenuation={true}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </group>
  );
};

// Main Scene Component
const NetworkScene = ({ 
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
  
  // Set up initial camera position
  React.useEffect(() => {
    camera.position.set(0, 2, 7);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Node configuration
  const nodes: Node[] = [
    { id: 'contacts', position: [-2.5, 0, 0], icon: Users, label: 'Contacts', value: '2,500+', trend: '+15%', color: '#ef4444' },
    { id: 'communication', position: [2.5, 0, 0], icon: MessageSquare, label: 'Communication', value: '500/day', trend: '+25%', color: '#3b82f6' },
    { id: 'calendar', position: [0, 1.5, 0], icon: Calendar, label: 'Calendar', value: '95% Booked', trend: '+30%', color: '#f59e0b' },
    { id: 'email', position: [3.0, 1.0, 0], icon: Mail, label: 'Email', value: '98% Open Rate', trend: '+20%', color: '#8b5cf6' },
    { id: 'calls', position: [-3.0, 1.0, 0], icon: Phone, label: 'Calls', value: '200/day', trend: '+40%', color: '#ec4899' },
    { id: 'analytics', position: [0, -2.0, 0], icon: BarChart2, label: 'Analytics', value: 'Real-time', trend: 'Live', color: '#10b981' },
    { id: 'automation', position: [0, 0, 0], icon: Settings, label: 'Automation', value: '50+ Workflows', trend: '+35%', color: '#f97316' },
    { id: 'database', position: [-2.0, -1.5, 0], icon: Database, label: 'Database', value: '99.9% Uptime', trend: '+0.5%', color: '#6366f1' },
    { id: 'notifications', position: [2.0, -1.5, 0], icon: Bell, label: 'Notifications', value: 'Instant', trend: '-50ms', color: '#14b8a6' },
    { id: 'documents', position: [-1.0, -1.0, 0], icon: FileText, label: 'Documents', value: '10K+', trend: '+45%', color: '#a855f7' }
  ];
  
  // Connection configuration
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
  
  // Get node position by ID
  const getNodePosition = (id: string): [number, number, number] => {
    const node = nodes.find(n => n.id === id);
    return node ? node.position : [0, 0, 0];
  };
  
  // Get node color by ID
  const getNodeColor = (id: string): string => {
    const node = nodes.find(n => n.id === id);
    return node ? node.color : '#ffffff';
  };
  
  // Check if connection is active
  const isConnectionActive = (connection: Connection): boolean => {
    return connection.active || 
      [connection.from, connection.to].includes(activeNode || '') ||
      [connection.from, connection.to].includes(hoveredNode || '');
  };
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ef4444" />
      
      {/* Background elements */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.3}
          emissive="#222222"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Grid */}
      <gridHelper args={[20, 40, '#333333', '#222222']} position={[0, -2.9, 0]} />
      
      {/* Connection lines */}
      {connections.map((connection, index) => (
        <ConnectionLine
          key={`${connection.from}-${connection.to}`}
          start={getNodePosition(connection.from)}
          end={getNodePosition(connection.to)}
          color={getNodeColor(connection.from)}
          isActive={isConnectionActive(connection)}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map((node) => (
        <NodeObject
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          isHovered={hoveredNode === node.id}
          setActiveNode={setActiveNode}
          setHoveredNode={setHoveredNode}
        />
      ))}
      
      {/* Central Hub */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial 
          color="#ef4444" 
          emissive="#ef4444"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
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
const CRMDashboardFallback = () => {
  // Define the nodes we want to display in the fallback
  const keyCRMComponents = [
    { id: 'contacts', icon: Users, label: 'Contacts', value: '2,500+', trend: '+15%', color: '#ef4444' },
    { id: 'automation', icon: Settings, label: 'Automation', value: '50+ Workflows', trend: '+35%', color: '#f97316' },
    { id: 'communication', icon: MessageSquare, label: 'Communication', value: '500/day', trend: '+25%', color: '#3b82f6' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics', value: 'Real-time', trend: 'Live', color: '#10b981' },
    { id: 'database', icon: Database, label: 'Database', value: '99.9% Uptime', trend: '+0.5%', color: '#6366f1' }
  ];
  
  return (
    <div className="bg-black/30 p-6 rounded-lg backdrop-blur-md border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">CRM System Overview</h3>
      <p className="text-gray-300 text-sm mb-6">Core components of our comprehensive CRM solution:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {keyCRMComponents.map((component) => {
          const Component = component.icon;
          return (
            <div 
              key={component.id} 
              className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all"
              style={{ borderLeftColor: component.color, borderLeftWidth: '3px' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${component.color}30` }}>
                  <Component className="w-5 h-5" style={{ color: component.color }} />
                </div>
                <div>
                  <h4 className="font-semibold">{component.label}</h4>
                  <div className="text-sm text-gray-400">{component.id}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold">{component.value}</div>
                <div className="flex items-center text-green-500 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>{component.trend}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        3D visualization unavailable. Showing simplified CRM dashboard overview.
      </div>
    </div>
  );
};

// Main component
const CRMDashboard3D = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
    >
      <AnimationErrorBoundary fallback={<CRMDashboardFallback />}>
        {isVisible && (
          <Canvas 
            camera={{ position: [0, 2, 7], fov: 50 }}
            shadows
          >
            <NetworkScene 
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
        <h3 className="text-xl font-bold text-white mb-2">CRM System Overview</h3>
        <p className="text-gray-300 text-sm mb-4">Visualizing the interconnected modules of our comprehensive CRM solution.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {['contacts', 'automation', 'communication', 'analytics', 'database'].map((nodeId) => (
            <button 
              key={nodeId}
              onClick={() => setActiveNode(activeNode === nodeId ? null : nodeId)}
              className={`px-2 py-1 text-xs rounded-lg transition-all duration-300 ${
                activeNode === nodeId 
                  ? 'bg-red-500/20 text-white border border-red-500/30' 
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              {nodeId.charAt(0).toUpperCase() + nodeId.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CRMDashboard3D;