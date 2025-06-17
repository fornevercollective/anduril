import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Shield, Zap, Target, Radar, AlertTriangle, CheckCircle, Settings, Power } from 'lucide-react';

interface DefenseSystem {
  id: string;
  name: string;
  type: 'CIWS' | 'SAM' | 'COUNTERMEASURE' | 'JAMMING';
  status: 'ACTIVE' | 'STANDBY' | 'OFFLINE' | 'MAINTENANCE';
  readiness: number;
  ammunition: number;
  range: string;
  targets: number;
  isEnabled: boolean;
  lastFired: string;
}

const mockDefenseSystems: DefenseSystem[] = [
  {
    id: 'DEF_001',
    name: 'PHALANX CIWS',
    type: 'CIWS',
    status: 'ACTIVE',
    readiness: 98,
    ammunition: 1400,
    range: '3.5 km',
    targets: 0,
    isEnabled: true,
    lastFired: 'Never'
  },
  {
    id: 'DEF_002',
    name: 'RIM-116 RAM',
    type: 'SAM',
    status: 'STANDBY',
    readiness: 95,
    ammunition: 21,
    range: '15 km',
    targets: 0,
    isEnabled: true,
    lastFired: '2023-08-15'
  },
  {
    id: 'DEF_003',
    name: 'CHAFF LAUNCHER',
    type: 'COUNTERMEASURE',
    status: 'ACTIVE',
    readiness: 100,
    ammunition: 48,
    range: '2 km',
    targets: 0,
    isEnabled: true,
    lastFired: '2024-01-12'
  },
  {
    id: 'DEF_004',
    name: 'ECM JAMMER',
    type: 'JAMMING',
    status: 'OFFLINE',
    readiness: 0,
    ammunition: 0,
    range: '25 km',
    targets: 0,
    isEnabled: false,
    lastFired: 'N/A'
  }
];

