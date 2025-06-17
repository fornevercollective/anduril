import React, { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'bottom';
  className?: string;
}

export function MobileDrawer({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  position = 'left',
  className = "" 
}: MobileDrawerProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable body scroll when drawer is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getDrawerClasses = () => {
    const base = "fixed bg-gray-900 border-gray-700 z-50 transform transition-transform duration-300 ease-in-out";
    
    switch (position) {
      case 'right':
        return `${base} top-0 right-0 h-full w-80 border-l ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`;
      case 'bottom':
        return `${base} bottom-0 left-0 right-0 h-96 border-t rounded-t-xl ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`;
      case 'left':
      default:
        return `${base} top-0 left-0 h-full w-80 border-r ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`;
    }
  };

  if (!isOpen && !isAnimating) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`${getDrawerClasses()} ${className}`}
        onTransitionEnd={() => {
          if (!isOpen) {
            setIsAnimating(false);
          }
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </>
  );
}

interface MobileSelectDrawerProps {
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export function MobileSelectDrawer({ 
  options, 
  value, 
  onChange, 
  isOpen, 
  onClose, 
  title 
}: MobileSelectDrawerProps) {
  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    onClose();
  };

  return (
    <MobileDrawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      position="bottom"
    >
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          
          return (
            <button
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`
                w-full text-left p-4 rounded-lg transition-all duration-200 touch-feedback
                ${isSelected 
                  ? 'bg-cyan-900/50 border border-cyan-400/50 text-cyan-300' 
                  : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-750 active:bg-gray-700'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                {option.icon && (
                  <div className={`flex-shrink-0 ${isSelected ? 'text-cyan-400' : 'text-gray-400'}`}>
                    {option.icon}
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className={`font-medium ${isSelected ? 'text-cyan-300' : 'text-gray-200'}`}>
                    {option.label}
                  </div>
                  {option.description && (
                    <div className="text-sm text-gray-500 mt-1">
                      {option.description}
                    </div>
                  )}
                </div>
                
                {isSelected && (
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </MobileDrawer>
  );
}

// Hook for managing drawer state
export function useMobileDrawer(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  return {
    isOpen,
    open,
    close,
    toggle,
  };
}