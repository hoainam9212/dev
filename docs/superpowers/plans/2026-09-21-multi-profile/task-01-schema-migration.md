# Task 1: Dexie v2, bảng `profiles`, di trú dữ liệu cũ

Đọc `00-overview.md` trước, và mục 4 của spec. Task này không có giao diện.

**Files:**
- Modify: `client/src/db/db.ts`
- Create: `client/src/profiles/manage.ts`, `client/src/profiles/manage.test.ts`, `client/src/db/migration.test.ts`

**Interfaces:**
- Produces trong `db.ts`:
```ts
export type AvatarId = 'cam' | 'hong' | 'xanh' | 'tim' | 'vang' | 'mint';

export interface Profile {
  id: string; name: string; avatar: AvatarId; os: OS;
  dailyGoalMin: 5 | 10 | 20; fontScale: 'md' | 'lg' | 'xl';
  sound: boolean; reducedMotion: boolean; unlockAll?: boolean;
  xp: number; createdAt: string; lastActiveAt: string;
}
export const TABLES = ['profiles', 'progress', 'typingRuns', 'keyStats', 'activity', 'badges', 'sandboxDocs'] as const;
```
  Mọi dòng của 6 bảng dữ liệu mang thêm `profileId: string` (thêm vào `ProgressRow`, `TypingRun`, `KeyStatRow`, `ActivityRow`, `BadgeRow`, `SandboxDoc`).
- Produces trong `profiles/manage.ts`:
```ts
export type NewProfile = Pick<Profile, 'name' | 'os' | 'dailyGoalMin' | 'avatar'>;
export function nextProfileId(existing: string[]): string;          // 'p<max+1>', rỗng → 'p1'
export async function listProfiles(): Promise<Profile[]>;           // sắp theo lastActiveAt giảm dần
export async function createProfile(p: NewProfile, now?: Date): Promise<Profile>;
export async function updateProfile(id: string, patch: Partial<Omit<Profile, 'id'>>): Promise<void>;
export async function touchProfile(id: string, now?: Date): Promise<void>;   // đặt lastActiveAt
export async function deleteProfile(id: string): Promise<void>;     // xoá hồ sơ + mọi dòng của nó
export async function countProfiles(): Promise<number>;
```
- **Quy tắc:**
  - `nextProfileId` đọc phần số sau `p`, bỏ qua id không đúng dạng, trả `p<max+1>`. Id đã xoá không dùng lại.
  - `createProfile` đặt `xp: 0`, `unlockAll: false`, `createdAt = lastActiveAt = now`, cắt khoảng trắng thừa của `name`.
  - `deleteProfile` xoá trong **một** transaction: hồ sơ + mọi dòng có `profileId` đó ở cả 6 bảng. Hồ sơ không tồn tại → không làm gì, không ném lỗi.
  - `manage.ts` **không** đụng tới `localStorage` và không biết ai đang học (xem bất biến 2 ở overview). Việc "không được xoá người cuối cùng / người đang học" là luật của tầng giao diện (Task 4), không phải của hàm này — nhưng `deleteProfile` phải dọn sạch dữ liệu để luật đó có nghĩa.

- [ ] **Step 1: Tạo nhánh**

```bash
git checkout -b feat/multi-profile
```

- [ ] **Step 2: Viết test di trú (FAIL trước)**

`client/src/db/migration.test.ts` — dựng một database **v1 thật** bằng Dexie rồi mở lại bằng lớp `NekoDB` hiện tại để `upgrade` chạy. Dùng tên DB riêng cho test (`NekoDB` đã nhận tham số `name`) để không đụng DB của các test khác.

```ts
import { describe, it, expect } from 'vitest';
import Dexie from 'dexie';
import { NekoDB } from './db';

async function seedV1(name: string) {
  const old = new Dexie(name);
  old.version(1).stores({
    profile: 'id', progress: 'lessonId', typingRuns: '++id, at',
    keyStats: 'key', activity: 'day', badges: 'id', sandboxDocs: 'id, sim, updatedAt',
  });
  await old.open();
  await old.table('profile').put({ id: 'me', name: 'An', os: 'win', dailyGoalMin: 10, fontScale: 'lg', sound: false, reducedMotion: false, unlockAll: true, xp: 130, createdAt: '2026-09-19T00:00:00.000Z' });
  await old.table('progress').bulkPut([
    { lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1000, completedAt: '2026-09-20T00:00:00.000Z' },
    { lessonId: 'basics.mouse.click', stars: 2, hintsUsed: 1, bestTimeMs: 2000, completedAt: '2026-09-20T00:00:00.000Z' },
  ]);
  await old.table('activity').put({ day: '2026-09-20', minutes: 12, xp: 50 });
  await old.table('keyStats').put({ key: 'f', hit: 20, miss: 3 });
  await old.table('typingRuns').add({ at: '2026-09-20T01:00:00.000Z', mode: 'test', wpm: 25, accuracy: 0.96 });
  await old.table('badges').put({ id: 'fast-fingers', earnedAt: '2026-09-20T01:00:00.000Z' });
  old.close();
}

describe('database migration v1 → v2', () => {
  it('keeps the old learner and hands every row to them', async () => {
    const name = `neko-mig-${Date.now()}`;
    await seedV1(name);
    const db = new NekoDB(name);
    await db.open();

    const profiles = await db.profiles.toArray();
    expect(profiles).toHaveLength(1);
    expect(profiles[0]).toMatchObject({ id: 'p1', name: 'An', os: 'win', fontScale: 'lg', unlockAll: true, xp: 130, avatar: 'cam' });
    expect(profiles[0]?.lastActiveAt).toEqual(expect.any(String));

    expect(await db.progress.count()).toBe(2);
    for (const t of ['progress', 'activity', 'keyStats', 'typingRuns', 'badges'] as const) {
      const rows = await db.table(t).toArray();
      expect(rows.length, t).toBeGreaterThan(0);
      for (const r of rows) expect(r.profileId, `${t} row without profileId`).toBe('p1');
    }
    expect((await db.progress.get(['p1', 'basics.welcome']))?.stars).toBe(3);
    expect(db.tables.map((t) => t.name)).not.toContain('profile');
    await db.delete();
  });

  it('opens a fresh database with no profiles and loses nothing', async () => {
    const db = new NekoDB(`neko-fresh-${Date.now()}`);
    await db.open();
    expect(await db.profiles.count()).toBe(0);
    await db.delete();
  });
});
```

