import React, { useEffect } from 'react';
import { Key, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LearningSummaryModalProps {
  chapterTitle: string;
  category: string;
  curriculumRef: string;
  digit: number;
  oneSentenceSummary: string;
  onContinue: () => void;
}

export const LearningSummaryModal: React.FC<LearningSummaryModalProps> = ({
  chapterTitle,
  category,
  curriculumRef,
  digit,
  oneSentenceSummary,
  onContinue,
}) => {
  useEffect(() => {
    soundManager.playSuccessChime();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/70 rounded-3xl p-6 md:p-8 shadow-2xl shadow-amber-500/20 text-center flex flex-col items-center">
        {/* Glow Halo */}
        <div className="absolute -top-12 w-24 h-24 rounded-full bg-amber-500/20 blur-xl pointer-events-none" />

        {/* Password Digit Celebration Badge */}
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex flex-col items-center justify-center shadow-lg shadow-amber-500/50 border-2 border-amber-200 animate-bounce">
            <span className="text-[12px] font-mono font-bold tracking-widest uppercase">암호 조각</span>
            <span className="text-4xl font-black font-mono leading-none">{digit}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-emerald-500 text-slate-950 shadow-md">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Chapter Title & Curriculum Reference */}
        <div className="flex items-center gap-2 text-[14px] font-mono text-amber-400 font-bold mb-1">
          <Sparkles className="w-4 h-4 animate-spin" />
          <span>{chapterTitle}</span>
          <span>·</span>
          <span>{curriculumRef}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-black text-slate-100 mb-4">
          {category} 문제 해결 완료!
        </h2>

        {/* Core One-Sentence Concept Card */}
        <div className="w-full p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 mb-6 text-left shadow-inner">
          <div className="text-[12px] font-mono font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5" />
            <span>핵심 학습 정리</span>
          </div>
          <p className="text-[17px] md:text-[18px] font-bold text-white leading-relaxed">
            "{oneSentenceSummary}"
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onContinue();
          }}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-amber-500/30 transition-all hover:scale-[1.02] cursor-pointer"
        >
          <span>스토리 확인 및 다음 장소로 이동</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
