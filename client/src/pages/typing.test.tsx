import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { db } from '../db/db';
import { resetDb } from '../test/utils';
import { speedTestText, TYPING_TEXTS } from '../content/typing-texts';
import { TypingHubPage } from './TypingHubPage';
import { SpeedTestPage } from './SpeedTestPage';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/typing" element={<TypingHubPage />} />
        <Route path="/typing/test/:min" element={<SpeedTestPage />} />
      </Routes>
    </MemoryRouter>,
  );

describe('typing texts', () => {
  it('builds long enough test texts', () => {
    expect(TYPING_TEXTS.length).toBeGreaterThanOrEqual(4);
    expect(speedTestText(1).length).toBeGreaterThanOrEqual(600);
    expect(speedTestText(3, 2).startsWith(TYPING_TEXTS[2]!)).toBe(true);
  });
});

describe('TypingHubPage', () => {
  beforeEach(resetDb);

  it('shows an empty state, then progress after runs', async () => {
    renderAt('/typing');
    expect(await screen.findByText(/Chưa có lần kiểm tra nào/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /1 phút/ })).toHaveAttribute('href', '/typing/test/1');
    await act(async () => {
      await db.typingRuns.bulkAdd([
        { at: '2026-09-19T10:00:00.000Z', mode: 'test-1', wpm: 22, accuracy: 90 },
        { at: '2026-09-20T10:00:00.000Z', mode: 'test-1', wpm: 40, accuracy: 97 },
      ]);
      await db.keyStats.put({ key: 'j', hit: 3, miss: 3 });
    });
    expect(await screen.findByText('Tốt nhất: 40 WPM')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Biểu đồ WPM' })).toBeInTheDocument();
    expect(document.querySelector('[data-key="j"]')).toHaveAttribute('title', 'J: 3 đúng, 3 sai');
  });
});

describe('SpeedTestPage', () => {
  beforeEach(resetDb);
  afterEach(() => vi.useRealTimers());

  it('runs a one-minute test and saves the result', async () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2026, 8, 20, 9));
    renderAt('/typing/test/1');
    const box = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
    for (const key of [...speedTestText(1).slice(0, 10)]) fireEvent.keyDown(box, { key });
    act(() => {
      vi.advanceTimersByTime(61_000);
    });
    vi.useRealTimers();
    expect(await screen.findByText(/Kết quả/)).toBeInTheDocument();
    await waitFor(async () => expect(await db.typingRuns.count()).toBe(1));
  });

  it('redirects unsupported durations', async () => {
    renderAt('/typing/test/7');
    expect(await screen.findByText(/Kiểm tra tốc độ/)).toBeInTheDocument();
  });

  it('replays a different passage after "Làm lại"', async () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2026, 8, 20, 9));
    renderAt('/typing/test/1');
    const firstBox = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
    const firstText = firstBox.textContent;
    expect(firstText).toBe(speedTestText(1, 0));
    fireEvent.keyDown(firstBox, { key: 'M' });
    act(() => {
      vi.advanceTimersByTime(61_000);
    });
    vi.useRealTimers();
    const retryButton = await screen.findByRole('button', { name: 'Làm lại' });
    fireEvent.click(retryButton);
    const secondBox = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
    expect(secondBox.textContent).toBe(speedTestText(1, 1));
    expect(secondBox.textContent).not.toBe(firstText);
  });
});
