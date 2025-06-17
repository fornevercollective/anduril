import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Search, 
  Filter, 
  Target, 
  AlertTriangle, 
  Shield, 
  Navigation, 
  Radio,
  Clock,
  MapPin,
  Activity,
  Eye,
  EyeOff,
  Star,
  MoreVertical
} from 'lucide-react';

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
}

interface EntityManagerProps {
  entities: Entity[];
  selectedEntity: Entity | null;
  onEntitySelect: (entity: Entity | null) => void;
  onEntityUpdate?: (entity: Entity) => void;
  onEntityDelete?: (entityId: string) => void;
}

export function EntityManager({
  entities,
  selectedEntity,
  onEntitySelect,
  onEntityUpdate,
  onEntityDelete
}: EntityManagerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterThreat, setFilterThreat] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'threat' | 'distance' | 'updated'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [hiddenEntities, setHiddenEntities] = useState<Set<string>>(new Set());
  const [trackedEntities, setTrackedEntities] = useState<Set<string>>(new Set());

  // Filter and sort entities
  const filteredEntities = entities
    .filter(entity => {
      if (searchTerm && !entity.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filterStatus !== 'all' && entity.status.toLowerCase() !== filterStatus.toLowerCase()) {
        return false;
      }
      if (filterType !== 'all' && entity.type.toLowerCase() !== filterType.toLowerCase()) {
        return false;
      }
      if (filterThreat !== 'all' && entity.threat_level.toLowerCase() !== filterThreat.toLowerCase()) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      let compareValue = 0;
      
      switch (sortBy) {
        case 'name':
          compareValue = a.name.localeCompare(b.name);
          break;
        case 'threat':
          const threatOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
          compareValue = threatOrder[a.threat_level] - threatOrder[b.threat_level];
          break;
        case 'distance':
          const centerX = 400, centerY = 300; // Map center
          const distA = Math.sqrt(Math.pow(a.position.x - centerX, 2) + Math.pow(a.position.y - centerY, 2));
          const distB = Math.sqrt(Math.pow(b.position.x - centerX, 2) + Math.pow(b.position.y - centerY, 2));
          compareValue = distA - distB;
          break;
        case 'updated':
          compareValue = new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime();
          break;
      }
      
      return sortOrder === 'asc' ? compareValue : -compareValue;
    });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Friendly':
        return <Shield className="w-4 h-4 text-green-400" />;
      case 'Hostile':
        return <Target className="w-4 h-4 text-red-400" />;
      case 'Neutral':
        return <Navigation className="w-4 h-4 text-yellow-400" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-purple-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Friendly':
        return 'bg-green-900 text-green-300 border-green-700';
      case 'Hostile':
        return 'bg-red-900 text-red-300 border-red-700';
      case 'Neutral':
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      default:
        return 'bg-purple-900 text-purple-300 border-purple-700';
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-900 text-red-300 border-red-700';
      case 'High':
        return 'bg-orange-900 text-orange-300 border-orange-700';
      case 'Medium':
        return 'bg-yellow-900 text-yellow-300 border-yellow-700';
      default:
        return 'bg-gray-900 text-gray-300 border-gray-700';
    }
  };

  const toggleEntityVisibility = (entityId: string) => {
    const newHidden = new Set(hiddenEntities);
    if (newHidden.has(entityId)) {
      newHidden.delete(entityId);
    } else {
      newHidden.add(entityId);
    }
    setHiddenEntities(newHidden);
  };

  const toggleEntityTracking = (entityId: string) => {
    const newTracked = new Set(trackedEntities);
    if (newTracked.has(entityId)) {
      newTracked.delete(entityId);
    } else {
      newTracked.add(entityId);
    }
    setTrackedEntities(newTracked);
  };

  const getEntityDistance = (entity: Entity) => {
    const centerX = 400, centerY = 300;
    const distance = Math.sqrt(
      Math.pow(entity.position.x - centerX, 2) + 
      Math.pow(entity.position.y - centerY, 2)
    );
    return (distance * 0.1).toFixed(1); // Convert to km
  };

  return (
    <div className="h-full bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-200">ENTITY MANAGER</h2>
            <p className="text-sm text-gray-400">{filteredEntities.length} of {entities.length} entities</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-900 text-green-300 border-green-700">
              {entities.filter(e => e.status === 'Friendly').length} Friendly
            </Badge>
            <Badge className="bg-red-900 text-red-300 border-red-700">
              {entities.filter(e => e.status === 'Hostile').length} Hostile
            </Badge>
            <Badge className="bg-yellow-900 text-yellow-300 border-yellow-700">
              {entities.filter(e => e.status === 'Neutral').length} Neutral
            </Badge>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700 text-gray-200"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200"
            >
              <option value="all">All Status</option>
              <option value="friendly">Friendly</option>
              <option value="hostile">Hostile</option>
              <option value="neutral">Neutral</option>
              <option value="unknown">Unknown</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200"
            >
              <option value="all">All Types</option>
              <option value="air">Air</option>
              <option value="surface">Surface</option>
              <option value="land">Land</option>
              <option value="subsurface">Subsurface</option>
            </select>
            
            <select
              value={filterThreat}
              onChange={(e) => setFilterThreat(e.target.value)}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200"
            >
              <option value="all">All Threats</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field as any);
                setSortOrder(order as any);
              }}
              className="px-3 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-gray-200"
            >
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="threat-desc">Threat High-Low</option>
              <option value="threat-asc">Threat Low-High</option>
              <option value="distance-asc">Distance Near-Far</option>
              <option value="distance-desc">Distance Far-Near</option>
              <option value="updated-desc">Recently Updated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Entity List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredEntities.map((entity) => (
          <Card
            key={entity.id}
            className={`bg-gray-900 border-gray-700 p-3 cursor-pointer transition-all hover:bg-gray-800 ${
              selectedEntity?.id === entity.id ? 'border-cyan-700 bg-cyan-900/20' : ''
            } ${
              hiddenEntities.has(entity.id) ? 'opacity-50' : ''
            }`}
            onClick={() => onEntitySelect(entity)}
          >
            <div className="space-y-3">
              {/* Header Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(entity.status)}
                  <div>
                    <h3 className="font-medium text-gray-200 flex items-center space-x-2">
                      <span>{entity.name}</span>
                      {trackedEntities.has(entity.id) && (
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      )}
                    </h3>
                    <p className="text-xs text-gray-500">{entity.type} • {entity.classification}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(entity.status)}>
                    {entity.status.toUpperCase()}
                  </Badge>
                  <Badge className={getThreatColor(entity.threat_level)}>
                    {entity.threat_level.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 block">Distance</span>
                  <span className="text-gray-300">{getEntityDistance(entity)} km</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Speed</span>
                  <span className="text-gray-300">
                    {entity.speed ? `${Math.round(entity.speed)} kts` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 block">Heading</span>
                  <span className="text-gray-300">
                    {entity.heading ? `${Math.round(entity.heading)}°` : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500 block">Track Quality</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-1">
                      <div 
                        className={`h-full rounded-full ${
                          entity.track_confidence > 80 ? 'bg-green-500' :
                          entity.track_confidence > 60 ? 'bg-yellow-500' :
                          entity.track_confidence > 40 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${entity.track_confidence}%` }}
                      />
                    </div>
                    <span className="text-gray-300">{Math.round(entity.track_confidence)}%</span>
                  </div>
                </div>
                <div>
                  <span className="text-gray-500 block">Last Contact</span>
                  <span className="text-gray-300 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{entity.last_updated}</span>
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEntityVisibility(entity.id);
                    }}
                    className="h-6 px-2 text-xs"
                  >
                    {hiddenEntities.has(entity.id) ? (
                      <EyeOff className="w-3 h-3" />
                    ) : (
                      <Eye className="w-3 h-3" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleEntityTracking(entity.id);
                    }}
                    className="h-6 px-2 text-xs"
                  >
                    <Star className={`w-3 h-3 ${
                      trackedEntities.has(entity.id) ? 'text-yellow-400 fill-current' : ''
                    }`} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs"
                  >
                    <MapPin className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <Activity className="w-3 h-3" />
                  <span>Live</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {filteredEntities.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Filter className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No entities match current filters</p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="grid grid-cols-4 gap-4 text-xs">
          <div className="text-center">
            <div className="text-lg font-semibold text-green-400">
              {entities.filter(e => e.status === 'Friendly').length}
            </div>
            <div className="text-gray-400">Friendly</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-red-400">
              {entities.filter(e => e.status === 'Hostile').length}
            </div>
            <div className="text-gray-400">Hostile</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-yellow-400">
              {entities.filter(e => e.threat_level === 'High' || e.threat_level === 'Critical').length}
            </div>
            <div className="text-gray-400">High Threat</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-cyan-400">
              {trackedEntities.size}
            </div>
            <div className="text-gray-400">Tracked</div>
          </div>
        </div>
      </div>
    </div>
  );
}