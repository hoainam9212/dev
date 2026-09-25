import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReviewPage, buildReviewCards } from './ReviewPage';
import { db } from '../db';
import { dueItems, recordReview } from '../db/srs';
import { clearContentCache } from '../content/loader';
import { withLang } from '../test/lang';

const vocab = [{ id: 'v-n5-0001', level: 'N5', word: '猫', reading: 'ねこ', meanings: ['cat'], tags: [], kanji: [], sentenceIds: [] }];
const kanjiN5 = [{ id: 'k-一', char: '一', level: 'N5', strokes: 1, meanings: ['one'], on: ['イチ'], kun: [], strokePaths: [], vocabIds: [] }];

beforeEach(async () => {
  await db.progress.clear();
  clearContentCache();
  vi.spyOn(globalThis, 'fetch').mockImplementation(async (input) => {
    const url = String(input);
    if (url.endsWith('/content/vocab/n5.json')) return new Response(JSON.stringify(vocab));
    if (url.endsWith('/content/kanji/n5.json')) return new Response(JSON.stringify(kanjiN5));
    return new Response('[]');
  });
});

it('shows the empty state when nothing is due', async () => {
  render(<MemoryRouter><ReviewPage /></MemoryRouter>);
  expect(await screen.findByTestId('review-empty')).toBeInTheDocument();
});

it('builds a session from due vocab and kanji', async () => {
  const past = new Date(Date.now() - 3 * 86_400_000);
  await recordReview('v-n5-0001', 'vocab', 2, past); // due 1 day after past → due now
  await recordReview('k-一', 'kanji', 0, past); // due 10 min after past
  render(<MemoryRouter><ReviewPage /></MemoryRouter>);
  expect(await screen.findByText(/2 thẻ đến hạn/)).toBeInTheDocument();
  expect(screen.getByText('一')).toBeInTheDocument(); // kanji was due first
});

it('counts due cards in English with plurals', async () => {
  withLang('en');
  const past = new Date(Date.now() - 3 * 86_400_000);
  await recordReview('v-n5-0001', 'vocab', 2, past);
  const { unmount } = render(<MemoryRouter><ReviewPage /></MemoryRouter>);
  expect(await screen.findByText('1 card due')).toBeInTheDocument();
  unmount();
  await recordReview('k-一', 'kanji', 0, past);
  render(<MemoryRouter><ReviewPage /></MemoryRouter>);
  expect(await screen.findByText('2 cards due')).toBeInTheDocument();
});

it('shows a Vietnamese meaning on the vocab card back in Vietnamese', async () => {
  vocab[0] = { ...vocab[0]!, meaningsVi: ['con mèo'] } as never;
  const past = new Date(Date.now() - 3 * 86_400_000);
  await recordReview('v-n5-0001', 'vocab', 2, past);
  const cards = await buildReviewCards(await dueItems());
  render(<MemoryRouter>{cards[0]!.back}</MemoryRouter>);
  expect(screen.getByText('con mèo')).toBeInTheDocument();
  delete (vocab[0] as { meaningsVi?: string[] }).meaningsVi;
});
