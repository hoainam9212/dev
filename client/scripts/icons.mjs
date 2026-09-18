// Generates PWA + Android launcher icons (PNG) without native dependencies:
// a sakura-pink rounded square with a white flower.
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
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

const PINK = [255, 111, 145];
const LIGHT = [255, 183, 197];
const WHITE = [255, 255, 255];
const YELLOW = [255, 209, 102];

/**
 * @param size canvas size
 * @param opts.shape 'rounded' | 'square' | 'circle' | 'none' (transparent background, flower only)
 * @param opts.scale flower scale (1 = default)
 */
function draw(size, opts = {}) {
  const shape = opts.shape ?? 'rounded';
  const scale = opts.scale ?? 1;
  const c = size / 2;
  const radius = size * 0.22;
  return (x, y) => {
    if (shape === 'rounded') {
      const dx = Math.max(Math.abs(x - c) - (c - radius), 0);
      const dy = Math.max(Math.abs(y - c) - (c - radius), 0);
      if (Math.hypot(dx, dy) > radius) return [0, 0, 0, 0];
    } else if (shape === 'circle') {
      if (Math.hypot(x - c, y - c) > c) return [0, 0, 0, 0];
    }
    for (let k = 0; k < 5; k++) {
      const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
      const px = c + Math.cos(a) * size * 0.2 * scale;
      const py = c + Math.sin(a) * size * 0.2 * scale;
      if (Math.hypot(x - px, y - py) < size * 0.16 * scale) return [...WHITE, 255];
    }
    if (Math.hypot(x - c, y - c) < size * 0.07 * scale) return [...YELLOW, 255];
    if (shape === 'none') return [0, 0, 0, 0];
    const t = y / size;
    return [Math.round(PINK[0] * (1 - t) + LIGHT[0] * t), Math.round(PINK[1] * (1 - t) + LIGHT[1] * t), Math.round(PINK[2] * (1 - t) + LIGHT[2] * t), 255];
  };
}

for (const size of [192, 512]) {
  fs.writeFileSync(path.join(out, `icon-${size}.png`), png(size, draw(size)));
  console.log('wrote', `icon-${size}.png`);
}
fs.writeFileSync(path.join(out, 'icon-maskable-512.png'), png(512, draw(512, { shape: 'square', scale: 0.8 })));
console.log('wrote icon-maskable-512.png');

// Android launcher icons (if the Capacitor android project exists)
const res = path.join(root, 'android', 'app', 'src', 'main', 'res');
if (fs.existsSync(res)) {
  const densities = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
  for (const [d, size] of Object.entries(densities)) {
    const dir = path.join(res, `mipmap-${d}`);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'ic_launcher.png'), png(size, draw(size, { shape: 'square' })));
    fs.writeFileSync(path.join(dir, 'ic_launcher_round.png'), png(size, draw(size, { shape: 'circle' })));
    // adaptive foreground: 108dp canvas, safe zone is the inner 66dp → draw flower at ~0.55 scale
    const fg = Math.round(size * 2.25);
    fs.writeFileSync(path.join(dir, 'ic_launcher_foreground.png'), png(fg, draw(fg, { shape: 'none', scale: 0.55 })));
  }
  const anydpi = path.join(res, 'mipmap-anydpi-v26');
  fs.mkdirSync(anydpi, { recursive: true });
  const adaptive = `<?xml version="1.0" encoding="utf-8"?>\n<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">\n    <background android:drawable="@color/ic_launcher_background"/>\n    <foreground android:drawable="@mipmap/ic_launcher_foreground"/>\n</adaptive-icon>\n`;
  fs.writeFileSync(path.join(anydpi, 'ic_launcher.xml'), adaptive);
  fs.writeFileSync(path.join(anydpi, 'ic_launcher_round.xml'), adaptive);
  const values = path.join(res, 'values');
  fs.mkdirSync(values, { recursive: true });
  fs.writeFileSync(path.join(values, 'ic_launcher_background.xml'), `<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#FF8FB1</color>\n</resources>\n`);
  console.log('wrote android launcher icons');
}
