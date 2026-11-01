import { db } from '../db/db';

/** Ghi một lộ trình đã đạt kiểm tra đầu vào. Gọi lại không tạo bản trùng; không bao giờ thu hồi. */
export async function markTestedOut(profileId: string, trackId: string): Promise<void> {
  await db.transaction('rw', db.profiles, async () => {
    const p = await db.profiles.get(profileId);
    if (!p) return;
    const have = p.testedOut ?? [];
    if (have.includes(trackId)) return;
    await db.profiles.update(profileId, { testedOut: [...have, trackId] });
  });
}
