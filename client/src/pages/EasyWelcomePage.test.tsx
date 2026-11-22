import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { db } from '../db/db';
import { ProfileProvider, createProfile } from '../db/profile';
import { getCurrentProfileId, setCurrentProfileId } from '../profiles/current';
import { resetDb } from '../test/utils';
import { EasyWelcomePage } from './EasyWelcomePage';

const renderFlow = () =>
  render(
    <MemoryRouter initialEntries={['/de-dung']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileProvider>
        <Routes>
          <Route path="/de-dung" element={<EasyWelcomePage />} />
          <Route path="/" element={<p>Trang chủ</p>} />
        </Routes>
      </ProfileProvider>
    </MemoryRouter>,
  );

const typeName = async (name: string) => {
  fireEvent.click(await screen.findByRole('button', { name: 'Bắt đầu' }));
  fireEvent.change(screen.getByLabelText('Tên của bạn'), { target: { value: name } });
};

describe('EasyWelcomePage', () => {
  beforeEach(resetDb);

  it('asks for a name and creates an easy-mode Windows profile with the biggest font and every lesson open', async () => {
    renderFlow();
    await typeName('  Hoa ');
    fireEvent.click(screen.getByRole('button', { name: 'Xong' }));
    expect(await screen.findByText('Trang chủ')).toBeInTheDocument();
    const id = getCurrentProfileId()!;
    expect(await db.profiles.get(id)).toMatchObject({
      name: 'Hoa', os: 'win', easyMode: true, fontScale: 'xxl', unlockAll: true,
    });
  });

  it('keeps the Xong button locked until a name is typed', async () => {
    renderFlow();
    await typeName('   ');
    expect(screen.getByRole('button', { name: 'Xong' })).toBeDisabled();
  });

  it('sends a learner who already uses easy mode straight home', async () => {
    const p = await createProfile({ name: 'Hoa', os: 'win', dailyGoalMin: 10, avatar: 'cam', easyMode: true, fontScale: 'xxl', unlockAll: true });
    setCurrentProfileId(p.id);
    renderFlow();
    expect(await screen.findByText('Trang chủ')).toBeInTheDocument();
  });

  it('makes a new easy profile even when an ordinary learner is chosen, leaving that learner untouched', async () => {
    const old = await createProfile({ name: 'An', os: 'mac', dailyGoalMin: 5, avatar: 'tim' });
    setCurrentProfileId(old.id);
    renderFlow();
    await typeName('Hoa');
    fireEvent.click(screen.getByRole('button', { name: 'Xong' }));
    await waitFor(() => expect(getCurrentProfileId()).not.toBe(old.id));
    expect(await db.profiles.get(old.id)).toMatchObject({ name: 'An', os: 'mac', fontScale: 'md' });
    expect((await db.profiles.get(old.id))?.easyMode).toBeUndefined();
  });

  it('shows big text from the first screen, before any profile exists', async () => {
    renderFlow();
    await screen.findByRole('button', { name: 'Bắt đầu' });
    expect(document.documentElement.dataset.font).toBe('xxl');
    expect(document.documentElement.dataset.easy).toBe('1');
  });
});
