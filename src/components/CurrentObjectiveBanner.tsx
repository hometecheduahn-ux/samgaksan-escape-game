import React from 'react';
import { Target, Sparkles } from 'lucide-react';
import { ChapterId, ThermalState, AirLabState, LightLibraryState, PasswordFragments } from '../types/game';

interface CurrentObjectiveBannerProps {
  currentChapter: ChapterId;
  thermal: ThermalState;
  airLab: AirLabState;
  lightLibrary: LightLibraryState;
  passwords: PasswordFragments;
  onTriggerExploreHint: () => void;
  showExploreHint: boolean;
}

export const CurrentObjectiveBanner: React.FC<CurrentObjectiveBannerProps> = ({
  currentChapter,
  thermal,
  airLab,
  lightLibrary,
  passwords,
  onTriggerExploreHint,
  showExploreHint,
}) => {
  const getObjective = () => {
    switch (currentChapter) {
      case 'CLASSROOM':
        if (thermal.cardClaimed) {
          return '1차 열 환경 미션 완료! 복도를 통해 기술가사실로 이동하세요.';
        }
        if (thermal.isThermalOptimal) {
          return '쾌적한 열 환경 조성 완료! 교탁 위에 나타난 암호 카드를 클릭하세요.';
        }
        return '교실이 덥고 습합니다. 냉방과 제습 설비를 조작하여 쾌적한 여름철 교실을 만드세요.';

      case 'TECH_LAB':
        if (airLab.cardClaimed) {
          return '2차 공기 환경 미션 완료! 3층 도서관으로 이동하세요.';
        }
        if (airLab.isAirOptimal) {
          return '공기 정화 완료! 조리대 위에 나타난 암호 카드를 클릭하세요.';
        }
        return '실습실 공기가 답답합니다. 배기 후드를 켜고 창문을 열어 맞통풍 바람길을 형성하세요.';

      case 'LIBRARY':
        if (lightLibrary.cardClaimed) {
          return '3차 빛 환경 미션 완료! 1층 중앙 현관으로 이동하세요.';
        }
        if (lightLibrary.isLightOptimal) {
          return '독서 조명 환경 조성 완료! 책상 위에 나타난 암호 카드를 클릭하세요.';
        }
        return '도서관이 어둡고 창가에 직사광선 눈부심이 있습니다. 채광과 조명을 알맞게 조절하세요.';

      case 'MAIN_GATE':
        return '세 공간에서 획득한 3자리 암호를 입력하고 최종 보안 확인 6문제를 해결하세요.';
    }
  };

  return (
    <div className="w-full max-w-[1240px] px-3 py-1 flex items-center justify-between gap-2 text-[13px] md:text-[14px] select-none">
      <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
        <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">
          <Target className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold text-amber-300 flex-shrink-0">현재 미션:</span>
        <span className="font-medium text-slate-200 truncate">{getObjective()}</span>
      </div>

      {/* 탐색 도움 버튼: 2초간 조작 사물 은은하게 반짝임 */}
      <button
        onClick={onTriggerExploreHint}
        className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-[12px] font-bold transition-all flex-shrink-0 cursor-pointer border ${
          showExploreHint
            ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/40 shadow-sm'
            : 'bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:border-slate-600'
        }`}
        title="조작 가능한 사물의 위치를 2초 동안 은은하게 강조합니다"
      >
        <Sparkles
          className={`w-3.5 h-3.5 ${showExploreHint ? 'text-cyan-300 animate-spin' : 'text-amber-400'}`}
        />
        <span>{showExploreHint ? '탐색 도움 활성' : '탐색 도움'}</span>
      </button>
    </div>
  );
};
