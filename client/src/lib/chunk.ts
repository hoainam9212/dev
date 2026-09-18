const KIND = (ch: string): string => {
  if (/[一-龯㐀-䶿々]/.test(ch)) return 'k';
  if (/[゠-ヿ]/.test(ch)) return 'K';
  if (/[぀-ゟ]/.test(ch)) return 'h';
  if (/[。、！？!?…]/.test(ch)) return 'p';
  return 'o';
};

/** Split into script runs: kanji / hiragana / katakana / punctuation / other. */
export function tokenize(ja: string): string[] {
  const out: string[] = [];
  let cur = '';
  let kind = '';
  for (const ch of ja) {
    const k = KIND(ch);
    if (cur && k !== kind) {
      out.push(cur);
      cur = '';
    }
    cur += ch;
    kind = k;
  }
  if (cur) out.push(cur);
  return out;
}

const len = (s: string) => [...s].length;
const endsWithPunct = (s: string) => s.length > 0 && KIND([...s][len(s) - 1]!) === 'p';

/**
 * Deterministically split a sentence into at most `parts` chunks for scramble exercises.
 * Punctuation sticks to the preceding text and ends a chunk; joining the chunks reproduces the input.
 */
export function chunkSentence(ja: string, parts = 4): string[] {
  const tokens = tokenize(ja);
  const glued: string[] = [];
  for (const t of tokens) {
    if (glued.length && KIND([...t][0]!) === 'p') glued[glued.length - 1] += t;
    else glued.push(t);
  }
  const n = Math.max(1, Math.min(parts, glued.length));
  if (glued.length <= n) return glued;
  const target = len(ja) / n;
  const limit = target * 1.25;
  const out: string[] = [];
  let cur = '';
  for (const t of glued) {
    if (cur && len(cur) + len(t) > limit) {
      out.push(cur);
      cur = '';
    }
    cur += t;
    if (endsWithPunct(cur)) {
      out.push(cur);
      cur = '';
    }
  }
  if (cur) out.push(cur);
  while (out.length > n) {
    const last = out.pop()!;
    out[out.length - 1] += last;
  }
  return out;
}
