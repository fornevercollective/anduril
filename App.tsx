import { useState, useEffect } from 'react';
import { SideMenu } from './components/SideMenu';
import { MapView } from './components/MapView';
import { EntitySidebar } from './components/EntitySidebar';
import { PayloadsSidebar } from './components/PayloadsSidebar';
import { TopNavigation } from './components/TopNavigation';
import { TimelineControls } from './components/TimelineControls';
import { MockSDK } from './components/MockSDK';

// Mock entity data
const mockEntities = [
  {
    id: 'VESSEL_1',
    name: 'VESSEL 1',
    type: 'Surface',
    status: 'Neutral',
    dataSync: 'manual',
    position: { x: 400, y: 300 },
    altitude: 'No Altitude MSL',
    heading: 'No Heading',
    location: '25.7641°, -80.1443°',
    lastUpdated: '3s',
    created: '12/2/2024, 10:43:36',
    mmsi: '36817',
    destination: 'No Destination',
    callsign: 'No Callsign',
    flag: 'No Flag',
    imo: 'No Imo',
    length: 'No Length',
    activity: 'No Activity',
    speed: 'No Speed',
    eta: 'Unknown',
    timeSinceCreation: '1m 45s'
  }
];

export default function App() {
  const [selectedEntity, setSelectedEntity] = useState(mockEntities[0]);
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (isLive) {
        // Simulate entity movement
        setSelectedEntity(prev => ({
          ...prev,
          position: {
            x: prev.position.x + (Math.random() - 0.5) * 2,
            y: prev.position.y + (Math.random() - 0.5) * 2
          }
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="h-screen bg-gray-950 text-white flex overflow-hidden">
      {/* Left Side Menu */}
      <SideMenu />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNavigation 
          isLive={isLive} 
          onToggleLive={() => setIsLive(!isLive)}
          currentTime={currentTime}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Entity Sidebar */}
          <EntitySidebar 
            entity={selectedEntity}
            onEntitySelect={setSelectedEntity}
            entities={mockEntities}
          />
          
          {/* Map View */}
          <div className="flex-1 relative">
            <MapView 
              entities={mockEntities}
              selectedEntity={selectedEntity}
              onEntitySelect={setSelectedEntity}
            />
            
            {/* Timeline Controls */}
            <TimelineControls 
              isPlaying={isPlaying}
              onTogglePlay={() => setIsPlaying(!isPlaying)}
              currentTime="0:56:14"
              duration="00:52"
              isLive={isLive}
            />
          </div>
          
          {/* Payloads Sidebar */}
          <PayloadsSidebar />
        </div>
      </div>
      
      {/* Mock SDK Integration */}
      <MockSDK />
    </div>
  );
}