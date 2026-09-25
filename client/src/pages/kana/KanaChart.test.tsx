import { render, screen, fireEvent, within } from '@testing-library/react';
import { KanaChart } from './KanaChart';
import { swipeLeft, swipeRight } from '../../test/swipe';
import { withLang } from '../../test/lang';

vi.mock('../../lib/tts', () => ({ speak: vi.fn(), useStopSpeechOnUnmount: vi.fn() }));

const chars = [
  { kana: 'あ', romaji: 'a', row: 'a', group: 'basic' as const, strokePaths: ['M10,20 L90,20'] },
  { kana: 'い', romaji: 'i', row: 'a', group: 'basic' as const, strokePaths: ['M10,20 L90,20'] },
];

it('opens the stroke panel as a bottom sheet on phones so the animation plays in view, and closes it', () => {
  render(<KanaChart chars={chars} />);
  const panel = screen.getByLabelText('Chi tiết chữ');
  // nothing selected: the hint is desktop-only (on a phone it would sit below the whole grid)
  expect(panel.className).toMatch(/hidden md:block/);

  fireEvent.click(screen.getByRole('button', { name: /あ/ }));
  expect(panel.className).toMatch(/fixed/);
  expect(panel.className).toMatch(/bottom-0/);
  expect(panel.className).toMatch(/md:sticky/);
  expect(screen.getByRole('img', { name: 'Thứ tự nét' })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Đóng' }));
  expect(screen.queryByRole('img', { name: 'Thứ tự nét' })).not.toBeInTheDocument();
  expect(panel.className).toMatch(/hidden md:block/);
});

it('swipes the sheet to the next and previous character, wrapping around', () => {
  render(<KanaChart chars={chars} />);
  fireEvent.click(screen.getByRole('button', { name: /あ/ }));
  const panel = screen.getByLabelText('Chi tiết chữ');
  swipeLeft(panel);
  expect(within(panel).getByText('i')).toBeInTheDocument();
  swipeLeft(panel); // past the end → back to the first
  expect(within(panel).getByText('a')).toBeInTheDocument();
  swipeRight(panel);
  expect(within(panel).getByText('i')).toBeInTheDocument();
});

it('shows the sheet in English: hint, close button and English mnemonic', () => {
  withLang('en');
  render(<KanaChart chars={[{ ...chars[0]!, mnemonic: 'mẹo nhớ', mnemonicEn: 'memory tip' }]} />);
  expect(screen.getByText('Tap a character to see its stroke order and memory tip.')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /あ/ }));
  expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
  expect(screen.getByLabelText('Character detail')).toBeInTheDocument();
  expect(screen.getByText(/memory tip/)).toBeInTheDocument();
});

it('closes the sheet with Escape', () => {
  render(<KanaChart chars={chars} />);
  fireEvent.click(screen.getByRole('button', { name: /い/ }));
  fireEvent.keyDown(window, { key: 'Escape' });
  expect(screen.queryByRole('img', { name: 'Thứ tự nét' })).not.toBeInTheDocument();
});
