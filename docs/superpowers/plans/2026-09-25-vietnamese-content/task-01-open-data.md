# Task 01 — Open data: two-source Hán Việt + Tatoeba Vietnamese

Branch `vi/task-01-hanviet` (redo; the first version on `vi/task-01`, 43a0d32, used Unihan `kVietnamese` and was
replaced after the audit in the spec's "Sources and precedence"). Read `00-overview.md` first.

**Files**
- Modify: `data/scripts/sources.ts` (Tatoeba vie + links, Unihan.zip, KANJIDIC2 `gz`, pinned `hanviet.csv`)
- Modify: `data/scripts/fetch.ts` (`gz` kind; Unihan zip extracts Readings + Variants)
- Create: `data/src/opendata.ts`
- Test: `data/src/opendata.test.ts`

**Interfaces**
- Consumes: `parseTsvSentences`, `parseLinks` from `data/src/parse.ts` (unchanged; used by task 04).
- Produces: everything under `// data/src/opendata.ts` in the overview; raw files `raw/kanjidic2.xml`,
  `raw/hanviet.csv`, `raw/unihan/Unihan_Readings.txt`, `raw/unihan/Unihan_Variants.txt`,
  `raw/tatoeba/vie_sentences.tsv`, `raw/tatoeba/jpn-vie_links.tsv`.

Formats:
- KANJIDIC2: `<character><literal>学</literal>…<reading r_type="vietnam">Học</reading>…</character>`; accents are
  sometimes decomposed (NFD) → normalize to NFC.
- `hanviet.csv` (header `char,hanviet,pinyin`): `學,['học'],*` or, for several readings, a quoted list
  `行,"['hành', 'hạnh']",xing2`. Pinyin is numbered with `u:` for ü; `*` means "any reading".
- Unihan: `U+5B66<TAB>kJapaneseOldVariant<TAB>U+5B78` (value may list several `U+XXXX`); `U+884C<TAB>kMandarin<TAB>xíng`.

**Rule** (`hanVietFor`): KANJIDIC2 list = `kanjidic.get(ch)`. `hanviet.csv` list = rows of the first of
`[...oldVariants(ch), ch]` that has rows, ordered with the row whose pinyin equals `pinyinNumbered(kMandarin)` of
that form first, then file order, readings flattened and deduplicated. If both lists exist and their first readings
have the same `toneKey`, `value` = the `hanviet.csv` readings whose `toneKey` KANJIDIC2 also lists, at most 3, in
KANJIDIC2's spelling, uppercase, joined with `, `. Otherwise no `value`. Both lists are always returned.

- [ ] **Step 1: Write the failing test** — replace `data/src/opendata.test.ts`:

```ts
import {
  parseUnihanField, parseJapaneseOldVariants, parseKanjidicVietnamese, parseHanVietCsv, pinyinNumbered, toneKey,
  hanVietFor, tatoebaVietnamese, type HanVietSources,
} from './opendata';

const KANJIDIC = `<kanjidic2>
<character><literal>学</literal><reading_meaning><rmgroup><reading r_type="ja_on">ガク</reading>
<reading r_type="vietnam">Học</reading></rmgroup></reading_meaning></character>
<character><literal>水</literal><reading r_type="vietnam">Thủy</reading></character>
<character><literal>楽</literal><reading r_type="vietnam">Lạc</reading><reading r_type="vietnam">Nhạc</reading></character>
<character><literal>芸</literal><reading r_type="vietnam">Vân</reading></character>
<character><literal>行</literal><reading r_type="vietnam">Hành</reading><reading r_type="vietnam">Hạnh</reading><reading r_type="vietnam">Hàng</reading><reading r_type="vietnam">Hạng</reading></character>
<character><literal>読</literal><reading r_type="vietnam">Đậu</reading><reading r_type="vietnam">Độc</reading></character>
<character><literal>滝</literal><reading r_type="vietnam">Sông</reading></character>
<character><literal>々</literal><reading r_type="ja_on">ノマ</reading></character>
</kanjidic2>`;
const CSV = [
  'char,hanviet,pinyin',
  "學,['học'],*",
  "水,['thuỷ'],*",
  "樂,['lạc'],le4",
  "樂,['nhạc'],yue4",
  "藝,['nghệ'],*",
  "芸,['vân'],*",
  '行,"[\'hàng\', \'hạng\']",hang2',
  '行,"[\'hành\', \'hạnh\']",xing2',
  "讀,['đậu'],dou4",
  '讀,"[\'đọc\', \'độc\']",du2',
  "瀧,['lang'],*",
  '',
].join('\r\n');
const VARIANTS = [
  '#\tkJapaneseOldVariant',
  'U+5B66\tkJapaneseOldVariant\tU+5B78',
  'U+5B66\tkTraditionalVariant\tU+5B78',
  'U+697D\tkJapaneseOldVariant\tU+6A02',
  'U+82B8\tkJapaneseOldVariant\tU+85DD',
  'U+8AAD\tkJapaneseOldVariant\tU+8B80',
  'U+6EDD\tkJapaneseOldVariant\tU+7027',
  'U+5F01\tkJapaneseOldVariant\tU+74E3 U+8FA8 U+8FAF',
  'U+53F6\tkTraditionalVariant\tU+8449',
].join('\n');
const READINGS = ['U+6A02\tkMandarin\tlè', 'U+884C\tkMandarin\txíng', 'U+8B80\tkMandarin\tdú', 'U+7DA0\tkMandarin\tlǜ'].join('\n');

const src = (): HanVietSources => ({
  kanjidic: parseKanjidicVietnamese(KANJIDIC),
  hanviet: parseHanVietCsv(CSV),
  oldVariants: parseJapaneseOldVariants(VARIANTS),
  mandarin: parseUnihanField(READINGS, 'kMandarin'),
});

it('parses the three sources', () => {
  const s = src();
  expect(s.kanjidic.get('学')).toEqual(['Học']);
  expect(s.kanjidic.has('々')).toBe(false);
  expect(s.hanviet.get('行')).toEqual([{ readings: ['hàng', 'hạng'], pinyin: 'hang2' }, { readings: ['hành', 'hạnh'], pinyin: 'xing2' }]);
  expect(s.oldVariants.get('学')).toEqual(['學']);
  expect(s.oldVariants.get('弁')).toEqual(['瓣', '辨', '辯']);
  expect(s.oldVariants.has('叶')).toBe(false);
});

it('numbers pinyin and compares Vietnamese independent of tone-mark placement', () => {
  expect(pinyinNumbered('xíng')).toBe('xing2');
  expect(pinyinNumbered('lǜ')).toBe('lu:4');
  expect(pinyinNumbered('de')).toBe('de5');
  expect(toneKey('thuỷ')).toBe(toneKey('Thủy'));
  expect(toneKey('hoà')).toBe(toneKey('hòa'));
  expect(toneKey('học')).not.toBe(toneKey('hóc'));
});

it('gives Hán Việt where both sources agree, in KANJIDIC2 spelling, at most 3', () => {
  const s = src();
  expect(hanVietFor('学', s).value).toBe('HỌC');
  expect(hanVietFor('水', s).value).toBe('THỦY');
  expect(hanVietFor('楽', s).value).toBe('LẠC, NHẠC');
  expect(hanVietFor('行', s).value).toBe('HÀNH, HẠNH, HÀNG');
});

it('looks shinjitai up through the Japanese old form, not the same-shape Chinese character', () => {
  const r = hanVietFor('芸', src());
  expect(r.hanviet).toEqual(['nghệ']);
  expect(r.kanjidic).toEqual(['Vân']);
  expect(r.value).toBeUndefined();
});

it('orders rows by the common Mandarin reading and leaves disagreements to the translator', () => {
  const s = src();
  expect(hanVietFor('読', s)).toEqual({ kanjidic: ['Đậu', 'Độc'], hanviet: ['đọc', 'độc', 'đậu'] });
  expect(hanVietFor('滝', s)).toEqual({ kanjidic: ['Sông'], hanviet: ['lang'] });
  expect(hanVietFor('々', s)).toEqual({ kanjidic: [], hanviet: [] });
});

it('picks the shortest linked Vietnamese sentence per Japanese id', () => {
  const links = new Map([[1, [10, 11]], [2, [12]]]);
  const vie = new Map([[10, 'Xin chào bạn.'], [11, 'Chào.'], [13, 'x']]);
  const out = tatoebaVietnamese(links, vie);
  expect(out.get(1)).toBe('Chào.');
  expect(out.has(2)).toBe(false);
});
```

- [ ] **Step 2: Run it** — `npx vitest run src/opendata.test.ts` (in `data/`). Expected: FAIL (missing exports).

- [ ] **Step 3: Implement** `data/src/opendata.ts` to the rule above (keep `parseUnihanField` and
  `tatoebaVietnamese` from the first version; drop `parseUnihanVariants`). `loadHanVietSources(rawDir)` reads
  `HANVIET_RAW` = `['kanjidic2.xml', 'hanviet.csv', 'unihan/Unihan_Variants.txt', 'unihan/Unihan_Readings.txt']`.

- [ ] **Step 4: Run it** — Expected: PASS (6 tests).

- [ ] **Step 5: Sources + fetch.** `kind: 'plain' | 'bz2' | 'gz' | 'zip-kanjivg' | 'zip-unihan'`; append the two
  Tatoeba `bz2` files (`per_language/vie/vie_sentences.tsv.bz2`, `per_language/jpn/jpn-vie_links.tsv.bz2`),
  `Unihan.zip` (`unihan/.done`), `https://www.edrdg.org/kanjidic/kanjidic2.xml.gz` (`kanjidic2.xml`, `gz`) and
  `https://raw.githubusercontent.com/ph0ngp/hanviet-pinyin-wordlist/<HANVIET_COMMIT>/hanviet.csv` (`plain`,
  `HANVIET_COMMIT = 'b9923df92c8b55f013001390e37cddd35e986dc1'`). `fetch.ts`: `gz` = download → `zlib.createGunzip()`
  → `.part` → rename; the KanjiVG branch becomes `else if (s.kind === 'zip-kanjivg')`; the last branch extracts
  `Unihan_Readings.txt` + `Unihan_Variants.txt`.

- [ ] **Step 6: Fetch for real** — `npm run data:fetch`. Expected: `skip` for existing files, `fetch` for new ones,
  `done`. Measure with a throwaway script (delete it after) over all JLPT kanji in `client/public/content/kanji/`:
  count with `value`, without, the N5 characters without, and `value` for 学 気 国 一 行 芸 読 滝 叶 机. Expected:
  ≈1,930 / 2,211 with `value`; 学=HỌC, 気=KHÍ, 国=QUỐC, 一=NHẤT, 芸 and 読 and 滝 without `value`; no value from a
  Nôm reading. Record the numbers in the ledger and STATUS.

- [ ] **Step 7: Check command** → green. **Commit** `feat(data): two-source Hán Việt lookup (KANJIDIC2 + hanviet.csv)`
  + STATUS line 01; ff `master`.
