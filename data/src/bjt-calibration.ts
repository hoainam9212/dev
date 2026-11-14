import type { BjtItem, BjtQuestion } from '@nihongo/shared';

// The 2026-11-14 calibration rules (spec, "Hiệu chỉnh theo đề chính thức") as a checker. bjt.test.ts runs it on
// every set listed in the *_CALIBRATED arrays; authors can also run it on their own items while rewriting.

const chars = (s: string) => [...s.replace(/\s/g, '')].length;
const MARKERS = ['【1】', '【2】', '【3】', '【4】'];
/** Choices said or read as sentences, where a too-long right answer gives itself away. */
const SENTENCE_CHOICES = new Set(['bamen', 'hatsugen', 'sogo-chokai', 'sogo-dokkai']);

/** Breaks of the calibration rules, one line each; empty when the items follow them. */
export function calibrationErrors(items: BjtItem[]): string[] {
  const out: string[] = [];
  const range = (id: string, what: string, n: number, lo: number, hi: number) => {
    if (n < lo || n > hi) out.push(`${id}: ${what} ${n} chars, want ${lo}–${hi}`);
  };
  for (const x of items) {
    const script = chars((x.script ?? []).map((l) => l.ja).join(''));
    const m = x.material;
    const text = m?.kind === 'text' ? m.body : m?.kind === 'table' ? [...m.head, ...m.rows.flat(), m.note ?? ''].join('\n') : '';
    if (x.section.startsWith('sogo-') && x.questions.length !== 1) out.push(`${x.id}: one question per 総合 item`);
    switch (x.section) {
      case 'hatsugen':
        range(x.id, 'script', script, 40, 70);
        for (const q of x.questions) for (const c of q.choices) range(q.id, 'choice', chars(c), 12, 25);
        for (const q of x.questions) {
          const mean = q.choices.reduce((n, c) => n + chars(c), 0) / 4;
          if (q.choices.some((c) => Math.abs(chars(c) - mean) > mean * 0.2)) out.push(`${q.id}: choice lengths differ more than ±20%`);
        }
        break;
      case 'sogo-chokai':
        range(x.id, 'script', script, 450, 750);
        break;
      case 'jokyo':
        if (m?.kind !== 'scene') out.push(`${x.id}: jokyo needs a scene (photo), not a ${m?.kind ?? 'missing'} material`);
        range(x.id, 'script', script, 150, 250);
        for (const q of x.questions) {
          const head = [...q.choices[0]!].findIndex((ch, i) => q.choices.some((c) => c[i] !== ch));
          if (head !== -1 && head < 2) out.push(`${x.id}: jokyo choices share no common start`);
        }
        break;
      case 'sogo-chodokkai':
        range(x.id, 'script', script, 400, 750);
        for (const k of MARKERS) if (!text.includes(k)) out.push(`${x.id}: material needs the position mark ${k}`);
        for (const q of x.questions) if (q.choices.some((c) => !MARKERS.some((k) => c.includes(k)))) out.push(`${q.id}: each choice names a position 【1】–【4】`);
        break;
      case 'hyogen': {
        const where = [x.questions[0]?.prompt ?? '', text].find((s) => s.includes('＿＿＿'));
        if (!where) out.push(`${x.id}: hyogen needs a ＿＿＿ blank in the sentence`);
        else range(x.id, 'sentence', chars(where), 25, 80);
        for (const q of x.questions) for (const c of q.choices) range(q.id, 'choice', chars(c), 3, 16);
        break;
      }
      case 'sogo-dokkai':
        range(x.id, 'text', chars(text), 150, 300);
        for (const q of x.questions) if (/内容と合う|内容に合う/.test(q.prompt)) out.push(`${q.id}: ask purpose, task, deadline or figures, not 内容と合う`);
        break;
    }
    if (SENTENCE_CHOICES.has(x.section)) {
      for (const q of x.questions) {
        q.choices.forEach((c, i) => {
          const others = q.choices.filter((_, j) => j !== i).reduce((n, o) => n + chars(o), 0) / 3;
          if (chars(c) >= others * 1.5) out.push(`${x.id}/${q.id}: choice ${i + 1} is 1.5× the others`);
        });
      }
    }
  }
  // the right answer is the single longest choice in at most 30% of a section's questions in one set
  // (sections with 8+ questions in the set; with 5, two would already break it)
  const groups = new Map<string, BjtQuestion[]>();
  for (const x of items) if (SENTENCE_CHOICES.has(x.section)) groups.set(`${x.set} ${x.section}`, [...(groups.get(`${x.set} ${x.section}`) ?? []), ...x.questions]);
  for (const [key, qs] of groups) {
    if (qs.length < 8) continue;
    const longest = qs.filter((q) => {
      const len = q.choices.map(chars);
      const max = Math.max(...len);
      return len[q.answer] === max && len.filter((n) => n === max).length === 1;
    }).length;
    if (longest / qs.length > 0.3) out.push(`${key}: the answer is the longest choice in ${longest}/${qs.length}`);
  }
  return out;
}
