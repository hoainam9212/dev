// Đổi toạ độ UI Automation (file .tsv của lib.ps1) thành khung % cho bước realShot.
//
//   node client/scripts/office-shots/mark.mjs <raw.tsv> <cropX> <cropY> <W> <H> "Tên[@Kiểu][#thứ tự]" ...
//
// cropX/cropY/W/H là vùng đã cắt bằng crop.ps1. "Tên@ListItem#1" = phần tử thứ hai tên đó, kiểu ListItem.
import { readFileSync } from 'node:fs';

const [tsv, cx, cy, W, H, ...names] = process.argv.slice(2);
const rows = readFileSync(tsv, 'utf8').replace(/^﻿/, '').split(/\r?\n/).filter(Boolean)
  .map((l) => { const [n, t, x, y, w, h] = l.split('\t'); return { n, t, x: +x - cx, y: +y - cy, w: +w, h: +h }; });
const r1 = (v) => Math.round(v * 10) / 10;
for (const q of names) {
  const m = q.match(/^(.*?)(?:@(\w+))?(?:#(\d+))?$/);
  const hits = rows.filter((r) => r.n === m[1] && (!m[2] || r.t === m[2]) && r.x >= 0 && r.y >= 0 && r.x + r.w <= W && r.y + r.h <= H);
  const uniq = hits.filter((r, i) => hits.findIndex((o) => o.x === r.x && o.y === r.y && o.w === r.w && o.h === r.h) === i);
  const r = uniq[+(m[3] ?? 0)];
  if (!r) { console.log(`${q}: không thấy (${uniq.length} kết quả)`); continue; }
  console.log(`${q} [${r.t} ${r.x},${r.y} ${r.w}x${r.h}] → { x: ${r1(r.x / W * 100)}, y: ${r1(r.y / H * 100)}, w: ${r1(r.w / W * 100)}, h: ${r1(r.h / H * 100)} }${uniq.length > 1 ? `  (${uniq.length} kết quả)` : ''}`);
}
