# Task 3: Màn "Ai đang học?", ảnh đại diện mèo, nút đổi người

Đọc `00-overview.md` trước, và mục 5 của spec. **Task giao diện: có bước kiểm tra trình duyệt.**

**Files:**
- Create: `client/src/profiles/avatars.ts`, `client/src/profiles/ProfilePicker.tsx`, `client/src/profiles/ProfilePicker.test.tsx`
- Modify: `client/src/components/Mochi.tsx`, `client/src/App.tsx`, `client/src/app/AppShell.tsx`, `client/src/pages/WelcomePage.tsx`, `client/src/pages/WelcomePage.test.tsx`, `client/src/App.test.tsx`

**Interfaces:**
- `profiles/avatars.ts`:
```ts
export interface AvatarSkin { id: AvatarId; label: string; fur: string; patch: string; }
export const AVATARS: AvatarSkin[];          // đúng 6 mục, theo thứ tự cam, hồng, xanh, tím, vàng, mint
export function avatarSkin(id: AvatarId): AvatarSkin;   // id lạ → mục đầu tiên
```
  Nhãn tiếng Việt: 'Mèo cam', 'Mèo hồng', 'Mèo xanh', 'Mèo tím', 'Mèo vàng', 'Mèo bạc hà'.
- `Mochi.tsx`: thêm prop **tuỳ chọn** `skin?: { fur: string; patch: string }`. Không truyền ⇒ giữ đúng màu hiện tại, mọi chỗ đang dùng `<Mochi/>` không phải sửa.
- `ProfilePicker.tsx`: `export function ProfilePicker(): JSX.Element` — route `/who`.

**Luồng (spec mục 5):**
- `/who` hiện lưới thẻ, mỗi thẻ: mèo theo `avatar`, tên, dòng phụ `Cấp {n} · {m} bài đã xong`. Sắp theo `lastActiveAt` giảm dần.
- Bấm thẻ → `setCurrentProfileId(id)` + `touchProfile(id)` → điều hướng `/`.
- Thẻ cuối cùng là **+ Thêm người mới** → `/welcome`.
- Máy chưa có hồ sơ nào → `/who` tự chuyển `/welcome`.
- `App.tsx`: thêm route `/who`; `RequireProfile` đổi đích chuyển hướng từ `/welcome` sang `/who`.
- `AppShell`: nút bên trái cụm chỉ số, hiện mèo nhỏ + tên người đang học, `aria-label="Đổi người học"`, bấm → `/who`.
- `WelcomePage`: thêm bước chọn ảnh (sau bước tên), và sau khi `createProfile` trả về thì `setCurrentProfileId(p.id)` — không còn dựa vào việc "có hồ sơ nào đó" để điều hướng.

- [ ] **Step 1: Viết test (FAIL trước)**

`client/src/profiles/ProfilePicker.test.tsx`:
```tsx
  beforeEach(async () => { await resetDb(); });

  const seed = async () => {
    const a = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' }, new Date('2026-09-19T00:00:00Z'));
    const b = await createProfile({ name: 'Bình', os: 'mac', dailyGoalMin: 5, avatar: 'tim' }, new Date('2026-09-21T00:00:00Z'));
    await db.progress.put({ profileId: a.id, lessonId: 'basics.welcome', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' });
    return { a, b };
  };

  it('lists learners with the most recent first', async () => {
    await seed();
    renderRoute('/who');
    const cards = await screen.findAllByRole('button', { name: /^Học tiếp:/ });
    expect(cards.map((c) => c.textContent)).toEqual([expect.stringContaining('Bình'), expect.stringContaining('An')]);
  });

  it('shows how far each learner has got', async () => {
    await seed();
    renderRoute('/who');
    expect(await screen.findByText(/1 bài đã xong/)).toBeInTheDocument();
  });

  it('remembers the chosen learner and goes to the map', async () => {
    const { a } = await seed();
    renderRoute('/who');
    fireEvent.click(await screen.findByRole('button', { name: `Học tiếp: An` }));
    await waitFor(() => expect(getCurrentProfileId()).toBe(a.id));
    expect(await screen.findByText(/Chào An/)).toBeInTheDocument();
  });

  it('sends a brand-new computer to the welcome screen', async () => {
    renderRoute('/who');
    expect(await screen.findByText(/Mình là/)).toBeInTheDocument();
  });

  it('offers adding another learner', async () => {
    await seed();
    renderRoute('/who');
    fireEvent.click(await screen.findByRole('button', { name: 'Thêm người mới' }));
    expect(await screen.findByText(/Mình là/)).toBeInTheDocument();
  });
```
`renderRoute` là helper nhỏ trong file test: render `<App/>` thật trong `MemoryRouter` với `initialEntries={[route]}` (xem cách `App.test.tsx` đang làm) — test này kiểm cả điều hướng nên phải chạy qua `App`.

