import { describe, it, expect } from 'vitest';
import { LEVELS, isKana, parseFurigana, stripFurigana } from '@nihongo/shared';
import { READING } from '../authored/reading';
import { LISTENING } from '../authored/listening';

describe('authored reading lessons', () => {
  it('has at least 3 lessons per level with unique ids', () => {
    for (const l of LEVELS) expect(READING.filter((r) => r.level === l).length, l).toBeGreaterThanOrEqual(3);
    expect(new Set(READING.map((r) => r.id)).size).toBe(READING.length);
  });
  it('questions have 4 choices and a valid answer; furigana markup is well-formed', () => {
    for (const r of READING) {
      expect(r.questions.length, r.id).toBeGreaterThanOrEqual(2);
      for (const q of r.questions) {
        expect(q.choices.length, q.id).toBe(4);
        expect(q.answer).toBeGreaterThanOrEqual(0);
        expect(q.answer).toBeLessThan(4);
      }
      const segs = parseFurigana(r.body);
      expect(segs.some((s) => s.ruby), r.id).toBe(true);
      expect(stripFurigana(r.body)).not.toMatch(/[[\]|]/);
      for (const v of r.vocab) expect(stripFurigana(r.body), `${r.id} vocab ${v.word}`).toContain([...v.word][0]!);
    }
  });
});

describe('authored listening lessons', () => {
  it('has at least 3 lessons per level, kana-only dictation and valid questions', () => {
    for (const l of LEVELS) expect(LISTENING.filter((r) => r.level === l).length, l).toBeGreaterThanOrEqual(3);
    expect(new Set(LISTENING.map((r) => r.id)).size).toBe(LISTENING.length);
    for (const s of LISTENING) {
      expect(s.script.length).toBeGreaterThanOrEqual(4);
      for (const line of s.script) expect(line.vi.length, s.id).toBeGreaterThan(0);
      expect(s.dictation.length).toBeGreaterThanOrEqual(2);
      for (const d of s.dictation) expect(isKana(d), `${s.id}: ${d}`).toBe(true);
      for (const q of s.questions) {
        expect(q.choices.length).toBe(4);
        expect(q.answer).toBeLessThan(4);
      }
    }
  });
});

describe('reading lessons – coverage and furigana quality', () => {
  const KANJI = /[一-龯㐀-䶿々]/;
  const KANA_ONLY = /^[぀-ゟ゠-ヿー]+$/;

  it('N2 and N1 have at least 12 lessons each, and every lesson has a topic', () => {
    for (const l of ['N2', 'N1'] as const) expect(READING.filter((r) => r.level === l).length, l).toBeGreaterThanOrEqual(12);
    for (const r of READING) expect(r.topic, r.id).toBeTruthy();
  });

  it('N2/N1 lessons cover at least 8 distinct topics per level', () => {
    for (const l of ['N2', 'N1'] as const) {
      const topics = new Set(READING.filter((r) => r.level === l).map((r) => r.topic));
      expect(topics.size, l).toBeGreaterThanOrEqual(8);
    }
  });

  it('every kanji in a lesson body is inside furigana markup, and rubies are kana', () => {
    for (const r of READING) {
      for (const seg of parseFurigana(r.body)) {
        if (seg.ruby) {
          expect(seg.ruby, `${r.id} [${seg.text}|${seg.ruby}]`).toMatch(KANA_ONLY);
          expect(KANJI.test(seg.text), `${r.id} ruby base without kanji: ${seg.text}`).toBe(true);
        } else {
          const bare = [...seg.text].filter((c) => KANJI.test(c)).join('');
          expect(bare, `${r.id} kanji without furigana in: ${seg.text.slice(0, 30)}`).toBe('');
        }
      }
    }
  });

  it('new N2/N1 questions explain at least one answer per lesson', () => {
    for (const r of READING.filter((x) => (x.level === 'N2' || x.level === 'N1') && Number(x.id.slice(-2)) >= 4)) {
      expect(r.questions.some((q) => q.explain), r.id).toBe(true);
      expect(r.questions.length, r.id).toBeGreaterThanOrEqual(3);
    }
  });
});
