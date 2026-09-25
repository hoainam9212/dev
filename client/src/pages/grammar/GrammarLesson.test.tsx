import { render, screen, act } from '@testing-library/react';
import type { Grammar } from '@nihongo/shared';
import { GrammarLesson } from './GrammarLesson';
import { GrammarPage } from './GrammarPage';
import { grammarCard } from './GrammarFlashcards';
import { clearContentCache } from '../../content/loader';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));
vi.mock('../../db/srs', async (orig) => ({ ...(await orig<object>()), recordReview: vi.fn() }));

const g: Grammar = {
  id: 'g-n5-0001', level: 'N5', title: '〜たい', meaning: 'want to', meaningVi: 'muốn', formation: 'V-stem + たい',
  examples: [{ ja: '日本へ行きたいです。', romaji: '', en: 'I want to go to Japan.', vi: 'Tôi muốn đi Nhật.' }],
};

it('shows the Vietnamese meaning and example translation in Vietnamese', () => {
  render(<GrammarLesson grammar={g} onClose={vi.fn()} />);
  expect(screen.getByText('muốn')).toBeInTheDocument();
  expect(screen.getByText('Tôi muốn đi Nhật.')).toBeInTheDocument();
  expect(screen.queryByText('want to')).not.toBeInTheDocument();
});

it('shows the English meaning, example and section labels in English', () => {
  withLang('en');
  render(<GrammarLesson grammar={g} onClose={vi.fn()} />);
  expect(screen.getByText('want to')).toBeInTheDocument();
  expect(screen.getByText('I want to go to Japan.')).toBeInTheDocument();
  for (const label of ['Meaning', 'Formation', 'Examples']) expect(screen.getByText(label)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
});

it('the grammar flashcard back follows the display language', () => {
  const Back = () => <>{grammarCard(g).back}</>;
  render(<Back />);
  expect(screen.getByText('muốn')).toBeInTheDocument();
  act(() => withLang('en'));
  expect(screen.getByText('want to')).toBeInTheDocument();
});

it('GrammarPage shows its mode tabs and count in English', async () => {
  withLang('en');
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) =>
    String(input).endsWith('/content/grammar/n5.json') ? new Response(JSON.stringify([g])) : new Response('[]'),
  );
  render(<GrammarPage />);
  expect(await screen.findByText('1 pattern · 0 learned')).toBeInTheDocument();
  for (const name of ['Lessons', 'Cards', 'Quiz', 'Scramble']) expect(screen.getByRole('tab', { name })).toBeInTheDocument();
  vi.restoreAllMocks();
});
