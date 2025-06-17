import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  Activity, 
  Database, 
  Code, 
  Server, 
  Zap,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Monitor,
  Network,
  Settings,
  Terminal,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  GitBranch,
  Workflow,
  Box,
  Link,
  Plus,
  Minus
} from 'lucide-react';

interface SystemModule {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'active' | 'inactive' | 'updating' | 'error';
  cpu: number;
  memory: number;
  lastUpdate: string;
  dependencies?: string[];
  ports?: number[];
  logs?: string[];
}

interface ComputeNode {
  id: string;
  name: string;
  type: 'input' | 'processor' | 'output' | 'storage' | 'network' | 'ai' | 'security';
  status: 'active' | 'idle' | 'processing' | 'error' | 'deploying';
  position: { x: number; y: number };
  connections: string[];
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
  config: Record<string, any>;
  lastExecution?: Date;
  throughput?: number;
}

interface WorkflowConnection {
  id: string;
  from: string;
  to: string;
  status: 'active' | 'idle' | 'error';
  dataFlow: number; // MB/s
}

const mockModules: SystemModule[] = [
  {
    id: 'defense-core',
    name: 'Defense Core System',
    description: 'Primary defense coordination and threat assessment module',
    version: 'v2.4.1',
    status: 'active',
    cpu: 34,
    memory: 2.1,
    lastUpdate: '2h ago',
    dependencies: ['sensor-array', 'communication-hub'],
    ports: [8080, 8443, 9090],
    logs: [
      '[14:23:07] Defense systems initialized',
      '[14:23:08] Threat assessment algorithms loaded',
      '[14:23:09] System ready for operation'
    ]
  },
  {
    id: 'sensor-array',
    name: 'Sensor Array Manager',
    description: 'Manages all sensor inputs and data processing',
    version: 'v1.8.3',
    status: 'active',
    cpu: 28,
    memory: 1.7,
    lastUpdate: '4h ago',
    dependencies: ['data-processor'],
    ports: [7001, 7002, 7003],
    logs: [
      '[14:20:15] Sensor calibration complete',
      '[14:20:16] All sensors operational',
      '[14:20:17] Data stream established'
    ]
  },
  {
    id: 'communication-hub',
    name: 'Communication Hub',
    description: 'Handles all internal and external communications',
    version: 'v3.1.0',
    status: 'updating',
    cpu: 15,
    memory: 0.9,
    lastUpdate: '1h ago',
    dependencies: ['encryption-service'],
    ports: [6000, 6001],
    logs: [
      '[13:45:22] Update process initiated',
      '[13:45:23] Downloading new firmware',
      '[13:45:24] Update 75% complete'
    ]
  },
  {
    id: 'data-processor',
    name: 'Data Processing Engine',
    description: 'Real-time data analysis and pattern recognition',
    version: 'v2.0.5',
    status: 'active',
    cpu: 67,
    memory: 3.2,
    lastUpdate: '6h ago',
    dependencies: [],
    ports: [5000, 5001, 5002, 5003],
    logs: [
      '[10:30:45] Processing queue cleared',
      '[10:30:46] Performance optimizations applied',
      '[10:30:47] Ready for high-load operations'
    ]
  },
  {
    id: 'encryption-service',
    name: 'Encryption Service',
    description: 'Handles all cryptographic operations and secure communications',
    version: 'v1.5.2',
    status: 'error',
    cpu: 8,
    memory: 0.4,
    lastUpdate: '12h ago',
    dependencies: [],
    ports: [4443],
    logs: [
      '[02:15:33] ERROR: Certificate validation failed',
      '[02:15:34] Attempting automatic recovery',
      '[02:15:35] Manual intervention required'
    ]
  }
];

