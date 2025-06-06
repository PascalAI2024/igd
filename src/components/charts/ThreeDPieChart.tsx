import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ThreeDPieChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  height?: number;
  width?: number;
  animationDelay?: number;
  exploded?: boolean;
}

// Create a custom arc geometry for pie segments
const createArcGeometry = (
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
  height: number,
  radialSegments = 32,
  heightSegments = 1
) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const indices = [];
  const uvs = [];

  // Create vertices for top and bottom faces
  for (let h = 0; h <= heightSegments; h++) {
    const y = (h / heightSegments) * height - height / 2;

    for (let r = 0; r <= 1; r++) {
      const radius = r === 0 ? innerRadius : outerRadius;

      for (let a = 0; a <= radialSegments; a++) {
        const angle = startAngle + (a / radialSegments) * (endAngle - startAngle);
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        vertices.push(x, y, z);
        uvs.push(a / radialSegments, h / heightSegments);
      }
    }
  }

  // Create indices for faces
  const vertsPerRow = radialSegments + 1;
  for (let h = 0; h < heightSegments; h++) {
    for (let r = 0; r < 1; r++) {
      const baseIndex = h * vertsPerRow * 2 + r * vertsPerRow;

      for (let a = 0; a < radialSegments; a++) {
        const index = baseIndex + a;

        // Top face
        indices.push(index, index + 1, index + vertsPerRow);
        indices.push(index + vertsPerRow, index + 1, index + vertsPerRow + 1);
      }
    }
  }

  // Create inner and outer curved faces
  for (let h = 0; h < heightSegments; h++) {
    const baseIndex = h * vertsPerRow * 2;

    // Inner face
    for (let a = 0; a < radialSegments; a++) {
      const index = baseIndex + a;
      indices.push(index, index + vertsPerRow * 2, index + vertsPerRow);
      indices.push(index, index + vertsPerRow * 2 + 1, index + vertsPerRow * 2);
    }

    // Outer face
    for (let a = 0; a < radialSegments; a++) {
      const index = baseIndex + vertsPerRow + a;
      indices.push(index, index + vertsPerRow, index + vertsPerRow * 2);
      indices.push(index + 1, index, index + vertsPerRow * 2);
    }
  }

  // Create start and end faces
  for (let h = 0; h < heightSegments; h++) {
    const baseIndex = h * vertsPerRow * 2;

    // Start face
    indices.push(baseIndex, baseIndex + vertsPerRow * 2, baseIndex + vertsPerRow);
    indices.push(baseIndex + vertsPerRow, baseIndex + vertsPerRow * 2, baseIndex + vertsPerRow * 3);

    // End face
    indices.push(baseIndex + radialSegments, baseIndex + vertsPerRow + radialSegments, baseIndex + vertsPerRow * 2 + radialSegments);
    indices.push(baseIndex + vertsPerRow + radialSegments, baseIndex + vertsPerRow * 3 + radialSegments, baseIndex + vertsPerRow * 2 + radialSegments);
  }

  // Set attributes
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};

