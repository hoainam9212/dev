# Task 01 — Open data: Unihan Hán Việt + Tatoeba Vietnamese

Branch `vi/task-01`. Read `00-overview.md` first.

**Files**
- Modify: `data/scripts/sources.ts` (three sources, `zip-unihan` kind)
- Modify: `data/scripts/fetch.ts` (extract two Unihan files)
- Create: `data/src/opendata.ts`
- Test: `data/src/opendata.test.ts`

**Interfaces**
- Consumes: `parseTsvSentences`, `parseLinks` from `data/src/parse.ts` (unchanged; used by task 04).
- Produces: `parseUnihanField`, `parseUnihanVariants`, `hanVietFor`, `tatoebaVietnamese` (signatures in overview);
  raw files `raw/unihan/Unihan_Readings.txt`, `raw/unihan/Unihan_Variants.txt`, `raw/tatoeba/vie_sentences.tsv`,
  `raw/tatoeba/jpn-vie_links.tsv`.

Unihan line format (tab-separated, `#` comments): `U+4E00<TAB>kVietnamese<TAB>nhất`;
variants: `U+5B66<TAB>kTraditionalVariant<TAB>U+5B78`, `U+5B66<TAB>kZVariant<TAB>U+5B78<kHKGlyph` (a value may list
several `U+XXXX`, each optionally followed by `<source`).

- [ ] **Step 1: Write the failing test** — `data/src/opendata.test.ts`

```ts
import { parseUnihanField, parseUnihanVariants, hanVietFor, tatoebaVietnamese } from './opendata';

const READINGS = [
  '# Unihan_Readings.txt',
  'U+4E00\tkVietnamese\tnhất',
  'U+5B78\tkVietnamese\thọc',
  'U+884C\tkVietnamese\thành hàng hạnh hãng',
  'U+4E00\tkMandarin\tyī',
  '',
].join('\n');
const VARIANTS = [
  'U+5B66\tkTraditionalVariant\tU+5B78',
  'U+5B66\tkZVariant\tU+5B78<kHKGlyph',
  'U+6C17\tkSemanticVariant\tU+6C23<kFenn',
  'U+5B78\tkSimplifiedVariant\tU+5B66',
].join('\n');

it('reads one Unihan field keyed by character', () => {
  const r = parseUnihanField(READINGS, 'kVietnamese');
  expect(r.get('一')).toBe('nhất');
  expect(r.get('學')).toBe('học');
  expect(r.size).toBe(3);
});

it('lists variants traditional first, without duplicates, ignoring simplified links', () => {
  const v = parseUnihanVariants(VARIANTS);
  expect(v.get('学')).toEqual(['學']);
  expect(v.get('気')).toEqual(['氣']);
  expect(v.has('學')).toBe(false);
});

it('builds uppercase Hán Việt from the character or its variant, at most 3 readings', () => {
  const r = parseUnihanField(READINGS, 'kVietnamese');
  const v = parseUnihanVariants(VARIANTS);
  expect(hanVietFor('一', r, v)).toBe('NHẤT');
  expect(hanVietFor('学', r, v)).toBe('HỌC');
  expect(hanVietFor('行', r, v)).toBe('HÀNH, HÀNG, HẠNH');
  expect(hanVietFor('気', r, v)).toBeUndefined();
});

it('picks the shortest linked Vietnamese sentence per Japanese id', () => {
  const links = new Map([[1, [10, 11]], [2, [12]]]);
  const vie = new Map([[10, 'Xin chào bạn.'], [11, 'Chào.'], [13, 'x']]);
  const out = tatoebaVietnamese(links, vie);
  expect(out.get(1)).toBe('Chào.');
  expect(out.has(2)).toBe(false);
});
```

- [ ] **Step 2: Run it** — `npx vitest run src/opendata.test.ts` (in `data/`). Expected: FAIL, cannot resolve `./opendata`.

- [ ] **Step 3: Implement** — `data/src/opendata.ts`

