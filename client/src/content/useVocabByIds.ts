import { useEffect, useState } from 'react';
import type { Level, Vocab } from '@nihongo/shared';
import { loadJson } from './loader';

/** `v-n3-0012` → `N3`; returns null for unknown ids. */
export function levelFromVocabId(id: string): Level | null {
  const m = id.match(/^v-(n[1-5])-/);
  return m ? (m[1]!.toUpperCase() as Level) : null;
}

/** Load vocab entries by id, fetching only the level bundles the ids imply. Keeps id order. */
export async function loadVocabByIds(ids: string[]): Promise<Vocab[]> {
  const levels = [...new Set(ids.map(levelFromVocabId).filter((l): l is Level => !!l))];
  const bundles = await Promise.all(levels.map((l) => loadJson<Vocab[]>(`vocab/${l.toLowerCase()}.json`)));
  const byId = new Map<string, Vocab>();
  for (const b of bundles) for (const v of b) byId.set(v.id, v);
  return ids.map((id) => byId.get(id)).filter((v): v is Vocab => !!v);
}

export function useVocabByIds(ids: string[]): { data: Vocab[]; loading: boolean } {
  const key = ids.join(',');
  const [state, set] = useState<{ data: Vocab[]; loading: boolean }>({ data: [], loading: ids.length > 0 });
  useEffect(() => {
    let alive = true;
    if (!key) {
      set({ data: [], loading: false });
      return;
    }
    set((s) => ({ ...s, loading: true }));
    loadVocabByIds(key.split(',')).then(
      (data) => alive && set({ data, loading: false }),
      () => alive && set({ data: [], loading: false }),
    );
    return () => {
      alive = false;
    };
  }, [key]);
  return state;
}
