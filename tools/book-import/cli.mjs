#!/usr/bin/env node
// node cli.mjs scan  <books folder>
// node cli.mjs build <books folder> [pack folder]     (default: <books folder>/_pack)
// node cli.mjs check [pack folder]
import fs from 'node:fs';
import path from 'node:path';
import { audioFile, groupBooks, mergeBook, pageFile, validateBook } from './lib.mjs';
import { audioInfo, pdfInfo, readJson, renderPdf, signature, walk, writeJson } from './io.mjs';

const mb = (bytes) => `${(bytes / 1048576).toFixed(1)} MB`;
const clock = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
const size = (file) => fs.statSync(file).size;

/** Refuse to work inside a git checkout: the pack holds copyrighted books and must never be committed. */
function assertOutsideGit(dir) {
  for (let d = path.resolve(dir); ; d = path.dirname(d)) {
    if (fs.existsSync(path.join(d, '.git'))) throw new Error(`${dir} is inside the git repository at ${d}. Keep books and the pack outside any repository.`);
    if (d === path.dirname(d)) return;
  }
}

async function describe(src) {
  const books = groupBooks(walk(src));
  const out = [];
  for (const b of books) {
    const abs = (f) => path.join(src, f);
    const pdfs = b.pdfs.map((f) => {
      try {
        return { file: f, bytes: size(abs(f)), ...pdfInfo(abs(f)) };
      } catch (e) {
        return { file: f, bytes: size(abs(f)), pages: 0, textLayer: 0, error: String(e.message ?? e) };
      }
    });
    const audio = [];
    for (const f of b.audio) audio.push({ file: f, bytes: size(abs(f)), ...(await audioInfo(abs(f))) });
    out.push({ ...b, pdfs, audio });
  }
  return out;
}

async function scan(src) {
  const books = await describe(src);
  if (!books.length) console.log('No books found. Put each book in its own folder (PDF or page images, plus its audio).');
  for (const b of books) {
    const pages = b.pdfs.reduce((n, p) => n + p.pages, 0) + b.images.length;
    const secs = b.audio.reduce((n, a) => n + a.seconds, 0);
    console.log(`\n■ ${b.name}  [${b.id}]`);
    console.log(`  pages: ${pages}  (PDF ${b.pdfs.length} file, images ${b.images.length})   audio: ${b.audio.length} file, ${clock(secs)}`);
    for (const p of b.pdfs) {
      const kind = p.error ? `UNREADABLE (${p.error})` : p.textLayer >= 0.5 ? 'has text' : 'scanned pictures';
      console.log(`  - ${p.file}: ${p.pages} pages, ${mb(p.bytes)}, ${kind}`);
    }
    if (b.audio.some((a) => !a.seconds)) console.log(`  ! audio with unknown length: ${b.audio.filter((a) => !a.seconds).map((a) => a.file).join(', ')}`);
    if (b.audioConvert.length) console.log(`  ! audio the app cannot play as is (convert to mp3 first): ${b.audioConvert.join(', ')}`);
    if (b.archives.length) console.log(`  ! unpack first: ${b.archives.join(', ')}`);
    if (b.other.length) console.log(`  · ignored: ${b.other.length} other file(s)`);
  }
  writeJson(path.join(src, '_inventory.json'), { at: new Date().toISOString(), books });
  console.log(`\nwrote ${path.join(src, '_inventory.json')}`);
}

