import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { nextStreak, todayStr } from './streak';

interface ProgressState {
  xp: number;
  streak: number;
  lastStudyDay: string | null;
  addXp: (n: number, today?: string) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streak: 0,
      lastStudyDay: null,
      addXp: (n, today = todayStr()) => {
        const { xp, streak, lastStudyDay } = get();
        set({ xp: xp + n, streak: nextStreak(lastStudyDay, streak, today), lastStudyDay: today });
      },
    }),
    { name: 'ns.progress', storage: createJSONStorage(() => localStorage) },
  ),
);
