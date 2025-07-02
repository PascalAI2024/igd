import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, OrbitControls, Billboard } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';
import { AnimationErrorBoundary } from '../../../components/AnimationErrorBoundary';

// Node types with different visual representations
export type NodeType = 'server' | 'database' | 'client' | 'api' | 'cloud' | 'device' | 'router' | 'custom';

interface NetworkNode {
  id: string;
  type: NodeType;
  label: string;
  description?: string;
  position?: [number, number, number]; // Optional initial position
  size?: number;
  color?: string;
  icon?: string;
  metadata?: Record<string, any>; // Additional data
}

interface NetworkLink {
  source: string; // Node ID
  target: string; // Node ID
  label?: string;
  strength?: number; // 0-1, affects spring force
  color?: string;
  bidirectional?: boolean;
  animated?: boolean;
  thickness?: number;
  metadata?: Record<string, any>; // Additional data
}

interface NetworkVisualization3DProps {
  nodes: NetworkNode[];
  links: NetworkLink[];
  title?: string;
  description?: string;
  height?: number;
  autoRotate?: boolean;
  theme?: 'dark' | 'light';
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

// Particle for data flow visualization
interface Particle {
  position: number; // 0-1 position along the path
  speed: number;
  size: number;
  color: string;
}

// Node icons mapping
const NODE_ICON_MAP: Record<NodeType, string> = {
  server: '/images/tech/server.svg',
  database: '/images/tech/database.svg',
  client: '/images/tech/client.svg',
  api: '/images/tech/api.svg',
  cloud: '/images/tech/cloud.svg',
  device: '/images/tech/device.svg',
  router: '/images/tech/router.svg',
  custom: '/images/tech/custom.svg'
};

// Default node colors
const NODE_COLOR_MAP: Record<NodeType, string> = {
  server: '#3b82f6', // blue
  database: '#10b981', // green
  client: '#f59e0b', // yellow
  api: '#8b5cf6', // violet
  cloud: '#6366f1', // indigo
  device: '#ec4899', // pink
  router: '#ef4444', // red
  custom: '#6b7280' // gray
};

// Network Node component
const Node = ({ 
  node, 
  selected, 
  hovered, 
  onClick, 
  onHover, 
  onBlur 
}: { 
  node: NetworkNode & { position: [number, number, number] }; 
  selected: boolean;
  hovered: boolean;
  onClick: (id: string) => void;
  onHover: (id: string) => void;
  onBlur: () => void;
}) => {
  const nodeRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const isMountedRef = useRef(true);
  
  // Define node appearance
  const nodeColor = node.color || NODE_COLOR_MAP[node.type] || '#3b82f6';
  const nodeSize = node.size || (node.type === 'server' ? 0.7 : 0.5);
  const iconUrl = node.icon || NODE_ICON_MAP[node.type];
  
  // Load texture for icon with error handling
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  
  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      iconUrl,
      (loadedTexture) => {
        if (isMountedRef.current) {
          setTexture(loadedTexture);
        }
      },
      undefined,
      (error) => {
        console.warn(`Failed to load icon texture: ${iconUrl}`, error);
        // Fallback texture or no texture
        if (isMountedRef.current) {
          setTexture(null);
        }
      }
    );
  }, [iconUrl]);
  
  // Track mounted state and clean up texture
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Dispose texture if loaded
      if (texture) {
        texture.dispose();
      }
    };
  }, [texture]);
  
  // Animation
  useFrame((state) => {
    if (!nodeRef.current || !isMountedRef.current) return;
    
    try {
      // Basic hover/select scaling
      const targetScale = selected ? 1.2 : hovered ? 1.1 : 1;
      nodeRef.current.scale.x = THREE.MathUtils.lerp(nodeRef.current.scale.x, targetScale, 0.1);
      nodeRef.current.scale.y = THREE.MathUtils.lerp(nodeRef.current.scale.y, targetScale, 0.1);
      nodeRef.current.scale.z = THREE.MathUtils.lerp(nodeRef.current.scale.z, targetScale, 0.1);
      
      // Add subtle hovering motion
      nodeRef.current.position.y = node.position[1] + Math.sin(state.clock.getElapsedTime() + Math.random()) * 0.02;
      
      // Handle glow effect
      if (glowRef.current) {
        if (selected || hovered) {
          const pulseIntensity = selected ? 0.3 : 0.15;
          glowRef.current.scale.set(
            1.2 + Math.sin(state.clock.getElapsedTime() * 2) * pulseIntensity,
            1.2 + Math.sin(state.clock.getElapsedTime() * 2) * pulseIntensity,
            1.2 + Math.sin(state.clock.getElapsedTime() * 2) * pulseIntensity
          );
          (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 
            0.2 + (selected ? 0.3 : 0.1) * Math.sin(state.clock.getElapsedTime() * 2);
        } else {
          glowRef.current.scale.set(1, 1, 1);
          (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1;
        }
      }
    } catch (error) {
      console.error('Error in Node animation:', error);
    }
  });

  return (
    <group 
      ref={nodeRef} 
      position={node.position}
      onClick={() => onClick(node.id)}
      onPointerOver={() => onHover(node.id)}
      onPointerOut={onBlur}
    >
      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[nodeSize * 1.5, 16, 16]} />
        <meshBasicMaterial color={nodeColor} transparent opacity={0.1} />
      </mesh>
      
      {/* Core node sphere */}
      <mesh>
        <sphereGeometry args={[nodeSize, 32, 32]} />
        <meshStandardMaterial 
          color={nodeColor} 
          roughness={0.3}
          metalness={0.7}
          emissive={nodeColor}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Icon */}
      {texture && (
        <Billboard position={[0, 0, nodeSize * 1.01]}>
          <mesh>
            <planeGeometry args={[nodeSize, nodeSize]} />
            <meshBasicMaterial 
              map={texture} 
              transparent 
              alphaTest={0.1}
              color="white"
            />
          </mesh>
        </Billboard>
      )}
      
      {/* Label */}
      <Billboard position={[0, -nodeSize * 1.5, 0]}>
        <Text
          color="white"
          fontSize={nodeSize * 0.5}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="black"
        >
          {node.label}
        </Text>
      </Billboard>
      
      {/* Details panel for selected nodes */}
      {selected && node.description && (
        <Html
          position={[nodeSize * 2, nodeSize * 2, 0]}
          center
          distanceFactor={10}
          className="pointer-events-none"
        >
          <div className="w-64 p-4 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-white">
            <h4 className="text-lg font-semibold mb-1">{node.label}</h4>
            <div className="mb-2 inline-block px-2 py-0.5 rounded text-xs" style={{ backgroundColor: nodeColor }}>
              {node.type}
            </div>
            <p className="text-sm text-gray-300">{node.description}</p>
            
            {/* Show extra metadata if available */}
            {node.metadata && Object.keys(node.metadata).length > 0 && (
              <div className="mt-2 pt-2 border-t border-white/20">
                {Object.entries(node.metadata).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 text-xs">
                    <span className="text-gray-400">{key}:</span>
                    <span className="col-span-2">{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

// Connection line between nodes
const Link = ({ 
  link, 
  sourcePos, 
  targetPos, 
  selected, 
  hovered 
}: { 
  link: NetworkLink; 
  sourcePos: [number, number, number];
  targetPos: [number, number, number];
  selected: boolean;
  hovered: boolean;
}) => {
  const lineRef = useRef<THREE.Line>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const curveRef = useRef<THREE.CubicBezierCurve3 | null>(null);
  const particles = useRef<Particle[]>([]);
  const isMountedRef = useRef(true);
  
  // Define appearance
  const linkColor = link.color || '#ffffff';
  const intensity = link.strength || 0.5;
  const thickness = link.thickness || 1;
  const animated = link.animated !== false; // Default to true
  
  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Clean up particle positions
      if (particlePositionsRef.current) {
        particlePositionsRef.current = null;
      }
    };
  }, []);
  
  // Generate or update curve when positions change
  useEffect(() => {
    // Create a curved path between nodes
    const midPoint = new THREE.Vector3(
      (sourcePos[0] + targetPos[0]) / 2,
      (sourcePos[1] + targetPos[1]) / 2 + 0.5, // Add slight upward curve
      (sourcePos[2] + targetPos[2]) / 2
    );
    
    // Control points for the curve
    const start = new THREE.Vector3(...sourcePos);
    const end = new THREE.Vector3(...targetPos);
    const controlPoint1 = new THREE.Vector3(
      start.x + (midPoint.x - start.x) * 0.5,
      midPoint.y,
      start.z + (midPoint.z - start.z) * 0.5
    );
    const controlPoint2 = new THREE.Vector3(
      end.x + (midPoint.x - end.x) * 0.5,
      midPoint.y,
      end.z + (midPoint.z - end.z) * 0.5
    );
    
    curveRef.current = new THREE.CubicBezierCurve3(start, controlPoint1, controlPoint2, end);
    
    // Create initial particles if animated
    if (animated && particles.current.length === 0) {
      const particleCount = Math.floor(5 + intensity * 10);
      particles.current = Array.from({ length: particleCount }, () => ({
        position: Math.random(),
        speed: 0.002 + Math.random() * 0.003 * intensity,
        size: 0.03 + Math.random() * 0.05 * intensity,
        color: linkColor
      }));
    }
  }, [sourcePos, targetPos, linkColor, intensity, animated]);
  
  // Animation
  useFrame((state) => {
    if (!curveRef.current || !isMountedRef.current) return;
    
    try {
      // Update line appearance based on selection/hover state
      if (lineRef.current) {
        const material = lineRef.current.material as THREE.LineBasicMaterial;
        material.opacity = selected ? 0.8 : hovered ? 0.6 : 0.3;
        material.linewidth = thickness * (selected ? 2 : hovered ? 1.5 : 1);
      }
      
      // Update particles
      if (animated && pointsRef.current) {
        const pointGeometry = pointsRef.current.geometry;
        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
        
        // Update each particle
        for (let i = 0; i < particles.current.length; i++) {
          const particle = particles.current[i];
          
          // Move along the curve
          particle.position += particle.speed * (selected ? 1.5 : hovered ? 1.2 : 1);
          if (particle.position > 1) particle.position = 0;
          
          // Get position on curve
          const point = curveRef.current.getPointAt(particle.position);
          
          // Update geometry
          const idx = i * 3;
          if (idx + 2 < positions.length) {
            positions[idx] = point.x;
            positions[idx + 1] = point.y;
            positions[idx + 2] = point.z;
          }
        }
        
        pointGeometry.attributes.position.needsUpdate = true;
      }
    } catch (error) {
      console.error('Error in Link animation:', error);
    }
  });
  
  // Generate curve points for the line
  const points = useMemo(() => {
    if (!curveRef.current) return [new THREE.Vector3(...sourcePos), new THREE.Vector3(...targetPos)];
    return curveRef.current.getPoints(20);
  }, [sourcePos, targetPos, curveRef.current]);
  
  // Prepare particle positions
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(particles.current.length * 3);
    particlePositionsRef.current = positions;
    return positions;
  }, []);

  return (
    <group>
      {/* Connection line */}
      <primitive object={new THREE.Line()} ref={lineRef as any}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color={linkColor} 
          transparent 
          opacity={0.3} 
          linewidth={thickness}
        />
      </primitive>
      
      {/* Label */}
      {link.label && (
        <Billboard
          position={[
            (sourcePos[0] + targetPos[0]) / 2,
            (sourcePos[1] + targetPos[1]) / 2 + 0.2,
            (sourcePos[2] + targetPos[2]) / 2
          ]}
        >
          <Text
            color="white"
            fontSize={0.15}
            anchorX="center"
            anchorY="middle"
          >
            {link.label}
          </Text>
        </Billboard>
      )}
      
      {/* Flow particles */}
      {animated && (
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particles.current.length}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            color={linkColor}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
      
      {/* Arrows for direction */}
      {!link.bidirectional && (
        <Billboard
          position={[
            targetPos[0] * 0.7 + sourcePos[0] * 0.3,
            targetPos[1] * 0.7 + sourcePos[1] * 0.3,
            targetPos[2] * 0.7 + sourcePos[2] * 0.3
          ]}
        >
          <mesh>
            <planeGeometry args={[0.2, 0.2]} />
            <meshBasicMaterial 
              color={linkColor} 
              transparent 
              opacity={0.8}
              alphaTest={0.01}
            />
          </mesh>
        </Billboard>
      )}
    </group>
  );
};

// Network Scene
const NetworkScene = ({ 
  nodes, 
  links, 
  primaryColor,
  secondaryColor,
  backgroundColor,
  autoRotate
}: { 
  nodes: NetworkNode[]; 
  links: NetworkLink[];
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  autoRotate: boolean;
}) => {
  const { camera } = useThree();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const sceneRef = useRef<THREE.Group>(null);
  const controlsRef = useRef<any>(null);
  const isMountedRef = useRef(true);
  
  // Track mounted state
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      // Clean up OrbitControls when unmounting
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, []);
  
  // Safe state setter to prevent updates on unmounted component
  const safeSetState = useCallback(<T,>(setter: React.Dispatch<React.SetStateAction<T>>, value: T) => {
    if (isMountedRef.current) {
      setter(value);
    }
  }, []);
  
  // Force-directed layout computation (simplified)
  const [nodePositions, setNodePositions] = useState<Record<string, [number, number, number]>>({});
  
  // Initialize node positions
  useEffect(() => {
    const initialPositions: Record<string, [number, number, number]> = {};
    
    nodes.forEach(node => {
      if (node.position) {
        initialPositions[node.id] = node.position;
      } else {
        // Random positioning in a sphere
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = 3 + Math.random() * 2;
        initialPositions[node.id] = [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ];
      }
    });
    
    setNodePositions(initialPositions);
  }, [nodes]);
  
  // Handle camera position
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    try {
      camera.position.set(0, 0, 10);
      camera.lookAt(0, 0, 0);
    } catch (error) {
      console.error('Error setting camera position:', error);
    }
  }, [camera]);
  
  // Auto-rotation
  useFrame(({ clock }) => {
    if (!isMountedRef.current || !sceneRef.current) return;
    
    try {
      if (autoRotate && !selectedNode) {
        sceneRef.current.rotation.y = clock.getElapsedTime() * 0.05;
      }
    } catch (error) {
      console.error('Error in scene rotation:', error);
    }
  });
  
  // Map nodes with positions
  const nodesWithPositions = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      position: nodePositions[node.id] || [0, 0, 0]
    }));
  }, [nodes, nodePositions]);
  
  // Get source and target positions for links
  const getNodePosition = (id: string): [number, number, number] => {
    return nodePositions[id] || [0, 0, 0];
  };
  
  // Handle node selection
  const handleNodeClick = (id: string) => {
    safeSetState(setSelectedNode, selectedNode === id ? null : id);
  };
  
  return (
    <group ref={sceneRef}>
      {/* Background sphere */}
      <mesh>
        <sphereGeometry args={[30, 32, 32]} />
        <meshBasicMaterial color={backgroundColor} side={THREE.BackSide} />
      </mesh>
      
      {/* Environment elements - stars/particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute 
            attach="attributes-position" 
            count={1000}
            array={new Float32Array(3000).map(() => (Math.random() - 0.5) * 50)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={1000}
            array={new Float32Array(1000).map(() => 0.05 + Math.random() * 0.1)}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.1} 
          color="white" 
          transparent 
          opacity={0.5} 
          sizeAttenuation 
        />
      </points>
      
      {/* Links */}
      {links.map(link => {
        const sourcePos = getNodePosition(link.source);
        const targetPos = getNodePosition(link.target);
        const linkId = `${link.source}-${link.target}`;
        const isSelected = 
          selectedNode === link.source || 
          selectedNode === link.target;
        const isHovered = 
          hoveredNode === link.source || 
          hoveredNode === link.target || 
          hoveredLink === linkId;
          
        return (
          <Link 
            key={linkId}
            link={link}
            sourcePos={sourcePos}
            targetPos={targetPos}
            selected={isSelected}
            hovered={isHovered}
          />
        );
      })}
      
      {/* Nodes */}
      {nodesWithPositions.map(node => (
        <Node 
          key={node.id}
          node={node}
          selected={selectedNode === node.id}
          hovered={hoveredNode === node.id}
          onClick={handleNodeClick}
          onHover={setHoveredNode}
          onBlur={() => setHoveredNode(null)}
        />
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color={primaryColor} />
      
      {/* Post-processing effects for enhanced visuals */}
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
          kernelSize={KernelSize.LARGE} 
        />
        <Noise opacity={0.05} />
      </EffectComposer>
      
      {/* Camera controls */}
      <OrbitControls 
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        autoRotate={autoRotate && !selectedNode}
        autoRotateSpeed={0.5}
      />
    </group>
  );
};

// Fallback UI when 3D rendering fails
const NetworkVisualizationFallback = ({ 
  nodes, 
  links, 
  title, 
  description 
}: { 
  nodes: NetworkNode[]; 
  links: NetworkLink[]; 
  title: string; 
  description: string; 
}) => {
  return (
    <div className="bg-black/30 rounded-lg p-8 backdrop-blur-md border border-white/10">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-lg mb-2">Network Nodes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {nodes.map((node) => (
              <div key={node.id} className="bg-white/5 p-3 rounded border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: node.color || NODE_COLOR_MAP[node.type] }}
                  />
                  <h5 className="font-medium">{node.label}</h5>
                </div>
                <div className="text-xs text-gray-400">{node.type}</div>
                {node.description && <p className="text-sm mt-1">{node.description}</p>}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-2">Connections</h4>
          <div className="space-y-2">
            {links.map((link, index) => {
              const source = nodes.find(n => n.id === link.source);
              const target = nodes.find(n => n.id === link.target);
              return (
                <div key={index} className="text-sm flex items-center gap-2">
                  <span>{source?.label || link.source}</span>
                  <svg width="20" height="8" viewBox="0 0 20 8" className="opacity-60">
                    <line x1="0" y1="4" x2="20" y2="4" stroke="white" strokeWidth="1" />
                    <polygon points="16,1 20,4 16,7" fill="white" />
                  </svg>
                  <span>{target?.label || link.target}</span>
                  {link.label && <span className="text-gray-400 text-xs">({link.label})</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Visibility detection hook
const useIsVisible = (ref: React.RefObject<HTMLElement>, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (isMountedRef.current) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => {
      isMountedRef.current = false;
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isVisible;
};

// Main component
const NetworkVisualization3D: React.FC<NetworkVisualization3DProps> = ({
  nodes,
  links,
  title = 'Network Visualization',
  description = 'Interactive 3D network visualization',
  height = 600,
  autoRotate = true,
  theme = 'dark',
  primaryColor = '#ef4444',
  secondaryColor = '#3b82f6',
  backgroundColor = theme === 'dark' ? '#050816' : '#f3f4f6'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useIsVisible(containerRef, 0.2);
  const isMountedRef = useRef(true);
  
  // Lifecycle management
  useEffect(() => {
    isMountedRef.current = true;
    
    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('NetworkVisualization3D: Page hidden, cleaning up');
      }
    };
    
    // Handle bfcache restoration
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log('NetworkVisualization3D: Page restored from bfcache');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      isMountedRef.current = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow as EventListener);
    };
  }, []);
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: 0.3 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      {/* Header */}
      {(title || description) && (
        <div className="mb-6">
          {title && <h3 className="text-2xl font-bold mb-2">{title}</h3>}
          {description && <p className="text-gray-400">{description}</p>}
        </div>
      )}
      
      {/* 3D Visualization */}
      <div style={{ height }} className="w-full">
        <AnimationErrorBoundary
          fallback={
            <NetworkVisualizationFallback 
              nodes={nodes} 
              links={links} 
              title={title} 
              description={description} 
            />
          }
        >
          {isVisible && (
            <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
              <NetworkScene 
                nodes={nodes} 
                links={links}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                backgroundColor={backgroundColor}
                autoRotate={autoRotate}
              />
            </Canvas>
          )}
        </AnimationErrorBoundary>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 justify-center">
        {[...new Set(nodes.map(node => node.type))].map(type => (
          <div key={type} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: NODE_COLOR_MAP[type] }}
            />
            <span className="text-sm text-gray-300 capitalize">{type}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default NetworkVisualization3D;