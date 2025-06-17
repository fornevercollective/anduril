import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { ScrollArea } from '../ui/scroll_area';
import { Radar, Satellite, Radio, Camera, Zap, AlertCircle, CheckCircle, Settings } from 'lucide-react';

interface Sensor {
  id: string;
  name: string;
  type: 'RADAR' | 'OPTICAL' | 'ELECTRONIC' | 'ACOUSTIC';
  status: 'ACTIVE' | 'STANDBY' | 'OFFLINE' | 'ERROR';
  range: string;
  coverage: string;
  power: number;
  detections: number;
  lastScan: string;
  isEnabled: boolean;
}

const mockSensors: Sensor[] = [
  {
    id: 'RADAR_001',
    name: 'SEARCH RADAR',
    type: 'RADAR',
    status: 'ACTIVE',
    range: '50 km',
    coverage: '360°',
    power: 85,
    detections: 12,
    lastScan: '1s',
    isEnabled: true
  },
  {
    id: 'OPTICAL_001',
    name: 'EO/IR CAMERA',
    type: 'OPTICAL',
    status: 'ACTIVE',
    range: '15 km',
    coverage: '45°',
    power: 92,
    detections: 3,
    lastScan: '2s',
    isEnabled: true
  },
  {
    id: 'ESM_001',
    name: 'ELECTRONIC SUPPORT',
    type: 'ELECTRONIC',
    status: 'STANDBY',
    range: '100 km',
    coverage: '360°',
    power: 67,
    detections: 8,
    lastScan: '15s',
    isEnabled: false
  },
  {
    id: 'SONAR_001',
    name: 'PASSIVE SONAR',
    type: 'ACOUSTIC',
    status: 'ACTIVE',
    range: '25 km',
    coverage: '270°',
    power: 78,
    detections: 1,
    lastScan: '5s',
    isEnabled: true
  }
];

