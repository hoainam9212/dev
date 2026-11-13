// Pure logic of the book import: no file or network access here, so it is all unit-tested.

export const SECTIONS = {
  bamen: 'chokai',
  hatsugen: 'chokai',
  'sogo-chokai': 'chokai',
  jokyo: 'chodokkai',
  shiryo: 'chodokkai',
  'sogo-chodokkai': 'chodokkai',
  goi: 'dokkai',
  hyogen: 'dokkai',
  'sogo-dokkai': 'dokkai',
};

const EXT = {
  pdf: ['.pdf'],
  image: ['.jpg', '.jpeg', '.png', '.webp'],
  // formats an Android WebView plays as they are
  audio: ['.mp3', '.m4a', '.aac', '.wav', '.ogg', '.opus'],
  // audio that must be converted before the app can play it
  audioConvert: ['.wma', '.flac', '.aiff', '.aif', '.amr', '.mka'],
  archive: ['.zip', '.rar', '.7z'],
};

/** What a file is to the import: pdf, image, audio, audioConvert, archive or other. */
export function kindOf(file) {
  const m = /\.[^./\\]+$/.exec(file);
  const ext = m ? m[0].toLowerCase() : '';
  for (const [kind, list] of Object.entries(EXT)) if (list.includes(ext)) return kind;
  return 'other';
}

/** Compare names the way a person sorts them: "track 2" before "track 10", full-width digits included. */
export function naturalCompare(a, b) {
  const norm = (s) => s.normalize('NFKC').toLowerCase();
  const pa = norm(a).match(/\d+|\D+/g) ?? [];
  const pb = norm(b).match(/\d+|\D+/g) ?? [];
  for (let i = 0; i < Math.min(pa.length, pb.length); i++) {
    const x = pa[i];
    const y = pb[i];
    if (x === y) continue;
    const nx = /^\d+$/.test(x);
    const ny = /^\d+$/.test(y);
    if (nx && ny) {
      const d = Number(x) - Number(y);
      if (d) return d;
      continue;
    }
    return x < y ? -1 : 1;
  }
  return pa.length - pb.length;
}

/** Folder-safe id from a book title; Japanese titles keep a short hash so two books never collide. */
export function bookId(name) {
  const base = name.replace(/\.[^.]+$/, '');
  const ascii = base
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
  let h = 0;
  for (const ch of base) h = (h * 31 + ch.codePointAt(0)) >>> 0;
  const hash = h.toString(36).padStart(6, '0').slice(0, 6);
  return ascii ? `${ascii}-${hash}` : `book-${hash}`;
}

/**
 * Group files (paths relative to the source folder, "/" separated) into books:
 * each top-level folder is one book, each top-level PDF is a book of its own.
 * Entries starting with "_" (the pack, the inventory) are ignored.
 */
export function groupBooks(files) {
  const books = new Map();
  for (const file of files) {
    const parts = file.split('/');
    const top = parts[0];
    if (top.startsWith('_') || top.startsWith('.')) continue;
    const kind = kindOf(file);
    if (parts.length === 1 && kind !== 'pdf' && kind !== 'archive') continue; // a stray file next to the books
    if (!books.has(top)) books.set(top, { name: top.replace(/\.pdf$/i, ''), id: bookId(top), pdfs: [], images: [], audio: [], audioConvert: [], archives: [], other: [] });
    const b = books.get(top);
    if (kind === 'pdf') b.pdfs.push(file);
    else if (kind === 'image') b.images.push(file);
    else if (kind === 'audio') b.audio.push(file);
    else if (kind === 'audioConvert') b.audioConvert.push(file);
    else if (kind === 'archive') b.archives.push(file);
    else b.other.push(file);
  }
  const out = [...books.values()];
  for (const b of out) for (const k of ['pdfs', 'images', 'audio', 'audioConvert', 'archives', 'other']) b[k].sort(naturalCompare);
  return out.sort((a, b) => naturalCompare(a.name, b.name));
}

