import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProfileProvider } from '../db/profile';
import { WelcomePage } from './WelcomePage';
import { renderWithProfile, resetDb } from '../test/utils';
import { getCurrentProfileId } from '../profiles/current';

vi.mock('../db/profile', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../db/profile')>();
  return { ...mod, createProfile: vi.fn(mod.createProfile) };
});

const goToLastStep = async (renderPage = () => { renderWithProfile(<WelcomePage />, { profile: null, route: '/welcome' }); }) => {
  renderPage();
  fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu nào!' }));
  fireEvent.change(screen.getByLabelText('Tên của bạn'), { target: { value: 'An' } });
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
  fireEvent.click(screen.getByRole('radio', { name: /Mac/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
  fireEvent.click(screen.getByRole('radio', { name: /10 phút/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
  fireEvent.click(screen.getByRole('radio', { name: 'Mèo tím' }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
};

const renderFlow = () =>
  render(
    <MemoryRouter initialEntries={['/welcome']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileProvider>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/" element={<p>Trang chủ</p>} />
          <Route path="/placement" element={<p>Trang kiểm tra</p>} />
        </Routes>
      </ProfileProvider>
    </MemoryRouter>,
  );

describe('WelcomePage', () => {
  beforeEach(resetDb);

  it('disables the finish button while saving and shows an error if createProfile rejects', async () => {
    const profileModule = await import('../db/profile');
    vi.mocked(profileModule.createProfile).mockRejectedValueOnce(new Error('boom'));
    await goToLastStep();
    const finishBtn = screen.getByRole('button', { name: 'Học từ đầu' });
    fireEvent.click(finishBtn);
    expect(finishBtn).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Kiểm tra đầu vào' })).toBeDisabled();
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(finishBtn).not.toBeDisabled();
  });

  it('creates the profile with the chosen avatar and starts learning as them', async () => {
    await goToLastStep();
    fireEvent.click(screen.getByRole('button', { name: 'Học từ đầu' }));
    await waitFor(async () => {
      const { db } = await import('../db/db');
      expect(await db.profiles.get('p1')).toMatchObject({ name: 'An', avatar: 'tim' });
    });
    expect(getCurrentProfileId()).toBe('p1');
  });

  it('asks whether the learner already uses a computer, after choosing the cat', async () => {
    await goToLastStep();
    expect(screen.getByRole('heading', { name: 'Bạn đã biết dùng máy tính chưa?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Học từ đầu' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Kiểm tra đầu vào' })).toBeInTheDocument();
  });

  it('"Học từ đầu" goes to the home page', async () => {
    await goToLastStep(() => { renderFlow(); });
    fireEvent.click(screen.getByRole('button', { name: 'Học từ đầu' }));
    expect(await screen.findByText('Trang chủ')).toBeInTheDocument();
  });

  it('"Kiểm tra đầu vào" creates the profile and opens the placement page', async () => {
    await goToLastStep(() => { renderFlow(); });
    fireEvent.click(screen.getByRole('button', { name: 'Kiểm tra đầu vào' }));
    expect(await screen.findByText('Trang kiểm tra')).toBeInTheDocument();
    expect(getCurrentProfileId()).toBe('p1');
  });
});
