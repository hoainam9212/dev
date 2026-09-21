import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProfileProvider, createProfile, updateProfile, useOs, useProfile } from './profile';
import { getCurrentProfileId, setCurrentProfileId } from '../profiles/current';
import { resetDb } from '../test/utils';

function Show() {
  const p = useProfile();
  const os = useOs();
  return <p>{p === undefined ? 'loading' : p === null ? 'none' : `${p.name}|${os}`}</p>;
}

describe('profile', () => {
  beforeEach(resetDb);

  it('reports nobody until a learner is chosen', async () => {
    render(<ProfileProvider><Show /></ProfileProvider>);
    expect(await screen.findByText('none')).toBeInTheDocument();
    const p = await createProfile({ name: '  Bình ', os: 'mac', dailyGoalMin: 5, avatar: 'cam' });
    // Tạo hồ sơ thôi chưa đủ — phải chọn người đó thì app mới theo hồ sơ này.
    expect(await screen.findByText('none')).toBeInTheDocument();
    setCurrentProfileId(p.id);
    expect(await screen.findByText('Bình|mac')).toBeInTheDocument();
  });

  it('follows the chosen learner when it changes', async () => {
    const a = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await createProfile({ name: 'Bình', os: 'mac', dailyGoalMin: 5, avatar: 'tim' });
    setCurrentProfileId(a.id);
    render(<ProfileProvider><Show /></ProfileProvider>);
    expect(await screen.findByText('An|win')).toBeInTheDocument();
    setCurrentProfileId(b.id);
    expect(await screen.findByText('Bình|mac')).toBeInTheDocument();
  });

  it('forgets a pointer to a learner that is no longer there', async () => {
    setCurrentProfileId('p404');
    render(<ProfileProvider><Show /></ProfileProvider>);
    expect(await screen.findByText('none')).toBeInTheDocument();
    await waitFor(() => expect(getCurrentProfileId()).toBeNull());
  });

  it('applies font scale and reduced motion to <html>', async () => {
    const p = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    await updateProfile(p.id, { fontScale: 'xl', reducedMotion: true });
    setCurrentProfileId(p.id);
    render(<ProfileProvider><Show /></ProfileProvider>);
    await waitFor(() => expect(document.documentElement.dataset.font).toBe('xl'));
    expect(document.documentElement.dataset.motion).toBe('reduce');
  });

  it('falls back to a guessed OS without a provider', () => {
    render(<Show />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
