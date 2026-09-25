import { render, screen, fireEvent } from '@testing-library/react';
import { KanaWrite } from './KanaWrite';
import { swipe, swipeLeft, swipeRight } from '../../test/swipe';

const chars = [
  { kana: 'あ', romaji: 'a', row: 'a', group: 'basic' as const, strokePaths: ['M10,50 L100,50'] },
  { kana: 'い', romaji: 'i', row: 'a', group: 'basic' as const, strokePaths: ['M10,50 L100,50'] },
  { kana: 'う', romaji: 'u', row: 'a', group: 'basic' as const, strokePaths: ['M10,50 L100,50'] },
];

const current = () => screen.getByText(/\((a|i|u)\)$/).textContent;

it('swiping outside the canvas moves between characters (wrapping around)', () => {
  render(<KanaWrite chars={chars} />);
  const area = screen.getByTestId('kana-write');
  swipeLeft(area);
  expect(current()).toBe('い (i)');
  swipeRight(area);
  swipeRight(area);
  expect(current()).toBe('う (u)');
});

it('a horizontal stroke on the canvas is writing, not a swipe', () => {
  render(<KanaWrite chars={chars} />);
  swipe(screen.getByTestId('draw-canvas'), [300, 400], [100, 400]);
  expect(current()).toBe('あ (a)');
});

it('stays on the character after it is written so it can be practised again', () => {
  render(<KanaWrite chars={chars} />);
  const canvas = screen.getByTestId('draw-canvas');
  Object.defineProperty(canvas, 'getBoundingClientRect', { value: () => ({ left: 0, top: 0, width: 218, height: 218 }) });
  fireEvent.pointerDown(canvas, { clientX: 20, clientY: 100, pointerId: 1 });
  fireEvent.pointerMove(canvas, { clientX: 120, clientY: 100, pointerId: 1 });
  fireEvent.pointerUp(canvas, { clientX: 200, clientY: 100, pointerId: 1 });
  expect(screen.getByText(/Hoàn thành/)).toBeInTheDocument();
  expect(current()).toBe('あ (a)');
});
