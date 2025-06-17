import { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll_area';
import { Users, Search, Filter, MapPin, Clock, Activity, AlertTriangle, Terminal, ChevronRight, Video, Camera, Maximize2, Volume2, VolumeX, CircleDot, Bell } from 'lucide-react';

const mockEntities = [
  {
    id: 'VESSEL_1',
    name: 'VESSEL ALPHA',
    type: 'Surface Vessel',
    status: 'Active',
    position: '25.7641°, -80.1443°',
    lastSeen: '2s ago',
    threat: 'NEUTRAL',
    speed: '12 kts',
    heading: '045°'
  },
  {
    id: 'AIRCRAFT_1',
    name: 'AIRCRAFT BRAVO',
    type: 'Fixed Wing',
    status: 'Tracked',
    position: '25.7721°, -80.1323°',
    lastSeen: '5s ago',
    threat: 'UNKNOWN',
    speed: '180 kts',
    heading: '120°'
  },
  {
    id: 'CONTACT_1',
    name: 'CONTACT CHARLIE',
    type: 'Unknown',
    status: 'Lost',
    position: '25.7581°, -80.1643°',
    lastSeen: '2m ago',
    threat: 'LOW',
    speed: '0 kts',
    heading: 'N/A'
  }
];

interface TerminalLine {
  id: number;
  timestamp: string;
  type: 'command' | 'output' | 'error' | 'system';
  content: string;
  entity?: string;
}

interface CameraNotification {
  id: number;
  timestamp: string;
  type: 'alert' | 'detection' | 'system' | 'warning';
  message: string;
  isVisible: boolean;
}

function VideoFeed({ title, source, isRecording = false, className = "", feedId = "1" }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [notifications, setNotifications] = useState<CameraNotification[]>([]);

  // Generate random notifications for each camera feed
  useEffect(() => {
    const generateNotification = () => {
      const notificationTypes = [
        { type: 'detection' as const, messages: [
          'Entity detected in sector',
          'Movement analysis complete',
          'Target acquired',
          'Contact classified',
          'Tracking initiated'
        ]},
        { type: 'alert' as const, messages: [
          'Perimeter breach detected',
          'Unauthorized movement',
          'Threat level elevated',
          'Security alert active'
        ]},
        { type: 'system' as const, messages: [
          'Camera calibration complete',
          'Night vision activated',
          'Zoom level adjusted',
          'Recording started',
          'Signal strength optimal'
        ]},
        { type: 'warning' as const, messages: [
          'Low light conditions',
          'Weather interference',
          'Signal degradation',
          'Focus adjustment needed'
        ]}
      ];

      const randomCategory = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const randomMessage = randomCategory.messages[Math.floor(Math.random() * randomCategory.messages.length)];

      const newNotification: CameraNotification = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: randomCategory.type,
        message: randomMessage,
        isVisible: true
      };

      setNotifications(prev => {
        const updated = [newNotification, ...prev.slice(0, 2)]; // Keep max 3 notifications
        return updated;
      });

      // Auto-dismiss notification after 8 seconds
      setTimeout(() => {
        setNotifications(prev => 
          prev.map(notif => 
            notif.id === newNotification.id 
              ? { ...notif, isVisible: false }
              : notif
          )
        );
      }, 8000);

      // Remove notification after fade out
      setTimeout(() => {
        setNotifications(prev => 
          prev.filter(notif => notif.id !== newNotification.id)
        );
      }, 9000);
    };

    // Generate initial notification after component mount
    const initialDelay = setTimeout(() => {
      generateNotification();
    }, Math.random() * 3000 + 2000); // Random delay 2-5 seconds

    // Generate periodic notifications
    const interval = setInterval(() => {
      generateNotification();
    }, Math.random() * 15000 + 10000); // Random interval 10-25 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [feedId]);

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'alert':
        return 'text-red-400 bg-red-900/30 border-red-700/50';
      case 'detection':
        return 'text-blue-400 bg-blue-900/30 border-blue-700/50';
      case 'warning':
        return 'text-yellow-400 bg-yellow-900/30 border-yellow-700/50';
      case 'system':
      default:
        return 'text-green-400 bg-green-900/30 border-green-700/50';
    }
  };

  return (
    <Card className={`bg-gray-900 border-gray-700 ${className}`}>
      <div className="relative">
        {/* Video Feed Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 to-transparent p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-3 h-3 text-blue-400" />
              <span className="text-xs font-medium text-gray-200">{title}</span>
              {isRecording && (
                <div className="flex items-center space-x-1">
                  <CircleDot className="w-2 h-2 text-red-400 animate-pulse" />
                  <span className="text-xs text-red-400">REC</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-gray-800"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-2 h-2 text-gray-400" />
                ) : (
                  <Volume2 className="w-2 h-2 text-gray-400" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 hover:bg-gray-800"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="w-2 h-2 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        {/* Video Content */}
        <div className="relative bg-gray-950 aspect-video">
          {/* Simulated video feed with grid pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id={`entity-video-grid-${feedId}`} width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#374151" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#entity-video-grid-${feedId})`} />
            </svg>
            
            {/* Simulated moving entity indicator */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-8 h-8 border border-blue-400 rounded-full animate-pulse">
                  <div className="absolute inset-1 border border-blue-400 rounded-full opacity-60"></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-900 text-blue-300 text-xs px-1 py-0.5 rounded">
                  ENTITY
                </div>
              </div>
            </div>

            {/* Additional entity markers */}
            <div className="absolute top-2/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-6 h-6 border border-green-400 rounded-full opacity-75">
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>

            {/* Simulated scan lines */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
              <div 
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                style={{
                  top: '33%',
                  animationDelay: '0.7s'
                }}
              ></div>
              <div 
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"
                style={{
                  top: '66%',
                  animationDelay: '1.4s'
                }}
              ></div>
            </div>
          </div>

          {/* Video overlay information */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-2">
            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-300">
                <div className="text-xs">{source}</div>
                <div className="text-xs text-gray-500">ZOOM: 2.1x | NV: ON</div>
              </div>
              
              <div className="text-right text-gray-300">
                <div className="text-xs">{new Date().toLocaleTimeString()}</div>
                <div className="text-xs text-gray-500">SECTOR: {feedId}</div>
              </div>
            </div>
          </div>

          {/* Signal strength indicator */}
          <div className="absolute top-2 right-2">
            <div className="flex items-center space-x-0.5">
              <div className="w-0.5 h-1 bg-cyan-400"></div>
              <div className="w-0.5 h-2 bg-cyan-400"></div>
              <div className="w-0.5 h-3 bg-cyan-400"></div>
              <div className="w-0.5 h-2 bg-gray-600"></div>
              <div className="w-0.5 h-1 bg-gray-600"></div>
            </div>
          </div>
        </div>

        {/* Terminal Notifications */}
        <div className="absolute bottom-0 left-0 right-0 z-20 p-2 pointer-events-none">
          <div className="space-y-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  transition-all duration-1000 ease-in-out font-mono text-xs
                  ${notification.isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                  }
                `}
              >
                <div className={`
                  border rounded px-2 py-1 backdrop-blur-sm
                  ${getNotificationColor(notification.type)}
                `}>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-2 h-2 flex-shrink-0" />
                    <span className="text-gray-400 text-xs">
                      [{notification.timestamp}]
                    </span>
                    <span className="text-xs truncate">
                      {notification.message}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function EntityTerminal({ selectedEntity }: { selectedEntity: any }) {
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal with startup messages
  useEffect(() => {
    const initLines: TerminalLine[] = [
      {
        id: 1,
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'system',
        content: '=== TACTICAL ENTITY MANAGEMENT SYSTEM v1.2.3 ==='
      },
      {
        id: 2,
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'system',
        content: 'Initializing entity tracking subsystem...'
      },
      {
        id: 3,
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'system',
        content: 'Connected to tactical data feed'
      },
      {
        id: 4,
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'output',
        content: `Tracking ${mockEntities.length} entities`
      },
      {
        id: 5,
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'system',
        content: 'Type "help" for available commands'
      }
    ];
    setTerminalLines(initLines);
  }, []);

  // Auto-scroll to bottom when new lines are added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Simulate real-time entity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const entity = mockEntities[Math.floor(Math.random() * mockEntities.length)];
      const messages = [
        `Entity ${entity.id} position updated: ${entity.position}`,
        `Entity ${entity.id} status: ${entity.status.toUpperCase()}`,
        `Entity ${entity.id} speed: ${entity.speed}`,
        `New contact detected: ${entity.name}`
      ];
      
      const newLine: TerminalLine = {
        id: Date.now(),
        timestamp: new Date().toISOString().substring(11, 19),
        type: 'system',
        content: messages[Math.floor(Math.random() * messages.length)],
        entity: entity.id
      };

      setTerminalLines(prev => [...prev.slice(-50), newLine]); // Keep last 50 lines
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const executeCommand = (cmd: string) => {
    const timestamp = new Date().toISOString().substring(11, 19);
    const commandLine: TerminalLine = {
      id: Date.now(),
      timestamp,
      type: 'command',
      content: `> ${cmd}`
    };

    let outputLines: TerminalLine[] = [];

    switch (cmd.toLowerCase().trim()) {
      case 'help':
        outputLines = [
          {
            id: Date.now() + 1,
            timestamp,
            type: 'output',
            content: 'Available commands:'
          },
          {
            id: Date.now() + 2,
            timestamp,
            type: 'output',
            content: '  list              - List all tracked entities'
          },
          {
            id: Date.now() + 3,
            timestamp,
            type: 'output',
            content: '  status <id>       - Get entity status'
          },
          {
            id: Date.now() + 4,
            timestamp,
            type: 'output',
            content: '  track <id>        - Start tracking entity'
          },
          {
            id: Date.now() + 5,
            timestamp,
            type: 'output',
            content: '  untrack <id>      - Stop tracking entity'
          },
          {
            id: Date.now() + 6,
            timestamp,
            type: 'output',
            content: '  clear             - Clear terminal'
          },
          {
            id: Date.now() + 7,
            timestamp,
            type: 'output',
            content: '  scan              - Perform area scan'
          }
        ];
        break;

      case 'list':
        outputLines = [
          {
            id: Date.now() + 1,
            timestamp,
            type: 'output',
            content: 'Active Entities:'
          },
          ...mockEntities.map((entity, index) => ({
            id: Date.now() + index + 2,
            timestamp,
            type: 'output' as const,
            content: `  ${entity.id.padEnd(12)} ${entity.name.padEnd(20)} ${entity.type.padEnd(15)} ${entity.status}`,
            entity: entity.id
          }))
        ];
        break;

      case 'scan':
        outputLines = [
          {
            id: Date.now() + 1,
            timestamp,
            type: 'output',
            content: 'Initiating tactical area scan...'
          },
          {
            id: Date.now() + 2,
            timestamp,
            type: 'system',
            content: 'Scanning frequency bands 2.4-5.8 GHz'
          },
          {
            id: Date.now() + 3,
            timestamp,
            type: 'output',
            content: `Detected ${mockEntities.length} entities in operational area`
          },
          {
            id: Date.now() + 4,
            timestamp,
            type: 'system',
            content: 'Scan complete'
          }
        ];
        break;

      case 'clear':
        setTerminalLines([]);
        return;

      default:
        if (cmd.startsWith('status ')) {
          const entityId = cmd.substring(7).trim();
          const entity = mockEntities.find(e => e.id === entityId);
          if (entity) {
            outputLines = [
              {
                id: Date.now() + 1,
                timestamp,
                type: 'output',
                content: `Entity Status: ${entity.id}`
              },
              {
                id: Date.now() + 2,
                timestamp,
                type: 'output',
                content: `  Name: ${entity.name}`
              },
              {
                id: Date.now() + 3,
                timestamp,
                type: 'output',
                content: `  Type: ${entity.type}`
              },
              {
                id: Date.now() + 4,
                timestamp,
                type: 'output',
                content: `  Status: ${entity.status}`
              },
              {
                id: Date.now() + 5,
                timestamp,
                type: 'output',
                content: `  Position: ${entity.position}`
              },
              {
                id: Date.now() + 6,
                timestamp,
                type: 'output',
                content: `  Speed: ${entity.speed}`
              },
              {
                id: Date.now() + 7,
                timestamp,
                type: 'output',
                content: `  Heading: ${entity.heading}`
              }
            ];
          } else {
            outputLines = [{
              id: Date.now() + 1,
              timestamp,
              type: 'error',
              content: `Error: Entity '${entityId}' not found`
            }];
          }
        } else if (cmd.startsWith('track ')) {
          const entityId = cmd.substring(6).trim();
          outputLines = [{
            id: Date.now() + 1,
            timestamp,
            type: 'output',
            content: `Initiated tracking for entity: ${entityId}`
          }];
        } else if (cmd.startsWith('untrack ')) {
          const entityId = cmd.substring(8).trim();
          outputLines = [{
            id: Date.now() + 1,
            timestamp,
            type: 'output',
            content: `Stopped tracking entity: ${entityId}`
          }];
        } else if (cmd.trim()) {
          outputLines = [{
            id: Date.now() + 1,
            timestamp,
            type: 'error',
            content: `Command not found: ${cmd}. Type 'help' for available commands.`
          }];
        }
        break;
    }

    setTerminalLines(prev => [...prev, commandLine, ...outputLines]);
    setCommandHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        executeCommand(currentCommand);
        setCurrentCommand('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-cyan-400';
      case 'error':
        return 'text-red-400';
      case 'system':
        return 'text-yellow-400';
      case 'output':
      default:
        return 'text-green-400';
    }
  };

  return (
    <Card className="bg-gray-950 border-gray-700 h-96">
      <div className="p-4 border-b border-gray-700 flex items-center space-x-2">
        <Terminal className="w-5 h-5 text-green-400" />
        <h3 className="font-semibold text-gray-200">ENTITY MANAGEMENT TERMINAL</h3>
        {selectedEntity && (
          <Badge className="bg-green-900 text-green-300 border-green-700">
            {selectedEntity.name}
          </Badge>
        )}
      </div>
      
      <div className="flex flex-col h-80">
        <ScrollArea className="flex-1 p-4 pb-8">
          <div ref={scrollRef} className="font-mono text-sm space-y-1 min-h-full">
            {terminalLines.map((line) => (
              <div key={line.id} className="flex">
                <span className="text-gray-500 mr-3 select-none">
                  [{line.timestamp}]
                </span>
                <span className={getLineColor(line.type)}>
                  {line.content}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-gray-700 bg-gray-950">
          <div className="flex items-center space-x-2 font-mono">
            <span className="text-cyan-400">tactical@entity-mgmt:</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
            <Input
              ref={inputRef}
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none p-0 text-green-400 font-mono focus:ring-0 focus:outline-none"
              placeholder="Enter command..."
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function EntitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedEntity, setSelectedEntity] = useState(null);

  const filteredEntities = mockEntities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || entity.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'HIGH':
        return 'bg-red-900 text-red-300 border-red-700';
      case 'MEDIUM':
      case 'UNKNOWN':
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'LOW':
      case 'NEUTRAL':
        return 'bg-green-900 text-green-300 border-green-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Tracked':
        return 'bg-green-900 text-green-300 border-green-700';
      case 'Lost':
        return 'bg-red-900 text-red-300 border-red-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  return (
    <div className="h-full bg-gray-950 flex overflow-hidden">
      {/* Left Panel - Entity List */}
      <div className="w-96 bg-gray-900 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-200">ENTITIES</h1>
            <Badge className="bg-blue-900 text-blue-300 border-blue-700">
              {filteredEntities.length} Active
            </Badge>
          </div>
          
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-gray-300"
              />
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="surface">Surface</SelectItem>
                <SelectItem value="air">Aircraft</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Entity List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredEntities.map((entity) => (
              <Card 
                key={entity.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedEntity?.id === entity.id 
                    ? 'bg-gray-800 border-blue-600' 
                    : 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                }`}
                onClick={() => setSelectedEntity(entity)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-gray-200">{entity.name}</span>
                  </div>
                  <Badge className={getThreatColor(entity.threat)}>
                    {entity.threat}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-gray-300">{entity.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Speed:</span>
                    <span className="text-gray-300">{entity.speed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge size="sm" className={getStatusColor(entity.status)}>
                      {entity.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Last seen: {entity.lastSeen}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Right Panel - Scrollable Content */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6 pb-8">
            {/* Camera Feeds Grid */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-200">SURVEILLANCE FEEDS</h2>
                <Badge className="bg-green-900 text-green-300 border-green-700">
                  5 ACTIVE
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <VideoFeed 
                  title="SECTOR-01" 
                  source="CAM-ALPHA"
                  isRecording={true}
                  feedId="01"
                  className="col-span-1"
                />
                <VideoFeed 
                  title="SECTOR-02" 
                  source="CAM-BRAVO"
                  isRecording={false}
                  feedId="02"
                  className="col-span-1"
                />
                <VideoFeed 
                  title="SECTOR-03" 
                  source="CAM-CHARLIE"
                  isRecording={true}
                  feedId="03"
                  className="col-span-1"
                />
                <VideoFeed 
                  title="SECTOR-04" 
                  source="CAM-DELTA"
                  isRecording={false}
                  feedId="04"
                  className="col-span-1"
                />
                <VideoFeed 
                  title="OVERVIEW" 
                  source="CAM-ECHO"
                  isRecording={true}
                  feedId="05"
                  className="col-span-2"
                />
              </div>
            </div>

            {/* Terminal Interface */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-gray-200">ENTITY MANAGEMENT TERMINAL</h2>
                <Badge className="bg-blue-900 text-blue-300 border-blue-700">
                  ACTIVE
                </Badge>
              </div>
              
              <EntityTerminal selectedEntity={selectedEntity} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}