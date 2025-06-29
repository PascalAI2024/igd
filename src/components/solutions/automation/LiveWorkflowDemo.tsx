import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  ArrowRight,
  Mail,
  Database,
  FileText,
  Users,
  AlertCircle,
  Zap,
  BarChart3
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  duration: number; // seconds
  status: 'pending' | 'running' | 'completed' | 'error';
  details: string[];
}

interface WorkflowMetrics {
  totalSteps: number;
  completedSteps: number;
  timeSaved: string;
  errorRate: string;
  efficiency: string;
}

const LiveWorkflowDemo: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [metrics, setMetrics] = useState<WorkflowMetrics>({
    totalSteps: 6,
    completedSteps: 0,
    timeSaved: '0 min',
    errorRate: '0%',
    efficiency: '0%'
  });

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'trigger',
      name: 'New Lead Detected',
      description: 'System detects new form submission',
      icon: Users,
      duration: 1,
      status: 'pending',
      details: ['Form validation', 'Data extraction', 'Lead scoring']
    },
    {
      id: 'data-processing',
      name: 'Data Processing',
      description: 'Extract and validate lead information',
      icon: Database,
      duration: 2,
      status: 'pending',
      details: ['Clean data format', 'Duplicate check', 'Enrichment']
    },
    {
      id: 'crm-update',
      name: 'CRM Integration',
      description: 'Add lead to CRM system',
      icon: FileText,
      duration: 1.5,
      status: 'pending',
      details: ['Create contact', 'Assign to sales rep', 'Set follow-up tasks']
    },
    {
      id: 'email-sequence',
      name: 'Welcome Email',
      description: 'Send personalized welcome email',
      icon: Mail,
      duration: 1,
      status: 'pending',
      details: ['Template selection', 'Personalization', 'Delivery tracking']
    },
    {
      id: 'notification',
      name: 'Team Notification',
      description: 'Notify sales team of new lead',
      icon: AlertCircle,
      duration: 0.5,
      status: 'pending',
      details: ['Slack notification', 'Email alert', 'Dashboard update']
    },
    {
      id: 'analytics',
      name: 'Analytics Update',
      description: 'Update conversion metrics',
      icon: BarChart3,
      duration: 1,
      status: 'pending',
      details: ['Lead source tracking', 'Conversion funnel', 'ROI calculation']
    }
  ];

  const [steps, setSteps] = useState(workflowSteps);

  // Run workflow automation
  const runWorkflow = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setCurrentStep(0);
    
    // Reset all steps
    setSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
    setMetrics(prev => ({ ...prev, completedSteps: 0 }));

    // Execute each step
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      
      // Mark current step as running
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'running' } : step
      ));

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, steps[i].duration * 1000));

      // Mark step as completed
      setSteps(prev => prev.map((step, index) => 
        index === i ? { ...step, status: 'completed' } : step
      ));

      // Update metrics
      setMetrics(prev => ({
        ...prev,
        completedSteps: i + 1,
        timeSaved: `${((i + 1) * 5).toFixed(0)} min`,
        errorRate: '0.1%',
        efficiency: `${(((i + 1) / steps.length) * 100).toFixed(0)}%`
      }));
    }

    setIsRunning(false);
  };

  const resetWorkflow = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSteps(workflowSteps);
    setMetrics({
      totalSteps: 6,
      completedSteps: 0,
      timeSaved: '0 min',
      errorRate: '0%',
      efficiency: '0%'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'border-yellow-400 bg-yellow-400/10';
      case 'completed': return 'border-green-400 bg-green-400/10';
      case 'error': return 'border-red-400 bg-red-400/10';
      default: return 'border-gray-600 bg-gray-600/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <div className="w-4 h-4 rounded-full border-2 border-gray-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
    >
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">🔄 Live Workflow Automation Demo</h3>
            <p className="text-gray-400">Watch a real automation workflow in action - from trigger to completion</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={runWorkflow}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                isRunning 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Running...' : 'Start Workflow'}
            </button>
            <button
              onClick={resetWorkflow}
              className="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Workflow Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Steps Completed', value: `${metrics.completedSteps}/${metrics.totalSteps}`, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Time Saved', value: metrics.timeSaved, icon: Clock, color: 'text-blue-400' },
            { label: 'Error Rate', value: metrics.errorRate, icon: AlertCircle, color: 'text-purple-400' },
            { label: 'Efficiency', value: metrics.efficiency, icon: Zap, color: 'text-yellow-400' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 p-3 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">{metric.label}</p>
                  <p className={`text-lg font-bold ${metric.color}`}>{metric.value}</p>
                </div>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Steps */}
        <div className="lg:col-span-2">
          <h4 className="text-lg font-semibold text-white mb-4">Automation Workflow</h4>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border transition-all ${getStatusColor(step.status)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                      {getStatusIcon(step.status)}
                    </div>
                    <step.icon className="w-6 h-6 text-red-400" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-white font-medium">{step.name}</h5>
                      <span className="text-gray-400 text-sm">{step.duration}s</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{step.description}</p>
                    
                    {/* Step Details */}
                    <div className="flex flex-wrap gap-1">
                      {step.details.map((detail, detailIndex) => (
                        <span
                          key={detailIndex}
                          className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {/* Progress Bar for Running Step */}
                {step.status === 'running' && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <motion.div
                        className="bg-yellow-400 h-1 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: step.duration }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Workflow Status */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 h-full">
            <h4 className="text-white font-semibold mb-4">Workflow Status</h4>
            
            {!isRunning && metrics.completedSteps === 0 ? (
              <div className="text-center py-8">
                <Play className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400 mb-2">Ready to Start</p>
                <p className="text-gray-500 text-sm">Click "Start Workflow" to begin automation</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Current Step */}
                {isRunning && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <h5 className="text-yellow-400 font-semibold mb-1">Currently Processing</h5>
                    <p className="text-white text-sm">{steps[currentStep]?.name}</p>
                    <p className="text-gray-400 text-xs">{steps[currentStep]?.description}</p>
                  </div>
                )}

                {/* Progress Overview */}
                <div>
                  <h5 className="text-white font-semibold mb-2">Progress Overview</h5>
                  <div className="space-y-2">
                    {steps.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-2">
                        <div className="w-4 h-4">
                          {getStatusIcon(step.status)}
                        </div>
                        <span className={`text-sm ${
                          step.status === 'completed' ? 'text-green-400' :
                          step.status === 'running' ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion Status */}
                {metrics.completedSteps === metrics.totalSteps && !isRunning && (
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <h5 className="text-green-400 font-semibold">Workflow Completed!</h5>
                    </div>
                    <p className="text-gray-300 text-sm">All automation steps executed successfully</p>
                  </div>
                )}

                {/* Benefits */}
                <div>
                  <h5 className="text-white font-semibold mb-2">Automation Benefits</h5>
                  <div className="space-y-1">
                    {[
                      'Zero manual intervention required',
                      '99.9% accuracy rate',
                      'Instant response time',
                      'Scalable to any volume',
                      '24/7 operation capability'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-red-400" />
                        <span className="text-gray-300 text-xs">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">🔄 Workflow Demo:</strong> This simulation shows how our automation 
          workflows execute in real-time. Each step represents actual processes we automate for our clients!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveWorkflowDemo;
