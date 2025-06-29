import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  Mail, 
  MessageSquare, 
  Database, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Settings,
  Zap,
  Target,
  BarChart3,
  Trash2,
  Copy,
  Edit3,
  Save
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  position: { x: number; y: number };
  connections: string[];
}

interface WorkflowExecution {
  nodeId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  timestamp: number;
}

const LiveWorkflowBuilder: React.FC = () => {
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'trigger-1',
      type: 'trigger',
      title: 'New Lead Captured',
      description: 'When a new lead fills out contact form',
      icon: Users,
      color: 'bg-green-500',
      position: { x: 50, y: 100 },
      connections: ['action-1']
    },
    {
      id: 'action-1',
      type: 'action',
      title: 'Send Welcome Email',
      description: 'Automatically send personalized welcome email',
      icon: Mail,
      color: 'bg-blue-500',
      position: { x: 300, y: 100 },
      connections: ['delay-1']
    },
    {
      id: 'delay-1',
      type: 'delay',
      title: 'Wait 2 Days',
      description: 'Delay before next action',
      icon: Clock,
      color: 'bg-yellow-500',
      position: { x: 550, y: 100 },
      connections: ['action-2']
    },
    {
      id: 'action-2',
      type: 'action',
      title: 'Send Follow-up',
      description: 'Send follow-up email with resources',
      icon: MessageSquare,
      color: 'bg-purple-500',
      position: { x: 800, y: 100 },
      connections: []
    }
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [execution, setExecution] = useState<WorkflowExecution[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);

  const availableNodes = [
    { type: 'trigger', title: 'Form Submission', icon: FileText, color: 'bg-green-500' },
    { type: 'trigger', title: 'Email Opened', icon: Mail, color: 'bg-green-600' },
    { type: 'action', title: 'Send Email', icon: Mail, color: 'bg-blue-500' },
    { type: 'action', title: 'Send SMS', icon: MessageSquare, color: 'bg-blue-600' },
    { type: 'action', title: 'Update Database', icon: Database, color: 'bg-indigo-500' },
    { type: 'condition', title: 'If/Then Logic', icon: Target, color: 'bg-orange-500' },
    { type: 'delay', title: 'Wait Period', icon: Clock, color: 'bg-yellow-500' }
  ];

  const runWorkflow = async () => {
    setIsRunning(true);
    setExecution([]);

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      
      // Add to execution queue
      setExecution(prev => [...prev, {
        nodeId: node.id,
        status: 'running',
        timestamp: Date.now()
      }]);

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mark as completed
      setExecution(prev => prev.map(exec => 
        exec.nodeId === node.id 
          ? { ...exec, status: 'completed' }
          : exec
      ));
    }

    setIsRunning(false);
  };

  const addNode = (nodeType: any) => {
    const newNode: WorkflowNode = {
      id: `${nodeType.type}-${Date.now()}`,
      type: nodeType.type,
      title: nodeType.title,
      description: `New ${nodeType.title} node`,
      icon: nodeType.icon,
      color: nodeType.color,
      position: { x: 100 + Math.random() * 400, y: 200 + Math.random() * 200 },
      connections: []
    };

    setNodes(prev => [...prev, newNode]);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setSelectedNode(null);
  };

  const getNodeStatus = (nodeId: string) => {
    const exec = execution.find(e => e.nodeId === nodeId);
    return exec?.status || 'pending';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'border-yellow-400 shadow-yellow-400/50';
      case 'completed': return 'border-green-400 shadow-green-400/50';
      case 'failed': return 'border-red-400 shadow-red-400/50';
      default: return 'border-gray-600';
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
            <h3 className="text-2xl font-bold text-white mb-2">⚡ Live Workflow Builder Demo</h3>
            <p className="text-gray-400">Drag, drop, and connect automation nodes - see our business automation capabilities in action!</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={runWorkflow}
              disabled={isRunning}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isRunning 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Workflow'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Workflow Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Nodes', value: nodes.length, icon: Zap, color: 'text-blue-400' },
            { label: 'Triggers', value: nodes.filter(n => n.type === 'trigger').length, icon: Target, color: 'text-green-400' },
            { label: 'Actions', value: nodes.filter(n => n.type === 'action').length, icon: Settings, color: 'text-purple-400' },
            { label: 'Success Rate', value: '98.5%', icon: BarChart3, color: 'text-yellow-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-black/30 p-3 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Node Palette */}
        <div className="lg:col-span-1">
          <h4 className="text-lg font-semibold text-white mb-4">Available Nodes</h4>
          <div className="space-y-2">
            {availableNodes.map((nodeType, index) => (
              <motion.button
                key={index}
                onClick={() => addNode(nodeType)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 p-3 bg-black/30 border border-white/10 rounded-lg hover:border-white/20 transition-colors text-left"
              >
                <div className={`w-8 h-8 ${nodeType.color} rounded flex items-center justify-center`}>
                  <nodeType.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{nodeType.title}</p>
                  <p className="text-gray-400 text-xs capitalize">{nodeType.type}</p>
                </div>
                <Plus className="w-4 h-4 text-gray-400 ml-auto" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Workflow Canvas */}
        <div className="lg:col-span-3">
          <div className="bg-black/30 border border-white/10 rounded-lg p-6 min-h-96 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-12 grid-rows-8 h-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-600" />
                ))}
              </div>
            </div>

            {/* Workflow Nodes */}
            <div className="relative">
              {nodes.map((node, index) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`absolute bg-black/50 border-2 ${getStatusColor(getNodeStatus(node.id))} rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all min-w-48`}
                  style={{ 
                    left: node.position.x, 
                    top: node.position.y,
                    boxShadow: getNodeStatus(node.id) === 'running' ? '0 0 20px rgba(255, 255, 0, 0.3)' : undefined
                  }}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 ${node.color} rounded flex items-center justify-center`}>
                      <node.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-medium text-sm">{node.title}</h5>
                      <p className="text-gray-400 text-xs">{node.description}</p>
                    </div>
                    {selectedNode === node.id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNode(node.id);
                        }}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    {getNodeStatus(node.id) === 'running' && (
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                        <span className="text-yellow-400 text-xs">Running</span>
                      </div>
                    )}
                    {getNodeStatus(node.id) === 'completed' && (
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs">Completed</span>
                      </div>
                    )}
                    {getNodeStatus(node.id) === 'pending' && (
                      <span className="text-gray-400 text-xs">Ready</span>
                    )}
                  </div>

                  {/* Connection Points */}
                  {node.connections.length > 0 && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                        <ArrowRight className="w-2 h-2 text-white" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Connection Lines */}
              <svg className="absolute inset-0 pointer-events-none">
                {nodes.map(node => 
                  node.connections.map(connectionId => {
                    const targetNode = nodes.find(n => n.id === connectionId);
                    if (!targetNode) return null;

                    return (
                      <line
                        key={`${node.id}-${connectionId}`}
                        x1={node.position.x + 192} // node width
                        y1={node.position.y + 40} // node height / 2
                        x2={targetNode.position.x}
                        y2={targetNode.position.y + 40}
                        stroke="#ef4444"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    );
                  })
                )}
              </svg>
            </div>
          </div>

          {/* Execution Log */}
          {execution.length > 0 && (
            <div className="mt-4 bg-black/30 border border-white/10 rounded-lg p-4">
              <h5 className="text-white font-medium mb-3">Execution Log</h5>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {execution.map((exec, index) => {
                  const node = nodes.find(n => n.id === exec.nodeId);
                  return (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <div className={`w-2 h-2 rounded-full ${
                        exec.status === 'running' ? 'bg-yellow-400 animate-pulse' :
                        exec.status === 'completed' ? 'bg-green-400' : 'bg-gray-400'
                      }`} />
                      <span className="text-gray-300">{node?.title}</span>
                      <span className={`ml-auto ${
                        exec.status === 'running' ? 'text-yellow-400' :
                        exec.status === 'completed' ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {exec.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-lg border border-red-500/20">
        <p className="text-sm text-gray-300">
          <strong className="text-red-400">⚡ This is what we build:</strong> Drag-and-drop workflow builders, 
          business process automation, real-time execution monitoring, and custom automation solutions. Try adding nodes and running the workflow!
        </p>
      </div>
    </motion.div>
  );
};

export default LiveWorkflowBuilder;
