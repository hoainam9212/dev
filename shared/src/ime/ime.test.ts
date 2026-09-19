import { describe, it, expect } from 'vitest';
import { typeKeys } from './index';

const telex: [string, string][] = [
  ['tieengs', 'tiếng'],
  ['Vieejt Nam', 'Việt Nam'],
  ['VIEEJT', 'VIỆT'],
  ['dduowcj', 'được'],
  ['nguowif', 'người'],
  ['hoaf', 'hoà'],
  ['khoer', 'khoẻ'],
  ['thuyr', 'thuỷ'],
  ['mais', 'mái'],
  ['muaf', 'mùa'],
  ['chaof', 'chào'],
  ['toans', 'toán'],
  ['gif', 'gì'],
  ['giaf', 'già'],
  ['giuwx', 'giữ'],
  ['quas', 'quá'],
  ['cuwar', 'cửa'],
  ['khuyeen', 'khuyên'],
  ['DDaf Nawngx', 'Đà Nẵng'],
  ['xin chaof', 'xin chào'],
  ['ddi hocj', 'đi học'],
  ['mwa', 'mưa'],
  ['w', 'ư'],
  ['ww', 'w'],
  ['ass', 'as'],
  ['aaa', 'aa'],
  ['hoaz', 'hoaz'],
  ['hoafz', 'hoa'],
  ['tieengs\b', 'tiến'],
  ['mas\b', 'm'],
  ['ab \b\bc', 'ac'],
  ['Xin chaof, banj!', 'Xin chào, bạn!'],
];

const vni: [string, string][] = [
  ['tie6ng1', 'tiếng'],
  ['Vie6t5 Nam', 'Việt Nam'],
  ['d9u7o7c5', 'được'],
  ['hoa2', 'hoà'],
  ['so61 123', 'số 123'],
  ['a11', 'a1'],
  ['a8n9', 'ăn9'],
  ['hoa20', 'hoa'],
];

describe('telex', () => {
  it.each(telex)('%s → %s', (keys, out) => {
    expect(typeKeys(keys, 'telex')).toBe(out);
  });
});

describe('vni', () => {
  it.each(vni)('%s → %s', (keys, out) => {
    expect(typeKeys(keys, 'vni')).toBe(out);
  });
});
