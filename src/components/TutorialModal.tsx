import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Search,
  Sliders,
  Key,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TutorialModalProps {
  onClose: () => void;
}

export const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    {
      stepNumber: 1,
      title: '1단계: 공간을 탐색하라',
      icon: <Search className="w-10 h-10 text-amber-400" />,
      tag: '주변 탐색 & 탐색 도움',
      description: '배경 속 사물을 직접 살펴보고 클릭하여 조작할 수 있다.',
      detail: (
        <div className="space-y-3 text-[16px] text-slate-200 leading-relaxed">
          <p>
            교실, 기술가사실, 도서관의 이상 환경을 해결하기 위해 실내 사물들을 클릭해 보세요.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3.5">
            <Sparkles className="w-6 h-6 text-cyan-400 shrink-0" />
            <span className="text-cyan-200 font-semibold text-[15px]">
              조작 위치를 찾기 어려울 땐 상단의 <strong>[탐색 도움]</strong> 버튼을 누르면 클릭 가능한 사물이 2초 동안 은은하게 빛납니다.
            </span>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 2,
      title: '2단계: 실제 기기를 조작하라',
      icon: <Sliders className="w-10 h-10 text-emerald-400" />,
      tag: '쾌적한 주거 환경 조성',
      description: '에어컨 리모컨, 제습기, 창문, 배기 후드, 조명을 알맞게 조절한다.',
      detail: (
        <div className="space-y-3 text-[16px] text-slate-200 leading-relaxed">
          <p>
            중2 기술·가정 교과서에서 배운 쾌적한 주거 환경(열·공기·빛 환경) 원리를 직접 적용해 보세요.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-[13px] pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-amber-300 block mb-1">2학년 교실</span>
              <span className="text-slate-300">에어컨 리모컨 · 실내 제습기</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-cyan-300 block mb-1">기술가사실</span>
              <span className="text-slate-300">맞통풍 창문 2개 · 배기 후드</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="font-bold text-yellow-300 block mb-1">도서관</span>
              <span className="text-slate-300">블라인드 · 천장등 · 책상 스탠드</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 3,
      title: '3단계: 세 자리 암호를 모아라',
      icon: <Key className="w-10 h-10 text-cyan-400" />,
      tag: '암호 수집',
      description: '각 공간의 환경 문제를 해결하면 황금 암호 카드가 나타난다.',
      detail: (
        <div className="space-y-3 text-[16px] text-slate-200 leading-relaxed">
          <p>
            각 공간의 환경을 정상화하면 하나씩 숫자 암호 카드가 드러납니다. 세 공간에서 각각 숫자 하나씩을 획득하세요.
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <span className="text-[14px] text-slate-300">
              게임을 시작할 때마다 학생별로 고유한 3자리 숫자가 배정됩니다.
            </span>
            <div className="flex items-center gap-1.5 font-mono font-black text-[16px]">
              <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800">?</span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800">?</span>
              <span className="px-2.5 py-1 rounded-lg bg-yellow-950 text-yellow-300 border border-yellow-800">?</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      stepNumber: 4,
      title: '4단계: 최종 보안 6문제를 해결하라',
      icon: <ShieldCheck className="w-10 h-10 text-indigo-400" />,
      tag: '최종 탈출',
      description: '3자리 암호 입력 후 종합 문제 6개를 모두 맞혀야 탈출할 수 있다.',
      detail: (
        <div className="space-y-3 text-[16px] text-slate-200 leading-relaxed">
          <p>
            중앙 현관 키패드에 모은 세 자리 숫자를 입력하면 1차 잠금이 해제되며, 마지막 관문인 <strong>주거 환경 종합 6문제</strong>가 시작됩니다.
          </p>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-700/80 text-center">
            <span className="text-indigo-200 font-bold text-[14px]">
              여섯 문제를 모두 해결하면 현관문이 열리고 사건의 진실이 밝혀집니다!
            </span>
          </div>
        </div>
      ),
    },
  ];

  const current = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    soundManager.playClick();
    if (isLast) {
      onClose();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (!isFirst) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300 select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl md:text-2xl font-black text-slate-100">게임 플레이 가이드</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="닫기"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="flex items-center justify-center gap-2.5 px-6 py-3 bg-slate-950/70 border-b border-slate-800">
          {steps.map((s, idx) => (
            <button
              key={s.stepNumber}
              onClick={() => {
                soundManager.playClick();
                setCurrentStep(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === currentStep ? 'w-10 bg-amber-400' : 'w-4 bg-slate-700 hover:bg-slate-600'
              }`}
              title={`${idx + 1}단계 보기`}
            />
          ))}
        </div>

        {/* Step Body */}
        <div className="p-6 md:p-8 space-y-5 overflow-y-auto">
          {/* Main Visual Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 text-center space-y-3 relative overflow-hidden shadow-inner">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg mb-2">
              {current.icon}
            </div>

            <span className="text-[14px] font-mono font-bold px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-slate-700 inline-block">
              {current.tag}
            </span>

            <h3 className="text-2xl font-black text-slate-100">{current.title}</h3>

            <p className="text-[17px] font-bold text-amber-300 leading-relaxed max-w-md mx-auto">
              {current.description}
            </p>
          </div>

          {/* Step Detail Explanation */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            {current.detail}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="text-[15px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer py-2 px-3 font-medium"
          >
            건너뛰기
          </button>

          <div className="flex items-center gap-3">
            {!isFirst && (
              <button
                onClick={handlePrev}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[16px] font-bold text-slate-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>이전</span>
              </button>
            )}

            <button
              onClick={handleNext}
              className={`px-6 py-3 rounded-xl text-[17px] font-black transition-all flex items-center gap-2 shadow-lg cursor-pointer ${
                isLast
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-950'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-950'
              }`}
            >
              <span>{isLast ? '이해했습니다 (시작)' : '다음'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
