import fs from 'node:fs';
import path from 'node:path';
import { LEVELS, type Grammar, type Kanji, type Level, type Sentence, type Vocab } from '@nihongo/shared';

export type TrType = 'vocab' | 'kanji' | 'grammar' | 'sentences';
export const TR_TYPES: TrType[] = ['vocab', 'kanji', 'grammar', 'sentences'];

export interface VocabEntry { vi: string[]; en: string[] }
export interface KanjiEntry { vi: string[]; hanViet?: string; en: string[] }
export interface GrammarEntry { vi: string; examples: { ja: string; vi: string }[]; en: string }
export interface SentenceEntry { vi: string; en: string }
export interface EntryOf { vocab: VocabEntry; kanji: KanjiEntry; grammar: GrammarEntry; sentences: SentenceEntry }
export interface TrFile<T extends TrType = TrType> { type: T; level: Level; entries: Record<string, EntryOf[T]> }
export interface LoadedFile { path: string; file: TrFile }
export type Overlays = { [T in TrType]: Map<string, EntryOf[T]> };
export interface Sources { vocab: Vocab[]; kanji: Kanji[]; grammar: Grammar[]; sentences: Sentence[] }
export interface ApplyReport { total: number; fromFile: number; fromOpen: number; stale: string[] }

export const vocabKey = (v: Pick<Vocab, 'word' | 'reading'>) => `${v.word}|${v.reading}`;
export const kanjiKey = (k: Pick<Kanji, 'char'>) => k.char;
export const grammarKey = (g: Pick<Grammar, 'level' | 'title'>) => `${g.level}|${g.title}`;
export const sentenceKey = (s: Pick<Sentence, 'id'>) => s.id.replace(/^s-/, '');

/** Every `vi/<level>/*.json` under `dir`, sorted by path. A parse error names the file. */
/** Valid JSON can still be a broken hand edit; fail here so the caller names the file. */
function assertShape(f: unknown): TrFile {
  const o = f as Partial<TrFile> | null;
  if (!o || typeof o !== 'object') throw new Error('not an object');
  if (!TR_TYPES.includes(o.type as TrType)) throw new Error(`unknown type ${String(o.type)}`);
  if (typeof o.level !== 'string') throw new Error('missing level');
  if (!o.entries || typeof o.entries !== 'object') throw new Error('missing entries');
  for (const [key, e] of Object.entries(o.entries as unknown as Record<string, Record<string, unknown>>)) {
    if (!e || typeof e !== 'object' || e.vi === undefined) throw new Error(`entry ${key}: missing vi`);
    if (o.type === 'grammar' && !Array.isArray(e.examples)) throw new Error(`entry ${key}: missing examples`);
  }
  return o as TrFile;
}

export function readTrFiles(dir: string): LoadedFile[] {
  const root = path.join(dir, 'vi');
  if (!fs.existsSync(root)) return [];
  const out: LoadedFile[] = [];
  for (const lv of fs.readdirSync(root).sort()) {
    const d = path.join(root, lv);
    if (!fs.statSync(d).isDirectory()) continue;
    for (const name of fs.readdirSync(d).filter((n) => n.endsWith('.json')).sort()) {
      const rel = `vi/${lv}/${name}`;
      try {
        out.push({ path: rel, file: assertShape(JSON.parse(fs.readFileSync(path.join(d, name), 'utf8'))) });
      } catch (e) {
        throw new Error(`${rel}: ${(e as Error).message}`);
      }
    }
  }
  return out;
}

/** One map per type; a key present in two files is an error (one translation per item). */
export function toOverlays(files: LoadedFile[]): Overlays {
  const o: Overlays = { vocab: new Map(), kanji: new Map(), grammar: new Map(), sentences: new Map() };
  const seen = new Map<string, string>();
  for (const { path: p, file } of files) {
    const map = o[file.type] as Map<string, unknown> | undefined;
    if (!map) throw new Error(`${p}: unknown type ${String(file.type)}`);
    for (const [key, entry] of Object.entries(file.entries)) {
      const id = `${file.type} key ${key}`;
      const prev = seen.get(id);
      if (prev) throw new Error(`duplicate ${id} in ${prev} and ${p}`);
      seen.set(id, p);
      map.set(key, entry);
    }
  }
  return o;
}

