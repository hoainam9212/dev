// items.csv + raw/<id>.png → android assets: catalog/items.json + catalog/icons/<id>.webp (256 px, nền trong suốt).
//   node build-catalog.mjs           → ghi items.json, đổi ảnh sang webp, xoá icon thừa
//   node build-catalog.mjs --check   → chỉ in số món và món thiếu ảnh
import sharp from "sharp";
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const ASSETS = here("../android/app/src/main/assets/catalog/");
const ICONS = `${ASSETS}icons/`;
const SIZE = 256;
const check = process.argv.includes("--check");

const [header, ...rows] = readFileSync(here("./items.csv"), "utf8").trim().split(/\r?\n/);
const cols = header.split(",");
const items = rows.map((line, i) => {
  const cells = line.split(",");
  if (cells.length !== cols.length) throw new Error(`items.csv dòng ${i + 2}: ${cells.length} cột, cần ${cols.length}`);
  const r = Object.fromEntries(cols.map((c, j) => [c, cells[j].trim()]));
  return {
    id: r.id,
    name: r.name,
    aliases: r.aliases ? r.aliases.split("|") : [],
    nameJa: r.nameJa || undefined,
    category: r.category,
    unit: r.unit,
    defaultQty: Number(r.defaultQty),
    step: Number(r.step),
    emoji: r.emoji || undefined,
    imageAsset: `catalog/icons/${r.id}.webp`,
  };
});

const missing = items.filter((it) => !existsSync(here(`./raw/${it.id}.png`))).map((it) => it.id);
console.log(`${items.length} món, thiếu ${missing.length} ảnh${missing.length ? ": " + missing.join(", ") : ""}`);
if (check) process.exit(missing.length ? 1 : 0);
if (missing.length) throw new Error("còn món thiếu ảnh — vẽ thêm trước khi build");

mkdirSync(ICONS, { recursive: true });
const keep = new Set(items.map((it) => `${it.id}.webp`));
for (const f of readdirSync(ICONS)) if (!keep.has(f)) rmSync(ICONS + f);

let bytes = 0;
for (const it of items) {
  const info = await sharp(here(`./raw/${it.id}.png`))
    .resize(SIZE, SIZE)
    .webp({ quality: 82, alphaQuality: 90, effort: 6 })
    .toFile(`${ICONS}${it.id}.webp`);
  bytes += info.size;
}

// Một món một dòng như bản Task 02 để diff dễ đọc.
const json = "[\n" + items.map((it) => "  " + JSON.stringify(it).replace(/":/g, '": ').replace(/,"/g, ', "')).join(",\n") + "\n]\n";
writeFileSync(`${ASSETS}items.json`, json);
console.log(`items.json + ${items.length} webp (${(bytes / 1024).toFixed(0)} KB)`);
