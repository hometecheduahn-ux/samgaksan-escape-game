import React from 'react';

/**
 * Photorealistic Desk Nameplate Overlay for Teacher Ahn Sang-jun (안상준 선생님)
 * Seamlessly replaces '김영희 교사' on the teacher's desk in the night office scene.
 * Uses exact percentage coordinates within the 16:9 master container so it never shifts.
 */
export const TeacherDeskNameplateOverlay: React.FC = () => {
  return (
    <div
      className="absolute z-20 pointer-events-none select-none flex items-center justify-center"
      style={{
        top: '60.6%',
        left: '47.5%',
        width: '9.3%',
        height: '5.4%',
      }}
      aria-hidden="true"
    >
      {/* 3D Wooden Beveled Nameplate Body */}
      <div
        className="relative w-full h-full flex items-center justify-center rounded-[2px] overflow-hidden"
        style={{
          background: 'linear-gradient(175deg, #1f140e 0%, #150d09 45%, #0b0705 100%)',
          boxShadow:
            'inset 0 1px 2px rgba(255, 200, 150, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.8), 0 3px 6px rgba(0, 0, 0, 0.7)',
          border: '1px solid #3d2719',
          transform: 'perspective(400px) rotateX(12deg) rotateY(-4deg)',
        }}
      >
        {/* Subtle wood grain texture & warm laptop light gradient on the right */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(20,10,5,0.2) 50%, rgba(255, 170, 70, 0.28) 100%)',
          }}
        />

        {/* Gold Border Inlay */}
        <div
          className="absolute inset-[2px] rounded-[1px] pointer-events-none"
          style={{
            border: '0.5px solid rgba(212, 175, 55, 0.35)',
            boxShadow: 'inset 0 0 4px rgba(212, 175, 55, 0.1)',
          }}
        />

        {/* Gold Engraved Korean Name */}
        <div className="relative z-10 flex items-center justify-center px-1">
          <span
            className="font-bold tracking-[0.16em] text-center select-none whitespace-nowrap"
            style={{
              fontFamily: '"Noto Serif KR", "Nanum Myeongjo", serif, sans-serif',
              fontSize: 'clamp(9px, 0.95vw, 15px)',
              fontWeight: 800,
              background: 'linear-gradient(180deg, #fff3c4 0%, #e6c66e 45%, #b58d2e 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.9)',
              letterSpacing: '0.14em',
            }}
          >
            안상준 선생님
          </span>
        </div>
      </div>
    </div>
  );
};
