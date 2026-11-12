import React from 'react';
import { LightLibraryState } from '../types/game';
import { Key, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GAME_IMAGES } from '../utils/assets';

interface LibraryViewProps {
  lightState: LightLibraryState;
  onToggleBlinds: () => void;
  onToggleDeskLamp: () => void;
  onToggleCeilingLight: () => void;
  onClaimCard: () => void;
  showExploreHint: boolean;
  thirdDigit: number;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  lightState,
  onToggleBlinds,
  onToggleDeskLamp,
  onToggleCeilingLight,
  onClaimCard,
  showExploreHint,
  thirdDigit,
}) => {
  const isOptimal = lightState.blindsClosed && lightState.deskLampOn && lightState.ceilingLightOn;

  const handleClaim = () => {
    soundManager.playSuccessChime();
    onClaimCard();
  };

  const handleBlindsClick = () => {
    soundManager.playBlindsSound();
    onToggleBlinds();
  };

  const handleCeilingClick = () => {
    soundManager.playLightFlicker();
    onToggleCeilingLight();
  };

  const handleDeskLampClick = () => {
    soundManager.playSwitch();
    onToggleDeskLamp();
  };

  return (
    <div className="relative w-full h-[calc(100vh-56px)] min-h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
      {/* 16:9 Viewport Container: Coordinate Master */}
      <div className="relative w-full max-w-[1240px] aspect-[16/9] max-h-full shadow-2xl overflow-hidden bg-black border border-slate-800">
        {/* Main 2D Library Background with responsive illumination transition */}
        <img
          src={GAME_IMAGES.libraryBg}
          onError={(e) => {
            e.currentTarget.src = '/images/school_library_dusk_1794317170758.jpg';
          }}
          alt="삼각산중학교 도서관 전경"
          className={`w-full h-full object-cover transition-all duration-700 ${
            !lightState.ceilingLightOn && !lightState.deskLampOn
              ? 'brightness-[0.45] contrast-125'
              : lightState.ceilingLightOn && lightState.deskLampOn
              ? 'brightness-[0.98] contrast-105'
              : 'brightness-[0.72] contrast-110'
          }`}
          referrerPolicy="no-referrer"
        />

        {/* Harsh Glare Ray from Window when blinds are OPEN */}
        {!lightState.blindsClosed && (
          <div className="absolute top-0 left-0 w-[44%] h-full bg-gradient-to-r from-amber-200/40 via-amber-100/15 to-transparent pointer-events-none animate-pulse" />
        )}

        {/* Ceiling Fixture Ambient Illumination wash when ceiling lights are ON */}
        {lightState.ceilingLightOn && (
          <div className="absolute top-0 inset-x-0 h-[28%] bg-gradient-to-b from-amber-100/25 via-amber-50/10 to-transparent pointer-events-none transition-opacity duration-700" />
        )}

        {/* Desk Lamp Focused Radiant Lighting Cone on Study Table */}
        {lightState.deskLampOn && (
          <div
            className="absolute pointer-events-none transition-opacity duration-500 rounded-full blur-xl"
            style={{
              left: '68%',
              top: '71%',
              width: '30%',
              height: '26%',
              background: 'radial-gradient(ellipse at 80% 30%, rgba(254, 240, 138, 0.45) 0%, rgba(251, 191, 36, 0.2) 50%, transparent 80%)',
            }}
          />
        )}

        {/* 1. Transparent Interactive Hotspot: Window Blinds (좌측 창문 블라인드 & 줄) */}
        <div
          onClick={handleBlindsClick}
          className={`absolute top-[8%] left-[4%] w-[22%] h-[68%] cursor-pointer transition-all z-20 ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/80 bg-cyan-400/15 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse'
              : ''
          }`}
          title="창문 블라인드 올리기/내리기"
        >
          {/* Animated physical blind slats slide */}
          <div className="relative w-full h-full overflow-hidden pointer-events-none">
            {/* Blind Slat Sheet that lowers/raises smoothly */}
            <div
              className={`absolute top-0 left-0 right-0 transition-all duration-700 ease-in-out bg-slate-900/75 border-b-2 border-slate-600 flex flex-col justify-around py-1 shadow-lg ${
                lightState.blindsClosed ? 'h-[92%] opacity-90' : 'h-[14%] opacity-60'
              }`}
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-full h-[1.5px] bg-slate-400/30 my-auto" />
              ))}
            </div>

            {/* Subtle blind pull-cord on right side */}
            <div className="absolute top-2 right-2 w-1 h-36 flex flex-col items-center">
              <div className="w-[1.5px] h-full bg-slate-300/80 shadow-sm" />
              <div className="w-2.5 h-3 rounded-full bg-slate-200 shadow-md -mt-1" />
            </div>
          </div>
        </div>

        {/* 2. Realistic Wall Light Switch on Library Column (기둥 벽면 전반 조명 스위치) */}
        <div
          onClick={handleCeilingClick}
          className={`absolute cursor-pointer transition-transform duration-150 active:scale-95 z-20 group ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/90 rounded-md shadow-[0_0_15px_rgba(34,211,238,0.7)] animate-pulse'
              : ''
          }`}
          style={{
            left: '27.1%',
            top: '47.0%',
            width: '2.4%',
            height: '6.4%',
          }}
          title="도서관 천장 전반 조명 스위치 (클릭)"
        >
          {/* Authentic Korean Classroom 2-Gang Rocker Switch Plate */}
          <div
            className="w-full h-full rounded-[3px] p-[2px] flex flex-col justify-between items-center transition-all duration-200 group-hover:brightness-110"
            style={{
              background: 'linear-gradient(180deg, #f5f5f0 0%, #eaeae4 50%, #d8d8d0 100%)',
              border: '1px solid #b8b8b0',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.8)',
            }}
          >
            {/* Dual Rocker Switch Keys */}
            <div className="w-full flex-1 flex gap-[2px] p-[1px]">
              {/* Left Rocker (Aisle Zone) */}
              <div
                className="flex-1 rounded-[2px] flex flex-col justify-between items-center py-[2px] transition-all duration-200"
                style={{
                  background: lightState.ceilingLightOn
                    ? 'linear-gradient(180deg, #dcdcd6 0%, #f0f0ea 100%)'
                    : 'linear-gradient(180deg, #f0f0ea 0%, #dcdcd6 100%)',
                  boxShadow: lightState.ceilingLightOn
                    ? 'inset 0 2px 2px rgba(0,0,0,0.25)'
                    : '0 1px 2px rgba(0,0,0,0.2)',
                  transform: lightState.ceilingLightOn
                    ? 'perspective(80px) rotateX(12deg)'
                    : 'perspective(80px) rotateX(-12deg)',
                }}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    lightState.ceilingLightOn ? 'bg-emerald-400 shadow-[0_0_3px_#34d399]' : 'bg-slate-400/60'
                  }`}
                />
              </div>

              {/* Right Rocker (Window Zone) */}
              <div
                className="flex-1 rounded-[2px] flex flex-col justify-between items-center py-[2px] transition-all duration-200"
                style={{
                  background: lightState.ceilingLightOn
                    ? 'linear-gradient(180deg, #dcdcd6 0%, #f0f0ea 100%)'
                    : 'linear-gradient(180deg, #f0f0ea 0%, #dcdcd6 100%)',
                  boxShadow: lightState.ceilingLightOn
                    ? 'inset 0 2px 2px rgba(0,0,0,0.25)'
                    : '0 1px 2px rgba(0,0,0,0.2)',
                  transform: lightState.ceilingLightOn
                    ? 'perspective(80px) rotateX(12deg)'
                    : 'perspective(80px) rotateX(-12deg)',
                }}
              >
                <div
                  className={`w-1 h-1 rounded-full ${
                    lightState.ceilingLightOn ? 'bg-emerald-400 shadow-[0_0_3px_#34d399]' : 'bg-slate-400/60'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Pixel-Accurate Interactive Hotspot: Reading Desk Lamp (우측 독서대 스탠드) */}
        {/* Exactly positioned over the lamp shade, brass neck, and round base */}
        <div
          onClick={handleDeskLampClick}
          className={`absolute cursor-pointer transition-all z-20 group ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/90 rounded-2xl shadow-[0_0_20px_rgba(34,211,238,0.7)] animate-pulse'
              : ''
          }`}
          style={{
            left: '85.3%',
            top: '62.6%',
            width: '9.4%',
            height: '25.2%',
          }}
          title="독서대 책상 스탠드 (클릭하여 전원 켜기/끄기)"
        >
          {/* Subtle bulb warmth inside lamp shade when ON */}
          {lightState.deskLampOn && (
            <div
              className="absolute pointer-events-none rounded-full bg-amber-200/60 blur-[6px] animate-pulse"
              style={{
                left: '26%',
                top: '20%',
                width: '48%',
                height: '32%',
              }}
            />
          )}

          {/* Lamp Base Tactile Switch Visual Feedback */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold shadow-md ${
                lightState.deskLampOn
                  ? 'bg-amber-500/90 text-slate-950'
                  : 'bg-slate-800/90 text-slate-300'
              }`}
            >
              {lightState.deskLampOn ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        {/* 4. Natural Physical Golden Card on Desk when optimal */}
        {isOptimal && !lightState.cardClaimed && (
          <button
            onClick={handleClaim}
            className="absolute bottom-[24%] left-[45%] w-[10%] h-[13%] rounded-xl group cursor-pointer transition-all animate-bounce z-30 shadow-2xl"
            aria-label="세 번째 암호 카드 획득"
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black shadow-2xl shadow-amber-400/60 border border-amber-200">
              <Key className="w-5 h-5 text-slate-950 animate-pulse" />
              <span className="text-[14px] font-mono font-black mt-0.5">[{thirdDigit}]</span>
            </div>
          </button>
        )}

        {/* Bottom Immersive Status Line */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-[14px] text-slate-200 shadow-xl backdrop-blur-md">
            {isOptimal ? (
              <span className="text-emerald-300 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>환경 복구 완료: 눈부심이 차단되고 적정 조도가 확보되었습니다. 책상 위 암호 카드를 확인하세요.</span>
              </span>
            ) : (
              <span className="text-slate-300">
                실내 사물을 직접 조작하여 눈부심을 줄이고 독서에 알맞은 조명을 만드세요.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
