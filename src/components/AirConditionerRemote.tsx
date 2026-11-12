import React from 'react';
import { ThermalState } from '../types/game';
import { Power, ChevronUp, ChevronDown, Wind, Snowflake, Flame, Fan, X } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface AirConditionerRemoteProps {
  thermal: ThermalState;
  onUpdateThermal: (patch: Partial<ThermalState>) => void;
  onClose: () => void;
}

export const AirConditionerRemote: React.FC<AirConditionerRemoteProps> = ({
  thermal,
  onUpdateThermal,
  onClose,
}) => {
  const handlePower = () => {
    soundManager.playRemoteBeep();
    const nextPower = !thermal.acPower;
    onUpdateThermal({ acPower: nextPower });
    if (nextPower) {
      soundManager.playAcSound();
    }
  };

  const handleMode = () => {
    soundManager.playRemoteBeep();
    const modes: ('COOL' | 'HEAT' | 'FAN')[] = ['COOL', 'HEAT', 'FAN'];
    const currentIdx = modes.indexOf(thermal.acMode);
    const nextMode = modes[(currentIdx + 1) % modes.length];
    onUpdateThermal({ acMode: nextMode });
  };

  const handleTempUp = () => {
    soundManager.playRemoteBeep();
    if (thermal.targetTemp < 30) {
      onUpdateThermal({ targetTemp: thermal.targetTemp + 1 });
    }
  };

  const handleTempDown = () => {
    soundManager.playRemoteBeep();
    if (thermal.targetTemp > 18) {
      onUpdateThermal({ targetTemp: thermal.targetTemp - 1 });
    }
  };

  const handleFanSpeed = () => {
    soundManager.playRemoteBeep();
    const speeds: ('AUTO' | 'LOW' | 'MED' | 'HIGH')[] = ['AUTO', 'LOW', 'MED', 'HIGH'];
    const currentIdx = speeds.indexOf(thermal.acFanSpeed);
    const nextSpeed = speeds[(currentIdx + 1) % speeds.length];
    onUpdateThermal({ acFanSpeed: nextSpeed });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-[320px] bg-gradient-to-b from-slate-200 via-slate-100 to-slate-300 rounded-[38px] p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-slate-300 flex flex-col items-center">
        {/* Close Button at top right */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-slate-900 border-2 border-slate-600 text-slate-300 hover:text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform hover:scale-105"
          aria-label="리모컨 닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand & Sensor Emitter at Top */}
        <div className="w-full flex items-center justify-between px-2 mb-3">
          <div className="w-12 h-2.5 rounded-full bg-slate-400/50" />
          <div className="w-4 h-2 rounded-t-full bg-slate-800" />
          <span className="text-[10px] font-mono font-black text-slate-500 tracking-wider">
            SAMGAKSAN AIR
          </span>
        </div>

        {/* Backlit LCD Screen */}
        <div
          className={`w-full h-44 rounded-2xl p-3 border-2 transition-all duration-300 flex flex-col justify-between ${
            thermal.acPower
              ? 'bg-[#b8d8c2] border-[#7da889] text-[#1b3d26] shadow-inner'
              : 'bg-[#98a39a] border-[#7d877e] text-[#555f56] opacity-70'
          }`}
        >
          {/* Top LCD Status Row */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold">
            <div className="flex items-center gap-1.5">
              {thermal.acPower && (
                <>
                  {thermal.acMode === 'COOL' && (
                    <span className="flex items-center gap-0.5 bg-black/10 px-1.5 py-0.5 rounded">
                      <Snowflake className="w-3.5 h-3.5" /> 냉방 (COOL)
                    </span>
                  )}
                  {thermal.acMode === 'HEAT' && (
                    <span className="flex items-center gap-0.5 bg-black/10 px-1.5 py-0.5 rounded">
                      <Flame className="w-3.5 h-3.5" /> 난방 (HEAT)
                    </span>
                  )}
                  {thermal.acMode === 'FAN' && (
                    <span className="flex items-center gap-0.5 bg-black/10 px-1.5 py-0.5 rounded">
                      <Fan className="w-3.5 h-3.5" /> 송풍 (FAN)
                    </span>
                  )}
                </>
              )}
            </div>
            {thermal.acPower && (
              <span className="text-[10px] font-mono font-black animate-pulse">RUNNING</span>
            )}
          </div>

          {/* Main Target Temp Segment Display */}
          <div className="text-center py-1">
            {thermal.acPower ? (
              <div className="flex items-baseline justify-center font-mono">
                <span className="text-6xl font-black tracking-tighter leading-none">
                  {thermal.targetTemp}
                </span>
                <span className="text-2xl font-black ml-1">℃</span>
              </div>
            ) : (
              <div className="text-3xl font-black font-mono tracking-widest text-[#555f56]/70 py-4">
                STANDBY
              </div>
            )}
          </div>

          {/* Bottom LCD Row: Fan Speed & Mode */}
          <div className="flex items-center justify-between text-[11px] font-mono border-t border-black/15 pt-1">
            <div className="flex items-center gap-1">
              <span>바람:</span>
              <span className="font-bold">{thermal.acPower ? thermal.acFanSpeed : '--'}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>실내:</span>
              <span className="font-bold">{thermal.roomTemp.toFixed(1)}℃</span>
            </div>
          </div>
        </div>

        {/* Physical Button Cluster */}
        <div className="w-full mt-5 space-y-3">
          {/* Main Power Button */}
          <div className="flex justify-center">
            <button
              onClick={handlePower}
              className={`w-16 h-16 rounded-full flex flex-col items-center justify-center font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer border-2 ${
                thermal.acPower
                  ? 'bg-gradient-to-b from-red-500 to-red-600 border-red-400 shadow-red-500/40'
                  : 'bg-gradient-to-b from-slate-600 to-slate-700 border-slate-500'
              }`}
            >
              <Power className="w-7 h-7" />
              <span className="text-[9px] font-mono mt-0.5">POWER</span>
            </button>
          </div>

          {/* Temp Adjustment Rocker & Mode Button */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            {/* Mode Switch Button */}
            <button
              onClick={handleMode}
              disabled={!thermal.acPower}
              className={`h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-[12px] shadow-sm transition-all border active:scale-95 ${
                thermal.acPower
                  ? 'bg-slate-50 hover:bg-white text-slate-800 border-slate-300 cursor-pointer'
                  : 'bg-slate-200/60 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <span className="text-base">❄️/☀️</span>
              <span className="text-[11px] font-bold">운전 모드</span>
            </button>

            {/* Temp Up Button */}
            <button
              onClick={handleTempUp}
              disabled={!thermal.acPower}
              className={`h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-slate-800 shadow-sm transition-all border active:scale-95 ${
                thermal.acPower
                  ? 'bg-slate-50 hover:bg-white border-slate-300 cursor-pointer'
                  : 'bg-slate-200/60 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronUp className="w-6 h-6 text-slate-700" />
              <span className="text-[10px] font-mono font-bold -mt-1">온도 ▲</span>
            </button>

            {/* Fan Speed Button */}
            <button
              onClick={handleFanSpeed}
              disabled={!thermal.acPower}
              className={`h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-[12px] shadow-sm transition-all border active:scale-95 ${
                thermal.acPower
                  ? 'bg-slate-50 hover:bg-white text-slate-800 border-slate-300 cursor-pointer'
                  : 'bg-slate-200/60 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <Wind className="w-5 h-5 text-cyan-600" />
              <span className="text-[11px] font-bold">바람 세기</span>
            </button>
          </div>

          {/* Second Row: Temp Down */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-start-2">
              <button
                onClick={handleTempDown}
                disabled={!thermal.acPower}
                className={`w-full h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-slate-800 shadow-sm transition-all border active:scale-95 ${
                  thermal.acPower
                    ? 'bg-slate-50 hover:bg-white border-slate-300 cursor-pointer'
                    : 'bg-slate-200/60 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
                }`}
              >
                <ChevronDown className="w-6 h-6 text-slate-700" />
                <span className="text-[10px] font-mono font-bold -mt-1">온도 ▼</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom subtle instructions */}
        <p className="text-[11px] text-slate-500 font-mono text-center mt-3">
          전원을 켜고 알맞은 모드와 온도를 설정하세요.
        </p>
      </div>
    </div>
  );
};
