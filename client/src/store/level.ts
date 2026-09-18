import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Level } from '@nihongo/shared';

interface LevelState {
  level: Level;
  setLevel: (l: Level) => void;
}

export const useLevel = create<LevelState>()(
  persist((set) => ({ level: 'N5', setLevel: (level) => set({ level }) }), {
    name: 'ns.level',
    storage: createJSONStorage(() => localStorage),
  }),
);
