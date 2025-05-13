import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useHighPerformanceAnimation } from '../../../hooks/useAnimation';

interface NeuralNetworkAnimationProps {
  title: string;
  description: string;
  layers: number[];
  height?: number;
  animationDelay?: number;
  highlightColor?: string;
}

interface Neuron3D {
  x: number;
  y: number;
  z: number;
  radius: number;
  value: number;
  targetValue: number;
  connections: Connection3D[];
  rotationSpeed: number;
  rotationOffset: number;
}

interface Connection3D {
  from: Neuron3D;
  to: Neuron3D;
  weight: number;
  particles: Particle[];
  active: boolean;
}

interface Particle {
  position: number; // 0 to 1
  speed: number;
  size: number;
  alpha: number;
}

// 3D projection constants
const PERSPECTIVE = 800;
const NEURON_DEPTH_RANGE = 100;
const ROTATION_SPEED = 0.0005;

const NeuralNetworkAnimation: React.FC<NeuralNetworkAnimationProps> = ({
  title,
  description,
  layers,
  height = 300,
  animationDelay = 0.3,
  highlightColor = 'rgba(255, 0, 0, 0.8)'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [neurons, setNeurons] = useState<Neuron3D[]>([]);
  const [connections, setConnections] = useState<Connection3D[]>([]);
  const [rotation, setRotation] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Initialize neural network
  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth;
    const neuronBaseRadius = 6;
    const layerSpacing = containerWidth / (layers.length + 1);

    const newNeurons: Neuron3D[] = [];
    const newConnections: Connection3D[] = [];

    // Create neurons for each layer with 3D positions
    layers.forEach((neuronCount, layerIndex) => {
      const layerX = layerSpacing * (layerIndex + 1);
      const layerHeight = height - 80; // Leave space for padding
      const neuronSpacing = layerHeight / (neuronCount + 1);

      for (let i = 0; i < neuronCount; i++) {
        // Add some randomness to Z position for 3D effect
        const z = Math.random() * NEURON_DEPTH_RANGE - NEURON_DEPTH_RANGE / 2;

        const neuron: Neuron3D = {
          x: layerX,
          y: neuronSpacing * (i + 1) + 40, // Add padding
          z: z,
          radius: neuronBaseRadius * (1 + z / PERSPECTIVE), // Size based on depth
          value: 0.1 + Math.random() * 0.2, // Start with low activation
          targetValue: 0.1 + Math.random() * 0.2,
          connections: [],
          rotationSpeed: 0.5 + Math.random() * 0.5,
          rotationOffset: Math.random() * Math.PI * 2
        };

        newNeurons.push(neuron);

        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayerStartIndex = layers.slice(0, layerIndex - 1).reduce((sum, count) => sum + count, 0);
          const prevLayerEndIndex = prevLayerStartIndex + layers[layerIndex - 1];

          // Connect to a subset of previous layer neurons for cleaner visualization
          const connectionsCount = Math.min(3, layers[layerIndex - 1]);
          const possibleConnections = Array.from({ length: layers[layerIndex - 1] }, (_, i) => prevLayerStartIndex + i);

          // Shuffle and take a subset
          const shuffled = possibleConnections.sort(() => 0.5 - Math.random());
          const selectedConnections = shuffled.slice(0, connectionsCount);

          for (const j of selectedConnections) {
            const weight = Math.random() * 2 - 1; // -1 to 1

            // Create particles for data flow visualization
            const particles: Particle[] = [];
            const particleCount = Math.floor(Math.random() * 3) + 1;

            for (let p = 0; p < particleCount; p++) {
              particles.push({
                position: Math.random(),
                speed: 0.002 + Math.random() * 0.003,
                size: 1 + Math.random() * 2,
                alpha: 0.6 + Math.random() * 0.4
              });
            }

            const connection: Connection3D = {
              from: newNeurons[j],
              to: neuron,
              weight: weight,
              particles: particles,
              active: Math.random() > 0.5 // Some connections start active
            };

            newConnections.push(connection);
            newNeurons[j].connections.push(connection);
          }
        }
      }
    });

    setNeurons(newNeurons);
    setConnections(newConnections);
  }, [isVisible, layers, height]);

  // Animation function using the high performance hook
  const animate = useCallback((deltaTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas || neurons.length === 0 || connections.length === 0) return;

    // Update rotation based on time
    const newRotation = rotation + ROTATION_SPEED * deltaTime;
    setRotation(newRotation);

    // Update neuron values with smooth transitions
    neurons.forEach(neuron => {
      // Occasionally change target value
      if (Math.random() < 0.01) {
        neuron.targetValue = 0.1 + Math.random() * 0.9;
      }

      // Smooth transition to target value
      neuron.value += (neuron.targetValue - neuron.value) * 0.05;

      // Add subtle oscillation based on rotation and offset
      neuron.value += Math.sin(newRotation * neuron.rotationSpeed + neuron.rotationOffset) * 0.05;

      // Clamp value between 0 and 1
      neuron.value = Math.max(0.1, Math.min(1, neuron.value));
    });

    // Update connection activity based on neuron values
    connections.forEach(connection => {
      // Connection becomes active if source neuron is highly activated
      if (connection.from.value > 0.7 && Math.random() < 0.05) {
        connection.active = true;
      }

      // Update particles
      if (connection.active) {
        connection.particles.forEach(particle => {
          particle.position += particle.speed * deltaTime / 16;

          // Reset particle when it reaches the end
          if (particle.position >= 1) {
            particle.position = 0;

            // Transfer activation to target neuron
            connection.to.targetValue = Math.min(1, connection.to.targetValue + 0.2);

            // Occasionally deactivate connection
            if (Math.random() < 0.2) {
              connection.active = false;
            }
          }
        });
      } else if (Math.random() < 0.01) {
        // Randomly activate some connections
        connection.active = true;
      }
    });

    // Draw the network
    drawNetwork3D(canvas, neurons, connections, newRotation, mousePosition, isHovering, highlightColor);
  }, [neurons, connections, rotation, mousePosition, isHovering, highlightColor]);

  // Use high performance animation hook
  const { canvasRef } = useHighPerformanceAnimation(animate, {
    autoStart: isVisible
  });

  // Handle mouse interactions
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width * 2 - 1,
      y: (e.clientY - rect.top) / rect.height * 2 - 1
    });
  }, []);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;

      canvasRef.current.width = containerRef.current.clientWidth;
      canvasRef.current.height = height;

      // Reset animation when resized
      if (isVisible) {
        setIsVisible(false);
        setTimeout(() => setIsVisible(true), 10);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [height, isVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      onViewportEnter={() => setIsVisible(true)}
      onViewportLeave={() => setIsVisible(false)}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-red-500/20 transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>

      <div
        ref={containerRef}
        className="relative w-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <canvas
          ref={canvasRef}
          height={height}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap justify-between gap-4 mt-4 text-sm text-gray-400">
        <div>Input Layer</div>
        <div>Hidden Layers</div>
        <div>Output Layer</div>
      </div>
    </motion.div>
  );
};

