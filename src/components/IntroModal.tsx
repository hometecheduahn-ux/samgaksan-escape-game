import React, { useState } from 'react';
import { Volume2, Sparkles, Ghost, Compass, UserCheck, GraduationCap, Play } from 'lucide-react';
import { GameMode } from '../types/game';
import { soundManager } from '../utils/audio';

interface IntroModalProps {
  onStart: (mode: GameMode) => void;
}

export const IntroModal: React.FC<IntroModalProps> = ({ onStart }) => {
  const [selectedMode, setSelectedMode] = useState<GameMode>('STUDENT_CHALLENGE');

  const handleStart = () => {
    soundManager.initContext();
    soundManager.startBgm();
    soundManager.playDoorUnlock();
    onStart(selectedMode);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/92 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        {/* Mystery Ambient Header */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-[#101426] via-slate-900 to-slate-900 border-b border-slate-800 text-center relative overflow-hidden">
          {/* Subtle animated background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-36 bg-indigo-600/15 blur-3xl rounded-full pointer-events-none" />

          <div className="text-[15px] font-mono font-bold tracking-widest text-amber-400 uppercase mb-2 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>삼각산중학교 · 오후 6시 06분</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-100 tracking-tight leading-tight">
            마지막 종이 울린 후
          </h1>
          <div className="text-xl sm:text-2xl font-black text-amber-400 tracking-wide mt-1">
            ― 잠겨버린 학교 ―
          </div>
        </div>

        {/* Mystery Prose Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Mystery Atmosphere Blackboard Box */}
          <div className="p-6 rounded-2xl bg-[#0d1715] border-2 border-[#1e3b33] shadow-inner font-serif space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between text-[15px] text-[#7ac9b2] font-mono border-b border-[#1e3b33] pb-2">
              <span className="font-semibold">삼각산중학교 본관 2층</span>
              <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                <Ghost className="w-4 h-4 animate-pulse" />
                <span>칠판의 서늘한 글씨</span>
              </span>
            </div>

            <div className="text-[17px] md:text-[19px] text-slate-200 leading-relaxed space-y-2">
              <p>마지막 종이 울렸다.</p>
              <p>텅 빈 복도에서 누군가의 발소리가 들린다.</p>
              <p className="font-bold text-amber-300">철컥.</p>
              <p>갑자기 학교의 모든 문이 잠겼다.</p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border-2 border-amber-500/60 text-center my-2 shadow-lg">
              <span className="text-amber-300 font-black text-[19px] md:text-[22px] tracking-wide not-italic">
                "내가 남긴 세 가지 기억을 찾아줘."
              </span>
            </div>

            <p className="text-[15px] md:text-[16px] text-slate-300 leading-relaxed">
              학교 구석구석을 탐색하고 세 공간(교실·실습실·도서관)의 환경 문제를 해결해 암호를 모으세요.
            </p>
          </div>

          {/* Mode Selector Toggle */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-slate-300 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-cyan-400" />
                <span>플레이 모드 선택</span>
              </span>
              <span className="text-[15px] text-slate-400 font-mono">
                {selectedMode === 'STUDENT_CHALLENGE' ? '학생 실전 도전' : '교사용 자유 시연'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedMode('STUDENT_CHALLENGE')}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedMode === 'STUDENT_CHALLENGE'
                    ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-[17px]">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>학생 도전 모드</span>
                </div>
                <span className="text-[15px] text-slate-300">
                  30분 제한 시간 · 순차 탐색 · 실전 탈출
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMode('TEACHER_DEMO')}
                className={`p-3.5 rounded-xl border-2 text-left transition-all cursor-pointer flex flex-col gap-1 ${
                  selectedMode === 'TEACHER_DEMO'
                    ? 'bg-indigo-950/70 border-indigo-400 text-indigo-200 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-[17px]">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>교사 시연 모드</span>
                </div>
                <span className="text-[15px] text-slate-300">
                  시간 무제한 · 구역 자유 이동 · 리셋 지원
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer with Single Large Start Button */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[15px] text-slate-400">
            <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>시작 시 긴장감 넘치는 미스터리 BGM과 효과음이 재생됩니다</span>
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-[18px] transition-all shadow-xl shadow-emerald-950/80 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>게임 시작</span>
          </button>
        </div>
      </div>
    </div>
  );
};
