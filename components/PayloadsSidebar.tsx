import { Button } from './ui/button';
import { ChevronDown, Plus, Settings } from 'lucide-react';
import { useState } from 'react';

export function PayloadsSidebar() {
  const [isPayloadsExpanded, setIsPayloadsExpanded] = useState(true);
  const [isDataOverridesExpanded, setIsDataOverridesExpanded] = useState(true);

  return (
    <div className="w-80 bg-gray-950 border-l border-gray-800 flex flex-col">
      {/* Payloads Section */}
      <div className="border-b border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-between p-4 h-auto text-left text-gray-300 hover:text-gray-200 hover:bg-gray-800"
          onClick={() => setIsPayloadsExpanded(!isPayloadsExpanded)}
        >
          <span>PAYLOADS</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isPayloadsExpanded ? 'rotate-180' : ''}`} />
        </Button>
        
        {isPayloadsExpanded && (
          <div className="px-4 pb-4 space-y-3">
            {/* Active Payloads */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Active Payloads</div>
              
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Reconnaissance Sensor</span>
                  <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Status: Active</div>
                  <div>Range: 5.2 km</div>
                  <div>FOV: 45° x 30°</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Communications Array</span>
                  <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>Status: Standby</div>
                  <div>Frequency: 2.4 GHz</div>
                  <div>Power: 85%</div>
                </div>
              </div>
            </div>

            {/* Payload Controls */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Payload Controls</div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-gray-300 hover:bg-gray-800 hover:border-gray-600 bg-[rgba(48,48,53,1)]">
                  <Settings className="w-3 h-3 mr-2" />
                  Configure
                </Button>
                
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-400 hover:text-gray-300 hover:bg-gray-800 hover:border-gray-600 bg-[rgba(48,48,53,1)]">
                  <Plus className="w-3 h-3 mr-2" />
                  Deploy
                </Button>
              </div>
            </div>

            {/* Mission Tasks */}
            <div className="space-y-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Mission Tasks</div>
              
              <div className="bg-gray-700 text-gray-200 px-3 py-2 rounded text-sm text-center cursor-pointer hover:bg-gray-600 hover:text-gray-100 transition-colors">
                Task ⌄
              </div>
              
              <div className="text-xs text-gray-500">
                Auto-reconnaissance pattern active
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Data Overrides Section */}
      <div className="border-b border-gray-800">
        <Button
          variant="ghost"
          className="w-full justify-between p-4 h-auto text-left text-gray-300 hover:text-gray-200 hover:bg-gray-800"
          onClick={() => setIsDataOverridesExpanded(!isDataOverridesExpanded)}
        >
          <span>DATA OVERRIDES</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isDataOverridesExpanded ? 'rotate-180' : ''}`} />
        </Button>
        
        {isDataOverridesExpanded && (
          <div className="px-4 pb-4 space-y-3">
            <div className="text-sm text-gray-500">
              No active data overrides
            </div>
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-400 hover:text-gray-300 hover:bg-gray-800 hover:border-gray-600 bg-[rgba(48,48,53,1)]">
                Add Classification Override
              </Button>
              
              <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-400 hover:text-gray-300 hover:bg-gray-800 hover:border-gray-600 bg-[rgba(48,48,53,1)]">
                Add Position Override
              </Button>
              
              <Button variant="outline" size="sm" className="w-full border-gray-700 text-gray-400 hover:text-gray-300 hover:bg-gray-800 hover:border-gray-600 bg-[rgba(48,48,53,1)]">
                Add Velocity Override
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div className="flex-1 p-4">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">System Status</div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Lattice Connection</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Connected</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">SDK Status</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-500">Active</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Data Stream</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
              <span className="text-xs text-gray-600">Live</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">GPU Compute</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-500">NVIDIA Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}