const mockComputeNodes: ComputeNode[] = [
  {
    id: 'node-1',
    name: 'Sensor Input',
    type: 'input',
    status: 'active',
    position: { x: 50, y: 100 },
    connections: ['node-2', 'node-3'],
    resources: { cpu: 12, memory: 512, storage: 50 },
    config: { inputType: 'radar', frequency: '10Hz', buffer: '1MB' },
    lastExecution: new Date(Date.now() - 1000),
    throughput: 2.4
  },
  {
    id: 'node-2',
    name: 'AI Classifier',
    type: 'ai',
    status: 'processing',
    position: { x: 200, y: 80 },
    connections: ['node-4'],
    resources: { cpu: 78, memory: 2048, storage: 200 },
    config: { model: 'threat-detection-v2', confidence: 0.85 },
    lastExecution: new Date(Date.now() - 500),
    throughput: 1.8
  },
  {
    id: 'node-3',
    name: 'Data Processor',
    type: 'processor',
    status: 'active',
    position: { x: 200, y: 120 },
    connections: ['node-4', 'node-5'],
    resources: { cpu: 45, memory: 1024, storage: 100 },
    config: { algorithm: 'kalman-filter', window: '5s' },
    lastExecution: new Date(Date.now() - 750),
    throughput: 3.2
  },
  {
    id: 'node-4',
    name: 'Threat Analysis',
    type: 'processor',
    status: 'active',
    position: { x: 350, y: 100 },
    connections: ['node-6'],
    resources: { cpu: 56, memory: 1536, storage: 150 },
    config: { riskModel: 'tactical-v3', timeWindow: '30s' },
    lastExecution: new Date(Date.now() - 300),
    throughput: 2.1
  },
  {
    id: 'node-5',
    name: 'Data Store',
    type: 'storage',
    status: 'active',
    position: { x: 350, y: 140 },
    connections: [],
    resources: { cpu: 8, memory: 256, storage: 5000 },
    config: { retention: '30d', compression: 'gzip', replication: 3 },
    throughput: 0.8
  },
  {
    id: 'node-6',
    name: 'Alert System',
    type: 'output',
    status: 'active',
    position: { x: 500, y: 100 },
    connections: [],
    resources: { cpu: 15, memory: 512, storage: 25 },
    config: { channels: ['console', 'webhook'], priority: 'high' },
    throughput: 0.3
  },
  {
    id: 'node-7',
    name: 'Network Bridge',
    type: 'network',
    status: 'idle',
    position: { x: 50, y: 180 },
    connections: ['node-8'],
    resources: { cpu: 5, memory: 128, storage: 10 },
    config: { protocol: 'encrypted-tcp', port: 9999 },
    throughput: 0.0
  },
  {
    id: 'node-8',
    name: 'Security Scanner',
    type: 'security',
    status: 'idle',
    position: { x: 200, y: 180 },
    connections: [],
    resources: { cpu: 20, memory: 768, storage: 75 },
    config: { scanning: 'continuous', alerts: 'immediate' },
    throughput: 0.0
  }
];

const mockConnections: WorkflowConnection[] = [
  { id: 'conn-1', from: 'node-1', to: 'node-2', status: 'active', dataFlow: 2.4 },
  { id: 'conn-2', from: 'node-1', to: 'node-3', status: 'active', dataFlow: 1.8 },
  { id: 'conn-3', from: 'node-2', to: 'node-4', status: 'active', dataFlow: 1.2 },
  { id: 'conn-4', from: 'node-3', to: 'node-4', status: 'active', dataFlow: 2.1 },
  { id: 'conn-5', from: 'node-3', to: 'node-5', status: 'active', dataFlow: 0.8 },
  { id: 'conn-6', from: 'node-4', to: 'node-6', status: 'active', dataFlow: 0.3 },
  { id: 'conn-7', from: 'node-7', to: 'node-8', status: 'idle', dataFlow: 0.0 }
];

