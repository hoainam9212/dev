import { db, OWNED_TABLES, type Profile } from '../db/db';

export type NewProfile = Pick<Profile, 'name' | 'os' | 'dailyGoalMin' | 'avatar'>;

/**
 * Id kế tiếp: `p<lớn nhất + 1>`. Id của hồ sơ đã xoá không bao giờ dùng lại, để
 * dữ liệu sót lại — nếu có — không dính vào người mới.
 */
export function nextProfileId(existing: string[]): string {
  const max = existing.reduce((acc, id) => {
    const n = /^p(\d+)$/.exec(id);
    return n ? Math.max(acc, Number(n[1])) : acc;
  }, 0);
  return `p${max + 1}`;
}

/** Mọi hồ sơ trên máy, người học gần nhất đứng đầu. */
export async function listProfiles(): Promise<Profile[]> {
  const rows = await db.profiles.toArray();
  return rows.sort((a, b) => b.lastActiveAt.localeCompare(a.lastActiveAt));
}

export async function countProfiles(): Promise<number> {
  return db.profiles.count();
}

export async function createProfile(p: NewProfile, now = new Date()): Promise<Profile> {
  const at = now.toISOString();
  return db.transaction('rw', db.profiles, async () => {
    const ids = await db.profiles.toCollection().primaryKeys();
    const profile: Profile = {
      id: nextProfileId(ids),
      name: p.name.trim(),
      avatar: p.avatar,
      os: p.os,
      dailyGoalMin: p.dailyGoalMin,
      fontScale: 'md',
      sound: true,
      reducedMotion: false,
      unlockAll: false,
      xp: 0,
      createdAt: at,
      lastActiveAt: at,
    };
    await db.profiles.put(profile);
    return profile;
  });
}

export async function updateProfile(id: string, patch: Partial<Omit<Profile, 'id'>>): Promise<void> {
  await db.profiles.update(id, patch);
}

/** Đánh dấu hồ sơ vừa được chọn học. */
export async function touchProfile(id: string, now = new Date()): Promise<void> {
  await db.profiles.update(id, { lastActiveAt: now.toISOString() });
}

/**
 * Xoá hồ sơ và toàn bộ dữ liệu của riêng người đó. Luật "không xoá người cuối
 * cùng / không xoá chính mình" thuộc về giao diện, không phải hàm này.
 */
export async function deleteProfile(id: string): Promise<void> {
  await db.transaction('rw', db.tables, async () => {
    await db.profiles.delete(id);
    for (const name of OWNED_TABLES) {
      await db.table(name).where('profileId').equals(id).delete();
    }
  });
}
