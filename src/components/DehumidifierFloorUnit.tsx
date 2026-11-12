import React from 'react';
import { Wind } from 'lucide-react';
import { ThermalState } from '../types/game';

interface DehumidifierFloorUnitProps {
  thermal: ThermalState;
  onClick: () => void;
  showExploreHint: boolean;
}

/**
 * Photorealistic Floor-Standing Classroom Dehumidifier Unit
 * Rendered on the front-left floor of the classroom.
 * Clicking this unit opens the enlarged digital control panel.
 */
export const DehumidifierFloorUnit: React.FC<DehumidifierFloorUnitProps> = ({
  thermal,
  onClick,
  showExploreHint,
}) => {
  const isPowerOn = thermal.dehumidifierPower;

  return (
    <div
      onClick={onClick}
      className={`absolute z-20 cursor-pointer group transition-all duration-300 ${
        showExploreHint
          ? 'ring-2 ring-cyan-400/90 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.7)] animate-pulse'
          : ''
      }`}
      style={{
        left: '18.2%',
        top: '60.5%',
        width: '7.8%',
        height: '18.8%',
      }}
      title="교실 스마트 제습기 (클릭하여 조작)"
    >
      {/* Perspective Floor Contact Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[90%] h-3 rounded-full bg-black/60 blur-[3px] pointer-events-none"
      />

      {/* Upward Airflow Breeze Effect when running */}
      {isPowerOn && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none">
          <div className="flex items-center gap-1 text-cyan-300/80 animate-bounce">
            <Wind className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[9px] font-mono font-bold text-cyan-200">AIR</span>
          </div>
          <div className="w-8 h-2 bg-cyan-400/20 blur-sm rounded-full -mt-0.5 animate-ping" />
        </div>
      )}

      {/* Main Dehumidifier Tower Body */}
      <div
        className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between p-1.5 shadow-2xl transition-transform duration-200 group-hover:scale-[1.03]"
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 70%, #cbd5e1 100%)',
          border: '1.5px solid #94a3b8',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.9), 0 8px 16px rgba(0,0,0,0.5)',
        }}
      >
        {/* Top Louver Air Outlet Grill */}
        <div className="w-full h-[18%] bg-slate-800 rounded-lg p-1 flex flex-col justify-around shadow-inner">
          <div className="w-full h-[2px] bg-slate-600 rounded-full" />
          <div className="w-full h-[2px] bg-slate-600 rounded-full" />
          <div className="w-full h-[2px] bg-slate-600 rounded-full" />
        </div>

        {/* Mid-Upper Front Panel: Glossy Digital Humidity Meter & Halo LED */}
        <div className="w-full flex flex-col items-center space-y-1 my-0.5">
          {/* Black Glossy Display Window */}
          <div
            className="w-[84%] py-0.5 rounded-md bg-black/90 border border-slate-700 flex flex-col items-center justify-center shadow-inner"
          >
            <span
              className={`font-mono text-[10px] md:text-[11px] font-black tracking-wider leading-none ${
                isPowerOn ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]' : 'text-slate-600'
              }`}
            >
              {isPowerOn ? `${thermal.humidity}%` : '--'}
            </span>
            <span className="text-[7px] font-mono text-slate-500 scale-90 -mt-0.5">
              {isPowerOn ? '습도' : '대기'}
            </span>
          </div>

          {/* Operating Halo LED Ring */}
          <div className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full transition-all ${
                isPowerOn
                  ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse'
                  : 'bg-slate-400/50'
              }`}
            />
            <span className="text-[8px] font-mono font-bold text-slate-600 tracking-tight">
              DEHUMID
            </span>
          </div>
        </div>

        {/* Lower Front: Transparent Water Tank Window */}
        <div className="w-full h-[32%] bg-slate-300/80 rounded-lg border border-slate-400/80 p-1 flex flex-col justify-end shadow-inner relative overflow-hidden">
          {/* Water level fill line */}
          <div
            className={`w-full rounded-b transition-all duration-700 ${
              isPowerOn
                ? 'h-[55%] bg-gradient-to-t from-cyan-500/50 via-cyan-400/30 to-cyan-300/10'
                : 'h-[30%] bg-gradient-to-t from-slate-500/30 to-slate-400/10'
            }`}
          />
          {/* Water level indicator label */}
          <div className="absolute top-0.5 inset-x-0 text-center">
            <span className="text-[7px] font-mono text-slate-600 font-bold scale-75 block">
              WATER TANK
            </span>
          </div>
        </div>

        {/* Bottom Base & Hidden Castor Line */}
        <div className="w-full h-[6%] bg-slate-400/70 rounded-b flex justify-between px-1 items-center">
          <div className="w-1.5 h-1 rounded-full bg-slate-600" />
          <div className="w-1.5 h-1 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
  );
};
