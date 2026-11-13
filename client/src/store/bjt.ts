import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface BjtRunResult {
  at: string;
  correct: number;
  total: number;
  seconds: number;
}

interface BjtState {
  /** Last result per question id: true = answered correctly. */
  answers: Record<string, boolean>;
  /** Timed runs per set id (`demo`, `mock1`…), newest last. */
  runs: Record<string, BjtRunResult[]>;
  /** Day the 16-week plan started, YYYY-MM-DD. */
  startDate: string | null;
  record: (results: Record<string, boolean>) => void;
  saveRun: (set: string, r: BjtRunResult) => void;
  setStartDate: (d: string | null) => void;
}

export const useBjt = create<BjtState>()(
  persist(
    (set) => ({
      answers: {},
      runs: {},
      startDate: null,
      record: (results) => set((s) => ({ answers: { ...s.answers, ...results } })),
      saveRun: (id, r) => set((s) => ({ runs: { ...s.runs, [id]: [...(s.runs[id] ?? []), r].slice(-10) } })),
      setStartDate: (startDate) => set({ startDate }),
    }),
    { name: 'ns.bjt', storage: createJSONStorage(() => localStorage) },
  ),
);
