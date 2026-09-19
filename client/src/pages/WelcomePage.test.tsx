import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { WelcomePage } from './WelcomePage';
import { renderWithProfile, resetDb } from '../test/utils';

vi.mock('../db/profile', async (importOriginal) => {
  const mod = await importOriginal<typeof import('../db/profile')>();
  return { ...mod, createProfile: vi.fn(mod.createProfile) };
});

const goToLastStep = async () => {
  renderWithProfile(<WelcomePage />, { profile: null, route: '/welcome' });
  fireEvent.click(screen.getByRole('button', { name: 'Bắt đầu nào!' }));
  fireEvent.change(screen.getByLabelText('Tên của bạn'), { target: { value: 'An' } });
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
  fireEvent.click(screen.getByRole('radio', { name: /Mac/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
  fireEvent.click(screen.getByRole('radio', { name: /10 phút/ }));
};

describe('WelcomePage', () => {
  beforeEach(resetDb);

  it('disables the finish button while saving and shows an error if createProfile rejects', async () => {
    const profileModule = await import('../db/profile');
    vi.mocked(profileModule.createProfile).mockRejectedValueOnce(new Error('boom'));
    await goToLastStep();
    const finishBtn = screen.getByRole('button', { name: 'Vào học thôi! 🎉' });
    fireEvent.click(finishBtn);
    expect(finishBtn).toBeDisabled();
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(finishBtn).not.toBeDisabled();
  });

  it('creates the profile on success', async () => {
    await goToLastStep();
    fireEvent.click(screen.getByRole('button', { name: 'Vào học thôi! 🎉' }));
    await waitFor(async () => {
      const { db } = await import('../db/db');
      expect((await db.profile.get('me'))?.name).toBe('An');
    });
  });
});
