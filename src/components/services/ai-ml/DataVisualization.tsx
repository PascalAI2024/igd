import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface DataPoint {
  label: string;
  value: number;
  color: string;
}

interface DataVisualizationProps {
  title: string;
  description: string;
  data: DataPoint[];
  type: 'bar' | 'line' | 'radar';
  height?: number;
  animationDelay?: number;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({
  title,
  description,
  data,
  type,
  height = 300,
  animationDelay = 0.3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Animation effect
  useEffect(() => {
    if (isVisible) {
      let startTime: number;
      const duration = 1000; // 1 second animation
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setAnimationProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [isVisible]);
  
  // Draw visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw based on chart type
    if (type === 'bar') {
      drawBarChart(ctx, data, chartWidth, chartHeight, padding, animationProgress);
    } else if (type === 'line') {
      drawLineChart(ctx, data, chartWidth, chartHeight, padding, animationProgress);
    } else if (type === 'radar') {
      drawRadarChart(ctx, data, canvas.width / 2, canvas.height / 2, Math.min(chartWidth, chartHeight) / 2 - padding, animationProgress);
    }
    
  }, [data, type, animationProgress]);
  
  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = height;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [height]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: animationDelay }}
      onViewportEnter={() => setIsVisible(true)}
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
      
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-300">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Helper functions for drawing charts
const drawBarChart = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  padding: number,
  progress: number
) => {
  const barWidth = width / data.length * 0.6;
  const spacing = width / data.length * 0.4;
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Draw axes
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 1;
  
  // X-axis
  ctx.beginPath();
  ctx.moveTo(padding, height + padding);
  ctx.lineTo(width + padding, height + padding);
  ctx.stroke();
  
  // Y-axis
  ctx.beginPath();
  ctx.moveTo(padding, padding);
  ctx.lineTo(padding, height + padding);
  ctx.stroke();
  
  // Draw bars
  data.forEach((point, index) => {
    const x = padding + (width / data.length) * index + spacing / 2;
    const barHeight = (point.value / maxValue) * height * progress;
    const y = height + padding - barHeight;
    
    // Bar gradient
    const gradient = ctx.createLinearGradient(x, y, x, height + padding);
    gradient.addColorStop(0, point.color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Bar border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.strokeRect(x, y, barWidth, barHeight);
    
    // Label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(point.label, x + barWidth / 2, height + padding + 20);
    
    // Value
    if (progress > 0.7) {
      const valueOpacity = (progress - 0.7) / 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${valueOpacity})`;
      ctx.fillText(point.value.toString(), x + barWidth / 2, y - 10);
    }
  });
};

const drawLineChart = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  width: number,
  height: number,
  padding: number,
  progress: number
) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const pointRadius = 4;
  
  // Draw grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.lineWidth = 1;
  
  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + height - (height / 5) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width + padding, y);
    ctx.stroke();
    
    // Y-axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText((maxValue / 5 * i).toFixed(0), padding - 10, y + 3);
  }
  
  // Draw line
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
  
  // Create gradient for the area under the line
  const gradient = ctx.createLinearGradient(0, padding, 0, height + padding);
  gradient.addColorStop(0, 'rgba(255, 0, 0, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');
  
  const pointsToShow = Math.ceil(data.length * progress);
  
  for (let i = 0; i < pointsToShow; i++) {
    const point = data[i];
    const x = padding + (width / (data.length - 1)) * i;
    const y = padding + height - (point.value / maxValue) * height;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  
  ctx.stroke();
  
  // Fill area under the line
  if (pointsToShow > 1) {
    const lastPoint = data[pointsToShow - 1];
    const lastX = padding + (width / (data.length - 1)) * (pointsToShow - 1);
    const lastY = padding + height - (lastPoint.value / maxValue) * height;
    
    ctx.lineTo(lastX, height + padding);
    ctx.lineTo(padding, height + padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
  }
  
  // Draw points
  for (let i = 0; i < pointsToShow; i++) {
    const point = data[i];
    const x = padding + (width / (data.length - 1)) * i;
    const y = padding + height - (point.value / maxValue) * height;
    
    ctx.beginPath();
    ctx.arc(x, y, pointRadius, 0, Math.PI * 2);
    ctx.fillStyle = point.color;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    // X-axis labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(point.label, x, height + padding + 15);
  }
};

const drawRadarChart = (
  ctx: CanvasRenderingContext2D,
  data: DataPoint[],
  centerX: number,
  centerY: number,
  radius: number,
  progress: number
) => {
  const angleStep = (Math.PI * 2) / data.length;
  
  // Draw background circles
  for (let i = 1; i <= 5; i++) {
    const circleRadius = radius * (i / 5);
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  // Draw axes
  data.forEach((_, index) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });
  
  // Draw data polygon
  ctx.beginPath();
  const maxValue = Math.max(...data.map(d => d.value));
  
  data.forEach((point, index) => {
    const angle = -Math.PI / 2 + angleStep * index;
    const value = point.value / maxValue * radius * progress;
    const x = centerX + Math.cos(angle) * value;
    const y = centerY + Math.sin(angle) * value;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // Draw point
    ctx.fillStyle = point.color;
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const labelX = centerX + Math.cos(angle) * (radius + 20);
    const labelY = centerY + Math.sin(angle) * (radius + 20);
    ctx.fillText(point.label, labelX, labelY);
  });
  
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 0, 0, 0.7)';
  ctx.lineWidth = 2;
  ctx.stroke();
};

export default DataVisualization;
