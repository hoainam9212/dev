import { describe, it, expect } from 'vitest';
import { topicKind } from '@nihongo/shared';
import { BUSINESS } from '../authored/business';

// kana, katakana, prolonged mark, digits and the punctuation used in subjects/sentences
const KANA_OK = /^[぀-ゟ゠-ヿー・（）\d:〜、。！？!?\s【】「」]+$/;
const HAS_KANJI_OR_LATIN = /[一-龯A-Za-z]/;

const byId = (id: string) => BUSINESS.find((t) => t.id === id)!;

describe('authored business content – basic', () => {
  it('meets minimum counts', () => {
    expect(byId('keigo').items.length).toBeGreaterThanOrEqual(40);
    expect(byId('email').items.length).toBeGreaterThanOrEqual(6);
    for (const k of ['phone', 'meeting', 'meishi', 'interview', 'daily']) expect(byId(k).items.length, k).toBeGreaterThanOrEqual(10);
  });
});

describe('authored business content – IT / BrSE', () => {
  const it_ = BUSINESS.filter((t) => t.group === 'it');

  it('has glossary, scenarios, rephrase, email and at least 9 phrase topics', () => {
    const kinds = it_.map((t) => topicKind(t));
    expect(kinds).toContain('glossary');
    expect(kinds).toContain('scenarios');
    expect(kinds).toContain('rephrase');
    expect(kinds).toContain('email');
    expect(kinds.filter((k) => k === 'phrases').length).toBeGreaterThanOrEqual(9);
  });

  it('glossary has ≥ 80 terms, each with an example sentence', () => {
    const g = byId('it-glossary');
    expect(g.items.length).toBeGreaterThanOrEqual(80);
    for (const i of g.items) {
      expect(i.example?.ja, i.id).toBeTruthy();
      expect(i.example?.vi, i.id).toBeTruthy();
    }
    const words = g.items.map((i) => i.ja);
    expect(new Set(words).size, 'duplicate glossary terms').toBe(words.length);
  });

  it('each IT phrase topic has ≥ 12 phrases; rephrase ≥ 15 with NG; emails ≥ 8 with a body', () => {
    for (const t of it_.filter((t) => topicKind(t) === 'phrases')) expect(t.items.length, t.id).toBeGreaterThanOrEqual(12);
    const r = byId('it-rephrase');
    expect(r.items.length).toBeGreaterThanOrEqual(15);
    for (const i of r.items) expect(i.ng, i.id).toBeTruthy();
    const e = byId('it-email');
    expect(e.items.length).toBeGreaterThanOrEqual(8);
    for (const i of e.items) expect(i.note!.length, i.id).toBeGreaterThan(80);
  });

  it('has ≥ 12 scenarios with learner lines, the other side and takeaways', () => {
    const s = byId('it-scenarios').scenarios!;
    expect(s.length).toBeGreaterThanOrEqual(12);
    expect(new Set(s.map((x) => x.id)).size).toBe(s.length);
    for (const x of s) {
      expect(x.lines.length, x.id).toBeGreaterThanOrEqual(6);
      expect(x.lines.filter((l) => l.me).length, x.id).toBeGreaterThanOrEqual(3);
      expect(x.lines.filter((l) => !l.me).length, x.id).toBeGreaterThanOrEqual(2);
      expect(x.points.length, x.id).toBeGreaterThanOrEqual(2);
      for (const l of x.lines) expect(l.vi.length, x.id).toBeGreaterThan(0);
    }
  });
});

describe('authored business content – all items', () => {
  it('unique ids, Japanese + Vietnamese present, readings are kana only', () => {
    const items = BUSINESS.flatMap((t) => t.items);
    const ids = items.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const i of items) {
      expect(i.ja.length, i.id).toBeGreaterThan(0);
      expect(i.vi.length, i.id).toBeGreaterThan(0);
      expect(i.reading, `${i.id} ${i.reading}`).toMatch(KANA_OK);
      expect(HAS_KANJI_OR_LATIN.test(i.reading), i.id).toBe(false);
      if (i.category === 'keigo') expect(i.keigo?.sonkei, i.id).toBeTruthy();
    }
  });
});
