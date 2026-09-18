import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { setDefaultRate } from '../lib/tts';

interface SettingsState {
  ttsRate: number;
  newLimit: number;
  petals: boolean;
  setTtsRate: (r: number) => void;
  setNewLimit: (n: number) => void;
  setPetals: (b: boolean) => void;
}

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ttsRate: 0.9,
      newLimit: 20,
      petals: true,
      setTtsRate: (ttsRate) => {
        setDefaultRate(ttsRate);
        set({ ttsRate });
      },
      setNewLimit: (newLimit) => set({ newLimit: Math.max(5, Math.min(50, Math.round(newLimit))) }),
      setPetals: (petals) => set({ petals }),
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
