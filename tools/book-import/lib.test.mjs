import test from 'node:test';
import assert from 'node:assert/strict';
import zlib from 'node:zlib';
import { audioFile, bookId, groupBooks, inkBox, kindOf, questionBands, mergeBook, naturalCompare, pageFile, seconds, validateBook, zipCentralHeader, zipEnd, zipEntries, zipLocalHeader } from './lib.mjs';

test('stored zip headers: every file can be found again from the central directory', () => {
  const files = [['book.json', Buffer.from('{"id":"b"}')], ['pages/p0001.jpg', Buffer.from([1, 2, 3, 4, 5])], ['音声/a.mp3', Buffer.alloc(0)]];
  const parts = [];
  const central = [];
  let offset = 0;
  for (const [name, data] of files) {
    const crc = zlib.crc32(data);
    const local = zipLocalHeader(name, data.length, crc);
    central.push(zipCentralHeader(name, data.length, crc, offset));
    parts.push(local, data);
    offset += local.length + data.length;
  }
  const cd = Buffer.concat(central);
  const zip = Buffer.concat([...parts, cd, zipEnd(files.length, cd.length, offset)]);

  // read it back the way the app does: end record → central directory → local header → data
  const end = zip.length - 22;
  assert.equal(zip.readUInt32LE(end), 0x06054b50);
  const count = zip.readUInt16LE(end + 10);
  let p = zip.readUInt32LE(end + 16);
  const got = [];
  for (let i = 0; i < count; i++) {
    assert.equal(zip.readUInt32LE(p), 0x02014b50);
    const size = zip.readUInt32LE(p + 24);
    const nameLen = zip.readUInt16LE(p + 28);
    const local = zip.readUInt32LE(p + 42);
    const name = zip.subarray(p + 46, p + 46 + nameLen).toString('utf8');
    assert.equal(zip.readUInt32LE(local), 0x04034b50);
    const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
    got.push([name, zip.subarray(start, start + size)]);
    p += 46 + nameLen;
  }
  assert.deepEqual(got, files);
  assert.throws(() => zipEnd(70000, 0, 0), /too large/);
});

test('inkBox finds the printed area, ignores a speck of dust, keeps a blank page whole', () => {
  const w = 100;
  const h = 200;
  const page = new Uint8Array(w * h).fill(255);
  for (let y = 40; y < 160; y++) for (let x = 20; x < 80; x++) page[y * w + x] = 0; // printed block
  page[5 * w + 95] = 0; // one dark speck in the margin
  assert.deepEqual(inkBox(page, w, h, { pad: 0 }), [0.2, 0.2, 0.8, 0.8]);
  assert.deepEqual(inkBox(page, w, h), [0.185, 0.185, 0.815, 0.815]);
  assert.deepEqual(inkBox(new Uint8Array(w * h).fill(255), w, h), [0, 0, 1, 1]);
});

test('questionBands cuts a page above each 「N番」 label, ignoring heading, photos and page number', () => {
  const w = 200;
  const h = 1000;
  const page = new Uint8Array(w * h).fill(255);
  const ink = (x0, y0, x1, y1) => {
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) page[y * w + x] = 0;
  };
  ink(20, 100, 180, 102); // running head line across the page
  ink(40, 150, 60, 165); // label 1番
  ink(40, 180, 120, 400); // a photo touching the left edge (too tall to be a label)
  ink(40, 500, 60, 515); // label 2番
  ink(70, 520, 170, 700); // its text, indented
  ink(30, 880, 45, 895); // page number, further left, at the bottom
  const box = inkBox(page, w, h);
  const bands = questionBands(page, w, h, box, 2);
  assert.equal(bands.length, 2);
  assert.equal(bands[0][0], box[1]); // first band keeps the heading
  assert.ok(Math.abs(bands[1][0] - 0.492) < 0.003, `second band starts just above 2番: ${bands[1][0]}`);
  assert.equal(bands[0][1], bands[1][0]);
  assert.ok(bands[1][1] < 0.88, 'page number left out');
  assert.equal(questionBands(page, w, h, box, 3), null); // only two labels on the page
});

