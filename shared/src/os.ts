import type { OS } from './types';

export function detectOs(platform: string): OS {
  return /mac|iphone|ipad|ipod/i.test(platform) ? 'mac' : 'win';
}

const KEY_LABELS: Record<string, { win: string; mac: string }> = {
  mod: { win: 'Ctrl', mac: '⌘' },
  ctrl: { win: 'Ctrl', mac: '⌃' },
  alt: { win: 'Alt', mac: '⌥' },
  shift: { win: 'Shift', mac: '⇧' },
  enter: { win: 'Enter', mac: 'Return' },
  backspace: { win: 'Backspace', mac: 'Delete' },
  delete: { win: 'Delete', mac: 'Fn+Delete' },
  esc: { win: 'Esc', mac: 'Esc' },
  tab: { win: 'Tab', mac: 'Tab' },
  space: { win: 'Space', mac: 'Space' },
  up: { win: '↑', mac: '↑' },
  down: { win: '↓', mac: '↓' },
  left: { win: '←', mac: '←' },
  right: { win: '→', mac: '→' },
};

/** 'mod+shift+s' → ['Ctrl','Shift','S'] (win) hoặc ['⌘','⇧','S'] (mac). */
export function formatCombo(combo: string, os: OS): string[] {
  return combo
    .split('+')
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => {
      const label = KEY_LABELS[t.toLowerCase()];
      if (label) return label[os];
      return t.length === 1 ? t.toUpperCase() : t.charAt(0).toUpperCase() + t.slice(1);
    });
}

export function isModPressed(e: { ctrlKey: boolean; metaKey: boolean }, os: OS): boolean {
  return os === 'mac' ? e.metaKey : e.ctrlKey;
}
