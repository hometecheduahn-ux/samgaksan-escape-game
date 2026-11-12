import React from 'react';
import { X, Volume2, VolumeX, Music, Bell } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface AudioSettingsModalProps {
  bgmVolume: number;
  sfxVolume: number;
  soundEnabled: boolean;
  onUpdateVolume: (bgm: number, sfx: number) => void;
  onToggleSound: () => void;
  onClose: () => void;
}

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  bgmVolume,
  sfxVolume,
  soundEnabled,
  onUpdateVolume,
  onToggleSound,
  onClose,
}) => {
  const handleBgmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onUpdateVolume(val, sfxVolume);
  };

  const handleSfxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onUpdateVolume(bgmVolume, val);
    soundEngine.playRemoteBeep();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-md bg-slate-900 border-2 border-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <Volume2 className="w-6 h-6 text-emerald-400" />
            <h3 className="text-lg md:text-xl font-black text-slate-100">오디오 및 음향 설정</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Mute Button */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex items-center gap-2.5 text-[16px] font-bold text-slate-200">
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-500" />
              )}
              <span>전체 소리 출력</span>
            </div>
            <button
              onClick={onToggleSound}
              className={`px-4 py-2 rounded-xl text-[15px] font-black transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {soundEnabled ? '소리 켜짐' : '음소거됨'}
            </button>
          </div>

          {/* BGM Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[16px] text-slate-200">
              <span className="flex items-center gap-2 font-bold">
                <Music className="w-4 h-4 text-indigo-400" />
                <span>배경음악 (BGM) 볼륨</span>
              </span>
              <span className="font-mono text-indigo-300 font-bold">{Math.round(bgmVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={bgmVolume}
              onChange={handleBgmChange}
              disabled={!soundEnabled}
              className="w-full accent-indigo-500 h-3 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* SFX Volume */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[16px] text-slate-200">
              <span className="flex items-center gap-2 font-bold">
                <Bell className="w-4 h-4 text-emerald-400" />
                <span>효과음 (SFX) 볼륨</span>
              </span>
              <span className="font-mono text-emerald-300 font-bold">{Math.round(sfxVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={sfxVolume}
              onChange={handleSfxChange}
              disabled={!soundEnabled}
              className="w-full accent-emerald-500 h-3 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="text-[14px] text-slate-400 text-center pt-2">
            * Web Audio API 실시간 합성 음향으로 지연 없이 재생됩니다.
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[16px] font-bold text-slate-200 cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
