import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Clock, 
  Users, 
  FileText, 
  Mail, 
  Database,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Play,
  Pause,
  Settings,
  Target,
  DollarSign,
  TrendingUp
} from 'lucide-react';

interface AutomationProcess {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  category: 'data' | 'communication' | 'workflow' | 'reporting';
  timesSaved: number; // hours per week
  complexity: 'simple' | 'medium' | 'complex';
  cost: number;
  features: string[];
}

interface AutomationResults {
  totalTimeSaved: number;
  weeklyCostSavings: number;
  annualSavings: number;
  roi: number;
  paybackPeriod: number;
  efficiencyGain: number;
}

const ProcessAutomationBuilder: React.FC = () => {
  const [selectedProcesses, setSelectedProcesses] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<AutomationResults>({
    totalTimeSaved: 0,
    weeklyCostSavings: 0,
    annualSavings: 0,
    roi: 0,
    paybackPeriod: 0,
    efficiencyGain: 0
  });

  const automationProcesses: AutomationProcess[] = [
    {
      id: 'email-automation',
      name: 'Email Marketing Automation',
      description: 'Automated email sequences, follow-ups, and customer nurturing',
      icon: Mail,
      category: 'communication',
      timesSaved: 8,
      complexity: 'medium',
      cost: 1200,
      features: ['Drip campaigns', 'Behavioral triggers', 'A/B testing', 'Analytics']
    },
    {
      id: 'data-entry',
      name: 'Data Entry Automation',
      description: 'Automated data collection, processing, and entry into systems',
      icon: Database,
      category: 'data',
      timesSaved: 15,
      complexity: 'simple',
      cost: 800,
      features: ['Form processing', 'Data validation', 'System integration', 'Error handling']
    },
    {
      id: 'report-generation',
      name: 'Report Generation',
      description: 'Automated report creation and distribution',
      icon: BarChart3,
      category: 'reporting',
      timesSaved: 6,
      complexity: 'medium',
      cost: 1500,
      features: ['Custom templates', 'Scheduled delivery', 'Data visualization', 'Multi-format export']
    },
    {
      id: 'invoice-processing',
      name: 'Invoice Processing',
      description: 'Automated invoice creation, sending, and payment tracking',
      icon: FileText,
      category: 'workflow',
      timesSaved: 10,
      complexity: 'medium',
      cost: 1800,
      features: ['Auto-generation', 'Payment tracking', 'Reminders', 'Integration']
    },
    {
      id: 'customer-onboarding',
      name: 'Customer Onboarding',
      description: 'Automated welcome sequences and account setup',
      icon: Users,
      category: 'workflow',
      timesSaved: 12,
      complexity: 'complex',
      cost: 2200,
      features: ['Welcome flows', 'Account setup', 'Document collection', 'Progress tracking']
    },
    {
      id: 'social-media',
      name: 'Social Media Management',
      description: 'Automated posting, engagement, and content scheduling',
      icon: Target,
      category: 'communication',
      timesSaved: 5,
      complexity: 'simple',
      cost: 900,
      features: ['Content scheduling', 'Auto-posting', 'Engagement tracking', 'Analytics']
    }
  ];

  // Calculate automation results
  useEffect(() => {
    const selectedAutomations = automationProcesses.filter(process => 
      selectedProcesses.includes(process.id)
    );

    const totalTimeSaved = selectedAutomations.reduce((total, process) => 
      total + process.timesSaved, 0
    );

    const totalCost = selectedAutomations.reduce((total, process) => 
      total + process.cost, 0
    );

    const hourlyRate = 25; // Average hourly cost for manual work
    const weeklyCostSavings = totalTimeSaved * hourlyRate;
    const annualSavings = weeklyCostSavings * 52;
    const roi = totalCost > 0 ? ((annualSavings - totalCost) / totalCost) * 100 : 0;
    const paybackPeriod = weeklyCostSavings > 0 ? totalCost / weeklyCostSavings : 0;
    const efficiencyGain = totalTimeSaved > 0 ? (totalTimeSaved / 40) * 100 : 0; // Assuming 40-hour work week

    setResults({
      totalTimeSaved,
      weeklyCostSavings,
      annualSavings,
      roi,
      paybackPeriod,
      efficiencyGain
    });
  }, [selectedProcesses]);

  const toggleProcess = (processId: string) => {
    setSelectedProcesses(prev => 
      prev.includes(processId)
        ? prev.filter(id => id !== processId)
        : [...prev, processId]
    );
  };

  const runAutomationDemo = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'data': return 'border-blue-500/40 bg-blue-500/10';
      case 'communication': return 'border-green-500/40 bg-green-500/10';
      case 'workflow': return 'border-purple-500/40 bg-purple-500/10';
      case 'reporting': return 'border-yellow-500/40 bg-yellow-500/10';
      default: return 'border-gray-500/40 bg-gray-500/10';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'complex': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
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
            <h3 className="text-2xl font-bold text-white mb-2">⚡ Interactive Process Automation Builder</h3>
            <p className="text-gray-400">Select processes to automate and see real-time ROI calculations</p>
          </div>
          <button
            onClick={runAutomationDemo}
            disabled={isRunning || selectedProcesses.length === 0}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              isRunning || selectedProcesses.length === 0
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRunning ? 'Running...' : 'Demo Automation'}
          </button>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Time Saved', value: `${results.totalTimeSaved} hrs/week`, icon: Clock, color: 'text-green-400' },
            { label: 'Weekly Savings', value: formatCurrency(results.weeklyCostSavings), icon: DollarSign, color: 'text-blue-400' },
            { label: 'Annual ROI', value: `${results.roi.toFixed(0)}%`, icon: TrendingUp, color: 'text-purple-400' },
            { label: 'Efficiency Gain', value: `${results.efficiencyGain.toFixed(1)}%`, icon: Zap, color: 'text-yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 p-3 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs">{stat.label}</p>
                  <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Process Selection */}
        <div className="lg:col-span-2">
          <h4 className="text-lg font-semibold text-white mb-4">Available Automation Processes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationProcesses.map((process, index) => {
              const isSelected = selectedProcesses.includes(process.id);
              
              return (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleProcess(process.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all relative ${
                    isSelected
                      ? 'border-red-500/40 bg-red-500/10'
                      : getCategoryColor(process.category)
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <process.icon className="w-6 h-6 text-red-400" />
                      <div>
                        <h5 className="text-white font-medium text-sm">{process.name}</h5>
                        <p className="text-gray-400 text-xs capitalize">{process.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{formatCurrency(process.cost)}</p>
                      <p className={`text-xs ${getComplexityColor(process.complexity)}`}>
                        {process.complexity}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-300 text-xs mb-3">{process.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-green-400 text-xs font-medium">
                      ⏱️ Saves {process.timesSaved} hrs/week
                    </span>
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <CheckCircle className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </div>

                  {isRunning && isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-yellow-400/20 rounded-lg border-2 border-yellow-400"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ROI Analysis */}
        <div className="lg:col-span-1">
          <div className="bg-black/30 border border-white/10 rounded-lg p-4 h-full">
            <h4 className="text-white font-semibold mb-4">ROI Analysis</h4>
            
            {selectedProcesses.length === 0 ? (
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                <p className="text-gray-400">Select processes to see ROI analysis</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Selected Processes */}
                <div>
                  <h5 className="text-gray-400 text-sm mb-2">Selected Processes</h5>
                  <div className="space-y-2">
                    {selectedProcesses.map(processId => {
                      const process = automationProcesses.find(p => p.id === processId);
                      if (!process) return null;
                      
                      return (
                        <div key={processId} className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <div className="flex items-center gap-2">
                            <process.icon className="w-4 h-4 text-red-400" />
                            <span className="text-white text-sm">{process.name}</span>
                          </div>
                          <span className="text-green-400 text-xs">{process.timesSaved}h</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Investment Summary */}
                <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 border border-red-500/20 rounded-lg p-3">
                  <h5 className="text-white font-semibold mb-2">Investment Summary</h5>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Investment:</span>
                      <span className="text-white">
                        {formatCurrency(selectedProcesses.reduce((total, id) => {
                          const process = automationProcesses.find(p => p.id === id);
                          return total + (process?.cost || 0);
                        }, 0))}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Annual Savings:</span>
                      <span className="text-green-400">{formatCurrency(results.annualSavings)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payback Period:</span>
                      <span className="text-blue-400">{results.paybackPeriod.toFixed(1)} weeks</span>
                    </div>
                    <div className="flex justify-between font-bold border-t border-white/10 pt-1">
                      <span className="text-gray-400">ROI (Year 1):</span>
                      <span className="text-green-400">{results.roi.toFixed(0)}%</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h5 className="text-white font-semibold mb-2">Key Benefits</h5>
                  <div className="space-y-1">
                    {[
                      'Eliminate manual repetitive tasks',
                      'Reduce human error by 95%',
                      'Improve process consistency',
                      '24/7 automated operations',
                      'Real-time monitoring & alerts'
                    ].map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-400" />
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
          <strong className="text-red-400">⚡ Automation Builder:</strong> Select the processes you want to automate 
          and see real-time ROI calculations. Click "Demo Automation" to see the processes in action!
        </p>
      </div>
    </motion.div>
  );
};

export default ProcessAutomationBuilder;
