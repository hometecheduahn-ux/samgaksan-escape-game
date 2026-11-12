import React, { useState } from 'react';
import { PasswordFragments } from '../types/game';
import { Lock, Key, Delete, X, ShieldCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { GAME_IMAGES } from '../utils/assets';
import { SamgaksanSignboardOverlay } from './SamgaksanSignboardOverlay';
import { FinalSecurityQuizModal } from './FinalSecurityQuizModal';

interface MainGateViewProps {
  passwords: PasswordFragments;
  expectedCode: string;
  onEscapeSuccess: () => void;
  onOpenMap: () => void;
  showExploreHint: boolean;
}

export const MainGateView: React.FC<MainGateViewProps> = ({
  passwords,
  expectedCode,
  onEscapeSuccess,
  onOpenMap,
  showExploreHint,
}) => {
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [stage1Unlocked, setStage1Unlocked] = useState<boolean>(false);

  const allCardsCollected =
    passwords.thermal !== null &&
    passwords.air !== null &&
    passwords.light !== null;

  const handleKeyPress = (num: number) => {
    soundManager.playRemoteBeep();
    if (inputCode.length < 3) {
      setInputCode((prev) => prev + num);
      setErrorMessage(null);
    }
  };

  const handleDelete = () => {
    soundManager.playClick();
    setInputCode((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    soundManager.playClick();
    setInputCode('');
    setErrorMessage(null);
  };

  const handleSubmit = () => {
    if (!allCardsCollected) {
      soundManager.playErrorBuzzer();
      setErrorMessage(
        '아직 세 공간의 암호를 모두 획득하지 못했습니다! 교실, 가사실, 도서관의 환경을 먼저 정상화하세요.'
      );
      return;
    }

    if (inputCode === expectedCode) {
      soundManager.playDoorUnlock();
      setShowKeypad(false);
      setStage1Unlocked(true);
      // Open 2nd stage: 6 Comprehensive Quiz Questions
      setShowQuizModal(true);
    } else {
      soundManager.playErrorBuzzer();
      setErrorMessage('비밀번호 불일치: 세 공간에서 획득한 3자리 숫자를 순서대로 입력하세요.');
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-56px)] min-h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden select-none">
      {/* 16:9 Viewport Container */}
      <div className="relative w-full max-w-[1240px] aspect-[16/9] max-h-full shadow-2xl overflow-hidden bg-black border border-slate-800">
        {/* Main 2D Main Entrance Background */}
        <img
          src={GAME_IMAGES.mainEntranceBg}
          onError={(e) => {
            e.currentTarget.src = '/images/school_main_entrance_1794318396768.jpg';
          }}
          alt="삼각산중학교 중앙 현관 전경"
          className="w-full h-full object-cover transition-all duration-1000 brightness-90 contrast-105"
          referrerPolicy="no-referrer"
        />

        {/* Photorealistic Signboard Overlay: Covers '대광중학교' completely with '삼각산중학교' */}
        <SamgaksanSignboardOverlay />

        {/* Interactive Object: Wall-mounted Electronic Security Keypad */}
        <button
          onClick={() => {
            soundManager.playClick();
            if (stage1Unlocked) {
              setShowQuizModal(true);
            } else {
              setShowKeypad(true);
            }
          }}
          className={`absolute top-[46%] left-[42%] w-[7%] h-[14%] rounded-xl group cursor-pointer transition-all border-2 border-cyan-400/90 shadow-xl ${
            showExploreHint
              ? 'ring-4 ring-cyan-400 bg-cyan-400/30 animate-pulse'
              : 'hover:bg-cyan-500/25'
          }`}
          aria-label="전자 키패드 조작"
        >
          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950/60 rounded-lg">
            {stage1Unlocked ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
            ) : (
              <Lock className="w-5 h-5 text-cyan-400 animate-pulse" />
            )}
            <span className="text-[10px] font-mono text-cyan-300 font-black">
              {stage1Unlocked ? 'SECURITY' : 'KEYPAD'}
            </span>
          </div>
        </button>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <div className="px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-[14px] md:text-[15px] text-slate-200 shadow-xl">
            <span className="text-slate-400 font-bold mr-2">최종 탈출 관문:</span>
            <span className="font-bold text-cyan-300">
              {stage1Unlocked
                ? '1차 잠금 해제 완료! 최종 6문제 보안 확인을 완료하여 탈출하세요.'
                : allCardsCollected
                ? '세 공간의 암호가 모두 모였습니다! 키패드를 클릭해 3자리 비밀번호를 입력하세요.'
                : '세 공간(교실·가사실·도서관)의 환경 미션을 모두 해결하고 암호를 모으세요.'}
            </span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <div className="px-4 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-[14px] font-mono font-bold text-slate-200 shadow-xl">
              수집 암호: [{passwords.thermal ?? '?'}] [{passwords.air ?? '?'}] [
              {passwords.light ?? '?'}]
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 3-Digit Keypad Modal */}
      {showKeypad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 select-none">
          <div className="relative w-full max-w-sm bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            {/* Keypad Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-cyan-400" />
                <h3 className="text-[17px] font-black text-slate-100">중앙 현관 도어록 키패드</h3>
              </div>
              <button
                onClick={() => setShowKeypad(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Keypad Display */}
            <div className="p-6 space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border-2 border-slate-800 flex flex-col items-center justify-center">
                <span className="text-[12px] font-mono text-slate-400 mb-1">
                  세 공간에서 획득한 3자리 암호
                </span>
                <div className="flex items-center gap-3 font-mono text-3xl font-black tracking-widest text-cyan-400 h-10">
                  {[0, 1, 2].map((idx) => (
                    <span
                      key={idx}
                      className={`w-10 h-12 rounded-xl border flex items-center justify-center ${
                        inputCode[idx]
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                          : 'bg-slate-900/50 border-slate-800 text-slate-600'
                      }`}
                    >
                      {inputCode[idx] || '_'}
                    </span>
                  ))}
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 bg-red-950/60 border border-red-500/60 rounded-xl text-red-200 text-[13px] text-center font-bold">
                  {errorMessage}
                </div>
              )}

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-2.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleKeyPress(num)}
                    className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xl font-bold font-mono transition-all active:scale-95 border border-slate-700 cursor-pointer shadow-sm"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-400 text-[14px] font-bold transition-all active:scale-95 border border-slate-700 cursor-pointer"
                >
                  초기화
                </button>
                <button
                  onClick={() => handleKeyPress(0)}
                  className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 text-xl font-bold font-mono transition-all active:scale-95 border border-slate-700 cursor-pointer shadow-sm"
                >
                  0
                </button>
                <button
                  onClick={handleDelete}
                  className="py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-amber-400 flex items-center justify-center transition-all active:scale-95 border border-slate-700 cursor-pointer"
                >
                  <Delete className="w-5 h-5" />
                </button>
              </div>

              {/* Enter Button */}
              <button
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-base shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Key className="w-5 h-5" />
                <span>1차 암호 입력 확인</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stage 2: Final Comprehensive 6-Question Security Quiz Modal */}
      {showQuizModal && (
        <FinalSecurityQuizModal
          onComplete={() => {
            setShowQuizModal(false);
            onEscapeSuccess();
          }}
          onCancel={() => setShowQuizModal(false)}
        />
      )}
    </div>
  );
};
