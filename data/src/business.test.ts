import { describe, it, expect } from 'vitest';
import { BUSINESS } from '../authored/business';

const KANA_OK = /^[぀-ゟ゠-ヿー・（）\d:〜、。！？!?\s]+$/;

describe('authored business content', () => {
  it('meets minimum counts and has unique ids', () => {
    const byId = Object.fromEntries(BUSINESS.map((t) => [t.id, t.items.length]));
    expect(byId['keigo']).toBeGreaterThanOrEqual(40);
    expect(byId['email']).toBeGreaterThanOrEqual(6);
    for (const k of ['phone', 'meeting', 'meishi', 'interview', 'daily']) expect(byId[k], k).toBeGreaterThanOrEqual(10);
    const ids = BUSINESS.flatMap((t) => t.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });
  it('every item has ja, kana reading and Vietnamese', () => {
    for (const t of BUSINESS)
      for (const i of t.items) {
        expect(i.ja.length, i.id).toBeGreaterThan(0);
        expect(i.vi.length, i.id).toBeGreaterThan(0);
        expect(i.reading, i.id).toMatch(KANA_OK);
        if (t.id === 'keigo') expect(i.keigo?.sonkei, i.id).toBeTruthy();
        if (t.id === 'email') expect(i.note, i.id).toBeTruthy();
      }
  });
});
