import { useState, useEffect } from 'react';
import { SideMenu } from './components/SideMenu';
import { MapView } from './components/MapView';
import { EntitySidebar } from './components/EntitySidebar';
import { EntityManager } from './components/EntityManager';
import { PayloadsSidebar } from './components/PayloadsSidebar';
import { TopNavigation } from './components/TopNavigation';
import { TimelineControls } from './components/TimelineControls';
import { MockSDK } from './components/MockSDK';
import { useIsMobile, useViewportSize } from './components/ui/use-mobile';

// Page Components
import { TargetsPage } from './components/pages/TargetsPage';
import { SensorsPage } from './components/pages/SensorsPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { EntitiesPage } from './components/pages/EntitiesPage';
import { IntelPage } from './components/pages/IntelPage';
import { DefensePage } from './components/pages/DefensePage';
import { SettingsPage } from './components/pages/SettingsPage';
import { TerminalPage } from './components/pages/TerminalPage';
import { TechPage } from './components/pages/TechPage';

// Enhanced entity interface matching the new system
interface Entity {
  id: string;
  name: string;
  type: 'Surface' | 'Air' | 'Land' | 'Subsurface' | 'Unknown';
  status: 'Friendly' | 'Hostile' | 'Neutral' | 'Unknown';
  position: { x: number; y: number; z?: number };
  heading?: number;
  speed?: number;
  altitude?: number;
  classification: 'Military' | 'Civilian' | 'Commercial' | 'Unknown';
  threat_level: 'Low' | 'Medium' | 'High' | 'Critical';
  last_updated: string;
  track_confidence: number;
  metadata?: Record<string, any>;
  first_detected?: string;
  last_contact?: string;
  track_quality?: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  iff_status?: 'Friendly' | 'Hostile' | 'Unknown' | 'Unresponsive';
  // Legacy compatibility fields
  dataSync?: string;
  location?: string;
  created?: string;
  mmsi?: string;
  destination?: string;
  callsign?: string;
  flag?: string;
  imo?: string;
  length?: string;
  activity?: string;
  eta?: string;
  timeSinceCreation?: string;
}

