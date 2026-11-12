import React, { useState } from 'react';
import { FinalQuizQuestion } from '../types/game';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, Lock, Key } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const FINAL_QUIZ_QUESTIONS: FinalQuizQuestion[] = [
  {
    id: 1,
    category: '열 환경',
    curriculumRef: '중2 기술·가정 94쪽',
    question: '여름철 실내 온도가 30℃일 때 적절한 방법은?',
    options: [
      '① 냉방 온도를 27℃로 설정한다.',
      '② 난방 온도를 높인다.',
      '③ 습도를 80%로 높인다.',
    ],
    correctIndex: 0,
    explanation:
      '여름철 실내 적정 온도는 26~28℃입니다. 지나친 냉방은 냉방병을 유발하므로 26~28℃(27℃)로 조절하는 것이 바람직합니다.',
  },
  {
    id: 2,
    category: '열 환경',
    curriculumRef: '중2 기술·가정 94쪽',
    question: '실내 습도가 75%일 때 적절한 방법은?',
    options: [
      '① 가습기를 작동한다.',
      '② 제습기로 습도를 낮춘다.',
      '③ 창문을 모두 밀폐한다.',
    ],
    correctIndex: 1,
    explanation:
      '쾌적한 실내 적정 습도는 40~60%입니다. 습도가 60%를 초과하면 불쾌지수가 높아지고 곰팡이와 결로가 생기므로 제습기로 습도를 낮추어야 합니다.',
  },
  {
    id: 3,
    category: '공기 환경',
    curriculumRef: '중2 기술·가정 95쪽',
    question: '조리 후 실내에 냄새와 수증기가 남아 있다면?',
    options: [
      '① 방향제를 뿌린다.',
      '② 창문을 모두 닫는다.',
      '③ 배기 후드로 오염된 공기를 배출한다.',
    ],
    correctIndex: 2,
    explanation:
      '조리 시 발생하는 연기, 냄새, 수증기는 조리대 바로 위에서 집중 배출하는 배기 후드(국소 배기)를 가동하여 신속히 배출해야 합니다.',
  },
  {
    id: 4,
    category: '공기 환경',
    curriculumRef: '중2 기술·가정 95쪽',
    question: '실내에 바람이 잘 통하도록 하려면?',
    options: [
      '① 서로 다른 방향의 창문을 열어 공기 흐름을 만든다.',
      '② 모든 창문을 닫는다.',
      '③ 한쪽 창문을 커튼으로 막는다.',
    ],
    correctIndex: 0,
    explanation:
      '통풍은 바람길을 내어 공기를 통과시키는 것입니다. 마주 보거나 서로 다른 방향의 창문을 함께 열어야 효과적인 맞통풍이 형성됩니다.',
  },
  {
    id: 5,
    category: '빛 환경',
    curriculumRef: '중2 기술·가정 96쪽',
    question: '창가에서 책을 읽는데 햇빛 때문에 눈이 부시다면?',
    options: [
      '① 조명을 모두 끈다.',
      '② 블라인드로 강한 직사광선을 조절한다.',
      '③ 창문에 더 가까이 앉는다.',
    ],
    correctIndex: 1,
    explanation:
      '자연 채광의 직사광선이 눈에 직접 닿으면 심한 눈부심과 피로를 유발하므로 블라인드나 차양으로 빛을 부드럽게 조절해야 합니다.',
  },
  {
    id: 6,
    category: '빛 환경',
    curriculumRef: '중2 기술·가정 97쪽',
    question: '어두운 책상에서 공부할 때 적절한 방법은?',
    options: [
      '① 스탠드만 켜고 주변은 완전히 어둡게 한다.',
      '② 불을 끄고 화면 밝기만 높인다.',
      '③ 전체 조명과 책상 조명을 적절히 사용한다.',
    ],
    correctIndex: 2,
    explanation:
      '방 전체를 고르게 밝히는 전반 조명(천장등)과 작업면을 비추는 국부 조명(스탠드)을 함께 사용해야 명암 차이에 의한 눈의 피로를 예방할 수 있습니다.',
  },
];

interface FinalSecurityQuizModalProps {
  onComplete: () => void;
  onCancel?: () => void;
  initialQuestionIndex?: number;
}

export const FinalSecurityQuizModal: React.FC<FinalSecurityQuizModalProps> = ({
  onComplete,
  onCancel,
  initialQuestionIndex = 0,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(initialQuestionIndex);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);

  const currentQ = FINAL_QUIZ_QUESTIONS[currentIdx];

  const handleSelect = (idx: number) => {
    soundManager.playClick();
    setSelectedOption(idx);
    setFeedback(null);
  };

  const handleConfirm = () => {
    if (selectedOption === null) return;

    if (selectedOption === currentQ.correctIndex) {
      soundManager.playSuccessChime();
      setFeedback({
        isCorrect: true,
        text: `정답입니다! ${currentQ.explanation}`,
      });
    } else {
      soundManager.playErrorBuzzer();
      setFeedback({
        isCorrect: false,
        text: '오답입니다. 문제를 다시 읽고 기술·가정 교과서의 쾌적한 주거 환경 원리를 적용해 보세요.',
      });
    }
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIdx + 1 < FINAL_QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      // All 6 solved!
      soundManager.playDoorUnlock();
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border-2 border-cyan-500/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Top Security Terminal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800">
              <ShieldCheck className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-[17px] font-black text-slate-100 flex items-center gap-2">
                <span>삼각산중학교 중앙 현관 2차 보안 확인</span>
              </h2>
              <p className="text-[12px] font-mono text-cyan-400">
                주거 환경 종합 평가 검증 시스템
              </p>
            </div>
          </div>

          {/* Progress Indicator (1/6 to 6/6) */}
          <div className="px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-500 text-cyan-300 font-mono font-black text-sm">
            {currentIdx + 1} / {FINAL_QUIZ_QUESTIONS.length}
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-slate-950 h-2 flex">
          {FINAL_QUIZ_QUESTIONS.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-300 ${
                i < currentIdx
                  ? 'bg-emerald-500'
                  : i === currentIdx
                  ? 'bg-cyan-400 animate-pulse'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Question Body */}
        <div className="p-6 space-y-5">
          {/* Category Tag */}
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800 text-xs font-bold font-mono">
              [{currentQ.category}] {currentQ.curriculumRef}
            </span>
            <span className="text-xs font-mono text-slate-500">
              문제 {currentIdx + 1}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-black text-slate-100 leading-snug">
            {currentQ.question}
          </h3>

          {/* 3 Options List */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-2xl border-2 text-left transition-all font-bold text-[15px] cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md ring-2 ring-cyan-500/30'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-400 text-slate-950'
                        : 'border-slate-700'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Notice */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border text-[14px] leading-relaxed animate-in fade-in duration-200 ${
                feedback.isCorrect
                  ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                  : 'bg-red-950/70 border-red-500 text-red-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <span>{feedback.text}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            6문제를 모두 해결하면 현관문이 열립니다
          </span>

          <div className="flex items-center gap-3">
            {!feedback?.isCorrect ? (
              <button
                onClick={handleConfirm}
                disabled={selectedOption === null}
                className={`px-6 py-3 rounded-xl font-black text-sm flex items-center gap-1.5 transition-all shadow-md ${
                  selectedOption !== null
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer shadow-cyan-500/20 active:scale-95'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                }`}
              >
                <span>답안 제출</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>
                  {currentIdx + 1 === FINAL_QUIZ_QUESTIONS.length
                    ? '최종 잠금 해제 (탈출)'
                    : '다음 문제'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
