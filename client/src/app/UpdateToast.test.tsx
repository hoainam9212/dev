import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, render, screen, fireEvent } from '@testing-library/react';
import { UpdateToast } from './UpdateToast';
import { publishPwaEvent, resetPwaEvents } from '../pwa';

describe('UpdateToast', () => {
  beforeEach(() => resetPwaEvents());
  afterEach(() => vi.useRealTimers());

  it('shows nothing until the service worker reports', () => {
    render(<UpdateToast />);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('offers to reload when a new version is waiting', () => {
    const update = vi.fn();
    render(<UpdateToast />);
    act(() => publishPwaEvent('needRefresh', update));
    expect(screen.getByRole('status')).toHaveTextContent('Có bản mới của Tin Học Cùng Mochi.');
    fireEvent.click(screen.getByRole('button', { name: 'Tải lại' }));
    expect(update).toHaveBeenCalledOnce();
  });

  it('"Để sau" hides the toast without updating', () => {
    const update = vi.fn();
    render(<UpdateToast />);
    act(() => publishPwaEvent('needRefresh', update));
    fireEvent.click(screen.getByRole('button', { name: 'Để sau' }));
    expect(screen.queryByRole('status')).toBeNull();
    expect(update).not.toHaveBeenCalled();
  });

  it('announces offline readiness and hides it after 5 s', () => {
    vi.useFakeTimers();
    render(<UpdateToast />);
    act(() => publishPwaEvent('offlineReady', () => undefined));
    expect(screen.getByRole('status')).toHaveTextContent('Đã sẵn sàng dùng khi không có mạng.');
    expect(screen.queryByRole('button', { name: 'Tải lại' })).toBeNull();
    act(() => vi.advanceTimersByTime(4900));
    expect(screen.getByRole('status')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(200));
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('replays an event that arrived before it mounted', () => {
    publishPwaEvent('needRefresh', () => undefined);
    render(<UpdateToast />);
    expect(screen.getByRole('button', { name: 'Tải lại' })).toBeInTheDocument();
  });
});
