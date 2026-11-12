/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ChapterId,
  GameMode,
  ThermalState,
  AirLabState,
  LightLibraryState,
  PasswordFragments,
} from './types/game';
import { soundEngine, soundManager } from './utils/audio';
import {
  GeneratedCode,
  getOrCreatePasscode,
  resetPasscode,
} from './utils/passwords';

import { GameHeader } from './components/GameHeader';
import { CurrentObjectiveBanner } from './components/CurrentObjectiveBanner';
import { ClassroomView } from './components/ClassroomView';
import { TechHomeLabView } from './components/TechHomeLabView';
import { LibraryView } from './components/LibraryView';
import { MainGateView } from './components/MainGateView';
import { LearningSummaryModal } from './components/LearningSummaryModal';

import { ChapterNavModal } from './components/ChapterNavModal';
import { HintModal } from './components/HintModal';
import { IntroModal } from './components/IntroModal';
import { TutorialModal } from './components/TutorialModal';
import { GrandEndingModal } from './components/GrandEndingModal';
import { WebtoonStoryModal } from './components/WebtoonStoryModal';
import { TeacherAdminModal } from './components/TeacherAdminModal';
import { FinalSecurityQuizModal } from './components/FinalSecurityQuizModal';
import { STORY_SCENES } from './data/storyScenes';

const STUDENT_STORAGE_KEY = 'after_last_bell_student_v5';
const TEACHER_STORAGE_KEY = 'after_last_bell_teacher_v5';

