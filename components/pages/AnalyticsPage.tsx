import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll_area';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertTriangle, Target, Radar, Download, RefreshCw } from 'lucide-react';

const detectionData = [
  { time: '00:00', detections: 12, threats: 2 },
  { time: '04:00', detections: 8, threats: 1 },
  { time: '08:00', detections: 15, threats: 4 },
  { time: '12:00', detections: 22, threats: 6 },
  { time: '16:00', detections: 18, threats: 3 },
  { time: '20:00', detections: 14, threats: 2 },
];

const threatTypeData = [
  { name: 'Surface', value: 45, color: '#3b82f6' },
  { name: 'Air', value: 30, color: '#ef4444' },
  { name: 'Subsurface', value: 15, color: '#f59e0b' },
  { name: 'Unknown', value: 10, color: '#6b7280' },
];

const sensorPerformanceData = [
  { sensor: 'RADAR-001', uptime: 98.5, detections: 156 },
  { sensor: 'EO/IR-001', uptime: 95.2, detections: 89 },
  { sensor: 'ESM-001', uptime: 99.1, detections: 234 },
  { sensor: 'SONAR-001', uptime: 92.8, detections: 45 },
];

export function AnalyticsPage() {
  return (
    <div className="flex-1 bg-gray-950 flex flex-col h-full">
      <ScrollArea className="flex-1">
        <div className="p-6 min-h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-200 mb-2">TACTICAL ANALYTICS</h1>
              <p className="text-gray-400">Real-time threat assessment and system performance metrics</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select defaultValue="24h">
                <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1h">Last Hour</SelectItem>
                  <SelectItem value="24h">Last 24h</SelectItem>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,53,1)]">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,53,1)]">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Detections</p>
                    <p className="text-2xl font-semibold text-gray-200">1,247</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+12.5%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Active Threats</p>
                    <p className="text-2xl font-semibold text-gray-200">18</p>
                    <div className="flex items-center mt-2">
                      <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      <span className="text-sm text-red-400">-3.2%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-red-900 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">System Uptime</p>
                    <p className="text-2xl font-semibold text-gray-200">99.2%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+0.3%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-900 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Sensor Health</p>
                    <p className="text-2xl font-semibold text-gray-200">96.3%</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+1.1%</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-yellow-900 rounded-lg flex items-center justify-center">
                    <Radar className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Detection Timeline */}
            <Card className="bg-gray-900 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-200">DETECTION TIMELINE</h3>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    Last 24h
                  </Badge>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={detectionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="time" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Line type="monotone" dataKey="detections" stroke="#3b82f6" strokeWidth={2} />
                      <Line type="monotone" dataKey="threats" stroke="#ef4444" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Detections</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-400">Threats</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Threat Distribution */}
            <Card className="bg-gray-900 border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-200">THREAT DISTRIBUTION</h3>
                  <Badge variant="outline" className="border-gray-600 text-gray-400">
                    Current
                  </Badge>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={threatTypeData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                      >
                        {threatTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {threatTypeData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-400">{item.name}</span>
                      <span className="text-sm text-gray-300 ml-auto">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Sensor Performance */}
          <Card className="bg-gray-900 border-gray-700 mb-8">
            <div className="p-6">
              <h3 className="font-semibold text-gray-200 mb-4">SENSOR PERFORMANCE</h3>
              
              <div className="space-y-4">
                {sensorPerformanceData.map((sensor, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Radar className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-200">{sensor.sensor}</div>
                        <div className="text-sm text-gray-400">{sensor.detections} detections today</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <div className="text-sm text-gray-400">Uptime</div>
                        <div className="font-medium text-gray-200">{sensor.uptime}%</div>
                      </div>
                      
                      <div className="w-32">
                        <Progress 
                          value={sensor.uptime} 
                          className="h-2 bg-gray-700"
                        />
                      </div>
                      
                      <Badge className={
                        sensor.uptime > 95 
                          ? 'bg-green-900 text-green-300 border-green-700'
                          : sensor.uptime > 90
                          ? 'bg-yellow-900 text-yellow-300 border-yellow-700'
                          : 'bg-red-900 text-red-300 border-red-700'
                      }>
                        {sensor.uptime > 95 ? 'OPTIMAL' : sensor.uptime > 90 ? 'DEGRADED' : 'CRITICAL'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Alerts & Notifications */}
          <Card className="bg-gray-900 border-gray-700 mb-8">
            <div className="p-6">
              <h3 className="font-semibold text-gray-200 mb-4">RECENT ALERTS</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-red-900/20 border border-red-700/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-200">High threat detected</div>
                    <div className="text-xs text-gray-400">Unknown vessel approaching restricted zone</div>
                  </div>
                  <div className="text-xs text-gray-500">2m ago</div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-200">Sensor degradation</div>
                    <div className="text-xs text-gray-400">RADAR-001 performance below threshold</div>
                  </div>
                  <div className="text-xs text-gray-500">15m ago</div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                  <Target className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-200">New contact classified</div>
                    <div className="text-xs text-gray-400">Aircraft identified as friendly</div>
                  </div>
                  <div className="text-xs text-gray-500">1h ago</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Content for Testing Scroll */}
          <Card className="bg-gray-900 border-gray-700 mb-8">
            <div className="p-6">
              <h3 className="font-semibold text-gray-200 mb-4">SYSTEM LOGS</h3>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="text-gray-400">[2024-12-16 12:34:56] INFO: System health check completed</div>
                <div className="text-gray-400">[2024-12-16 12:33:45] WARN: Network latency increased to 25ms</div>
                <div className="text-gray-400">[2024-12-16 12:32:12] INFO: Target classification updated</div>
                <div className="text-gray-400">[2024-12-16 12:31:03] INFO: Sensor calibration successful</div>
                <div className="text-gray-400">[2024-12-16 12:30:45] INFO: Defense system status check</div>
                <div className="text-gray-400">[2024-12-16 12:29:32] INFO: Database backup completed</div>
                <div className="text-gray-400">[2024-12-16 12:28:15] INFO: Network connectivity verified</div>
                <div className="text-gray-400">[2024-12-16 12:27:08] WARN: Temporary sensor interference</div>
                <div className="text-gray-400">[2024-12-16 12:26:54] INFO: System update applied</div>
                <div className="text-gray-400">[2024-12-16 12:25:41] INFO: User authentication successful</div>
              </div>
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card className="bg-gray-900 border-gray-700">
            <div className="p-6">
              <h3 className="font-semibold text-gray-200 mb-4">PERFORMANCE METRICS</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">CPU Usage</div>
                  <div className="text-2xl font-semibold text-gray-200">45%</div>
                  <Progress value={45} className="h-2 bg-gray-800" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Memory Usage</div>
                  <div className="text-2xl font-semibold text-gray-200">3.6 GB</div>
                  <Progress value={60} className="h-2 bg-gray-800" />
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-gray-400">Network I/O</div>
                  <div className="text-2xl font-semibold text-gray-200">125 MB/s</div>
                  <Progress value={78} className="h-2 bg-gray-800" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}