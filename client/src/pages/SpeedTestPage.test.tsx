import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { db } from '../db/db';
import { makeProfile, resetDb } from '../test/utils';
import { ProfileContext } from '../db/profile';
import { speedTestText } from '../content/typing-texts';
import { SpeedTestPage } from './SpeedTestPage';

const renderAt = (min: 1 | 3) =>
  render(
    <MemoryRouter initialEntries={[`/typing/test/${min}`]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileContext.Provider value={makeProfile()}>
        <Routes>
          <Route path="/typing/test/:min" element={<SpeedTestPage />} />
        </Routes>
      </ProfileContext.Provider>
    </MemoryRouter>,
  );

/** Gõ `n` ký tự đúng của bài, mỗi phím cách nhau `gapMs` (đồng hồ giả). */
function typeFor(min: 1 | 3, n: number, gapMs: number) {
  const box = screen.getByRole('textbox', { name: 'Vùng gõ phím' });
  for (const key of [...speedTestText(min).slice(0, n)]) {
    fireEvent.keyDown(box, { key });
    act(() => {
      vi.advanceTimersByTime(gapMs);
    });
  }
}

const minutesToday = async () => (await db.dailyActivity.toArray()).reduce((s, r) => s + r.minutes, 0);

describe('SpeedTestPage – thời gian học', () => {
  beforeEach(async () => {
    await resetDb();
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2026, 8, 20, 9));
  });
  afterEach(() => vi.useRealTimers());

  it('bỏ dở sau 10 giây gõ: cộng 1 phút, không ghi kết quả WPM', async () => {
    const { unmount } = renderAt(1);
    typeFor(1, 11, 1_000);
    unmount();
    vi.useRealTimers();
    await waitFor(async () => expect(await minutesToday()).toBe(1));
    expect(await db.typingRuns.count()).toBe(0);
  });

  it('bỏ dở dưới 5 giây: không ghi gì', async () => {
    const { unmount } = renderAt(1);
    typeFor(1, 3, 1_000);
    unmount();
    vi.useRealTimers();
    await new Promise((r) => setTimeout(r, 50));
    expect(await db.dailyActivity.count()).toBe(0);
    expect(await db.typingRuns.count()).toBe(0);
  });

  it('bài 3 phút gõ 10 giây rồi ngồi chờ hết giờ: ghi kết quả nhưng chỉ cộng phút thật đã gõ', async () => {
    const { unmount } = renderAt(3);
    typeFor(3, 11, 1_000);
    act(() => {
      vi.advanceTimersByTime(181_000);
    });
    vi.useRealTimers();
    expect(await screen.findByText(/Kết quả/)).toBeInTheDocument();
    await waitFor(async () => expect(await db.typingRuns.count()).toBe(1));
    expect(await minutesToday()).toBe(1);
    // Rời trang sau khi đã có kết quả thì không ghi thêm lần nữa.
    unmount();
    await new Promise((r) => setTimeout(r, 50));
    expect(await minutesToday()).toBe(1);
  });

  it('chưa gõ phím nào mà rời trang: không ghi gì', async () => {
    const { unmount } = renderAt(1);
    unmount();
    vi.useRealTimers();
    await new Promise((r) => setTimeout(r, 50));
    expect(await db.dailyActivity.count()).toBe(0);
  });
});
