import { describe, it, expect } from 'vitest';
import { FINGER_VI, KEY_ROWS, SPACE_KEY, keyDef, keyForChar, keyboardRows, fingersForChar } from './keyboard';

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

describe('fingersForChar', () => {
  it('chữ thường: một ngón, không Shift; chữ hoa: Shift tay kia', () => {
    expect(fingersForChar('f')).toMatchObject({ key: { id: 'f', finger: 'li' }, shiftKey: null, shiftFinger: null });
    expect(fingersForChar('F')).toMatchObject({ shiftKey: 'shift-right', shiftFinger: 'rp' });
    expect(fingersForChar('J')).toMatchObject({ key: { finger: 'ri' }, shiftKey: 'shift-left', shiftFinger: 'lp' });
    expect(fingersForChar(' ')).toMatchObject({ key: { finger: 'th' }, shiftKey: null });
    expect(fingersForChar('ế')).toBeNull();
  });
});

describe('keyboardRows theo HĐH', () => {
  const names = (os: 'win' | 'mac') => keyboardRows(os).flat().map((k) => k.name ?? k.label);

  it('Mac có command/option, không có Win', () => {
    expect(names('mac')).toEqual(expect.arrayContaining(['command', 'option', 'control', 'return', 'delete']));
    expect(names('mac')).not.toContain('Win');
    expect(keyboardRows('mac').flat().find((k) => k.name === 'command')?.label).toBe('⌘');
  });

  it('Windows có Ctrl/Win/Alt, không có command/option', () => {
    expect(names('win')).toEqual(expect.arrayContaining(['Ctrl', 'Win', 'Alt', 'Enter', 'Backspace']));
    expect(names('win')).not.toContain('command');
    expect(names('win')).not.toContain('option');
  });

  it('hàng dưới cùng đúng thứ tự từng HĐH', () => {
    const bottom = (os: 'win' | 'mac') => keyboardRows(os).at(-1)!.map((k) => k.name ?? k.label);
    expect(bottom('win')).toEqual(['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl']);
    expect(bottom('mac')).toEqual(['control', 'option', 'command', 'Space', 'command', 'option']);
  });

  it('phím chữ/số giữ nguyên, mọi phím chữ có ngón', () => {
    for (const os of ['win', 'mac'] as const) {
      const keys = keyboardRows(os).flat();
      for (const ch of 'abcdefghijklmnopqrstuvwxyz0123456789') {
        expect(keys.find((k) => k.id === ch)?.finger, `${os} ${ch}`).toBeTruthy();
      }
    }
  });

  it('năm hàng cùng tổng bề rộng, để mép phải thẳng hàng', () => {
    for (const os of ['win', 'mac'] as const) {
      const widths = keyboardRows(os).map((r) => r.reduce((s, k) => s + k.width, 0));
      expect(widths).toHaveLength(5);
      expect(new Set(widths).size, `${os}: ${widths.join(', ')}`).toBe(1);
    }
  });
});
