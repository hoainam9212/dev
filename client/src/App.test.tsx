import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { db } from './db/db';
import { createProfile } from './db/profile';
import { resetDb } from './test/utils';

const renderApp = (route = '/') => render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);

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
    fireEvent.click(screen.getByRole('button', { name: 'Vào học thôi! 🎉' }));
    expect(await screen.findByRole('heading', { name: /Chào An/ })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Làm quen máy tính' })).toBeInTheDocument();
    expect(await db.profile.get('me')).toMatchObject({ name: 'An', os: 'mac', dailyGoalMin: 10 });
  });

  it('skips onboarding when a profile exists', async () => {
    await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 5 });
    renderApp('/welcome');
    expect(await screen.findByRole('heading', { name: /Chào Bình/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Học tiếp ▶' })).toHaveAttribute('href', '/lesson/basics.welcome');
    expect(screen.getByRole('button', { name: 'Trợ giúp' })).toBeInTheDocument();
  });
});
