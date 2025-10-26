'use client';

export const PoweredByRapidScreen = () => {
  return (
    <div className="w-full flex justify-end mt-6 mb-4 pr-6">
      <button
        className="px-6 py-3 bg-black/30 rounded-full transition-all duration-300 hover:scale-105"
        style={{
          fontFamily:
            '"Neue Haas Grotesk Display Pro", -apple-system, BlinkMacSystemFont, sans-serif',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '145%',
          textTransform: 'uppercase',
          color: 'rgb(255, 255, 255)',
          boxShadow:
            'rgba(0, 0, 0, 0.4) 0px 30px 80px, rgba(0, 0, 0, 0.3) 0px 20px 50px, rgba(0, 0, 0, 0.25) 0px 12px 32px, rgba(0, 0, 0, 0.2) 0px 6px 16px, rgba(0, 0, 0, 0.15) 0px 2px 8px, rgba(0, 0, 0, 0.3) 0px 8px 15px, rgba(0, 0, 0, 0.5) 0px 1px 0px inset',
          textShadow:
            'rgba(0, 0, 0, 0.9) 0px 6px 12px, rgba(0, 0, 0, 0.8) 0px 4px 8px, rgba(0, 0, 0, 0.6) 0px 2px 4px, rgba(0, 0, 0, 0.4) 0px 1px 2px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      >
        POWERED BY <span style={{ color: 'rgb(234, 146, 22)' }}>RAPID</span>
        SCREEN
      </button>
    </div>
  );
};

