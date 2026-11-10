import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { db } from '../db/db';
import { ProfileProvider, createProfile, useProfileId } from '../db/profile';
import { setCurrentProfileId } from '../profiles/current';
import { resetDb } from '../test/utils';
import { PLACEMENT_QUIZ } from '../content/placement';
import { speedTestText } from '../content/typing-texts';
import { PlacementPage } from './PlacementPage';
import { SpeedTestPage } from './SpeedTestPage';

/**
 * Hiện ra khi hồ sơ đã nạp xong. Trên app thật hồ sơ nạp xong từ lâu trước khi gõ hết một phút; trong test (gõ và
 * tua đồng hồ đồng bộ) thì phải chờ, kẻo bài xong khi `profileId` còn null.
 */
function ProfileReady() {
  return useProfileId() ? <span data-testid="profile-ready" /> : null;
}

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileProvider>
        <ProfileReady />
        <Routes>
          <Route path="/" element={<p>Trang chủ</p>} />
          <Route path="/placement" element={<PlacementPage />} />
          <Route path="/typing/test/:min" element={<SpeedTestPage />} />
        </Routes>
      </ProfileProvider>
    </MemoryRouter>,
  );

/** Làm bài kiểm tra Word, trả lời đúng `right` câu đầu, sai các câu còn lại. */
async function takeWordTest(right: number) {
  fireEvent.click(await screen.findByRole('button', { name: 'Làm bài kiểm tra Word' }));
  const quiz = PLACEMENT_QUIZ.word;
  for (const [i, q] of quiz.entries()) {
    await screen.findByText(`Câu ${i + 1}/6`);
    const pick = i < right ? q.answer : (q.answer + 1) % q.choices.length;
    fireEvent.click(choice(pick));
  }
}

const choice = (i: number) => document.querySelectorAll<HTMLButtonElement>('[data-choice]')[i]!;

const testedOut = async (id: string) => (await db.profiles.get(id))?.testedOut ?? [];

describe('PlacementPage', () => {
  beforeEach(async () => {
    await resetDb();
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
    setCurrentProfileId('p1');
  });
  afterEach(() => vi.useRealTimers());

  it('unlocks Word after 5 of 6 right, only for the current profile', async () => {
    renderAt('/placement');
    await takeWordTest(5);
    expect(await screen.findByText('Đã mở khoá lộ trình Word!')).toBeInTheDocument();
    await waitFor(async () => expect(await testedOut('p1')).toEqual(['word']));
    expect(await testedOut('p2')).toEqual([]);
  });

  it('changes nothing after a fail and says how many were right', async () => {
    renderAt('/placement');
    await takeWordTest(3);
    expect(await screen.findByText(/Bạn đúng 3\/6\. Học từ đầu sẽ chắc hơn/)).toBeInTheDocument();
    expect(await testedOut('p1')).toEqual([]);
  });

  it('keeps the unlock when a later retry fails', async () => {
    await db.profiles.update('p1', { testedOut: ['word'] });
    renderAt('/placement');
    expect(await screen.findByText('Đã mở khoá ✓')).toBeInTheDocument();
    await takeWordTest(2);
    expect(await screen.findByText(/Bạn đúng 2\/6/)).toBeInTheDocument();
    expect(await testedOut('p1')).toEqual(['word']);
  });

  it('does not reveal answers until the end', async () => {
    renderAt('/placement');
    fireEvent.click(await screen.findByRole('button', { name: 'Làm bài kiểm tra Word' }));
    const q = PLACEMENT_QUIZ.word[0]!;
    fireEvent.click(choice((q.answer + 1) % q.choices.length));
    expect(await screen.findByText('Câu 2/6')).toBeInTheDocument();
    expect(screen.queryByText(/Chưa đúng rồi/)).not.toBeInTheDocument();
  });

  it('links typing to the one-minute speed test in placement mode', async () => {
    renderAt('/placement');
    expect(await screen.findByRole('link', { name: /Kiểm tra tốc độ 1 phút/ })).toHaveAttribute('href', '/typing/test/1?placement=1');
  });

  it('unlocks typing when the placement speed test reaches the bar', async () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2026, 10, 1, 9));
    renderAt('/typing/test/1?placement=1');
    const box = await screen.findByRole('textbox', { name: 'Vùng gõ phím' });
    await screen.findByTestId('profile-ready');
    // 140 ký tự đúng trong 1 phút = 28 WPM, 100% chính xác.
    for (const key of [...speedTestText(1).slice(0, 140)]) fireEvent.keyDown(box, { key });
    act(() => {
      vi.advanceTimersByTime(61_000);
    });
    vi.useRealTimers();
    expect(await screen.findByText('Đã mở khoá lộ trình Gõ phím 10 ngón!')).toBeInTheDocument();
    await waitFor(async () => expect(await testedOut('p1')).toEqual(['typing']));
  }, 20_000);

  it('leaves typing locked when the speed test is too slow', async () => {
    vi.useFakeTimers({ toFake: ['Date', 'setInterval', 'clearInterval'] });
    vi.setSystemTime(new Date(2026, 10, 1, 9));
    renderAt('/typing/test/1?placement=1');
    const box = await screen.findByRole('textbox', { name: 'Vùng gõ phím' });
    await screen.findByTestId('profile-ready');
    for (const key of [...speedTestText(1).slice(0, 20)]) fireEvent.keyDown(box, { key });
    act(() => {
      vi.advanceTimersByTime(61_000);
    });
    vi.useRealTimers();
    expect(await screen.findByText(/Cần ít nhất 25 WPM/)).toBeInTheDocument();
    expect(await testedOut('p1')).toEqual([]);
  });
});
