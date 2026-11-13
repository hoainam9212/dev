import { describe, expect, it } from 'vitest';
import { readStoredZip } from './zip';
import { makeZip } from './zip.testutil';

const enc = new TextEncoder();

const text = async (b: Blob) => new TextDecoder().decode(new Uint8Array(await b.arrayBuffer()));

describe('readStoredZip', () => {
  it('finds every file and gives its bytes back', async () => {
    const zip = makeZip([
      ['book.json', enc.encode('{"id":"b"}')],
      ['pages/p0001.jpg', new Uint8Array([9, 8, 7])],
      ['音声/a.mp3', new Uint8Array()],
    ]);
    const files = await readStoredZip(zip);
    expect([...files.keys()]).toEqual(['book.json', 'pages/p0001.jpg', '音声/a.mp3']);
    expect(await text(files.get('book.json')!)).toBe('{"id":"b"}');
    expect([...new Uint8Array(await files.get('pages/p0001.jpg')!.arrayBuffer())]).toEqual([9, 8, 7]);
    expect(files.get('音声/a.mp3')!.size).toBe(0);
  });

  it('refuses a file that is not a zip', async () => {
    await expect(readStoredZip(new Blob([enc.encode('hello, this is not a zip at all..')]))).rejects.toThrow('not-zip');
  });

  it('refuses a compressed zip (the app only reads what the tool writes)', async () => {
    await expect(readStoredZip(makeZip([['book.json', enc.encode('{}')]], 8))).rejects.toThrow('compressed');
  });
});