export function TechPage() {
  const [selectedModule, setSelectedModule] = useState<SystemModule | null>(mockModules[0]);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [computeNodes, setComputeNodes] = useState<ComputeNode[]>(mockComputeNodes);
  const [connections, setConnections] = useState<WorkflowConnection[]>(mockConnections);
  const [selectedNode, setSelectedNode] = useState<ComputeNode | null>(null);
  const [workflowRunning, setWorkflowRunning] = useState(true);

  const toggleModuleExpansion = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'updating':
        return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'inactive':
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-900 text-green-300 border-green-700';
      case 'updating':
        return 'bg-blue-900 text-blue-300 border-blue-700';
      case 'error':
        return 'bg-red-900 text-red-300 border-red-700';
      case 'inactive':
      default:
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
    }
  };

  const getNodeIcon = (type: ComputeNode['type']) => {
    switch (type) {
      case 'input':
        return <Download className="w-3 h-3" />;
      case 'processor':
        return <Cpu className="w-3 h-3" />;
      case 'output':
        return <Upload className="w-3 h-3" />;
      case 'storage':
        return <Database className="w-3 h-3" />;
      case 'network':
        return <Network className="w-3 h-3" />;
      case 'ai':
        return <Zap className="w-3 h-3" />;
      case 'security':
        return <Shield className="w-3 h-3" />;
      default:
        return <Box className="w-3 h-3" />;
    }
  };

  const getNodeStatusColor = (status: ComputeNode['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 border-green-400';
      case 'processing':
        return 'bg-blue-500 border-blue-400 animate-pulse';
      case 'idle':
        return 'bg-gray-500 border-gray-400';
      case 'error':
        return 'bg-red-500 border-red-400';
      case 'deploying':
        return 'bg-yellow-500 border-yellow-400 animate-pulse';
      default:
        return 'bg-gray-500 border-gray-400';
    }
  };

  const getConnectionPath = (from: ComputeNode, to: ComputeNode) => {
    const startX = from.position.x + 15;
    const startY = from.position.y + 15;
    const endX = to.position.x + 15;
    const endY = to.position.y + 15;
    
    const midX = (startX + endX) / 2;
    
    return `M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} Q ${midX} ${endY} ${endX} ${endY}`;
  };

  const deployNewNode = (type: ComputeNode['type']) => {
    const newNode: ComputeNode = {
      id: `node-${Date.now()}`,
      name: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      status: 'deploying',
      position: { x: 100 + Math.random() * 300, y: 100 + Math.random() * 100 },
      connections: [],
      resources: { cpu: 0, memory: 256, storage: 50 },
      config: {},
      throughput: 0
    };
    
    setComputeNodes([...computeNodes, newNode]);
    
    // Simulate deployment completion
    setTimeout(() => {
      setComputeNodes(prev => prev.map(node => 
        node.id === newNode.id ? { ...node, status: 'idle' } : node
      ));
    }, 2000);
  };

  return (
    <div className="h-full bg-gray-950 overflow-hidden">
      <div className="p-6 space-y-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-200 mb-2">SOFTWARE TECH</h1>
            <p className="text-gray-400">System Monitoring & Control</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">5 Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">7.3GB Used</span>
              </div>
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">34% CPU</span>
              </div>
            </div>
            
            <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
              <Download className="w-4 h-4 mr-2" />
              Deploy Update
            </Button>
          </div>
        </div>

        {/* System Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-shrink-0">
          <Card className="bg-gray-900 border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-900/30 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Modules</p>
                <p className="text-xl font-semibold text-gray-200">4</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-900/30 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Updating</p>
                <p className="text-xl font-semibold text-gray-200">1</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-900/30 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Errors</p>
                <p className="text-xl font-semibold text-gray-200">1</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cyan-900/30 rounded-lg flex items-center justify-center">
                <Upload className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Uptime</p>
                <p className="text-xl font-semibold text-gray-200">99.8%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Compute Workflow Section */}
        <div className="space-y-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Workflow className="w-5 h-5 text-cyan-400" />
              <h2 className="text-lg font-semibold text-gray-200">Compute Workflow</h2>
              <Badge className={`${workflowRunning ? 'bg-green-900 text-green-300 border-green-700' : 'bg-gray-900 text-gray-300 border-gray-700'}`}>
                {workflowRunning ? 'RUNNING' : 'STOPPED'}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300"
                onClick={() => setWorkflowRunning(!workflowRunning)}
              >
                {workflowRunning ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {workflowRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                <RotateCcw className="w-4 h-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>

          {/* Node Deployment Toolbar */}
          <Card className="bg-gray-900 border-gray-700 p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">Deploy Nodes:</div>
              <div className="flex items-center space-x-2">
                {(['input', 'processor', 'ai', 'storage', 'network', 'security', 'output'] as ComputeNode['type'][]).map((type) => (
                  <Button
                    key={type}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                    onClick={() => deployNewNode(type)}
                    title={`Deploy ${type} node`}
                  >
                    {getNodeIcon(type)}
                  </Button>
                ))}
              </div>
            </div>
          </Card>

          {/* Workflow Canvas */}
          <Card className="bg-gray-900 border-gray-700 p-4 h-64 relative overflow-hidden">
            <div className="absolute inset-0 p-4">
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {connections.map((conn) => {
                  const fromNode = computeNodes.find(n => n.id === conn.from);
                  const toNode = computeNodes.find(n => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <g key={conn.id}>
                      <path
                        d={getConnectionPath(fromNode, toNode)}
                        stroke={conn.status === 'active' ? '#06b6d4' : '#6b7280'}
                        strokeWidth="2"
                        fill="none"
                        opacity={conn.status === 'active' ? 0.8 : 0.3}
                      />
                      {conn.status === 'active' && conn.dataFlow > 0 && (
                        <circle
                          r="2"
                          fill="#06b6d4"
                          opacity="0.8"
                        >
                          <animateMotion
                            dur="2s"
                            repeatCount="indefinite"
                            path={getConnectionPath(fromNode, toNode)}
                          />
                        </circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Compute Nodes */}
              {computeNodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute cursor-pointer transition-all duration-200 ${
                    selectedNode?.id === node.id ? 'scale-110 z-10' : 'hover:scale-105'
                  }`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                >
                  <div className={`w-8 h-8 rounded border-2 ${getNodeStatusColor(node.status)} 
                    flex items-center justify-center relative group`}>
                    {getNodeIcon(node.type)}
                    
                    {/* Pulsing effect for active processing */}
                    {node.status === 'processing' && (
                      <div className="absolute inset-0 rounded border-2 border-blue-400 animate-ping opacity-30"></div>
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      <div className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs text-gray-300 whitespace-nowrap">
                        <div className="font-medium">{node.name}</div>
                        <div className="text-gray-400">{node.type} • {node.status}</div>
                        {node.throughput !== undefined && (
                          <div className="text-cyan-400">{node.throughput.toFixed(1)} MB/s</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Node label */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 
                    text-xs text-gray-400 whitespace-nowrap text-center">
                    {node.name}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Node Details Panel */}
          {selectedNode && (
            <Card className="bg-gray-900 border-gray-700 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded border-2 ${getNodeStatusColor(selectedNode.status)} 
                    flex items-center justify-center`}>
                    {getNodeIcon(selectedNode.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-200">{selectedNode.name}</h3>
                    <p className="text-sm text-gray-400">{selectedNode.type} node</p>
                  </div>
                </div>
                <Badge className={getStatusColor(selectedNode.status)}>
                  {selectedNode.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block">CPU Usage</span>
                  <span className="text-gray-300">{selectedNode.resources.cpu}%</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Memory</span>
                  <span className="text-gray-300">{selectedNode.resources.memory}MB</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Throughput</span>
                  <span className="text-gray-300">
                    {selectedNode.throughput ? `${selectedNode.throughput.toFixed(1)} MB/s` : 'Idle'}
                  </span>
                </div>
              </div>

              {Object.keys(selectedNode.config).length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-sm text-gray-400 mb-2">Configuration</div>
                  <div className="space-y-1 text-xs">
                    {Object.entries(selectedNode.config).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-500">{key}:</span>
                        <span className="text-gray-300">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
          {/* Modules List */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center">
              <Server className="w-5 h-5 mr-2" />
              System Modules
            </h2>
            
            <div className="space-y-3 overflow-y-auto">
              {mockModules.map((module) => {
                const isExpanded = expandedModules.has(module.id);
                return (
                  <Card 
                    key={module.id} 
                    className={`bg-gray-900 border-gray-700 transition-all duration-200 ${
                      selectedModule?.id === module.id ? 'border-cyan-700 bg-cyan-900/20' : ''
                    }`}
                  >
                    <div 
                      className="p-4 cursor-pointer hover:bg-gray-800/50 transition-colors"
                      onClick={() => setSelectedModule(module)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(module.status)}
                          <div>
                            <h3 className="font-medium text-gray-200">{module.name}</h3>
                            <p className="text-xs text-gray-500">{module.version}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(module.status)}>
                            {module.status.toUpperCase()}
                          </Badge>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleModuleExpansion(module.id);
                            }}
                            className="p-1 hover:bg-gray-700 rounded transition-colors"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200" />
                            )}
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
                        <div>
                          <span className="block text-gray-500">CPU</span>
                          <span className="text-gray-300">{module.cpu}%</span>
                        </div>
                        <div>
                          <span className="block text-gray-500">Memory</span>
                          <span className="text-gray-300">{module.memory}GB</span>
                        </div>
                        <div>
                          <span className="block text-gray-500">Updated</span>
                          <span className="text-gray-300">{module.lastUpdate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Collapsible Content */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-4 pb-4 border-t border-gray-700/50 pt-3">
                        <div className="space-y-4">
                          {/* Description */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-1">Description</h4>
                            <p className="text-xs text-gray-400">{module.description}</p>
                          </div>

                          {/* Dependencies */}
                          {module.dependencies && module.dependencies.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Dependencies</h4>
                              <div className="flex flex-wrap gap-1">
                                {module.dependencies.map((dep) => (
                                  <Badge key={dep} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                    {dep}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Active Ports */}
                          {module.ports && module.ports.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Active Ports</h4>
                              <div className="flex flex-wrap gap-1">
                                {module.ports.map((port) => (
                                  <Badge key={port} variant="outline" className="text-xs border-green-600 text-green-400">
                                    :{port}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Recent Logs */}
                          {module.logs && module.logs.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Recent Logs</h4>
                              <div className="bg-gray-950 rounded p-2 space-y-1">
                                {module.logs.slice(0, 3).map((log, index) => (
                                  <div key={index} className="text-xs font-mono text-gray-400">
                                    {log}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick Actions */}
                          <div className="flex space-x-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-300 h-7"
                              disabled={module.status === 'updating'}
                            >
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Restart
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-300 h-7"
                            >
                              <Terminal className="w-3 h-3 mr-1" />
                              Logs
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-300 h-7"
                            >
                              <Settings className="w-3 h-3 mr-1" />
                              Config
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Module Details */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-200 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Module Details
            </h2>
            
            {selectedModule ? (
              <Card className="bg-gray-900 border-gray-700 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(selectedModule.status)}
                      <div>
                        <h3 className="text-lg font-medium text-gray-200">{selectedModule.name}</h3>
                        <p className="text-sm text-gray-400">{selectedModule.description}</p>
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(selectedModule.status)}>
                      {selectedModule.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-700">
                    <div>
                      <span className="text-sm text-gray-500">Version</span>
                      <p className="text-gray-200 font-mono">{selectedModule.version}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Last Update</span>
                      <p className="text-gray-200">{selectedModule.lastUpdate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">CPU Usage</span>
                      <p className="text-gray-200">{selectedModule.cpu}%</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Memory Usage</span>
                      <p className="text-gray-200">{selectedModule.memory} GB</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 pt-4 border-t border-gray-700">
                    <Button 
                      size="sm" 
                      className="bg-cyan-600 hover:bg-cyan-700"
                      disabled={selectedModule.status === 'updating'}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restart
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-600 text-gray-300"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-gray-600 text-gray-300"
                    >
                      <Terminal className="w-4 h-4 mr-2" />
                      Debug
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="bg-gray-900 border-gray-700 p-6">
                <div className="text-center text-gray-500">
                  <Monitor className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Select a module to view details</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}