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
  
  @keyframes blueGlow {
    0% { 
      filter: saturate(1.5) brightness(1.2) drop-shadow(0 0 80px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 160px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 240px rgba(25, 60, 140, 0.9)) drop-shadow(0 0 320px rgba(25, 60, 140, 0.8)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }
    25% { 
      filter: saturate(1.5) brightness(1.3) drop-shadow(0 0 150px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 300px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 450px rgba(25, 60, 140, 0.9)) drop-shadow(0 0 600px rgba(25, 60, 140, 0.8)) drop-shadow(0 0 750px rgba(25, 60, 140, 0.7)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }
    50% { 
      filter: saturate(1.6) brightness(1.4) drop-shadow(0 0 200px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 400px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 600px rgba(25, 60, 140, 0.95)) drop-shadow(0 0 800px rgba(25, 60, 140, 0.9)) drop-shadow(0 0 1000px rgba(25, 60, 140, 0.8)) drop-shadow(0 0 1200px rgba(25, 60, 140, 0.6)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }
    75% { 
      filter: saturate(1.5) brightness(1.3) drop-shadow(0 0 150px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 300px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 450px rgba(25, 60, 140, 0.9)) drop-shadow(0 0 600px rgba(25, 60, 140, 0.8)) drop-shadow(0 0 750px rgba(25, 60, 140, 0.7)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
    }
    100% { 
      filter: saturate(1.5) brightness(1.2) drop-shadow(0 0 80px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 160px rgba(25, 60, 140, 1.0)) drop-shadow(0 0 240px rgba(25, 60, 140, 0.9)) drop-shadow(0 0 320px rgba(25, 60, 140, 0.8)) drop-shadow(0 8px 25px rgba(0, 0, 0, 0.4)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.3)) drop-shadow(0 2px 8px rgba(0, 0, 0, 0.2));
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
  
  .jata-blue-glow {
    animation: blueGlow 3s ease-in-out infinite;
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
      
      {/* Malaysian Branding Section - Sharp and Clear */}
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
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 20px 50px rgba(0, 0, 0, 0.3), 0 12px 32px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15), 0 8px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(10px)', // Blur the background behind the circle
          }}
        >
          <img 
            src="/jata-negara-malaysia.png" 
            alt="Jata Negara Malaysia"
            className="jata-blue-glow"
            style={{
              width: '90px',
              height: '67.5px',
              objectFit: 'contain',
            }}
          />
        </div>
        
        {/* "For Malaysians, By Malaysians" Text Button - Slide in from top-left edge */}
        <span className="px-6 py-3 bg-white/10 rounded-full animate-slideInFromTopEdge transition-all duration-300 hover:scale-105" style={{ 
          fontFamily: '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '145%',
          letterSpacing: '0%',
          color: '#FFFFFF',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 20px 50px rgba(0, 0, 0, 0.3), 0 12px 32px rgba(0, 0, 0, 0.25), 0 6px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.15), 0 8px 15px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(0, 0, 0, 0.5)',
          textShadow: '0 6px 12px rgba(0, 0, 0, 0.9), 0 4px 8px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 2px rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
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