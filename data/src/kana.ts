import { toKatakana, type KanaBundle, type KanaChar } from '@nihongo/shared';
import { BASIC, DAKUTEN, YOON, MNEMONIC_HIRAGANA, MNEMONIC_KATAKANA, type KanaRow } from '../authored/kana';
import { extractStrokes } from './parse';

type ReadSvg = (ch: string) => string | null;

function expand(rows: KanaRow[], group: KanaChar['group'], katakana: boolean, readSvg: ReadSvg): KanaChar[] {
  const out: KanaChar[] = [];
  for (const r of rows)
    for (const [h, romaji] of r.items) {
      const kana = katakana ? toKatakana(h) : h;
      const strokePaths = [...kana].flatMap((ch) => {
        const svg = readSvg(ch);
        return svg ? extractStrokes(svg) : [];
      });
      const mn = (katakana ? MNEMONIC_KATAKANA : MNEMONIC_HIRAGANA)[kana];
      const item: KanaChar = { kana, romaji, row: r.row, group, strokePaths };
      if (mn) item.mnemonic = mn;
      out.push(item);
    }
  return out;
}

export function buildKana(readSvg: ReadSvg): KanaBundle {
  const build = (kk: boolean) => [
    ...expand(BASIC, 'basic', kk, readSvg),
    ...expand(DAKUTEN, 'dakuten', kk, readSvg),
    ...expand(YOON, 'yoon', kk, readSvg),
  ];
  return { hiragana: build(false), katakana: build(true) };
}
