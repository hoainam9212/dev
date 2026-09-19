import { describe, it, expect } from 'vitest';
import { FINGER_VI, KEY_ROWS, SPACE_KEY, keyDef, keyForChar } from './keyboard';

describe('keyboard layout', () => {
  it('has the four QWERTY rows', () => {
    expect(KEY_ROWS.map((r) => r.map((k) => k.id).join(''))).toEqual([
      '`1234567890-=',
      'qwertyuiop[]\\',
      "asdfghjkl;'",
      'zxcvbnm,./',
    ]);
  });
  it('marks the home keys', () => {
    expect(KEY_ROWS[2]!.filter((k) => k.home).map((k) => k.id)).toEqual(['a', 's', 'd', 'f', 'j', 'k', 'l', ';']);
  });
  it('maps characters to keys and shift', () => {
    expect(keyForChar('f')).toEqual({ id: 'f', shift: false });
    expect(keyForChar('F')).toEqual({ id: 'f', shift: true });
    expect(keyForChar('!')).toEqual({ id: '1', shift: true });
    expect(keyForChar(':')).toEqual({ id: ';', shift: true });
    expect(keyForChar('?')).toEqual({ id: '/', shift: true });
    expect(keyForChar(' ')).toEqual({ id: 'space', shift: false });
    expect(keyForChar('ế')).toBeNull();
  });
  it('assigns standard fingers', () => {
    expect(keyDef('f')?.finger).toBe('li');
    expect(keyDef('g')?.finger).toBe('li');
    expect(keyDef('h')?.finger).toBe('ri');
    expect(keyDef('p')?.finger).toBe('rp');
    expect(keyDef('x')?.finger).toBe('lr');
    expect(keyDef(',')?.finger).toBe('rm');
    expect(SPACE_KEY.finger).toBe('th');
    expect(FINGER_VI.li).toBe('Ngón trỏ trái');
  });
});
