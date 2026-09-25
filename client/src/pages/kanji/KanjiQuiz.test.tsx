import { render, screen, fireEvent, act } from '@testing-library/react';
import type { Kanji } from '@nihongo/shared';
import { buildKanjiQuestions } from './KanjiQuiz';
import { KanjiPage } from './KanjiPage';
import { KanjiGrid } from './KanjiGrid';
import { kanjiCard } from './KanjiFlashcards';
import { withLang } from '../../test/lang';
import { mulberry32 } from '../../lib/quiz';
import { clearContentCache } from '../../content/loader';

const K = (char: string, meaning: string, on: string, kun: string): Kanji => ({
  id: `k-${char}`, char, level: 'N5', strokes: 3, meanings: [meaning], on: [on], kun: [kun], strokePaths: ['M10,50 L100,50'], vocabIds: [],
});
const kanji = [K('一', 'one', 'イチ', 'ひと'), K('二', 'two', 'ニ', 'ふた'), K('三', 'three', 'サン', 'み'), K('四', 'four', 'シ', 'よ'), K('五', 'five', 'ゴ', 'いつ')];

it('buildKanjiQuestions covers all three directions', () => {
  for (const dir of ['kanji→meaning', 'meaning→kanji', 'kanji→reading'] as const) {
    const qs = buildKanjiQuestions(kanji, dir, 3, mulberry32(5));
    expect(qs).toHaveLength(3);
    for (const q of qs) {
      expect(q.choices).toHaveLength(4);
      expect(new Set(q.choices).size).toBe(4);
    }
  }
  expect(buildKanjiQuestions(kanji, 'kanji→reading', 1, mulberry32(1))[0]!.choices).toContain('イチ');
});

const viKanji = kanji.map((k, i) => ({ ...k, meaningsVi: [`nghĩa ${i}`] }));

it('buildKanjiQuestions takes options and distractors from the display language', () => {
  for (const q of buildKanjiQuestions(viKanji, 'kanji→meaning', 3, mulberry32(5), 'vi')) {
    expect(q.choices.every((c) => c.startsWith('nghĩa'))).toBe(true);
  }
  for (const q of buildKanjiQuestions(viKanji, 'kanji→meaning', 3, mulberry32(5), 'en')) {
    expect(q.choices.some((c) => c.startsWith('nghĩa'))).toBe(false);
  }
});

it('KanjiGrid search finds a kanji by its Vietnamese meaning', () => {
  render(<KanjiGrid kanji={viKanji} onPick={vi.fn()} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'nghĩa 2' } });
  expect(screen.getByRole('button', { name: '三 nghĩa 2' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /一/ })).not.toBeInTheDocument();
});

it('the kanji flashcard back follows the display language', () => {
  const Back = () => <>{kanjiCard(viKanji[0]!).back}</>;
  render(<Back />);
  expect(screen.getByText('nghĩa 0')).toBeInTheDocument();
  act(() => withLang('en'));
  expect(screen.getByText('one')).toBeInTheDocument();
});

it('KanjiPage shows its count and modes in English', async () => {
  withLang('en');
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) =>
    String(input).endsWith('/content/kanji/n5.json') ? new Response(JSON.stringify(kanji)) : new Response('[]'),
  );
  render(<KanjiPage />);
  expect(await screen.findByText('5 kanji · 0 learned')).toBeInTheDocument();
  for (const name of ['Grid', 'Cards', 'Quiz', 'Write']) expect(screen.getByRole('tab', { name })).toBeInTheDocument();
  vi.restoreAllMocks();
});

it('KanjiPage shows the grid and opens a detail dialog', async () => {
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = String(input);
    if (url.endsWith('/content/kanji/n5.json')) return new Response(JSON.stringify(kanji));
    return new Response('[]');
  });
  render(<KanjiPage />);
  expect(await screen.findByText(/5 kanji/)).toBeInTheDocument();
  fireEvent.click(await screen.findByRole('button', { name: '一 one' }));
  const dialog = await screen.findByRole('dialog', { name: 'Kanji 一' });
  expect(dialog).toBeInTheDocument();
  expect(screen.getByText('イチ')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Đóng' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  vi.restoreAllMocks();
});
