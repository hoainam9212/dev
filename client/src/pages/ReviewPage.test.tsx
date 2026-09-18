import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ReviewPage } from './ReviewPage';
import { db } from '../db';
import { recordReview } from '../db/srs';
import { clearContentCache } from '../content/loader';

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
