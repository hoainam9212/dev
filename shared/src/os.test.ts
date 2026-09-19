import { describe, it, expect } from 'vitest';
import { detectOs, formatCombo, isModPressed } from './os';

describe('detectOs', () => {
  it('recognises Apple platforms', () => {
    expect(detectOs('MacIntel')).toBe('mac');
    expect(detectOs('macOS')).toBe('mac');
    expect(detectOs('iPad')).toBe('mac');
  });
  it('defaults to Windows', () => {
    expect(detectOs('Win32')).toBe('win');
    expect(detectOs('Linux x86_64')).toBe('win');
    expect(detectOs('')).toBe('win');
  });
});

describe('formatCombo', () => {
  it('maps mod to Ctrl on Windows', () => {
    expect(formatCombo('mod+c', 'win')).toEqual(['Ctrl', 'C']);
  });
  it('maps modifiers to Mac symbols', () => {
    expect(formatCombo('mod+shift+s', 'mac')).toEqual(['⌘', '⇧', 'S']);
    expect(formatCombo('alt+tab', 'mac')).toEqual(['⌥', 'Tab']);
  });
  it('names Backspace as Delete on Mac', () => {
    expect(formatCombo('backspace', 'mac')).toEqual(['Delete']);
    expect(formatCombo('backspace', 'win')).toEqual(['Backspace']);
  });
  it('capitalises function keys and arrows', () => {
    expect(formatCombo('f1', 'win')).toEqual(['F1']);
    expect(formatCombo('up', 'win')).toEqual(['↑']);
  });
});

describe('isModPressed', () => {
  it('uses ctrl on Windows and meta on Mac', () => {
    expect(isModPressed({ ctrlKey: true, metaKey: false }, 'win')).toBe(true);
    expect(isModPressed({ ctrlKey: true, metaKey: false }, 'mac')).toBe(false);
    expect(isModPressed({ ctrlKey: false, metaKey: true }, 'mac')).toBe(true);
  });
});
