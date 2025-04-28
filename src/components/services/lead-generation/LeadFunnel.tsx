import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, Target, Zap, LucideIcon, TrendingUp, ChevronRight } from 'lucide-react';
import { useAnimation } from '../../../hooks/useAnimation';
import { AnimationErrorBoundary } from '../../AnimationErrorBoundary';

interface Metric {
  label: string;
  value: number | string;
  rate?: number;
  trend?: string;
}

interface Stage {
  title: string;
  icon: LucideIcon;
  description: string;
  metrics: Metric[];
  color: string;
  details: string[];
}

const stages: Stage[] = [
  {
    title: 'Lead Capture',
    icon: Users,
    description: 'Multi-channel lead acquisition',
    metrics: [
      { label: 'Visitors', value: 10000, trend: '+25%' },
      { label: 'Form Fills', value: 500, trend: '+15%' },
      { label: 'Conversion', value: '5%', rate: 0.05, trend: '+2%' }
    ],
    color: '#22c55e',
    details: [
      'Website Forms',
      'Landing Pages',
      'Social Media',
      'Email Campaigns'
    ]
  },
  {
    title: 'Lead Qualification',
    icon: Filter,
    description: 'Automated lead scoring and filtering',
    metrics: [
      { label: 'Qualified', value: 300, trend: '+20%' },
      { label: 'Score > 80', value: 200, trend: '+18%' },
      { label: 'Quality', value: '60%', rate: 0.60, trend: '+5%' }
    ],
    color: '#3b82f6',
    details: [
      'Behavior Scoring',
      'Demographics',
      'Intent Signals',
      'Engagement Level'
    ]
  },
  {
    title: 'Lead Nurturing',
    icon: Target,
    description: 'Personalized lead nurturing flows',
    metrics: [
      { label: 'Engaged', value: 150, trend: '+30%' },
      { label: 'MQLs', value: 100, trend: '+25%' },
      { label: 'Rate', value: '50%', rate: 0.50, trend: '+8%' }
    ],
    color: '#f59e0b',
    details: [
      'Email Sequences',
      'Content Delivery',
      'Lead Scoring',
      'Engagement Tracking'
    ]
  },
  {
    title: 'Conversion',
    icon: Zap,
    description: 'Converting leads into customers',
    metrics: [
      { label: 'SQLs', value: 75, trend: '+35%' },
      { label: 'Closed', value: 45, trend: '+40%' },
      { label: 'Rate', value: '45%', rate: 0.45, trend: '+12%' }
    ],
    color: '#ef4444',
    details: [
      'Sales Handoff',
      'Deal Closing',
      'Revenue Tracking',
      'Customer Success'
    ]
  }
];

interface Lead {
  x: number;
  y: number;
  stage: number;
  speed: number;
  color: string;
  radius: number;
  nextY: number;
  pulseRadius: number;
  pulseOpacity: number;
}

