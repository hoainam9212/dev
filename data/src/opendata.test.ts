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
