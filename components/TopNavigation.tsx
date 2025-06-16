import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Settings, Users, Map, Activity, Wifi, Terminal } from 'lucide-react';

interface TopNavigationProps {
  isLive: boolean;
  onToggleLive: () => void;
  currentTime: Date;
}

export function TopNavigation({ isLive, onToggleLive, currentTime }: TopNavigationProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).toUpperCase();
  };

  return (
    <div className="h-12 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-300">ANDURIL TACTICAL</span>
        </div>
        
        <Badge 
          variant={isLive ? "default" : "secondary"} 
          className={`${isLive ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'} text-gray-300 border-gray-600 cursor-pointer transition-colors`}
        >
          <div className={`w-2 h-2 rounded-full mr-2 ${isLive ? 'bg-gray-400' : 'bg-gray-600'}`} />
          {isLive ? 'LIVE' : 'OFFLINE'}
        </Badge>
      </div>

      {/* Center Section */}
      <div className="flex items-center space-x-6">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
          <Map className="w-4 h-4 mr-2" />
          Track
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
          <Activity className="w-4 h-4 mr-2" />
          Analytics
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
          <Users className="w-4 h-4 mr-2" />
          Entities
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-400">
          {formatTime(currentTime)}
        </div>
        
        <div className="flex items-center space-x-2">
          <Wifi className="w-4 h-4 text-gray-500" />
          <span className="text-xs text-gray-500">Online</span>
        </div>
        
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
          <Terminal className="w-4 h-4" />
        </Button>
        
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-800">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}