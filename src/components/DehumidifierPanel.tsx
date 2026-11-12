import React from 'react';
import { ThermalState } from '../types/game';
import { Power, Droplets, Minus, Plus, X, Activity } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface DehumidifierPanelProps {
  thermal: ThermalState;
  onUpdateThermal: (patch: Partial<ThermalState>) => void;
  onClose: () => void;
}

export const DehumidifierPanel: React.FC<DehumidifierPanelProps> = ({
  thermal,
  onUpdateThermal,
  onClose,
}) => {
  const handlePower = () => {
    soundManager.playRemoteBeep();
    const nextPower = !thermal.dehumidifierPower;
    onUpdateThermal({ dehumidifierPower: nextPower });
    if (nextPower) {
      soundManager.playDehumidifierSound();
    }
  };

  const handleHumidityDown = () => {
    soundManager.playRemoteBeep();
    if (thermal.dehumidifierTargetHumidity > 30) {
      onUpdateThermal({
        dehumidifierTargetHumidity: thermal.dehumidifierTargetHumidity - 5,
      });
    }
  };

  const handleHumidityUp = () => {
    soundManager.playRemoteBeep();
    if (thermal.dehumidifierTargetHumidity < 80) {
      onUpdateThermal({
        dehumidifierTargetHumidity: thermal.dehumidifierTargetHumidity + 5,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-[32px] p-6 shadow-2xl border-4 border-slate-700/80 flex flex-col items-center">
        {/* Prominent High-Visibility Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-red-600 hover:bg-red-500 active:scale-95 border-2 border-white text-white flex items-center justify-center shadow-xl cursor-pointer transition-all z-20"
          aria-label="제습기 패널 닫기"
          title="닫기 (X)"
        >
          <X className="w-6 h-6 stroke-[3]" />
        </button>

        {/* Brand Bar */}
        <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-black text-slate-200 font-mono tracking-wide">
              스마트 인버터 제습기 20L
            </span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
            DIGITAL CONSOLE
          </span>
        </div>

        {/* High-Tech Glossy LED Control Display */}
        <div className="w-full bg-black/90 rounded-2xl p-5 border-2 border-slate-800 shadow-inner space-y-4">
          {/* Dual Humidity Indicators */}
          <div className="grid grid-cols-2 gap-4 divide-x divide-slate-800">
            {/* Current Ambient Humidity */}
            <div className="text-center pr-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                현재 실내 습도
              </span>
              <div className="flex items-baseline justify-center font-mono text-blue-400">
                <span className="text-5xl font-black">{thermal.humidity}</span>
                <span className="text-xl font-bold ml-1">%</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                {thermal.humidity > 60
                  ? '⚠️ 과습 상태'
                  : thermal.humidity < 40
                  ? '건조 상태'
                  : '쾌적 범위'}
              </span>
            </div>

            {/* Target Set Humidity */}
            <div className="text-center pl-2">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">
                목표 희망 습도
              </span>
              <div
                className={`flex items-baseline justify-center font-mono ${
                  thermal.dehumidifierPower ? 'text-emerald-400' : 'text-slate-600'
                }`}
              >
                <span className="text-5xl font-black">
                  {thermal.dehumidifierPower ? thermal.dehumidifierTargetHumidity : '--'}
                </span>
                <span className="text-xl font-bold ml-1">%</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                {thermal.dehumidifierPower ? '인버터 제습 가동' : '대기 상태'}
              </span>
            </div>
          </div>

          {/* Operation Status LEDs */}
          <div className="flex items-center justify-around pt-3 border-t border-slate-800/80 text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  thermal.dehumidifierPower ? 'bg-emerald-400 animate-ping' : 'bg-slate-700'
                }`}
              />
              <span className={thermal.dehumidifierPower ? 'text-emerald-300 font-bold' : 'text-slate-500'}>
                컴프레서 가동
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <Activity className={`w-3.5 h-3.5 ${thermal.dehumidifierPower ? 'text-blue-400 animate-spin' : 'text-slate-600'}`} />
              <span className={thermal.dehumidifierPower ? 'text-blue-300 font-bold' : 'text-slate-500'}>
                풍량 자동
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-400">물통 정상</span>
            </div>
          </div>
        </div>

        {/* Touch Button Controls */}
        <div className="w-full grid grid-cols-3 gap-3 mt-5">
          {/* Humidity Down Button */}
          <button
            onClick={handleHumidityDown}
            disabled={!thermal.dehumidifierPower}
            className={`py-4 rounded-2xl flex flex-col items-center justify-center font-bold text-slate-100 shadow-md transition-all border active:scale-95 ${
              thermal.dehumidifierPower
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 cursor-pointer text-blue-300'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-40'
            }`}
          >
            <Minus className="w-6 h-6" />
            <span className="text-[11px] font-mono mt-0.5">습도 ▼</span>
          </button>

          {/* Main Power Button */}
          <button
            onClick={handlePower}
            className={`py-4 rounded-2xl flex flex-col items-center justify-center font-black shadow-lg transition-all border-2 active:scale-95 cursor-pointer ${
              thermal.dehumidifierPower
                ? 'bg-gradient-to-b from-blue-500 to-blue-700 border-blue-400 text-white shadow-blue-500/30'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-400'
            }`}
          >
            <Power className="w-7 h-7" />
            <span className="text-[11px] font-mono mt-0.5">
              {thermal.dehumidifierPower ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Humidity Up Button */}
          <button
            onClick={handleHumidityUp}
            disabled={!thermal.dehumidifierPower}
            className={`py-4 rounded-2xl flex flex-col items-center justify-center font-bold text-slate-100 shadow-md transition-all border active:scale-95 ${
              thermal.dehumidifierPower
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-600 cursor-pointer text-blue-300'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed opacity-40'
            }`}
          >
            <Plus className="w-6 h-6" />
            <span className="text-[11px] font-mono mt-0.5">습도 ▲</span>
          </button>
        </div>

        {/* Guide note */}
        <p className="text-[12px] font-bold text-slate-400 text-center mt-3">
          전원을 켜고 쾌적한 목표 습도(40~60%)로 설정하세요.
        </p>

        {/* Clear Bottom Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 font-bold text-sm border border-slate-600 transition-all cursor-pointer shadow-md"
        >
          설정 완료 및 창 닫기
        </button>
      </div>
    </div>
  );
};
