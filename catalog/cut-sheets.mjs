// Cắt tấm 2×2 của Gemini (sheets/NN.jpg) thành 4 ảnh món raw/<id>.png nền trong suốt.
//   node cut-sheets.mjs            → mọi tấm có trong sheets/
//   node cut-sheets.mjs 3 7        → chỉ tấm 3 và 7
// Nền: loang từ mép ô qua các điểm xám nhạt (ít màu, sáng) — nền trắng thành trong suốt, bóng đổ xám
// thành bóng đen mờ (giữ cảm giác đặt trên mặt bàn khi app vẽ lên nền pastel). Rồi cắt sát món, chừa lề
// 6 %, đặt vào khung vuông 512 px. Tấm vẽ lại cho món sai: sheets/NN.jpg với n ≥ 100 trong sheets.json.
import sharp from "sharp";
import { readFileSync, readdirSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

const OUT = 512;
const MARGIN = 0.06;
const manifest = JSON.parse(readFileSync(new URL("./sheets.json", import.meta.url)));
const only = process.argv.slice(2).map(Number);
mkdirSync(new URL("./raw/", import.meta.url), { recursive: true });

const STEP = Number(process.env.STEP ?? 2);
const isBackground =(r, g, b) => Math.max(r, g, b) - Math.min(r, g, b) < 18 && (r + g + b) / 3 > 168;

async function cutCell(file, left, top, size, id) {
  const inset = Math.round(size * 0.01);
  const w = size - 2 * inset;
  const { data } = await sharp(file)
    .extract({ left: left + inset, top: top + inset, width: w, height: w })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Độ sáng đã làm mịn (bớt nhiễu JPEG) để dò mép.
  const { data: soft } = await sharp(file)
    .extract({ left: left + inset, top: top + inset, width: w, height: w })
    .greyscale()
    .blur(1.2)
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Loang từ mép ô, chỉ bước sang điểm kế bên khi độ sáng đổi rất ít: nền và bóng đổ chuyển mượt, còn mép
  // món (kể cả món trắng như đậu phụ, hộp sữa) luôn có bước nhảy nên chặn được loang.
  const seen = new Uint8Array(w * w);
  const stack = [];
  for (let i = 0; i < w; i++) stack.push(i, -1, (w - 1) * w + i, -1, i * w, -1, i * w + w - 1, -1);
  while (stack.length) {
    const from = stack.pop();
    const p = stack.pop();
    if (seen[p]) continue;
    const o = p * 4;
    if (!isBackground(data[o], data[o + 1], data[o + 2])) continue;
    if (from >= 0 && Math.abs(soft[p] - soft[from]) > STEP) continue;
    seen[p] = 1;
    const x = p % w, y = (p / w) | 0;
    if (x > 0) stack.push(p - 1, p);
    if (x < w - 1) stack.push(p + 1, p);
    if (y > 0) stack.push(p - w, p);
    if (y < w - 1) stack.push(p + w, p);
  }

  // Độ sáng nền thật của ô (Gemini không ra trắng tinh, đậm nhạt theo góc): lấy theo từng hàng ở hai mép.
  const rowBg = new Float32Array(w);
  for (let y = 0; y < w; y++) {
    const a = y * w * 4, b = (y * w + w - 1) * 4;
    rowBg[y] = Math.max(data[a] + data[a + 1] + data[a + 2], data[b] + data[b + 1] + data[b + 2]) / 3;
  }

  let minX = w, minY = w, maxX = -1, maxY = -1;
  for (let p = 0; p < w * w; p++) {
    const o = p * 4;
    if (seen[p]) {
      const light = (data[o] + data[o + 1] + data[o + 2]) / 3;
      const a = Math.max(0, Math.min(110, (rowBg[(p / w) | 0] - light - 8) * 2.4));
      data[o] = data[o + 1] = data[o + 2] = 0;
      data[o + 3] = a;
    } else {
      const x = p % w, y = (p / w) | 0;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) throw new Error(`${id}: ô trống`);

  // Khung vuông quanh món (chỉ tính phần không phải nền), chừa lề.
  const box = Math.max(maxX - minX, maxY - minY) * (1 + 2 * MARGIN);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const side = Math.min(w, Math.round(box));
  const l = Math.round(Math.max(0, Math.min(w - side, cx - side / 2)));
  const t = Math.round(Math.max(0, Math.min(w - side, cy - side / 2)));

  await sharp(data, { raw: { width: w, height: w, channels: 4 } })
    .extract({ left: l, top: t, width: side, height: side })
    .resize(OUT, OUT)
    .png()
    .toFile(here(`./raw/${id}.png`));
}

const files = readdirSync(new URL("./sheets/", import.meta.url)).filter((f) => /^\d+\.(jpg|png)$/.test(f));
for (const f of files) {
  const n = parseInt(f, 10);
  if (only.length && !only.includes(n)) continue;
  const sheet = manifest.find((s) => s.n === n);
  if (!sheet) { console.warn(`bỏ qua ${f}: không có trong sheets.json`); continue; }
  const path = here(`./sheets/${f}`);
  const { width, height } = await sharp(path).metadata();
  // Ô có thể chữ nhật (Gemini đôi khi ra ảnh ngang): lấy hình vuông giữa ô, món luôn nằm giữa ô.
  const cw = Math.floor(width / 2), ch = Math.floor(height / 2);
  const half = Math.min(cw, ch);
  const dx = Math.floor((cw - half) / 2), dy = Math.floor((ch - half) / 2);
  const cells = [[dx, dy], [cw + dx, dy], [dx, ch + dy], [cw + dx, ch + dy]];
  for (let i = 0; i < 4; i++) {
    const id = sheet.ids[i];
    if (!id) continue;
    await cutCell(path, cells[i][0], cells[i][1], half, id);
  }
  console.log(`tấm ${n}: ${sheet.ids.filter(Boolean).join(", ")}`);
}
