import { render, screen, fireEvent } from '@testing-library/react';
import type { Kanji } from '@nihongo/shared';
import { buildKanjiQuestions } from './KanjiQuiz';
import { KanjiPage } from './KanjiPage';
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
