import React from 'react';

/**
 * Photorealistic Signboard Overlay for Samgaksan Middle School (삼각산중학교)
 * Replaces the pre-existing '대광중학교' text on the central entrance background image.
 * Uses exact percentage coordinates within the 16:9 container so it never shifts on resize.
 */
export const SamgaksanSignboardOverlay: React.FC = () => {
  return (
    <div
      className="absolute z-20 pointer-events-none select-none flex items-center justify-center overflow-hidden"
      style={{
        top: '17.4%',
        left: '48.85%',
        width: '19.2%',
        height: '8.8%',
      }}
      aria-hidden="true"
    >
      {/* Wooden Bevel Inner Panel that covers the old text seamlessly */}
      <div
        className="w-full h-full flex items-center justify-center rounded-[2px] shadow-inner"
        style={{
          background: 'linear-gradient(180deg, #d2dbdb 0%, #bac5c5 55%, #9faaaa 100%)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.45), inset 0 -1px 2px rgba(255,255,255,0.4)',
          border: '1px solid #756658',
        }}
      >
        <span
          className="font-bold tracking-[0.22em] text-center select-none"
          style={{
            color: '#1a2528',
            fontFamily: '"Noto Serif KR", "Nanum Myeongjo", serif, sans-serif',
            fontSize: 'clamp(11px, 1.45vw, 22px)',
            fontWeight: 800,
            textShadow: '0 1px 1px rgba(255,255,255,0.6), 0 -1px 1px rgba(0,0,0,0.45)',
            letterSpacing: '0.22em',
            paddingLeft: '0.22em', // compensator for letter-spacing
          }}
        >
          삼각산중학교
        </span>
      </div>
    </div>
  );
};
