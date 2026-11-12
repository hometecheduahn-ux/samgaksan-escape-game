import React from 'react';
import {
  Volume2,
  VolumeX,
  HelpCircle,
  RotateCcw,
  Clock,
  MapPin,
  Key,
  GraduationCap,
  Info,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { ChapterId, GameMode, PasswordFragments } from '../types/game';

interface GameHeaderProps {
  gameMode: GameMode;
  currentChapter: ChapterId;
  timeLeft: number;
  passwords: PasswordFragments;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenTutorial: () => void;
  onOpenHints: () => void;
  onOpenMap: () => void;
  onResetGame: () => void;
  onOpenTeacherAdmin: () => void;
  onTriggerExploreHint: () => void;
  showExploreHint: boolean;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  gameMode,
  currentChapter,
  timeLeft,
  passwords,
  soundEnabled,
  onToggleSound,
  onOpenTutorial,
  onOpenHints,
  onOpenMap,
  onResetGame,
  onOpenTeacherAdmin,
  onTriggerExploreHint,
  showExploreHint,
}) => {
  const isTeacher = gameMode === 'TEACHER_DEMO';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getChapterName = () => {
    switch (currentChapter) {
      case 'CLASSROOM':
        return '1. 2학년 교실 (열 환경)';
      case 'TECH_LAB':
        return '2. 기술가사실 (공기 환경)';
      case 'LIBRARY':
        return '3. 도서관 (빛 환경)';
      case 'MAIN_GATE':
        return '중앙 현관 (최종 탈출)';
    }
  };

  return (
    <header className="w-full h-12 md:h-14 bg-slate-950/95 border-b border-slate-800 backdrop-blur-md px-3 md:px-5 flex items-center justify-between z-40 select-none">
      {/* Left: Map Button & Current Stage */}
      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenMap}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-100 text-[14px] font-bold transition-colors shadow-sm cursor-pointer"
          title="구역 지도 열기"
        >
          <MapPin className="w-4 h-4 text-indigo-400" />
          <span className="hidden sm:inline">구역 지도</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[14px] md:text-[16px] font-black text-slate-100">
            {getChapterName()}
          </span>
          {isTeacher ? (
            <button
              onClick={onOpenTeacherAdmin}
              className="text-[12px] font-mono font-bold px-2 py-0.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-700 hover:bg-indigo-900 flex items-center gap-1 cursor-pointer transition-colors"
              title="교사용 관리 패널 열기"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>교사 관리</span>
            </button>
          ) : (
            <span className="text-[12px] font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-950/70 text-amber-300 border border-amber-800/80 hidden lg:inline">
              오후 6:06
            </span>
          )}
        </div>
      </div>

      {/* Center: 3-Digit Password Fragment Indicators & Timer */}
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-700 px-3 py-1 rounded-xl text-[14px] font-mono shadow-inner">
          <Key className="w-4 h-4 text-cyan-400 mr-0.5" />
          <span className="text-slate-400 font-sans font-semibold text-[13px] hidden sm:inline">
            암호:
          </span>
          {/* 1. Thermal */}
          <span
            className={`px-2 py-0.5 rounded font-black text-[15px] transition-colors ${
              passwords.thermal !== null
                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                : 'text-slate-600'
            }`}
          >
            {passwords.thermal !== null ? passwords.thermal : '?'}
          </span>
          {/* 2. Air */}
          <span
            className={`px-2 py-0.5 rounded font-black text-[15px] transition-colors ${
              passwords.air !== null
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-700'
                : 'text-slate-600'
            }`}
          >
            {passwords.air !== null ? passwords.air : '?'}
          </span>
          {/* 3. Light */}
          <span
            className={`px-2 py-0.5 rounded font-black text-[15px] transition-colors ${
              passwords.light !== null
                ? 'bg-yellow-950 text-yellow-300 border border-yellow-700'
                : 'text-slate-600'
            }`}
          >
            {passwords.light !== null ? passwords.light : '?'}
          </span>
        </div>

        {/* Timer */}
        {isTeacher ? (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl font-mono text-[13px] font-bold bg-indigo-950/70 border border-indigo-800 text-indigo-300">
            <Clock className="w-3.5 h-3.5" />
            <span>무제한</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl font-mono text-[14px] font-black bg-slate-900 border border-slate-700 text-slate-100">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {/* Right: Controls & Utilities */}
      <div className="flex items-center gap-1.5">
        {/* Explore Hint (탐색 도움 - 2초간 조작 사물 은은하게 반짝임) */}
        <button
          onClick={onTriggerExploreHint}
          className={`flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-bold rounded-xl transition-all border cursor-pointer ${
            showExploreHint
              ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/40'
              : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
          }`}
          title="2초 동안 조작 가능한 사물 위치를 은은하게 강조합니다"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline">탐색 도움</span>
        </button>

        {/* Hints */}
        <button
          onClick={onOpenHints}
          className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-bold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
          title="힌트 보기"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">힌트</span>
        </button>

        {/* Tutorial */}
        <button
          onClick={onOpenTutorial}
          className="flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-bold rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors cursor-pointer"
          title="게임 방법"
        >
          <Info className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">안내</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
            soundEnabled
              ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
              : 'bg-red-950/60 border-red-800 text-red-400'
          }`}
          title={soundEnabled ? '음소거' : '소리 켜기'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-cyan-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-red-400" />
          )}
        </button>

        {/* Teacher Admin Modal Button (Always accessible on right if teacher or can be opened) */}
        {!isTeacher && (
          <button
            onClick={onOpenTeacherAdmin}
            className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-indigo-300 transition-colors cursor-pointer"
            title="교사용 관리 인증 접속"
          >
            <ShieldCheck className="w-4 h-4" />
          </button>
        )}

        {/* Reset Game */}
        <button
          onClick={onResetGame}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          title="처음부터 다시 시작"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
