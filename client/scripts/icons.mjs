// Tạo icon PWA (PNG) không cần thư viện native: dấu chân mèo trắng trên nền mint → sky.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'public', 'icons');
fs.mkdirSync(out, { recursive: true });

const crcTable = new Int32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c;
});
const crc32 = (buf) => {
  let c = -1;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};

function png(size, draw) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    raw[y * (size * 4 + 1)] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = draw(x, y);
      const i = y * (size * 4 + 1) + 1 + x * 4;
      raw[i] = r; raw[i + 1] = g; raw[i + 2] = b; raw[i + 3] = a;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

const TOP = [143, 227, 207];
const BOTTOM = [160, 216, 255];
const WHITE = [255, 255, 255];
// [dx, dy, r] tương đối với kích thước; phần tử đầu là đệm chân lớn (hình elip).
const PADS = [[0, 0.12, 0.2], [-0.24, -0.1, 0.085], [-0.085, -0.22, 0.085], [0.085, -0.22, 0.085], [0.24, -0.1, 0.085]];

function draw(size, { shape = 'rounded', scale = 1 } = {}) {
  const c = size / 2;
  const radius = size * 0.22;
  const s = size * scale;
  return (x, y) => {
    if (shape === 'rounded') {
      const dx = Math.max(Math.abs(x - c) - (c - radius), 0);
      const dy = Math.max(Math.abs(y - c) - (c - radius), 0);
      if (Math.hypot(dx, dy) > radius) return [0, 0, 0, 0];
    }
    for (const [i, [px, py, r]] of PADS.entries()) {
      const cx = c + px * s;
      const cy = c + py * s;
      const rr = r * s;
      const inside = i === 0 ? ((x - cx) / (rr * 1.2)) ** 2 + ((y - cy) / rr) ** 2 <= 1 : Math.hypot(x - cx, y - cy) <= rr;
      if (inside) return [...WHITE, 255];
    }
    const t = y / size;
    return [0, 1, 2].map((k) => Math.round(TOP[k] * (1 - t) + BOTTOM[k] * t)).concat(255);
  };
}

for (const size of [192, 512]) {
  fs.writeFileSync(path.join(out, `icon-${size}.png`), png(size, draw(size)));
  console.log('wrote', `icon-${size}.png`);
}
fs.writeFileSync(path.join(out, 'icon-maskable-512.png'), png(512, draw(512, { shape: 'square', scale: 0.8 })));
console.log('wrote icon-maskable-512.png');
