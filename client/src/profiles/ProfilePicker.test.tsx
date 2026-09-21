import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { db } from '../db/db';
import { createProfile } from './manage';
import { getCurrentProfileId, setCurrentProfileId } from './current';
import { resetDb } from '../test/utils';

const renderRoute = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>,
  );

async function seed() {
  const a = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' }, new Date('2026-09-19T00:00:00Z'));
  const b = await createProfile({ name: 'Bình', os: 'mac', dailyGoalMin: 5, avatar: 'tim' }, new Date('2026-09-21T00:00:00Z'));
  await db.lessonProgress.put({ profileId: a.id, lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' });
  return { a, b };
}

describe('ProfilePicker', () => {
  beforeEach(resetDb);

  it('lists learners with the most recent first', async () => {
    await seed();
    renderRoute('/who');
    const cards = await screen.findAllByRole('button', { name: /^Học tiếp: / });
    expect(cards.map((c) => c.getAttribute('aria-label'))).toEqual(['Học tiếp: Bình', 'Học tiếp: An']);
  });

  it('shows how far each learner has got', async () => {
    await seed();
    renderRoute('/who');
    expect(await screen.findByText(/1 bài đã xong/)).toBeInTheDocument();
    expect(screen.getByText(/0 bài đã xong/)).toBeInTheDocument();
  });

  it('remembers the chosen learner and goes to the map', async () => {
    const { a } = await seed();
    renderRoute('/who');
    fireEvent.click(await screen.findByRole('button', { name: 'Học tiếp: An' }));
    await waitFor(() => expect(getCurrentProfileId()).toBe(a.id));
    expect(await screen.findByRole('heading', { name: /Chào An/ })).toBeInTheDocument();
  });

  it('marks the chosen learner as active so the list reorders next time', async () => {
    const { a } = await seed();
    renderRoute('/who');
    fireEvent.click(await screen.findByRole('button', { name: 'Học tiếp: An' }));
    await waitFor(async () => {
      const rows = await db.profiles.toArray();
      const an = rows.find((p) => p.id === a.id)!;
      const binh = rows.find((p) => p.id !== a.id)!;
      expect(an.lastActiveAt > binh.lastActiveAt).toBe(true);
    });
  });

  it('sends a brand-new computer to the welcome screen', async () => {
    renderRoute('/who');
    expect(await screen.findByRole('button', { name: 'Bắt đầu nào!' })).toBeInTheDocument();
  });

  it('offers adding another learner', async () => {
    await seed();
    renderRoute('/who');
    fireEvent.click(await screen.findByRole('button', { name: 'Thêm người mới' }));
    expect(await screen.findByRole('button', { name: 'Bắt đầu nào!' })).toBeInTheDocument();
  });

  it('adds another learner even while someone is still chosen', async () => {
    const { a } = await seed();
    setCurrentProfileId(a.id);
    renderRoute('/who');
    fireEvent.click(await screen.findByRole('button', { name: 'Thêm người mới' }));
    // Không được nảy về bản đồ của người đang chọn: đang muốn tạo người MỚI.
    expect(await screen.findByRole('button', { name: 'Bắt đầu nào!' })).toBeInTheDocument();
    expect(getCurrentProfileId()).toBeNull();
  });
});
