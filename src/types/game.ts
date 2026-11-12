export type ChapterId = 'CLASSROOM' | 'TECH_LAB' | 'LIBRARY' | 'MAIN_GATE';

export type GameMode = 'TEACHER_DEMO' | 'STUDENT_CHALLENGE';

export type Season = 'SUMMER';

// Chapter 1: Classroom Thermal Environment State (열 환경, 교과서 94쪽)
export interface ThermalState {
  roomTemp: number; // starts around 31.0℃
  targetTemp: number; // remote setting, starts at 24℃
  acPower: boolean; // starts false
  acMode: 'COOL' | 'HEAT' | 'FAN'; // starts 'FAN' or 'OFF'
  acFanSpeed: 'AUTO' | 'LOW' | 'MED' | 'HIGH';
  humidity: number; // starts around 75%
  dehumidifierPower: boolean; // starts false
  dehumidifierTargetHumidity: number; // starts at 50%
  isThermalOptimal: boolean; // acPower && acMode === 'COOL' && roomTemp 26~28 && dehumidifierPower && humidity 40~60
  cardRevealed: boolean;
  cardClaimed: boolean;
}

// Chapter 2: Tech & Home Economics Lab Air Environment State (공기 환경, 교과서 95쪽)
export interface AirLabState {
  windowAOpen: boolean; // 서로 다른 방향의 창문 A (좌측)
  windowBOpen: boolean; // 반대쪽 창문 B (후면/우측)
  rangeHoodOn: boolean; // 조리대 배기 후드 (국소 배기)
  odorLevel: number; // 0 to 100, starts at 90
  isDraftActive: boolean; // windowAOpen && windowBOpen
  isAirOptimal: boolean; // windowAOpen && windowBOpen && rangeHoodOn
  cardRevealed: boolean;
  cardClaimed: boolean;
}

// Chapter 3: Library Light Environment State (빛 환경, 교과서 96~97쪽)
export interface LightLibraryState {
  blindsClosed: boolean; // 창문 블라인드 (직사광선 눈부심 차단)
  ceilingLightOn: boolean; // 천장 전반 조명 (전체적인 조도 확보)
  deskLampOn: boolean; // 책상용 스탠드 (국부 조명, 독서대 조도 보완)
  isLightOptimal: boolean; // blindsClosed && ceilingLightOn && deskLampOn
  cardRevealed: boolean;
  cardClaimed: boolean;
}

// Passwords collected from 3 chapters (Dynamic 3 digits)
export interface PasswordFragments {
  thermal: number | null; // Chapter 1: Digit 1
  air: number | null;     // Chapter 2: Digit 2
  light: number | null;   // Chapter 3: Digit 3
}

export type InspectionTarget =
  | null
  | 'AC_REMOTE'
  | 'DEHUMIDIFIER'
  | 'WINDOW_A'
  | 'WINDOW_B'
  | 'RANGE_HOOD'
  | 'BLINDS'
  | 'CEILING_LIGHT'
  | 'DESK_LAMP'
  | 'MAIN_KEYPAD';

export interface FinalQuizQuestion {
  id: number;
  category: '열 환경' | '공기 환경' | '빛 환경';
  curriculumRef: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}