async function build(src, out) {
  assertOutsideGit(out);
  const books = await describe(src);
  for (const b of books) {
    const dir = path.join(out, b.id);
    const bookPath = path.join(dir, 'book.json');
    const statePath = path.join(dir, '.state.json');
    const existing = readJson(bookPath, null);
    const state = readJson(statePath, {});
    const abs = (f) => path.join(src, f);

    // page numbers: PDFs in name order, then loose page images
    const sources = [];
    let next = 1;
    for (const p of b.pdfs) {
      if (p.error) console.log(`  ! skipping unreadable ${p.file}`);
      else {
        sources.push({ file: p.file, kind: 'pdf', pages: p.pages, firstPage: next });
        next += p.pages;
      }
    }
    for (const f of b.images) sources.push({ file: f, kind: 'image', pages: 1, firstPage: next++ });
    const audio = b.audio.map((a, i) => ({ file: audioFile(i + 1, path.extname(a.file)), source: a.file, seconds: a.seconds, title: path.basename(a.file, path.extname(a.file)) }));

    // an index that already points at pages or recordings must not be shifted by a file added in between
    if (existing?.tests?.length) {
      const moved = [
        ...(existing.sources ?? []).filter((s) => sources.find((n) => n.file === s.file)?.firstPage !== s.firstPage).map((s) => s.file),
        ...(existing.audio ?? []).filter((a) => audio.find((n) => n.source === a.source)?.file !== a.file).map((a) => a.source),
      ];
      if (moved.length) {
        console.log(`\n■ ${b.name}: STOPPED. New files would renumber pages or recordings the index already uses:\n  ${moved.join('\n  ')}\n  Name new files so they sort after the existing ones, or rebuild the index.`);
        continue;
      }
    }

    console.log(`\n■ ${b.name}  → ${dir}`);
    for (const s of sources) {
      const sig = signature(abs(s.file));
      const first = path.join(dir, pageFile(s.firstPage));
      if (state[s.file] === `${sig}@${s.firstPage}` && fs.existsSync(first)) continue;
      if (s.kind === 'pdf') {
        renderPdf(abs(s.file), s.firstPage, dir, pageFile, { onPage: (i, n) => i % 25 === 0 && console.log(`  ${s.file}: ${i}/${n}`) });
      } else {
        fs.mkdirSync(path.join(dir, 'pages'), { recursive: true });
        fs.copyFileSync(abs(s.file), path.join(dir, pageFile(s.firstPage).replace(/\.jpg$/, path.extname(s.file).toLowerCase())));
      }
      state[s.file] = `${sig}@${s.firstPage}`;
      writeJson(statePath, state);
      console.log(`  pages ${s.firstPage}–${s.firstPage + s.pages - 1} ← ${s.file}`);
    }
    for (const a of audio) {
      const sig = signature(abs(a.source));
      const target = path.join(dir, a.file);
      if (state[a.source] === `${sig}@${a.file}` && fs.existsSync(target)) continue;
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(abs(a.source), target);
      state[a.source] = `${sig}@${a.file}`;
      writeJson(statePath, state);
      console.log(`  ${a.file} ← ${a.source} (${clock(a.seconds)})`);
    }
    writeJson(bookPath, mergeBook(existing, { id: b.id, title: b.name, pages: next - 1, sources, audio }));
  }
  console.log(`\npack: ${out}`);
}

function check(out) {
  let failed = 0;
  for (const id of fs.readdirSync(out)) {
    const bookPath = path.join(out, id, 'book.json');
    if (!fs.existsSync(bookPath)) continue;
    const book = readJson(bookPath);
    const problems = validateBook(book);
    for (const a of book.audio ?? []) if (!fs.existsSync(path.join(out, id, a.file))) problems.push(`missing file ${a.file}`);
    const pages = fs.existsSync(path.join(out, id, 'pages')) ? fs.readdirSync(path.join(out, id, 'pages')).length : 0;
    if (pages !== book.pages) problems.push(`book.json says ${book.pages} pages but pages/ holds ${pages}`);
    const questions = (book.tests ?? []).reduce((n, t) => n + (t.questions?.length ?? 0), 0);
    console.log(`\n■ ${book.title}  [${id}]  pages ${book.pages} · audio ${book.audio?.length ?? 0} · tests ${book.tests?.length ?? 0} · questions ${questions}`);
    for (const p of problems) console.log(`  ✗ ${p}`);
    if (!problems.length) console.log('  ✓ index is sound');
    failed += problems.length;
  }
  if (failed) process.exitCode = 1;
}

const [cmd, a, b] = process.argv.slice(2);
try {
  if (cmd === 'scan' && a) await scan(path.resolve(a));
  else if (cmd === 'build' && a) await build(path.resolve(a), path.resolve(b ?? path.join(a, '_pack')));
  else if (cmd === 'check' && a) check(path.resolve(a));
  else {
    console.log('usage:\n  node cli.mjs scan  <books folder>\n  node cli.mjs build <books folder> [pack folder]\n  node cli.mjs check <pack folder>');
    process.exitCode = 2;
  }
} catch (e) {
  console.error(`ERROR: ${e.message}`);
  process.exitCode = 1;
}
