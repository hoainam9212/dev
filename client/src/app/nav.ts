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
  | 'bjt'
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
  { to: '/bjt', icon: '🏅', key: 'bjt' },
  { to: '/review', icon: '🔁', key: 'review' },
  { to: '/progress', icon: '📈', key: 'progress' },
  { to: '/settings', icon: '⚙️', key: 'settings' },
];

export type GroupKey = 'home' | 'learn' | 'bjt' | 'review' | 'me';

/** The five groups of the phone bar (and the headings of the side bar). Every page belongs to one. */
export interface NavGroup {
  key: GroupKey;
  to: string;
  icon: string;
  /** Pages of the group, by path prefix (the group's own page included). */
  pages: string[];
  /** Pages listed under the group in the side bar. */
  items: NavKey[];
}

export const GROUPS: NavGroup[] = [
  { key: 'home', to: '/', icon: '🏠', pages: [], items: ['home'] },
  {
    key: 'learn',
    to: '/learn',
    icon: '📚',
    pages: ['/learn', '/kana', '/vocab', '/kanji', '/grammar', '/reading', '/listening', '/speaking', '/writing'],
    items: ['kana', 'vocab', 'kanji', 'grammar', 'reading', 'listening', 'speaking', 'writing'],
  },
  { key: 'bjt', to: '/bjt', icon: '🏅', pages: ['/bjt', '/business'], items: ['bjt', 'business'] },
  { key: 'review', to: '/review', icon: '🔁', pages: ['/review'], items: ['review'] },
  { key: 'me', to: '/me', icon: '👤', pages: ['/me', '/progress', '/settings', '/login', '/register'], items: ['progress', 'settings'] },
];

/** The group a path belongs to ("/" only for the home page itself). */
export function groupOf(path: string): GroupKey | undefined {
  if (path === '/') return 'home';
  return GROUPS.find((g) => g.pages.some((p) => path === p || path.startsWith(`${p}/`)))?.key;
}

export const navItem = (key: NavKey) => NAV.find((n) => n.key === key)!;