// Pie segment component
const PieSegment = ({
  innerRadius = 0.5,
  outerRadius = 2,
  startAngle,
  endAngle,
  height = 0.5,
  color,
  label,
  value,
  percentage,
  index,
  exploded,
  total
}: {
  innerRadius?: number;
  outerRadius?: number;
  startAngle: number;
  endAngle: number;
  height?: number;
  color: string;
  label: string;
  value: number;
  percentage: number;
  index: number;
  exploded: boolean;
  total: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  
  // Safe state setter to prevent updates on unmounted component
  const safeSetState = useCallback((setter: React.Dispatch<React.SetStateAction<any>>, value: any) => {
    if (isMountedRef.current) {
      setter(value);
    }
  }, []);

  // Calculate midpoint angle for positioning label and explosion direction
  const midAngle = (startAngle + endAngle) / 2;
  const explodeDistance = exploded || hovered || clicked ? 0.3 : 0;
  const explodeX = Math.cos(midAngle) * explodeDistance;
  const explodeZ = Math.sin(midAngle) * explodeDistance;

  // Create geometry
  const geometry = useMemo(() => {
    return createArcGeometry(innerRadius, outerRadius, startAngle, endAngle, height);
  }, [innerRadius, outerRadius, startAngle, endAngle, height]);

  // Animation
  useFrame((state) => {
    if (!meshRef.current || !isMountedRef.current) return;
    
    try {
      // Subtle floating animation
      const t = state.clock.getElapsedTime() + index;
      const floatY = Math.sin(t) * 0.01;

      // Smooth transition for explosion effect
      const targetX = explodeX;
      const targetZ = explodeZ;

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      meshRef.current.position.y = floatY;

      // Subtle rotation when hovered
      if (hovered) {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(
          meshRef.current.rotation.y,
          meshRef.current.rotation.y + 0.01,
          0.1
        );
      }
    } catch (error) {
      console.error('Error in PieSegment animation:', error);
    }
  });

  // Label position
  const labelDistance = outerRadius * 1.2;
  const labelX = Math.cos(midAngle) * labelDistance;
  const labelZ = Math.sin(midAngle) * labelDistance;

  // Create material with gradient and glow
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      metalness: 0.2,
      roughness: 0.5,
      emissive: new THREE.Color(color).multiplyScalar(0.2),
      emissiveIntensity: hovered ? 1 : 0.2
    });
  }, [color, hovered]);

  return (
    <group>
      <mesh
        ref={meshRef}
        geometry={geometry}
        onPointerOver={() => safeSetState(setHovered as React.Dispatch<React.SetStateAction<boolean>>, true)}
        onPointerOut={() => safeSetState(setHovered as React.Dispatch<React.SetStateAction<boolean>>, false)}
        onClick={() => safeSetState(setClicked, !clicked)}
      >
        <primitive object={material} attach="material" />
      </mesh>

      {/* Label with connecting line */}
      <group position={[labelX * 0.8, 0, labelZ * 0.8]}>
        <Html
          position={[0, 0, 0]}
          center
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            padding: '6px 10px',
            borderRadius: '4px',
            color: 'white',
            fontSize: '12px',
            opacity: hovered ? 1 : 0.7,
            transition: 'all 0.2s',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          <div>
            <strong>{label}</strong>: {value} ({percentage.toFixed(1)}%)
          </div>
        </Html>
      </group>
    </group>
  );
};

// Chart scene
const ChartScene = ({ data, exploded }: { data: DataPoint[], exploded: boolean }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const isMountedRef = useRef(true);

  // Track mounted state to prevent memory leaks
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Set initial camera position
  useEffect(() => {
    if (!isMountedRef.current) return;
    
    try {
      camera.position.set(0, 5, 5);
      camera.lookAt(0, 0, 0);
    } catch (error) {
      console.error('Error setting camera position:', error);
    }
  }, [camera]);

  // Calculate total for percentages
  const total = data.reduce((sum, point) => sum + point.value, 0);

  // Create pie segments
  const segments = useMemo(() => {
    let currentAngle = 0;

    return data.map((point, index) => {
      const percentage = (point.value / total) * 100;
      const angle = (percentage / 100) * Math.PI * 2;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      return (
        <PieSegment
          key={point.label}
          startAngle={startAngle}
          endAngle={endAngle}
          color={point.color || `hsl(${index * 360 / data.length}, 70%, 50%)`}
          label={point.label}
          value={point.value}
          percentage={percentage}
          index={index}
          exploded={exploded}
          total={total}
        />
      );
    });
  }, [data, total, exploded]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, 10, -10]} intensity={0.5} color="#ff0000" />

      <group rotation={[Math.PI / 6, 0, 0]}>
        {segments}
      </group>

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        minDistance={4}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
};

// Main component
const ThreeDPieChart: React.FC<ThreeDPieChartProps> = ({
  title,
  description,
  data,
  height = 400,
  width = '100%',
  animationDelay = 0.3,
  exploded = false
}) => {
  // Use a ref to track if the component is mounted
  const isMountedRef = useRef(true);
  
  useEffect(() => {
    isMountedRef.current = true;
    
    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Clean up resources when page is hidden
        console.log('ThreeDPieChart: Page hidden, cleaning up');
      }
    };
    
    // Handle bfcache restoration
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        console.log('ThreeDPieChart: Page restored from bfcache');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    
    return () => {
      isMountedRef.current = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      {description && <p className="text-gray-400 mb-6">{description}</p>}

      <div style={{ height, width }} className="relative">
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }}>
          <ChartScene data={data} exploded={exploded} />
        </Canvas>
      </div>
    </motion.div>
  );
};

export default ThreeDPieChart;
