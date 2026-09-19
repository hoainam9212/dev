import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProfileProvider, createProfile, updateProfile, useOs, useProfile } from './profile';
import { resetDb } from '../test/utils';

function Show() {
  const p = useProfile();
  const os = useOs();
  return <p>{p === undefined ? 'loading' : p === null ? 'none' : `${p.name}|${os}`}</p>;
}

describe('profile', () => {
  beforeEach(resetDb);

  it('reports no profile, then the created one', async () => {
    render(<ProfileProvider><Show /></ProfileProvider>);
    expect(await screen.findByText('none')).toBeInTheDocument();
    await createProfile({ name: '  Bình ', os: 'mac', dailyGoalMin: 5 });
    expect(await screen.findByText('Bình|mac')).toBeInTheDocument();
  });

  it('applies font scale and reduced motion to <html>', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10 });
    await updateProfile({ fontScale: 'xl', reducedMotion: true });
    render(<ProfileProvider><Show /></ProfileProvider>);
    await waitFor(() => expect(document.documentElement.dataset.font).toBe('xl'));
    expect(document.documentElement.dataset.motion).toBe('reduce');
  });

  it('falls back to a guessed OS without a provider', () => {
    render(<Show />);
    expect(screen.getByText('loading')).toBeInTheDocument();
  });
});
