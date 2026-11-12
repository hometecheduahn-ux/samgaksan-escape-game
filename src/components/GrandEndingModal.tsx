import React from 'react';
import { Trophy, Clock, HelpCircle, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface GrandEndingModalProps {
  timeSpentSeconds: number;
  hintsUsedCount: number;
  onRestart: () => void;
}

export const GrandEndingModal: React.FC<GrandEndingModalProps> = ({
  timeSpentSeconds,
  hintsUsedCount,
  onRestart,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}분 ${secs}초`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/92 backdrop-blur-md animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-emerald-500 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-center">
        {/* Header with Trophy */}
        <div className="p-6 bg-gradient-to-b from-emerald-950/80 via-slate-900 to-slate-900 border-b border-slate-800 flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center shadow-lg shadow-emerald-500/30 animate-bounce">
            <Trophy className="w-9 h-9" />
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>삼각산중학교 비상 탈출 성공</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-100">
            마지막 종이 울린 후
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            쾌적하고 안전한 주거 환경 챌린지 완수
          </p>
        </div>

        {/* Narrative & Stats Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Mystery Twist Summary */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2">
            <h4 className="text-sm font-black text-amber-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>충격적인 사건의 전말과 2단계의 시작</span>
            </h4>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              시현이는 3가지 쾌적한 주거 환경 미션과 최종 6문제를 풀고 현관을 열었지만, 
              교무실에서 마주친 기술·가정 안상준 선생님과 함께 <strong>정체불명의 '2단계 시스템'</strong>에 의해 
              학교 전체에 다시 갇히고 말았습니다! 과연 두 사람은 삼각산중학교의 미스터리를 풀고 무사히 탈출할 수 있을까요?
            </p>
            <div className="pt-1 text-center font-bold text-xs text-red-400 font-mono tracking-wider">
              TO BE CONTINUED... 마지막 종이 울린 후 — 두 번째 밤
            </div>
          </div>

          {/* Player Statistics Grid */}
          <div className="grid grid-cols-2 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>총 소요 시간</span>
              </span>
              <div className="text-lg font-black font-mono text-cyan-300">
                {formatTime(timeSpentSeconds)}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>사용한 힌트</span>
              </span>
              <div className="text-lg font-black font-mono text-amber-300">
                {hintsUsedCount} 회
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>환경 미션 완료</span>
              </span>
              <div className="text-lg font-black font-mono text-emerald-300">
                3 / 3 (100%)
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>최종 종합 퀴즈</span>
              </span>
              <div className="text-lg font-black font-mono text-indigo-300">
                6 / 6 문제 해결
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex justify-center">
          <button
            onClick={() => {
              soundManager.playClick();
              onRestart();
            }}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            <span>처음부터 다시 플레이하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