Thêm vào `client/src/App.test.tsx`:
```tsx
  it('sends a learner who has not been chosen yet to the picker', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    clearCurrentProfileId();
    renderApp('/');
    expect(await screen.findByText('Ai đang học?')).toBeInTheDocument();
  });

  it('sends a stale pointer to the picker instead of crashing', async () => {
    await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    setCurrentProfileId('p404');
    renderApp('/');
    expect(await screen.findByText('Ai đang học?')).toBeInTheDocument();
  });
```

Thêm vào `client/src/pages/WelcomePage.test.tsx`: sau khi đi hết các bước (gồm bước chọn ảnh mới), `getCurrentProfileId()` bằng id vừa tạo.

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- ProfilePicker App WelcomePage`

- [ ] **Step 3: Viết `avatars.ts` và prop `skin` cho Mochi**

6 bộ màu pastel hợp tông hiện có (`FUR` mặc định là kem, `PATCH` cam). Mỗi bộ chỉ đổi hai màu đó; mắt, mũi, miệng giữ nguyên. Kiểm tương phản nhẹ: chữ tên nằm dưới ảnh, không nằm trên ảnh, nên không có rủi ro tương phản.

- [ ] **Step 4: Viết `ProfilePicker.tsx`**

- Tiêu đề `<h1>Ai đang học?</h1>`, phụ đề "Chọn tên của bạn để học tiếp nhé."
- Thẻ người là `<button>` với `aria-label={`Học tiếp: ${p.name}`}`; bên trong: `<Mochi skin={avatarSkin(p.avatar)} size={96} animated={false} />`, tên đậm, dòng phụ `Cấp {levelFromXp(p.xp).level} · {n} bài đã xong`.
- Số bài đã xong lấy bằng một truy vấn gộp: `db.progress.where('profileId').anyOf(ids).toArray()` rồi đếm theo `profileId` (một truy vấn cho cả màn, đừng mỗi thẻ một truy vấn).
- Thẻ **+ Thêm người mới**: `aria-label="Thêm người mới"`.
- Không có hồ sơ nào (đã tải xong, `length === 0`) → `<Navigate to="/welcome" replace />`.
- Lưới `grid gap-4 sm:grid-cols-3`, ở 400px xuống một cột, không cuộn ngang.

- [ ] **Step 5: Nối vào App, AppShell, WelcomePage**

Theo phần "Luồng" ở trên. Ở `AppShell`, nút đổi người đặt **trước** cụm 🔥/Cấp/Luyện gõ để không đẩy các nút kia xuống dòng ở màn hình hẹp.

- [ ] **Step 6: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 7: Kiểm tra trên trình duyệt (BẮT BUỘC)**

1. Xoá dữ liệu cũ không cần thiết — cứ dùng dữ liệu đang có. Mở app: hiện màn "Ai đang học?" với hồ sơ sẵn có của bạn, ảnh mèo cam.
2. Bấm **+ Thêm người mới**, tạo người thứ hai tên khác, chọn mèo màu khác, chọn Mac. Vào học một bài ngắn.
3. Bấm tên mình trên thanh trên cùng → về màn chọn người → chọn lại người đầu: bản đồ, sao, XP, chuỗi ngày đúng của người đầu; phím tắt hiện lại kiểu Windows.
4. Mở `/typing` ở từng người: biểu đồ WPM và bản đồ nhiệt phím **không** lẫn nhau.
5. Tải lại trang (F5) ở giữa chừng: vẫn ở đúng người đang học.
6. Thu cửa sổ còn 400px: lưới thẻ xuống một cột, thanh trên cùng không vỡ. Console sạch.

- [ ] **Step 8: Commit + STATUS**

```bash
git add -A
git commit -m "feat(profiles): who-is-learning screen, cat avatars and learner switching" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
