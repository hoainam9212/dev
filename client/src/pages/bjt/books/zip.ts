// Reads the "stored" (uncompressed) zip that tools/book-import writes for one book.
// Each file comes back as a slice of the picked file, so a 80 MB book is never copied into memory at once.

const END = 0x06054b50;
const CENTRAL = 0x02014b50;
const LOCAL = 0x04034b50;

const view = async (blob: Blob, from: number, to: number) => new DataView(await blob.slice(from, to).arrayBuffer());

/**
 * Map of path → Blob for every file in the zip.
 * Throws `not-zip` for anything else and `compressed` for a zip the tool did not write.
 */
export async function readStoredZip(zip: Blob): Promise<Map<string, Blob>> {
  // the end record is the last 22 bytes (the tool writes no comment); allow a short comment anyway
  const tailStart = Math.max(0, zip.size - 22 - 1024);
  const tail = await view(zip, tailStart, zip.size);
  let end = -1;
  for (let p = tail.byteLength - 22; p >= 0; p--) {
    if (tail.getUint32(p, true) === END) {
      end = p;
      break;
    }
  }
  if (end < 0) throw new Error('not-zip');
  const count = tail.getUint16(end + 10, true);
  const cdSize = tail.getUint32(end + 12, true);
  const cdOffset = tail.getUint32(end + 16, true);
  const cd = await view(zip, cdOffset, cdOffset + cdSize);
  const names = new TextDecoder();
  const files = new Map<string, Blob>();
  let p = 0;
  for (let i = 0; i < count; i++) {
    if (cd.getUint32(p, true) !== CENTRAL) throw new Error('not-zip');
    const method = cd.getUint16(p + 10, true);
    const size = cd.getUint32(p + 20, true);
    const nameLen = cd.getUint16(p + 28, true);
    const extraLen = cd.getUint16(p + 30, true);
    const commentLen = cd.getUint16(p + 32, true);
    const local = cd.getUint32(p + 42, true);
    const name = names.decode(new Uint8Array(cd.buffer, cd.byteOffset + p + 46, nameLen));
    if (method !== 0) throw new Error('compressed');
    const lh = await view(zip, local, local + 30);
    if (lh.getUint32(0, true) !== LOCAL) throw new Error('not-zip');
    const start = local + 30 + lh.getUint16(26, true) + lh.getUint16(28, true);
    if (!name.endsWith('/')) files.set(name, zip.slice(start, start + size));
    p += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}
