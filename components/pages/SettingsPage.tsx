import { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll_area';
import { Settings, User, Shield, Monitor, Network, Database, Bell, Key } from 'lucide-react';

export function SettingsPage() {
  const [settings, setSettings] = useState({
    // System Settings
    autoUpdate: true,
    realTimeData: true,
    debugMode: false,
    
    // Display Settings
    theme: 'dark',
    mapOverlay: 'grid',
    refreshRate: '1000',
    
    // Security Settings
    encryption: true,
    auditLog: true,
    sessionTimeout: '30',
    
    // Notifications
    alertSounds: true,
    threatNotifications: true,
    systemNotifications: false,
    
    // Network Settings
    networkMode: 'auto',
    bandwidth: 'high',
    compression: true
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex-1 bg-gray-950 flex flex-col overflow-hidden">
      {/* Fixed Header */}
      <div className="p-6 border-b border-gray-800 bg-gray-950">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-200 mb-2">SYSTEM SETTINGS</h1>
            <p className="text-gray-400">Configure tactical interface and system parameters</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              v1.2.3
            </Badge>
            <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,53,1)]">
              EXPORT CONFIG
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="px-6 pt-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Configuration */}
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Settings className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">SYSTEM CONFIGURATION</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Automatic Updates</Label>
                        <p className="text-sm text-gray-500">Enable automatic system updates</p>
                      </div>
                      <Switch 
                        checked={settings.autoUpdate}
                        onCheckedChange={(value) => updateSetting('autoUpdate', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Real-time Data</Label>
                        <p className="text-sm text-gray-500">Enable live data streaming</p>
                      </div>
                      <Switch 
                        checked={settings.realTimeData}
                        onCheckedChange={(value) => updateSetting('realTimeData', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Debug Mode</Label>
                        <p className="text-sm text-gray-500">Show system debug information</p>
                      </div>
                      <Switch 
                        checked={settings.debugMode}
                        onCheckedChange={(value) => updateSetting('debugMode', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Data Refresh Rate</Label>
                      <Select 
                        value={settings.refreshRate} 
                        onValueChange={(value) => updateSetting('refreshRate', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500">500ms (High)</SelectItem>
                          <SelectItem value="1000">1s (Normal)</SelectItem>
                          <SelectItem value="2000">2s (Low)</SelectItem>
                          <SelectItem value="5000">5s (Minimal)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Display Settings */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">DISPLAY SETTINGS</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Theme</Label>
                      <Select 
                        value={settings.theme} 
                        onValueChange={(value) => updateSetting('theme', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark (Tactical)</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Map Overlay</Label>
                      <Select 
                        value={settings.mapOverlay} 
                        onValueChange={(value) => updateSetting('mapOverlay', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="grid">Tactical Grid</SelectItem>
                          <SelectItem value="satellite">Satellite</SelectItem>
                          <SelectItem value="terrain">Terrain</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Notifications */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bell className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">NOTIFICATIONS</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Alert Sounds</Label>
                        <p className="text-sm text-gray-500">Play audio alerts</p>
                      </div>
                      <Switch 
                        checked={settings.alertSounds}
                        onCheckedChange={(value) => updateSetting('alertSounds', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Threat Notifications</Label>
                        <p className="text-sm text-gray-500">Show threat alerts</p>
                      </div>
                      <Switch 
                        checked={settings.threatNotifications}
                        onCheckedChange={(value) => updateSetting('threatNotifications', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">System Notifications</Label>
                        <p className="text-sm text-gray-500">Show system status updates</p>
                      </div>
                      <Switch 
                        checked={settings.systemNotifications}
                        onCheckedChange={(value) => updateSetting('systemNotifications', value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Security & Network */}
            <div className="space-y-6">
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">SECURITY SETTINGS</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Data Encryption</Label>
                        <p className="text-sm text-gray-500">Encrypt all data transmissions</p>
                      </div>
                      <Switch 
                        checked={settings.encryption}
                        onCheckedChange={(value) => updateSetting('encryption', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Audit Logging</Label>
                        <p className="text-sm text-gray-500">Log all system activities</p>
                      </div>
                      <Switch 
                        checked={settings.auditLog}
                        onCheckedChange={(value) => updateSetting('auditLog', value)}
                      />
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Session Timeout (minutes)</Label>
                      <Input 
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => updateSetting('sessionTimeout', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-gray-300"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Network Settings */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Network className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">NETWORK SETTINGS</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Network Mode</Label>
                      <Select 
                        value={settings.networkMode} 
                        onValueChange={(value) => updateSetting('networkMode', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="secure">Secure Only</SelectItem>
                          <SelectItem value="offline">Offline Mode</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Bandwidth Priority</Label>
                      <Select 
                        value={settings.bandwidth} 
                        onValueChange={(value) => updateSetting('bandwidth', value)}
                      >
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-gray-300">Data Compression</Label>
                        <p className="text-sm text-gray-500">Compress network traffic</p>
                      </div>
                      <Switch 
                        checked={settings.compression}
                        onCheckedChange={(value) => updateSetting('compression', value)}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* User Management */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <User className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">USER PROFILE</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Operator ID</Label>
                      <Input 
                        value="OPERATOR_001"
                        disabled
                        className="bg-gray-800 border-gray-700 text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Clearance Level</Label>
                      <Input 
                        value="SECRET"
                        disabled
                        className="bg-gray-800 border-gray-700 text-gray-400"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-gray-300">Last Login</Label>
                      <Input 
                        value="2024-12-16 12:34:56"
                        disabled
                        className="bg-gray-800 border-gray-700 text-gray-400"
                      />
                    </div>
                    
                    <Button variant="outline" className="w-full border-gray-700 text-gray-400 hover:bg-gray-800 bg-[rgba(48,48,82,0.3215686274509804)]">
                      <Key className="w-4 h-4 mr-2" />
                      CHANGE PASSWORD
                    </Button>
                  </div>
                </div>
              </Card>

              {/* System Information */}
              <Card className="bg-gray-900 border-gray-700">
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Database className="w-5 h-5 text-gray-400" />
                    <h2 className="font-semibold text-gray-200">SYSTEM INFORMATION</h2>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Version</span>
                      <span className="text-gray-300">v1.2.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Build</span>
                      <span className="text-gray-300">20241216-1234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Platform</span>
                      <span className="text-gray-300">NixOS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Uptime</span>
                      <span className="text-gray-300">72h 15m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Memory Usage</span>
                      <span className="text-gray-300">45.2 MB</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 mt-8 pt-6 border-t border-gray-800 pb-6">
            <Button variant="outline" className="border-gray-700 text-gray-400 hover:bg-gray-800">
              RESET TO DEFAULTS
            </Button>
            <Button variant="secondary" className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300">
              SAVE CONFIGURATION
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}