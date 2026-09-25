export type NavKey =
  | 'home'
  | 'kana'
  | 'vocab'
  | 'kanji'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'business'
  | 'review'
  | 'progress'
  | 'settings';

/** Labels live in the dictionary: `t.nav[item.key].label` / `.short`. */
export interface NavItem {
  to: string;
  icon: string;
  key: NavKey;
}

export const NAV: NavItem[] = [
  { to: '/', icon: '🏠', key: 'home' },
  { to: '/kana', icon: 'あ', key: 'kana' },
  { to: '/vocab', icon: '📚', key: 'vocab' },
  { to: '/kanji', icon: '漢', key: 'kanji' },
  { to: '/grammar', icon: '📝', key: 'grammar' },
  { to: '/reading', icon: '📖', key: 'reading' },
  { to: '/listening', icon: '🎧', key: 'listening' },
  { to: '/speaking', icon: '🎤', key: 'speaking' },
  { to: '/writing', icon: '✍️', key: 'writing' },
  { to: '/business', icon: '💼', key: 'business' },
  { to: '/review', icon: '🔁', key: 'review' },
  { to: '/progress', icon: '📈', key: 'progress' },
  { to: '/settings', icon: '⚙️', key: 'settings' },
];

// Items shown in the mobile bottom bar (max 5); the rest live in the "more" sheet.
export const MOBILE_PRIMARY = ['/', '/vocab', '/kanji', '/review', '/progress'];
