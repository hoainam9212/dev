import { render, screen, fireEvent } from '@testing-library/react';
import { QuizChoice } from './QuizChoice';

it('marks the answer and reports correctness on continue', () => {
  const onAnswer = vi.fn();
  render(<QuizChoice prompt="あ" choices={['a', 'i', 'u', 'e']} answer={0} onAnswer={onAnswer} />);
  fireEvent.click(screen.getByRole('button', { name: 'i' }));
  expect(screen.getByRole('button', { name: 'a' })).toHaveAttribute('data-state', 'correct');
  expect(screen.getByRole('button', { name: 'i' })).toHaveAttribute('data-state', 'wrong');
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(onAnswer).toHaveBeenCalledWith(false);
});

it('reports true for a correct answer and shows the explanation', () => {
  const onAnswer = vi.fn();
  render(<QuizChoice prompt="あ" choices={['a', 'i']} answer={0} onAnswer={onAnswer} explain="Giải thích" />);
  fireEvent.click(screen.getByRole('button', { name: 'a' }));
  expect(screen.getByText('Giải thích')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(onAnswer).toHaveBeenCalledWith(true);
});
