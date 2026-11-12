import React, { useState } from 'react';
import { X, HelpCircle, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';
import { ChapterId } from '../types/game';
import { HINTS } from '../data/clues';
import { soundManager } from '../utils/audio';

interface HintModalProps {
  mission: ChapterId;
  onClose: () => void;
  onUseHint?: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({
  mission,
  onClose,
  onUseHint,
}) => {
  const [unlockedTier2, setUnlockedTier2] = useState<boolean>(false);
  const hintData = HINTS[mission] || HINTS.CLASSROOM;

  const handleUnlockTier2 = () => {
    soundManager.playClick();
    setUnlockedTier2(true);
    if (onUseHint) onUseHint();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/88 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-100">
                단계별 탐구 힌트
              </h2>
              <p className="text-[13px] text-slate-400 font-mono">{hintData.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Tier 1: Thought-Provoking Question */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-[15px] font-bold text-amber-300">
              <span className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>1단계 질문: 무엇을 생각해야 할까요?</span>
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                기본 제공
              </span>
            </div>
            <p className="text-[15px] text-slate-200 leading-relaxed pl-7">
              {hintData.questionPrompt}
            </p>
          </div>

          {/* Tier 2: Core Textbook Concepts */}
          <div
            className={`p-4 rounded-2xl border-2 space-y-2 transition-all ${
              unlockedTier2
                ? 'bg-slate-950 border-indigo-700/80'
                : 'bg-slate-950/50 border-slate-800/80 opacity-70'
            }`}
          >
            <div className="flex items-center justify-between text-[15px] font-bold text-indigo-300">
              <span className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>2단계 힌트: 교과서 핵심 개념</span>
              </span>
              {!unlockedTier2 && (
                <button
                  onClick={handleUnlockTier2}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-bold flex items-center gap-1 cursor-pointer transition-all shadow"
                >
                  <span>힌트 열람</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {unlockedTier2 ? (
              <p className="text-[15px] text-slate-200 leading-relaxed pl-7 animate-in fade-in duration-200">
                {hintData.conceptHint}
              </p>
            ) : (
              <p className="text-xs text-slate-500 italic pl-7">
                스스로 조금 더 고민해 본 뒤 필요할 때 교과서 핵심 힌트를 열람하세요.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold text-slate-200 transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
