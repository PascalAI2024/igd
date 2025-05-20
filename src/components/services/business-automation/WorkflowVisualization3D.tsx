import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Trail, useGLTF, Line } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Database, Users, ChevronRight, CheckCircle, 
  Mail, FileText, Clock, Calculator, Settings
} from 'lucide-react';
import * as THREE from 'three';
import { AnimationErrorBoundary } from '../../../components/AnimationErrorBoundary';

interface WorkflowNode {
  id: string;
  position: [number, number, number];
  title: string;
  icon: React.FC;
  type: 'trigger' | 'action' | 'condition' | 'data';
  details: string;
  next: string[];
}

// Workflow node component
const WorkflowNodeObject = ({ 
  node, 
  isActive, 
  isHovered, 
  setActiveNode, 
  setHoveredNode 
}: { 
  node: WorkflowNode; 
  isActive: boolean; 
  isHovered: boolean;
  setActiveNode: (id: string | null) => void;
  setHoveredNode: (id: string | null) => void;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  
  // Different colors for different node types
  const getNodeColor = () => {
    switch (node.type) {
      case 'trigger': return '#ef4444'; // Red
      case 'action': return '#3b82f6';  // Blue
      case 'condition': return '#f59e0b'; // Amber
      case 'data': return '#8b5cf6';  // Purple
      default: return '#ffffff';
    }
  };
  
  // Different shapes for different node types
  const NodeGeometry = () => {
    switch (node.type) {
      case 'trigger':
        return <octahedronGeometry args={[0.3, 0]} />;
      case 'action':
        return <boxGeometry args={[0.4, 0.4, 0.4]} />;
      case 'condition':
        return <tetrahedronGeometry args={[0.4, 0]} />;
      case 'data':
        return <cylinderGeometry args={[0.25, 0.25, 0.4, 16]} />;
      default:
        return <sphereGeometry args={[0.3, 16, 16]} />;
    }
  };
  
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
  
  const nodeColor = new THREE.Color(getNodeColor());
  
  return (
    <group
      position={node.position}
      onPointerOver={() => setHoveredNode(node.id)}
      onPointerOut={() => setHoveredNode(null)}
      onClick={handleClick}
    >
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial 
          color={nodeColor} 
          transparent 
          opacity={0.1} 
          side={THREE.BackSide} 
        />
      </mesh>
      
      {/* Main node */}
      <mesh ref={meshRef}>
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
      <Html position={[0, 0.6, 0]} center transform sprite>
        <div 
          className={`flex flex-col items-center px-2 py-1 rounded-lg backdrop-blur-sm transition-all duration-300 ${
            isActive || isHovered ? 'scale-110 bg-white/10' : 'scale-100 bg-black/50'
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
        <Html position={[0, -0.6, 0]} center>
          <div className="bg-black/90 px-3 py-2 rounded-lg border border-white/10 text-white w-48">
            <div className="font-semibold mb-1">{node.title}</div>
            <div className="text-xs mb-1">{node.details}</div>
            <div className="text-xs text-gray-400">
              Type: <span className="text-white">{node.type.charAt(0).toUpperCase() + node.type.slice(1)}</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Connection line with animated flow
const WorkflowConnection = ({ 
  start, 
  end, 
  active
}: { 
  start: [number, number, number]; 
  end: [number, number, number]; 
  active: boolean;
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 5;
  const particlePositions = useRef<Float32Array>(new Float32Array(particleCount * 3));
  
  // Calculate midpoint with vertical offset for curve
  const mid = useMemo(() => {
    const midX = (start[0] + end[0]) / 2;
    const midY = ((start[1] + end[1]) / 2) + 0.5;
    const midZ = (start[2] + end[2]) / 2;
    return [midX, midY, midZ] as [number, number, number];
  }, [start, end]);
  
  // Create a curved path using quadratic bezier curve
  const curve = useMemo(() => {
    const startVec = new THREE.Vector3(...start);
    const midVec = new THREE.Vector3(...mid);
    const endVec = new THREE.Vector3(...end);
    
    return new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
  }, [start, mid, end]);
  
  // Generate points along the curve
  const points = useMemo(() => curve.getPoints(20), [curve]);
  
  // Animation
  useFrame(({ clock }) => {
    if (!active || !particlesRef.current) return;
    
    const time = clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    
    // Move particles along the connection line
    for (let i = 0; i < particleCount; i++) {
      const t = ((time * 0.2) + (i / particleCount)) % 1;
      const idx = i * 3;
      
      const point = curve.getPointAt(t);
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
      {/* Curved connection line */}
      <Line
        ref={lineRef as any}
        points={points}
        color={active ? "#ef4444" : "#666666"}
        lineWidth={active ? 2 : 1}
        transparent
        opacity={active ? 0.8 : 0.3}
      />
      
      {/* Moving particles */}
      {active && (
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
const WorkflowScene = ({ 
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
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);
  
  // Define workflow nodes
  const workflowNodes: WorkflowNode[] = [
    {
      id: 'form_submission',
      position: [-4, 2, 0],
      title: 'Form Submission',
      icon: FileText,
      type: 'trigger',
      details: 'Customer submits a web form',
      next: ['validate_data']
    },
    {
      id: 'email_received',
      position: [-2, 3, 0],
      title: 'Email Received',
      icon: Mail,
      type: 'trigger',
      details: 'Email received from customer',
      next: ['validate_data']
    },
    {
      id: 'scheduled_task',
      position: [0, 4, 0],
      title: 'Scheduled Task',
      icon: Clock,
      type: 'trigger',
      details: 'Timer-based automated task',
      next: ['fetch_customer_data']
    },
    {
      id: 'validate_data',
      position: [-2, 0, 0],
      title: 'Validate Data',
      icon: CheckCircle,
      type: 'condition',
      details: 'Verify input data meets requirements',
      next: ['fetch_customer_data', 'send_error']
    },
    {
      id: 'send_error',
      position: [-4, -2, 0],
      title: 'Send Error',
      icon: Mail,
      type: 'action',
      details: 'Send error notification to customer',
      next: []
    },
    {
      id: 'fetch_customer_data',
      position: [0, 0, 0],
      title: 'Fetch Customer Data',
      icon: Database,
      type: 'data',
      details: 'Retrieve customer information from CRM',
      next: ['process_data']
    },
    {
      id: 'process_data',
      position: [2, 0, 0],
      title: 'Process Data',
      icon: Calculator,
      type: 'action',
      details: 'Perform calculations and transformations',
      next: ['update_database', 'send_confirmation']
    },
    {
      id: 'update_database',
      position: [4, -1, 0],
      title: 'Update Database',
      icon: Database,
      type: 'data',
      details: 'Store processed information in database',
      next: ['notify_team']
    },
    {
      id: 'send_confirmation',
      position: [2, -2, 0],
      title: 'Send Confirmation',
      icon: Mail,
      type: 'action',
      details: 'Send confirmation email to customer',
      next: []
    },
    {
      id: 'notify_team',
      position: [0, -3, 0],
      title: 'Notify Team',
      icon: Users,
      type: 'action',
      details: 'Send notification to appropriate team',
      next: []
    }
  ];
  
  // Find a node by ID
  const getNodeById = (id: string) => workflowNodes.find(node => node.id === id);
  
  // Get node position by ID
  const getNodePosition = (id: string): [number, number, number] => {
    const node = getNodeById(id);
    return node ? node.position : [0, 0, 0];
  };
  
  // Check if a connection should be active
  const isConnectionActive = (fromId: string, toId: string): boolean => {
    return activeNode === fromId || activeNode === toId || 
           hoveredNode === fromId || hoveredNode === toId;
  };
  
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <pointLight position={[-5, 5, -5]} intensity={0.3} color="#ef4444" />
      
      {/* Background elements */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial 
          color="#111111" 
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>
      
      {/* Grid */}
      <gridHelper args={[30, 30, '#333333', '#222222']} position={[0, -0.99, 0]} />
      
      {/* Connection lines */}
      {workflowNodes.map(node => 
        node.next.map(nextId => (
          <WorkflowConnection
            key={`${node.id}-${nextId}`}
            start={getNodePosition(node.id)}
            end={getNodePosition(nextId)}
            active={isConnectionActive(node.id, nextId)}
          />
        ))
      )}
      
      {/* Workflow nodes */}
      {workflowNodes.map(node => (
        <WorkflowNodeObject
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
const WorkflowVisualizationFallback = () => {
  const nodeTypes = [
    { type: 'trigger', color: '#ef4444', icon: Zap, label: 'Triggers' },
    { type: 'action', color: '#3b82f6', icon: Settings, label: 'Actions' },
    { type: 'condition', color: '#f59e0b', icon: ChevronRight, label: 'Conditions' },
    { type: 'data', color: '#8b5cf6', icon: Database, label: 'Data' }
  ];

  // Simplify with just key workflow elements
  const keyWorkflowSteps = [
    { name: 'Form Submission', type: 'trigger', icon: FileText, details: 'Customer submits a web form' },
    { name: 'Validate Data', type: 'condition', icon: CheckCircle, details: 'Verify input data meets requirements' },
    { name: 'Fetch Customer Data', type: 'data', icon: Database, details: 'Retrieve customer information from CRM' },
    { name: 'Process Data', type: 'action', icon: Calculator, details: 'Perform calculations and transformations' },
    { name: 'Send Confirmation', type: 'action', icon: Mail, details: 'Send confirmation email to customer' }
  ];
  
  return (
    <div className="bg-black/30 p-6 rounded-lg backdrop-blur-md border border-white/10">
      <h3 className="text-xl font-bold text-white mb-4">Workflow Automation</h3>
      <p className="text-gray-300 text-sm mb-6">Visual representation of automated business processes</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {nodeTypes.map((nodeType) => (
          <div 
            key={nodeType.type} 
            className="px-3 py-1 text-xs rounded-lg flex items-center gap-1 bg-white/5 border border-white/10"
            style={{ borderLeftColor: nodeType.color, borderLeftWidth: '3px' }}
          >
            <nodeType.icon className="w-3 h-3" style={{ color: nodeType.color }} />
            <span>{nodeType.label}</span>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        {keyWorkflowSteps.map((step, index) => {
          const nodeType = nodeTypes.find(nt => nt.type === step.type);
          return (
            <div key={index} className="flex items-start gap-4">
              <div className="flex items-center justify-center">
                {index > 0 && (
                  <div className="h-6 w-px bg-white/20 mx-auto mb-1"></div>
                )}
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${nodeType?.color}30` }}
                >
                  <step.icon className="w-4 h-4" style={{ color: nodeType?.color }} />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{step.name}</h4>
                  <div 
                    className="px-2 py-0.5 text-xs rounded-full" 
                    style={{ backgroundColor: `${nodeType?.color}20`, color: nodeType?.color }}
                  >
                    {step.type}
                  </div>
                </div>
                <p className="text-sm text-gray-400">{step.details}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-sm">
        3D visualization unavailable. Showing simplified workflow representation.
      </div>
    </div>
  );
};

