# Task 5: Sao lưu phiên bản 2, vẫn đọc được file phiên bản 1

Đọc `00-overview.md` trước, và mục 8 của spec. **Task giao diện: có bước kiểm tra trình duyệt.**

**Files:**
- Modify: `client/src/progress/backup.ts`, `client/src/progress/backup.test.ts`, `client/src/pages/SettingsPage.tsx`, `client/src/pages/SettingsPage.test.tsx`

**Interfaces:**
- Produces:
```ts
export const BACKUP_SCHEMA = 2;
export interface BackupFile {
  app: 'office-neko';
  schemaVersion: number;
  exportedAt: string;
  tables: Record<TableName, unknown[]>;   // TABLES của v2, gồm 'profiles'
}
/** Nhận file v1 hoặc v2, luôn trả về dạng v2. Ném Error với câu tiếng Việt nếu file hỏng. */
export function parseBackup(text: string): BackupFile;
/** Số người học trong file — Cài đặt hiện con số này trong câu xác nhận. */
export function profilesInBackup(b: BackupFile): number;
```
- **Quy tắc:**
  - `exportBackup` xuất đủ 7 bảng của v2.
  - `parseBackup` gặp `schemaVersion: 1` thì chuyển đổi ngay, đúng luật di trú của Task 1: hàng `profile` (`id: 'me'`) thành hồ sơ `p1` với `avatar: 'cam'` và `lastActiveAt = exportedAt`; mọi dòng của 6 bảng dữ liệu được gán `profileId: 'p1'`. File v1 **không có** hàng `profile` ⇒ không có hồ sơ nào, và các bảng dữ liệu bị bỏ (dữ liệu vô chủ thì vô nghĩa) — trả về file v2 rỗng.
  - `schemaVersion` không phải 1 hay 2 ⇒ vẫn ném lỗi như cũ.
  - `importBackup` giữ nguyên cách làm "xoá sạch rồi ghi đè", nhưng sau khi ghi xong phải `clearCurrentProfileId()` để app quay về màn chọn người (spec mục 8).
  - Câu xác nhận trong Cài đặt đổi thành: `File này có {n} người học. Toàn bộ dữ liệu hiện tại trên máy sẽ được thay thế. Tiếp tục?` (giữ nguyên phần ngày xuất file đang có).

- [ ] **Step 1: Viết test (FAIL trước)**

Thêm vào `client/src/progress/backup.test.ts`:
```ts
  it('exports every table including profiles', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await exportBackup();
    expect(b.schemaVersion).toBe(2);
    expect(Object.keys(b.tables).sort()).toEqual([...TABLES].sort());
    expect(b.tables.profiles).toHaveLength(1);
  });

  it('round-trips two learners', async () => {
    const a = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const c = await createProfile({ name: 'Bình', os: 'mac', dailyGoalMin: 5, avatar: 'tim' });
    await db.progress.put({ profileId: c.id, lessonId: 'l1', stars: 2, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' });
    const file = await exportBackup();
    await resetDb();
    await importBackup(parseBackup(JSON.stringify(file)));
    expect((await db.profiles.toArray()).map((p) => p.name).sort()).toEqual(['An', 'Bình']);
    expect(await db.progress.get([c.id, 'l1'])).toMatchObject({ stars: 2 });
    expect(await db.profiles.get(a.id)).toBeDefined();
  });

  it('accepts a version 1 file and turns it into one learner', () => {
    const v1 = {
      app: 'office-neko', schemaVersion: 1, exportedAt: '2026-09-20T00:00:00.000Z',
      tables: {
        profile: [{ id: 'me', name: 'An', os: 'win', dailyGoalMin: 10, fontScale: 'md', sound: true, reducedMotion: false, xp: 60, createdAt: '2026-09-19T00:00:00.000Z' }],
        progress: [{ lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' }],
        typingRuns: [], keyStats: [], activity: [{ day: '2026-09-20', minutes: 5, xp: 30 }], badges: [], sandboxDocs: [],
      },
    };
    const b = parseBackup(JSON.stringify(v1));
    expect(b.schemaVersion).toBe(2);
    expect(b.tables.profiles).toEqual([expect.objectContaining({ id: 'p1', name: 'An', xp: 60, avatar: 'cam', lastActiveAt: '2026-09-20T00:00:00.000Z' })]);
    expect(b.tables.progress).toEqual([expect.objectContaining({ profileId: 'p1', lessonId: 'basics.welcome' })]);
    expect(b.tables.activity).toEqual([expect.objectContaining({ profileId: 'p1', day: '2026-09-20' })]);
    expect(profilesInBackup(b)).toBe(1);
  });

  it('turns an ownerless version 1 file into an empty backup', () => {
    const v1 = { app: 'office-neko', schemaVersion: 1, exportedAt: '2026-09-20T00:00:00.000Z', tables: { profile: [], progress: [{ lessonId: 'x', stars: 1, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' }], typingRuns: [], keyStats: [], activity: [], badges: [], sandboxDocs: [] } };
    const b = parseBackup(JSON.stringify(v1));
    expect(b.tables.profiles).toEqual([]);
    expect(b.tables.progress).toEqual([]);
  });

  it('still refuses an unknown version', () => {
    const bad = { app: 'office-neko', schemaVersion: 9, exportedAt: 'x', tables: {} };
    expect(() => parseBackup(JSON.stringify(bad))).toThrow(/9/);
  });

  it('forgets who was learning after a restore', async () => {
    setCurrentProfileId('p1');
    await importBackup(parseBackup(JSON.stringify(await exportBackup())));
    expect(getCurrentProfileId()).toBeNull();
  });
```

Thêm vào `client/src/pages/SettingsPage.test.tsx`: sau khi chọn file sao lưu hai người, câu xác nhận chứa `2 người học`.

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- backup SettingsPage`

- [ ] **Step 3: Viết code**

`backup.ts`: tách hàm `migrateV1(file): BackupFile` cho dễ đọc và cho test gọi gián tiếp qua `parseBackup`. Phần kiểm tra file ("thiếu bảng X", "không phải JSON") giữ nguyên câu chữ tiếng Việt đang có, chỉ đổi danh sách bảng cần kiểm theo đúng phiên bản của file.

- [ ] **Step 4: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 5: Kiểm tra trên trình duyệt (BẮT BUỘC)**

1. Với hai hồ sơ trên máy: Cài đặt → **Tải file sao lưu**. Mở file JSON vừa tải, xem có mảng `profiles` với hai người.
2. Tạo thêm một hồ sơ "Thử", rồi **Khôi phục từ file** vừa tải: câu xác nhận nói đúng "2 người học"; sau khi khôi phục app quay về màn chọn người và chỉ còn hai người, hồ sơ "Thử" biến mất.
3. Vào từng người: tiến độ, XP, thống kê gõ đúng như trước khi sao lưu.
4. Console sạch.

- [ ] **Step 6: Commit + STATUS**

```bash
git add -A
git commit -m "feat(backup): version 2 backups with every learner, still reads version 1 files" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
