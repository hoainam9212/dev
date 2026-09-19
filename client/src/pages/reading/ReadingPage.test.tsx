import { render, screen, fireEvent } from '@testing-library/react';
import type { ReadingLesson } from '@nihongo/shared';
import { ReadingPage } from './ReadingPage';
import { clearContentCache } from '../../content/loader';
import { useLevel } from '../../store/level';

const L = (n: number, title: string, topic: string): ReadingLesson => ({
  id: `r-n2-0${n}`,
  level: 'N2',
  title,
  topic,
  body: `[本文|ほんぶん]その${n}\n[二行目|にぎょうめ]`,
  vocab: [],
  questions: [{ id: `q${n}`, prompt: 'Q', choices: ['a', 'b', 'c', 'd'], answer: 0 }],
});
const lessons = [L(1, '睡眠と健康', 'Sức khỏe'), L(2, '食品ロス', 'Môi trường'), L(3, 'プラごみ', 'Môi trường')];

beforeEach(() => {
  clearContentCache();
  useLevel.setState({ level: 'N2' });
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(JSON.stringify(lessons)));
});
afterEach(() => vi.restoreAllMocks());

it('filters lessons by topic and shows topic chips with counts', async () => {
  render(<ReadingPage />);
  expect(await screen.findByText('睡眠と健康')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Tất cả · 3' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Môi trường · 2' }));
  expect(screen.queryByText('睡眠と健康')).not.toBeInTheDocument();
  expect(screen.getByText('食品ロス')).toBeInTheDocument();
  expect(screen.getByText('プラごみ')).toBeInTheDocument();
});

it('opens a lesson and keeps line breaks in the body', async () => {
  render(<ReadingPage />);
  fireEvent.click(await screen.findByRole('button', { name: /睡眠と健康/ }));
  const body = screen.getAllByTestId('ruby')[0]!.closest('p')!;
  expect(body).toHaveClass('whitespace-pre-line');
  expect(body.textContent).toContain('\n');
});
