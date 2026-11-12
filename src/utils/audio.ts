/**
 * Advanced Web Audio API Synthesizer Engine
 * Generates cinematic mystery background music and responsive sound effects.
 * No external file dependencies, zero 404 risk, 100% offline & reproducible.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  public bgmVolume: number = 0.4;
  public sfxVolume: number = 0.7;

  // BGM Nodes
  private bgmGainNode: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmIntervalId: number | null = null;
  private bgmDroneOsc1: OscillatorNode | null = null;
  private bgmDroneOsc2: OscillatorNode | null = null;

  public initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(bgm: number, sfx: number) {
    this.bgmVolume = Math.max(0, Math.min(1, bgm));
    this.sfxVolume = Math.max(0, Math.min(1, sfx));
    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.setValueAtTime(this.bgmVolume * 0.15, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stopBgm();
    } else {
      this.startBgm();
    }
    return this.enabled;
  }

  /**
   * Starts atmospheric mystery background music
   * Ambient cinematic pad + mysterious soft chimes
   */
  public startBgm() {
    if (!this.enabled || this.isBgmPlaying) return;
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      this.bgmGainNode = this.ctx.createGain();
      this.bgmGainNode.gain.setValueAtTime(0.01, now);
      this.bgmGainNode.gain.linearRampToValueAtTime(this.bgmVolume * 0.18, now + 2);
      this.bgmGainNode.connect(this.ctx.destination);

      // Low mystery pad drone
      this.bgmDroneOsc1 = this.ctx.createOscillator();
      this.bgmDroneOsc1.type = 'triangle';
      this.bgmDroneOsc1.frequency.setValueAtTime(110, now); // A2 note

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, now);
      filter.Q.value = 2;

      this.bgmDroneOsc1.connect(filter);
      filter.connect(this.bgmGainNode);
      this.bgmDroneOsc1.start();

      // Second detuned harmonic drone
      this.bgmDroneOsc2 = this.ctx.createOscillator();
      this.bgmDroneOsc2.type = 'sine';
      this.bgmDroneOsc2.frequency.setValueAtTime(164.81, now); // E3 note
      this.bgmDroneOsc2.connect(filter);
      this.bgmDroneOsc2.start();

      this.isBgmPlaying = true;

      // Mysterious procedural melodic bell chimes (playing pentatonic mystery chords)
      const mysteryNotes = [220, 261.63, 293.66, 329.63, 392.0, 440]; // A3, C4, D4, E4, G4, A4
      let noteStep = 0;

      this.bgmIntervalId = window.setInterval(() => {
        if (!this.isBgmPlaying || !this.ctx || !this.enabled) return;
        try {
          const t = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const noteGain = this.ctx.createGain();

          osc.type = 'sine';
          const freq = mysteryNotes[noteStep % mysteryNotes.length];
          noteStep = noteStep + Math.floor(Math.random() * 2) + 1;

          osc.frequency.setValueAtTime(freq, t);
          noteGain.gain.setValueAtTime(0, t);
          noteGain.gain.linearRampToValueAtTime(this.bgmVolume * 0.08, t + 0.1);
          noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);

          osc.connect(noteGain);
          noteGain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 2.6);
        } catch {}
      }, 2800);
    } catch {}
  }

  public stopBgm() {
    if (!this.isBgmPlaying) return;
    try {
      if (this.bgmIntervalId) {
        clearInterval(this.bgmIntervalId);
        this.bgmIntervalId = null;
      }
      if (this.bgmGainNode && this.ctx) {
        this.bgmGainNode.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      }
      setTimeout(() => {
        try {
          this.bgmDroneOsc1?.stop();
          this.bgmDroneOsc2?.stop();
          this.bgmDroneOsc1?.disconnect();
          this.bgmDroneOsc2?.disconnect();
          this.bgmGainNode?.disconnect();
        } catch {}
        this.isBgmPlaying = false;
      }, 500);
    } catch {
      this.isBgmPlaying = false;
    }
  }

  // SFX: UI Click
  public playClick() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.04);
      gain.gain.setValueAtTime(this.sfxVolume * 0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch {}
  }

  // SFX: Remote / Keypad Electronic Beep
  public playRemoteBeep() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2000, now);
      gain.gain.setValueAtTime(this.sfxVolume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // SFX: Switch toggle
  public playSwitch() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.05);
      gain.gain.setValueAtTime(this.sfxVolume * 0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {}
  }

  // SFX: Air Conditioner Motor / Compressor Hum
  public playAcSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.3);
      osc.frequency.linearRampToValueAtTime(90, now + 0.8);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.18, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.95);
    } catch {}
  }

  // SFX: Dehumidifier Hum & Air Rush
  public playDehumidifierSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.12, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.85);
    } catch {}
  }

  // SFX: Window Slide Open / Close
  public playWindowSlide() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.35);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }

  // SFX: Range Hood Suction Fan Roar
  public playHoodSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.4);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.22, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.95);
    } catch {}
  }

  // SFX: Blinds Cord Pull Ratchet
  public playBlindsSound() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.08, 0.16, 0.24].forEach((offset) => {
        const t = now + offset;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(280, t + 0.04);
        gain.gain.setValueAtTime(this.sfxVolume * 0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 0.06);
      });
    } catch {}
  }

  // SFX: Wind / Ventilation whoosh
  public playWindWhoosh() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const bufferSize = this.ctx.sampleRate * 0.7;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(750, this.ctx.currentTime + 0.35);
      filter.frequency.exponentialRampToValueAtTime(220, this.ctx.currentTime + 0.7);

      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(this.sfxVolume * 0.18, now + 0.25);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + 0.7);
    } catch {}
  }

  // SFX: Mission Success Chime / Number Card Reveal
  public playSuccessChime() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = this.ctx!.currentTime + idx * 0.12;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(this.sfxVolume * 0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(start);
        osc.stop(start + 0.85);
      });
    } catch {}
  }

  // SFX: Door open latch sound
  public playDoorUnlock() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.frequency.setValueAtTime(900, now);
      gain1.gain.setValueAtTime(this.sfxVolume * 0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.09);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.frequency.setValueAtTime(150, now + 0.1);
      gain2.gain.setValueAtTime(this.sfxVolume * 0.3, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.1);
      osc2.stop(now + 0.36);
    } catch {}
  }

  // SFX: Keypad Error Buzzer
  public playErrorBuzzer() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(130, now);
      gain.gain.setValueAtTime(this.sfxVolume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch {}
  }

  // SFX: Grand Escape Victory Fanfare
  public playVictoryFanfare() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const chord = [261.63, 329.63, 392.0, 523.25, 659.25];
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        const start = this.ctx!.currentTime + idx * 0.08;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(this.sfxVolume * 0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 2.5);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(start);
        osc.stop(start + 2.6);
      });
    } catch {}
  }

  // SFX: Footsteps in empty hallway
  public playFootsteps() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.45, 0.9, 1.35].forEach((offset, idx) => {
        const t = now + offset;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90 + (idx % 2) * 15, t);
        osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);
        gain.gain.setValueAtTime(this.sfxVolume * 0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 0.13);
      });
    } catch {}
  }

  // SFX: Fluorescent light flicker buzz & turn on
  public playLightFlicker() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      gain.gain.setValueAtTime(this.sfxVolume * 0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch {}
  }
  // SFX: Sudden Violent Door Slam ('쾅!!!')
  public playDoorSlam() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // High impact crack
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gain1.gain.setValueAtTime(this.sfxVolume * 0.45, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.21);

      // Low bass boom & rumble reverb
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(80, now);
      osc2.frequency.exponentialRampToValueAtTime(25, now + 0.8);
      gain2.gain.setValueAtTime(this.sfxVolume * 0.5, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.95);
    } catch {}
  }

  // SFX: Laptop keyboard typing clatter
  public playKeyboardTyping() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.06, 0.12, 0.18, 0.25].forEach((offset) => {
        const t = now + offset;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200 + Math.random() * 400, t);
        osc.frequency.exponentialRampToValueAtTime(400, t + 0.02);
        gain.gain.setValueAtTime(this.sfxVolume * 0.1, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 0.035);
      });
    } catch {}
  }

  // SFX: Emergency Warning Alert (Level 2 System Online)
  public playComputerWarning() {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [0, 0.2, 0.4].forEach((offset) => {
        const t = now + offset;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, t);
        osc.frequency.setValueAtTime(660, t + 0.08);
        gain.gain.setValueAtTime(this.sfxVolume * 0.25, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t);
        osc.stop(t + 0.18);
      });
    } catch {}
  }

  // SFX: Sudden Blackout & Final Heavy Lock Latch ('철컥.')
  public playBlackout() {
    this.stopBgm();
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Power pop
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      gain.gain.setValueAtTime(this.sfxVolume * 0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);

      // Heavy lock latch click 0.5s later
      setTimeout(() => {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const oscLatch = this.ctx.createOscillator();
        const gainLatch = this.ctx.createGain();
        oscLatch.type = 'square';
        oscLatch.frequency.setValueAtTime(240, t);
        oscLatch.frequency.exponentialRampToValueAtTime(60, t + 0.15);
        gainLatch.gain.setValueAtTime(this.sfxVolume * 0.4, t);
        gainLatch.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        oscLatch.connect(gainLatch);
        gainLatch.connect(this.ctx.destination);
        oscLatch.start(t);
        oscLatch.stop(t + 0.32);
      }, 500);
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
export const soundManager = soundEngine;
