import { useMemo } from 'react';

/**
 * A random seed that changes only when `session` changes. Build quiz questions with `mulberry32(seed)` so a
 * display-language switch rebuilds the same questions in the same order, just translated.
 */
export function useSessionSeed(session: unknown): number {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => Math.floor(Math.random() * 2 ** 32), [session]);
}
