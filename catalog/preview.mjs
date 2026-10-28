// Ghép ảnh raw/<id>.png lên nền pastel để soi: node preview.mjs out.png id1 id2 ...
import sharp from "sharp";
const [out, ...ids] = process.argv.slice(2);
const per = Number(process.env.PER ?? 6), S = Number(process.env.S ?? 200), G = 12;
const rows = Math.ceil(ids.length / per);
const tiles = await Promise.all(ids.map(async (id, i) => ({
  input: await sharp(`raw/${id}.png`).resize(S, S).toBuffer(),
  left: G + (i % per) * (S + G), top: G + Math.floor(i / per) * (S + G),
})));
await sharp({ create: { width: G + per * (S + G), height: G + rows * (S + G), channels: 4, background: { r: 232, g: 244, b: 226, alpha: 1 } } })
  .composite(tiles).png().toFile(out);
