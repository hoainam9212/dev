import { describe, it, expect } from 'vitest';
import { BJT_SECTIONS, bjtPartOf, isKana, type BjtItem } from '@nihongo/shared';
import { BJT } from '../authored/bjt';

const SET = /^(demo|w(0[1-9]|1[0-6])|mock[1-3])$/;
const VIETNAMESE = /[ăâđêôơưàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]/i;
const sectionIds = BJT_SECTIONS.map((s) => s.id);
const questionsIn = (items: BjtItem[]) => items.reduce((n, x) => n + x.questions.length, 0);

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
        } else {
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
      if (x.section.startsWith('sogo-')) expect(x.questions.length, `${x.id}: 総合 items ask 2–3 questions`).toBeGreaterThanOrEqual(2);
    }
  });

  it('have well-formed material', () => {
    for (const x of BJT.items) {
      const m = x.material;
      if (!m) continue;
      if (m.kind === 'scene') expect(VIETNAMESE.test(m.vi), x.id).toBe(true);
      if (m.kind === 'text') expect(m.body.length, x.id).toBeGreaterThanOrEqual(40);
      if (m.kind === 'table') for (const r of m.rows) expect(r.length, x.id).toBe(m.head.length);
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
      if (v.example) expect(v.example.ja, `${v.id}: the example should use the word`).toContain(v.ja.replace(/する$/, '').slice(0, 2));
    }
  });
});
