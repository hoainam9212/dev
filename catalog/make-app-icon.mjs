// Icon app (Task 12): app-icon-source.jpg (mẫu 20 của Gemini: mèo là anh đẩy xe chở dê là em, nền xanh lá)
// → adaptive icon Android: lớp trước (nhân vật, nền trong suốt), lớp nền dải xanh (vector), lớp monochrome.
//   node make-app-icon.mjs            → ghi vào android/app/src/main/res/
//   node make-app-icon.mjs --preview  → thêm C:/tmp/icon/preview.png (mặt nạ tròn / squircle, cỡ 48 dp)
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const RES = here("../android/app/src/main/res/");
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const CANVAS_DP = 108;
const CONTENT_DP = 64; // nhân vật nằm gọn trong vùng an toàn 66 dp

const src = sharp(here("./app-icon-source.jpg"));
const { width: W, height: H } = await src.metadata();
const { data } = await src.clone().ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { data: soft } = await src.clone().greyscale().blur(1.2).raw().toBuffer({ resolveWithObject: true });
const px = (x, y) => (y * W + x) * 4;

// Khung icon vuông bo góc = vùng không trắng.
let x0 = W, y0 = H, x1 = 0, y1 = 0;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const o = px(x, y);
  if (data[o + 1] - Math.min(data[o], data[o + 2]) > 18) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
}
const S = Math.min(x1 - x0, y1 - y0);

// Màu nền: lấy ở góc trên-trái và dưới-phải bên trong khung.
const sample = (fx, fy) => { const o = px(Math.round(x0 + fx * S), Math.round(y0 + fy * S)); return [data[o], data[o + 1], data[o + 2]]; };
const top = sample(0.18, 0.12), bottom = sample(0.82, 0.9);

// Loang nền xanh từ mép trong của khung, chỉ qua vùng đổi sáng ít và gần màu nền.
const near = (o) => Math.min(...[top, bottom].map((c) => Math.abs(data[o] - c[0]) + Math.abs(data[o + 1] - c[1]) + Math.abs(data[o + 2] - c[2]))) < 70;
const bg = new Uint8Array(W * H);
const inset = Math.round(S * 0.06);
const stack = [];
for (let t = inset; t <= S - inset; t += 4) {
  stack.push([x0 + t, y0 + inset], [x0 + t, y1 - inset], [x0 + inset, y0 + t], [x1 - inset, y0 + t]);
}
while (stack.length) {
  const [x, y, from] = stack.pop();
  if (x < x0 || x > x1 || y < y0 || y > y1) continue;
  const p = y * W + x;
  if (bg[p]) continue;
  const o = p * 4;
  if (!near(o)) continue;
  if (from !== undefined && Math.abs(soft[p] - soft[from]) > 3) continue;
  bg[p] = 1;
  stack.push([x - 1, y, p], [x + 1, y, p], [x, y - 1, p], [x, y + 1, p]);
}

// Lớp trước: giữ điểm trong khung (lùi vào 4 %) không phải nền.
const fg = Buffer.alloc(W * H * 4);
let fx0 = W, fy0 = H, fx1 = 0, fy1 = 0;
const m = Math.round(S * 0.04);
// Góc bo của khung gốc (bán kính ~22 %) là nền trắng, không phải nhân vật.
const R = S * 0.24, cxl = x0 + R, cxr = x0 + S - R, cyt = y0 + R, cyb = y0 + S - R;
const inRounded = (x, y) => {
  const dx = x < cxl ? cxl - x : x > cxr ? x - cxr : 0;
  const dy = y < cyt ? cyt - y : y > cyb ? y - cyb : 0;
  return dx * dx + dy * dy <= (R - m) * (R - m);
};
for (let y = y0 + m; y <= y1 - m; y++) for (let x = x0 + m; x <= x1 - m; x++) {
  const p = y * W + x;
  if (bg[p] || !inRounded(x, y)) continue;
  data.copy(fg, p * 4, p * 4, p * 4 + 4);
  fx0 = Math.min(fx0, x); fx1 = Math.max(fx1, x); fy0 = Math.min(fy0, y); fy1 = Math.max(fy1, y);
}
const box = Math.max(fx1 - fx0, fy1 - fy0);
const cut = await sharp(fg, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left: fx0, top: fy0, width: fx1 - fx0 + 1, height: fy1 - fy0 + 1 })
  .png().toBuffer();

