import { LEVELS, type Grammar, type Kanji, type Level, type Sentence, type Vocab } from '@nihongo/shared';
import type { HanVietLookup } from './opendata';
import { checkTranslations } from './translate-check';
import {
  grammarKey, kanjiKey, sentenceKey, toOverlays, vocabKey, TR_TYPES,
  type LoadedFile, type Overlays, type Sources, type TrFile, type TrType,
} from './translate';

type Item = Vocab | Kanji | Grammar | Sentence;
export interface Batch { writeTo: string; context: Record<string, unknown>; file: TrFile }
export interface SampleRow { type: TrType; key: string; ja: string; en: string; vi: string }

/** `tr status`: coverage per level, where the non-file translations came from, then every stale entry. */
export function statusReport(files: LoadedFile[], src: Sources, o: Overlays, only?: Level): string[] {
  const lines: string[] = [];
  for (const l of LEVELS.filter((x) => !only || x === only)) {
    const parts = TR_TYPES.map((t) => {
      const total = (src[t] as { level: Level }[]).filter((x) => x.level === l).length;
      return `${t} ${total - pendingItems(t, l, src, o).length}/${total}`;
    });
    const tatoeba = src.sentences.filter((s) => s.level === l && s.vi && !o.sentences.has(sentenceKey(s))).length;
    const open = src.kanji.filter((k) => k.level === l && k.hanViet && !o.kanji.get(kanjiKey(k))?.hanViet).length;
    lines.push(`${l} ${parts.join(' · ')} · Tatoeba ${tatoeba} · open Hán Việt ${open}`);
  }
  const { errors, warnings } = checkTranslations(files, src);
  for (const w of warnings.filter((x) => x.msg.startsWith('stale'))) {
    lines.push(`stale ${w.file} ${w.key}: ${w.msg.replace(/^stale: /, '')}`);
  }
  lines.push(`${files.length} files · ${errors.length} errors · ${warnings.length} warnings`);
  return lines;
}

/** Items of a level still without a translation file entry (sentences: also without a Tatoeba translation). */
export function pendingItems(type: TrType, level: Level, src: Sources, o: Overlays): Item[] {
  switch (type) {
    case 'vocab':
      return src.vocab.filter((v) => v.level === level && !o.vocab.has(vocabKey(v)));
    case 'kanji':
      return src.kanji.filter((k) => k.level === level && !o.kanji.has(kanjiKey(k)));
    case 'grammar':
      return src.grammar.filter((g) => g.level === level && !o.grammar.has(grammarKey(g)));
    case 'sentences':
      return src.sentences.filter((s) => s.level === level && !s.vi && !o.sentences.has(sentenceKey(s)));
  }
}

export function nextIndex(existing: string[], type: TrType): number {
  const nums = existing
    .map((p) => p.split('/').pop()!)
    .filter((n) => n.startsWith(`${type}-`))
    .map((n) => Number(n.slice(type.length + 1, -'.json'.length)));
  return (nums.length ? Math.max(...nums) : 0) + 1;
}

export function makeBatch(
  type: TrType, level: Level, items: Item[], index: number,
  sentencesById?: Map<string, Sentence>, hanVietHint?: (ch: string) => HanVietLookup,
): Batch {
  const entries: Record<string, unknown> = {};
  const context: Record<string, unknown> = {};
  for (const item of items) {
    if (type === 'vocab') {
      const v = item as Vocab;
      const ex = v.sentenceIds.map((id) => sentencesById?.get(id)).find(Boolean);
      entries[vocabKey(v)] = { vi: [], en: v.meanings };
      context[vocabKey(v)] = { reading: v.reading, ...(ex ? { example: { ja: ex.ja, en: ex.en } } : {}) };
    } else if (type === 'kanji') {
      const k = item as Kanji;
      entries[kanjiKey(k)] = { vi: [], ...(k.hanViet ? {} : { hanViet: '' }), en: k.meanings };
      // Agreed open value to review, or both sources' candidates when they disagree (spec › Sources and precedence).
      const hint = k.hanViet ? undefined : hanVietHint?.(k.char);
      context[kanjiKey(k)] = {
        on: k.on, kun: k.kun,
        ...(k.hanViet ? { hanVietOpen: k.hanViet } : {}),
        ...(hint ? { hanVietCandidates: { kanjidic: hint.kanjidic, hanviet: hint.hanviet } } : {}),
      };
    } else if (type === 'grammar') {
      const g = item as Grammar;
      entries[grammarKey(g)] = { vi: '', examples: g.examples.map((e) => ({ ja: e.ja, vi: '' })), en: g.meaning };
      context[grammarKey(g)] = { formation: g.formation, examples: g.examples.map((e) => e.en) };
    } else {
      const s = item as Sentence;
      entries[sentenceKey(s)] = { vi: '', en: s.en };
      context[sentenceKey(s)] = { ja: s.ja };
    }
  }
  return {
    writeTo: `vi/${level.toLowerCase()}/${type}-${String(index).padStart(3, '0')}.json`,
    context,
    file: { type, level, entries } as TrFile,
  };
}

/** Up to n rows, spread evenly across the types present, each with its Japanese for side-by-side review. */
export function sampleEntries(files: LoadedFile[], src: Sources, n: number, rng: () => number = Math.random): SampleRow[] {
  const o = toOverlays(files);
  const vocab = new Map(src.vocab.map((v) => [vocabKey(v), v]));
  const kanji = new Map(src.kanji.map((k) => [kanjiKey(k), k]));
  const grammar = new Map(src.grammar.map((g) => [grammarKey(g), g]));
  const sentences = new Map(src.sentences.map((s) => [sentenceKey(s), s]));
  const rows: Record<TrType, SampleRow[]> = { vocab: [], kanji: [], grammar: [], sentences: [] };
  for (const [key, e] of o.vocab) { const v = vocab.get(key); rows.vocab.push({ type: 'vocab', key, ja: v ? `${v.word}（${v.reading}）` : key, en: e.en.join(', '), vi: e.vi.join(', ') }); }
  for (const [key, e] of o.kanji) rows.kanji.push({ type: 'kanji', key, ja: `${key} ${e.hanViet ?? kanji.get(key)?.hanViet ?? ''}`.trim(), en: e.en.join(', '), vi: e.vi.join(', ') });
  for (const [key, e] of o.grammar) rows.grammar.push({ type: 'grammar', key, ja: `${grammar.get(key)?.title ?? key} · ${e.examples[0]?.ja ?? ''}`, en: e.en, vi: `${e.vi} · ${e.examples[0]?.vi ?? ''}` });
  for (const [key, e] of o.sentences) rows.sentences.push({ type: 'sentences', key, ja: sentences.get(key)?.ja ?? key, en: e.en, vi: e.vi });
  const present = (Object.keys(rows) as TrType[]).filter((t) => rows[t].length);
  const per = Math.ceil(n / Math.max(present.length, 1));
  const out: SampleRow[] = [];
  for (const t of present) {
    const pool = [...rows[t]];
    for (let i = 0; i < per && pool.length; i++) out.push(pool.splice(Math.floor(rng() * pool.length), 1)[0]!);
  }
  return out.slice(0, n);
}
