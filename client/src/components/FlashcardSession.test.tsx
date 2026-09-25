import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { withLang } from '../test/lang';
import { FlashcardSession, type CardItem } from './FlashcardSession';
import { db } from '../db/db';
import { useProgress } from '../store/progress';

const items: CardItem[] = [
  { id: 'v-n5-0001', type: 'vocab', front: 'FRONT-1', back: 'BACK-1' },
  { id: 'v-n5-0002', type: 'vocab', front: 'FRONT-2', back: 'BACK-2' },
];

beforeEach(async () => {
  await db.progress.clear();
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
});

it('flips, grades, re-queues forgotten cards and finishes', async () => {
  const onFinish = vi.fn();
  render(<FlashcardSession items={items} onFinish={onFinish} />);
  expect(screen.getByText('FRONT-1')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Lật thẻ' }));
  expect(screen.getByText('BACK-1')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Quên/ }));
  await screen.findByText('FRONT-2');
  fireEvent.click(screen.getByRole('button', { name: 'Lật thẻ' }));
  fireEvent.click(screen.getByRole('button', { name: /Tốt/ }));
  await screen.findByText('FRONT-1'); // re-queued
  fireEvent.click(screen.getByRole('button', { name: 'Lật thẻ' }));
  fireEvent.click(screen.getByRole('button', { name: /Dễ/ }));
  await waitFor(() => expect(screen.getByTestId('session-summary')).toBeInTheDocument());
  expect(onFinish).toHaveBeenCalledTimes(1);
  expect(onFinish).toHaveBeenCalledWith({ reviewed: 3, correct: 2 });
  expect(useProgress.getState().xp).toBe(6);
  const p = await db.progress.get('v-n5-0001');
  expect(p?.lapses).toBe(1);
  expect(p?.reps).toBe(1);
});

it('shows an empty state without items', () => {
  render(<FlashcardSession items={[]} onFinish={vi.fn()} />);
  expect(screen.getByText(/Không có thẻ nào/)).toBeInTheDocument();
});

it('shows the flip hint and grade buttons in English', () => {
  withLang('en');
  render(<FlashcardSession items={items} onFinish={() => {}} />);
  expect(screen.getByText('Tap to flip')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Flip' }));
  for (const g of ['Again', 'Hard', 'Good', 'Easy']) expect(screen.getByRole('button', { name: new RegExp(g) })).toBeInTheDocument();
});