async function layer(px108, mono) {
  const content = Math.round((px108 * CONTENT_DP) / CANVAS_DP);
  let img = sharp(cut).resize(content, content, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } });
  if (mono) {
    // Bóng trắng: bỏ thêm mọi điểm gần màu nền (nền lọt qua lưới xe đẩy) để không thành một khối đặc.
    const { data: d, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < d.length; i += 4) {
      const dist = Math.min(...[top, bottom].map((c) => Math.abs(d[i] - c[0]) + Math.abs(d[i + 1] - c[1]) + Math.abs(d[i + 2] - c[2])));
      if (dist < 45) d[i + 3] = 0;
      d[i] = d[i + 1] = d[i + 2] = 255;
    }
    img = sharp(d, { raw: info });
  }
  const pad = Math.round((px108 - content) / 2);
  return sharp(await img.png().toBuffer())
    .extend({ top: pad, bottom: px108 - content - pad, left: pad, right: px108 - content - pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 90, alphaQuality: 100 });
}

const hex = (c) => "#FF" + c.map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
for (const [d, k] of Object.entries(DENSITIES)) {
  const dir = `${RES}mipmap-${d}/`;
  mkdirSync(dir, { recursive: true });
  const n = Math.round(CANVAS_DP * k);
  await (await layer(n, false)).toFile(`${dir}ic_launcher_foreground.webp`);
  await (await layer(n, true)).toFile(`${dir}ic_launcher_monochrome.webp`);
}
mkdirSync(`${RES}drawable/`, { recursive: true });
writeFileSync(`${RES}drawable/ic_launcher_background.xml`, `<?xml version="1.0" encoding="utf-8"?>
<!-- Nền icon app: dải xanh lá lấy màu từ mẫu Gemini (make-app-icon.mjs). -->
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:aapt="http://schemas.android.com/aapt"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path android:pathData="M0,0h108v108h-108z">
        <aapt:attr name="android:fillColor">
            <gradient
                android:type="linear"
                android:startX="0"
                android:startY="0"
                android:endX="108"
                android:endY="108"
                android:startColor="${hex(top)}"
                android:endColor="${hex(bottom)}" />
        </aapt:attr>
    </path>
</vector>
`);
mkdirSync(`${RES}mipmap-anydpi-v26/`, { recursive: true });
const adaptive = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@drawable/ic_launcher_background" />
    <foreground android:drawable="@mipmap/ic_launcher_foreground" />
    <monochrome android:drawable="@mipmap/ic_launcher_monochrome" />
</adaptive-icon>
`;
writeFileSync(`${RES}mipmap-anydpi-v26/ic_launcher.xml`, adaptive);
writeFileSync(`${RES}mipmap-anydpi-v26/ic_launcher_round.xml`, adaptive);
console.log(`nền ${hex(top)} → ${hex(bottom)}; nhân vật ${box}px trong khung ${S}px`);

if (process.argv.includes("--preview")) {
  // Mô phỏng launcher: nền + lớp trước 432 px, hiện vùng 72/108 ở giữa, cắt theo mặt nạ.
  const N = 432, V = Math.round((N * 72) / 108), off = (N - V) / 2;
  const grad = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${N}" height="${N}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="rgb(${top})"/><stop offset="1" stop-color="rgb(${bottom})"/></linearGradient></defs><rect width="${N}" height="${N}" fill="url(#g)"/></svg>`);
  const full = await sharp(grad).composite([{ input: await (await layer(N, false)).png().toBuffer() }]).png().toBuffer();
  const view = await sharp(full).extract({ left: off, top: off, width: V, height: V }).png().toBuffer();
  const masks = {
    circle: `<circle cx="${V / 2}" cy="${V / 2}" r="${V / 2}"/>`,
    squircle: `<rect width="${V}" height="${V}" rx="${V * 0.3}"/>`,
  };
  const shapes = [];
  for (const [name, shape] of Object.entries(masks)) {
    const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${V}" height="${V}">${shape}</svg>`);
    shapes.push(await sharp(view).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer());
  }
  const monoView = await sharp({ create: { width: V, height: V, channels: 4, background: "#2f3a33" } })
    .composite([{ input: await sharp(await (await layer(N, true)).png().toBuffer()).extract({ left: off, top: off, width: V, height: V }).png().toBuffer() }])
    .png().toBuffer();
  const big = 220, small = 72;
  const tiles = [];
  let x = 16;
  for (const s of [...shapes, monoView]) {
    tiles.push({ input: await sharp(s).resize(big, big).toBuffer(), left: x, top: 16 });
    tiles.push({ input: await sharp(s).resize(small, small).toBuffer(), left: x + (big - small) / 2, top: big + 40 });
    x += big + 24;
  }
  await sharp({ create: { width: x, height: big + small + 60, channels: 4, background: "#f4f4f0" } })
    .composite(tiles).png().toFile("C:/tmp/icon/preview.png");
  console.log("preview: C:/tmp/icon/preview.png");
}
