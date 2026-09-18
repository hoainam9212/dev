import { render, screen, fireEvent } from '@testing-library/react';
import { Furigana } from './Furigana';

it('renders ruby elements and reports taps', () => {
  const onTap = vi.fn();
  render(<Furigana text="[日本語|にほんご]を[勉強|べんきょう]する" onWordTap={onTap} />);
  const rubies = screen.getAllByTestId('ruby');
  expect(rubies).toHaveLength(2);
  expect(rubies[0]!.querySelector('rt')?.textContent).toBe('にほんご');
  fireEvent.click(rubies[1]!);
  expect(onTap).toHaveBeenCalledWith('勉強');
});

it('hides readings when show is false', () => {
  render(<Furigana text="[猫|ねこ]" show={false} />);
  expect(screen.getByTestId('ruby').querySelector('rt')).toHaveClass('invisible');
});
