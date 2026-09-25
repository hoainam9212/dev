import fs from 'node:fs';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { Readable } from 'node:stream';
import unbzip2 from 'unbzip2-stream';
import AdmZip from 'adm-zip';
import { RAW_DIR, SOURCES } from './sources';

async function download(url: string): Promise<Readable> {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`${res.status} ${url}`);
  return Readable.fromWeb(res.body as never);
}

async function main() {
  for (const s of SOURCES) {
    const target = path.join(RAW_DIR, s.file);
    if (fs.existsSync(target)) {
      console.log('skip', s.file);
      continue;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    console.log('fetch', s.url);
    if (s.kind === 'plain') {
      await pipeline(await download(s.url), fs.createWriteStream(target + '.part'));
      fs.renameSync(target + '.part', target);
    } else if (s.kind === 'bz2') {
      await pipeline(await download(s.url), unbzip2(), fs.createWriteStream(target + '.part'));
      fs.renameSync(target + '.part', target);
    } else if (s.kind === 'zip-kanjivg') {
      const zipPath = target + '.zip';
      await pipeline(await download(s.url), fs.createWriteStream(zipPath));
      const zip = new AdmZip(zipPath);
      const outDir = path.join(path.dirname(target), 'kanji');
      fs.mkdirSync(outDir, { recursive: true });
      let n = 0;
      for (const e of zip.getEntries()) {
        if (e.isDirectory || !/(^|\/)kanji\/[0-9a-f]{5}\.svg$/.test(e.entryName)) continue;
        fs.writeFileSync(path.join(outDir, path.basename(e.entryName)), e.getData());
        n++;
      }
      fs.unlinkSync(zipPath);
      fs.writeFileSync(target, `${n} files\n`);
      console.log('extracted', n, 'svg');
    } else {
      const zipPath = target + '.zip';
      await pipeline(await download(s.url), fs.createWriteStream(zipPath));
      const zip = new AdmZip(zipPath);
      const outDir = path.dirname(target);
      for (const name of ['Unihan_Readings.txt', 'Unihan_Variants.txt']) {
        const e = zip.getEntry(name);
        if (!e) throw new Error(`${name} missing in ${s.url}`);
        fs.writeFileSync(path.join(outDir, name), e.getData());
      }
      fs.unlinkSync(zipPath);
      fs.writeFileSync(target, 'ok\n');
      console.log('extracted Unihan readings + variants');
    }
  }
  console.log('done');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
