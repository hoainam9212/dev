import { render, screen, fireEvent } from '@testing-library/react';
import type { Kanji } from '@nihongo/shared';
import { KanjiDetail } from './KanjiDetail';
import { swipe, swipeLeft, swipeRight } from '../../test/swipe';

vi.mock('../../content/useVocabByIds', () => ({ useVocabByIds: () => ({ data: [] }) }));
vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));
vi.mock('../../db/srs', () => ({ recordReview: vi.fn() }));

const kanji: Kanji = {
  id: 'k-一', char: '一', level: 'N5', strokes: 1, meanings: ['One'], on: ['イチ'], kun: [],
  strokePaths: ['M10,50 L100,50'], vocabIds: [],
};

function setup() {
  const onNext = vi.fn();
  const onPrev = vi.fn();
  render(<KanjiDetail kanji={kanji} onClose={vi.fn()} onNext={onNext} onPrev={onPrev} position="3 / 79" />);
  return { onNext, onPrev, dialog: screen.getByRole('dialog') };
}

it('swipes to the next and previous kanji', () => {
  const { onNext, onPrev, dialog } = setup();
  swipeLeft(dialog);
  expect(onNext).toHaveBeenCalledTimes(1);
  swipeRight(dialog);
  expect(onPrev).toHaveBeenCalledTimes(1);
});

it('also has visible ‹ › buttons, arrow keys and a position counter', () => {
  const { onNext, onPrev } = setup();
  expect(screen.getByText('3 / 79')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Kanji sau' }));
  fireEvent.click(screen.getByRole('button', { name: 'Kanji trước' }));
  fireEvent.keyDown(window, { key: 'ArrowRight' });
  fireEvent.keyDown(window, { key: 'ArrowLeft' });
  expect(onNext).toHaveBeenCalledTimes(2);
  expect(onPrev).toHaveBeenCalledTimes(2);
});

it('does not change kanji while a stroke is drawn across the practice canvas', () => {
  const { onNext } = setup();
  fireEvent.click(screen.getByRole('button', { name: /Luyện viết/ }));
  swipe(screen.getByTestId('draw-canvas'), [300, 400], [100, 400]);
  expect(onNext).not.toHaveBeenCalled();
});

it('shows no navigation when opened without neighbours', () => {
  render(<KanjiDetail kanji={kanji} onClose={vi.fn()} />);
  expect(screen.queryByRole('button', { name: 'Kanji sau' })).not.toBeInTheDocument();
});
