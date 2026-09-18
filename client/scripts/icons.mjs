// Generates PWA icons (PNG) without native dependencies: a sakura-pink rounded square with a white flower.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'icons');
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
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

const PINK = [255, 111, 145];
const LIGHT = [255, 183, 197];
const WHITE = [255, 255, 255];
const YELLOW = [255, 209, 102];

function draw(size) {
  const c = size / 2;
  const radius = size * 0.22;
  return (x, y) => {
    // rounded square mask
    const dx = Math.max(Math.abs(x - c) - (c - radius), 0);
    const dy = Math.max(Math.abs(y - c) - (c - radius), 0);
    if (Math.hypot(dx, dy) > radius) return [0, 0, 0, 0];
    // five petals
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
      const px = c + Math.cos(a) * size * 0.2;
      const py = c + Math.sin(a) * size * 0.2;
      if (Math.hypot(x - px, y - py) < size * 0.16) return [...WHITE, 255];
    }
    if (Math.hypot(x - c, y - c) < size * 0.07) return [...YELLOW, 255];
    const t = y / size;
    return [Math.round(PINK[0] * (1 - t) + LIGHT[0] * t), Math.round(PINK[1] * (1 - t) + LIGHT[1] * t), Math.round(PINK[2] * (1 - t) + LIGHT[2] * t), 255];
  };
}

for (const size of [192, 512]) {
  fs.writeFileSync(path.join(out, `icon-${size}.png`), png(size, draw(size)));
  console.log('wrote', `icon-${size}.png`);
}
// maskable: same art with more padding
fs.writeFileSync(path.join(out, 'icon-maskable-512.png'), png(512, (x, y) => draw(512)(x, y)));
console.log('wrote icon-maskable-512.png');
