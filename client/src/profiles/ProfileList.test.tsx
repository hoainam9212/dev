import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { db } from '../db/db';
import { resetDb } from '../test/utils';
import { createProfile } from './manage';
import { ProfileList } from './ProfileList';

async function seed() {
  const me = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
  const other = await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
  await db.lessonProgress.put({ profileId: other.id, lessonId: 'l1', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' });
  await db.keyPractice.put({ profileId: other.id, key: 'f', hit: 4, miss: 1 });
  return { me, other };
}

describe('ProfileList', () => {
  beforeEach(resetDb);

  it('marks the current learner and does not offer to delete them', async () => {
    const { me } = await seed();
    render(<ProfileList currentId={me.id} />);
    expect(await screen.findByText(/An \(bạn\)/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^Xoá / })).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Xoá Bình' })).toBeInTheDocument();
  });

  it('asks for the name to be typed before deleting', async () => {
    const { me, other } = await seed();
    render(<ProfileList currentId={me.id} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Xoá Bình' }));
    const confirm = screen.getByRole('button', { name: 'Xoá hẳn' });
    expect(confirm).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Gõ lại tên để xác nhận'), { target: { value: 'sai' } });
    expect(confirm).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Gõ lại tên để xác nhận'), { target: { value: ' bình ' } });
    expect(confirm).toBeEnabled();
    fireEvent.click(confirm);
    await waitFor(async () => expect(await db.profiles.get(other.id)).toBeUndefined());
    expect(await db.lessonProgress.where('profileId').equals(other.id).count()).toBe(0);
    expect(await db.keyPractice.where('profileId').equals(other.id).count()).toBe(0);
    expect(await screen.findByText(/Đã xoá Bình/)).toBeInTheDocument();
  });

  it('cancels without deleting', async () => {
    const { me, other } = await seed();
    render(<ProfileList currentId={me.id} />);
    fireEvent.click(await screen.findByRole('button', { name: 'Xoá Bình' }));
    fireEvent.click(screen.getByRole('button', { name: 'Huỷ' }));
    expect(screen.queryByRole('button', { name: 'Xoá hẳn' })).toBeNull();
    expect(await db.profiles.get(other.id)).toBeDefined();
  });

  it('hides deleting when there is only one learner', async () => {
    const me = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    render(<ProfileList currentId={me.id} />);
    expect(await screen.findByText(/An \(bạn\)/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Xoá / })).toBeNull();
  });
});
