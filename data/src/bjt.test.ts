import { describe, it, expect } from 'vitest';
import { BJT_SECTIONS, bjtPartOf, isKana, type BjtItem, type BjtQuestion } from '@nihongo/shared';
import { BJT } from '../authored/bjt';
import { CHOKAI_CALIBRATED } from '../authored/bjt/chokai';
import { CHODOKKAI_CALIBRATED } from '../authored/bjt/chodokkai';
import { DOKKAI_CALIBRATED } from '../authored/bjt/dokkai';

const SET = /^(demo|w(0[1-9]|1[0-6])|mock[1-3])$/;
const VIETNAMESE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
const sectionIds = BJT_SECTIONS.map((s) => s.id);
/**
 * What was rewritten to the 2026-11-14 calibration rules; each part's file lists its own entries, either a
 * whole set (`mock1`: every section of that part) or one section of a set (`w03/jokyo`).
 */
const calibrated = new Set([
  ...CHOKAI_CALIBRATED.map((s) => `chokai|${s}`),
  ...CHODOKKAI_CALIBRATED.map((s) => `chodokkai|${s}`),
  ...DOKKAI_CALIBRATED.map((s) => `dokkai|${s}`),
]);
const isCalibratedSet = (x: BjtItem) => {
  const part = bjtPartOf(x.section);
  return calibrated.has(`${part}|${x.set}`) || calibrated.has(`${part}|${x.set}/${x.section}`);
};
const questionsIn =(items: BjtItem[]) => items.reduce((n, x) => n + x.questions.length, 0);

describe('BJT plan and guides', () => {
  it('has 16 consecutive weeks and a guide for each of the nine sections', () => {
    expect(BJT.weeks.map((w) => w.week)).toEqual(Array.from({ length: 16 }, (_, i) => i + 1));
    expect(BJT.guides.map((g) => g.section)).toEqual(sectionIds);
    for (const w of BJT.weeks) {
      expect(w.tasks.length, `week ${w.week}`).toBeGreaterThanOrEqual(2);
      for (const f of w.focus) expect(sectionIds, `week ${w.week}`).toContain(f);
    }
    expect(BJT.weeks.filter((w) => w.mock).map((w) => w.mock)).toEqual(['mock1', 'mock2', 'mock3']);
  });
});

