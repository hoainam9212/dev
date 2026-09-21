# Task 2: Người đang học, và mọi hàm tiến độ nhận `profileId`

Đọc `00-overview.md` trước, và mục 6 của spec. Task này không có giao diện — nhưng nó làm cả bộ test client xanh trở lại sau Task 1.

**Files:**
- Create: `client/src/profiles/current.ts`, `client/src/profiles/current.test.ts`
- Modify: `client/src/db/profile.tsx`, `client/src/progress/record.ts`, `client/src/progress/typing.ts`, `client/src/progress/useStats.ts`, `client/src/test/utils.tsx`, và mọi test cũ gọi các hàm này
- Modify: `client/src/pages/{HomePage,LessonPage,SettingsPage,TypingHubPage,SpeedTestPage,FishGamePage}.tsx`, `client/src/app/AppShell.tsx`, `client/src/help/GlossaryPanel.tsx` (truyền `profileId` xuống hook)

**Interfaces:**
- `profiles/current.ts`:
```ts
export const CURRENT_KEY = 'office-neko.currentProfileId';
export function getCurrentProfileId(): string | null;
export function setCurrentProfileId(id: string): void;
export function clearCurrentProfileId(): void;
/** Đăng ký nhận thay đổi; trả hàm huỷ đăng ký. */
export function subscribeCurrentProfileId(fn: () => void): () => void;
/** Hook React đọc con trỏ qua useSyncExternalStore. */
export function useCurrentProfileId(): string | null;
```
- `db/profile.tsx` sau khi sửa:
```ts
export function useProfileId(): string | null;          // id đang chọn (đã kiểm tra là có thật)
export function useProfile(): Profile | null | undefined;  // undefined = đang tải, null = chưa chọn / không còn
export function useOs(): OS;                            // giữ nguyên chữ ký
export function useUnlockAll(): boolean;                // giữ nguyên chữ ký
```
- Các hàm tiến độ:
```ts
recordLessonResult({ profileId, lessonId, stars, hintsUsed, timeMs, now? })
recordTypingRun({ profileId, mode, wpm, accuracy, elapsedMs, keyStats, now? })
useCompleted(profileId: string | null)
useStreak(profileId: string | null)
useTodayMinutes(profileId: string | null)
useTypingHub(profileId: string | null, limit = 20)
useTypingRuns(profileId: string | null, limit = 20)
useKeyStats(profileId: string | null)
```
- **Quy tắc:**
  - `profileId === null` ⇒ hook trả dữ liệu rỗng (`completed` rỗng, `loaded: false`, streak 0), **không** truy vấn CSDL. Nhờ vậy màn hình đang chờ chọn người không đọc nhầm của ai.
  - `localStorage` có thể ném (chế độ riêng tư): bọc mọi lần đọc/ghi trong `try/catch`, hỏng thì coi như chưa chọn ai.
  - `subscribeCurrentProfileId` báo cho cả tab hiện tại (`setCurrentProfileId` tự gọi các listener) lẫn tab khác (sự kiện `storage` của `window`).
  - `ProfileProvider` đọc `profiles.get(currentId)`; id trỏ vào hồ sơ không còn ⇒ tự `clearCurrentProfileId()` và trả `null`.
  - Khoá map subscription trong `typing.ts` đổi từ `limit` sang `` `${profileId}:${limit}` `` — nếu không, hai người dùng chung snapshot thống kê gõ phím.
  - `recordLessonResult` cập nhật XP của **đúng hồ sơ** (`db.profiles.get(profileId)`), không còn `'me'`.

- [ ] **Step 1: Viết test cho `current.ts` (FAIL trước)**

`client/src/profiles/current.test.ts`:
```ts
  beforeEach(() => localStorage.clear());

  it('remembers the chosen learner', () => {
    expect(getCurrentProfileId()).toBeNull();
    setCurrentProfileId('p2');
    expect(getCurrentProfileId()).toBe('p2');
    clearCurrentProfileId();
    expect(getCurrentProfileId()).toBeNull();
  });

  it('tells subscribers about a change in this tab', () => {
    const seen: (string | null)[] = [];
    const off = subscribeCurrentProfileId(() => seen.push(getCurrentProfileId()));
    setCurrentProfileId('p1');
    clearCurrentProfileId();
    off();
    setCurrentProfileId('p3');
    expect(seen).toEqual(['p1', null]);
  });

  it('survives a localStorage that throws', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('denied'); });
    expect(getCurrentProfileId()).toBeNull();
    spy.mockRestore();
  });
```

- [ ] **Step 2: Viết test tách biệt hai hồ sơ (FAIL trước)**

Thêm vào `client/src/progress/record.test.ts`:
```ts
  it('keeps two learners apart', async () => {
    const a = await createProfile({ name: 'A', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const b = await createProfile({ name: 'B', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
    await recordLessonResult({ profileId: a.id, lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, timeMs: 60_000 });
    expect((await db.profiles.get(a.id))?.xp).toBe(30);
    expect((await db.profiles.get(b.id))?.xp).toBe(0);
    expect(await db.progress.get([b.id, 'basics.welcome'])).toBeUndefined();
    expect((await db.progress.get([a.id, 'basics.welcome']))?.stars).toBe(3);
  });
```

Thêm vào `client/src/progress/typing.test.ts` một test tương tự: ghi một lượt gõ cho `a`, rồi `useTypingHub(b.id)` không thấy lượt nào và `keyStats` của `b` rỗng.

- [ ] **Step 3: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- current record typing`

- [ ] **Step 4: Viết `current.ts` rồi sửa `db/profile.tsx`**

`current.ts` dùng một `Set` listener cục bộ + `window.addEventListener('storage', …)`; `useCurrentProfileId` dùng `useSyncExternalStore(subscribeCurrentProfileId, getCurrentProfileId)`.

`db/profile.tsx`: `ProfileProvider` lấy `const id = useCurrentProfileId()` rồi `useLiveQuery(() => (id ? db.profiles.get(id) : null) ?? null, [id])`; `createProfile`/`updateProfile` chuyển hẳn sang `profiles/manage.ts` (Task 1 đã viết) và `profile.tsx` **re-export** chúng để các import cũ khỏi vỡ hàng loạt — trừ `updateProfile`, giờ cần `id` nên mọi chỗ gọi phải sửa.

- [ ] **Step 5: Sửa các hàm tiến độ và mọi chỗ gọi**

Theo chữ ký ở phần Interfaces. Ở tầng trang, lấy id bằng `useProfileId()` rồi truyền xuống. Tìm hết chỗ phải sửa:
```bash
grep -rn "useCompleted\|useStreak\|useTodayMinutes\|useTypingHub\|useTypingRuns\|useKeyStats\|recordLessonResult\|recordTypingRun\|updateProfile" client/src
```

`client/src/test/utils.tsx`: `makeProfile` sinh hồ sơ mới (`id: 'p1'`, `avatar: 'cam'`, `lastActiveAt`), và `renderWithProfile` **cũng** đặt `setCurrentProfileId(profile.id)` để các hook trong cây nhận đúng id; `resetDb` thêm `localStorage.clear()`.

- [ ] **Step 6: Chạy toàn bộ, xác nhận PASS**

Run: `npm test && npm run typecheck`
Expected: PASS hết — kể cả các test đã đỏ từ Task 1. Số test không được ít đi so với trước Task 1 (124 ở client); test cũ nào không còn nghĩa thì phải thay bằng test tương đương ở API mới, không xoá trắng.

- [ ] **Step 7: Commit + STATUS**

```bash
git add -A
git commit -m "refactor(progress): every read and write takes a profileId" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
