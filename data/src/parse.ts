import {
  LEVELS,
  hasKanji,
  placeStrokeNumbers,
  strokeStart,
  type Grammar,
  type Kanji,
  type LabelPos,
  type Level,
  type Vocab,
} from '@nihongo/shared';

/** RFC 4180 CSV parser (quotes, escaped quotes, embedded commas/newlines). Skips empty rows. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQ = false;
  const endRow = () => {
    row.push(field);
    field = '';
    if (row.some((f) => f !== '')) rows.push(row);
    row = [];
  };
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQ = false;
      } else field += c;
    } else if (c === '"') inQ = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      endRow();
    } else field += c;
  }
  if (field !== '' || row.length) endRow();
  return rows;
}

/** Split "a, b (x, y), c" → ["a", "b (x, y)", "c"]. */
export function splitMeanings(s: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let cur = '';
  for (const c of s) {
    if (c === '(') depth++;
    if (c === ')') depth = Math.max(0, depth - 1);
    if (c === ',' && depth === 0) {
      out.push(cur.trim());
      cur = '';
    } else cur += c;
  }
  if (cur.trim()) out.push(cur.trim());
  return out.filter(Boolean);
}

export function levelRank(level: Level): number {
  return LEVELS.indexOf(level);
}

const pad = (n: number) => String(n).padStart(4, '0');

export function parseVocabCsv(text: string, level: Level): Vocab[] {
  const rows = parseCsv(text);
  const header = rows[0] ?? [];
  const idx = (name: string) => header.indexOf(name);
  const iw = idx('expression');
  const ir = idx('reading');
  const im = idx('meaning');
  const it = idx('tags');
  const out: Vocab[] = [];
  for (const r of rows.slice(1)) {
    const word = (r[iw] ?? '').trim();
    if (!word) continue;
    out.push({
      id: `v-${level.toLowerCase()}-${pad(out.length + 1)}`,
      level,
      word,
      reading: (r[ir] ?? '').trim() || word,
      meanings: splitMeanings(r[im] ?? ''),
      tags: (r[it] ?? '').split(/\s+/).filter(Boolean),
      kanji: [...word].filter((ch) => hasKanji(ch)),
      sentenceIds: [],
    });
  }
  return out;
}

/** Same word+reading appearing in several level lists → keep the lowest level (N5 first). */
export function dedupeVocab(all: Vocab[]): Vocab[] {
  const best = new Map<string, Vocab>();
  for (const v of all) {
    const key = `${v.word}|${v.reading}`;
    const prev = best.get(key);
    if (!prev || levelRank(v.level) < levelRank(prev.level)) best.set(key, v);
  }
  return [...best.values()];
}

export interface RawKanji {
  strokes: number;
  grade: number | null;
  freq: number | null;
  jlpt_new: number | null;
  meanings: string[];
  readings_on: string[];
  readings_kun: string[];
}

export function parseKanjiJson(raw: Record<string, RawKanji>): Kanji[] {
  const out: Kanji[] = [];
  for (const [char, k] of Object.entries(raw)) {
    if (!k.jlpt_new) continue;
    const level = `N${k.jlpt_new}` as Level;
    const item: Kanji = {
      id: `k-${char}`,
      char,
      level,
      strokes: k.strokes,
      meanings: k.meanings,
      on: k.readings_on,
      kun: k.readings_kun,
      strokePaths: [],
      vocabIds: [],
    };
    if (k.grade != null) item.grade = k.grade;
    if (k.freq != null) item.freq = k.freq;
    out.push(item);
  }
  out.sort(
    (a, b) =>
      levelRank(a.level) - levelRank(b.level) ||
      (a.freq ?? 9999) - (b.freq ?? 9999) ||
      a.strokes - b.strokes ||
      a.char.localeCompare(b.char),
  );
  return out;
}

export function parseGrammarCsv(text: string): Grammar[] {
  const rows = parseCsv(text).slice(1);
  const byKey = new Map<string, Grammar>();
  const counters: Record<string, number> = {};
  for (const r of rows) {
    const [title = '', meaning = '', formation = '', ja = '', romaji = '', en = '', lv = ''] = r;
    const m = lv.match(/N[1-5]/);
    if (!m || !title.trim()) continue;
    const level = m[0] as Level;
    const key = `${level}|${title.trim()}`;
    let g = byKey.get(key);
    if (!g) {
      const n = (counters[level] = (counters[level] ?? 0) + 1);
      g = {
        id: `g-${level.toLowerCase()}-${pad(n)}`,
        level,
        title: title.trim(),
        meaning: meaning.trim(),
        formation: formation.trim(),
        examples: [],
      };
      byKey.set(key, g);
    }
    if (ja.trim()) g.examples.push({ ja: ja.trim(), romaji: romaji.trim(), en: en.trim() });
  }
  return [...byKey.values()];
}

export function kanjivgFilename(ch: string): string {
  return ch.codePointAt(0)!.toString(16).padStart(5, '0') + '.svg';
}

/** Stroke `d` attributes in order (only paths with id "kvg:xxxxx-sN"). */
export function extractStrokes(svg: string): string[] {
  const out: string[] = [];
  const re = /<path\b[^>]*\bid="kvg:[0-9a-f]+-s\d+"[^>]*\bd="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(svg))) out.push(m[1]!);
  return out;
}

/**
 * Stroke number positions, one per stroke: KanjiVG's hand-placed ones when present (else 5 units up-left of the
 * stroke start), then nudged apart so no two labels cover each other.
 */
export function extractStrokeNumbers(svg: string): LabelPos[] {
  const strokes = extractStrokes(svg);
  const kvg = [...svg.matchAll(/<text transform="matrix\(1 0 0 1 (-?[\d.]+) (-?[\d.]+)\)">\d+<\/text>/g)].map(
    (m): LabelPos => [Number(m[1]), Number(m[2])],
  );
  const preferred = strokes.map((d, i): LabelPos => {
    if (kvg.length === strokes.length) return kvg[i]!;
    const s = strokeStart(d) ?? [0, 0];
    return [s[0] - 5, s[1] - 2];
  });
  return placeStrokeNumbers(preferred);
}

export function parseTsvSentences(tsv: string): Map<number, string> {
  const map = new Map<number, string>();
  for (const line of tsv.split('\n')) {
    const [id, , text] = line.split('\t');
    if (id && text) map.set(Number(id), text.trim());
  }
  return map;
}

export function parseLinks(tsv: string): Map<number, number[]> {
  const map = new Map<number, number[]>();
  for (const line of tsv.split('\n')) {
    const [a, b] = line.split('\t');
    if (!a || !b) continue;
    const from = Number(a);
    const to = Number(b.trim());
    const arr = map.get(from);
    if (arr) arr.push(to);
    else map.set(from, [to]);
  }
  return map;
}

/**
 * For each vocab, pick up to `max` shortest sentences containing the word.
 * Mutates `vocab[i].sentenceIds`; returns the set of used sentence ids.
 */
export function assignSentences(
  vocab: Vocab[],
  sentences: { id: string; ja: string }[],
  max = 3,
): Set<string> {
  const byFirst = new Map<string, Vocab[]>();
  for (const v of vocab) {
    const word = v.word;
    if ([...word].length < 2 && !hasKanji(word)) continue;
    const first = [...word][0]!;
    const arr = byFirst.get(first);
    if (arr) arr.push(v);
    else byFirst.set(first, [v]);
  }
  const cands = new Map<string, { id: string; len: number }[]>();
  for (const s of sentences) {
    const chars = [...s.ja];
    const seen = new Set<string>();
    let offset = 0; // UTF-16 offset of chars[i]
    for (let i = 0; i < chars.length; i++) {
      const list = byFirst.get(chars[i]!);
      if (list) {
        for (const v of list) {
          if (seen.has(v.id) || !s.ja.startsWith(v.word, offset)) continue;
          seen.add(v.id);
          const entry = { id: s.id, len: chars.length };
          const arr = cands.get(v.id);
          if (arr) arr.push(entry);
          else cands.set(v.id, [entry]);
        }
      }
      offset += chars[i]!.length;
    }
  }
  const used = new Set<string>();
  for (const v of vocab) {
    const arr = cands.get(v.id);
    if (!arr) continue;
    arr.sort((a, b) => a.len - b.len || a.id.localeCompare(b.id));
    v.sentenceIds = arr.slice(0, max).map((x) => x.id);
    v.sentenceIds.forEach((id) => used.add(id));
  }
  return used;
}

export function attachVocabToKanji(kanji: Kanji[], vocab: Vocab[], max = 8): void {
  const byChar = new Map<string, Vocab[]>();
  for (const v of vocab)
    for (const ch of new Set(v.kanji)) {
      const arr = byChar.get(ch);
      if (arr) arr.push(v);
      else byChar.set(ch, [v]);
    }
  for (const k of kanji) {
    const list = byChar.get(k.char) ?? [];
    list.sort(
      (a, b) =>
        levelRank(a.level) - levelRank(b.level) ||
        [...a.word].length - [...b.word].length ||
        a.id.localeCompare(b.id),
    );
    k.vocabIds = list.slice(0, max).map((v) => v.id);
  }
}