export function SensorsPage() {
  const [sensors, setSensors] = useState<Sensor[]>(mockSensors);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(sensors[0]);

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'RADAR': return Radar;
      case 'OPTICAL': return Camera;
      case 'ELECTRONIC': return Radio;
      case 'ACOUSTIC': return Satellite;
      default: return Radar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-900 text-green-300 border-green-700';
      case 'STANDBY': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'OFFLINE': return 'bg-gray-900 text-gray-400 border-gray-600';
      case 'ERROR': return 'bg-red-900 text-red-300 border-red-700';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return CheckCircle;
      case 'ERROR': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const toggleSensor = (sensorId: string) => {
    setSensors(prev => prev.map(sensor => 
      sensor.id === sensorId 
        ? { ...sensor, isEnabled: !sensor.isEnabled, status: !sensor.isEnabled ? 'ACTIVE' : 'STANDBY' }
        : sensor
    ));
  };

  const activeSensors = sensors.filter(s => s.status === 'ACTIVE').length;
  const totalDetections = sensors.reduce((sum, s) => sum + s.detections, 0);

  return (
    <div className="flex h-full bg-gray-950">
      {/* Sensors Overview */}
      <div className="w-96 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="font-semibold text-gray-200 mb-4">SENSOR NETWORK</h2>
          
          {/* System Status */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="bg-gray-900 border-gray-700 p-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-green-400">{activeSensors}</div>
                <div className="text-xs text-gray-500">ACTIVE</div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-700 p-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-blue-400">{totalDetections}</div>
                <div className="text-xs text-gray-500">DETECTIONS</div>
              </div>
            </Card>
          </div>

          {/* Network Status */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Network Health</span>
              <span className="text-green-400">OPERATIONAL</span>
            </div>
            <Progress value={92} className="h-2 bg-gray-800" />
          </div>
        </div>

        {/* Sensors List */}
        <div className="flex-1 overflow-y-auto">
          {sensors.map((sensor) => {
            const SensorIcon = getSensorIcon(sensor.type);
            const StatusIcon = getStatusIcon(sensor.status);
            
            return (
              <div
                key={sensor.id}
                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                  selectedSensor?.id === sensor.id ? 'bg-gray-800' : 'hover:bg-gray-900'
                }`}
                onClick={() => setSelectedSensor(sensor)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <SensorIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">{sensor.name}</div>
                      <div className="text-xs text-gray-500">{sensor.id}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${
                      sensor.status === 'ACTIVE' ? 'text-green-400' : 
                      sensor.status === 'ERROR' ? 'text-red-400' : 'text-gray-500'
                    }`} />
                    <Switch 
                      checked={sensor.isEnabled}
                      onCheckedChange={() => toggleSensor(sensor.id)}
                      size="sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Badge className={getStatusColor(sensor.status)}>
                    {sensor.status}
                  </Badge>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mt-2">
                    <div>Range: {sensor.range}</div>
                    <div>Power: {sensor.power}%</div>
                    <div>Detections: {sensor.detections}</div>
                    <div>Last: {sensor.lastScan}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sensor Details */}
      <div className="flex-1 flex flex-col">
        {selectedSensor ? (
          <>
            {/* Sensor Header */}
            <div className="p-6 border-b border-gray-800 flex-shrink-0">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    {(() => {
                      const SensorIcon = getSensorIcon(selectedSensor.type);
                      return <SensorIcon className="w-6 h-6 text-gray-400" />;
                    })()}
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-200">{selectedSensor.name}</h1>
                    <p className="text-gray-400">{selectedSensor.id} • {selectedSensor.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(selectedSensor.status)}>
                    {selectedSensor.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,53,1)]">
                    <Settings className="w-4 h-4 mr-2" />
                    CONFIGURE
                  </Button>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Power</span>
                  <Switch checked={selectedSensor.isEnabled} />
                </div>
                <Button variant="secondary" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300">
                  <Zap className="w-4 h-4 mr-2" />
                  CALIBRATE
                </Button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  {/* Radar Display Header */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-200 flex items-center">
                      <Radar className="w-5 h-5 mr-2" />
                      Radar Display
                    </h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-gray-400">ACTIVE SWEEP</span>
                      </div>
                      <div className="text-sm text-gray-400">Range: 50km</div>
                    </div>
                  </div>

                  {/* Radar Windows Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Primary Radar Display */}
                    <Card className="bg-gray-900 border-gray-700 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-200">PRIMARY RADAR</h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>360° SWEEP</span>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          <span>2.4s CYCLE</span>
                        </div>
                      </div>
                      
                      <div className="relative w-full aspect-square bg-gray-950 rounded-lg overflow-hidden">
                        {/* Range Rings */}
                        <svg className="absolute inset-0 w-full h-full">
                          <defs>
                            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                              <stop offset="70%" stopColor="rgba(6, 182, 212, 0.05)" />
                              <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                            <filter id="glow">
                              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                              <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                              </feMerge>
                            </filter>
                          </defs>
                          
                          {/* Background */}
                          <circle cx="50%" cy="50%" r="48%" fill="url(#radarGradient)" />
                          
                          {/* Range Rings */}
                          {[25, 50, 75, 90].map((radius, index) => (
                            <circle
                              key={index}
                              cx="50%"
                              cy="50%"
                              r={`${radius/2}%`}
                              fill="none"
                              stroke="rgba(6, 182, 212, 0.3)"
                              strokeWidth="1"
                              opacity="0.6"
                            />
                          ))}
                          
                          {/* Crosshairs */}
                          <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" opacity="0.6" />
                          <line x1="5%" y1="50%" x2="95%" y2="50%" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" opacity="0.6" />
                          
                          {/* Diagonal lines */}
                          <line x1="18%" y1="18%" x2="82%" y2="82%" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" opacity="0.4" />
                          <line x1="82%" y1="18%" x2="18%" y2="82%" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1" opacity="0.4" />
                          
                          {/* Radar Sweep */}
                          <line
                            x1="50%"
                            y1="50%"
                            x2="50%"
                            y2="5%"
                            stroke="rgba(6, 182, 212, 0.8)"
                            strokeWidth="2"
                            filter="url(#glow)"
                            className="radar-sweep"
                            style={{
                              transformOrigin: '50% 50%',
                              animation: 'radar-sweep 2.4s linear infinite'
                            }}
                          />
                          
                          {/* Detected Objects */}
                          <circle cx="35%" cy="30%" r="2" fill="#22c55e" className="animate-pulse" />
                          <circle cx="70%" cy="60%" r="2" fill="#eab308" className="animate-pulse" />
                          <circle cx="45%" cy="75%" r="2" fill="#22c55e" className="animate-pulse" />
                          <circle cx="25%" cy="65%" r="2" fill="#ef4444" className="animate-pulse" />
                        </svg>
                        
                        {/* Center Dot */}
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                        
                        {/* Range Labels */}
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">N</div>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">S</div>
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">W</div>
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">E</div>
                      </div>
                      
                      {/* Radar Status */}
                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">Targets:</span>
                          <span className="text-gray-300 ml-2">4</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Range:</span>
                          <span className="text-gray-300 ml-2">50km</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Bearing:</span>
                          <span className="text-gray-300 ml-2">347°</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Elevation:</span>
                          <span className="text-gray-300 ml-2">5.2°</span>
                        </div>
                      </div>
                    </Card>

                    {/* Secondary Radar Display */}
                    <Card className="bg-gray-900 border-gray-700 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-200">SECTOR SCAN</h3>
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span>045° - 135°</span>
                          <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                          <span>1.2s CYCLE</span>
                        </div>
                      </div>
                      
                      <div className="relative w-full aspect-square bg-gray-950 rounded-lg overflow-hidden">
                        <svg className="absolute inset-0 w-full h-full">
                          {/* Sector background */}
                          <path
                            d="M 50 50 L 50 5 A 45 45 0 0 1 85.4 35.4 Z"
                            fill="rgba(34, 197, 94, 0.1)"
                            stroke="rgba(34, 197, 94, 0.3)"
                            strokeWidth="1"
                          />
                          
                          {/* Range Rings (Sector) */}
                          {[25, 50, 75, 90].map((radius, index) => (
                            <path
                              key={index}
                              d={`M 50 50 L 50 ${50 - radius/2} A ${radius/2} ${radius/2} 0 0 1 ${50 + radius/2 * 0.707} ${50 - radius/2 * 0.707}`}
                              fill="none"
                              stroke="rgba(34, 197, 94, 0.3)"
                              strokeWidth="1"
                              opacity="0.6"
                            />
                          ))}
                          
                          {/* Sector lines */}
                          <line x1="50%" y1="50%" x2="50%" y2="5%" stroke="rgba(34, 197, 94, 0.5)" strokeWidth="1" />
                          <line x1="50%" y1="50%" x2="85.4%" y2="35.4%" stroke="rgba(34, 197, 94, 0.5)" strokeWidth="1" />
                          
                          {/* Sector Sweep */}
                          <line
                            x1="50%"
                            y1="50%"
                            x2="50%"
                            y2="5%"
                            stroke="rgba(34, 197, 94, 0.8)"
                            strokeWidth="2"
                            filter="url(#glow)"
                            className="sector-sweep"
                            style={{
                              transformOrigin: '50% 50%',
                              animation: 'sector-sweep 1.2s ease-in-out infinite alternate'
                            }}
                          />
                          
                          {/* Detected Objects in Sector */}
                          <circle cx="60%" cy="35%" r="2" fill="#22c55e" className="animate-pulse" />
                          <circle cx="70%" cy="25%" r="2" fill="#eab308" className="animate-pulse" />
                        </svg>
                        
                        {/* Center Dot */}
                        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                      
                      {/* Sector Status */}
                      <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-gray-500">Sector:</span>
                          <span className="text-gray-300 ml-2">NE-45°</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Contacts:</span>
                          <span className="text-gray-300 ml-2">2</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Intensity:</span>
                          <span className="text-gray-300 ml-2">High</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Signal:</span>
                          <span className="text-gray-300 ml-2">Strong</span>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Target Information */}
                  <Card className="bg-gray-900 border-gray-700 p-4">
                    <h3 className="font-medium text-gray-200 mb-4 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Detected Targets
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-200">TARGET-001</div>
                            <div className="text-xs text-gray-400">Surface Vessel</div>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <div>Bearing: 025°</div>
                          <div>Range: 12.4km</div>
                        </div>
                        <div className="text-right text-xs">
                          <Badge className="bg-green-900 text-green-300 border-green-700">FRIENDLY</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-200">TARGET-002</div>
                            <div className="text-xs text-gray-400">Aircraft</div>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <div>Bearing: 087°</div>
                          <div>Range: 8.7km</div>
                        </div>
                        <div className="text-right text-xs">
                          <Badge className="bg-yellow-900 text-yellow-300 border-yellow-700">UNKNOWN</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-200">TARGET-003</div>
                            <div className="text-xs text-gray-400">Ground Vehicle</div>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <div>Bearing: 156°</div>
                          <div>Range: 23.1km</div>
                        </div>
                        <div className="text-right text-xs">
                          <Badge className="bg-green-900 text-green-300 border-green-700">FRIENDLY</Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                          <div>
                            <div className="text-sm font-medium text-gray-200">TARGET-004</div>
                            <div className="text-xs text-gray-400">Fast Attack Craft</div>
                          </div>
                        </div>
                        <div className="text-right text-xs text-gray-400">
                          <div>Bearing: 203°</div>
                          <div>Range: 31.8km</div>
                        </div>
                        <div className="text-right text-xs">
                          <Badge className="bg-red-900 text-red-300 border-red-700">HOSTILE</Badge>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Sensor Data */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Performance Metrics */}
                    <Card className="bg-gray-900 border-gray-700">
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-200 mb-4">PERFORMANCE</h3>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Power Level</span>
                              <span className="text-gray-300">{selectedSensor.power}%</span>
                            </div>
                            <Progress value={selectedSensor.power} className="h-2 bg-gray-800" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Signal Quality</span>
                              <span className="text-gray-300">94%</span>
                            </div>
                            <Progress value={94} className="h-2 bg-gray-800" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-400">Detection Rate</span>
                              <span className="text-gray-300">87%</span>
                            </div>
                            <Progress value={87} className="h-2 bg-gray-800" />
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Coverage Data */}
                    <Card className="bg-gray-900 border-gray-700">
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-200 mb-4">COVERAGE</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Maximum Range</span>
                            <span className="text-gray-300">{selectedSensor.range}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Coverage Arc</span>
                            <span className="text-gray-300">{selectedSensor.coverage}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Elevation</span>
                            <span className="text-gray-300">-10° to +85°</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Resolution</span>
                            <span className="text-gray-300">0.5m</span>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Detection Stats */}
                    <Card className="bg-gray-900 border-gray-700">
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-200 mb-4">DETECTIONS</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Current Hour</span>
                            <span className="text-gray-300">{selectedSensor.detections}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last 24h</span>
                            <span className="text-gray-300">142</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Last Scan</span>
                            <span className="text-gray-300">{selectedSensor.lastScan}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">False Positives</span>
                            <span className="text-gray-300">2.3%</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Sensor Configuration */}
                  <Card className="bg-gray-900 border-gray-700">
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-200 mb-4">CONFIGURATION</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Scan Mode</label>
                          <div className="bg-gray-800 rounded px-3 py-2 text-sm text-gray-300">
                            Continuous
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Priority</label>
                          <div className="bg-gray-800 rounded px-3 py-2 text-sm text-gray-300">
                            High
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Sensitivity</label>
                          <div className="bg-gray-800 rounded px-3 py-2 text-sm text-gray-300">
                            85%
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Frequency</label>
                          <div className="bg-gray-800 rounded px-3 py-2 text-sm text-gray-300">
                            X-Band
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Radar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select a sensor to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}