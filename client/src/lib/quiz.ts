export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** `n` choices including `correct`, distractors unique by `key`, shuffled. */
export function makeChoices<T>(
  correct: T,
  pool: T[],
  n = 4,
  key: (t: T) => string = (t) => String(t),
  rng: () => number = Math.random,
): T[] {
  const seen = new Set([key(correct)]);
  const distractors: T[] = [];
  for (const p of shuffle(pool, rng)) {
    const k = key(p);
    if (seen.has(k)) continue;
    seen.add(k);
    distractors.push(p);
    if (distractors.length >= n - 1) break;
  }
  return shuffle([correct, ...distractors], rng);
}
