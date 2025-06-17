import React from 'react';

interface LogoProps {
  variant?: 'default' | 'mini' | 'tech' | 'emblem';
  size?: number;
  className?: string;
}

export function Logo({ variant = 'default', size = 32, className = "" }: LogoProps) {
  const getLogoContent = () => {
    switch (variant) {
      case 'mini':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            {/* Tactical Shield Base */}
            <path
              d="M16 2L6 6V14C6 20.8 10.8 26.8 16 28C21.2 26.8 26 20.8 26 14V6L16 2Z"
              fill="url(#shieldGradient)"
              stroke="currentColor"
              strokeWidth="1"
            />
            
            {/* Central Diamond */}
            <path
              d="M16 8L12 12V16L16 20L20 16V12L16 8Z"
              fill="currentColor"
              opacity="0.8"
            />
            
            {/* Corner Accents */}
            <circle cx="10" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="22" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
            <circle cx="16" cy="24" r="1.5" fill="currentColor" opacity="0.6" />
            
            <defs>
              <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.1)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        );
        
      case 'tech':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            {/* Circuit Board Base */}
            <rect x="4" y="4" width="24" height="24" rx="2" fill="url(#techGradient)" stroke="currentColor" strokeWidth="1" />
            
            {/* Circuit Traces */}
            <path d="M8 12H12V16H16V12H20V16H24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7" />
            <path d="M12 8V12M20 16V20M16 8V24" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            
            {/* Nodes */}
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="20" cy="16" r="2" fill="currentColor" opacity="0.8" />
            <circle cx="16" cy="20" r="1.5" fill="currentColor" opacity="0.6" />
            
            {/* Corner Indicators */}
            <rect x="6" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
            <rect x="24" y="6" width="2" height="2" fill="currentColor" opacity="0.4" />
            <rect x="6" y="24" width="2" height="2" fill="currentColor" opacity="0.4" />
            <rect x="24" y="24" width="2" height="2" fill="currentColor" opacity="0.4" />
            
            <defs>
              <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(6, 182, 212, 0.1)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.1)" />
              </linearGradient>
            </defs>
          </svg>
        );
        
      case 'emblem':
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            {/* Outer Ring */}
            <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
            <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            
            {/* Main Shield */}
            <path
              d="M24 4L10 8V20C10 30.4 16.4 39.2 24 42C31.6 39.2 38 30.4 38 20V8L24 4Z"
              fill="url(#emblemGradient)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            
            {/* Inner Design */}
            <path
              d="M24 12L18 16V24L24 30L30 24V16L24 12Z"
              fill="currentColor"
              opacity="0.6"
            />
            
            {/* Central Cross */}
            <path d="M24 16V26M20 21H28" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" />
            
            {/* Corner Stars */}
            <path d="M14 14L16 16L14 18L12 16L14 14Z" fill="currentColor" opacity="0.4" />
            <path d="M34 14L36 16L34 18L32 16L34 14Z" fill="currentColor" opacity="0.4" />
            <path d="M24 34L26 36L24 38L22 36L24 34Z" fill="currentColor" opacity="0.4" />
            
            <defs>
              <linearGradient id="emblemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.2)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.2)" />
              </linearGradient>
            </defs>
          </svg>
        );
        
      default:
        return (
          <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
          >
            {/* Main Shield */}
            <path
              d="M20 3L8 7V17C8 25.2 13.2 32.4 20 34C26.8 32.4 32 25.2 32 17V7L20 3Z"
              fill="url(#mainGradient)"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            
            {/* Inner Shield */}
            <path
              d="M20 8L12 11V17C12 22.6 15.4 27.2 20 28.5C24.6 27.2 28 22.6 28 17V11L20 8Z"
              fill="rgba(255,255,255,0.1)"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.8"
            />
            
            {/* Central Element */}
            <path
              d="M20 13L16 16V20L20 24L24 20V16L20 13Z"
              fill="currentColor"
              opacity="0.9"
            />
            
            {/* Tactical Elements */}
            <circle cx="14" cy="14" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="26" cy="14" r="1" fill="currentColor" opacity="0.6" />
            <circle cx="20" cy="28" r="1" fill="currentColor" opacity="0.6" />
            
            {/* Corner Brackets */}
            <path d="M10 9L12 9L12 11" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M30 9L28 9L28 11" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M16 30L18 30L18 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M24 30L22 30L22 28" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
            
            <defs>
              <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(34, 197, 94, 0.15)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.15)" />
                <stop offset="100%" stopColor="rgba(168, 85, 247, 0.15)" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return getLogoContent();
}

// Animated Logo Component
interface AnimatedLogoProps extends LogoProps {
  animate?: boolean;
}

export function AnimatedLogo({ animate = false, ...props }: AnimatedLogoProps) {
  return (
    <div className={`${animate ? 'animate-pulse' : ''} transition-all duration-300`}>
      <Logo {...props} />
    </div>
  );
}

// Brand Text Logo
interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

export function BrandLogo({ size = 'md', showIcon = true, className = "" }: BrandLogoProps) {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showIcon && (
        <Logo variant="mini" size={iconSizes[size]} className="text-cyan-400" />
      )}
      <div className={`font-bold tracking-wider ${sizeClasses[size]}`}>
        <span className="text-gray-300">TACTICAL</span>
        <span className="text-cyan-400 ml-1">DEFENSE</span>
      </div>
    </div>
  );
}

// Software Tech Logo
export function TechLogo({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Logo variant="tech" size={size} className={`text-cyan-400 ${className}`} />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full opacity-75 animate-pulse"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-bold text-gray-300 leading-none">SOFTWARE</span>
        <span className="text-xs font-bold text-cyan-400 leading-none">TECH</span>
      </div>
    </div>
  );
}