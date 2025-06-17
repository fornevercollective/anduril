import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ScrollArea } from '../ui/scroll_area';
import { Search, Filter, Target, AlertTriangle, MapPin, Clock, Zap, Navigation, Crosshair, Video, Camera, Maximize2, Volume2, VolumeX, CircleDot } from 'lucide-react';

const mockTargets = [
  {
    id: 'TGT-001',
    name: 'VESSEL ALPHA',
    type: 'Surface Vessel',
    threat: 'HIGH',
    status: 'Tracked',
    distance: '2.3 km',
    bearing: '045°',
    speed: '12 kts',
    lastSeen: '2s ago',
    location: '25.7641°, -80.1443°',
    coordinates: { lat: 25.7641, lng: -80.1443 }
  },
  {
    id: 'TGT-002',
    name: 'AIRCRAFT BRAVO',
    type: 'Fixed Wing',
    threat: 'MEDIUM',
    status: 'Tracked',
    distance: '8.7 km',
    bearing: '120°',
    speed: '180 kts',
    lastSeen: '5s ago',
    location: '25.7721°, -80.1323°',
    coordinates: { lat: 25.7721, lng: -80.1323 }
  },
  {
    id: 'TGT-003',
    name: 'CONTACT CHARLIE',
    type: 'Unknown',
    threat: 'LOW',
    status: 'Lost',
    distance: '15.2 km',
    bearing: '280°',
    speed: '0 kts',
    lastSeen: '2m ago',
    location: '25.7581°, -80.1643°',
    coordinates: { lat: 25.7581, lng: -80.1643 }
  }
];

