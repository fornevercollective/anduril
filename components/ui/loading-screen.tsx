import React, { useState, useEffect } from 'react';
import { Logo, BrandLogo } from './logo';
import { Activity, Shield, Radar } from 'lucide-react';

interface LoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export function LoadingScreen({ isVisible, onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { label: 'INITIALIZING SYSTEMS', icon: Activity },
    { label: 'LOADING DEFENSE PROTOCOLS', icon: Shield },
    { label: 'ESTABLISHING RADAR LINK', icon: Radar },
    { label: 'TACTICAL SYSTEMS ONLINE', icon: Activity }
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        
        // Update current step based on progress
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(Math.min(stepIndex, steps.length - 1));
        
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isVisible, onComplete, steps.length]);

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep]?.icon || Activity;

  return (
    <div className="fixed inset-0 bg-gray-950 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Logo variant="emblem" size={120} className="text-cyan-400/30" />
          </div>
          <Logo variant="emblem" size={120} className="text-cyan-400 animate-pulse" />
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <BrandLogo size="lg" className="justify-center" />
          <div className="text-xs text-gray-500 tracking-widest">
            AUTONOMOUS DEFENSE PLATFORM
          </div>
        </div>

        {/* Loading Progress */}
        <div className="w-80 space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <CurrentIcon className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-sm text-gray-300 font-mono">
              {steps[currentStep]?.label || 'LOADING...'}
            </span>
          </div>
          
          <div className="relative">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>LOADING</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">CORE SYSTEMS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">NETWORK LINK</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">SENSORS</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-gray-400">RADAR ARRAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Compact loading component for smaller spaces
export function LoadingSpinner({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        <Logo variant="mini" size={size} className="text-cyan-400 animate-spin" />
        <div className="absolute inset-0 animate-ping">
          <Logo variant="mini" size={size} className="text-cyan-400/30" />
        </div>
      </div>
    </div>
  );
}