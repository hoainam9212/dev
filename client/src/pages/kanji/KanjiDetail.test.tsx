import { render, screen, fireEvent } from '@testing-library/react';
import type { Kanji } from '@nihongo/shared';
import { KanjiDetail } from './KanjiDetail';
import { swipe, swipeLeft, swipeRight } from '../../test/swipe';
import { withLang } from '../../test/lang';

vi.mock('../../content/useVocabByIds', () => ({ useVocabByIds: () => ({ data: [] }) }));
vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));
vi.mock('../../db/srs', () => ({ recordReview: vi.fn() }));

const kanji: Kanji = {
  id: 'k-一', char: '一', level: 'N5', strokes: 1, meanings: ['One'], on: ['イチ'], kun: [],
  strokePaths: ['M10,50 L100,50'], vocabIds: [],
};

it('labels the header and the stroke count in English (1 stroke vs 8 strokes)', () => {
  withLang('en');
  const { unmount } = render(<KanjiDetail kanji={kanji} onClose={vi.fn()} onNext={vi.fn()} onPrev={vi.fn()} position="3 / 79" />);
  for (const name of ['Previous kanji', 'Next kanji', 'Close']) expect(screen.getByRole('button', { name })).toBeInTheDocument();
  expect(screen.getByText('N5 · 1 stroke')).toBeInTheDocument();
  unmount();
  render(<KanjiDetail kanji={{ ...kanji, strokes: 8, grade: 2 }} onClose={vi.fn()} />);
  expect(screen.getByText('N5 · 8 strokes · grade 2')).toBeInTheDocument();
});

it('shows a Hán Việt row only when the kanji has one', () => {
  const { unmount } = render(<KanjiDetail kanji={kanji} onClose={vi.fn()} />);
  expect(screen.queryByText('Hán Việt')).not.toBeInTheDocument();
  unmount();
  render(<KanjiDetail kanji={{ ...kanji, hanViet: 'Nhất' }} onClose={vi.fn()} />);
  expect(screen.getByText('Hán Việt')).toBeInTheDocument();
  expect(screen.getByText('Nhất')).toBeInTheDocument();
});

it('shows Vietnamese kanji meanings in Vietnamese and English ones in English', () => {
  const k = { ...kanji, meaningsVi: ['một'] };
  const { unmount } = render(<KanjiDetail kanji={k} onClose={vi.fn()} />);
  expect(screen.getByText('một')).toBeInTheDocument();
  unmount();
  withLang('en');
  render(<KanjiDetail kanji={k} onClose={vi.fn()} />);
  expect(screen.getByText('One')).toBeInTheDocument();
});

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

it('is a fixed full-height sheet whose header (with ✕ in the corner) stays put while only the content scrolls', () => {
  const { dialog } = setup();
  // same size for every kanji, whatever the amount of content (it used to shrink and jump)
  expect(dialog.className).toMatch(/\bh-full\b/);
  expect(dialog.className).toMatch(/overflow-hidden/);
  const close = screen.getByRole('button', { name: 'Đóng' });
  const scroller = screen.getByTestId('kanji-detail-scroll');
  expect(scroller.className).toMatch(/overflow-y-auto/);
  expect(scroller.contains(close)).toBe(false);
  expect(scroller.contains(screen.getByRole('heading', { name: '一' }))).toBe(true);
});

it('shows no navigation when opened without neighbours', () => {
  render(<KanjiDetail kanji={kanji} onClose={vi.fn()} />);
  expect(screen.queryByRole('button', { name: 'Kanji sau' })).not.toBeInTheDocument();
});