// Main component
const WorkflowVisualization3D = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [nodeType, setNodeType] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] bg-black/30 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-red-500/20 transition-all duration-300"
    >
      <AnimationErrorBoundary fallback={<WorkflowVisualizationFallback />}>
        {isVisible && (
          <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
            <WorkflowScene 
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
        <h3 className="text-xl font-bold text-white mb-2">Workflow Automation</h3>
        <p className="text-gray-300 text-sm mb-4">Interactive visualization of automated business processes</p>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setNodeType(nodeType === 'trigger' ? null : 'trigger')}
            className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 ${
              nodeType === 'trigger' 
                ? 'bg-red-500/20 text-white border border-red-500/30' 
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              Triggers
            </span>
          </button>
          
          <button 
            onClick={() => setNodeType(nodeType === 'action' ? null : 'action')}
            className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 ${
              nodeType === 'action' 
                ? 'bg-blue-500/20 text-white border border-blue-500/30' 
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="flex items-center">
              <Settings className="w-3 h-3 mr-1" />
              Actions
            </span>
          </button>
          
          <button 
            onClick={() => setNodeType(nodeType === 'condition' ? null : 'condition')}
            className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 ${
              nodeType === 'condition' 
                ? 'bg-amber-500/20 text-white border border-amber-500/30' 
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="flex items-center">
              <ChevronRight className="w-3 h-3 mr-1" />
              Conditions
            </span>
          </button>
          
          <button 
            onClick={() => setNodeType(nodeType === 'data' ? null : 'data')}
            className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 ${
              nodeType === 'data' 
                ? 'bg-purple-500/20 text-white border border-purple-500/30' 
                : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
            }`}
          >
            <span className="flex items-center">
              <Database className="w-3 h-3 mr-1" />
              Data
            </span>
          </button>
          
          <button 
            onClick={() => {
              setNodeType(null);
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

export default WorkflowVisualization3D;