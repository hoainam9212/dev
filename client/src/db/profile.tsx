import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { detectOs, type OS } from '@office-neko/shared';
import { db, type Profile } from './db';

export type NewProfile = Pick<Profile, 'name' | 'os' | 'dailyGoalMin'>;

export const ProfileContext = createContext<Profile | null | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const profile = useLiveQuery(async () => (await db.profile.get('me')) ?? null, []);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.font = profile?.fontScale ?? 'md';
    if (profile?.reducedMotion) root.dataset.motion = 'reduce';
    else delete root.dataset.motion;
  }, [profile?.fontScale, profile?.reducedMotion]);
  return <ProfileContext.Provider value={profile}>{children}</ProfileContext.Provider>;
}

export function useProfile(): Profile | null | undefined {
  return useContext(ProfileContext);
}

export function guessOs(): OS {
  if (typeof navigator === 'undefined') return 'win';
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  return detectOs(uaData?.platform || navigator.platform || navigator.userAgent || '');
}

export function useOs(): OS {
  return useProfile()?.os ?? guessOs();
}

export async function createProfile(p: NewProfile, now = new Date()): Promise<Profile> {
  const profile: Profile = {
    id: 'me',
    name: p.name.trim(),
    os: p.os,
    dailyGoalMin: p.dailyGoalMin,
    fontScale: 'md',
    sound: true,
    reducedMotion: false,
    xp: 0,
    createdAt: now.toISOString(),
  };
  await db.profile.put(profile);
  return profile;
}

export async function updateProfile(patch: Partial<Omit<Profile, 'id'>>): Promise<void> {
  await db.profile.update('me', patch);
}
