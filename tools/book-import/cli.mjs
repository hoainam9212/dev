#!/usr/bin/env node
// node cli.mjs scan  <books folder>
// node cli.mjs build <books folder> [pack folder]     (default: <books folder>/_pack)
// node cli.mjs check [pack folder]
// node cli.mjs zip   <pack folder> [zip folder]       (default: <pack folder>/../_zip) one .zip per indexed book
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { audioFile, groupBooks, inkBox, mergeBook, pageFile, questionBands, validateBook, zipCentralHeader, zipEnd, zipEntries, zipLocalHeader } from './lib.mjs';
import { audioInfo, grayPixels, pdfInfo, readJson, renderPdf, signature, walk, writeJson } from './io.mjs';

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

/** One stored .zip per sound book, for "Nhập sách" in the app. */
function zip(out, dest) {
  assertOutsideGit(dest);
  fs.mkdirSync(dest, { recursive: true });
  for (const id of fs.readdirSync(out)) {
    const dir = path.join(out, id);
    const bookPath = path.join(dir, 'book.json');
    if (!fs.existsSync(bookPath)) continue;
    const book = readJson(bookPath);
    if (!book.tests?.length) {
      console.log(`· ${book.title}: no test indexed yet, skipped`);
      continue;
    }
    const problems = validateBook(book);
    if (problems.length) {
      console.log(`✗ ${book.title}: index has problems, run check first`);
      process.exitCode = 1;
      continue;
    }
    // where the print is on each page, so the app can leave out the white margins (kept in book.json)
    const pagesDir = path.join(dir, 'pages');
    const boxes = { ...(book.boxes ?? {}) };
    let measured = 0;
    for (const f of fs.existsSync(pagesDir) ? fs.readdirSync(pagesDir) : []) {
      const n = Number(/^p(\d+)\./.exec(f)?.[1]);
      if (!n || boxes[n]) continue;
      const { gray, w, h } = grayPixels(path.join(pagesDir, f));
      boxes[n] = inkBox(gray, w, h);
      measured++;
    }
    if (measured) book.boxes = boxes;
    // a page holding several questions: give each question its own band, so the app shows only that question
    let cut = 0;
    for (const t of book.tests) {
      const byPage = new Map();
      for (const q of t.questions) byPage.set(q.page, [...(byPage.get(q.page) ?? []), q]);
      for (const [page, qs] of byPage) {
        if (qs.length < 2 || qs.every((q) => q.crop) || !boxes[page]) continue;
        const { gray, w, h } = grayPixels(path.join(dir, pageFile(page)));
        const bands = questionBands(gray, w, h, boxes[page], qs.length);
        if (!bands) {
          console.log(`  ! ${t.id} page ${page}: could not find ${qs.length} 「N番」 labels, the app shows the whole page`);
          continue;
        }
        qs.forEach((q, i) => {
          // narrow each band to its own print, so a short text question is not shown at full page width
          const [y0, y1] = bands[i];
          const top = Math.floor(y0 * h);
          const rows = Math.max(1, Math.ceil(y1 * h) - top);
          const [x0, , x1] = inkBox(gray.subarray(top * w, (top + rows) * w), w, rows, { pad: 0.02 });
          q.crop = [Math.max(x0, boxes[page][0] - 0.02), y0, Math.min(x1, boxes[page][2] + 0.02), y1];
        });
        cut += qs.length;
      }
    }
    if (measured || cut) {
      writeJson(bookPath, book);
      console.log(`  measured margins of ${measured} page(s), cut ${cut} question(s) out of shared pages`);
    }
    const target = path.join(dest, `${id}.zip`);
    const fd = fs.openSync(`${target}.part`, 'w');
    const central = [];
    let offset = 0;
    for (const name of zipEntries(walk(dir))) {
      const data = fs.readFileSync(path.join(dir, name));
      const crc = zlib.crc32(data);
      const local = zipLocalHeader(name, data.length, crc);
      central.push(zipCentralHeader(name, data.length, crc, offset));
      fs.writeSync(fd, local);
      fs.writeSync(fd, data);
      offset += local.length + data.length;
    }
    const cd = Buffer.concat(central);
    fs.writeSync(fd, cd);
    fs.writeSync(fd, zipEnd(central.length, cd.length, offset));
    fs.closeSync(fd);
    fs.renameSync(`${target}.part`, target);
    console.log(`✓ ${book.title} → ${target} (${central.length} files, ${(fs.statSync(target).size / 1048576).toFixed(1)} MB)`);
  }
}

const [cmd, a, b] = process.argv.slice(2);
try {
  if (cmd === 'scan' && a) await scan(path.resolve(a));
  else if (cmd === 'build' && a) await build(path.resolve(a), path.resolve(b ?? path.join(a, '_pack')));
  else if (cmd === 'check' && a) check(path.resolve(a));
  else if (cmd === 'zip' && a) zip(path.resolve(a), path.resolve(b ?? path.join(a, '..', '_zip')));
  else {
    console.log('usage:\n  node cli.mjs scan  <books folder>\n  node cli.mjs build <books folder> [pack folder]\n  node cli.mjs check <pack folder>\n  node cli.mjs zip   <pack folder> [zip folder]');
    process.exitCode = 2;
  }
} catch (e) {
  console.error(`ERROR: ${e.message}`);
  process.exitCode = 1;
}
