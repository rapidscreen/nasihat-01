import { ReactNode, useEffect } from 'react';

interface BatikBackgroundProps {
  children: ReactNode;
  className?: string;
}

// Animation styles for Malaysian elements
const malaysianAnimationStyles = `
  @keyframes slideInFromLeftEdge {
    0% { 
      opacity: 0; 
      transform: translateX(-200px) scale(0.8); 
    }
    100% { 
      opacity: 1; 
      transform: translateX(0) scale(1); 
    }
  }
  
  @keyframes slideInFromTopEdge {
    0% { 
      opacity: 0; 
      transform: translateY(-150px) translateX(-200px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0) translateX(0); 
    }
  }
  
  .animate-slideInFromLeftEdge {
    animation: slideInFromLeftEdge 1.2s ease-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
    transform: translateX(-200px) scale(0.8);
  }
  
  .animate-slideInFromTopEdge {
    animation: slideInFromTopEdge 1s ease-out forwards;
    animation-delay: 0.8s;
    opacity: 0;
    transform: translateY(-150px) translateX(-200px);
  }
`;

export const BatikBackground = ({ children, className = '' }: BatikBackgroundProps) => {
  // Inject animation styles
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = malaysianAnimationStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div 
      className={`relative ${className}`}
      style={{
        backgroundImage: "url('/batik-background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Figma-based overlay: Black (#000000) at 20% */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          boxShadow: 'inset 4px 4px 4px 0px rgba(255, 255, 255, 0.25)',
        }}
      ></div>
      
      {/* Malaysian Branding Section */}
      <div 
        className="absolute top-6 left-6 z-20 flex flex-col items-center"
        style={{
          gap: '16px', // 16px margin between elements
        }}
      >
        {/* Malaysian Coat of Arms Circle - Slide in from left edge of screen */}
        <div 
          className="animate-slideInFromLeftEdge"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '120px',
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(2px)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img 
            src="/jata-negara-malaysia.png" 
            alt="Jata Negara Malaysia"
            style={{
              width: '90px',
              height: '67.5px',
              objectFit: 'contain',
            }}
          />
        </div>
        
        {/* "For Malaysians, By Malaysians" Text Button - Slide in from top-left edge */}
        <span className="text-sm text-white/90 font-semibold px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 animate-slideInFromTopEdge" style={{ 
          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif'
        }}>
          For Malaysians, By Malaysians
        </span>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};