// File access for the book import: walking folders, reading PDFs and audio.
import fs from 'node:fs';
import path from 'node:path';
import * as mupdf from 'mupdf';
import { parseFile } from 'music-metadata';

/** Every file under `dir`, as paths relative to it with "/" separators. */
export function walk(dir, rel = '') {
  const out = [];
  for (const e of fs.readdirSync(path.join(dir, rel), { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...walk(dir, r));
    else if (e.isFile()) out.push(r);
  }
  return out;
}

/** Changes when the file is replaced or still downloading: size and modification time. */
export function signature(file) {
  const s = fs.statSync(file);
  return `${s.size}:${Math.round(s.mtimeMs)}`;
}

export function openPdf(file) {
  return mupdf.Document.openDocument(fs.readFileSync(file), 'application/pdf');
}

/**
 * Page count and whether the PDF carries real text (a text layer) or is only scanned pictures.
 * Looks at up to `sample` pages spread over the document.
 */
export function pdfInfo(file, sample = 8) {
  const doc = openPdf(file);
  try {
    const pages = doc.countPages();
    const step = Math.max(1, Math.floor(pages / sample));
    let checked = 0;
    let withText = 0;
    for (let i = 0; i < pages && checked < sample; i += step) {
      const page = doc.loadPage(i);
      const text = page.toStructuredText('preserve-whitespace').asText().replace(/\s/g, '');
      if (text.length >= 20) withText++;
      checked++;
      page.destroy();
    }
    return { pages, textLayer: checked ? withText / checked : 0 };
  } finally {
    doc.destroy();
  }
}

/** Render every page of a PDF to JPEG files `name(pageNumber)` under `outDir`, `width` pixels wide. */
export function renderPdf(file, firstPage, outDir, name, { width = 1400, quality = 72, onPage } = {}) {
  const doc = openPdf(file);
  try {
    const pages = doc.countPages();
    for (let i = 0; i < pages; i++) {
      const page = doc.loadPage(i);
      const [x0, , x1] = page.getBounds();
      const scale = width / Math.max(1, x1 - x0);
      const pix = page.toPixmap(mupdf.Matrix.scale(scale, scale), mupdf.ColorSpace.DeviceRGB, false, true);
      const target = path.join(outDir, name(firstPage + i));
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, pix.asJPEG(quality));
      pix.destroy();
      page.destroy();
      onPage?.(i + 1, pages);
    }
    return pages;
  } finally {
    doc.destroy();
  }
}

/** Length in seconds and codec of an audio file; `seconds` is 0 when it cannot be read. */
export async function audioInfo(file) {
  try {
    const m = await parseFile(file, { duration: true });
    return { seconds: Math.round((m.format.duration ?? 0) * 10) / 10, codec: m.format.codec ?? m.format.container ?? '' };
  } catch {
    return { seconds: 0, codec: '' };
  }
}

export const readJson = (file, fallback) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : fallback);
export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}