export const pageFile = (n) => `pages/p${String(n).padStart(4, '0')}.jpg`;
export const audioFile = (n, ext) => `audio/a${String(n).padStart(3, '0')}${ext.toLowerCase()}`;

/** "1:05" or 65 → seconds; null when it is not a time. */
export function seconds(v) {
  if (typeof v === 'number') return Number.isFinite(v) && v >= 0 ? v : null;
  if (typeof v !== 'string') return null;
  const m = /^(?:(\d+):)?(\d{1,2}):(\d{2})$/.exec(v.trim());
  if (!m) return null;
  return Number(m[1] ?? 0) * 3600 + Number(m[2]) * 60 + Number(m[3]);
}

/**
 * Check a book's index (book.json). Returns a list of problems, empty when the index is sound.
 *
 * book = { id, title, pages, audio: [{ file, seconds }], tests: [{ id, title, questions: [
 *   { no, section, page, audio?, at?, answer } ], answerPages?: [from, to], scriptPages?: [from, to] }] }
 * `page` is the 1-based page image the question is printed on; `audio` + `at` say where its recording starts.
 */
export function validateBook(book) {
  const problems = [];
  const bad = (msg) => problems.push(msg);
  if (!book || typeof book !== 'object') return ['book.json is not an object'];
  if (!book.id) bad('missing id');
  if (!book.title) bad('missing title');
  // 0 is fine: an audio-only folder (CDs whose book is not downloaded yet)
  if (!Number.isInteger(book.pages) || book.pages < 0) bad('pages must be a whole number');
  const audio = new Map((book.audio ?? []).map((a) => [a.file, a]));
  const inRange = (p) => Number.isInteger(p) && p >= 1 && p <= book.pages;
  const range = (r, label) => {
    if (r === undefined) return;
    if (!Array.isArray(r) || r.length !== 2 || !inRange(r[0]) || !inRange(r[1]) || r[0] > r[1]) bad(`${label}: must be [from, to] inside 1–${book.pages}`);
  };
  const testIds = new Set();
  for (const t of book.tests ?? []) {
    const tl = `test ${t.id ?? '?'}`;
    if (!t.id) bad('a test has no id');
    else if (testIds.has(t.id)) bad(`${tl}: duplicate id`);
    testIds.add(t.id);
    if (!t.title) bad(`${tl}: missing title`);
    range(t.answerPages, `${tl} answerPages`);
    range(t.scriptPages, `${tl} scriptPages`);
    const seen = new Set();
    let last = null;
    for (const q of t.questions ?? []) {
      const ql = `${tl} q${q.no ?? '?'}`;
      if (!Number.isInteger(q.no) || q.no < 1) bad(`${ql}: no must be a positive integer`);
      else if (seen.has(q.no)) bad(`${ql}: duplicate question number`);
      seen.add(q.no);
      if (!(q.section in SECTIONS)) bad(`${ql}: unknown section "${q.section}"`);
      if (!inRange(q.page)) bad(`${ql}: page ${q.page} is outside 1–${book.pages}`);
      if (!Number.isInteger(q.answer) || q.answer < 1 || q.answer > 4) bad(`${ql}: answer must be 1–4`);
      const part = SECTIONS[q.section];
      if (part && part !== 'dokkai') {
        const a = audio.get(q.audio);
        if (!q.audio) bad(`${ql}: a listening question needs its audio file`);
        else if (!a) bad(`${ql}: audio "${q.audio}" is not in the book`);
        const at = q.at === undefined ? 0 : seconds(q.at);
        if (at === null) bad(`${ql}: "at" must be seconds or m:ss`);
        else if (a && a.seconds && at >= a.seconds) bad(`${ql}: starts at ${at}s but "${q.audio}" lasts ${Math.round(a.seconds)}s`);
        else if (last && last.audio === q.audio && at < last.at) bad(`${ql}: starts before q${last.no} in the same recording`);
        if (at !== null) last = { no: q.no, audio: q.audio, at };
      } else if (part === 'dokkai' && q.audio) {
        bad(`${ql}: a reading question has no audio`);
      }
    }
    const nos = [...seen].filter(Number.isInteger).sort((a, b) => a - b);
    for (let i = 1; i < nos.length; i++) if (nos[i] !== nos[i - 1] + 1) bad(`${tl}: question numbers jump from ${nos[i - 1]} to ${nos[i]}`);
  }
  return problems;
}

