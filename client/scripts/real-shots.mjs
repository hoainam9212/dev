// Tách ảnh chụp Office thật từ file Excel người dùng gom lại (mỗi sheet một ảnh, đúng thứ tự
// SHOTS[app] bên dưới) rồi ghi vào client/public/images/real/.
//
//   node client/scripts/real-shots.mjs excel "đường/dẫn/anh-excel.xlsx"
//   node client/scripts/real-shots.mjs "đường/dẫn/anh-word.xlsx"      (không ghi app = word)
//
// File .xlsx là một file zip: sheet → drawing → ảnh gốc trong xl/media. Không cần thư viện:
// tự đọc thư mục trung tâm của zip và giải nén bằng zlib có sẵn của Node.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';
import { dirname, join, posix } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Thứ tự sheet = thứ tự danh sách chụp đã gửi người dùng (`docs/real-shots-<app>.md`, test khoá
 * hai bên khớp nhau). Đổi ở đây thì đổi cả file docs.
 */
export const SHOTS = {
  word: [
    'word-01-window',
    'word-02-home',
    'word-03-line-spacing',
    'word-04-replace-dialog',
    'word-05-insert',
    'word-06-insert-table',
    'word-07-picture-format',
    'word-08-references',
    'word-09-save-as',
  ],
  excel: [
    'excel-01-window',
    'excel-02-home',
    'excel-03-fill-menu',
    'excel-04-formulas',
    'excel-05-autosum-menu',
    'excel-06-data',
    'excel-07-sort-dialog',
    'excel-08-filter-menu',
    'excel-09-insert',
    'excel-10-column-menu',
    'excel-11-save-as',
  ],
  ppt: ['ppt-01-window', 'ppt-02-home', 'ppt-03-layout-menu', 'ppt-04-insert', 'ppt-05-shapes-menu'],
};

/** argv sau tên script. Không ghi app thì là 'word' (cách gọi cũ vẫn chạy). */
export function parseArgs(argv) {
  const [first, second] = argv;
  if (!first) throw new Error('Cách dùng: node client/scripts/real-shots.mjs [word|excel|ppt] <file.xlsx>');
  if (second === undefined) return { app: 'word', file: first };
  if (!Object.hasOwn(SHOTS, first)) throw new Error(`App "${first}" không có: chỉ nhận word, excel hoặc ppt.`);
  return { app: first, file: second };
}

function unzip(buf) {
  let eocd = buf.length - 22;
  while (eocd >= 0 && buf.readUInt32LE(eocd) !== 0x06054b50) eocd--;
  if (eocd < 0) throw new Error('Không phải file .xlsx (không thấy cấu trúc zip).');
  const count = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let i = 0; i < count; i++) {
    const method = buf.readUInt16LE(p + 10);
    const size = buf.readUInt32LE(p + 20);
    const nameLen = buf.readUInt16LE(p + 28);
    const extraLen = buf.readUInt16LE(p + 30);
    const commentLen = buf.readUInt16LE(p + 32);
    const local = buf.readUInt32LE(p + 42);
    const name = buf.toString('utf8', p + 46, p + 46 + nameLen);
    const dataAt = local + 30 + buf.readUInt16LE(local + 26) + buf.readUInt16LE(local + 28);
    const raw = buf.subarray(dataAt, dataAt + size);
    files.set(name, () => (method === 8 ? inflateRawSync(raw) : raw));
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

const text = (files, name) => {
  const get = files.get(name);
  if (!get) throw new Error(`Thiếu ${name} trong file Excel.`);
  return get().toString('utf8');
};

/** Map Id → đường dẫn tuyệt đối trong zip, từ một file .rels. */
function rels(files, owner) {
  const relsName = posix.join(posix.dirname(owner), '_rels', `${posix.basename(owner)}.rels`);
  if (!files.has(relsName)) return new Map();
  const out = new Map();
  for (const m of text(files, relsName).matchAll(/<Relationship\b[^>]*>/g)) {
    const id = /Id="([^"]+)"/.exec(m[0])?.[1];
    const target = /Target="([^"]+)"/.exec(m[0])?.[1];
    if (id && target) out.set(id, target.startsWith('/') ? target.slice(1) : posix.normalize(posix.join(posix.dirname(owner), target)));
  }
  return out;
}

/** Ảnh trong từng sheet, theo đúng thứ tự tab sheet trong sổ. */
export function imagesBySheet(buf) {
  const files = unzip(buf);
  const book = 'xl/workbook.xml';
  const bookRels = rels(files, book);
  const sheets = [...text(files, book).matchAll(/<sheet\b[^>]*>/g)].map((m) => ({
    name: /name="([^"]+)"/.exec(m[0])?.[1] ?? '?',
    path: bookRels.get(/r:id="([^"]+)"/.exec(m[0])?.[1] ?? ''),
  }));
  return sheets.map(({ name, path }) => {
    const images = [];
    for (const drawing of rels(files, path).values()) {
      if (!drawing.includes('drawings/')) continue;
      const media = rels(files, drawing);
      for (const m of text(files, drawing).matchAll(/r:embed="([^"]+)"/g)) {
        const target = media.get(m[1]);
        if (target && files.has(target)) images.push({ ext: posix.extname(target), data: files.get(target)() });
      }
    }
    return { name, images };
  });
}

function pngSize(data) {
  return data.readUInt32BE(0) === 0x89504e47 ? `${data.readUInt32BE(16)}×${data.readUInt32BE(20)}` : '?';
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  let args;
  try {
    args = parseArgs(process.argv.slice(2));
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
  const { app, file: xlsx } = args;
  const shots = SHOTS[app];
  const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images', 'real');
  mkdirSync(outDir, { recursive: true });
  // Sheet trống (người dùng lỡ để thừa) bị bỏ qua, không được chiếm một số thứ tự — nếu không
  // mọi ảnh sau nó đều mang nhầm tên.
  const sheets = imagesBySheet(readFileSync(xlsx)).filter((sheet) => {
    if (sheet.images.length) return true;
    console.warn(`⚠ Sheet "${sheet.name}": không có ảnh, bỏ qua`);
    return false;
  });
  sheets.forEach((sheet, i) => {
    const base = shots[i] ?? `${app}-extra-${String(i + 1).padStart(2, '0')}`;
    sheet.images.forEach((img, j) => {
      const file = `${base}${j ? `-${j + 1}` : ''}${img.ext}`;
      writeFileSync(join(outDir, file), img.data);
      console.log(`Sheet "${sheet.name}" → ${file} (${pngSize(img.data)})`);
    });
  });
  if (sheets.length !== shots.length) console.warn(`⚠ File có ${sheets.length} sheet có ảnh, danh sách chụp ${app} có ${shots.length}.`);
}