test('zipEntries keeps the index, pages and audio, drops the build state', () => {
  assert.deepEqual(zipEntries(['.state.json', 'audio/a002.mp3', 'book.json', 'pages/p0010.jpg', 'pages/p0002.jpg', 'audio/a001.mp3', 'notes.txt']), [
    'audio/a001.mp3',
    'audio/a002.mp3',
    'book.json',
    'pages/p0002.jpg',
    'pages/p0010.jpg',
  ]);
});

test('kindOf sorts files into what the import does with them', () => {
  assert.equal(kindOf('a/b/Book.PDF'), 'pdf');
  assert.equal(kindOf('scan_001.JPG'), 'image');
  assert.equal(kindOf('CD1/Track 01.mp3'), 'audio');
  assert.equal(kindOf('CD1/track01.wma'), 'audioConvert');
  assert.equal(kindOf('book.zip'), 'archive');
  assert.equal(kindOf('readme.txt'), 'other');
  assert.equal(kindOf('noextension'), 'other');
});

test('naturalCompare puts track 2 before track 10, also with full-width digits', () => {
  const names = ['track10.mp3', 'track2.mp3', 'Track1.mp3', '第１０回.pdf', '第２回.pdf'];
  assert.deepEqual([...names].sort(naturalCompare), ['track1.mp3', 'track2.mp3', 'track10.mp3', '第２回.pdf', '第１０回.pdf'].map((n) => names.find((x) => x.toLowerCase() === n.toLowerCase())));
});

test('bookId is folder-safe and differs for two Japanese titles', () => {
  assert.match(bookId('BJT Official Guide 2019.pdf'), /^bjt-official-guide-2019-[a-z0-9]{6}$/);
  const a = bookId('ビジネス日本語能力テスト 公式模擬テスト');
  const b = bookId('ビジネス日本語能力テスト 聴解問題集');
  assert.match(a, /^book-[a-z0-9]{6}$/);
  assert.notEqual(a, b);
  assert.equal(a, bookId('ビジネス日本語能力テスト 公式模擬テスト'));
});

test('groupBooks: a top folder or a top-level PDF is one book; the pack and stray files are ignored', () => {
  const books = groupBooks([
    'Guide/book.pdf',
    'Guide/CD/track10.mp3',
    'Guide/CD/track2.mp3',
    'Guide/CD/old.wma',
    'Guide/readme.txt',
    'Scans/p2.jpg',
    'Scans/p10.jpg',
    'Scans/p1.jpg',
    'Single.pdf',
    'more.zip',
    'notes.txt',
    '_pack/x/book.json',
    '_inventory.json',
  ]);
  assert.deepEqual(books.map((b) => b.name), ['Guide', 'more.zip', 'Scans', 'Single']);
  const guide = books[0];
  assert.deepEqual(guide.pdfs, ['Guide/book.pdf']);
  assert.deepEqual(guide.audio, ['Guide/CD/track2.mp3', 'Guide/CD/track10.mp3']);
  assert.deepEqual(guide.audioConvert, ['Guide/CD/old.wma']);
  assert.deepEqual(guide.other, ['Guide/readme.txt']);
  assert.deepEqual(books[2].images, ['Scans/p1.jpg', 'Scans/p2.jpg', 'Scans/p10.jpg']);
  assert.deepEqual(books[1].archives, ['more.zip']);
});

test('output names are zero-padded so they sort', () => {
  assert.equal(pageFile(7), 'pages/p0007.jpg');
  assert.equal(audioFile(12, '.MP3'), 'audio/a012.mp3');
});

test('seconds reads numbers and m:ss / h:mm:ss', () => {
  assert.equal(seconds(65), 65);
  assert.equal(seconds('1:05'), 65);
  assert.equal(seconds('1:02:03'), 3723);
  assert.equal(seconds('abc'), null);
  assert.equal(seconds(-1), null);
});