export default function App() {
  // Navigation & Game Mode
  const [gameMode, setGameMode] = useState<GameMode>('STUDENT_CHALLENGE');
  const [currentChapter, setCurrentChapter] = useState<ChapterId>('CLASSROOM');
  const [timeLeft, setTimeLeft] = useState<number>(1200); // 20 minutes
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [showTutorial, setShowTutorial] = useState<boolean>(false);
  const [showExploreHint, setShowExploreHint] = useState<boolean>(false);
  const [hintsUsedCount, setHintsUsedCount] = useState<number>(0);
  const [activeStoryScene, setActiveStoryScene] = useState<string | null>(null);

  // Dynamic 3-Digit Passcode generated per student session
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode>(() =>
    getOrCreatePasscode(false)
  );

  // Passwords collected so far: { thermal, air, light }
  const [passwords, setPasswords] = useState<PasswordFragments>({
    thermal: null,
    air: null,
    light: null,
  });

  // Modals
  const [activeModal, setActiveModal] = useState<
    'MAP' | 'HINTS' | 'TEACHER_ADMIN' | 'FINAL_QUIZ' | 'GRAND_ENDING' | null
  >(null);

  const [learningSummary, setLearningSummary] = useState<{
    chapterTitle: string;
    category: string;
    curriculumRef: string;
    digit: number;
    oneSentenceSummary: string;
    nextScene: string;
  } | null>(null);

  // Chapter 1: Thermal Environment State
  const [thermal, setThermal] = useState<ThermalState>({
    roomTemp: 31.0,
    targetTemp: 24,
    acPower: false,
    acMode: 'FAN',
    acFanSpeed: 'AUTO',
    humidity: 75,
    dehumidifierPower: false,
    dehumidifierTargetHumidity: 50,
    isThermalOptimal: false,
    cardRevealed: false,
    cardClaimed: false,
  });

  // Chapter 2: Air Environment State
  const [airLab, setAirLab] = useState<AirLabState>({
    windowAOpen: false,
    windowBOpen: false,
    rangeHoodOn: false,
    odorLevel: 90,
    isDraftActive: false,
    isAirOptimal: false,
    cardRevealed: false,
    cardClaimed: false,
  });

  // Chapter 3: Light Environment State
  const [lightLibrary, setLightLibrary] = useState<LightLibraryState>({
    blindsClosed: false,
    ceilingLightOn: false,
    deskLampOn: false,
    isLightOptimal: false,
    cardRevealed: false,
    cardClaimed: false,
  });

  const isLoadedRef = useRef(false);
  const exploreTimerRef = useRef<number | null>(null);

  // Exploration Assistance: triggers 2-second glowing hint on clickable items
  const handleTriggerExploreHint = useCallback(() => {
    soundManager.playClick();
    setShowExploreHint(true);
    if (exploreTimerRef.current) {
      window.clearTimeout(exploreTimerRef.current);
    }
    exploreTimerRef.current = window.setTimeout(() => {
      setShowExploreHint(false);
    }, 2000);
  }, []);

  // Load from localStorage based on mode
  const loadStateForMode = useCallback((mode: GameMode) => {
    try {
      const isTeacher = mode === 'TEACHER_DEMO';
      const storageKey = isTeacher ? TEACHER_STORAGE_KEY : STUDENT_STORAGE_KEY;
      const code = getOrCreatePasscode(isTeacher);
      setGeneratedCode(code);

      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const p = JSON.parse(saved);
        if (p.currentChapter) setCurrentChapter(p.currentChapter);
        if (typeof p.timeLeft === 'number') setTimeLeft(p.timeLeft);
        if (p.passwords) setPasswords(p.passwords);
        if (p.thermal) setThermal(p.thermal);
        if (p.airLab) setAirLab(p.airLab);
        if (p.lightLibrary) setLightLibrary(p.lightLibrary);
        if (p.hintsUsedCount) setHintsUsedCount(p.hintsUsedCount);
      }
    } catch {}
  }, []);

  // Save to localStorage based on mode
  useEffect(() => {
    if (!isLoadedRef.current || showIntro) return;
    try {
      const isTeacher = gameMode === 'TEACHER_DEMO';
      const storageKey = isTeacher ? TEACHER_STORAGE_KEY : STUDENT_STORAGE_KEY;
      const payload = {
        currentChapter,
        timeLeft,
        passwords,
        thermal,
        airLab,
        lightLibrary,
        hintsUsedCount,
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch {}
  }, [
    gameMode,
    currentChapter,
    timeLeft,
    passwords,
    thermal,
    airLab,
    lightLibrary,
    hintsUsedCount,
    showIntro,
  ]);

  // Mode Selection from Intro Modal
  const handleStartGame = (mode: GameMode) => {
    setGameMode(mode);
    loadStateForMode(mode);
    isLoadedRef.current = true;
    setShowIntro(false);
    setShowTutorial(true);
  };

  // 20-min Countdown Timer (Only in Student Challenge mode)
  useEffect(() => {
    if (showIntro || gameMode === 'TEACHER_DEMO') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showIntro, gameMode]);

  // Chapter 1 Physics: Thermal Environment
  useEffect(() => {
    let targetTemp = 31.0;
    let targetHumidity = 75;

    // AC cooling works ONLY if power is ON and mode is COOL
    if (thermal.acPower) {
      if (thermal.acMode === 'COOL') {
        targetTemp = thermal.targetTemp;
      } else if (thermal.acMode === 'HEAT') {
        targetTemp = 33.0; // warming up
      } else if (thermal.acMode === 'FAN') {
        targetTemp = 30.5;
      }
    }

    if (thermal.dehumidifierPower) {
      targetHumidity = thermal.dehumidifierTargetHumidity;
    }

    const newTemp = Number(
      (thermal.roomTemp + (targetTemp - thermal.roomTemp) * 0.35).toFixed(1)
    );
    const newHumidity = Math.round(
      thermal.humidity + (targetHumidity - thermal.humidity) * 0.35
    );

    const isTempComfort = newTemp >= 26 && newTemp <= 28;
    const isHumidityComfort = newHumidity >= 40 && newHumidity <= 60;
    const isOptimal =
      thermal.acPower &&
      thermal.acMode === 'COOL' &&
      isTempComfort &&
      thermal.dehumidifierPower &&
      isHumidityComfort;

    setThermal((prev) => ({
      ...prev,
      roomTemp: newTemp,
      humidity: newHumidity,
      isThermalOptimal: isOptimal,
      cardRevealed: isOptimal,
    }));
  }, [
    thermal.acPower,
    thermal.acMode,
    thermal.targetTemp,
    thermal.dehumidifierPower,
    thermal.dehumidifierTargetHumidity,
  ]);

  // Chapter 2 Physics: Air Environment
  useEffect(() => {
    let targetOdor = 90;
    const isDraft = airLab.windowAOpen && airLab.windowBOpen;

    if (airLab.windowAOpen) targetOdor -= 15;
    if (airLab.windowBOpen) targetOdor -= 15;
    if (isDraft) targetOdor -= 25; // cross-ventilation multiplier
    if (airLab.rangeHoodOn) targetOdor -= 35; // localized suction

    const newOdor = Math.max(10, targetOdor);
    const isAirClean = isDraft && airLab.rangeHoodOn;

    setAirLab((prev) => ({
      ...prev,
      odorLevel: newOdor,
      isDraftActive: isDraft,
      isAirOptimal: isAirClean,
      cardRevealed: isAirClean,
    }));
  }, [airLab.windowAOpen, airLab.windowBOpen, airLab.rangeHoodOn]);

  // Chapter 3 Physics: Light Environment
  useEffect(() => {
    const isOptimal =
      lightLibrary.blindsClosed &&
      lightLibrary.ceilingLightOn &&
      lightLibrary.deskLampOn;

    setLightLibrary((prev) => ({
      ...prev,
      isLightOptimal: isOptimal,
      cardRevealed: isOptimal,
    }));
  }, [
    lightLibrary.blindsClosed,
    lightLibrary.ceilingLightOn,
    lightLibrary.deskLampOn,
  ]);

  // Card Claim Handlers: Awards the actual generated code digit!
  const handleClaimThermalCard = () => {
    soundManager.playSuccessChime();
    const digit1 = generatedCode.digits[0];
    setPasswords((p) => ({ ...p, thermal: digit1 }));
    setThermal((prev) => ({ ...prev, cardClaimed: true }));
    setLearningSummary({
      chapterTitle: '1. 2학년 교실',
      category: '열 환경',
      curriculumRef: '교과서 94쪽',
      digit: digit1,
      oneSentenceSummary:
        '여름철 실내 적정 온도(26~28℃)와 습도(40~60%)를 알맞게 조절하여 쾌적한 열 환경을 유지합니다.',
      nextScene: 'POST_CLASSROOM',
    });
  };

  const handleClaimAirCard = () => {
    soundManager.playSuccessChime();
    const digit2 = generatedCode.digits[1];
    setPasswords((p) => ({ ...p, air: 6 }));
    setPasswords((p) => ({ ...p, air: digit2 }));
    setAirLab((prev) => ({ ...prev, cardClaimed: true }));
    setLearningSummary({
      chapterTitle: '2. 기술가사실',
      category: '공기 환경',
      curriculumRef: '교과서 95쪽',
      digit: digit2,
      oneSentenceSummary:
        '배기 후드로 오염원을 집중 배출(국소 배기)하고, 서로 다른 방향의 창문을 열어 맞통풍을 만들어 실내 공기를 신속히 순환합니다.',
      nextScene: 'POST_TECH_LAB',
    });
  };

  const handleClaimLightCard = () => {
    soundManager.playSuccessChime();
    const digit3 = generatedCode.digits[2];
    setPasswords((p) => ({ ...p, light: digit3 }));
    setLightLibrary((prev) => ({ ...prev, cardClaimed: true }));
    setLearningSummary({
      chapterTitle: '3. 도서관',
      category: '빛 환경',
      curriculumRef: '교과서 96~97쪽',
      digit: digit3,
      oneSentenceSummary:
        '블라인드로 직사광선 눈부심을 막고, 천장 전반 조명과 책상 스탠드(국부 조명)를 함께 켜서 시력을 보호합니다.',
      nextScene: 'POST_LIBRARY',
    });
  };

  // Reset Individual Rooms (Teacher Mode Tools)
  const handleResetRoom1 = () => {
    setThermal({
      roomTemp: 31.0,
      targetTemp: 24,
      acPower: false,
      acMode: 'FAN',
      acFanSpeed: 'AUTO',
      humidity: 75,
      dehumidifierPower: false,
      dehumidifierTargetHumidity: 50,
      isThermalOptimal: false,
      cardRevealed: false,
      cardClaimed: false,
    });
  };

  const handleResetRoom2 = () => {
    setAirLab({
      windowAOpen: false,
      windowBOpen: false,
      rangeHoodOn: false,
      odorLevel: 90,
      isDraftActive: false,
      isAirOptimal: false,
      cardRevealed: false,
      cardClaimed: false,
    });
  };

  const handleResetRoom3 = () => {
    setLightLibrary({
      blindsClosed: false,
      ceilingLightOn: false,
      deskLampOn: false,
      isLightOptimal: false,
      cardRevealed: false,
      cardClaimed: false,
    });
  };

  const handleRegenerateCode = () => {
    const isTeacher = gameMode === 'TEACHER_DEMO';
    const newCode = resetPasscode(isTeacher);
    setGeneratedCode(newCode);
    setPasswords({ thermal: null, air: null, light: null });
    alert(`새로운 3자리 암호 [${newCode.fullCode}]가 생성되었습니다.`);
  };

  // Reset Entire Game (New random code, fresh state)
  const handleResetEntireGame = () => {
    const isTeacher = gameMode === 'TEACHER_DEMO';
    const storageKey = isTeacher ? TEACHER_STORAGE_KEY : STUDENT_STORAGE_KEY;
    localStorage.removeItem(storageKey);
    const newCode = resetPasscode(isTeacher);
    setGeneratedCode(newCode);

    setCurrentChapter('CLASSROOM');
    setTimeLeft(1200);
    setPasswords({ thermal: null, air: null, light: null });
    handleResetRoom1();
    handleResetRoom2();
    handleResetRoom3();
    setHintsUsedCount(0);
    setShowExploreHint(false);
    setActiveStoryScene(null);
    setLearningSummary(null);
    setShowIntro(true);
    setShowTutorial(false);
    setActiveModal(null);
  };

  const handleToggleSound = () => {
    const next = soundEngine.toggleMute();
    setSoundEnabled(next);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* Top Header */}
      <GameHeader
        gameMode={gameMode}
        currentChapter={currentChapter}
        timeLeft={timeLeft}
        passwords={passwords}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenTutorial={() => setShowTutorial(true)}
        onOpenHints={() => {
          setHintsUsedCount((c) => c + 1);
          setActiveModal('HINTS');
        }}
        onOpenMap={() => setActiveModal('MAP')}
        onResetGame={handleResetEntireGame}
        onOpenTeacherAdmin={() => setActiveModal('TEACHER_ADMIN')}
        onTriggerExploreHint={handleTriggerExploreHint}
        showExploreHint={showExploreHint}
      />

      {/* Dynamic Immersive Mission Objective Banner */}
      <div className="w-full flex justify-center">
        <CurrentObjectiveBanner
          currentChapter={currentChapter}
          thermal={thermal}
          airLab={airLab}
          lightLibrary={lightLibrary}
          passwords={passwords}
          onTriggerExploreHint={handleTriggerExploreHint}
          showExploreHint={showExploreHint}
        />
      </div>

      {/* Main Exploration Screen */}
      <main className="flex-1 flex flex-col justify-center items-center w-full relative">
        {currentChapter === 'CLASSROOM' && (
          <ClassroomView
            thermal={thermal}
            onUpdateThermal={(patch) => setThermal((p) => ({ ...p, ...patch }))}
            onClaimCard={handleClaimThermalCard}
            showExploreHint={showExploreHint}
            firstDigit={generatedCode.digits[0]}
          />
        )}

        {currentChapter === 'TECH_LAB' && (
          <TechHomeLabView
            airLab={airLab}
            onToggleWindowA={() =>
              setAirLab((p) => ({ ...p, windowAOpen: !p.windowAOpen }))
            }
            onToggleWindowB={() =>
              setAirLab((p) => ({ ...p, windowBOpen: !p.windowBOpen }))
            }
            onToggleHood={() =>
              setAirLab((p) => ({ ...p, rangeHoodOn: !p.rangeHoodOn }))
            }
            onClaimCard={handleClaimAirCard}
            showExploreHint={showExploreHint}
            secondDigit={generatedCode.digits[1]}
          />
        )}

        {currentChapter === 'LIBRARY' && (
          <LibraryView
            lightState={lightLibrary}
            onToggleBlinds={() =>
              setLightLibrary((p) => ({ ...p, blindsClosed: !p.blindsClosed }))
            }
            onToggleCeilingLight={() =>
              setLightLibrary((p) => ({ ...p, ceilingLightOn: !p.ceilingLightOn }))
            }
            onToggleDeskLamp={() =>
              setLightLibrary((p) => ({ ...p, deskLampOn: !p.deskLampOn }))
            }
            onClaimCard={handleClaimLightCard}
            showExploreHint={showExploreHint}
            thirdDigit={generatedCode.digits[2]}
          />
        )}

        {currentChapter === 'MAIN_GATE' && (
          <MainGateView
            passwords={passwords}
            expectedCode={generatedCode.fullCode}
            onEscapeSuccess={() => setActiveStoryScene('ESCAPE_ENDING')}
            onOpenMap={() => setActiveModal('MAP')}
            showExploreHint={showExploreHint}
          />
        )}
      </main>

      {/* Intro Modal on First Launch */}
      {showIntro && <IntroModal onStart={handleStartGame} />}

      {/* 4-Step Game Tutorial Modal */}
      {showTutorial && (
        <TutorialModal
          onClose={() => {
            setShowTutorial(false);
            setActiveStoryScene('PROLOGUE');
          }}
        />
      )}

      {/* Core Learning Summary Modal (Triggered upon solving each room) */}
      {learningSummary && (
        <LearningSummaryModal
          chapterTitle={learningSummary.chapterTitle}
          category={learningSummary.category}
          curriculumRef={learningSummary.curriculumRef}
          digit={learningSummary.digit}
          oneSentenceSummary={learningSummary.oneSentenceSummary}
          onContinue={() => {
            const next = learningSummary.nextScene;
            setLearningSummary(null);
            setActiveStoryScene(next);
          }}
        />
      )}

      {/* Webtoon Visual Novel Story Modal */}
      {activeStoryScene && STORY_SCENES[activeStoryScene] && (
        <WebtoonStoryModal
          scene={STORY_SCENES[activeStoryScene]}
          onComplete={() => {
            const currentScene = activeStoryScene;
            setActiveStoryScene(null);
            if (currentScene === 'POST_CLASSROOM') {
              setCurrentChapter('TECH_LAB');
            } else if (currentScene === 'POST_TECH_LAB') {
              setCurrentChapter('LIBRARY');
            } else if (currentScene === 'POST_LIBRARY') {
              setCurrentChapter('MAIN_GATE');
            } else if (currentScene === 'ESCAPE_ENDING') {
              setActiveModal('GRAND_ENDING');
            }
          }}
        />
      )}

      {/* Chapter Map Navigation Modal */}
      {activeModal === 'MAP' && (
        <ChapterNavModal
          gameMode={gameMode}
          currentChapter={currentChapter}
          passwords={passwords}
          isThermalDone={thermal.isThermalOptimal}
          isAirDone={airLab.isAirOptimal}
          isLightDone={lightLibrary.isLightOptimal}
          onSelectChapter={(target) => setCurrentChapter(target)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Step-by-Step 2-Tier Exploration Hints Modal */}
      {activeModal === 'HINTS' && (
        <HintModal
          mission={currentChapter}
          onClose={() => setActiveModal(null)}
          onUseHint={() => setHintsUsedCount((c) => c + 1)}
        />
      )}

      {/* Protected Teacher Admin Modal with full 10 teacher functions */}
      {activeModal === 'TEACHER_ADMIN' && (
        <TeacherAdminModal
          currentChapter={currentChapter}
          passwords={passwords}
          generatedCode={generatedCode}
          onSelectChapter={(target) => setCurrentChapter(target)}
          onOpenQuiz={() => setActiveModal('FINAL_QUIZ')}
          onOpenEnding={() => setActiveStoryScene('ESCAPE_ENDING')}
          onResetRoom1={handleResetRoom1}
          onResetRoom2={handleResetRoom2}
          onResetRoom3={handleResetRoom3}
          onRegenerateCode={handleRegenerateCode}
          onResetEntireGame={handleResetEntireGame}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Stage 2 Comprehensive Final Quiz 6 Questions Modal */}
      {activeModal === 'FINAL_QUIZ' && (
        <FinalSecurityQuizModal
          onComplete={() => {
            setActiveModal(null);
            setActiveStoryScene('ESCAPE_ENDING');
          }}
          onCancel={() => setActiveModal(null)}
        />
      )}

      {/* Grand Ending Victory Modal */}
      {activeModal === 'GRAND_ENDING' && (
        <GrandEndingModal
          timeSpentSeconds={1200 - timeLeft}
          hintsUsedCount={hintsUsedCount}
          onRestart={handleResetEntireGame}
        />
      )}
    </div>
  );
}
