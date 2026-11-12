import { StoryScene } from '../types/story';
import { GAME_IMAGES } from '../utils/assets';

export const STORY_SCENES: Record<string, StoryScene> = {
  // 1. 프롤로그 (금요일 오후 6시 06분)
  PROLOGUE: {
    id: 'PROLOGUE',
    chapterTitle: '프롤로그: 마지막 종이 울린 후',
    locationTitle: '삼각산중학교 2학년 교실 · 금요일 오후 6시 06분',
    dialogues: [
      {
        id: 'p1',
        speaker: '시현',
        text: '어? 벌써 6시가 넘었네. 다들 집에 갔나? 교실이 왜 이렇게 덥고 습하지...',
        bgImage: GAME_IMAGES.classroomBg,
        emotion: 'shock',
        effect: 'none',
      },
      {
        id: 'p2',
        speaker: '시현',
        text: '철컥! ...잠깐, 현관문이 잠긴 거야?!',
        bgImage: GAME_IMAGES.classroomBg,
        emotion: 'scared',
        effect: 'shake',
        sound: 'door',
      },
      {
        id: 'p3',
        speaker: '교내 방송',
        text: '치지직... 학교에 남아 있는 학생은 환경 복구 절차를 완료하십시오. 세 공간의 환경을 정상화해야 탈출 암호가 공개됩니다.',
        bgImage: GAME_IMAGES.classroomBg,
        emotion: 'scared',
        effect: 'flicker',
        sound: 'flicker',
      },
    ],
  },

  // 2. Chapter 1 교실 클리어 후 (기술가사실로 이동)
  POST_CLASSROOM: {
    id: 'POST_CLASSROOM',
    chapterTitle: '첫 번째 암호 획득',
    locationTitle: '2학년 복도 ➔ 기술가사실 앞',
    dialogues: [
      {
        id: 'c1',
        speaker: '시현',
        text: '에어컨과 제습기로 교실의 온습도를 적절하게 조절하니까 첫 번째 암호 카드가 나타났어! 교실 문도 열렸다!',
        bgImage: GAME_IMAGES.classroomBg,
        emotion: 'relieved',
        effect: 'none',
        sound: 'chime',
      },
      {
        id: 'c2',
        speaker: '시현',
        text: '덜컹! 방금 복도 끝 기술가사실 쪽에서 소리가 났어... 왜 이렇게 공기가 답답하지? 어서 가보자!',
        bgImage: GAME_IMAGES.hallwayBg,
        emotion: 'determined',
        effect: 'shake',
        sound: 'footsteps',
      },
    ],
  },

  // 3. Chapter 2 기술가사실 클리어 후 (도서관으로 이동)
  POST_TECH_LAB: {
    id: 'POST_TECH_LAB',
    chapterTitle: '두 번째 암호 획득',
    locationTitle: '본관 3층 복도 ➔ 도서관 앞',
    dialogues: [
      {
        id: 't1',
        speaker: '시현',
        text: '배기 후드를 켜고 서로 다른 방향의 창문을 열어 맞통풍을 만드니까 매캐한 공기가 싹 빠졌어! 두 번째 암호 획득!',
        bgImage: GAME_IMAGES.techLabBg,
        emotion: 'relieved',
        effect: 'none',
        sound: 'chime',
      },
      {
        id: 't2',
        speaker: '시현',
        text: '탁! 도서관 쪽 조명이 꺼진 것 같아... 책도 안 보일 만큼 어두운데, 마지막 암호를 찾으러 가보자!',
        bgImage: GAME_IMAGES.hallwayBg,
        emotion: 'shock',
        effect: 'flicker',
        sound: 'flicker',
      },
    ],
  },

  // 4. Chapter 3 도서관 클리어 후 (중앙 현관으로 이동)
  POST_LIBRARY: {
    id: 'POST_LIBRARY',
    chapterTitle: '세 번째 암호 획득',
    locationTitle: '1층 로비 ➔ 삼각산중학교 중앙 현관 앞',
    dialogues: [
      {
        id: 'l1',
        speaker: '시현',
        text: '블라인드로 눈부심을 막고 천장 조명과 스탠드를 켜니까 독서대에 세 번째 암호 카드가 나타났어!',
        bgImage: GAME_IMAGES.libraryBg,
        emotion: 'relieved',
        effect: 'none',
        sound: 'chime',
      },
      {
        id: 'l2',
        speaker: '시현',
        text: '세 공간의 암호를 모두 모았어! 이제 1층 중앙 현관 키패드에 입력하고 탈출하자!',
        bgImage: GAME_IMAGES.mainEntranceBg,
        emotion: 'determined',
        effect: 'none',
        sound: 'footsteps',
      },
    ],
  },

  // 5. 중앙 현관 최종 6문제 클리어 후: 충격의 2단계 반전 엔딩 (장면 1 ~ 장면 5)
  ESCAPE_ENDING: {
    id: 'ESCAPE_ENDING',
    chapterTitle: '에필로그: 밝혀진 진실과 두 번째 밤',
    locationTitle: '삼각산중학교 교무실 앞 · 오후 6시 25분',
    dialogues: [
      // 장면 1 — 탈출 성공
      {
        id: 'end1',
        speaker: '시현',
        text: '철컥-! 드디어 끝났다! 중앙 현관문 잠금이 풀렸어! 이제 집에 갈 수 있어!',
        bgImage: GAME_IMAGES.mainEntranceBg,
        emotion: 'relieved',
        effect: 'none',
        sound: 'unlock',
      },
      // 장면 2 — 이상한 불빛
      {
        id: 'end2',
        speaker: '시현',
        text: '어? 복도 저편 교무실 창문에서 불빛이 새어 나오고 있잖아? 이 시간에 누가 아직 학교에 있지?',
        bgImage: GAME_IMAGES.hallwayBg,
        emotion: 'shock',
        effect: 'none',
        sound: 'footsteps',
      },
      // 장면 3 — 첫 번째 반전 (교무실의 기술·가정 안상준 선생님)
      {
        id: 'end3',
        speaker: '시현',
        text: '어…? 책상에 [안상준 선생님] 명패가…! 안상준 선생님?! 여기서 뭐 하세요?!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'shock',
        effect: 'none',
        sound: 'keyboard',
      },
      {
        id: 'end4',
        speaker: '기술·가정 선생님',
        text: '어? 시현아! 아직 학교에 있었어?!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'shock',
        effect: 'none',
      },
      {
        id: 'end5',
        speaker: '시현',
        text: '학교 문이 전부 잠기고 교내 방송이 나와서 얼마나 무서웠는데요!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'none',
      },
      {
        id: 'end6',
        speaker: '기술·가정 선생님',
        text: '잠깐… 내가 내일 수업에 쓰려고 교내 환경 제어 장치로 방탈출 게임 프로그램을 만들고 있었는데… 설마 그게 진짜로 작동한 거야?!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'shock',
        effect: 'none',
      },
      {
        id: 'end7',
        speaker: '시현',
        text: '네?! 그럼 지금까지 있었던 일이 전부 선생님 때문이었어요?!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'shock',
        effect: 'none',
      },
      {
        id: 'end8',
        speaker: '기술·가정 선생님',
        text: '미안하다 시현아… 설마 실제 학교 시스템과 연동되어 문이 잠길 줄은 꿈에도 몰랐지… 이제 얼른 같이 나가자.',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'relieved',
        effect: 'none',
      },
      // 장면 4 — 두 번째 반전 (갑작스러운 문 닫힘과 2단계 시작)
      {
        id: 'end9',
        speaker: '상황',
        text: '쾅───────!!!!!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'shock',
        effect: 'shake',
        sound: 'slam',
      },
      {
        id: 'end10',
        speaker: '기술·가정 선생님',
        text: '(덜컹덜컹) 뭐… 뭐야?! 교무실 문이 왜 밖에서 잠겨버려?! 안 열려!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'flicker',
        sound: 'flicker',
      },
      {
        id: 'end11',
        speaker: '시현',
        text: '선생님… 복도 조명이 하나씩 꺼지고 있어요…!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'shake',
      },
      {
        id: 'end12',
        speaker: '교내 기계 방송',
        text: '치이익... [경고] 환경 복구 시스템 2단계를 시작합니다. 학교 전체 출입문을 전면 폐쇄합니다.',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'flicker',
        sound: 'warning',
      },
      {
        id: 'end13',
        speaker: '기술·가정 선생님',
        text: '뭐라고?! 잠깐… 난 2단계 같은 건 만든 적이 없는데?! 도대체 누가…?!',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'shock',
        effect: 'shake',
      },
      // 장면 5 — 충격적인 결말 (암전 & TO BE CONTINUED)
      {
        id: 'end14',
        speaker: '노트북 화면',
        text: '[붉은색 경고] 2단계 시스템 가동 / 학교 전체 출입문 잠금 완료 / 새로운 참가자 2명 확인.',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'flicker',
        sound: 'warning',
      },
      {
        id: 'end15',
        speaker: '시현',
        text: '선생님… 이제 우리 둘 다 완전히 갇힌 거예요…?',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'none',
      },
      {
        id: 'end16',
        speaker: '기술·가정 선생님',
        text: '…………………….',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'none',
      },
      {
        id: 'end17',
        speaker: '상황',
        text: '팟-! 교무실의 모든 조명이 꺼지고, 차가운 암전 속에서 육중한 자물쇠 소리가 울려 퍼진다. 철컥.',
        bgImage: GAME_IMAGES.teachersOfficeBg,
        emotion: 'scared',
        effect: 'blackout',
        sound: 'blackout',
      },
    ],
  },
};