/** The built bundles in client/public/content (English sources + whatever open data the last build added). */
export function loadBuiltSources(outDir: string): Sources {
  const read = <T>(rel: string): T[] => JSON.parse(fs.readFileSync(path.join(outDir, rel), 'utf8')) as T[];
  const src: Sources = { vocab: [], kanji: [], grammar: [], sentences: [] };
  for (const l of LEVELS) {
    const lv = l.toLowerCase();
    src.vocab.push(...read<Vocab>(`vocab/${lv}.json`));
    src.kanji.push(...read<Kanji>(`kanji/${lv}.json`));
    src.grammar.push(...read<Grammar>(`grammar/${lv}.json`));
    src.sentences.push(...read<Sentence>(`sentences/${lv}.json`));
  }
  return src;
}

const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);
const report = (total: number): ApplyReport => ({ total, fromFile: 0, fromOpen: 0, stale: [] });

export function applyVocab(items: Vocab[], o: Overlays['vocab']): ApplyReport {
  const r = report(items.length);
  for (const v of items) {
    const e = o.get(vocabKey(v));
    if (!e) continue;
    v.meaningsVi = e.vi;
    r.fromFile++;
    if (!same(e.en, v.meanings)) r.stale.push(vocabKey(v));
  }
  return r;
}

export function applyKanji(
  items: Kanji[],
  o: Overlays['kanji'],
  openHanViet: (ch: string) => string | undefined,
): ApplyReport & { hanVietOpen: number; hanVietFile: number; hanVietMissing: string[] } {
  const r = { ...report(items.length), hanVietOpen: 0, hanVietFile: 0, hanVietMissing: [] as string[] };
  for (const k of items) {
    const e = o.get(kanjiKey(k));
    if (e?.hanViet) {
      k.hanViet = e.hanViet;
      r.hanVietFile++;
    } else {
      const hv = openHanViet(k.char);
      if (hv) {
        k.hanViet = hv;
        r.hanVietOpen++;
      } else r.hanVietMissing.push(k.char);
    }
    if (!e) continue;
    k.meaningsVi = e.vi;
    r.fromFile++;
    if (!same(e.en, k.meanings)) r.stale.push(k.char);
  }
  return r;
}

/** A level whose kanji meanings are all translated ships only with every Hán Việt too (open sources can drift). */
export function hanVietGaps(levelKanji: Kanji[]): string[] {
  if (!levelKanji.length || !levelKanji.every((k) => k.meaningsVi)) return [];
  return levelKanji.filter((k) => !k.hanViet).map((k) => k.char);
}

export function applyGrammar(items: Grammar[], o: Overlays['grammar']): ApplyReport {
  const r = report(items.length);
  for (const g of items) {
    const e = o.get(grammarKey(g));
    if (!e) continue;
    g.meaningVi = e.vi;
    const byJa = new Map(e.examples.map((x) => [x.ja, x.vi]));
    for (const ex of g.examples) {
      const vi = byJa.get(ex.ja);
      if (vi) ex.vi = vi;
    }
    r.fromFile++;
    if (e.en !== g.meaning) r.stale.push(grammarKey(g));
  }
  return r;
}

export function applySentences(items: Sentence[], o: Overlays['sentences'], openVi: Map<number, string>): ApplyReport {
  const r = report(items.length);
  for (const s of items) {
    const key = sentenceKey(s);
    const e = o.get(key);
    if (e) {
      s.vi = e.vi;
      r.fromFile++;
      if (e.en !== s.en) r.stale.push(key);
      continue;
    }
    const open = openVi.get(Number(key));
    if (open) {
      s.vi = open;
      r.fromOpen++;
    }
  }
  return r;
}
