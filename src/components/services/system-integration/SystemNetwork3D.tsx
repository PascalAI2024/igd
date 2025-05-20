import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, Server, Laptop, Cloud, 
  ArrowRight, Globe, Smartphone, Shield,
  Clock, AlertCircle
} from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../../../components/AnimationErrorBoundary';

interface SystemNode {
  id: string;
  position: [number, number, number];
  title: string;
  icon: React.FC;
  type: 'legacy' | 'cloud' | 'mobile' | 'middleware' | 'security';
  connections: string[];
  description: string;
  features: string[];
  color: string;
  size: number;
}

// System node component
const SystemNodeObject = ({ 
  node, 
  isActive, 
  isHovered, 
  setActiveNode, 
  setHoveredNode,
  isHighlighted
}: { 
  node: SystemNode; 
  isActive: boolean; 
  isHovered: boolean;
  isHighlighted: boolean;
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
      
      // Rotation
      if (isActive || isHovered) {
        meshRef.current.rotation.y += 0.01;
      } else {
        meshRef.current.rotation.y += 0.002;
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
        glowRef.current.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
      } else if (isHighlighted) {
        glowRef.current.scale.x = THREE.MathUtils.lerp(glowRef.current.scale.x, 1.3, 0.1);
        glowRef.current.scale.y = THREE.MathUtils.lerp(glowRef.current.scale.y, 1.3, 0.1);
        glowRef.current.scale.z = THREE.MathUtils.lerp(glowRef.current.scale.z, 1.3, 0.1);
        
        // @ts-ignore - material typing
        glowRef.current.material.opacity = THREE.MathUtils.lerp(glowRef.current.material.opacity, 0.2, 0.1);
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
  
  // Different geometries for different system types
  const NodeGeometry = () => {
    switch (node.type) {
      case 'legacy':
        return <boxGeometry args={[node.size, node.size, node.size]} />;
      case 'cloud':
        return <sphereGeometry args={[node.size * 0.7, 16, 16]} />;
      case 'mobile':
        return <coneGeometry args={[node.size * 0.6, node.size * 1.2, 8]} />;
      case 'middleware':
        return <cylinderGeometry args={[node.size * 0.6, node.size * 0.6, node.size, 16]} />;
      case 'security':
        return <dodecahedronGeometry args={[node.size * 0.6, 0]} />;
      default:
        return <boxGeometry args={[node.size, node.size, node.size]} />;
    }
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
          emissiveIntensity={isActive || isHovered || isHighlighted ? 0.8 : 0.3} 
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Icon and label */}
      <Html position={[0, node.size * 1.5, 0]} center transform>
        <div 
          className={`flex flex-col items-center px-2 py-1 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            isActive || isHovered || isHighlighted ? 'scale-110 bg-white/10' : 'scale-100 bg-black/50'
          }`}
          style={{ pointerEvents: 'none' }}
        >
          <div className={`p-1 rounded-full mb-1 ${isActive || isHovered ? 'bg-white/20' : ''}`}>
            <node.icon className={`w-4 h-4 ${isActive || isHovered ? 'text-white' : 'text-gray-400'}`} />
          </div>
          <div className="text-xs font-semibold text-white whitespace-nowrap">{node.title}</div>
        </div>
      </Html>
      
      {/* Details tooltip */}
      {isActive && (
        <Html position={[0, -node.size * 2, 0]} center>
          <div className="bg-black/90 px-3 py-2 rounded-lg border border-white/10 text-white w-64">
            <div className="font-semibold mb-2">{node.title}</div>
            <div className="text-xs mb-3 text-gray-300">{node.description}</div>
            <div className="text-xs font-semibold mb-1">Key Features:</div>
            <ul className="text-xs space-y-1">
              {node.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <ArrowRight className="w-3 h-3 text-red-500 mt-0.5 mr-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
};

// Connection line component
const SystemConnection = ({ 
  start, 
  end, 
  active,
  animated = false
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  active: boolean;
  animated?: boolean;
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 5;
  const particlePositions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  
  // Create curved path
  const points = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const endVec = new THREE.Vector3(...end);
    const midPoint = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
    
    // Add some height to make arc
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
    if (!animated || !active || !particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Move particles along the connection line
    for (let i = 0; i < particleCount; i++) {
      const t = ((time * 0.3) + (i / particleCount)) % 1;
      const idx = i * 3;
      
      const point = points[Math.min(Math.floor(t * points.length), points.length - 1)];
      positions[idx] = point.x;
      positions[idx + 1] = point.y;
      positions[idx + 2] = point.z;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Pulse the line
    if (lineRef.current) {
      // @ts-ignore - material typing
      lineRef.current.material.opacity = 0.5 + Math.sin(time * 3) * 0.2;
    }
  });
  
  return (
    <group>
      {/* Connection line */}
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
      
      {/* Moving particles for data flow */}
      {animated && active && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute 
              attach="attributes-position" 
              count={particleCount}
              array={particlePositions.current}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            color="#ef4444" 
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

// Main 3D scene
const IntegrationScene = ({ 
  activeNode,
  hoveredNode,
  activeType,
  setActiveNode,
  setHoveredNode
}: {
  activeNode: string | null;
  hoveredNode: string | null;
  activeType: string | null;
  setActiveNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
}) => {
  const { camera } = useThree();
  
  // Set up initial camera position
  React.useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Define system nodes
  const systemNodes: SystemNode[] = [
    {
      id: 'legacy_db',
      position: [-5, 0, 0],
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
      size: 0.8
    },
    {
      id: 'legacy_app',
      position: [-4, -2, 2],
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
      size: 0.7
    },
    {
      id: 'middleware_api',
      position: [0, 0, 0],
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
      size: 1.0
    },
    {
      id: 'middleware_etl',
      position: [-2, 2, 1],
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
      color: '#f59e0b', // Amber
      size: 0.6
    },
    {
      id: 'cloud_storage',
      position: [3, 3, -1],
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
      size: 0.8
    },
    {
      id: 'cloud_app',
      position: [4, 0, 0],
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
      size: 0.9
    },
    {
      id: 'mobile_app',
      position: [2, -2, 2],
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
      size: 0.7
    },
    {
      id: 'security',
      position: [0, -3, -1],
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
      size: 0.75
    },
    {
      id: 'monitoring',
      position: [5, -3, -2],
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
      size: 0.7
    }
  ];
  
  // Find a node by ID
  const getNodeById = (id: string) => systemNodes.find(node => node.id === id);
  
  // Get node position by ID
  const getNodePosition = (id: string): [number, number, number] => {
    const node = getNodeById(id);
    return node ? node.position : [0, 0, 0];
  };
  
  // Check if a connection should be active based on selected nodes
  const isConnectionActive = (fromId: string, toId: string): boolean => {
    return (activeNode === fromId || activeNode === toId || 
            hoveredNode === fromId || hoveredNode === toId);
  };
  
  // Check if a node should be highlighted based on selected type
  const isNodeHighlighted = (node: SystemNode): boolean => {
    return activeType === node.type;
  };
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ef4444" />
      
      {/* Background elements */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Grid */}
      <gridHelper args={[40, 40, '#333333', '#222222']} position={[0, -4.9, 0]} />
      
      {/* Connection lines */}
      {systemNodes.map(node => 
        node.connections.map(targetId => (
          <SystemConnection
            key={`${node.id}-${targetId}`}
            start={getNodePosition(node.id)}
            end={getNodePosition(targetId)}
            active={isConnectionActive(node.id, targetId)}
            animated={activeNode === node.id || hoveredNode === node.id}
          />
        ))
      )}
      
      {/* System nodes */}
      {systemNodes.map(node => (
        <SystemNodeObject
          key={node.id}
          node={node}
          isActive={activeNode === node.id}
          isHovered={hoveredNode === node.id}
          isHighlighted={isNodeHighlighted(node)}
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
const SystemNetworkFallback = () => {
  const systemTypes = [
    { id: 'legacy', label: 'Legacy Systems', icon: Database, color: '#3b82f6' },
    { id: 'middleware', label: 'Middleware', icon: ArrowRight, color: '#ef4444' },
    { id: 'cloud', label: 'Cloud Services', icon: Cloud, color: '#10b981' },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone, color: '#ec4899' },
    { id: 'security', label: 'Security', icon: Shield, color: '#6366f1' }
  ];
  
  // Primary components to display
  const keyComponents = [
    { name: 'API Gateway', type: 'middleware', description: 'Central hub for API management, routing, and transformation' },
    { name: 'Legacy Database', type: 'legacy', description: 'Your existing database systems that store critical business data' },
    { name: 'Cloud Applications', type: 'cloud', description: 'Modern cloud-native applications and services' },
    { name: 'Security Layer', type: 'security', description: 'Comprehensive security measures for your integrated systems' },
    { name: 'Mobile Applications', type: 'mobile', description: 'Native and web-based mobile applications' }
  ];
  
  return (
    <div className="bg-black/30 p-6 rounded-lg backdrop-blur-md border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">System Integration Network</h3>
      <p className="text-gray-300 text-sm mb-6">Visualization of your interconnected systems</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {systemTypes.map((type) => {
          const TypeIcon = type.icon;
          return (
            <div 
              key={type.id} 
              className="px-3 py-1 text-xs rounded-lg flex items-center gap-1 bg-white/5 border border-white/10"
              style={{ borderLeftColor: type.color, borderLeftWidth: '3px' }}
            >
              <TypeIcon className="w-3 h-3" style={{ color: type.color }} />
              <span>{type.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {keyComponents.map((component, index) => {
          const systemType = systemTypes.find(type => type.id === component.type);
          const TypeIcon = systemType?.icon || Database;
          return (
            <div 
              key={index} 
              className="bg-white/5 p-4 rounded-lg border border-white/10"
              style={{ borderLeftColor: systemType?.color, borderLeftWidth: '3px' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg" style={{ backgroundColor: `${systemType?.color}20` }}>
                  <TypeIcon className="w-4 h-4" style={{ color: systemType?.color }} />
                </div>
                <div className="font-semibold">{component.name}</div>
              </div>
              <p className="text-sm text-gray-400">{component.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        3D visualization unavailable. Showing simplified system integration overview.
      </div>
    </div>
  );
};

// Main component
const SystemNetwork3D = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  
  const systemTypes = [
    { id: 'legacy', label: 'Legacy Systems', icon: Database },
    { id: 'middleware', label: 'Middleware', icon: ArrowRight },
    { id: 'cloud', label: 'Cloud Services', icon: Cloud },
    { id: 'mobile', label: 'Mobile Apps', icon: Smartphone },
    { id: 'security', label: 'Security', icon: Shield }
  ];
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
    >
      <AnimationErrorBoundary fallback={<SystemNetworkFallback />}>
        {isVisible && (
          <Canvas 
            camera={{ position: [0, 5, 10], fov: 50 }}
            shadows
          >
            <IntegrationScene 
              activeNode={activeNode} 
              hoveredNode={hoveredNode}
              activeType={activeType}
              setActiveNode={setActiveNode}
              setHoveredNode={setHoveredNode}
            />
          </Canvas>
        )}
      </AnimationErrorBoundary>
      
      {/* Info Panel */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm border border-white/10 rounded-lg p-4">
        <h3 className="text-xl font-bold text-white mb-2">System Integration Network</h3>
        <p className="text-gray-300 text-sm mb-4">Visualizing the interconnected systems in your digital ecosystem</p>
        
        <div className="flex flex-wrap gap-2">
          {systemTypes.map(type => (
            <button 
              key={type.id}
              onClick={() => setActiveType(activeType === type.id ? null : type.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 flex items-center ${
                activeType === type.id 
                  ? 'bg-red-500/20 text-white border border-red-500/30' 
                  : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
              }`}
            >
              <type.icon className="w-3 h-3 mr-1" />
              {type.label}
            </button>
          ))}
          
          <button 
            onClick={() => {
              setActiveType(null);
              setActiveNode(null);
            }}
            className="px-3 py-1 text-xs rounded-lg transition-all duration-300 bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10"
          >
            Reset View
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemNetwork3D;