const LeadFunnel = () => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  // Use our optimized animation hook
  const { canvasRef, fps } = useAnimation((deltaTime) => {
    if (!isAnimating) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw funnel shape with gradient
    const padding = 100;
    const funnelWidth = canvas.width - (padding * 2);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.1)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');

    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(canvas.width - padding, padding);
    ctx.lineTo(canvas.width - padding - funnelWidth/4, canvas.height - padding);
    ctx.lineTo(padding + funnelWidth/4, canvas.height - padding);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.stroke();

    // Draw stage lines with gradients
    stages.forEach((stage, index) => {
      if (index === 0) return;
      const x = padding + (funnelWidth * (index / stages.length));
      const narrowing = (index / stages.length) * (funnelWidth / 2);
      
      const lineGradient = ctx.createLinearGradient(x, padding, x - narrowing/2, canvas.height - padding);
      lineGradient.addColorStop(0, `${stage.color}40`);
      lineGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x - narrowing/2, canvas.height - padding);
      ctx.strokeStyle = lineGradient;
      ctx.stroke();
    });

    // Add new leads with enhanced effects
    if (Math.random() < 0.1) {
      const stage = 0;
      const stageWidth = canvas.width / stages.length;
      const stageX = padding + (stageWidth * stage);
      const funnelNarrow = (stage / (stages.length - 1)) * (funnelWidth / 2);
      const x = stageX + (Math.random() * (funnelWidth - funnelNarrow * 2) - ((funnelWidth - funnelNarrow * 2) / 2));
      
      const lead: Lead = {
        x,
        y: padding,
        stage,
        speed: Math.random() * 2 + 1,
        color: stages[stage].color,
        radius: 3,
        nextY: canvas.height - padding,
        pulseRadius: 0,
        pulseOpacity: 1
      };

      // Update lead position with physics
      const gravity = 0.2;
      lead.speed += gravity * (deltaTime / 16);
      lead.y += lead.speed * (deltaTime / 16);

      // Draw lead with glow effect
      const glowGradient = ctx.createRadialGradient(
        lead.x, lead.y, 0,
        lead.x, lead.y, lead.radius * 3
      );
      glowGradient.addColorStop(0, `${lead.color}80`);
      glowGradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(lead.x, lead.y, lead.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();

      // Draw lead core
      ctx.beginPath();
      ctx.arc(lead.x, lead.y, lead.radius, 0, Math.PI * 2);
      ctx.fillStyle = lead.color;
      ctx.fill();

      // Draw pulse effect
      if (lead.pulseRadius > 0) {
        ctx.beginPath();
        ctx.arc(lead.x, lead.y, lead.pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `${lead.color}${Math.floor(lead.pulseOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.stroke();
        
        lead.pulseRadius += 1;
        lead.pulseOpacity -= 0.02;
      }

      // Check if lead reached target
      if (lead.y >= lead.nextY) {
        const nextStage = stages[lead.stage + 1];
        if (nextStage && Math.random() < (nextStage.metrics[2].rate || 0)) {
          lead.stage++;
          lead.color = stages[lead.stage].color;
          lead.y = padding;
          lead.pulseRadius = 0;
          lead.pulseOpacity = 1;
        }
      }
    }
  }, {
    targetFPS: 60,
    batterySaver: true,
    showError: true,
    onError: (err) => console.error('Lead Funnel Error:', err)
  });

  return (
    <AnimationErrorBoundary>
      <div className="relative min-h-[600px]">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex space-x-4">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
          >
            {isAnimating ? 'Pause' : 'Resume'} Animation
          </button>
        </div>

        {/* Lead Funnel Visualization */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Metrics */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 pt-[400px]">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onHoverStart={() => setHoveredStage(index)}
              onHoverEnd={() => setHoveredStage(null)}
              onClick={() => setExpandedStage(expandedStage === index ? null : index)}
              className="group relative cursor-pointer"
            >
              <motion.div
                className={`relative bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/10 transition-all duration-300
                  ${expandedStage === index ? 'ring-2 ring-red-500/50' : 'hover:border-red-500/20'}`}
                whileHover={{ scale: 1.02 }}
                animate={expandedStage === index ? { y: -10 } : { y: 0 }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: expandedStage === index || hoveredStage === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <motion.div
                        className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg p-2.5"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <stage.icon className="w-full h-full text-white" />
                      </motion.div>
                      <div className="ml-3">
                        <h3 className="text-xl font-semibold text-white">{stage.title}</h3>
                        <p className="text-sm text-gray-400">{stage.description}</p>
                      </div>
                    </div>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                        expandedStage === index ? 'rotate-90' : ''
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {stage.metrics.map(metric => (
                      <div
                        key={metric.label}
                        className="text-center p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="text-lg font-bold text-red-500">{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                        {metric.trend && (
                          <div className="flex items-center justify-center text-xs">
                            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                            <span className="text-green-500">{metric.trend}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {expandedStage === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/10 pt-4"
                      >
                        <div className="grid grid-cols-2 gap-2">
                          {stage.details.map((detail, detailIndex) => (
                            <motion.div
                              key={detail}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: detailIndex * 0.1 }}
                              className="flex items-center space-x-2 text-gray-400"
                            >
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              <span className="text-sm">{detail}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Performance Stats (Development Only) */}
        {import.meta.env.DEV && (
          <div className="absolute top-2 left-2 bg-black/50 rounded p-2 text-xs text-white">
            FPS: {Math.round(fps)}
          </div>
        )}
      </div>
    </AnimationErrorBoundary>
  );
};

export default LeadFunnel;
