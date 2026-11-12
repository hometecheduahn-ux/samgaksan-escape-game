import React from 'react';
import { AirLabState } from '../types/game';
import { Wind, Key, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GAME_IMAGES } from '../utils/assets';

interface TechHomeLabViewProps {
  airLab: AirLabState;
  onToggleWindowA: () => void;
  onToggleWindowB: () => void;
  onToggleHood: () => void;
  onClaimCard: () => void;
  showExploreHint: boolean;
  secondDigit: number;
}

export const TechHomeLabView: React.FC<TechHomeLabViewProps> = ({
  airLab,
  onToggleWindowA,
  onToggleWindowB,
  onToggleHood,
  onClaimCard,
  showExploreHint,
  secondDigit,
}) => {
  const isOptimal = airLab.windowAOpen && airLab.windowBOpen && airLab.rangeHoodOn;
  const isDraftActive = airLab.windowAOpen && airLab.windowBOpen;

  const handleClaim = () => {
    soundManager.playSuccessChime();
    onClaimCard();
  };

  const handleWindowAClick = () => {
    soundManager.playWindowSlide();
    onToggleWindowA();
  };

  const handleWindowBClick = () => {
    soundManager.playWindowSlide();
    onToggleWindowB();
  };

  const handleHoodClick = () => {
    soundManager.playSwitch();
    if (!airLab.rangeHoodOn) {
      soundManager.playHoodSound();
    }
    onToggleHood();
  };

  return (
    <div className="relative w-full h-[calc(100vh-56px)] min-h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
      {/* 16:9 Viewport Container: Coordinate Master */}
      <div className="relative w-full max-w-[1240px] aspect-[16/9] max-h-full shadow-2xl overflow-hidden bg-black border border-slate-800">
        {/* Main 2D Tech Lab Background */}
        <img
          src={GAME_IMAGES.techLabBg}
          onError={(e) => {
            e.currentTarget.src = '/images/tech_home_lab_overview_1794317169774.jpg';
          }}
          alt="삼각산중학교 기술가사실 전경"
          className="w-full h-full object-cover transition-all duration-700 brightness-95 contrast-105"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Trapped Steam & Odor Haze (clears completely only when optimal) */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
            !isOptimal ? 'bg-amber-950/20 backdrop-blur-[0.5px] opacity-80' : 'opacity-0'
          }`}
        />

        {/* Localized Boiling Steam rising from the cooking stove if Hood is OFF */}
        {!airLab.rangeHoodOn && (
          <div className="absolute top-[28%] left-[23%] w-[16%] h-[24%] pointer-events-none flex flex-col items-center justify-center">
            <div className="w-14 h-20 bg-white/25 blur-lg rounded-full animate-pulse transform -translate-y-2" />
            <div className="w-10 h-14 bg-white/15 blur-md rounded-full animate-ping transform -translate-y-4" />
          </div>
        )}

        {/* Suction Airflow Effect into the Range Hood when Hood is ON */}
        {airLab.rangeHoodOn && (
          <div className="absolute top-[16%] left-[23%] w-[16%] h-[14%] pointer-events-none overflow-hidden flex flex-col items-center justify-end">
            <div className="w-12 h-16 bg-gradient-to-t from-cyan-400/20 to-transparent blur-sm animate-pulse rounded-t-full" />
            <div className="absolute top-2 w-8 h-8 rounded-full border border-dashed border-cyan-300/60 animate-spin" />
          </div>
        )}

        {/* Natural Cross-Draft Airflow across the classroom when BOTH windows are open */}
        {isDraftActive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
            {/* Animated breeze stream from left to right */}
            <div className="w-full h-32 bg-gradient-to-r from-cyan-400/10 via-cyan-300/20 to-cyan-400/10 blur-md flex items-center justify-around px-12 animate-pulse">
              <Wind className="w-8 h-8 text-cyan-200/70 animate-bounce" />
              <Wind className="w-10 h-10 text-cyan-100/80 animate-pulse" />
              <Wind className="w-8 h-8 text-cyan-200/70 animate-bounce" />
            </div>
          </div>
        )}

        {/* 1. Transparent Interactive Hotspot: Left Wall Window (서로 다른 방향의 창문 A) */}
        <div
          onClick={handleWindowAClick}
          className={`absolute top-[15%] left-[2%] w-[13%] h-[50%] cursor-pointer transition-all z-20 ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/80 bg-cyan-400/15 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse'
              : ''
          }`}
          title="창문 열기/닫기"
        >
          {/* Animated physical window sash slide overlay */}
          <div className="relative w-full h-full overflow-hidden rounded-lg pointer-events-none">
            {/* Window Glass Pane & Frame that slides sideways when open */}
            <div
              className={`absolute inset-0 border-2 border-slate-700/60 transition-transform duration-700 ease-in-out ${
                airLab.windowAOpen ? '-translate-x-[65%] opacity-85' : 'translate-x-0'
              }`}
            >
              {/* Glass reflection gradient */}
              <div className="w-full h-full bg-gradient-to-tr from-white/10 via-transparent to-white/5 backdrop-blur-[0.5px]" />
            </div>
            {/* Open breeze opening indicator when slid open */}
            {airLab.windowAOpen && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 text-cyan-300/80 animate-pulse">
                <Wind className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        {/* 2. Transparent Interactive Hotspot: Right Opposite Window (반대편 창문 B) */}
        <div
          onClick={handleWindowBClick}
          className={`absolute top-[14%] right-[7%] w-[20%] h-[54%] cursor-pointer transition-all z-20 ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/80 bg-cyan-400/15 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse'
              : ''
          }`}
          title="반대편 창문 열기/닫기"
        >
          {/* Animated physical window sash slide overlay */}
          <div className="relative w-full h-full overflow-hidden rounded-lg pointer-events-none">
            {/* Sliding window sash */}
            <div
              className={`absolute inset-0 border-2 border-slate-700/60 transition-transform duration-700 ease-in-out ${
                airLab.windowBOpen ? 'translate-x-[55%] opacity-85' : 'translate-x-0'
              }`}
            >
              {/* Glass sheen */}
              <div className="w-full h-full bg-gradient-to-tl from-white/10 via-transparent to-white/5 backdrop-blur-[0.5px]" />
            </div>
            {/* Open breeze stream when open */}
            {airLab.windowBOpen && (
              <div className="absolute left-1 top-1/2 -translate-y-1/2 text-cyan-300/80 animate-pulse">
                <Wind className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        {/* 3. Transparent Interactive Hotspot: Stove Range Hood (배기 후드 본체 및 스위치) */}
        <div
          onClick={handleHoodClick}
          className={`absolute top-[6%] left-[21%] w-[20%] h-[26%] cursor-pointer transition-all z-20 ${
            showExploreHint
              ? 'ring-2 ring-cyan-400/80 bg-cyan-400/15 rounded-2xl shadow-[0_0_15px_rgba(34,211,238,0.5)] animate-pulse'
              : ''
          }`}
          title="조리대 배기 후드 전원 스위치"
        >
          {/* Subtle physical power LED on the hood rim */}
          <div className="absolute bottom-2 right-4 flex items-center gap-1.5 pointer-events-none">
            <span
              className={`w-2 h-2 rounded-full transition-all ${
                airLab.rangeHoodOn
                  ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-ping'
                  : 'bg-slate-700'
              }`}
            />
          </div>
        </div>

        {/* 4. Natural Physical Golden Card on Counter when mission is solved */}
        {isOptimal && !airLab.cardClaimed && (
          <button
            onClick={handleClaim}
            className="absolute bottom-[22%] left-[32%] w-[11%] h-[14%] rounded-xl group cursor-pointer transition-all animate-bounce z-30 shadow-2xl"
            aria-label="두 번째 암호 카드 획득"
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black shadow-2xl shadow-amber-400/60 border border-amber-200">
              <Key className="w-5 h-5 text-slate-950 animate-pulse" />
              <span className="text-[14px] font-mono font-black mt-0.5">[{secondDigit}]</span>
            </div>
          </button>
        )}

        {/* Bottom Immersive Status Line */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-700/80 text-[14px] text-slate-200 shadow-xl backdrop-blur-md">
            {isOptimal ? (
              <span className="text-emerald-300 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>환경 복구 완료: 배기 후드와 맞통풍으로 공기가 정화되었습니다. 조리대 위 암호 카드를 확인하세요.</span>
              </span>
            ) : (
              <span className="text-slate-300">
                실내 사물을 직접 조작하여 정체된 공기와 냄새를 배출하세요.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
