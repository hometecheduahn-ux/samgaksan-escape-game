export type SpeakerType =
  | '시현'
  | '교내 방송'
  | '교내 기계 방송'
  | '기술·가정 선생님'
  | '노트북 화면'
  | '상황'
  | '나레이션'
  | '선생님'
  | '안내 모니터';

export type CharacterEmotion = 'normal' | 'shock' | 'scared' | 'thinking' | 'determined' | 'relieved';

export type ScreenEffect = 'none' | 'shake' | 'flicker' | 'darkness' | 'blackout';

export interface StoryDialogue {
  id: string;
  speaker: SpeakerType;
  text: string;
  bgImage: string;
  emotion?: CharacterEmotion;
  effect?: ScreenEffect;
  sound?:
    | 'footsteps'
    | 'door'
    | 'broadcast'
    | 'flicker'
    | 'unlock'
    | 'chime'
    | 'slam'
    | 'keyboard'
    | 'warning'
    | 'blackout';
}

export interface StoryScene {
  id: string;
  chapterTitle: string;
  locationTitle: string;
  dialogues: StoryDialogue[];
}