- [ ] **Step 3: Viết test cho `manage.ts` (FAIL trước)**

`client/src/profiles/manage.test.ts` — dùng `resetDb()` của `../test/utils` trong `beforeEach`:
```ts
  it('numbers new profiles and never reuses an id', async () => {
    expect(nextProfileId([])).toBe('p1');
    expect(nextProfileId(['p1', 'p2'])).toBe('p3');
    expect(nextProfileId(['p1', 'p9', 'rac'])).toBe('p10');
  });

  it('creates a profile with zero xp and trims the name', async () => {
    const p = await createProfile({ name: '  Lan  ', os: 'mac', dailyGoalMin: 5, avatar: 'hong' });
    expect(p).toMatchObject({ id: 'p1', name: 'Lan', xp: 0, unlockAll: false, avatar: 'hong' });
    expect(p.createdAt).toBe(p.lastActiveAt);
  });

  it('lists the most recent learner first', async () => {
    await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' }, new Date('2026-09-19T00:00:00Z'));
    const b = await createProfile({ name: 'B', os: 'win', dailyGoalMin: 10, avatar: 'tim' }, new Date('2026-09-20T00:00:00Z'));
    expect((await listProfiles()).map((p) => p.id)).toEqual([b.id, 'p1']);
    await touchProfile('p1', new Date('2026-09-21T00:00:00Z'));
    expect((await listProfiles())[0]?.id).toBe('p1');
  });

  it('deletes a profile with all of its rows and leaves the others alone', async () => {
    const a = await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await createProfile({ name: 'B', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
    await db.progress.bulkPut([
      { profileId: a.id, lessonId: 'l1', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' },
      { profileId: b.id, lessonId: 'l1', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' },
    ]);
    await db.keyStats.put({ profileId: a.id, key: 'f', hit: 1, miss: 0 });
    await deleteProfile(a.id);
    expect(await db.profiles.count()).toBe(1);
    expect(await db.progress.toArray()).toEqual([expect.objectContaining({ profileId: b.id })]);
    expect(await db.keyStats.count()).toBe(0);
  });

  it('ignores a delete for an id that is not there', async () => {
    await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    await expect(deleteProfile('p99')).resolves.toBeUndefined();
    expect(await db.profiles.count()).toBe(1);
  });
```

- [ ] **Step 4: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- migration manage`
Expected: FAIL — chưa có `db.profiles`, chưa có module `manage`.

- [ ] **Step 5: Viết `db.ts` v2**

Giữ nguyên `version(1)` **y như cũ** (Dexie cần biết lịch sử để nâng cấp), thêm:

```ts
    this.version(2).stores({
      profile: null,
      profiles: 'id, lastActiveAt',
      progress: '[profileId+lessonId], profileId',
      typingRuns: '++id, [profileId+at], profileId',
      keyStats: '[profileId+key], profileId',
      activity: '[profileId+day], profileId',
      badges: '[profileId+id], profileId',
      sandboxDocs: 'id, [profileId+updatedAt], profileId',
    }).upgrade(async (tx) => { /* xem quy tắc dưới */ });
```

Thân `upgrade`:
1. `const old = await tx.table('profile').get('me');` — không có thì `return`.
2. `await tx.table('profiles').put({ ...old, id: 'p1', avatar: 'cam', lastActiveAt: new Date().toISOString() })` (bỏ trường `id: 'me'` cũ bằng cách ghi đè `id`).
3. Với từng bảng trong `['progress','typingRuns','keyStats','activity','badges','sandboxDocs']`: `await tx.table(t).toCollection().modify((r) => { r.profileId = 'p1'; })`.

Khai báo `profiles!: Table<Profile, string>` và bỏ `profile!`.

- [ ] **Step 6: Viết `profiles/manage.ts`**

Theo chữ ký ở phần Interfaces. `deleteProfile` dùng `db.transaction('rw', db.tables, …)` và với mỗi bảng dữ liệu `await db.table(t).where('profileId').equals(id).delete()`.

- [ ] **Step 7: Chạy test, xác nhận PASS**

Run: `npm test -w client -- migration manage`
Expected: PASS.

Chạy tiếp toàn bộ: `npm test` — **nhiều test cũ sẽ đỏ** vì còn gọi `db.profile`. Đó là dự kiến; Task 2 sửa chúng. Ghi số test đỏ vào `STATUS.md` để Task 2 biết đích đến.

- [ ] **Step 8: Commit + STATUS**

```bash
git add -A
git commit -m "feat(db): profiles table and v1→v2 migration keyed by profileId" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
