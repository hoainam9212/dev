import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { db, type Profile } from '../db/db';
import { ProfileContext } from '../db/profile';
import { clearCurrentProfileId, setCurrentProfileId } from '../profiles/current';

export async function resetDb(): Promise<void> {
  await Promise.all(db.tables.map((t) => t.clear()));
  clearCurrentProfileId();
}

export function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: 'An',
    avatar: 'cam',
    os: 'win',
    dailyGoalMin: 10,
    fontScale: 'md',
    sound: false,
    reducedMotion: false,
    xp: 0,
    createdAt: '2026-09-19T00:00:00.000Z',
    lastActiveAt: '2026-09-19T00:00:00.000Z',
    ...overrides,
  };
}

export function renderWithProfile(
  ui: ReactElement,
  { profile = makeProfile(), route = '/' }: { profile?: Profile | null; route?: string } = {},
) {
  // Các hook dữ liệu nhận profileId từ cây React, nhưng vài chỗ (ví dụ khu Luyện
  // gõ) đọc qua con trỏ người đang học — đặt luôn cho khớp với hồ sơ giả lập.
  if (profile) setCurrentProfileId(profile.id);
  else clearCurrentProfileId();
  return render(
    <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProfileContext.Provider value={profile}>{ui}</ProfileContext.Provider>
    </MemoryRouter>,
  );
}
