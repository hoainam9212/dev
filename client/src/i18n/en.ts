import type { Dict } from './index';

export const en: Dict = {
  common: {
    cards: (n) => (n === 1 ? '1 card' : `${n} cards`),
  },
  nav: {
    home: { label: 'Home', short: 'Home' },
    kana: { label: 'Kana', short: 'Kana' },
    vocab: { label: 'Vocabulary', short: 'Vocab' },
    kanji: { label: 'Kanji', short: 'Kanji' },
    grammar: { label: 'Grammar', short: 'Grammar' },
    reading: { label: 'Reading', short: 'Reading' },
    listening: { label: 'Listening', short: 'Listening' },
    speaking: { label: 'Speaking', short: 'Speaking' },
    writing: { label: 'Writing', short: 'Writing' },
    business: { label: 'Business', short: 'Biz' },
    review: { label: 'Review', short: 'Review' },
    progress: { label: 'Progress', short: 'Progress' },
    settings: { label: 'Settings', short: 'Settings' },
    more: 'More',
    mainAria: 'Main navigation',
    mobileAria: 'Mobile navigation',
  },
  settings: {
    language: 'Display language',
  },
};
