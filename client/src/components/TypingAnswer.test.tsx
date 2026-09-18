import { render, screen, fireEvent } from '@testing-library/react';
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