/**
 * Where the printed content of a scanned page is, as fractions [x0, y0, x1, y1] of its width and height,
 * so the app can leave out the white margins. `gray` holds one byte per pixel (0 black … 255 white).
 * A row or column counts as content when more than `minInk` of its pixels are darker than `threshold`
 * (specks of scanner dust stay below it). A blank page gives the whole page.
 */
export function inkBox(gray, w, h, { threshold = 200, minInk = 0.004, pad = 0.015 } = {}) {
  const rows = new Uint32Array(h);
  const cols = new Uint32Array(w);
  for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
      if (gray[y * w + x] < threshold) {
        rows[y]++;
        cols[x]++;
      }
  const first = (a, need) => a.findIndex((v) => v > need);
  const lastOf = (a, need) => a.length - 1 - [...a].reverse().findIndex((v) => v > need);
  const rowNeed = Math.max(2, w * minInk);
  const colNeed = Math.max(2, h * minInk);
  const y0 = first(rows, rowNeed);
  const x0 = first(cols, colNeed);
  if (y0 < 0 || x0 < 0) return [0, 0, 1, 1];
  const y1 = lastOf(rows, rowNeed) + 1;
  const x1 = lastOf(cols, colNeed) + 1;
  const r = (v) => Math.round(Math.min(1, Math.max(0, v)) * 1000) / 1000;
  return [r(x0 / w - pad), r(y0 / h - pad), r(x1 / w + pad), r(y1 / h + pad)];
}

/**
 * Split a page that holds `k` questions into one band per question.
 * Every question starts with a 「N番」 label at the left edge of the printed area; the left strip holds
 * nothing else except, above the first label, the section heading or instructions, and the page number at
 * the bottom. So: find the runs of ink in that strip, drop the page number, keep the lowest `k` runs as
 * labels, and cut just above each label. Returns k [y0, y1] fractions of the page height, top to bottom,
 * or null when the strip does not show k labels (the caller then keeps the whole page).
 */
export function questionBands(gray, w, h, box, k, { threshold = 160, strip = 0.05, minGap = 0.006, minRun = 0.008, maxRun = 0.03, footer = 0.04, pad = 0.008 } = {}) {
  const [bx0, by0, bx1, by1] = box;
  const ys = Math.floor(by0 * h);
  const ye = Math.min(h, Math.ceil(by1 * h));
  // the labels' left edge: leftmost ink below the running head and above the page number
  // (the page number sits further left on some pages, the head line spans the whole width)
  const bodyTop = ys + Math.round(0.03 * h);
  const bodyEnd = ye - Math.round(footer * h);
  let xs = -1;
  for (let x = Math.floor(bx0 * w); x < Math.ceil(bx1 * w) && xs < 0; x++) {
    let n = 0;
    for (let y = bodyTop; y < bodyEnd; y++) if (gray[y * w + x] < threshold && ++n >= 3) break;
    if (n >= 3) xs = x;
  }
  if (xs < 0) return null;
  const xe = Math.min(w, xs + Math.ceil(strip * w));
  const inked = [];
  for (let y = ys; y < ye; y++) {
    let n = 0;
    for (let x = xs; x < xe; x++) if (gray[y * w + x] < threshold) n++;
    inked.push(n >= 2);
  }
  // runs of inked rows, bridging gaps shorter than minGap
  const runs = [];
  const gapRows = Math.round(minGap * h);
  let start = -1;
  let lastInk = -1;
  inked.forEach((v, i) => {
    if (!v) return;
    if (start < 0) start = i;
    else if (i - lastInk > gapRows) {
      runs.push([start, lastInk]);
      start = i;
    }
    lastInk = i;
  });
  if (start >= 0) runs.push([start, lastInk]);
  const height = ye - ys;
  const labels = runs
    .filter(([a, b]) => b - a + 1 >= minRun * h && b - a + 1 <= maxRun * h) // specks; photos at the left edge
    .filter(([a]) => a < height * (1 - footer)); // page number
  if (labels.length < k) return null;
  const tops = labels.slice(-k).map(([a]) => (ys + a) / h);
  const r = (v) => Math.round(Math.min(1, Math.max(0, v)) * 1000) / 1000;
  // the first band starts at the top of the print: it keeps the section heading or instructions with it
  return tops.map((t, i) => [r(i === 0 ? by0 : t - pad), r(i + 1 < k ? tops[i + 1] - pad : by1 - footer)]);
}

