import { render, screen } from '@testing-library/react';
import type { Kanji } from '@nihongo/shared';
import { KanjiWrite } from './KanjiWrite';
import { swipe, swipeLeft, swipeRight } from '../../test/swipe';

const k = (char: string, meaning: string): Kanji => ({
  id: `k-${char}`, char, level: 'N5', strokes: 1, meanings: [meaning], on: [], kun: [],
  strokePaths: ['M10,50 L100,50'], vocabIds: [],
});
const kanji = [k('一', 'One'), k('二', 'Two'), k('三', 'Three')];
const picker = () => screen.getByRole('combobox', { name: 'Chọn kanji' }) as HTMLSelectElement;

it('swiping outside the canvas moves between kanji (wrapping around)', () => {
  render(<KanjiWrite kanji={kanji} />);
  const area = screen.getByTestId('kanji-write');
  swipeLeft(area);
  expect(picker().value).toBe('1');
  swipeRight(area);
  swipeRight(area);
  expect(picker().value).toBe('2');
});

it('a horizontal stroke on the canvas is writing, not a swipe', () => {
  render(<KanjiWrite kanji={kanji} />);
  swipe(screen.getByTestId('draw-canvas'), [300, 400], [100, 400]);
  expect(picker().value).toBe('0');
});
