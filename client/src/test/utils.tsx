import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db, type Profile } from '../db/db';
import { ProfileContext } from '../db/profile';

export async function resetDb(): Promise<void> {
  await Promise.all(db.tables.map((t) => t.clear()));
}

export function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: 'me',
    name: 'An',
    os: 'win',
    dailyGoalMin: 10,
    fontScale: 'md',
    sound: false,
    reducedMotion: false,
    xp: 0,
    createdAt: '2026-09-19T00:00:00.000Z',
    ...overrides,
  };
}

export function renderWithProfile(
  ui: ReactElement,
  { profile = makeProfile(), route = '/' }: { profile?: Profile | null; route?: string } = {},
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProfileContext.Provider value={profile}>{ui}</ProfileContext.Provider>
    </MemoryRouter>,
  );
}
