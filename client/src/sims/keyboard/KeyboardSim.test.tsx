import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { typingSim } from '@office-neko/shared';
import { KeyboardSim } from './KeyboardSim';

function setup(o: Parameters<typeof typingSim.typingInitial>[0], os: 'win' | 'mac' = 'win') {
  const onState = vi.fn();
  render(<KeyboardSim initial={typingSim.typingInitial(o)} onState={onState} os={os} spotlight={null} />);
  const box = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
  const type = (keys: string) => [...keys].forEach((key) => fireEvent.keyDown(box, { key }));
  const last = () => onState.mock.calls.at(-1)![0] as typingSim.TypingState;
  const chars = () => [...document.querySelectorAll('[data-state]')].map((el) => el.getAttribute('data-state'));
  return { box, type, last, chars };
}

describe('KeyboardSim', () => {
  afterEach(() => vi.useRealTimers());

  it('colours characters and highlights the next key', () => {
    const { type, chars } = setup({ target: 'asdf' });
    expect(document.querySelector('[data-key="a"]')).toHaveAttribute('data-next', 'true');
    type('ax');
    expect(chars()).toEqual(['correct', 'wrong', 'pending', 'pending']);
    expect(document.querySelector('[data-cursor="true"]')?.textContent).toBe('d');
    expect(screen.getByText(/Dùng: Ngón giữa trái/)).toBeInTheDocument();
  });

  it('asks for Shift on the other hand for capitals', () => {
    setup({ target: 'A' });
    expect(document.querySelector('[data-key="a"]')).toHaveAttribute('data-next', 'true');
    expect(document.querySelector('[data-key="shift-right"]')).toHaveAttribute('data-next', 'true');
  });

  it('ignores shortcut keys and finishes', () => {
    const { type, box, last } = setup({ target: 'ok' });
    fireEvent.keyDown(box, { key: 'c', ctrlKey: true });
    type('ok');
    expect(last().finished).toBe(true);
    expect(last().keystrokes).toBe(2);
    expect(screen.getByText(/Xong rồi/)).toBeInTheDocument();
  });

  it('composes Telex and marks the word in progress', () => {
    const { type, chars, last } = setup({ target: 'tiếng', ime: 'telex' });
    expect(screen.getByText(/Kiểu gõ Telex/)).toBeInTheDocument();
    expect(document.querySelector('[data-next="true"]')).toBeNull();
    type('tiee');
    expect(chars().slice(0, 3)).toEqual(['composing', 'composing', 'composing']);
    type('ngs');
    expect(typingSim.typedText(last())).toBe('tiếng');
  });

  it('warns when the computer IME is on', () => {
    const { box, last } = setup({ target: 'ban', ime: 'telex' }, 'mac');
    fireEvent.keyDown(box, { key: 'Process' });
    expect(screen.getByRole('alert')).toHaveTextContent(/Vietnamese Telex trên thanh menu/);
    fireEvent.keyDown(box, { key: 'ă' });
    expect(last().keystrokes).toBe(0);
  });

  it('runs a timed test to the end', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 20, 9, 0, 0));
    const { type, last } = setup({ target: 'abcdefghij', mode: 'test', durationSec: 1 });
    type('ab');
    expect(screen.getByText(/Còn lại 1s/)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1100);
    });
    expect(last().finished).toBe(true);
    expect(screen.getByText(/Hết giờ/)).toBeInTheDocument();
  });

  it('updates the countdown between keystrokes, not just when typing', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 8, 20, 9, 0, 0));
    const { type } = setup({ target: 'abcdefghijklmnopqrst', mode: 'test', durationSec: 10 });
    type('a');
    expect(screen.getByText(/Còn lại 10s/)).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText(/Còn lại 7s/)).toBeInTheDocument();
  });
});
