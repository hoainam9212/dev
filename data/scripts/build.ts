import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { LEVELS, type ContentIndex, type Sentence } from '@nihongo/shared';
import { RAW_DIR, OUT_DIR, TRANSLATIONS_DIR } from './sources';
import { HANVIET_RAW, loadHanVietSources, hanVietFor, tatoebaVietnamese } from '../src/opendata';
import { readTrFiles, toOverlays, applyVocab, applyKanji, applyGrammar, applySentences, vocabKey, grammarKey } from '../src/translate';
import {
  parseVocabCsv,
  dedupeVocab,
  parseKanjiJson,
  parseGrammarCsv,
  extractStrokes,
  extractStrokeNumbers,
  kanjivgFilename,
  parseTsvSentences,
  parseLinks,
  assignSentences,
  attachVocabToKanji,
  type RawKanji,
} from '../src/parse';
import { buildKana } from '../src/kana';
import { READING } from '../authored/reading';
import { LISTENING } from '../authored/listening';
import { BUSINESS } from '../authored/business';

const read = (p: string) => fs.readFileSync(path.join(RAW_DIR, p), 'utf8');
const readSvg = (ch: string): string | null => {
  const p = path.join(RAW_DIR, 'kanjivg', 'kanji', kanjivgFilename(ch));
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null;
};
function write(rel: string, data: unknown) {
  const p = path.join(OUT_DIR, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data));
}
function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error('BUILD FAILED:', msg);
    process.exit(1);
  }
}

async function loadEnglish(needed: Set<number>): Promise<Map<number, string>> {
  const map = new Map<number, string>();
  const rl = readline.createInterface({
    input: fs.createReadStream(path.join(RAW_DIR, 'tatoeba/eng_sentences.tsv')),
  });
  for await (const line of rl) {
    const tab = line.indexOf('\t');
    const id = Number(line.slice(0, tab));
    if (needed.has(id)) map.set(id, line.slice(line.lastIndexOf('\t') + 1).trim());
  }
  return map;
}

