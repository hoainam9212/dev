export type CharState = 'pending' | 'correct' | 'wrong';

export function compareText(target: string, typed: string): CharState[] {
  const t = [...target];
  const y = [...typed];
  return t.map((ch, i) => (i >= y.length ? 'pending' : y[i] === ch ? 'correct' : 'wrong'));
}

export function countCorrect(target: string, typed: string): number {
  return compareText(target, typed).filter((s) => s === 'correct').length;
}

export function wpm(correctChars: number, elapsedMs: number): number {
  if (elapsedMs <= 0) return 0;
  return Math.round(correctChars / 5 / (elapsedMs / 60_000));
}

export function accuracy(correctKeys: number, totalKeys: number): number {
  if (totalKeys === 0) return 100;
  return Math.round((correctKeys / totalKeys) * 100);
}

export type KeyStats = Record<string, { hit: number; miss: number }>;

export function recordKey(stats: KeyStats, key: string, ok: boolean): KeyStats {
  const k = key.toLowerCase();
  const prev = stats[k] ?? { hit: 0, miss: 0 };
  return { ...stats, [k]: ok ? { ...prev, hit: prev.hit + 1 } : { ...prev, miss: prev.miss + 1 } };
}

export function weakestKeys(stats: KeyStats, n = 5, minAttempts = 3): string[] {
  return Object.entries(stats)
    .map(([key, s]) => ({ key, total: s.hit + s.miss, miss: s.miss }))
    .filter((e) => e.total >= minAttempts && e.miss > 0)
    .sort((a, b) => b.miss / b.total - a.miss / a.total || b.miss - a.miss)
    .slice(0, n)
    .map((e) => e.key);
}
