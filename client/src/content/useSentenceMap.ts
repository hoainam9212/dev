import { useMemo } from 'react';
import type { Level, Sentence } from '@nihongo/shared';
import { useSentences } from './loader';

/** Sentences of a level keyed by id (empty map while loading). */
export function useSentenceMap(level: Level): Map<string, Sentence> {
  const { data } = useSentences(level);
  return useMemo(() => new Map((data ?? []).map((s) => [s.id, s])), [data]);
}
