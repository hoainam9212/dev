# Task 4: Cài đặt — đổi ảnh, danh sách người học, xoá hồ sơ

Đọc `00-overview.md` trước, và mục 7 của spec. **Task giao diện: có bước kiểm tra trình duyệt.**

**Files:**
- Create: `client/src/profiles/ProfileList.tsx`, `client/src/profiles/ProfileList.test.tsx`
- Modify: `client/src/pages/SettingsPage.tsx`, `client/src/pages/SettingsPage.test.tsx`

**Interfaces:**
- Consumes: `listProfiles`, `deleteProfile`, `updateProfile`, `countProfiles` (Task 1); `AVATARS`, `avatarSkin` (Task 3); `useProfileId` (Task 2).
- Produces:
```tsx
export function ProfileList(props: { currentId: string }): JSX.Element;
```

**Nội dung thêm vào trang Cài đặt:**

1. Trong mục **Hồ sơ** (đã có ô tên): hàng chọn ảnh — 6 nút mèo, `role="radio"` trong `role="radiogroup" aria-label="Ảnh đại diện"`, bấm là `updateProfile(id, { avatar })`.
2. Mục mới **Người học trên máy này**, đặt ngay dưới mục Hồ sơ, render `<ProfileList currentId={id} />`.

**Luật của `ProfileList`:**
- Mỗi dòng: mèo nhỏ, tên, và dòng phụ `Học gần nhất: {ngày}` (định dạng `dd/MM/yyyy`; nếu là hôm nay thì ghi "hôm nay", hôm qua thì "hôm qua").
- Dòng của chính người đang học có nhãn **(bạn)** sau tên và **không có** nút Xoá.
- Nút **Xoá** ở các dòng khác mở một khối xác nhận ngay dưới dòng đó: câu cảnh báo nêu rõ mất gì, một ô nhập, và nút **Xoá hẳn** chỉ bật khi ô nhập **khớp đúng tên** người đó (so sau khi cắt khoảng trắng, không phân biệt hoa thường). Có nút **Huỷ**.
- Câu cảnh báo: `Toàn bộ tiến độ của {tên} sẽ mất và không lấy lại được. Gõ lại tên "{tên}" để xác nhận.`
- Còn đúng một hồ sơ trên máy ⇒ không hiện nút Xoá ở đâu cả (và đằng nào dòng duy nhất cũng là "bạn").
- Xoá xong: danh sách tự cập nhật, hiện dòng `Đã xoá {tên}.`

- [ ] **Step 1: Viết test (FAIL trước)**

`client/src/profiles/ProfileList.test.tsx`:
```tsx
  const seed = async () => {
    const me = await createProfile({ name: 'An', os: 'win', dailyGoalMin: 10, avatar: 'cam' });
    const other = await createProfile({ name: 'Bình', os: 'win', dailyGoalMin: 10, avatar: 'tim' });
    await db.progress.put({ profileId: other.id, lessonId: 'l1', stars: 3, hintsUsed: 0, bestTimeMs: 1, completedAt: 'x' });
    return { me, other };
  };

  it('marks the current learner and does not offer to delete them', async () => {
    const { me } = await seed();
    render(<ProfileList currentId={me.id} />);
    expect(await screen.findByText(/An \(bạn\)/)).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^Xoá / })).toHaveLength(1);
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
    expect(await db.progress.where('profileId').equals(other.id).count()).toBe(0);
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
```

Thêm vào `client/src/pages/SettingsPage.test.tsx`:
```tsx
  it('changes the avatar', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('radio', { name: 'Mèo tím' }));
    await waitFor(async () => expect((await db.profiles.get('p1'))?.avatar).toBe('tim'));
  });
```

- [ ] **Step 2: Chạy test, xác nhận FAIL**

Run: `npm test -w client -- ProfileList SettingsPage`

- [ ] **Step 3: Viết `ProfileList.tsx`**

Dùng `useLiveQuery(() => listProfiles(), [])` để danh sách tự cập nhật sau khi xoá. Trạng thái "đang xác nhận xoá ai" và nội dung ô nhập là state cục bộ (`useState`), không lưu đâu cả.

- [ ] **Step 4: Nối vào `SettingsPage`**

Thêm hàng chọn ảnh vào mục Hồ sơ và mục **Người học trên máy này**. Mọi lời gọi `updateProfile` trong trang này giờ truyền `id` (Task 2 đã đổi chữ ký).

- [ ] **Step 5: Chạy test, xác nhận PASS**

Run: `npm test && npm run typecheck`

- [ ] **Step 6: Kiểm tra trên trình duyệt (BẮT BUỘC)**

Dùng hai hồ sơ đã tạo ở Task 3:
1. Cài đặt → đổi ảnh đại diện của mình: mèo trên thanh trên cùng và ở màn chọn người đổi theo.
2. Danh sách "Người học trên máy này" hiện đủ hai người, dòng của mình có **(bạn)** và không có nút Xoá.
3. Bấm **Xoá** người kia: nút **Xoá hẳn** mờ cho tới khi gõ đúng tên; gõ sai vẫn mờ; **Huỷ** đóng lại không xoá gì.
4. Xoá thật một hồ sơ tạm (tạo một hồ sơ "Thử" rồi xoá): danh sách còn một người, màn chọn người cũng còn một thẻ, tiến độ của bạn nguyên vẹn.
5. Còn một hồ sơ duy nhất: không còn nút Xoá nào. Console sạch.

- [ ] **Step 7: Commit + STATUS**

```bash
git add -A
git commit -m "feat(settings): avatar picker and learner management with guarded delete" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```
