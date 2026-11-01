import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { db } from './db/db';
import { createProfile } from './db/profile';
import { resetDb } from './test/utils';
import { clearCurrentProfileId, setCurrentProfileId } from './profiles/current';

const renderApp = (route = '/') =>
  render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </MemoryRouter>,
  );

describe('App', () => {
  beforeEach(resetDb);

  it('onboards a new learner and lands on the map', async () => {
    renderApp();
    fireEvent.click(await screen.findByRole('button', { name: 'Bắt đầu nào!' }));
    fireEvent.change(screen.getByLabelText('Tên của bạn'), { target: { value: 'An' } });
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    fireEvent.click(screen.getByRole('radio', { name: /Mac/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    fireEvent.click(screen.getByRole('radio', { name: /10 phút/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    fireEvent.click(screen.getByRole('radio', { name: 'Mèo bạc hà' }));
    fireEvent.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    fireEvent.click(screen.getByRole('button', { name: 'Học từ đầu' }));
    expect(await screen.findByRole('heading', { name: /Chào An/ })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Làm quen máy tính' })).toBeInTheDocument();
    expect(await db.profiles.get('p1')).toMatchObject({ name: 'An', os: 'mac', dailyGoalMin: 10, avatar: 'mint' });
  });

  it('skips onboarding when a profile exists', async () => {
    const p = await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 5, avatar: 'cam' });
    setCurrentProfileId(p.id);
    renderApp('/welcome');
    expect(await screen.findByRole('heading', { name: /Chào Bình/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Học tiếp ▶' })).toHaveAttribute('href', '/lesson/basics.welcome');
    expect(screen.getByRole('button', { name: 'Trợ giúp' })).toBeInTheDocument();
  });

  it('sends a learner who has not been chosen yet to the picker', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    clearCurrentProfileId();
    renderApp('/');
    expect(await screen.findByText('Ai đang học?')).toBeInTheDocument();
  });

  it('sends a stale pointer to the picker instead of crashing', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    setCurrentProfileId('p404');
    renderApp('/');
    expect(await screen.findByText('Ai đang học?')).toBeInTheDocument();
  });

  it('opens help with F1 even on the welcome screen (no profile yet)', async () => {
    renderApp('/welcome');
    expect(await screen.findByRole('button', { name: 'Bắt đầu nào!' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Trợ giúp' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'F1' });
    expect(screen.getByRole('dialog', { name: 'Trợ giúp' })).toBeInTheDocument();
  });
});
