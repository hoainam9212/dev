import { create } from 'zustand';

export type HelpTab = 'glossary' | 'ask';

interface HelpState {
  open: boolean;
  tab: HelpTab;
  entryId: string | null;
  query: string;
  openGlossary: (entryId?: string | null) => void;
  openAsk: (query?: string) => void;
  close: () => void;
  setTab: (tab: HelpTab) => void;
  setEntry: (entryId: string | null) => void;
  setQuery: (query: string) => void;
}

export const useHelp = create<HelpState>((set) => ({
  open: false,
  tab: 'glossary',
  entryId: null,
  query: '',
  openGlossary: (entryId = null) => set({ open: true, tab: 'glossary', entryId }),
  openAsk: (query = '') => set({ open: true, tab: 'ask', query, entryId: null }),
  close: () => set({ open: false }),
  setTab: (tab) => set({ tab }),
  setEntry: (entryId) => set({ entryId }),
  setQuery: (query) => set({ query }),
}));
