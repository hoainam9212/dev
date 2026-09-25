import { render, screen, fireEvent } from '@testing-library/react';
import { QuizRunner, type QuizQuestion } from './QuizRunner';
import { withLang } from '../test/lang';

const q = (prompt: string): QuizQuestion => ({ prompt, choices: ['a', 'b'], answer: 0 });

function answerAll(n: number) {
  for (let i = 0; i < n; i++) {
    fireEvent.click(screen.getByRole('button', { name: 'a' }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
  }
}

it('shows the English score line for one question', () => {
  withLang('en');
  render(<QuizRunner questions={[q('1')]} kind="quiz" type="vocab" onFinish={() => {}} />);
  answerAll(1);
  expect(screen.getByText('Score: 1 / 1 question')).toBeInTheDocument();
});

it('shows the English score line for several questions', () => {
  withLang('en');
  render(<QuizRunner questions={[q('1'), q('2'), q('3'), q('4'), q('5')]} kind="quiz" type="vocab" onFinish={() => {}} />);
  answerAll(5);
  expect(screen.getByText('Score: 5 / 5 questions')).toBeInTheDocument();
});
