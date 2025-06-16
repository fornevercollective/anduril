import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { ChevronDown, MoreHorizontal, Play, Pause, SkipForward } from 'lucide-react';
import { useState } from 'react';

interface Entity {
  id: string;
  name: string;
  type: string;
  status: string;
  dataSync: string;
  position: { x: number; y: number };
  altitude: string;
  heading: string;
  location: string;
  lastUpdated: string;
  created: string;
  mmsi: string;
  destination: string;
  callsign: string;
  flag: string;
  imo: string;
  length: string;
  activity: string;
  speed: string;
  eta: string;
  timeSinceCreation: string;
}

interface EntitySidebarProps {
  entity: Entity;
  onEntitySelect: (entity: Entity) => void;
  entities: Entity[];
}

export function EntitySidebar({ entity, onEntitySelect, entities }: EntitySidebarProps) {
  const [isTrackDataExpanded, setIsTrackDataExpanded] = useState(true);
  const [isPayloadsExpanded, setIsPayloadsExpanded] = useState(true);
  const [isDataOverridesExpanded, setIsDataOverridesExpanded] = useState(true);

  return (
    <div className="w-80 bg-gray-950 border-r border-gray-800 flex flex-col">
      {/* Entity Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg text-gray-200">{entity.name}</h2>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <Badge variant="outline" className="border-gray-600 text-gray-400">
            {entity.status}
          </Badge>
          <span className="text-xs text-gray-500">Data sync: {entity.dataSync}</span>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center space-x-2 mb-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <Play className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <Pause className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <SkipForward className="w-3 h-3" />
          </Button>
          
          <div className="flex-1 text-center text-xs text-gray-500">
            0:56:14 00:52 - LIVE
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Track Data Section */}
        <div className="border-b border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto text-left text-gray-300 hover:text-gray-200 hover:bg-gray-800"
            onClick={() => setIsTrackDataExpanded(!isTrackDataExpanded)}
          >
            <span>TRACK DATA</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isTrackDataExpanded ? 'rotate-180' : ''}`} />
          </Button>
          
          {isTrackDataExpanded && (
            <div className="px-4 pb-4 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="text-gray-500 mb-1">Activity</div>
                  <div className="text-gray-300">{entity.activity}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Altitude</div>
                  <div className="text-gray-300">{entity.altitude}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Domain</div>
                  <div className="text-gray-300">{entity.type}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Heading</div>
                  <div className="text-gray-300">{entity.heading}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Speed</div>
                  <div className="text-gray-300">{entity.speed}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Location</div>
                  <div className="text-gray-300">{entity.location}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">RCS</div>
                  <div className="text-gray-300">Unknown</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Last Updated</div>
                  <div className="text-gray-300">{entity.lastUpdated}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">MMSI</div>
                  <div className="text-gray-300">{entity.mmsi}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Created</div>
                  <div className="text-gray-300">{entity.created}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Destination</div>
                  <div className="text-gray-300">{entity.destination}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Flag</div>
                  <div className="text-gray-300">{entity.flag}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Callsign</div>
                  <div className="text-gray-300">{entity.callsign}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Imo</div>
                  <div className="text-gray-300">{entity.imo}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">ETA</div>
                  <div className="text-gray-300">{entity.eta}</div>
                </div>
                <div>
                  <div className="text-gray-500 mb-1">Length</div>
                  <div className="text-gray-300">{entity.length}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-500 mb-1">Time Since Creation</div>
                  <div className="text-gray-300">{entity.timeSinceCreation}</div>
                </div>
              </div>
            </div>
          )}
        </div>

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
            <div className="px-4 pb-4">
              <div className="bg-gray-700 text-gray-200 px-3 py-2 rounded text-sm text-center cursor-pointer hover:bg-gray-600 hover:text-gray-100 transition-colors">
                Task ⌄
              </div>
            </div>
          )}
        </div>

        {/* Data Overrides Section */}
        <div>
          <Button
            variant="ghost"
            className="w-full justify-between p-4 h-auto text-left text-gray-300 hover:text-gray-200 hover:bg-gray-800"
            onClick={() => setIsDataOverridesExpanded(!isDataOverridesExpanded)}
          >
            <span>DATA OVERRIDES</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isDataOverridesExpanded ? 'rotate-180' : ''}`} />
          </Button>
          
          {isDataOverridesExpanded && (
            <div className="px-4 pb-4">
              <div className="text-sm text-gray-500">
                No active data overrides
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}