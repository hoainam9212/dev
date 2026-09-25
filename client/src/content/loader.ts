import { useEffect, useState } from 'react';
import type { Grammar, Kanji, KanaBundle, Level, Sentence, Vocab } from '@nihongo/shared';
import { getT } from '../i18n';

const cache = new Map<string, Promise<unknown>>();

export function clearContentCache(): void {
  cache.clear();
}

/** Fetch `/content/<path>` as JSON, cached per path (failed loads are not cached). */
export function loadJson<T>(path: string): Promise<T> {
  let p = cache.get(path);
  if (!p) {
    p = fetch(`/content/${path}`).then(async (r) => {
      if (!r.ok) throw new Error(getT().errors.loadFailed(path, r.status));
      return r.json() as Promise<unknown>;
    });
    cache.set(path, p);
    p.catch(() => cache.delete(path));
  }
  return p as Promise<T>;
}

export interface JsonState<T> {
  data?: T;
  error?: string;
  loading: boolean;
}

export function useJson<T>(path: string | null): JsonState<T> {
  const [state, set] = useState<JsonState<T>>({ loading: !!path });
  useEffect(() => {
    if (!path) return;
    let alive = true;
    set({ loading: true });
    loadJson<T>(path).then(
      (data) => alive && set({ data, loading: false }),
      (e: Error) => alive && set({ error: e.message, loading: false }),
    );
    return () => {
      alive = false;
    };
  }, [path]);
  return state;
}

const lv = (l: Level) => l.toLowerCase();
export const useKana = () => useJson<KanaBundle>('kana.json');
export const useVocab = (level: Level) => useJson<Vocab[]>(`vocab/${lv(level)}.json`);
export const useKanji = (level: Level) => useJson<Kanji[]>(`kanji/${lv(level)}.json`);
export const useSentences = (level: Level) => useJson<Sentence[]>(`sentences/${lv(level)}.json`);
export const useGrammar = (level: Level) => useJson<Grammar[]>(`grammar/${lv(level)}.json`);
