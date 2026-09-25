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

it('follows kJapaneseOldVariant from shinjitai to the old form', () => {
  const r = parseUnihanField('U+5713\tkVietnamese\tviên', 'kVietnamese');
  const v = parseUnihanVariants('U+5186\tkJapaneseOldVariant\tU+5713');
  expect(hanVietFor('円', r, v)).toBe('VIÊN');
});

it('picks the shortest linked Vietnamese sentence per Japanese id', () => {
  const links = new Map([[1, [10, 11]], [2, [12]]]);
  const vie = new Map([[10, 'Xin chào bạn.'], [11, 'Chào.'], [13, 'x']]);
  const out = tatoebaVietnamese(links, vie);
  expect(out.get(1)).toBe('Chào.');
  expect(out.has(2)).toBe(false);
});
