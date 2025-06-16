import { Button } from './ui/button';
import { Play, Pause, SkipBack, SkipForward, Square } from 'lucide-react';
import { Slider } from './ui/slider';

interface TimelineControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTime: string;
  duration: string;
  isLive: boolean;
}

export function TimelineControls({ 
  isPlaying, 
  onTogglePlay, 
  currentTime, 
  duration, 
  isLive 
}: TimelineControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-3">
      <div className="flex items-center space-x-4">
        {/* Playback Controls */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <SkipBack className="w-4 h-4" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800"
            onClick={onTogglePlay}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <Square className="w-4 h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-gray-300 hover:bg-gray-800">
            <SkipForward className="w-4 h-4" />
          </Button>
        </div>

        {/* Time Display */}
        <div className="flex items-center space-x-2 text-sm font-mono">
          <span className="text-gray-400">{currentTime}</span>
          <span className="text-gray-600">{duration}</span>
          {isLive && (
            <>
              <span className="text-gray-600">-</span>
              <span className="text-gray-500">LIVE</span>
            </>
          )}
        </div>

        {/* Timeline Slider */}
        <div className="flex-1 bg-[rgba(0,0,0,0)]">
          <Slider
            value={[75]}
            max={100}
            step={1}
            className="w-full 303035"
          />
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">Speed:</span>
          <div className="bg-gray-800 rounded px-2 py-1 text-xs font-mono text-gray-300 hover:bg-gray-700 cursor-pointer transition-colors">
            1.0x
          </div>
        </div>

        {/* Recording Indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <span className="text-xs text-gray-600">REC</span>
        </div>
      </div>
    </div>
  );
}