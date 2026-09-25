import fs from 'node:fs';
import path from 'node:path';

const fromCode = (u: string) => String.fromCodePoint(parseInt(u.replace(/^U\+/, ''), 16));

function unihanRows(txt: string): [string, string, string][] {
  const rows: [string, string, string][] = [];
  for (const line of txt.split('\n')) {
    if (!line.startsWith('U+')) continue;
    const [code, field, value] = line.split('\t');
    if (code && field && value) rows.push([fromCode(code), field, value.trim()]);
  }
  return rows;
}

/** One Unihan field (e.g. kMandarin) as character → raw value. */
export function parseUnihanField(txt: string, field: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const [ch, f, value] of unihanRows(txt)) if (f === field) map.set(ch, value);
  return map;
}

/**
 * Shinjitai → old (kyūjitai) forms from Unihan kJapaneseOldVariant. The other variant fields describe Chinese
 * simplification and map Japanese kanji to unrelated characters (叶 → 葉), so they are not read.
 */
export function parseJapaneseOldVariants(txt: string): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const [ch, f, value] of unihanRows(txt)) {
    if (f !== 'kJapaneseOldVariant') continue;
    const found = [...value.matchAll(/U\+([0-9A-F]{4,6})/g)].map((m) => fromCode(m[1]!)).filter((c) => c !== ch);
    if (found.length) out.set(ch, found);
  }
  return out;
}

/** KANJIDIC2 `reading r_type="vietnam"` per Japanese character, NFC (the file has some decomposed accents). */
export function parseKanjidicVietnamese(xml: string): Map<string, string[]> {
  const out = new Map<string, string[]>();
  for (const m of xml.matchAll(/<character>([\s\S]*?)<\/character>/g)) {
    const lit = /<literal>(.*?)<\/literal>/.exec(m[1]!)?.[1];
    const vs = [...m[1]!.matchAll(/<reading r_type="vietnam">(.*?)<\/reading>/g)].map((r) => r[1]!.trim().normalize('NFC'));
    if (lit && vs.length) out.set(lit, [...new Set(vs)]);
  }
  return out;
}

export interface HanVietRow { readings: string[]; pinyin: string }

/** ph0ngp hanviet.csv: `char,['r1'],pinyin` or `char,"['r1', 'r2']",pinyin`, traditional characters only. */
export function parseHanVietCsv(csv: string): Map<string, HanVietRow[]> {
  const out = new Map<string, HanVietRow[]>();
  for (const line of csv.split(/\r?\n/).slice(1)) {
    const m = /^([^,]+),"?(\[.*?\])"?,(.+)$/.exec(line.trim());
    if (!m) continue;
    const readings = [...m[2]!.matchAll(/'([^']+)'/g)].map((r) => r[1]!.trim().normalize('NFC')).filter(Boolean);
    if (!readings.length) continue;
    const rows = out.get(m[1]!) ?? [];
    rows.push({ readings, pinyin: m[3]!.trim() });
    out.set(m[1]!, rows);
  }
  return out;
}

const PINYIN_TONES: Record<string, [string, number]> = {
  ā: ['a', 1], á: ['a', 2], ǎ: ['a', 3], à: ['a', 4], ē: ['e', 1], é: ['e', 2], ě: ['e', 3], è: ['e', 4],
  ī: ['i', 1], í: ['i', 2], ǐ: ['i', 3], ì: ['i', 4], ō: ['o', 1], ó: ['o', 2], ǒ: ['o', 3], ò: ['o', 4],
  ū: ['u', 1], ú: ['u', 2], ǔ: ['u', 3], ù: ['u', 4], ǖ: ['u:', 1], ǘ: ['u:', 2], ǚ: ['u:', 3], ǜ: ['u:', 4], ü: ['u:', 5],
};

