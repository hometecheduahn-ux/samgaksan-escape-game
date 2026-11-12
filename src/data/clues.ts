import { ChapterId } from '../types/game';

export interface HintItem {
  stage: ChapterId;
  category: string;
  questionPrompt: string; // 1단계: 무엇을 생각해야 하는지 알려주는 짧은 질문
  conceptHint: string;     // 2단계: 교과서의 핵심 개념을 떠올릴 수 있는 설명
}

export const HINTS: Record<ChapterId, HintItem> = {
  CLASSROOM: {
    stage: 'CLASSROOM',
    category: '열 환경 (교과서 94쪽)',
    questionPrompt: '여름철 교실이 지나치게 덥고 눅눅할 때, 어떤 기기를 켜고 몇 도로 맞추어야 체온 조절에 무리가 없을까요?',
    conceptHint: '여름철 권장 실내 적정 온도는 26~28℃, 쾌적 습도는 40~60%입니다. 에어컨 리모컨에서 [냉방] 모드를 켜고 적정 온도를 맞춘 뒤, 제습기를 켜서 적정 습도로 설정해 보세요.',
  },
  TECH_LAB: {
    stage: 'TECH_LAB',
    category: '공기 환경 (교과서 95쪽)',
    questionPrompt: '조리 실습 후 냄새와 수증기를 빠르게 내보내고 실내에 시원한 바람이 통과하게 하려면 어떻게 해야 할까요?',
    conceptHint: '조리대 바로 위에서 오염 공기를 집중 배출하는 [배기 후드(국소 배기)]를 가동하고, 바람길을 형성하기 위해 [서로 다른 방향에 있는 창문 두 개(자연 환기·맞통풍)]를 모두 열어보세요.',
  },
  LIBRARY: {
    stage: 'LIBRARY',
    category: '빛 환경 (교과서 96~97쪽)',
    questionPrompt: '창가에서 들어오는 강한 햇빛의 눈부심을 막고, 책을 읽는 책상 위가 어둡지 않게 하려면 조명을 어떻게 조합해야 할까요?',
    conceptHint: '창가에 들어오는 강한 직사광선은 [블라인드]를 내려 눈부심을 차단하고, 방 전체를 밝히는 [천장 전반 조명]과 책상 위를 집중해서 비추는 [책상용 스탠드(국부 조명)]를 함께 켜야 시력을 보호할 수 있습니다.',
  },
  MAIN_GATE: {
    stage: 'MAIN_GATE',
    category: '최종 탈출 및 보안 확인',
    questionPrompt: '중앙 현관 문을 열기 위해 필요한 비밀번호와 보안 절차는 무엇일까요?',
    conceptHint: '세 공간(교실·가사실·도서관)의 환경 미션을 해결하고 획득한 3자리 숫자를 도어록 키패드에 차례로 입력하세요. 1차 잠금이 해제된 후 나타나는 주거 환경 6문제를 모두 해결하면 현관문이 열립니다.',
  },
};
