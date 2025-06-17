import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DirectSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DirectSelectProps {
  options: DirectSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function DirectSelect({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select option",
  className = "",
  disabled = false 
}: DirectSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(
    options.findIndex(opt => opt.value === value)
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const selectedOption = options[selectedIndex] || null;

  // Handle touch/mouse start
  const handleStart = (clientY: number) => {
    if (disabled) return;
    setIsDragging(true);
    setStartY(clientY);
    setDragY(0);
  };

  // Handle touch/mouse move
  const handleMove = (clientY: number) => {
    if (!isDragging || disabled) return;
    
    const deltaY = clientY - startY;
    setDragY(deltaY);

    // Calculate which option should be selected based on drag distance
    const optionHeight = 60; // Height of each option
    const dragThreshold = optionHeight / 2;
    const direction = deltaY > 0 ? 1 : -1;
    const dragDistance = Math.abs(deltaY);

    if (dragDistance > dragThreshold) {
      const newIndex = selectedIndex - Math.floor(dragDistance / optionHeight) * direction;
      const clampedIndex = Math.max(0, Math.min(options.length - 1, newIndex));
      
      if (clampedIndex !== selectedIndex) {
        setSelectedIndex(clampedIndex);
        setStartY(clientY);
        setDragY(0);
      }
    }
  };

  // Handle touch/mouse end
  const handleEnd = () => {
    if (!isDragging || disabled) return;
    
    setIsDragging(false);
    setDragY(0);
    
    if (selectedIndex >= 0 && selectedIndex < options.length) {
      onChange(options[selectedIndex].value);
    }
    
    setTimeout(() => setIsOpen(false), 100);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Mouse events (for desktop testing)
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDragging) {
      handleMove(e.clientY);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    handleEnd();
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = Math.max(0, selectedIndex - 1);
        setSelectedIndex(prevIndex);
        onChange(options[prevIndex].value);
        break;
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = Math.min(options.length - 1, selectedIndex + 1);
        setSelectedIndex(nextIndex);
        onChange(options[nextIndex].value);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  // Click to toggle
  const handleClick = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  // Update selected index when value prop changes
  useEffect(() => {
    const newIndex = options.findIndex(opt => opt.value === value);
    if (newIndex !== -1) {
      setSelectedIndex(newIndex);
    }
  }, [value, options]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Selected value display */}
      <div
        className={`
          flex items-center justify-between px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg
          cursor-pointer transition-all duration-200 select-none
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-750'}
          ${isOpen ? 'border-cyan-400 bg-gray-750' : ''}
        `}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <div className="flex items-center space-x-3">
          {selectedOption?.icon && (
            <div className="text-gray-400">
              {selectedOption.icon}
            </div>
          )}
          <span className={selectedOption ? 'text-gray-200' : 'text-gray-500'}>
            {selectedOption?.label || placeholder}
          </span>
        </div>
        
        <div className="text-gray-400">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </div>

      {/* Direct select overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false);
            }
          }}
        >
          <div 
            ref={optionsRef}
            className="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden"
            style={{ 
              maxHeight: '400px',
              width: '100%',
              maxWidth: '320px'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-700 bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Select Option</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-200 p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Options list */}
            <div 
              className="relative overflow-hidden"
              style={{ transform: `translateY(${dragY}px)` }}
            >
              {options.map((option, index) => {
                const isSelected = index === selectedIndex;
                const distance = Math.abs(index - selectedIndex);
                const opacity = Math.max(0.3, 1 - distance * 0.2);
                const scale = isSelected ? 1 : Math.max(0.85, 1 - distance * 0.05);
                
                return (
                  <div
                    key={option.value}
                    className={`
                      flex items-center space-x-3 px-4 py-4 transition-all duration-200
                      ${isSelected 
                        ? 'bg-cyan-900/50 border-l-2 border-cyan-400 text-cyan-300' 
                        : 'text-gray-300 hover:bg-gray-800'
                      }
                    `}
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                      height: '60px'
                    }}
                    onClick={() => {
                      setSelectedIndex(index);
                      onChange(option.value);
                      setTimeout(() => setIsOpen(false), 150);
                    }}
                  >
                    {option.icon && (
                      <div className={isSelected ? 'text-cyan-400' : 'text-gray-400'}>
                        {option.icon}
                      </div>
                    )}
                    <span className="flex-1 font-medium">
                      {option.label}
                    </span>
                    {isSelected && (
                      <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Drag hint */}
            <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                <div className="w-8 h-1 bg-gray-600 rounded"></div>
                <span>Drag to select</span>
                <div className="w-8 h-1 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}