// Helper function to draw the 3D neural network
const drawNetwork3D = (
  canvas: HTMLCanvasElement,
  neurons: Neuron3D[],
  connections: Connection3D[],
  rotation: number,
  mousePosition: { x: number, y: number },
  isHovering: boolean,
  highlightColor: string
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Enable high quality rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // Clear canvas with slight fade for motion blur effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Apply 3D rotation based on mouse position or animation
  const rotationX = isHovering ? mousePosition.y * 0.2 : Math.sin(rotation * 0.5) * 0.2;
  const rotationY = isHovering ? mousePosition.x * 0.4 : Math.cos(rotation * 0.3) * 0.4;

  // Project 3D positions to 2D with perspective
  const projectedNeurons = neurons.map(neuron => {
    // Apply rotation
    const x = neuron.x - canvas.width / 2;
    const y = neuron.y - canvas.height / 2;
    const z = neuron.z;

    // Rotate around Y axis
    const rotatedX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
    const rotatedZ = z * Math.cos(rotationY) + x * Math.sin(rotationY);

    // Rotate around X axis
    const rotatedY = y * Math.cos(rotationX) + rotatedZ * Math.sin(rotationX);
    const finalZ = rotatedZ * Math.cos(rotationX) - y * Math.sin(rotationX);

    // Apply perspective projection
    const scale = PERSPECTIVE / (PERSPECTIVE + finalZ);
    const projectedX = rotatedX * scale + canvas.width / 2;
    const projectedY = rotatedY * scale + canvas.height / 2;

    return {
      ...neuron,
      projectedX,
      projectedY,
      scale,
      depth: finalZ
    };
  });

  // Sort by depth for proper rendering
  projectedNeurons.sort((a, b) => b.depth - a.depth);

  // Draw connections with depth sorting
  connections.forEach(connection => {
    const from = projectedNeurons.find(n => n === connection.from);
    const to = projectedNeurons.find(n => n === connection.to);

    if (!from || !to) return;

    // Calculate connection strength based on neuron values and weight
    const strength = from.value * Math.abs(connection.weight);
    const isActive = connection.active;

    // Draw connection line with perspective
    ctx.beginPath();
    ctx.moveTo(from.projectedX, from.projectedY);

    // Use quadratic curve for more organic look
    const controlX = (from.projectedX + to.projectedX) / 2;
    const controlY = (from.projectedY + to.projectedY) / 2 - 20 * (from.scale + to.scale) / 2;
    ctx.quadraticCurveTo(controlX, controlY, to.projectedX, to.projectedY);

    // Line style based on weight and depth
    const alpha = (0.1 + strength * 0.3) * Math.min(from.scale, to.scale);
    const depth = (from.depth + to.depth) / 2;
    const depthFactor = 1 - Math.min(1, Math.max(0, (depth + NEURON_DEPTH_RANGE) / (NEURON_DEPTH_RANGE * 2)));

    if (connection.weight > 0) {
      const r = 255;
      const g = Math.floor(50 + 50 * depthFactor);
      const b = Math.floor(50 * depthFactor);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    } else {
      const r = Math.floor(50 + 50 * depthFactor);
      const g = Math.floor(100 * depthFactor);
      const b = 255;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    ctx.lineWidth = (1 + strength) * Math.min(from.scale, to.scale);
    ctx.stroke();

    // Draw data flow particles
    if (isActive) {
      connection.particles.forEach(particle => {
        // Calculate position along the curve
        const t = particle.position;
        const px = from.projectedX * (1 - t) * (1 - t) +
                  controlX * 2 * (1 - t) * t +
                  to.projectedX * t * t;
        const py = from.projectedY * (1 - t) * (1 - t) +
                  controlY * 2 * (1 - t) * t +
                  to.projectedY * t * t;

        // Draw particle with glow effect
        const particleSize = particle.size * Math.min(from.scale, to.scale);
        const glowSize = particleSize * 4;

        // Inner glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${particle.alpha})`);
        gradient.addColorStop(0.3, highlightColor.replace(')', `, ${particle.alpha * 0.8})`));
        gradient.addColorStop(1, `rgba(255, 0, 0, 0)`);

        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(px, py, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.fill();
      });
    }
  });

  // Draw neurons with 3D effect
  projectedNeurons.forEach(neuron => {
    const { projectedX, projectedY, scale, value } = neuron;
    const scaledRadius = neuron.radius * scale;

    // Create 3D sphere effect
    const gradient = ctx.createRadialGradient(
      projectedX - scaledRadius * 0.3,
      projectedY - scaledRadius * 0.3,
      0,
      projectedX,
      projectedY,
      scaledRadius * 2
    );

    // Color based on activation level
    const r = 255;
    const g = Math.floor(value * 100);
    const b = Math.floor(value * 50);
    const alpha = 0.3 + value * 0.7;

    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
    gradient.addColorStop(0.3, `rgba(${r * 0.8}, ${g * 0.5}, ${b * 0.5}, ${alpha * 0.8})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    // Draw neuron body with 3D lighting effect
    ctx.beginPath();
    ctx.arc(projectedX, projectedY, scaledRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add highlight for 3D effect
    ctx.beginPath();
    ctx.arc(
      projectedX - scaledRadius * 0.3,
      projectedY - scaledRadius * 0.3,
      scaledRadius * 0.4,
      0, Math.PI * 2
    );
    ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + value * 0.3})`;
    ctx.fill();

    // Add outer glow for highly activated neurons
    if (value > 0.7) {
      const glowSize = scaledRadius * (1 + value);
      const glowGradient = ctx.createRadialGradient(
        projectedX, projectedY, scaledRadius,
        projectedX, projectedY, glowSize
      );

      const glowIntensity = (value - 0.7) / 0.3;
      glowGradient.addColorStop(0, `rgba(255, 50, 0, ${glowIntensity * 0.5})`);
      glowGradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      ctx.beginPath();
      ctx.arc(projectedX, projectedY, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
  });
};

export default NeuralNetworkAnimation;
