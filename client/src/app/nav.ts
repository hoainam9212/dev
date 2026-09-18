export interface NavItem {
  to: string;
  label: string;
  icon: string;
  short: string;
}

export const NAV: NavItem[] = [
  { to: '/', label: 'Trang chủ', icon: '🏠', short: 'Home' },
  { to: '/kana', label: 'Kana', icon: 'あ', short: 'Kana' },
  { to: '/vocab', label: 'Từ vựng', icon: '📚', short: 'Từ' },
  { to: '/kanji', label: 'Kanji', icon: '漢', short: 'Kanji' },
  { to: '/grammar', label: 'Ngữ pháp', icon: '📝', short: 'NP' },
  { to: '/reading', label: 'Đọc hiểu', icon: '📖', short: 'Đọc' },
  { to: '/listening', label: 'Nghe', icon: '🎧', short: 'Nghe' },
  { to: '/speaking', label: 'Nói', icon: '🎤', short: 'Nói' },
  { to: '/writing', label: 'Viết', icon: '✍️', short: 'Viết' },
  { to: '/business', label: 'Business', icon: '💼', short: 'Biz' },
  { to: '/review', label: 'Ôn tập', icon: '🔁', short: 'Ôn' },
  { to: '/progress', label: 'Tiến độ', icon: '📈', short: 'Tiến độ' },
  { to: '/settings', label: 'Cài đặt', icon: '⚙️', short: 'Cài đặt' },
];

// Items shown in the mobile bottom bar (max 5); the rest live in the "Thêm" sheet.
export const MOBILE_PRIMARY = ['/', '/vocab', '/kanji', '/review', '/progress'];
