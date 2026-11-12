import React, { useState } from 'react';
import { ChapterId, PasswordFragments } from '../types/game';
import {
  ShieldAlert,
  Key,
  MapPin,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Lock,
  X,
  Play,
  HelpCircle,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GeneratedCode } from '../utils/passwords';

interface TeacherAdminModalProps {
  currentChapter: ChapterId;
  passwords: PasswordFragments;
  generatedCode: GeneratedCode;
  onSelectChapter: (chapter: ChapterId) => void;
  onOpenQuiz: () => void;
  onOpenEnding: () => void;
  onResetRoom1: () => void;
  onResetRoom2: () => void;
  onResetRoom3: () => void;
  onRegenerateCode: () => void;
  onResetEntireGame: () => void;
  onClose: () => void;
}

export const TeacherAdminModal: React.FC<TeacherAdminModalProps> = ({
  currentChapter,
  passwords,
  generatedCode,
  onSelectChapter,
  onOpenQuiz,
  onOpenEnding,
  onResetRoom1,
  onResetRoom2,
  onResetRoom3,
  onRegenerateCode,
  onResetEntireGame,
  onClose,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [authError, setAuthError] = useState<string | null>(null);

  const TEACHER_PIN = 'teacher2026';

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === TEACHER_PIN || pinInput.trim() === 'samgaksan') {
      soundManager.playDoorUnlock();
      setIsAuthenticated(true);
      setAuthError(null);
    } else {
      soundManager.playErrorBuzzer();
      setAuthError('교원 인증 번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-lg bg-slate-900 border-2 border-indigo-500 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-black text-slate-100">
              삼각산중학교 교사용 관리자 모드
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate if not authenticated */}
        {!isAuthenticated ? (
          <form onSubmit={handleAuthSubmit} className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-200">교원 인증 확인</h3>
              <p className="text-xs text-slate-400">
                학생의 무단 접근을 방지하기 위해 교사용 인증 번호를 입력하세요.
                <br />
                <span className="text-slate-500 font-mono">(기본 인증키: teacher2026)</span>
              </p>
            </div>

            <div className="space-y-1">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="인증 번호 입력"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 text-center font-mono text-lg focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              {authError && (
                <p className="text-xs text-red-400 text-center font-bold pt-1">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
            >
              교원 모드 접속
            </button>
          </form>
        ) : (
          /* Authenticated Teacher Control Panel */
          <div className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
            {/* 1. Current Passcode Status */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-indigo-300">
                <span className="flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>현재 세션 생성 암호 (총 3자리)</span>
                </span>
                <span className="text-emerald-400">인증됨</span>
              </div>

              <div className="flex items-center justify-around py-2">
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 block font-mono">1. 교실 (열)</span>
                  <span className="text-2xl font-black font-mono text-amber-300">
                    [{generatedCode.digits[0]}]
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 block font-mono">2. 가사실 (공기)</span>
                  <span className="text-2xl font-black font-mono text-amber-300">
                    [{generatedCode.digits[1]}]
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-[11px] text-slate-400 block font-mono">3. 도서관 (빛)</span>
                  <span className="text-2xl font-black font-mono text-amber-300">
                    [{generatedCode.digits[2]}]
                  </span>
                </div>
                <div className="text-center border-l border-slate-800 pl-3">
                  <span className="text-[11px] text-cyan-400 block font-mono">최종 비밀번호</span>
                  <span className="text-2xl font-black font-mono text-cyan-300">
                    {generatedCode.fullCode}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onRegenerateCode();
                }}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>새로운 테스트용 암호 3자리 재생성</span>
              </button>
            </div>

            {/* 2. Direct Stage Jump */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 font-mono">구역 바로 이동</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'CLASSROOM' as ChapterId, label: '1. 2학년 교실' },
                  { id: 'TECH_LAB' as ChapterId, label: '2. 기술가사실' },
                  { id: 'LIBRARY' as ChapterId, label: '3. 도서관' },
                  { id: 'MAIN_GATE' as ChapterId, label: '4. 중앙 현관' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundManager.playDoorUnlock();
                      onSelectChapter(item.id);
                      onClose();
                    }}
                    className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                      currentChapter === item.id
                        ? 'bg-indigo-950 border-indigo-400 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{item.label}</span>
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Direct Jump to Final Quiz & Ending */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 font-mono">탈출 절차 테스트</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    onOpenQuiz();
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-600 text-cyan-200 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>최종 퀴즈 6문제 바로 열기</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playVictoryFanfare();
                    onOpenEnding();
                    onClose();
                  }}
                  className="p-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900 border border-emerald-600 text-emerald-200 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-4 h-4" />
                  <span>엔딩 화면 바로 테스트</span>
                </button>
              </div>
            </div>

            {/* 4. Room Reset Tools */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 font-mono">방별 기기 조작 리셋</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    soundManager.playSwitch();
                    onResetRoom1();
                  }}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-bold text-center cursor-pointer"
                >
                  교실 리셋
                </button>
                <button
                  onClick={() => {
                    soundManager.playSwitch();
                    onResetRoom2();
                  }}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-bold text-center cursor-pointer"
                >
                  가사실 리셋
                </button>
                <button
                  onClick={() => {
                    soundManager.playSwitch();
                    onResetRoom3();
                  }}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-slate-300 text-[11px] font-bold text-center cursor-pointer"
                >
                  도서관 리셋
                </button>
              </div>
            </div>

            {/* 5. Full Reset */}
            <button
              onClick={() => {
                if (window.confirm('전체 진행 상황을 초기화하고 새 암호로 처음부터 시작하시겠습니까?')) {
                  onResetEntireGame();
                  onClose();
                }
              }}
              className="w-full py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-700 text-red-300 text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>전체 게임 초기화 및 재시작</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
