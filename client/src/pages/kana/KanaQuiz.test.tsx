import { render, screen, fireEvent } from '@testing-library/react';
import { KanaQuiz } from './KanaQuiz';
import { useProgress } from '../../store/progress';

const chars = [
  { kana: 'あ', romaji: 'a', row: 'a', group: 'basic' as const, strokePaths: [] },
  { kana: 'い', romaji: 'i', row: 'a', group: 'basic' as const, strokePaths: [] },
  { kana: 'う', romaji: 'u', row: 'a', group: 'basic' as const, strokePaths: [] },
  { kana: 'え', romaji: 'e', row: 'a', group: 'basic' as const, strokePaths: [] },
];

it('runs through the questions and reports the score', () => {
  useProgress.setState({ xp: 0, streak: 0, lastStudyDay: null });
  const onFinish = vi.fn();
  render(<KanaQuiz chars={chars} total={2} mode="kana→romaji" onFinish={onFinish} />);
  for (let q = 0; q < 2; q++) {
    const prompt = screen.getByTestId('quiz-prompt').textContent!;
    const answer = chars.find((c) => c.kana === prompt)!.romaji;
    fireEvent.click(screen.getByRole('button', { name: answer }));
    fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  }
  expect(onFinish).toHaveBeenCalledWith({ correct: 2, total: 2 });
  expect(useProgress.getState().xp).toBe(4);
});

it('supports romaji→kana mode', () => {
  const onFinish = vi.fn();
  render(<KanaQuiz chars={chars} total={1} mode="romaji→kana" onFinish={onFinish} />);
  const prompt = screen.getByTestId('quiz-prompt').textContent!;
  const answer = chars.find((c) => c.romaji === prompt)!.kana;
  fireEvent.click(screen.getByRole('button', { name: answer }));
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(onFinish).toHaveBeenCalledWith({ correct: 1, total: 1 });
});