async function main() {
  const t0 = Date.now();
  const vocab = dedupeVocab(LEVELS.flatMap((l) => parseVocabCsv(read(`vocab/${l.toLowerCase()}.csv`), l)));
  const kanji = parseKanjiJson(JSON.parse(read('kanji.json')) as Record<string, RawKanji>);
  for (const k of kanji) {
    const svg = readSvg(k.char);
    k.strokePaths = svg ? extractStrokes(svg) : [];
    if (svg && k.strokePaths.length) k.strokeNumbers = extractStrokeNumbers(svg);
  }
  attachVocabToKanji(kanji, vocab);
  const grammar = parseGrammarCsv(read('grammar.csv'));

  const jpn = parseTsvSentences(read('tatoeba/jpn_sentences.tsv'));
  const links = parseLinks(read('tatoeba/jpn-eng_links.tsv'));
  const needed = new Set<number>();
  for (const [id, targets] of links) if (jpn.has(id)) targets.forEach((t) => needed.add(t));
  const eng = await loadEnglish(needed);
  const pool: Sentence[] = [];
  for (const [id, ja] of jpn) {
    if ([...ja].length > 40) continue;
    const en = (links.get(id) ?? [])
      .map((t) => eng.get(t))
      .filter((x): x is string => !!x)
      .sort((a, b) => a.length - b.length)[0];
    if (!en) continue;
    pool.push({ id: `s-${id}`, level: 'N5', ja, en });
  }
  pool.sort((a, b) => a.id.localeCompare(b.id));
  console.log('sentence pool', pool.length, 'in', Date.now() - t0, 'ms');
  assignSentences(vocab, pool);
  console.log('sentences assigned in', Date.now() - t0, 'ms');
  const byId = new Map(pool.map((s) => [s.id, s]));

  for (const f of [...HANVIET_RAW, 'tatoeba/vie_sentences.tsv', 'tatoeba/jpn-vie_links.tsv']) {
    assert(fs.existsSync(path.join(RAW_DIR, f)), `missing raw/${f} — run npm run data:fetch`);
  }
  const dupes = (keys: string[]) => keys.filter((k, i, all) => all.indexOf(k) !== i);
  const seenV = new Set<string>();
  const dupV = vocab.map(vocabKey).filter((k) => (seenV.has(k) ? true : (seenV.add(k), false)));
  assert(dupV.length === 0, `duplicate vocab keys: ${dupV.slice(0, 5).join(', ')}`);
  const dupG = dupes(grammar.map(grammarKey));
  assert(dupG.length === 0, `duplicate grammar keys: ${dupG.slice(0, 5).join(', ')}`);

  const overlays = toOverlays(readTrFiles(TRANSLATIONS_DIR));
  const hanVietSources = loadHanVietSources(RAW_DIR);
  const vieByJpn = tatoebaVietnamese(parseLinks(read('tatoeba/jpn-vie_links.tsv')), parseTsvSentences(read('tatoeba/vie_sentences.tsv')));
  const reports = {
    vocab: applyVocab(vocab, overlays.vocab),
    kanji: applyKanji(kanji, overlays.kanji, (ch) => hanVietFor(ch, hanVietSources).value),
    grammar: applyGrammar(grammar, overlays.grammar),
    sentences: applySentences(pool, overlays.sentences, vieByJpn),
  };
  console.log('vi: hanViet open', reports.kanji.hanVietOpen, '· file', reports.kanji.hanVietFile, '· missing', reports.kanji.hanVietMissing.length,
    '· sentences tatoeba', reports.sentences.fromOpen, '· file', reports.sentences.fromFile);
  for (const [type, r] of Object.entries(reports)) {
    if (r.stale.length) console.warn(`STALE ${type} (${r.stale.length}): ${r.stale.slice(0, 10).join(', ')} — re-translate; see npm run tr -w data -- check`);
  }

  const counts: ContentIndex['counts'] = { vocab: {}, kanji: {}, grammar: {}, sentences: {}, reading: {}, listening: {} };
  for (const l of LEVELS) {
    const lv = l.toLowerCase();
    const v = vocab.filter((x) => x.level === l).sort((a, b) => a.id.localeCompare(b.id));
    const k = kanji.filter((x) => x.level === l);
    const g = grammar.filter((x) => x.level === l);
    const sIds = new Set(v.flatMap((x) => x.sentenceIds));
    const s = [...sIds]
      .map((id) => ({ ...byId.get(id)!, level: l }))
      .sort((a, b) => a.id.localeCompare(b.id));
    write(`vocab/${lv}.json`, v);
    write(`kanji/${lv}.json`, k);
    write(`grammar/${lv}.json`, g);
    write(`sentences/${lv}.json`, s);
    const rd = READING.filter((x) => x.level === l);
    const ls = LISTENING.filter((x) => x.level === l);
    write(`reading/${lv}.json`, rd);
    write(`listening/${lv}.json`, ls);
    counts.reading![l] = rd.length;
    counts.listening![l] = ls.length;
    counts.vocab![l] = v.length;
    counts.kanji![l] = k.length;
    counts.grammar![l] = g.length;
    counts.sentences![l] = s.length;
    console.log(l, { vocab: v.length, kanji: k.length, grammar: g.length, sentences: s.length, reading: rd.length, listening: ls.length });
    const n = <T>(xs: T[], has: (x: T) => unknown) => `${xs.filter(has).length}/${xs.length}`;
    console.log(l, 'vi', {
      vocab: n(v, (x) => x.meaningsVi),
      kanji: n(k, (x) => x.meaningsVi),
      hanViet: n(k, (x) => x.hanViet),
      grammar: n(g, (x) => x.meaningVi),
      examples: n(g.flatMap((x) => x.examples), (x) => x.vi),
      sentences: n(s, (x) => x.vi),
    });
  }
  write('kana.json', buildKana(readSvg));
  write('business/index.json', BUSINESS);
  console.log('business items', BUSINESS.reduce((n, t) => n + t.items.length, 0));
  const index: ContentIndex = { builtAt: new Date().toISOString(), counts };
  write('index.json', index);

  assert((counts.vocab!.N5 ?? 0) >= 600, 'N5 vocab < 600');
  assert(kanji.length >= 2000, 'kanji < 2000');
  assert(grammar.length >= 800, 'grammar < 800');
  const withStrokes = kanji.filter((k) => k.strokePaths.length).length;
  const withSentences = vocab.filter((v) => v.sentenceIds.length).length;
  console.log('kanji with strokes', withStrokes, '/', kanji.length);
  console.log('vocab with sentences', withSentences, '/', vocab.length);
  console.log('wrote', OUT_DIR, 'in', Date.now() - t0, 'ms');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
