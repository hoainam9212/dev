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
  if (!Number.isInteger(book.pages) || book.pages < 1) bad('pages must be a positive integer');
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
  };
}
