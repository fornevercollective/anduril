import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2, Navigation } from 'lucide-react';

interface Entity {
  id: string;
  name: string;
  type: string;
  status: string;
  position: { x: number; y: number };
  [key: string]: any;
}

interface MapViewProps {
  entities: Entity[];
  selectedEntity: Entity;
  onEntitySelect: (entity: Entity) => void;
}

export function MapView({ entities, selectedEntity, onEntitySelect }: MapViewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

  // Draw the tactical map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw entities
    entities.forEach(entity => {
      drawEntity(ctx, entity, entity.id === selectedEntity.id);
    });

    // Draw tracking vectors for selected entity
    if (selectedEntity) {
      drawTrackingVectors(ctx, selectedEntity);
    }

    // Draw compass
    drawCompass(ctx, canvas.width, canvas.height);

    // Draw scale
    drawScale(ctx, canvas.width, canvas.height);
  }, [entities, selectedEntity, zoomLevel, panOffset]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    
    const gridSize = 50 * zoomLevel;
    
    for (let x = panOffset.x % gridSize; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = panOffset.y % gridSize; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawEntity = (ctx: CanvasRenderingContext2D, entity: Entity, isSelected: boolean) => {
    const x = entity.position.x * zoomLevel + panOffset.x;
    const y = entity.position.y * zoomLevel + panOffset.y;

    // Draw entity icon
    ctx.fillStyle = isSelected ? '#64748b' : '#475569';
    ctx.beginPath();
    ctx.arc(x, y, isSelected ? 8 : 6, 0, 2 * Math.PI);
    ctx.fill();

    // Draw entity outline
    ctx.strokeStyle = isSelected ? '#6b7280' : '#64748b';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw entity label
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px monospace';
    ctx.fillText(entity.name, x + 12, y - 8);
  };

  const drawTrackingVectors = (ctx: CanvasRenderingContext2D, entity: Entity) => {
    const x = entity.position.x * zoomLevel + panOffset.x;
    const y = entity.position.y * zoomLevel + panOffset.y;

    // Draw tracking vectors (simulated) - using muted colors
    ctx.strokeStyle = '#6b7280';
    ctx.lineWidth = 2;
    
    const vectors = [
      { endX: x - 100, endY: y - 80 },
      { endX: x - 120, endY: y - 60 },
      { endX: x - 90, endY: y - 100 },
      { endX: x - 110, endY: y - 40 },
      { endX: x - 130, endY: y - 70 }
    ];

    vectors.forEach(vector => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(vector.endX, vector.endY);
      ctx.stroke();

      // Draw arrowhead
      const angle = Math.atan2(vector.endY - y, vector.endX - x);
      const arrowLength = 10;
      
      ctx.beginPath();
      ctx.moveTo(vector.endX, vector.endY);
      ctx.lineTo(
        vector.endX - arrowLength * Math.cos(angle - Math.PI / 6),
        vector.endY - arrowLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.moveTo(vector.endX, vector.endY);
      ctx.lineTo(
        vector.endX - arrowLength * Math.cos(angle + Math.PI / 6),
        vector.endY - arrowLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();
    });
  };

  const drawCompass = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const x = width - 60;
    const y = height - 80;
    const radius = 25;

    // Draw compass background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.beginPath();
    ctx.arc(x, y, radius + 5, 0, 2 * Math.PI);
    ctx.fill();

    // Draw compass outline
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw north arrow - muted color
    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    ctx.lineTo(x - 5, y - 10);
    ctx.lineTo(x + 5, y - 10);
    ctx.closePath();
    ctx.fill();

    // Draw N label
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('N', x, y - radius - 10);
    ctx.textAlign = 'left';
  };

  const drawScale = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const x = 20;
    const y = height - 40;
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(x - 10, y - 20, 120, 30);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 100, y);
    ctx.stroke();

    // Draw scale markers
    for (let i = 0; i <= 4; i++) {
      const markerX = x + (i * 25);
      ctx.beginPath();
      ctx.moveTo(markerX, y - 5);
      ctx.lineTo(markerX, y + 5);
      ctx.stroke();
    }

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px monospace';
    ctx.fillText('1000 ft', x + 105, y + 4);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative flex-1 overflow-hidden pb-[72px]">
      {/* Map Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="sm"
          className="w-10 h-10 p-0 bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-300"
          onClick={() => setZoomLevel(prev => Math.min(prev * 1.2, 3))}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          className="w-10 h-10 p-0 bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-300"
          onClick={() => setZoomLevel(prev => Math.max(prev / 1.2, 0.5))}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          className="w-10 h-10 p-0 bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-300"
          onClick={() => {
            setZoomLevel(1);
            setPanOffset({ x: 0, y: 0 });
          }}
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          className="w-10 h-10 p-0 bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-300"
        >
          <Maximize2 className="w-4 h-4" />
        </Button>
      </div>

      {/* 3D Toggle */}
      <div className="absolute bottom-20 right-4">
        <Button
          variant="secondary"
          size="sm"
          className="bg-gray-900 border-gray-700 hover:bg-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-300"
        >
          3D
        </Button>
      </div>

      {/* Coordinate Display */}
      <div className="absolute bottom-20 left-4 bg-gray-900 px-3 py-1 rounded text-sm font-mono text-gray-400">
        Cursor: Offscreen
      </div>
    </div>
  );
}