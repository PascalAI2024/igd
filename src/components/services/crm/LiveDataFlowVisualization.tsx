import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  DollarSign,
  TrendingUp,
  UserPlus,
  Target,
  Award,
  BarChart3,
  Activity
} from 'lucide-react';

interface DataPoint {
  id: string;
  type: 'lead' | 'contact' | 'opportunity' | 'customer' | 'revenue';
  value: string;
  timestamp: Date;
  path: number;
}

interface Stage {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  count: number;
  conversion: number;
}

const stages: Stage[] = [
  { 
    id: 'lead', 
    name: 'Leads', 
    icon: UserPlus, 
    color: '#60a5fa',
    count: 0,
    conversion: 100
  },
  { 
    id: 'contact', 
    name: 'Contacted', 
    icon: MessageSquare, 
    color: '#34d399',
    count: 0,
    conversion: 75
  },
  { 
    id: 'opportunity', 
    name: 'Opportunities', 
    icon: Target, 
    color: '#fbbf24',
    count: 0,
    conversion: 40
  },
  { 
    id: 'customer', 
    name: 'Customers', 
    icon: Award, 
    color: '#a78bfa',
    count: 0,
    conversion: 25
  },
  { 
    id: 'revenue', 
    name: 'Revenue', 
    icon: DollarSign, 
    color: '#10b981',
    count: 0,
    conversion: 100
  }
];

const LiveDataFlowVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [stageData, setStageData] = useState(stages);
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const animationRef = useRef<number>();
  const pathRefs = useRef<SVGPathElement[]>([]);

  // Generate random data point
  const generateDataPoint = (): DataPoint => {
    const types: DataPoint['type'][] = ['lead', 'contact', 'opportunity', 'customer', 'revenue'];
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson'];
    const companies = ['Tech Corp', 'Digital Solutions', 'Cloud Systems', 'Data Analytics Inc', 'Smart Software'];
    
    return {
      id: `data-${Date.now()}-${Math.random()}`,
      type: 'lead',
      value: `${names[Math.floor(Math.random() * names.length)]} - ${companies[Math.floor(Math.random() * companies.length)]}`,
      timestamp: new Date(),
      path: Math.floor(Math.random() * 3) // Three possible paths
    };
  };

  // Create curved paths between stages
  const createPath = (fromIndex: number, toIndex: number, pathIndex: number): string => {
    const startX = 150 + fromIndex * 200;
    const endX = 150 + toIndex * 200;
    const startY = 200;
    const endY = 200;
    
    // Add curve based on path index
    const curveOffset = (pathIndex - 1) * 40;
    const controlY = 200 + curveOffset;
    
    return `M ${startX} ${startY} Q ${(startX + endX) / 2} ${controlY} ${endX} ${endY}`;
  };

  // Animate data point along path
  const animateDataPoint = (dataPoint: DataPoint) => {
    const dot = document.createElement('div');
    dot.className = 'absolute w-3 h-3 rounded-full pointer-events-none';
    dot.style.backgroundColor = stages[0].color;
    dot.style.boxShadow = `0 0 10px ${stages[0].color}`;
    
    if (canvasRef.current) {
      canvasRef.current.appendChild(dot);
    }

    let currentStage = 0;
    const timeline = gsap.timeline({
      onComplete: () => {
        dot.remove();
        setDataPoints(prev => prev.filter(dp => dp.id !== dataPoint.id));
      }
    });

    // Animate through each stage
    stages.forEach((stage, index) => {
      if (index === 0) {
        // Start position
        timeline.set(dot, {
          x: 150 + index * 200 - 6,
          y: 194,
          scale: 0
        });
        
        timeline.to(dot, {
          scale: 1,
          duration: 0.3,
          ease: 'back.out(2)'
        });
      } else {
        // Check conversion rate
        const shouldContinue = Math.random() * 100 < stages[index - 1].conversion;
        
        if (shouldContinue) {
          const path = pathRefs.current[index - 1];
          if (path) {
            const pathLength = path.getTotalLength();
            
            timeline.to(dot, {
              duration: 1.5,
              ease: 'none',
              onUpdate: function() {
                const progress = this.progress();
                const point = path.getPointAtLength(progress * pathLength);
                gsap.set(dot, {
                  x: point.x - 6,
                  y: point.y - 6
                });
              },
              onStart: () => {
                // Update stage color
                gsap.to(dot, {
                  backgroundColor: stages[index].color,
                  boxShadow: `0 0 10px ${stages[index].color}`,
                  duration: 0.3
                });
              },
              onComplete: () => {
                // Update stage count
                setStageData(prev => prev.map((s, i) => 
                  i === index ? { ...s, count: s.count + 1 } : s
                ));
                
                // Pulse effect on arrival
                const stageElement = document.querySelector(`#stage-${index}`);
                if (stageElement) {
                  gsap.to(stageElement, {
                    scale: 1.1,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power2.inOut'
                  });
                }
              }
            });
          }
        } else {
          // Data point fails to convert
          timeline.to(dot, {
            y: '+=100',
            opacity: 0,
            scale: 0,
            duration: 0.5,
            ease: 'power2.in'
          });
          return false; // Stop the timeline
        }
      }
    });

    return timeline;
  };

  // Start simulation
  const startSimulation = () => {
    setIsSimulating(true);
    
    const simulate = () => {
      // Generate new data point
      const newDataPoint = generateDataPoint();
      setDataPoints(prev => [...prev, newDataPoint]);
      animateDataPoint(newDataPoint);
      
      // Schedule next data point
      animationRef.current = window.setTimeout(simulate, Math.random() * 2000 + 1000);
    };
    
    simulate();
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsSimulating(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  // Initialize animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = gsap.context(() => {
      // Animate stages on load
      gsap.fromTo('.stage-node',
        {
          scale: 0,
          opacity: 0,
          rotationY: -90
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.7)'
        }
      );

      // Animate paths
      pathRefs.current.forEach((path, index) => {
        if (path) {
          const length = path.getTotalLength();
          gsap.fromTo(path,
            {
              strokeDasharray: length,
              strokeDashoffset: length
            },
            {
              strokeDashoffset: 0,
              duration: 1,
              delay: 0.1 * index,
              ease: 'power2.inOut'
            }
          );
        }
      });

      // Floating animation for metrics
      gsap.to('.metric-card', {
        y: 'random(-10, 10)',
        duration: 'random(2, 3)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 0.5,
          from: 'random'
        }
      });
    }, canvasRef);

    return () => {
      ctx.revert();
      stopSimulation();
    };
  }, []);

  // Calculate funnel metrics
  const calculateMetrics = () => {
    const totalLeads = stageData[0].count || 1;
    const totalCustomers = stageData[3].count;
    const totalRevenue = stageData[4].count * 2500; // Average deal size
    const conversionRate = totalLeads > 0 ? (totalCustomers / totalLeads * 100).toFixed(1) : '0';
    
    return {
      totalLeads,
      totalCustomers,
      totalRevenue,
      conversionRate
    };
  };

  const metrics = calculateMetrics();

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-4">Live CRM Data Flow</h2>
        <p className="text-lg text-gray-400 mb-6">
          Watch how leads flow through your sales pipeline in real-time
        </p>
        
        {/* Controls */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={isSimulating ? stopSimulation : startSimulation}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300"
          >
            <Activity className="w-5 h-5" />
            {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
          </button>
          
          <button
            onClick={() => setStageData(stages.map(s => ({ ...s, count: 0 })))}
            className="magnetic-target flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            Reset Metrics
          </button>
        </div>
      </div>

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="metric-card bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20"
        >
          <div className="flex items-center justify-between mb-2">
            <User className="w-8 h-8 text-blue-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">{metrics.totalLeads}</div>
          <div className="text-sm text-gray-400">Total Leads</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8 text-purple-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">{metrics.totalCustomers}</div>
          <div className="text-sm text-gray-400">Customers Won</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/20"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-8 h-8 text-green-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">${metrics.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-gray-400">Revenue Generated</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20"
        >
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-orange-500" />
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-3xl font-bold text-white">{metrics.conversionRate}%</div>
          <div className="text-sm text-gray-400">Conversion Rate</div>
        </motion.div>
      </div>

      {/* Main Visualization */}
      <div 
        ref={canvasRef}
        className="relative w-full h-[400px] bg-black/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5" />
        
        {/* SVG for paths */}
        <svg ref={svgRef} className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Draw paths between stages */}
          {stages.slice(0, -1).map((_, index) => (
            <g key={index}>
              {[0, 1, 2].map(pathIndex => (
                <path
                  key={pathIndex}
                  ref={el => { if (el && pathIndex === 1) pathRefs.current[index] = el; }}
                  d={createPath(index, index + 1, pathIndex)}
                  stroke={pathIndex === 1 ? '#ffffff' : '#ffffff'}
                  strokeWidth={pathIndex === 1 ? '2' : '1'}
                  fill="none"
                  opacity={pathIndex === 1 ? 0.3 : 0.1}
                  strokeDasharray={pathIndex === 1 ? '0' : '5 5'}
                />
              ))}
            </g>
          ))}
        </svg>

        {/* Stage nodes */}
        <div className="absolute inset-0 flex items-center justify-around px-12">
          {stageData.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.id}
                id={`stage-${index}`}
                className="stage-node relative group cursor-pointer"
                onClick={() => setSelectedStage(stage)}
              >
                {/* Connection line effect */}
                <div className="absolute inset-0 scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div 
                    className="w-full h-full rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${stage.color}40 0%, transparent 70%)`
                    }}
                  />
                </div>

                {/* Stage circle */}
                <div 
                  className="relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${stage.color}20, ${stage.color}40)`,
                    border: `2px solid ${stage.color}60`
                  }}
                >
                  <Icon className="w-10 h-10 text-white" />
                  
                  {/* Count badge */}
                  {stage.count > 0 && (
                    <div 
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: stage.color }}
                    >
                      {stage.count}
                    </div>
                  )}
                </div>

                {/* Stage name */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <p className="text-sm font-semibold text-white">{stage.name}</p>
                  <p className="text-xs text-gray-400 text-center">{stage.conversion}%</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active data points indicator */}
        {dataPoints.length > 0 && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-white">{dataPoints.length} Active</span>
          </div>
        )}
      </div>

      {/* Stage Details Modal */}
      <AnimatePresence>
        {selectedStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedStage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-6 max-w-md w-full"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${selectedStage.color}20` }}
                >
                  <selectedStage.icon className="w-8 h-8" style={{ color: selectedStage.color }} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedStage.name}</h3>
                  <p className="text-gray-400">Pipeline Stage</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Count</span>
                    <span className="text-xl font-bold text-white">{selectedStage.count}</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Conversion Rate</span>
                    <span className="text-xl font-bold" style={{ color: selectedStage.color }}>
                      {selectedStage.conversion}%
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Stage Actions</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveDataFlowVisualization;