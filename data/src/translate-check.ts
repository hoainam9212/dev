import type { Level } from '@nihongo/shared';
import { grammarKey, kanjiKey, sentenceKey, toOverlays, vocabKey, type LoadedFile, type Sources } from './translate';

export interface Issue { file: string; key: string; msg: string }

const VI_LETTER = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
const LOANWORDS = new Set([
  'ok', 'email', 'e-mail', 'tivi', 'radio', 'video', 'taxi', 'pizza', 'internet', 'web', 'app', 'game', 'piano',
  'golf', 'tennis', 'menu', 'bar', 'pin', 'karaoke', 'sushi', 'kimono', 'manga', 'anime', 'yen', 'cm', 'km', 'kg', 'mm',
]);

/** Has a Vietnamese letter, or no Latin letters at all, or only allow-listed loanwords. */
export function looksVietnamese(s: string): boolean {
  const t = s.trim();
  if (!t) return false;
  if (VI_LETTER.test(t)) return true;
  if (!/[a-z]/i.test(t)) return true;
  return t.toLowerCase().split(/[^a-z-]+/).filter(Boolean).every((w) => LOANWORDS.has(w));
}

const lower = (xs: string[]) => xs.map((x) => x.trim().toLowerCase());
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

export function checkTranslations(files: LoadedFile[], src: Sources): { errors: Issue[]; warnings: Issue[] } {
  const errors: Issue[] = [];
  const warnings: Issue[] = [];
  try {
    toOverlays(files);
  } catch (e) {
    errors.push({ file: '', key: '', msg: (e as Error).message });
  }
  const at = <T>(items: T[], level: (x: T) => Level, key: (x: T) => string) => new Map(items.map((x) => [`${level(x)}|${key(x)}`, x]));
  const vocab = at(src.vocab, (v) => v.level, vocabKey);
  const kanji = at(src.kanji, (k) => k.level, kanjiKey);
  const grammar = at(src.grammar, (g) => g.level, grammarKey);
  const sentences = at(src.sentences, (s) => s.level, sentenceKey);

  for (const { path: p, file } of files) {
    const [, folder, name] = p.split('/');
    if (folder !== file.level.toLowerCase()) errors.push({ file: p, key: '', msg: `file level ${file.level} does not match folder ${folder}` });
    if (!name?.startsWith(`${file.type}-`)) errors.push({ file: p, key: '', msg: `file name must start with "${file.type}-"` });
    for (const [key, raw] of Object.entries(file.entries)) {
      const err = (msg: string) => errors.push({ file: p, key, msg });
      const warn = (msg: string) => warnings.push({ file: p, key, msg });
      const id = `${file.level}|${key}`;
      const text = (vi: string[], en: string[] | string | undefined, source: string[]) => {
        if (!vi.length || vi.some((x) => !x?.trim())) err('empty translation');
        else if (same(lower(vi), lower(source))) err('identical to the English');
        if (en === undefined) err('missing en snapshot');
        else if (!same(Array.isArray(en) ? en : [en], source)) warn('stale: the English changed since translation');
        const joined = vi.join(', ');
        if (joined.trim() && !looksVietnamese(joined)) warn('no Vietnamese letter');
        if (joined.length > source.join(', ').length * 4 + 40) warn('much longer than the English');
      };
      if (file.type === 'vocab') {
        const s = vocab.get(id);
        if (!s) { err(`not a ${file.level} vocab key`); continue; }
        const e = raw as { vi: string[]; en: string[] };
        text(e.vi ?? [], e.en, s.meanings);
      } else if (file.type === 'kanji') {
        const s = kanji.get(id);
        if (!s) { err(`not a ${file.level} kanji key`); continue; }
        const e = raw as { vi: string[]; hanViet?: string; en: string[] };
        text(e.vi ?? [], e.en, s.meanings);
        if (e.hanViet !== undefined && (!e.hanViet.trim() || e.hanViet !== e.hanViet.toLocaleUpperCase('vi'))) err('Hán Việt must be uppercase');
      } else if (file.type === 'grammar') {
        const s = grammar.get(id);
        if (!s) { err(`not a ${file.level} grammar key`); continue; }
        const e = raw as { vi: string; examples: { ja: string; vi: string }[]; en: string };
        text([e.vi ?? ''], e.en, [s.meaning]);
        const ex = e.examples ?? [];
        if (ex.length !== s.examples.length || ex.some((x, i) => x.ja !== s.examples[i]!.ja)) err("examples don't match the source");
        else if (ex.some((x) => !x.vi?.trim())) err('empty translation');
      } else {
        const s = sentences.get(id);
        if (!s) { err(`not a ${file.level} sentence key`); continue; }
        const e = raw as { vi: string; en: string };
        text([e.vi ?? ''], e.en, [s.en]);
      }
    }
  }
  return { errors, warnings };
}