describe('BJT items', () => {
  it('have unique ids that match their set and section', () => {
    const ids = BJT.items.map((x) => x.id);
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dup).toEqual([]);
    const qids = BJT.items.flatMap((x) => x.questions.map((q) => q.id));
    expect(new Set(qids).size).toBe(qids.length);
    for (const x of BJT.items) {
      expect(x.set, x.id).toMatch(SET);
      expect(sectionIds, x.id).toContain(x.section);
      expect(x.id.startsWith(`bjt-${x.set}-${x.section}-`), x.id).toBe(true);
    }
  });

  it('have four distinct choices, a valid answer and a Vietnamese explanation', () => {
    for (const x of BJT.items) {
      expect(x.questions.length, x.id).toBeGreaterThanOrEqual(1);
      for (const q of x.questions) {
        expect(q.choices.length, q.id).toBe(4);
        expect(new Set(q.choices).size, q.id).toBe(4);
        expect(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 4, q.id).toBe(true);
        expect(q.prompt.trim().length, q.id).toBeGreaterThan(0);
        expect(q.explain.length, q.id).toBeGreaterThanOrEqual(30);
        expect(VIETNAMESE.test(q.explain), `${q.id} explanation must be Vietnamese`).toBe(true);
      }
    }
  });

  it('carry what their part needs: a recording for 聴解/聴読解, material for 聴読解 and the reading passages', () => {
    for (const x of BJT.items) {
      const part = bjtPartOf(x.section);
      if (part === 'dokkai') {
        expect(x.script, `${x.id}: reading items have no recording`).toBeUndefined();
        expect(x.spokenChoices, x.id).toBeUndefined();
        if (x.section === 'goi') {
          expect(x.questions.length, `${x.id}: one blank per 語彙・文法 item`).toBe(1);
          expect(x.questions[0]!.prompt, `${x.id}: mark the blank with ＿＿＿`).toContain('＿＿＿');
        } else if (!(x.section === 'hyogen' && isCalibratedSet(x))) {
          // a calibrated 表現読解 item may carry its short sentence in the prompt alone
          expect(x.material?.kind, `${x.id}: needs a text to read`).toBe('text');
        }
      } else {
        expect(x.script?.length ?? 0, `${x.id}: needs a recording`).toBeGreaterThanOrEqual(1);
        for (const l of x.script!) {
          expect(l.ja.trim().length, x.id).toBeGreaterThan(0);
          expect(VIETNAMESE.test(l.vi), `${x.id}: line needs a Vietnamese translation`).toBe(true);
        }
        if (part === 'chodokkai') expect(x.material, `${x.id}: needs material to look at`).toBeDefined();
      }
      if (x.section === 'bamen') expect(x.material?.kind, `${x.id}: describe the photo`).toBe('scene');
      if (x.section === 'bamen' || x.section === 'hatsugen') {
        expect(x.spokenChoices, `${x.id}: choices are heard in this section`).toBe(true);
        expect(x.questions.length, x.id).toBe(1);
      }
      // old frame only; calibrated sets ask one question per 総合 item (checked below)
      if (x.section.startsWith('sogo-') && !isCalibratedSet(x)) expect(x.questions.length, `${x.id}: 総合 items ask 2–3 questions`).toBeGreaterThanOrEqual(2);
    }
  });

  it('have well-formed material', () => {
    for (const x of BJT.items) {
      const m = x.material;
      if (!m) continue;
      if (m.kind === 'scene') expect(VIETNAMESE.test(m.vi), x.id).toBe(true);
      if (m.kind === 'text') expect(m.body.length, x.id).toBeGreaterThanOrEqual(40);
      // head: [] is a plain grid (floor plan, map); its rows still line up
      if (m.kind === 'table') for (const r of m.rows) expect(r.length, x.id).toBe(m.head.length || m.rows[0]!.length);
      if (m.kind === 'bars') {
        expect(m.series.length, x.id).toBeGreaterThanOrEqual(1);
        for (const s of m.series) expect(s.values.length, x.id).toBe(m.labels.length);
      }
    }
  });

  it('give key expressions with a kana reading', () => {
    for (const x of BJT.items) {
      for (const p of x.points ?? []) {
        expect(isKana(p.reading), `${x.id}: ${p.ja} reading "${p.reading}"`).toBe(true);
        expect(p.vi.length, `${x.id}: ${p.ja}`).toBeGreaterThan(0);
      }
    }
  });

  it('demo set has exactly one item per section, in exam order', () => {
    expect(BJT.items.filter((x) => x.set === 'demo').map((x) => x.section)).toEqual(sectionIds);
  });

  it('a full test, once written, has the real number of questions per section', () => {
    for (const set of ['mock1', 'mock2', 'mock3']) {
      const items = BJT.items.filter((x) => x.set === set);
      if (!items.length) continue;
      for (const s of BJT_SECTIONS) {
        const n = questionsIn(items.filter((x) => x.section === s.id));
        // a part may be merged before the other two; a section that is present must be complete
        if (n) expect(n, `${set} ${s.ja}`).toBe(s.count);
      }
    }
  });

  it('spreads answers: no position holds more than 40% of the answers in a set of 20+ questions', () => {
    const bySet = new Map<string, number[]>();
    for (const x of BJT.items) for (const q of x.questions) bySet.set(x.set, [...(bySet.get(x.set) ?? []), q.answer]);
    for (const [set, answers] of bySet) {
      if (answers.length < 20) continue;
      for (let i = 0; i < 4; i++) {
        expect(answers.filter((a) => a === i).length / answers.length, `${set}: answer position ${i + 1}`).toBeLessThanOrEqual(0.4);
      }
    }
  });
});