```ts
const fromCode = (u: string) => String.fromCodePoint(parseInt(u.replace(/^U\+/, ''), 16));

function unihanRows(txt: string): [string, string, string][] {
  const rows: [string, string, string][] = [];
  for (const line of txt.split('\n')) {
    if (!line.startsWith('U+')) continue;
    const [code, field, value] = line.split('\t');
    if (code && field && value) rows.push([fromCode(code), field, value.trim()]);
  }
  return rows;
}

/** One Unihan field (e.g. kVietnamese) as character → raw value. */
export function parseUnihanField(txt: string, field: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const [ch, f, value] of unihanRows(txt)) if (f === field) map.set(ch, value);
  return map;
}

// Traditional first: Japanese shinjitai usually map to the traditional form Vietnamese readings are listed under.
const VARIANT_FIELDS = ['kTraditionalVariant', 'kZVariant', 'kSemanticVariant'];

/** Character → its variant characters (traditional, then z-, then semantic variants), self excluded. */
export function parseUnihanVariants(txt: string): Map<string, string[]> {
  const slots = new Map<string, string[][]>();
  for (const [ch, f, value] of unihanRows(txt)) {
    const rank = VARIANT_FIELDS.indexOf(f);
    if (rank < 0) continue;
    const found = [...value.matchAll(/U\+([0-9A-F]{4,6})/g)].map((m) => fromCode(m[1]!));
    const s = slots.get(ch) ?? VARIANT_FIELDS.map(() => [] as string[]);
    s[rank]!.push(...found);
    slots.set(ch, s);
  }
  const out = new Map<string, string[]>();
  for (const [ch, s] of slots) out.set(ch, [...new Set(s.flat())].filter((c) => c !== ch));
  return out;
}

/** Uppercase Hán Việt: the character's own kVietnamese, else the first variant that has one. Max 3 readings. */
export function hanVietFor(ch: string, readings: Map<string, string>, variants: Map<string, string[]>): string | undefined {
  const raw = readings.get(ch) ?? (variants.get(ch) ?? []).map((v) => readings.get(v)).find(Boolean);
  if (!raw) return undefined;
  const list = [...new Set(raw.split(/\s+/).filter(Boolean))].slice(0, 3);
  return list.map((r) => r.toLocaleUpperCase('vi')).join(', ');
}

/** Japanese Tatoeba id → shortest linked Vietnamese sentence. */
export function tatoebaVietnamese(links: Map<number, number[]>, vie: Map<number, string>): Map<number, string> {
  const out = new Map<number, string>();
  for (const [jpn, targets] of links) {
    const best = targets
      .map((t) => vie.get(t))
      .filter((x): x is string => !!x)
      .sort((a, b) => a.length - b.length)[0];
    if (best) out.set(jpn, best);
  }
  return out;
}
```

- [ ] **Step 4: Run it** — `npx vitest run src/opendata.test.ts`. Expected: PASS (4 tests).

- [ ] **Step 5: Sources + fetch.** In `data/scripts/sources.ts` change the kind union to
  `kind: 'plain' | 'bz2' | 'zip-kanjivg' | 'zip-unihan';` and append to `SOURCES`:

```ts
  {
    url: 'https://downloads.tatoeba.org/exports/per_language/vie/vie_sentences.tsv.bz2',
    file: 'tatoeba/vie_sentences.tsv',
    kind: 'bz2',
  },
  {
    url: 'https://downloads.tatoeba.org/exports/per_language/jpn/jpn-vie_links.tsv.bz2',
    file: 'tatoeba/jpn-vie_links.tsv',
    kind: 'bz2',
  },
  {
    url: 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip',
    file: 'unihan/.done',
    kind: 'zip-unihan',
  },
```

  In `data/scripts/fetch.ts` replace the final `} else {` (the KanjiVG branch) with `} else if (s.kind === 'zip-kanjivg') {`
  and add after that branch's closing brace:

```ts
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
```

- [ ] **Step 6: Fetch for real** — `npm run data:fetch` (repo root). Expected: `skip …` for existing files, `fetch` for
  the three new URLs, `extracted Unihan readings + variants`, `done`. Then measure coverage (record in the ledger):

```bash
cd data && npx tsx -e "
import fs from 'node:fs';
import { parseUnihanField, parseUnihanVariants, hanVietFor, tatoebaVietnamese } from './src/opendata';
import { parseTsvSentences, parseLinks } from './src/parse';
const r = parseUnihanField(fs.readFileSync('raw/unihan/Unihan_Readings.txt','utf8'), 'kVietnamese');
const v = parseUnihanVariants(fs.readFileSync('raw/unihan/Unihan_Variants.txt','utf8'));
const k = ['n5','n4','n3','n2','n1'].flatMap((l) => JSON.parse(fs.readFileSync('../client/public/content/kanji/' + l + '.json','utf8')).map((x: { char: string }) => x.char));
console.log('hanViet', k.filter((c) => hanVietFor(c, r, v)).length, '/', k.length, 'e.g.', ['学','気','国','一'].map((c) => c + '=' + hanVietFor(c, r, v)).join(' '));
const vi = tatoebaVietnamese(parseLinks(fs.readFileSync('raw/tatoeba/jpn-vie_links.tsv','utf8')), parseTsvSentences(fs.readFileSync('raw/tatoeba/vie_sentences.tsv','utf8')));
console.log('tatoeba jpn with vi', vi.size);
"
```

  Expected: most JLPT kanji covered (≥ 1,800 of 2,211), `学=HỌC`, `国=QUỐC`, `一=NHẤT`, and a
  non-zero Tatoeba count. If coverage is far lower, inspect a missing kanji's lines in `Unihan_Variants.txt` before
  continuing; the missing ones are filled by hand in task 05, so low coverage is not a blocker, only more work.

- [ ] **Step 7: Check command** → green. **Commit** `feat(data): fetch Unihan and Tatoeba Vietnamese, Hán Việt lookup`
  + STATUS line 01; ff `master`.