export function DefensePage() {
  const [defenseSystems, setDefenseSystems] = useState<DefenseSystem[]>(mockDefenseSystems);
  const [selectedSystem, setSelectedSystem] = useState<DefenseSystem | null>(defenseSystems[0]);
  const [threatLevel, setThreatLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');

  const getSystemIcon = (type: string) => {
    switch (type) {
      case 'CIWS': return Target;
      case 'SAM': return Zap;
      case 'COUNTERMEASURE': return Shield;
      case 'JAMMING': return Radar;
      default: return Shield;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-900 text-green-300 border-green-700';
      case 'STANDBY': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'OFFLINE': return 'bg-red-900 text-red-300 border-red-700';
      case 'MAINTENANCE': return 'bg-blue-900 text-blue-300 border-blue-700';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return CheckCircle;
      case 'OFFLINE': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'HIGH': return 'bg-red-900 text-red-300 border-red-700';
      case 'MEDIUM': return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      case 'LOW': return 'bg-green-900 text-green-300 border-green-700';
      default: return 'bg-gray-800 text-gray-300 border-gray-600';
    }
  };

  const toggleSystem = (systemId: string) => {
    setDefenseSystems(prev => prev.map(system => 
      system.id === systemId 
        ? { 
            ...system, 
            isEnabled: !system.isEnabled, 
            status: !system.isEnabled ? 'ACTIVE' : 'OFFLINE',
            readiness: !system.isEnabled ? 98 : 0
          }
        : system
    ));
  };

  const activeSystems = defenseSystems.filter(s => s.status === 'ACTIVE').length;
  const totalReadiness = Math.floor(defenseSystems.reduce((sum, s) => sum + s.readiness, 0) / defenseSystems.length);

  return (
    <div className="flex h-full bg-gray-950">
      {/* Defense Systems Overview */}
      <div className="w-96 bg-gray-950 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <h2 className="font-semibold text-gray-200 mb-4">DEFENSE SYSTEMS</h2>
          
          {/* Threat Level */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Threat Level</span>
              <Badge className={getThreatColor(threatLevel)}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {threatLevel}
              </Badge>
            </div>
          </div>
          
          {/* System Status */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Card className="bg-gray-900 border-gray-700 p-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-green-400">{activeSystems}</div>
                <div className="text-xs text-gray-500">ACTIVE</div>
              </div>
            </Card>
            <Card className="bg-gray-900 border-gray-700 p-3">
              <div className="text-center">
                <div className="text-xl font-semibold text-blue-400">{totalReadiness}%</div>
                <div className="text-xs text-gray-500">READINESS</div>
              </div>
            </Card>
          </div>

          {/* Overall Readiness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">System Readiness</span>
              <span className={totalReadiness > 90 ? 'text-green-400' : totalReadiness > 70 ? 'text-yellow-400' : 'text-red-400'}>
                {totalReadiness > 90 ? 'OPTIMAL' : totalReadiness > 70 ? 'DEGRADED' : 'CRITICAL'}
              </span>
            </div>
            <Progress value={totalReadiness} className="h-2 bg-gray-800" />
          </div>
        </div>

        {/* Systems List */}
        <div className="flex-1 overflow-y-auto">
          {defenseSystems.map((system) => {
            const SystemIcon = getSystemIcon(system.type);
            const StatusIcon = getStatusIcon(system.status);
            
            return (
              <div
                key={system.id}
                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                  selectedSystem?.id === system.id ? 'bg-gray-800' : 'hover:bg-gray-900'
                }`}
                onClick={() => setSelectedSystem(system)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                      <SystemIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">{system.name}</div>
                      <div className="text-xs text-gray-500">{system.id}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <StatusIcon className={`w-4 h-4 ${
                      system.status === 'ACTIVE' ? 'text-green-400' : 
                      system.status === 'OFFLINE' ? 'text-red-400' : 'text-yellow-400'
                    }`} />
                    <Switch 
                      checked={system.isEnabled}
                      onCheckedChange={() => toggleSystem(system.id)}
                      size="sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Badge className={getStatusColor(system.status)}>
                    {system.status}
                  </Badge>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mt-2">
                    <div>Ready: {system.readiness}%</div>
                    <div>Range: {system.range}</div>
                    <div>Ammo: {system.ammunition}</div>
                    <div>Targets: {system.targets}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* System Details */}
      <div className="flex-1 flex flex-col">
        {selectedSystem ? (
          <>
            {/* System Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    {(() => {
                      const SystemIcon = getSystemIcon(selectedSystem.type);
                      return <SystemIcon className="w-6 h-6 text-gray-400" />;
                    })()}
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-200">{selectedSystem.name}</h1>
                    <p className="text-gray-400">{selectedSystem.id} • {selectedSystem.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(selectedSystem.status)}>
                    {selectedSystem.status}
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
                  <span className="text-sm text-gray-400">System Power</span>
                  <Switch checked={selectedSystem.isEnabled} />
                </div>
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="bg-red-800 border-red-700 hover:bg-red-700 text-red-200"
                  disabled={selectedSystem.status !== 'ACTIVE'}
                >
                  <Target className="w-4 h-4 mr-2" />
                  ENGAGE
                </Button>
                <Button variant="secondary" size="sm" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300">
                  <Power className="w-4 h-4 mr-2" />
                  TEST FIRE
                </Button>
              </div>
            </div>

            {/* System Data */}
            <div className="flex-1 p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Status & Readiness */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-4">STATUS & READINESS</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">System Readiness</span>
                          <span className="text-gray-300">{selectedSystem.readiness}%</span>
                        </div>
                        <Progress value={selectedSystem.readiness} className="h-2 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Power Level</span>
                          <span className="text-gray-300">95%</span>
                        </div>
                        <Progress value={95} className="h-2 bg-gray-800" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-400">Cooling System</span>
                          <span className="text-gray-300">Normal</span>
                        </div>
                        <Progress value={78} className="h-2 bg-gray-800" />
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Combat Specifications */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-4">SPECIFICATIONS</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Maximum Range</span>
                        <span className="text-gray-300">{selectedSystem.range}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Rate of Fire</span>
                        <span className="text-gray-300">4,500 RPM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Traverse Speed</span>
                        <span className="text-gray-300">115°/sec</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reaction Time</span>
                        <span className="text-gray-300">&lt;1 sec</span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Ammunition Status */}
                <Card className="bg-gray-900 border-gray-700">
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-200 mb-4">AMMUNITION</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Current Load</span>
                        <span className="text-gray-300">{selectedSystem.ammunition}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Magazine Capacity</span>
                        <span className="text-gray-300">1,550</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Reserve Stock</span>
                        <span className="text-gray-300">4,650</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Resupply</span>
                        <span className="text-gray-300">2024-12-10</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Engagement History */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-200 mb-4">ENGAGEMENT HISTORY</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="text-sm text-gray-200">System Test Successful</div>
                          <div className="text-xs text-gray-500">2024-12-15 14:30:00</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">PASSED</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="text-sm text-gray-200">Maintenance Check</div>
                          <div className="text-xs text-gray-500">2024-12-10 09:15:00</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">COMPLETED</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <div className="text-sm text-gray-200">Target Engagement</div>
                          <div className="text-xs text-gray-500">2024-01-12 16:45:00</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">HIT</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* System Diagnostics */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-200 mb-4">SYSTEM DIAGNOSTICS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Barrel Temperature</span>
                        <span className="text-green-400">Normal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Hydraulic Pressure</span>
                        <span className="text-green-400">Optimal</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Radar Integration</span>
                        <span className="text-green-400">Active</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Fire Control</span>
                        <span className="text-green-400">Ready</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Ammunition Feed</span>
                        <span className="text-green-400">Operational</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Communication</span>
                        <span className="text-green-400">Connected</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">Select a defense system to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}