describe('BJT calibration rules (spec, 2026-11-14) for rewritten sets', () => {
  const isCalibrated = isCalibratedSet;

  it('lists only sets (or set/section pairs) that exist in that part', () => {
    for (const key of calibrated) {
      const [part, entry] = key.split('|') as [string, string];
      const [set, section] = entry.split('/');
      const found = BJT.items.some((x) => x.set === set && bjtPartOf(x.section) === part && (!section || x.section === section));
      expect(found, key).toBe(true);
    }
  });

  it('rewritten sets follow the frame, length and choice rules', () => {
    expect(calibrationErrors(BJT.items.filter(isCalibrated))).toEqual([]);
  });

  it('the checker catches the old frame (a hand-made bad set)', () => {
    const q = (choices: string[], answer = 0): BjtQuestion => ({ id: `q${choices[0]}`, prompt: '？', choices, answer, explain: 'x' });
    const bad: BjtItem[] = [
      { id: 'a', section: 'jokyo', set: 'w01', script: [{ speaker: 'A', ja: '短い', vi: 'ngắn' }], material: { kind: 'table', head: ['x'], rows: [['1']] }, questions: [q(['新製品の値段', '会議の場所', '出張の日程', '来客の予定'])] },
      { id: 'b', section: 'sogo-chokai', set: 'w01', script: [{ speaker: 'A', ja: 'あ'.repeat(200), vi: 'v' }], questions: [q(['長い長い長い長い長い長い答え', '短い', '短め', '短く']), q(['a1', 'b1', 'c1', 'd1'])] },
      { id: 'c', section: 'hyogen', set: 'w01', material: { kind: 'text', body: 'お世話になっております。'.repeat(10) }, questions: [q(['内容と合うもの', 'b2', 'c2', 'd2'])] },
    ];
    const errors = calibrationErrors(bad).join('\n');
    expect(errors).toMatch(/a: jokyo needs a scene/);
    expect(errors).toMatch(/a: jokyo choices share no common start/);
    expect(errors).toMatch(/a: script 2 chars, want 150–250/);
    expect(errors).toMatch(/b: one question per 総合 item/);
    expect(errors).toMatch(/b: script 200 chars, want 450–750/);
    expect(errors).toMatch(/b\/q長い長い長い長い長い長い答え: choice 1 is 1\.5× the others/);
    expect(errors).toMatch(/c: hyogen needs a ＿＿＿ blank/);
  });
});

describe('BJT vocabulary', () => {
  it('has unique ids, a week in 1–16, a kana reading and a Vietnamese meaning', () => {
    const ids = BJT.vocab.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    const seen = new Set<string>();
    for (const v of BJT.vocab) {
      expect(v.week >= 1 && v.week <= 16, v.id).toBe(true);
      expect(isKana(v.reading), `${v.id}: ${v.ja} reading "${v.reading}"`).toBe(true);
      expect(v.vi.length, v.id).toBeGreaterThan(0);
      expect(v.tag.length, v.id).toBeGreaterThan(0);
      expect(seen.has(v.ja), `${v.id}: ${v.ja} appears twice`).toBe(false);
      seen.add(v.ja);
      if (v.example) expect(v.example.ja, `${v.id}: the example should use the word`).toContain(wordStem(v.ja));
    }
  });

  it('wordStem keeps the kanji part, so a conjugated verb in the example still matches', () => {
    expect(wordStem('参る')).toBe('参');
    expect(wordStem('承る')).toBe('承');
    expect(wordStem('検討する')).toBe('検討');
    expect(wordStem('申し上げる')).toBe('申し');
    expect(wordStem('おっしゃる')).toBe('おっ');
    expect(wordStem('CC')).toBe('CC');
  });
});

const chars = (s: string) => [...s.replace(/\s/g, '')].length;
const MARKERS = ['【1】', '【2】', '【3】', '【4】'];
/** Choices said or read as sentences, where a too-long right answer gives itself away. */
const SENTENCE_CHOICES = new Set(['bamen', 'hatsugen', 'sogo-chokai', 'sogo-dokkai']);

/** Breaks of the 2026-11-14 calibration rules (spec), one line each; empty when the items follow them. */
function calibrationErrors(items: BjtItem[]): string[] {
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

/** First two characters of the word without する and without trailing okurigana (all-kana words keep theirs). */
function wordStem(ja: string): string {
  const base = ja.replace(/する$/, '');
  const kanji = base.replace(/[ぁ-ゖ]+$/, '');
  return (kanji || base).slice(0, 2);
}
