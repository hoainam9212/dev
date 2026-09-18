import { it, expect } from 'vitest';
import { buildKana } from './kana';

it('builds 46 basic + dakuten + yoon rows for both scripts with strokes when available', () => {
  const b = buildKana((ch) =>
    ch === 'あ'
      ? '<path id="kvg:03042-s1" d="M1,1"/><path id="kvg:03042-s2" d="M2,2"/><path id="kvg:03042-s3" d="M3,3"/>'
      : null,
  );
  const basic = b.hiragana.filter((k) => k.group === 'basic');
  expect(basic).toHaveLength(46);
  expect(b.hiragana.filter((k) => k.group === 'dakuten')).toHaveLength(25);
  expect(b.hiragana.filter((k) => k.group === 'yoon')).toHaveLength(33);
  expect(b.katakana).toHaveLength(b.hiragana.length);
  const a = b.hiragana[0]!;
  expect(a).toMatchObject({ kana: 'あ', romaji: 'a', row: 'a', group: 'basic' });
  expect(a.strokePaths).toEqual(['M1,1', 'M2,2', 'M3,3']);
  expect(a.mnemonic).toBeTruthy();
  expect(b.katakana[0]).toMatchObject({ kana: 'ア', romaji: 'a' });
  expect(b.katakana[0]!.mnemonic).toBeTruthy();
});

it('every basic kana has a mnemonic', () => {
  const b = buildKana(() => null);
  for (const list of [b.hiragana, b.katakana]) {
    for (const k of list.filter((x) => x.group === 'basic')) expect(k.mnemonic, k.kana).toBeTruthy();
  }
});