function VideoFeed({ title, source, isRecording = false, className = "" }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <Card className={`bg-gray-900 border-gray-700 ${className}`}>
      <div className="relative">
        {/* Video Feed Header */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-gray-900/90 to-transparent p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-gray-200">{title}</span>
              {isRecording && (
                <div className="flex items-center space-x-1">
                  <CircleDot className="w-3 h-3 text-red-400 animate-pulse" />
                  <span className="text-xs text-red-400">REC</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-800"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-3 h-3 text-gray-400" />
                ) : (
                  <Volume2 className="w-3 h-3 text-gray-400" />
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-gray-800"
                onClick={() => setIsFullscreen(!isFullscreen)}
              >
                <Maximize2 className="w-3 h-3 text-gray-400" />
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
                <pattern id={`video-grid-${title}`} width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#video-grid-${title})`} />
            </svg>
            
            {/* Simulated moving target indicator */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-16 h-16 border-2 border-red-400 rounded-full animate-pulse">
                  <div className="absolute inset-2 border border-red-400 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-red-900 text-red-300 text-xs px-2 py-1 rounded">
                  TARGET
                </div>
              </div>
            </div>

            {/* Simulated scan lines */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
              <div 
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"
                style={{
                  top: '25%',
                  animationDelay: '0.5s'
                }}
              ></div>
              <div 
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"
                style={{
                  top: '50%',
                  animationDelay: '1s'
                }}
              ></div>
              <div 
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"
                style={{
                  top: '75%',
                  animationDelay: '1.5s'
                }}
              ></div>
            </div>
          </div>

          {/* Video overlay information */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/90 to-transparent p-3">
            <div className="flex items-center justify-between text-xs">
              <div className="text-gray-300">
                <div>{source}</div>
                <div className="text-gray-500">ZOOM: 4.2x | IR: ON</div>
              </div>
              
              <div className="text-right text-gray-300">
                <div>{new Date().toLocaleTimeString()}</div>
                <div className="text-gray-500">LAT: 25.7641° LON: -80.1443°</div>
              </div>
            </div>
          </div>

          {/* Signal strength indicator */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center space-x-1">
              <div className="w-1 h-2 bg-green-400"></div>
              <div className="w-1 h-3 bg-green-400"></div>
              <div className="w-1 h-4 bg-green-400"></div>
              <div className="w-1 h-2 bg-gray-600"></div>
              <div className="w-1 h-2 bg-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function TacticalMap({ target, targets, className = "" }) {
  const centerLat = target?.coordinates?.lat || 25.7641;
  const centerLng = target?.coordinates?.lng || -80.1443;
  
  // Calculate map bounds and scale - now responsive
  const mapHeight = 300;
  const scale = 0.01; // degrees per pixel
  
  const getMapPosition = (lat, lng, containerWidth) => {
    const mapWidth = containerWidth || 600; // fallback width
    const x = ((lng - centerLng) / scale) + mapWidth / 2;
    const y = ((centerLat - lat) / scale) + mapHeight / 2;
    return { x: Math.max(0, Math.min(mapWidth, x)), y: Math.max(0, Math.min(mapHeight, y)) };
  };

  return (
    <div className={`bg-gray-900 border border-gray-700 rounded-lg overflow-hidden ${className}`}>
      <div className="p-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-gray-200">TACTICAL MAP</span>
        </div>
        <div className="text-xs text-gray-400 font-mono">
          {centerLat.toFixed(4)}°, {centerLng.toFixed(4)}°
        </div>
      </div>
      
      <div className="tactical-map-container relative bg-gray-950 w-full" style={{ height: mapHeight }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Center crosshairs */}
          <line x1="calc(50% - 10px)" y1="50%" x2="calc(50% + 10px)" y2="50%" 
                stroke="#6b7280" strokeWidth="1" opacity="0.8"/>
          <line x1="50%" y1="calc(50% - 10px)" x2="50%" y2="calc(50% + 10px)" 
                stroke="#6b7280" strokeWidth="1" opacity="0.8"/>
        </svg>
        
        {/* Radar sweep effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-conic from-transparent via-blue-500/20 to-transparent animate-spin" style={{animationDuration: '4s'}}></div>
        </div>
        
        {/* Range rings */}
        <svg className="absolute inset-0 w-full h-full">
          {[40, 80, 120, 160].map((radius, index) => (
            <circle
              key={index}
              cx="50%"
              cy="50%"
              r={radius}
              fill="none"
              stroke="#374151"
              strokeWidth="1"
              opacity="0.6"
              strokeDasharray="2,2"
            />
          ))}
        </svg>
        
        {/* Targets */}
        {targets.map((t, index) => {
          // Calculate position based on current container size
          const containerElement = document.querySelector('.tactical-map-container');
          const containerWidth = containerElement ? containerElement.offsetWidth : 600;
          const pos = getMapPosition(t.coordinates.lat, t.coordinates.lng, containerWidth);
          const isSelected = target && t.id === target.id;
          const color = t.threat === 'HIGH' ? '#ef4444' : t.threat === 'MEDIUM' ? '#f59e0b' : '#22c55e';
          
          return (
            <div
              key={t.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(pos.x / containerWidth) * 100}%`, top: `${(pos.y / mapHeight) * 100}%` }}
            >
              <div className={`relative ${isSelected ? 'animate-pulse' : ''}`}>
                <div 
                  className="w-3 h-3 rounded-full border-2 border-white"
                  style={{ backgroundColor: color }}
                ></div>
                {isSelected && (
                  <div className="absolute inset-0 w-6 h-6 -m-1.5 border-2 border-white rounded-full animate-ping opacity-75"></div>
                )}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-gray-800 text-white text-xs px-1 py-0.5 rounded border border-gray-600">
                    {t.name}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Compass */}
        <div className="absolute top-2 right-2 w-8 h-8 bg-gray-800 rounded-full border border-gray-600 flex items-center justify-center">
          <Navigation className="w-4 h-4 text-gray-400" />
        </div>
        
        {/* Scale indicator */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded border border-gray-600">
          Scale: 1km
        </div>
      </div>
    </div>
  );
}

export function TargetsPage() {
  const [selectedTarget, setSelectedTarget] = useState(mockTargets[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getThreatColor = (threat) => {
    switch (threat) {
      case 'HIGH':
        return 'bg-red-900 text-red-300 border-red-700';
      case 'MEDIUM':
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'LOW':
        return 'bg-green-900 text-green-300 border-green-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Tracked':
        return 'bg-green-900 text-green-300 border-green-700';
      case 'Lost':
        return 'bg-red-900 text-red-300 border-red-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const filteredTargets = mockTargets.filter(target => {
    const matchesSearch = target.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         target.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || target.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex-1 bg-gray-950 flex h-full">
      {/* Left Panel - Target List */}
      <div className="w-96 bg-gray-900 border-r border-gray-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-200">TARGETS</h1>
            <Badge className="bg-blue-900 text-blue-300 border-blue-700">
              {filteredTargets.length} Active
            </Badge>
          </div>
          
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search targets..."
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
        
        {/* Target List */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-3">
            {filteredTargets.map((target) => (
              <Card 
                key={target.id}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedTarget?.id === target.id 
                    ? 'bg-gray-800 border-blue-600' 
                    : 'bg-gray-900 border-gray-700 hover:bg-gray-800'
                }`}
                onClick={() => setSelectedTarget(target)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-gray-200">{target.name}</span>
                  </div>
                  <Badge className={getThreatColor(target.threat)}>
                    {target.threat}
                  </Badge>
                </div>
                
                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-gray-300">{target.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distance:</span>
                    <span className="text-gray-300">{target.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge size="sm" className={getStatusColor(target.status)}>
                      {target.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  Last seen: {target.lastSeen}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Right Panel - Target Details */}
      {selectedTarget ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-700 bg-gray-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crosshair className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-200">{selectedTarget.name}</h2>
                  <p className="text-gray-400">{selectedTarget.type} • {selectedTarget.id}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Badge className={getThreatColor(selectedTarget.threat)}>
                  {selectedTarget.threat} THREAT
                </Badge>
                <Badge className={getStatusColor(selectedTarget.status)}>
                  {selectedTarget.status}
                </Badge>
              </div>
            </div>
          </div>
          
          <ScrollArea className="flex-1 h-full">
            <div className="px-6 pt-6 pb-12 space-y-6">
              {/* Video Feeds */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <VideoFeed 
                  title="THERMAL CAM-01" 
                  source="UAV-Alpha"
                  isRecording={true}
                />
                <VideoFeed 
                  title="VISUAL CAM-02" 
                  source="UAV-Bravo"
                  isRecording={false}
                />
              </div>

              {/* Tactical Map */}
              <TacticalMap 
                target={selectedTarget} 
                targets={mockTargets}
                className="w-full"
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Position Data */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-4">POSITION DATA</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Location</span>
                        <span className="text-gray-300 font-mono">{selectedTarget.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Distance</span>
                        <span className="text-gray-300">{selectedTarget.distance}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bearing</span>
                        <span className="text-gray-300">{selectedTarget.bearing}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Speed</span>
                        <span className="text-gray-300">{selectedTarget.speed}</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Classification */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-4">CLASSIFICATION</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type</span>
                        <span className="text-gray-300">{selectedTarget.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Threat Level</span>
                        <Badge className={getThreatColor(selectedTarget.threat)}>
                          {selectedTarget.threat}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Confidence</span>
                        <span className="text-gray-300">85%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated</span>
                        <span className="text-gray-300">{selectedTarget.lastSeen}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Tracking History */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-200 mb-4">TRACKING HISTORY</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-gray-400">Time</TableHead>
                        <TableHead className="text-gray-400">Position</TableHead>
                        <TableHead className="text-gray-400">Speed</TableHead>
                        <TableHead className="text-gray-400">Bearing</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-gray-300">12:34:56</TableCell>
                        <TableCell className="text-gray-300 font-mono">25.7641°, -80.1443°</TableCell>
                        <TableCell className="text-gray-300">12 kts</TableCell>
                        <TableCell className="text-gray-300">045°</TableCell>
                        <TableCell>
                          <Badge className="bg-green-900 text-green-300 border-green-700">ACTIVE</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="text-gray-300">12:33:56</TableCell>
                        <TableCell className="text-gray-300 font-mono">25.7635°, -80.1448°</TableCell>
                        <TableCell className="text-gray-300">11 kts</TableCell>
                        <TableCell className="text-gray-300">043°</TableCell>
                        <TableCell>
                          <Badge className="bg-green-900 text-green-300 border-green-700">ACTIVE</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a target to view details</p>
          </div>
        </div>
      )}
    </div>
  );
}