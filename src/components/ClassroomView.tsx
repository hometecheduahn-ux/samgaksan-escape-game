import React, { useState } from 'react';
import { ThermalState } from '../types/game';
import { Thermometer, Droplets, Key } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GAME_IMAGES } from '../utils/assets';
import { AirConditionerRemote } from './AirConditionerRemote';
import { DehumidifierPanel } from './DehumidifierPanel';
import { DehumidifierFloorUnit } from './DehumidifierFloorUnit';

interface ClassroomViewProps {
  thermal: ThermalState;
  onUpdateThermal: (patch: Partial<ThermalState>) => void;
  onClaimCard: () => void;
  showExploreHint: boolean;
  firstDigit: number;
}

export const ClassroomView: React.FC<ClassroomViewProps> = ({
  thermal,
  onUpdateThermal,
  onClaimCard,
  showExploreHint,
  firstDigit,
}) => {
  const [activeModal, setActiveModal] = useState<'NONE' | 'AC' | 'DEHUMID'>('NONE');

  const isTempComfort = thermal.roomTemp >= 26 && thermal.roomTemp <= 28;
  const isHumidityComfort = thermal.humidity >= 40 && thermal.humidity <= 60;
  const isOptimal =
    thermal.acPower &&
    thermal.acMode === 'COOL' &&
    isTempComfort &&
    thermal.dehumidifierPower &&
    isHumidityComfort;

  const handleClaim = () => {
    soundManager.playSuccessChime();
    onClaimCard();
  };

  return (
    <div className="relative w-full h-[calc(100vh-56px)] min-h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
      {/* 16:9 Viewport Container */}
      <div className="relative w-full max-w-[1240px] aspect-[16/9] max-h-full shadow-2xl overflow-hidden bg-black border border-slate-800">
        {/* Main 2D Classroom Background */}
        <img
          src={GAME_IMAGES.classroomBg}
          alt="삼각산중학교 2학년 교실 전경"
          className="w-full h-full object-cover transition-all duration-700 brightness-90 contrast-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.triedPublic) {
              target.dataset.triedPublic = 'true';
              target.src = '/images/classroom_overview_main_1794315532460.jpg';
            }
          }}
        />

        {/* Dynamic Heat Haze Overlay (clears when optimal) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            !isOptimal ? 'bg-amber-950/20 opacity-80' : 'opacity-0'
          }`}
        />

        {/* Ambient Environment Sensor Meter (Top Left) */}
        <div className="absolute top-4 left-4 z-20 pointer-events-none">
          <div className="px-4 py-2.5 rounded-2xl bg-slate-950/90 border border-slate-700/80 backdrop-blur-md shadow-2xl flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Thermometer
                className={`w-5 h-5 ${
                  isTempComfort ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
                }`}
              />
              <div>
                <div className="text-[11px] font-mono text-slate-400">실내 온도</div>
                <div
                  className={`text-lg font-black font-mono ${
                    isTempComfort ? 'text-emerald-300' : 'text-amber-300'
                  }`}
                >
                  {thermal.roomTemp.toFixed(1)} ℃
                </div>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-slate-800" />

            <div className="flex items-center gap-2">
              <Droplets
                className={`w-5 h-5 ${
                  isHumidityComfort ? 'text-emerald-400' : 'text-blue-400 animate-pulse'
                }`}
              />
              <div>
                <div className="text-[11px] font-mono text-slate-400">실내 습도</div>
                <div
                  className={`text-lg font-black font-mono ${
                    isHumidityComfort ? 'text-emerald-300' : 'text-blue-300'
                  }`}
                >
                  {thermal.humidity} %
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Transparent Interactive Hotspot: Wall-mounted AC Remote (우측 기둥/벽면) */}
        <div
          onClick={() => {
            soundManager.playClick();
            setActiveModal('AC');
          }}
          className={`absolute top-[22%] right-[17%] w-[8%] h-[16%] rounded-xl cursor-pointer transition-all z-20 ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/80 bg-cyan-400/20 shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse'
              : ''
          }`}
          title="벽면 에어컨 리모컨"
        >
          {/* Subtle hanging remote holder */}
          <div className="w-full h-full flex flex-col items-center justify-center p-1 rounded-lg pointer-events-none">
            <div className="w-5 h-9 rounded bg-slate-100 border border-slate-400 shadow-sm flex flex-col items-center p-0.5">
              <div
                className={`w-3.5 h-2.5 rounded-[1px] mb-0.5 ${
                  thermal.acPower ? 'bg-emerald-300' : 'bg-slate-300'
                }`}
              />
              <div className="w-2.5 h-1 rounded-full bg-slate-400" />
            </div>
          </div>
        </div>

        {/* 2. Realistic Floor-Standing Classroom Dehumidifier Unit (교실 전면 바닥 실제 제습기) */}
        <DehumidifierFloorUnit
          thermal={thermal}
          onClick={() => {
            soundManager.playClick();
            setActiveModal('DEHUMID');
          }}
          showExploreHint={showExploreHint}
        />

        {/* 3. Natural Golden Card on Teacher's Desk when optimal */}
        {isOptimal && !thermal.cardClaimed && (
          <button
            onClick={handleClaim}
            className="absolute top-[48%] left-[45%] w-[10%] h-[13%] rounded-xl group cursor-pointer transition-all animate-bounce z-30 shadow-2xl"
            aria-label="첫 번째 암호 카드 획득"
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black shadow-2xl shadow-amber-400/60 border border-amber-200">
              <Key className="w-5 h-5 text-slate-950 animate-pulse" />
              <span className="text-[14px] font-mono font-black mt-0.5">[{firstDigit}]</span>
            </div>
          </button>
        )}

        {/* Bottom Status Message without giving away answers */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-[14px] text-slate-200 shadow-xl backdrop-blur-md">
            {isOptimal ? (
              <span className="text-emerald-300 font-bold">
                ✓ 쾌적한 열 환경 조성 완료! 교탁 위에 나타난 암호 카드를 클릭하세요.
              </span>
            ) : (
              <span className="text-slate-300">
                실내 사물을 조작하여 쾌적한 여름철 교실 환경을 만드세요.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Realistic AC Remote Modal */}
      {activeModal === 'AC' && (
        <AirConditionerRemote
          thermal={thermal}
          onUpdateThermal={onUpdateThermal}
          onClose={() => setActiveModal('NONE')}
        />
      )}

      {/* Realistic Dehumidifier Control Panel */}
      {activeModal === 'DEHUMID' && (
        <DehumidifierPanel
          thermal={thermal}
          onUpdateThermal={onUpdateThermal}
          onClose={() => setActiveModal('NONE')}
        />
      )}
    </div>
  );
};
