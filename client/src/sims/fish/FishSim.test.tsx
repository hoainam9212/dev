import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { fishGame } from '@office-neko/shared';
import { FishSim } from './FishSim';

/** Một hồ đã có sẵn một con cá, để test không phải chờ cá sinh ra. */
function pondWithOneFish(word = 'meo'): fishGame.FishState {
  return { ...fishGame.fishInitial([word], 5), fish: [{ id: 1, word, x: 0.5, y: 0.5 }], nextId: 2, spawnIn: 99_999 };
}

const props = (onState = vi.fn(), initial = pondWithOneFish()) => ({ initial, onState, os: 'win' as const, spotlight: null });

describe('FishSim', () => {
  it('shows lives, score and the fish', () => {
    render(<FishSim {...props()} />);
    expect(screen.getByLabelText('3 mạng')).toBeInTheDocument();
    expect(screen.getByLabelText('Số cá bắt được')).toHaveTextContent('0');
    expect(screen.getByText('meo')).toBeInTheDocument();
  });

  it('catches a fish when the word is typed', () => {
    const onState = vi.fn();
    render(<FishSim {...props(onState)} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    for (const ch of 'meo') act(() => void fireEvent.keyDown(window, { key: ch }));
    expect(screen.getByLabelText('Số cá bắt được')).toHaveTextContent('1');
    expect(onState.mock.calls.at(-1)?.[0]).toMatchObject({ caught: 1 });
  });

  it('ignores typing before the game is started', () => {
    render(<FishSim {...props()} />);
    for (const ch of 'meo') fireEvent.keyDown(window, { key: ch });
    expect(screen.getByLabelText('Số cá bắt được')).toHaveTextContent('0');
  });

  /**
   * Trò chơi chạy 60 khung hình/giây. Nếu mỗi khung hình đều gọi `onState` thì
   * bộ chấm tự động của trình chạy bài (debounce 300 ms) bị dội lại liên tục và
   * không bao giờ chấm — người học bắt đủ cá mà bài vẫn không qua.
   */
  it('only reports out when something that matters changes, not on every frame', () => {
    const onState = vi.fn();
    const initial = { ...pondWithOneFish(), spawnIn: 99_999 };
    render(<FishSim {...props(onState, initial)} />);
    fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    const before = onState.mock.calls.length;
    // Vài khung hình trôi qua mà không bắt được cá nào, không mất mạng nào.
    for (let i = 0; i < 20; i++) act(() => void fireEvent.keyDown(window, { key: 'z' }));
    expect(onState.mock.calls.length).toBe(before);
    act(() => void fireEvent.keyDown(window, { key: 'Escape' }));
    for (const ch of 'meo') act(() => void fireEvent.keyDown(window, { key: ch }));
    expect(onState.mock.calls.length).toBeGreaterThan(before);
  });
});
