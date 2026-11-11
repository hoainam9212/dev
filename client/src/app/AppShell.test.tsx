import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { db } from '../db/db';
import { ProfileProvider, createProfile, useProfile } from '../db/profile';
import { setCurrentProfileId } from '../profiles/current';
import { resetDb } from '../test/utils';
import { AppShell } from './AppShell';

/** Như app thật: AppShell chỉ vẽ khi hồ sơ đã nạp xong. */
function Shell() {
  return useProfile() ? <AppShell /> : null;
}

const renderShell = () =>
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileProvider>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<p>Trang chủ</p>} />
          </Route>
        </Routes>
      </ProfileProvider>
    </MemoryRouter>,
  );

describe('AppShell – nút bật/tắt tiếng', () => {
  let id = '';
  beforeEach(async () => {
    await resetDb();
    id = (await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' })).id;
    setCurrentProfileId(id);
  });

  it('nút trên thanh trên cùng tắt rồi bật lại tiếng, lưu vào hồ sơ (cùng công tắc Âm thanh trong Cài đặt)', async () => {
    renderShell();
    const btn = await screen.findByRole('button', { name: 'Âm thanh' });
    expect(btn).toHaveAttribute('aria-pressed', 'true');
    expect(btn).toHaveTextContent('🔊');
    fireEvent.click(btn);
    await waitFor(async () => expect((await db.profiles.get(id))?.sound).toBe(false));
    await waitFor(() => expect(screen.getByRole('button', { name: 'Âm thanh' })).toHaveAttribute('aria-pressed', 'false'));
    expect(screen.getByRole('button', { name: 'Âm thanh' })).toHaveTextContent('🔇');
    fireEvent.click(screen.getByRole('button', { name: 'Âm thanh' }));
    await waitFor(async () => expect((await db.profiles.get(id))?.sound).toBe(true));
  });
});
