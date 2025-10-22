import React from 'react';

interface NasihatLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'text';
}

export const NasihatLogo: React.FC<NasihatLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'full'
}) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16'
  };

  const iconSize = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64
  };

  const textSize = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const LogoIcon = () => (
    <svg 
      width={iconSize[size]} 
      height={iconSize[size]} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Brain/AI Symbol */}
      <circle cx="32" cy="32" r="30" fill="url(#gradient1)" stroke="#1e40af" strokeWidth="2"/>
      
      {/* Neural Network Pattern */}
      <g opacity="0.8">
        <circle cx="20" cy="25" r="3" fill="#ffffff" />
        <circle cx="32" cy="20" r="3" fill="#ffffff" />
        <circle cx="44" cy="25" r="3" fill="#ffffff" />
        <circle cx="25" cy="40" r="3" fill="#ffffff" />
        <circle cx="39" cy="40" r="3" fill="#ffffff" />
        <circle cx="32" cy="45" r="3" fill="#ffffff" />
        
        {/* Connections */}
        <line x1="20" y1="25" x2="32" y2="20" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
        <line x1="32" y1="20" x2="44" y2="25" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
        <line x1="20" y1="25" x2="25" y2="40" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
        <line x1="44" y1="25" x2="39" y2="40" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
        <line x1="25" y1="40" x2="32" y2="45" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
        <line x1="39" y1="40" x2="32" y2="45" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
        <line x1="25" y1="40" x2="39" y2="40" stroke="#ffffff" strokeWidth="1.5" opacity="0.6"/>
      </g>
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#1e40af" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
      </defs>
    </svg>
  );

  const LogoText = () => (
    <div className="flex flex-col">
      <span className={`font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent ${textSize[size]}`}>
        Nasihat
      </span>
      <span className={`font-light text-blue-600 -mt-1 ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-lg'}`}>
        .ai
      </span>
    </div>
  );

  if (variant === 'icon') {
    return <LogoIcon />;
  }

  if (variant === 'text') {
    return <LogoText />;
  }

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default NasihatLogo;