// --- a "stored" zip (no compression: pages are JPEG and audio is MP3 already) -----------------------
// The app reads it straight from the picked file with Blob.slice, so nothing is held in memory twice.

const DOS_DATE = ((2026 - 1980) << 9) | (1 << 5) | 1; // fixed date: the same pack gives the same zip

/** Local file header that precedes each file's bytes. */
export function zipLocalHeader(name, size, crc) {
  const n = Buffer.from(name, 'utf8');
  const h = Buffer.alloc(30);
  h.writeUInt32LE(0x04034b50, 0);
  h.writeUInt16LE(20, 4); // version needed
  h.writeUInt16LE(0x0800, 6); // UTF-8 names
  h.writeUInt16LE(0, 8); // stored
  h.writeUInt16LE(0, 10);
  h.writeUInt16LE(DOS_DATE, 12);
  h.writeUInt32LE(crc >>> 0, 14);
  h.writeUInt32LE(size, 18);
  h.writeUInt32LE(size, 22);
  h.writeUInt16LE(n.length, 26);
  h.writeUInt16LE(0, 28);
  return Buffer.concat([h, n]);
}

/** Central directory entry for one file, pointing at its local header. */
export function zipCentralHeader(name, size, crc, offset) {
  const n = Buffer.from(name, 'utf8');
  const h = Buffer.alloc(46);
  h.writeUInt32LE(0x02014b50, 0);
  h.writeUInt16LE(20, 4);
  h.writeUInt16LE(20, 6);
  h.writeUInt16LE(0x0800, 8);
  h.writeUInt16LE(0, 10);
  h.writeUInt16LE(0, 12);
  h.writeUInt16LE(DOS_DATE, 14);
  h.writeUInt32LE(crc >>> 0, 16);
  h.writeUInt32LE(size, 20);
  h.writeUInt32LE(size, 24);
  h.writeUInt16LE(n.length, 28);
  h.writeUInt32LE(offset, 42);
  return Buffer.concat([h, n]);
}

/** End of central directory record. */
export function zipEnd(count, cdSize, cdOffset) {
  if (count > 0xffff || cdOffset + cdSize > 0xffffffff) throw new Error('book too large for a plain zip (over 4 GB or 65535 files)');
  const h = Buffer.alloc(22);
  h.writeUInt32LE(0x06054b50, 0);
  h.writeUInt16LE(count, 8);
  h.writeUInt16LE(count, 10);
  h.writeUInt32LE(cdSize, 12);
  h.writeUInt32LE(cdOffset, 16);
  return h;
}

/** Files of a built book that go into its zip: the index, pages and audio, never the build state. */
export const zipEntries = (files) => files.filter((f) => f === 'book.json' || /^(pages|audio)\//.test(f)).sort(naturalCompare);

/** Keep everything a person (or Claude) wrote into an existing book.json; refresh only what the build knows. */
export function mergeBook(existing, built) {
  return {
    id: built.id,
    title: existing?.title ?? built.title,
    pages: built.pages,
    sources: built.sources,
    audio: built.audio.map((a) => ({ ...a, title: existing?.audio?.find((x) => x.file === a.file)?.title ?? a.title })),
    tests: existing?.tests ?? [],
    ...(existing?.notes ? { notes: existing.notes } : {}),
    ...(existing?.boxes ? { boxes: existing.boxes } : {}),
  };
}