// Enhanced mock entity data with tactical information
const generateMockEntities = (): Entity[] => [
  {
    id: 'VESSEL_1',
    name: 'VESSEL 1',
    type: 'Surface',
    status: 'Neutral',
    position: { x: 400, y: 300 },
    heading: 45,
    speed: 12.5,
    classification: 'Commercial',
    threat_level: 'Low',
    last_updated: '3s',
    track_confidence: 85,
    first_detected: '12/2/2024, 10:43:36',
    last_contact: '3s ago',
    track_quality: 'Good',
    iff_status: 'Unknown',
    // Legacy fields for compatibility
    dataSync: 'manual',
    altitude: 'No Altitude MSL',
    location: '25.7641°, -80.1443°',
    created: '12/2/2024, 10:43:36',
    mmsi: '36817',
    destination: 'No Destination',
    callsign: 'No Callsign',
    flag: 'No Flag',
    imo: 'No Imo',
    length: 'No Length',
    activity: 'No Activity',
    eta: 'Unknown',
    timeSinceCreation: '1m 45s'
  },
  {
    id: 'AIRCRAFT_1',
    name: 'UNKNOWN AIRCRAFT',
    type: 'Air',
    status: 'Unknown',
    position: { x: 600, y: 200 },
    heading: 270,
    speed: 180,
    altitude: 8500,
    classification: 'Unknown',
    threat_level: 'Medium',
    last_updated: '15s',
    track_confidence: 65,
    first_detected: '12/2/2024, 11:25:14',
    last_contact: '15s ago',
    track_quality: 'Fair',
    iff_status: 'Unresponsive',
    dataSync: 'auto',
    location: '25.8641°, -80.2443°',
    created: '12/2/2024, 11:25:14',
    timeSinceCreation: '18m 12s'
  },
  {
    id: 'PATROL_1',
    name: 'FRIENDLY PATROL',
    type: 'Surface',
    status: 'Friendly',
    position: { x: 200, y: 450 },
    heading: 120,
    speed: 25,
    classification: 'Military',
    threat_level: 'Low',
    last_updated: '1s',
    track_confidence: 98,
    first_detected: '12/2/2024, 09:15:23',
    last_contact: '1s ago',
    track_quality: 'Excellent',
    iff_status: 'Friendly',
    dataSync: 'auto',
    location: '25.6841°, -80.3443°',
    created: '12/2/2024, 09:15:23',
    callsign: 'PATROL-1',
    timeSinceCreation: '2h 28m 45s'
  },
  {
    id: 'HOSTILE_1',
    name: 'HOSTILE CONTACT',
    type: 'Surface',
    status: 'Hostile',
    position: { x: 750, y: 350 },
    heading: 315,
    speed: 35,
    classification: 'Military',
    threat_level: 'High',
    last_updated: '8s',
    track_confidence: 92,
    first_detected: '12/2/2024, 11:45:07',
    last_contact: '8s ago',
    track_quality: 'Good',
    iff_status: 'Hostile',
    dataSync: 'auto',
    location: '25.9241°, -80.0943°',
    created: '12/2/2024, 11:45:07',
    timeSinceCreation: '58m 31s'
  },
  {
    id: 'SUBMARINE_1',
    name: 'SUBSURFACE CONTACT',
    type: 'Subsurface',
    status: 'Unknown',
    position: { x: 500, y: 500, z: -150 },
    heading: 90,
    speed: 8,
    classification: 'Military',
    threat_level: 'Critical',
    last_updated: '45s',
    track_confidence: 42,
    first_detected: '12/2/2024, 10:55:18',
    last_contact: '45s ago',
    track_quality: 'Poor',
    iff_status: 'Unknown',
    dataSync: 'passive',
    location: '25.7341°, -80.1843°',
    created: '12/2/2024, 10:55:18',
    timeSinceCreation: '1h 48m 20s'
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('map');
  const [entities, setEntities] = useState<Entity[]>(generateMockEntities());
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(entities[0]);
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [showEntityManager, setShowEntityManager] = useState(false);
  
  const isMobile = useIsMobile();
  const viewport = useViewportSize();

  // Enhanced real-time updates with more realistic movement patterns
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      if (isLive) {
        setEntities(prevEntities => 
          prevEntities.map(entity => {
            // Update position based on heading and speed
            const headingRad = (entity.heading || 0) * Math.PI / 180;
            const speedFactor = (entity.speed || 0) * 0.02; // Scale factor for visualization
            
            const newX = entity.position.x + Math.cos(headingRad) * speedFactor;
            const newY = entity.position.y + Math.sin(headingRad) * speedFactor;
            
            // Add some random variation to make movement more realistic
            const jitter = 0.5;
            const finalX = newX + (Math.random() - 0.5) * jitter;
            const finalY = newY + (Math.random() - 0.5) * jitter;
            
            // Keep entities within bounds
            const boundedX = Math.max(50, Math.min(950, finalX));
            const boundedY = Math.max(50, Math.min(650, finalY));
            
            // Occasionally change heading for more dynamic movement
            let newHeading = entity.heading;
            if (Math.random() < 0.05) { // 5% chance per update
              newHeading = (entity.heading || 0) + (Math.random() - 0.5) * 20;
              newHeading = ((newHeading % 360) + 360) % 360; // Normalize to 0-360
            }
            
            // Update track confidence based on contact age
            const baseConfidence = entity.track_confidence;
            const confidenceDecay = Math.random() * 2; // Gradual confidence decay
            const newConfidence = Math.max(20, baseConfidence - confidenceDecay * 0.1);
            
            return {
              ...entity,
              position: { ...entity.position, x: boundedX, y: boundedY },
              heading: newHeading,
              track_confidence: newConfidence,
              last_updated: Math.floor(Math.random() * 30) + 1 + 's' // Random update time
            };
          })
        );
        
        // Update selected entity if it exists
        setSelectedEntity(prev => {
          if (!prev) return null;
          const updatedEntity = entities.find(e => e.id === prev.id);
          return updatedEntity || prev;
        });
      }
    }, 2000); // Update every 2 seconds for more realistic tracking

    return () => clearInterval(interval);
  }, [isLive, entities]);

  // Auto-close side menu on mobile when page changes
  useEffect(() => {
    if (isMobile) {
      setIsSideMenuOpen(false);
    }
  }, [currentPage, isMobile]);

  // Handle mobile menu toggle
  const handleMenuToggle = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  // Handle entity updates
  const handleEntityUpdate = (updatedEntity: Entity) => {
    setEntities(prev => 
      prev.map(entity => 
        entity.id === updatedEntity.id ? updatedEntity : entity
      )
    );
  };

  // Handle entity deletion
  const handleEntityDelete = (entityId: string) => {
    setEntities(prev => prev.filter(entity => entity.id !== entityId));
    if (selectedEntity?.id === entityId) {
      setSelectedEntity(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'targets':
        return <TargetsPage />;
      case 'sensors':
        return <SensorsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'entities':
        return <EntitiesPage />;
      case 'intel':
        return <IntelPage />;
      case 'defense':
        return <DefensePage />;
      case 'settings':
        return <SettingsPage />;
      case 'terminal':
        return <TerminalPage />;
      case 'tech':
        return <TechPage />;
      case 'map':
      default:
        return (
          <div className={`flex overflow-hidden ${isMobile ? 'flex-col' : ''}`}>
            {/* Entity Management Sidebar */}
            {!isMobile && showEntityManager && (
              <div className="w-80 border-r border-gray-700">
                <EntityManager
                  entities={entities}
                  selectedEntity={selectedEntity}
                  onEntitySelect={setSelectedEntity}
                  onEntityUpdate={handleEntityUpdate}
                  onEntityDelete={handleEntityDelete}
                />
              </div>
            )}
            
            {/* Legacy Entity Sidebar - shown when entity manager is not active */}
            {!isMobile && !showEntityManager && (
              <EntitySidebar 
                entity={selectedEntity}
                onEntitySelect={setSelectedEntity}
                entities={entities}
              />
            )}
            
            <div className="flex-1 relative overflow-hidden">
              <MapView 
                entities={entities}
                selectedEntity={selectedEntity}
                onEntitySelect={setSelectedEntity}
              />
              
              <TimelineControls 
                isPlaying={isPlaying}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                currentTime="0:56:14"
                duration="00:52"
                isLive={isLive}
              />
              
              {/* Map controls overlay */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowEntityManager(!showEntityManager)}
                    className={`px-3 py-1 text-xs rounded border transition-colors ${
                      showEntityManager 
                        ? 'bg-cyan-600 border-cyan-500 text-white' 
                        : 'bg-gray-900/80 border-gray-700 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {showEntityManager ? 'Hide Manager' : 'Show Manager'}
                  </button>
                  <button
                    onClick={() => setIsLive(!isLive)}
                    className={`px-3 py-1 text-xs rounded border transition-colors ${
                      isLive 
                        ? 'bg-green-600 border-green-500 text-white' 
                        : 'bg-gray-900/80 border-gray-700 text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {isLive ? 'LIVE' : 'PAUSED'}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Payloads Sidebar - hidden on mobile in map view */}
            {!isMobile && <PayloadsSidebar />}

            {/* Mobile entity info overlay */}
            {isMobile && selectedEntity && (
              <div className="absolute bottom-20 left-4 right-4 bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg p-4 shadow-lg z-20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-200">{selectedEntity.name}</h3>
                  <button
                    onClick={() => setSelectedEntity(null)}
                    className="text-gray-400 hover:text-gray-200 p-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-sm text-gray-400 space-y-1">
                  <div>Type: {selectedEntity.type}</div>
                  <div>Status: {selectedEntity.status}</div>
                  <div>Threat: {selectedEntity.threat_level}</div>
                  {selectedEntity.speed && <div>Speed: {Math.round(selectedEntity.speed)} kts</div>}
                  {selectedEntity.heading && <div>Heading: {Math.round(selectedEntity.heading)}°</div>}
                  <div>Confidence: {Math.round(selectedEntity.track_confidence)}%</div>
                  <div>Last Updated: {selectedEntity.last_updated}</div>
                </div>
              </div>
            )}

            {/* Mobile entity manager overlay */}
            {isMobile && showEntityManager && (
              <div className="absolute inset-0 bg-gray-950 z-30">
                <div className="h-full flex flex-col">
                  <div className="flex-shrink-0 p-4 border-b border-gray-700">
                    <button
                      onClick={() => setShowEntityManager(false)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      ← Back to Map
                    </button>
                  </div>
                  <div className="flex-1">
                    <EntityManager
                      entities={entities}
                      selectedEntity={selectedEntity}
                      onEntitySelect={setSelectedEntity}
                      onEntityUpdate={handleEntityUpdate}
                      onEntityDelete={handleEntityDelete}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`h-screen bg-gray-950 text-white flex overflow-hidden ${isMobile ? 'relative' : ''}`}>
      {/* Mobile overlay when menu is open */}
      {isMobile && isSideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSideMenuOpen(false)}
        />
      )}

      {/* Side Menu */}
      <div className={`
        ${isMobile 
          ? `fixed left-0 top-0 h-full z-50 transform transition-transform duration-300 ease-in-out ${
              isSideMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`
          : 'relative'
        }
      `}>
        <SideMenu 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          isMobile={isMobile}
          onClose={() => setIsSideMenuOpen(false)}
        />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavigation 
          isLive={isLive} 
          onToggleLive={() => setIsLive(!isLive)}
          currentTime={currentTime}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isMobile={isMobile}
          onMenuToggle={handleMenuToggle}
        />
        
        <div className="flex-1 overflow-hidden safe-area-bottom">
          {renderPage()}
        </div>
      </div>
      
      {/* Mock SDK - hidden on mobile */}
      {!isMobile && <MockSDK />}
    </div>
  );
}