/** Unihan tone-marked pinyin → hanviet.csv's numbered form: 'xíng' → 'xing2', 'lǜ' → 'lu:4', 'de' → 'de5'. */
export function pinyinNumbered(p: string): string {
  let tone = 5;
  const base = [...p.normalize('NFC').toLowerCase()].map((c) => {
    const t = PINYIN_TONES[c];
    if (!t) return c;
    if (t[1] < 5) tone = t[1];
    return t[0];
  });
  return base.join('') + tone;
}

const VI_TONE = /[̣̀́̃̉]/g;

/** Comparison key for a Vietnamese syllable that ignores where the tone mark sits ('thuỷ' = 'Thủy'). */
export function toneKey(s: string): string {
  const d = s.normalize('NFD').toLowerCase();
  return d.replace(VI_TONE, '').normalize('NFC') + (d.match(VI_TONE) ?? []).join('');
}

export interface HanVietSources {
  kanjidic: Map<string, string[]>;
  hanviet: Map<string, HanVietRow[]>;
  oldVariants: Map<string, string[]>;
  mandarin: Map<string, string>;
}
export interface HanVietLookup { value?: string; kanjidic: string[]; hanviet: string[] }

/**
 * Hán Việt of a Japanese kanji: `value` only when KANJIDIC2 and hanviet.csv agree on the first reading
 * (spec › Sources and precedence); both candidate lists are always returned for the translator.
 */
export function hanVietFor(ch: string, s: HanVietSources): HanVietLookup {
  const kanjidic = s.kanjidic.get(ch) ?? [];
  // The Japanese old form carries the Japanese sense (芸 → 藝); the character itself only as a fallback.
  const form = [...(s.oldVariants.get(ch) ?? []), ch].find((c) => s.hanviet.has(c));
  let hanviet: string[] = [];
  if (form) {
    const common = s.mandarin.get(form) ?? s.mandarin.get(ch);
    const want = common ? pinyinNumbered(common.split(/\s+/)[0]!) : '';
    const rows = s.hanviet.get(form)!;
    const ordered = [...rows.filter((r) => r.pinyin === want), ...rows.filter((r) => r.pinyin !== want)];
    hanviet = [...new Set(ordered.flatMap((r) => r.readings))];
  }
  if (!kanjidic[0] || !hanviet[0] || toneKey(kanjidic[0]) !== toneKey(hanviet[0])) return { kanjidic, hanviet };
  const spelled = new Map(kanjidic.map((r) => [toneKey(r), r]));
  const agreed = hanviet.map((r) => spelled.get(toneKey(r))).filter((r): r is string => !!r).slice(0, 3);
  return { value: agreed.map((r) => r.toLocaleUpperCase('vi')).join(', '), kanjidic, hanviet };
}

/** Raw files (under data/raw) the Hán Việt lookup reads. */
export const HANVIET_RAW = ['kanjidic2.xml', 'hanviet.csv', 'unihan/Unihan_Variants.txt', 'unihan/Unihan_Readings.txt'];

export function loadHanVietSources(rawDir: string): HanVietSources {
  const read = (f: string) => fs.readFileSync(path.join(rawDir, f), 'utf8');
  return {
    kanjidic: parseKanjidicVietnamese(read('kanjidic2.xml')),
    hanviet: parseHanVietCsv(read('hanviet.csv')),
    oldVariants: parseJapaneseOldVariants(read('unihan/Unihan_Variants.txt')),
    mandarin: parseUnihanField(read('unihan/Unihan_Readings.txt'), 'kMandarin'),
  };
}

/** Japanese Tatoeba id → shortest linked Vietnamese sentence. */
export function tatoebaVietnamese(links: Map<number, number[]>, vie: Map<number, string>): Map<number, string> {
  const out = new Map<number, string>();
  for (const [jpn, targets] of links) {
    const best = targets
      .map((t) => vie.get(t))
      .filter((x): x is string => !!x)
      .sort((a, b) => a.length - b.length)[0];
    if (best) out.set(jpn, best);
  }
  return out;
}
