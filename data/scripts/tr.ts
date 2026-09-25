import fs from 'node:fs';
import path from 'node:path';
import { LEVELS, type Level } from '@nihongo/shared';
import { OUT_DIR, RAW_DIR, TRANSLATIONS_DIR } from './sources';
import { hanVietFor, loadHanVietSources } from '../src/opendata';
import { loadBuiltSources, readTrFiles, toOverlays, TR_TYPES, type TrType } from '../src/translate';
import { checkTranslations } from '../src/translate-check';
import { makeBatch, nextIndex, pendingItems, sampleEntries } from '../src/tr-batch';

const [cmd, ...rest] = process.argv.slice(2);
const arg = (name: string) => {
  const i = rest.indexOf(`--${name}`);
  return i >= 0 ? rest[i + 1] : undefined;
};
const levelArg = (): Level | undefined => {
  const l = arg('level')?.toUpperCase();
  if (l && !LEVELS.includes(l as Level)) throw new Error(`unknown level ${l}`);
  return l as Level | undefined;
};
const DEFAULT_SIZE: Record<TrType, number> = { vocab: 250, kanji: Infinity, grammar: Infinity, sentences: 300 };

if (!fs.existsSync(path.join(OUT_DIR, 'vocab/n5.json'))) {
  console.error('No built content: run npm run data:build first.');
  process.exit(1);
}
const src = loadBuiltSources(OUT_DIR);
const files = readTrFiles(TRANSLATIONS_DIR);
const o = toOverlays(files);

if (cmd === 'status') {
  const only = levelArg();
  for (const l of LEVELS.filter((x) => !only || x === only)) {
    const parts = TR_TYPES.map((t) => {
      const total = (src[t] as { level: Level }[]).filter((x) => x.level === l).length;
      return `${t} ${total - pendingItems(t, l, src, o).length}/${total}`;
    });
    console.log(l, parts.join(' · '));
  }
  const { errors, warnings } = checkTranslations(files, src);
  console.log(`${files.length} files · ${errors.length} errors · ${warnings.length} warnings`);
} else if (cmd === 'next') {
  const level = levelArg();
  const type = arg('type') as TrType;
  if (!level || !TR_TYPES.includes(type)) throw new Error('usage: next --level n5 --type vocab|kanji|grammar|sentences [--size N]');
  const size = Number(arg('size') ?? DEFAULT_SIZE[type]);
  const items = pendingItems(type, level, src, o).slice(0, size);
  if (!items.length) {
    console.log(`nothing pending for ${level} ${type}`);
  } else {
    const byId = new Map(src.sentences.map((s) => [s.id, s]));
    const hv = type === 'kanji' ? loadHanVietSources(RAW_DIR) : undefined;
    const hint = hv && ((ch: string) => hanVietFor(ch, hv));
    const batch = makeBatch(type, level, items, nextIndex(files.map((f) => f.path).filter((p) => p.startsWith(`vi/${level.toLowerCase()}/`)), type), byId, hint);
    const out = path.join(TRANSLATIONS_DIR, '_work', batch.writeTo.replace(/\//g, '_'));
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(batch, null, 2));
    console.log(`${items.length} ${type} → ${path.relative(process.cwd(), out)}`);
    console.log(`fill "vi" and every empty "hanViet" (context.hanVietCandidates); check context.hanVietOpen and add "hanViet" to override a wrong one`);
    console.log(`then write the "file" object to translations/${batch.writeTo}`);
  }
} else if (cmd === 'check') {
  const { errors, warnings } = checkTranslations(files, src);
  for (const w of warnings) console.log(`warn  ${w.file} ${w.key}: ${w.msg}`);
  for (const e of errors) console.log(`ERROR ${e.file} ${e.key}: ${e.msg}`);
  console.log(`${files.length} files · ${errors.length} errors · ${warnings.length} warnings`);
  process.exit(errors.length ? 1 : 0);
} else if (cmd === 'sample') {
  const file = arg('file');
  const level = levelArg();
  const chosen = files.filter((f) => (file ? f.path === file : !level || f.file.level === level));
  for (const r of sampleEntries(chosen, src, Number(arg('n') ?? 20))) console.log(`[${r.type}] ${r.ja}\n    en: ${r.en}\n    vi: ${r.vi}`);
} else {
  console.log('usage: tr status [--level n5] | next --level n5 --type vocab [--size 250] | check | sample (--file vi/n5/vocab-001.json | --level n5) [--n 20]');
}