const book = (questions, extra = {}) => ({
  id: 'b',
  title: 'B',
  pages: 50,
  audio: [{ file: 'audio/a001.mp3', seconds: 600 }],
  tests: [{ id: 't1', title: '第1回', questions, ...extra }],
});
const listen = (no, at, answer = 1) => ({ no, section: 'bamen', page: 5, audio: 'audio/a001.mp3', at, answer });

test('validateBook accepts a sound index', () => {
  const b = book([listen(1, 0), listen(2, '1:30'), { no: 3, section: 'goi', page: 20, answer: 4 }], { answerPages: [40, 42], scriptPages: [43, 50] });
  assert.deepEqual(validateBook(b), []);
});

test('validateBook accepts an audio-only folder but not a page in it', () => {
  const cds = { id: 'cd', title: 'CD', pages: 0, audio: [{ file: 'audio/a001.mp3', seconds: 60 }], tests: [] };
  assert.deepEqual(validateBook(cds), []);
  assert.ok(validateBook({ ...cds, pages: -1 }).some((p) => p.includes('pages must be a whole number')));
  const withQ = { ...cds, tests: [{ id: 't', title: 'T', questions: [{ no: 1, section: 'bamen', page: 1, audio: 'audio/a001.mp3', answer: 1 }] }] };
  assert.ok(validateBook(withQ).some((p) => p.includes('page 1 is outside')));
});

test('validateBook reports what is wrong, by test and question', () => {
  const problems = validateBook(
    book(
      [
        listen(1, 100),
        listen(2, 50), // earlier than q1 in the same recording
        { no: 2, section: 'goi', page: 99, answer: 5 }, // duplicate number, page out of range, bad answer
        { no: 5, section: 'hatsugen', page: 6, answer: 2 }, // listening without audio; numbers jump
        { no: 6, section: 'goi', page: 7, answer: 1, audio: 'audio/a001.mp3' }, // reading with audio
        { no: 7, section: 'shiryo', page: 8, answer: 1, audio: 'audio/zzz.mp3' },
        { no: 8, section: 'bamen', page: 8, answer: 1, audio: 'audio/a001.mp3', at: 700 }, // past the end
        { no: 9, section: 'nope', page: 8, answer: 1 },
      ],
      { answerPages: [45, 60] },
    ),
  );
  const has = (s) => assert.ok(problems.some((p) => p.includes(s)), `expected a problem containing "${s}" in:\n${problems.join('\n')}`);
  has('q2: starts before q1');
  has('q2: duplicate question number');
  has('page 99 is outside 1–50');
  has('answer must be 1–4');
  has('q5: a listening question needs its audio file');
  has('question numbers jump from 2 to 5');
  has('q6: a reading question has no audio');
  has('q7: audio "audio/zzz.mp3" is not in the book');
  has('q8: starts at 700s');
  has('q9: unknown section "nope"');
  has('answerPages');
});

test('mergeBook keeps the hand-written index and titles, refreshes pages and audio', () => {
  const existing = { id: 'b', title: 'My title', pages: 10, audio: [{ file: 'audio/a001.mp3', title: 'CD1 第1回 聴解' }], tests: [{ id: 't1' }], notes: 'n' };
  const built = { id: 'b', title: 'folder name', pages: 30, sources: [{ file: 'x.pdf' }], audio: [{ file: 'audio/a001.mp3', seconds: 9, title: 'track1' }, { file: 'audio/a002.mp3', seconds: 8, title: 'track2' }] };
  const merged = mergeBook(existing, built);
  assert.equal(merged.title, 'My title');
  assert.equal(merged.pages, 30);
  assert.deepEqual(merged.tests, [{ id: 't1' }]);
  assert.deepEqual(merged.audio.map((a) => a.title), ['CD1 第1回 聴解', 'track2']);
  assert.equal(merged.notes, 'n');
  assert.deepEqual(mergeBook(null, built).tests, []);
});
