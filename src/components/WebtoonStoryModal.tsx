import React, { useState, useEffect } from 'react';
import { ArrowRight, FastForward, History, Sparkles, X } from 'lucide-react';
import { StoryScene, StoryDialogue } from '../types/story';
import { soundManager } from '../utils/audio';
import { SamgaksanSignboardOverlay } from './SamgaksanSignboardOverlay';
import { TeacherDeskNameplateOverlay } from './TeacherDeskNameplateOverlay';
import { GAME_IMAGES } from '../utils/assets';

interface WebtoonStoryModalProps {
  scene: StoryScene;
  onComplete: () => void;
}

export const WebtoonStoryModal: React.FC<WebtoonStoryModalProps> = ({
  scene,
  onComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [isFlickering, setIsFlickering] = useState<boolean>(false);

  const dialogue: StoryDialogue = scene.dialogues[currentIdx] || scene.dialogues[0];
  const isLast = currentIdx >= scene.dialogues.length - 1;

  // Sound and visual effects per dialogue
  useEffect(() => {
    if (!dialogue) return;

    if (dialogue.sound === 'door') {
      soundManager.playDoorUnlock();
    } else if (dialogue.sound === 'footsteps') {
      soundManager.playFootsteps();
    } else if (dialogue.sound === 'broadcast') {
      soundManager.playRemoteBeep();
    } else if (dialogue.sound === 'chime') {
      soundManager.playSuccessChime();
    } else if (dialogue.sound === 'flicker') {
      soundManager.playLightFlicker();
    } else if (dialogue.sound === 'unlock') {
      soundManager.playDoorUnlock();
    } else if (dialogue.sound === 'slam') {
      soundManager.playDoorSlam();
    } else if (dialogue.sound === 'keyboard') {
      soundManager.playKeyboardTyping();
    } else if (dialogue.sound === 'warning') {
      soundManager.playComputerWarning();
    } else if (dialogue.sound === 'blackout') {
      soundManager.playBlackout();
    }

    if (dialogue.effect === 'shake') {
      setIsShaking(true);
      const timer = setTimeout(() => setIsShaking(false), 500);
      return () => clearTimeout(timer);
    } else if (dialogue.effect === 'flicker') {
      setIsFlickering(true);
      const timer = setTimeout(() => setIsFlickering(false), 450);
      return () => clearTimeout(timer);
    }
  }, [currentIdx, dialogue]);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundManager.playClick();
    if (isLast) {
      onComplete();
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    onComplete();
  };

  // Keyboard navigation: Space or Enter advances dialogue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showLogModal) return;
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showLogModal, isLast, onComplete]);

  // Speaker Badge Styles
  const getSpeakerStyle = (speaker: string) => {
    switch (speaker) {
      case '시현':
        return {
          bg: 'bg-emerald-950/90 border-emerald-500 text-emerald-300',
          dot: 'bg-emerald-400',
          name: '시현 (중2)',
        };
      case '교내 방송':
        return {
          bg: 'bg-red-950/90 border-red-500 text-red-300 animate-pulse',
          dot: 'bg-red-400',
          name: '정체불명의 교내 방송',
        };
      case '교내 기계 방송':
        return {
          bg: 'bg-red-950/95 border-red-500 text-red-300 animate-pulse font-mono',
          dot: 'bg-red-500 animate-ping',
          name: '[교내 환경 복구 시스템]',
        };
      case '기술·가정 선생님':
        return {
          bg: 'bg-amber-950/90 border-amber-500 text-amber-300',
          dot: 'bg-amber-400',
          name: '안상준 선생님 (기술·가정)',
        };
      case '노트북 화면':
        return {
          bg: 'bg-zinc-950/95 border-red-600 text-red-400 font-mono tracking-wider',
          dot: 'bg-red-500',
          name: '[교사용 제어 노트북 화면]',
        };
      case '안내 모니터':
        return {
          bg: 'bg-cyan-950/90 border-cyan-500 text-cyan-300',
          dot: 'bg-cyan-400',
          name: '삼각산중학교 안내 시스템',
        };
      case '상황':
        return {
          bg: 'bg-zinc-900/95 border-zinc-600 text-zinc-300 italic',
          dot: 'bg-zinc-400',
          name: '상황 설명',
        };
      default:
        return {
          bg: 'bg-indigo-950/90 border-indigo-500 text-indigo-300',
          dot: 'bg-indigo-400',
          name: '상황 설명',
        };
    }
  };

  const speakerStyle = getSpeakerStyle(dialogue?.speaker || '나레이션');

  return (
    <div
      onClick={() => handleNext()}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/95 select-none overflow-hidden cursor-pointer"
    >
      {/* 16:9 Viewport Container (Optimized for Chromebook 1366x768 with Zero Vertical Scroll) */}
      <div
        className={`relative w-full max-w-[1240px] aspect-[16/9] max-h-[calc(100vh-20px)] bg-black border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-transform duration-200 ${
          isShaking ? 'translate-x-2 -translate-y-1' : ''
        }`}
      >
        {/* Background Visual (Centered, Uncropped, High-res) */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <img
            key={dialogue.bgImage}
            src={dialogue.bgImage}
            alt={scene.locationTitle}
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              isFlickering ? 'brightness-125 filter contrast-125' : 'brightness-85 contrast-105'
            }`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.triedPublic) {
                target.dataset.triedPublic = 'true';
                target.src = '/images/' + target.src.split('/').pop();
              }
            }}
          />
          {dialogue.bgImage === GAME_IMAGES.mainEntranceBg && <SamgaksanSignboardOverlay />}
          {dialogue.bgImage === GAME_IMAGES.teachersOfficeBg && <TeacherDeskNameplateOverlay />}
        </div>

        {/* Blackout Cliffhanger Overlay for Climax Scene */}
        {dialogue.effect === 'blackout' && (
          <div className="absolute inset-0 z-30 bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-700">
            <div className="w-16 h-1 bg-red-600 mb-6 animate-pulse" />
            <p className="text-red-500 font-mono tracking-widest text-xs md:text-sm mb-2 font-black animate-pulse">
              [ EMERGENCY LOCKDOWN ACTIVATED ]
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-widest mb-3 drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]">
              TO BE CONTINUED...
            </h2>
            <p className="text-lg md:text-2xl font-black text-red-500 tracking-wide mb-6">
              마지막 종이 울린 후 — 두 번째 밤
            </p>
            <div className="text-xs md:text-sm text-slate-400 font-mono">
              [화면을 클릭하면 최종 탈출 결과 및 학습 기록으로 이동합니다]
            </div>
          </div>
        )}

        {/* Ambient Top & Bottom Shadow Gradients */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 to-transparent pointer-events-none" />

        {/* Minimalist Top Header (Compact, No Viewport Obstruction) */}
        <div className="relative z-20 flex items-center justify-between px-4 py-2.5 bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/60 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-mono font-bold text-amber-400 uppercase tracking-wider">
              {scene.chapterTitle}
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[14px] font-bold text-slate-200">
              {scene.locationTitle}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[12px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-400 border border-slate-700">
              {currentIdx + 1} / {scene.dialogues.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
                setShowLogModal(true);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-[13px] font-bold text-slate-300 transition-colors cursor-pointer border border-slate-700/80"
              title="대화 기록 보기"
            >
              <History className="w-3.5 h-3.5 text-cyan-400" />
              <span>기록</span>
            </button>
            <button
              onClick={handleSkip}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-[13px] font-bold text-amber-300 transition-colors cursor-pointer border border-amber-600/40"
              title="스토리 건너뛰기"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>건너뛰기</span>
            </button>
          </div>
        </div>

        {/* Middle Area: Left completely open so the school background image is unobstructed */}
        <div className="flex-1 pointer-events-none" />

        {/* Bottom Dialogue Box (Occupies bottom 22% of viewport, semi-transparent, clean) */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-20 h-[24%] min-h-[110px] max-h-[145px] bg-slate-950/85 backdrop-blur-md border-t border-slate-700/60 p-4 md:p-5 flex flex-col justify-between pointer-events-auto"
        >
          {/* Top of Box: Speaker Badge */}
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-[14px] font-black shadow-sm ${speakerStyle.bg}`}>
              <span className={`w-2 h-2 rounded-full ${speakerStyle.dot}`} />
              <span>{speakerStyle.name}</span>
            </div>
          </div>

          {/* Dialogue Text (17~19px crisp typography, max 2-3 lines) */}
          <div className="flex-1 flex items-center py-1">
            <p className="text-[17px] md:text-[19px] font-bold text-slate-100 leading-snug tracking-wide">
              {dialogue.text}
            </p>
          </div>

          {/* Bottom of Box: Guide text on left, "Next ▶" button on right */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[12px] font-mono text-slate-400 opacity-80">
              [화면 클릭] 또는 [스페이스바] 로 대화 진행
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-[15px] shadow-lg shadow-amber-500/20 transition-all hover:scale-105 cursor-pointer"
            >
              <span>{isLast ? '완료' : '다음'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dialogue Log Modal */}
      {showLogModal && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative w-full max-w-lg bg-slate-900 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-black text-slate-100">대화 기록</h3>
              </div>
              <button
                onClick={() => setShowLogModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {scene.dialogues.slice(0, currentIdx + 1).map((d) => (
                <div key={d.id} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[13px] font-bold text-amber-400 mb-1">{d.speaker}</div>
                  <div className="text-[15px] text-slate-200">{d.text}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowLogModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
