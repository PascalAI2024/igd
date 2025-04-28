import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface NeuralNetworkAnimationProps {
  title: string;
  description: string;
  layers: number[];
  height?: number;
  animationDelay?: number;
  highlightColor?: string;
}

interface Neuron {
  x: number;
  y: number;
  radius: number;
  value: number;
  connections: Connection[];
}

interface Connection {
  from: Neuron;
  to: Neuron;
  weight: number;
}

const NeuralNetworkAnimation: React.FC<NeuralNetworkAnimationProps> = ({
  title,
  description,
  layers,
  height = 300,
  animationDelay = 0.3,
  highlightColor = 'rgba(255, 0, 0, 0.8)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const animationFrameRef = useRef<number>();
  const timeRef = useRef<number>(0);
  
  // Initialize neural network
  useEffect(() => {
    if (!isVisible) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const width = canvas.width;
    const neuronRadius = 6;
    const layerSpacing = width / (layers.length + 1);
    
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];
    
    // Create neurons for each layer
    layers.forEach((neuronCount, layerIndex) => {
      const layerX = layerSpacing * (layerIndex + 1);
      const layerHeight = height - 80; // Leave space for padding
      const neuronSpacing = layerHeight / (neuronCount + 1);
      
      for (let i = 0; i < neuronCount; i++) {
        const neuron: Neuron = {
          x: layerX,
          y: neuronSpacing * (i + 1) + 40, // Add padding
          radius: neuronRadius,
          value: Math.random(),
          connections: []
        };
        
        newNeurons.push(neuron);
        
        // Connect to previous layer
        if (layerIndex > 0) {
          const prevLayerStartIndex = layers.slice(0, layerIndex - 1).reduce((sum, count) => sum + count, 0);
          const prevLayerEndIndex = prevLayerStartIndex + layers[layerIndex - 1];
          
          for (let j = prevLayerStartIndex; j < prevLayerEndIndex; j++) {
            const connection: Connection = {
              from: newNeurons[j],
              to: neuron,
              weight: Math.random() * 2 - 1 // -1 to 1
            };
            
            newConnections.push(connection);
            newNeurons[j].connections.push(connection);
          }
        }
      }
    });
    
    setNeurons(newNeurons);
    setConnections(newConnections);
    
    // Start animation
    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp;
      const elapsed = timestamp - timeRef.current;
      
      // Update neuron values
      newNeurons.forEach(neuron => {
        // Oscillate neuron values
        neuron.value = 0.5 + 0.5 * Math.sin(elapsed / 1000 + neuron.x + neuron.y);
      });
      
      drawNetwork(canvas, newNeurons, newConnections, highlightColor);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, layers, height, highlightColor]);
  
  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = height;
      
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
      
      <div className="relative w-full">
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

// Helper function to draw the neural network
const drawNetwork = (
  canvas: HTMLCanvasElement,
  neurons: Neuron[],
  connections: Connection[],
  highlightColor: string
) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw connections
  connections.forEach(connection => {
    const { from, to, weight } = connection;
    
    // Calculate connection strength based on neuron values and weight
    const strength = from.value * Math.abs(weight);
    
    // Draw connection line
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    
    // Line style based on weight (positive = red, negative = blue)
    const alpha = 0.1 + strength * 0.5;
    if (weight > 0) {
      ctx.strokeStyle = `rgba(255, 0, 0, ${alpha})`;
    } else {
      ctx.strokeStyle = `rgba(0, 100, 255, ${alpha})`;
    }
    
    ctx.lineWidth = 1 + strength;
    ctx.stroke();
    
    // Animate data flow along connection
    const flowPosition = (Date.now() % 2000) / 2000;
    const flowX = from.x + (to.x - from.x) * flowPosition;
    const flowY = from.y + (to.y - from.y) * flowPosition;
    
    if (strength > 0.5) {
      ctx.beginPath();
      ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
      ctx.fillStyle = highlightColor;
      ctx.fill();
    }
  });
  
  // Draw neurons
  neurons.forEach(neuron => {
    // Neuron body
    ctx.beginPath();
    ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2);
    
    // Gradient fill based on neuron value
    const gradient = ctx.createRadialGradient(
      neuron.x, neuron.y, 0,
      neuron.x, neuron.y, neuron.radius * 2
    );
    
    const alpha = 0.3 + neuron.value * 0.7;
    gradient.addColorStop(0, `rgba(255, 0, 0, ${alpha})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Neuron border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // Neuron glow effect based on activation
    if (neuron.value > 0.7) {
      ctx.beginPath();
      ctx.arc(neuron.x, neuron.y, neuron.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 0, 0, ${(neuron.value - 0.7) / 0.3 * 0.2})`;
      ctx.fill();
    }
  });
};

export default NeuralNetworkAnimation;
