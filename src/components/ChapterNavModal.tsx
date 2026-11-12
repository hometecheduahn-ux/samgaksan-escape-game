import React from 'react';
import { X, MapPin, Lock, CheckCircle2, ArrowRight, ShieldCheck, Key } from 'lucide-react';
import { ChapterId, GameMode, PasswordFragments } from '../types/game';
import { soundManager } from '../utils/audio';

interface ChapterNavModalProps {
  gameMode: GameMode;
  currentChapter: ChapterId;
  passwords: PasswordFragments;
  isThermalDone: boolean;
  isAirDone: boolean;
  isLightDone: boolean;
  onSelectChapter: (chapter: ChapterId) => void;
  onClose: () => void;
}

export const ChapterNavModal: React.FC<ChapterNavModalProps> = ({
  gameMode,
  currentChapter,
  passwords,
  isThermalDone,
  isAirDone,
  isLightDone,
  onSelectChapter,
  onClose,
}) => {
  const isTeacher = gameMode === 'TEACHER_DEMO';

  const chapters = [
    {
      id: 'CLASSROOM' as ChapterId,
      name: '1. 2학년 교실',
      topic: '열 환경 (적정 온습도 조절)',
      desc: '여름철 적정 온도 26~28℃, 적정 습도 40~60%',
      unlocked: true,
      cleared: isThermalDone,
      password: passwords.thermal,
      badge: '열 환경',
    },
    {
      id: 'TECH_LAB' as ChapterId,
      name: '2. 기술가사실',
      topic: '공기 환경 (배기 후드 & 맞통풍)',
      desc: '오염원 차단, 배기 후드(국소 배기), 창문 맞통풍',
      unlocked: isTeacher ? true : isThermalDone,
      cleared: isAirDone,
      password: passwords.air,
      badge: '공기 환경',
    },
    {
      id: 'LIBRARY' as ChapterId,
      name: '3. 도서관',
      topic: '빛 환경 (블라인드 & 책상 스탠드)',
      desc: '블라인드 직사광선 차단, 천장등과 독서 스탠드 병용',
      unlocked: isTeacher ? true : isAirDone,
      cleared: isLightDone,
      password: passwords.light,
      badge: '빛 환경',
    },
    {
      id: 'MAIN_GATE' as ChapterId,
      name: '4. 중앙 현관',
      topic: '최종 탈출 관문 (3자리 암호 & 종합 평가)',
      desc: '키패드에 세 방에서 획득한 3자리 암호 입력 후 최종 보안 확인',
      unlocked: isTeacher ? true : isLightDone,
      cleared: false,
      password: null,
      badge: '최종 탈출',
    },
  ];

  const handleGo = (target: ChapterId, unlocked: boolean) => {
    if (!unlocked) {
      soundManager.playRemoteBeep();
      return;
    }
    soundManager.playDoorUnlock();
    onSelectChapter(target);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-950 text-indigo-400 border border-indigo-800">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-100">삼각산중학교 구역 이동 지도</h2>
              <p className="text-[13px] text-slate-400">환경 퍼즐을 해결한 장소로 자유롭게 이동할 수 있습니다.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* List of Chapters */}
        <div className="p-6 overflow-y-auto space-y-3">
          {chapters.map((ch) => {
            const isCurrent = currentChapter === ch.id;
            return (
              <div
                key={ch.id}
                onClick={() => ch.unlocked && handleGo(ch.id, ch.unlocked)}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  !ch.unlocked
                    ? 'bg-slate-950/40 border-slate-800/80 opacity-50 cursor-not-allowed'
                    : isCurrent
                    ? 'bg-indigo-950/40 border-indigo-500 shadow-lg cursor-pointer ring-2 ring-indigo-500/50'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-600 hover:bg-slate-800/60 cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${
                    ch.cleared
                      ? 'bg-emerald-950 border-emerald-600 text-emerald-400'
                      : ch.unlocked
                      ? 'bg-indigo-950 border-indigo-600 text-indigo-400'
                      : 'bg-slate-900 border-slate-800 text-slate-600'
                  }`}>
                    {ch.cleared ? <CheckCircle2 className="w-5 h-5" /> : !ch.unlocked ? <Lock className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-[16px]">{ch.name}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        {ch.badge}
                      </span>
                      {isCurrent && (
                        <span className="text-[11px] font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800">
                          현재 위치
                        </span>
                      )}
                    </div>
                    <p className="text-[13px] text-slate-400 mt-0.5">{ch.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {ch.password !== null && (
                    <div className="px-3 py-1 rounded-xl bg-amber-950/80 border border-amber-600 text-amber-300 font-mono font-black text-sm flex items-center gap-1">
                      <Key className="w-3.5 h-3.5" />
                      <span>[{ch.password}]</span>
                    </div>
                  )}

                  {ch.unlocked && (
                    <button className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
