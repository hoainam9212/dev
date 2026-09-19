// Cross-check furigana in authored reading lessons against the downloaded dictionaries:
// - multi-kanji bases: JLPT vocab list (word → reading)
// - single-kanji bases: KANJIDIC on/kun readings (with okurigana stripped, rendaku and small-tsu variants allowed)
// Prints bases whose reading was not found. Run after `npm run data:fetch`.
import fs from 'node:fs';
import path from 'node:path';
import { LEVELS, parseFurigana, toHiragana } from '@nihongo/shared';
import { RAW_DIR } from './sources';
import { parseVocabCsv, type RawKanji } from '../src/parse';
import { READING } from '../authored/reading';

const vocab = new Map<string, Set<string>>();
for (const l of LEVELS) {
  const p = path.join(RAW_DIR, `vocab/${l.toLowerCase()}.csv`);
  if (!fs.existsSync(p)) continue;
  for (const v of parseVocabCsv(fs.readFileSync(p, 'utf8'), l)) {
    for (const r of v.reading.split(/[;、,]/)) (vocab.get(v.word) ?? vocab.set(v.word, new Set()).get(v.word)!).add(toHiragana(r.trim()));
  }
}
const kanjiRaw = JSON.parse(fs.readFileSync(path.join(RAW_DIR, 'kanji.json'), 'utf8')) as Record<string, RawKanji>;

const DAKU: Record<string, string> = { か: 'が', き: 'ぎ', く: 'ぐ', け: 'げ', こ: 'ご', さ: 'ざ', し: 'じ', す: 'ず', せ: 'ぜ', そ: 'ぞ', た: 'だ', ち: 'ぢ', つ: 'づ', て: 'で', と: 'ど', は: 'ば', ひ: 'び', ふ: 'ぶ', へ: 'べ', ほ: 'ぼ' };
const HANDAKU: Record<string, string> = { は: 'ぱ', ひ: 'ぴ', ふ: 'ぷ', へ: 'ぺ', ほ: 'ぽ' };

function kanjiReadings(ch: string): Set<string> {
  const k = kanjiRaw[ch];
  const out = new Set<string>();
  if (!k) return out;
  const base = [
    ...k.readings_on.map((r) => toHiragana(r)),
    ...k.readings_kun.flatMap((r) => {
      const clean = r.replace(/^-|-$/g, '');
      const [stem, oku] = clean.split('.');
      return oku ? [stem!, stem! + oku] : [stem!];
    }),
  ];
  for (const r of base) {
    out.add(r);
    const first = r[0]!;
    if (DAKU[first]) out.add(DAKU[first] + r.slice(1)); // rendaku
    if (HANDAKU[first]) out.add(HANDAKU[first] + r.slice(1));
    const last = r[r.length - 1]!;
    if ('くきちつ'.includes(last)) out.add(r.slice(0, -1) + 'っ'); // sokuon: 一(いち)→いっ, 学(がく)→がっ
  }
  return out;
}

/** Can `reading` be split into a sequence of known readings of each kanji in `base`? */
function composable(base: string, reading: string): boolean {
  const chars = [...base];
  const memo = new Map<string, boolean>();
  const go = (i: number, pos: number): boolean => {
    const key = `${i}:${pos}`;
    if (memo.has(key)) return memo.get(key)!;
    let ok = false;
    if (i === chars.length) ok = pos === reading.length;
    else if (chars[i] === '々') {
      // repeat mark: reuse any reading of the previous kanji
      for (const r of kanjiReadings(chars[i - 1]!)) if (reading.startsWith(r, pos) && go(i + 1, pos + r.length)) ok = true;
    } else {
      for (const r of kanjiReadings(chars[i]!)) if (r && reading.startsWith(r, pos) && go(i + 1, pos + r.length)) { ok = true; break; }
    }
    memo.set(key, ok);
    return ok;
  };
  return go(0, 0);
}

let checked = 0;
const problems: string[] = [];
for (const lesson of READING) {
  for (const seg of parseFurigana(lesson.body)) {
    if (!seg.ruby) continue;
    checked++;
    const reading = toHiragana(seg.ruby);
    const known = vocab.get(seg.text);
    if (known?.has(reading)) continue;
    if (composable(seg.text, reading)) continue;
    problems.push(`${lesson.id}  [${seg.text}|${seg.ruby}]${known ? `  (từ điển: ${[...known].join('/')})` : ''}`);
  }
}

console.log(`checked ${checked} furigana, ${problems.length} not verified`);
for (const p of [...new Set(problems)]) console.log('  ' + p);
