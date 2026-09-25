// Vietnamese dictionary — the source of truth. `en.ts` must match its type (`Dict`).
export const vi = {
  common: {
    cards: (n: number) => `${n} thẻ`,
  },
  nav: {
    home: { label: 'Trang chủ', short: 'Home' },
    kana: { label: 'Kana', short: 'Kana' },
    vocab: { label: 'Từ vựng', short: 'Từ' },
    kanji: { label: 'Kanji', short: 'Kanji' },
    grammar: { label: 'Ngữ pháp', short: 'NP' },
    reading: { label: 'Đọc hiểu', short: 'Đọc' },
    listening: { label: 'Nghe', short: 'Nghe' },
    speaking: { label: 'Nói', short: 'Nói' },
    writing: { label: 'Viết', short: 'Viết' },
    business: { label: 'Business', short: 'Biz' },
    review: { label: 'Ôn tập', short: 'Ôn' },
    progress: { label: 'Tiến độ', short: 'Tiến độ' },
    settings: { label: 'Cài đặt', short: 'Cài đặt' },
    more: 'Thêm',
    mainAria: 'Điều hướng chính',
    mobileAria: 'Điều hướng di động',
  },
  settings: {
    language: 'Ngôn ngữ hiển thị',
  },
};
