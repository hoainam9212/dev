import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { setDefaultRate } from '../lib/tts';
import type { Lang } from '@nihongo/shared';

interface SettingsState {
  ttsRate: number;
  newLimit: number;
  petals: boolean;
  lang: Lang;
  setTtsRate: (r: number) => void;
  setNewLimit: (n: number) => void;
  setPetals: (b: boolean) => void;
  setLang: (l: Lang) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ttsRate: 0.9,
      newLimit: 20,
      petals: true,
      lang: 'vi',
      setTtsRate: (ttsRate) => {
        setDefaultRate(ttsRate);
        set({ ttsRate });
      },
      setNewLimit: (newLimit) => set({ newLimit: Math.max(5, Math.min(50, Math.round(newLimit))) }),
      setPetals: (petals) => set({ petals }),
      setLang: (lang) => set({ lang }),
    }),
    {
      name: 'ns.settings',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) setDefaultRate(state.ttsRate);
      },
    },
  ),
);
