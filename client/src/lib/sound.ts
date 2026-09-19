import { useCallback } from 'react';
import { useProfile } from '../db/profile';

const TONES = { correct: [660, 880], wrong: [300, 220], finish: [523, 659, 784] } as const;
export type SoundName = keyof typeof TONES;

let ctx: AudioContext | null = null;

export function playSound(name: SoundName): void {
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    ctx ??= new AC();
    const audio = ctx;
    const now = audio.currentTime;
    TONES[name].forEach((freq, i) => {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = now + i * 0.12;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);
      osc.connect(gain).connect(audio.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    });
  } catch {
    /* âm thanh là tuỳ chọn */
  }
}

export function useSound(): (name: SoundName) => void {
  const enabled = useProfile()?.sound !== false;
  return useCallback((name: SoundName) => {
    if (enabled) playSound(name);
  }, [enabled]);
}
