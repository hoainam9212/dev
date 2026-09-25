import { render, screen, fireEvent } from '@testing-library/react';
import { withLang } from '../test/lang';
import { TypingAnswer } from './TypingAnswer';

it('accepts romaji for a kana answer', () => {
  const onResult = vi.fn();
  render(<TypingAnswer expected="さくら" onResult={onResult} />);
  fireEvent.change(screen.getByLabelText('Câu trả lời'), { target: { value: 'sakura' } });
  fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra' }));
  expect(screen.getByText(/Chính xác/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(onResult).toHaveBeenCalledWith(true, 'sakura');
});

it('shows the diff for a wrong answer', () => {
  const onResult = vi.fn();
  render(<TypingAnswer expected="さくら" onResult={onResult} />);
  fireEvent.change(screen.getByLabelText('Câu trả lời'), { target: { value: 'さら' } });
  fireEvent.submit(screen.getByLabelText('Câu trả lời').closest('form')!);
  expect(screen.getByText(/Chưa đúng/)).toBeInTheDocument();
  expect(screen.getByTestId('typing-diff').textContent).toBe('さくら');
  fireEvent.click(screen.getByRole('button', { name: /Tiếp/ }));
  expect(onResult).toHaveBeenCalledWith(false, 'さら');
});

it('gives correct and wrong feedback in English', () => {
  withLang('en');
  const { unmount } = render(<TypingAnswer expected="さくら" onResult={() => {}} />);
  fireEvent.change(screen.getByLabelText('Answer'), { target: { value: 'sakura' } });
  fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  expect(screen.getByText(/Correct!/)).toBeInTheDocument();
  unmount();
  render(<TypingAnswer expected="さくら" onResult={() => {}} />);
  fireEvent.change(screen.getByLabelText('Answer'), { target: { value: 'さら' } });
  fireEvent.click(screen.getByRole('button', { name: 'Check' }));
  expect(screen.getByText(/Not quite/)).toBeInTheDocument();
});
