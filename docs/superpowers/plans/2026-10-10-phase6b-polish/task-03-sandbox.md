# Task 3: Phòng tự do

**Files:**
- Create: `client/src/sandbox/docs.ts`, `docs.test.ts`, `client/src/pages/SandboxPage.tsx`, `SandboxPage.test.tsx`,
  `client/src/pages/SandboxDocPage.tsx`, `SandboxDocPage.test.tsx`
- Modify: `client/src/App.tsx` (2 route trong `RequireProfile`), `client/src/pages/HomePage.tsx` (nút vào),
  `client/src/app/AppShell.tsx` (nếu có thanh điều hướng)

## Interfaces

```ts
// client/src/sandbox/docs.ts — mọi hàm nhận profileId
export type SandboxSim = 'word' | 'excel' | 'ppt';
export const SANDBOX_SIMS: readonly { sim: SandboxSim; label: string; emoji: string }[];
//   word 'Word – Văn bản' 📝 · excel 'Excel – Bảng tính' 📊 · ppt 'PowerPoint – Trình chiếu' 🎞️
export function blankState(sim: SandboxSim): unknown;   // dùng đúng hàm khởi tạo mà lessonKit dùng cho sim đó
export async function listDocs(profileId: string): Promise<SandboxDoc[]>;    // mới sửa gần nhất trước
export async function createDoc(profileId: string, sim: SandboxSim, now?: Date): Promise<SandboxDoc>;
//   tên mặc định 'Văn bản 1' / 'Bảng tính 1' / 'Bài trình chiếu 1' (số tăng theo số tệp cùng loại của hồ sơ đó)
export async function getDoc(profileId: string, id: string): Promise<SandboxDoc | undefined>;
export async function saveDocState(profileId: string, id: string, state: unknown, now?: Date): Promise<void>;
//   nếu state có mảng `past` (hoàn tác) thì lưu với `past: []` cho nhẹ
export async function renameDoc(profileId: string, id: string, name: string): Promise<void>;  // trim, rỗng → giữ tên cũ
export async function deleteDoc(profileId: string, id: string): Promise<void>;
```
id tệp: `crypto.randomUUID()`.

**`/sandbox`** "Phòng tự do": giới thiệu một dòng (luyện thoải mái, không chấm điểm, tự lưu); 3 nút tạo tệp mới; danh
sách tệp (emoji loại, tên, "sửa lúc …" theo giờ địa phương, nút Mở / Đổi tên / Xoá). Xoá hỏi lại bằng hộp thoại của
app ("Xoá «Văn bản 1»? Không lấy lại được."), không dùng `window.confirm`.

**`/sandbox/:id`**: thanh trên (← Phòng tự do, tên tệp sửa được tại chỗ, chữ "Đã lưu" / "Đang lưu…"), dưới là
`SIMS[doc.sim].Component` với `initial = doc.state ?? blankState(sim)`, `os` theo hồ sơ, `spotlight null`. `onState`
ghi bằng debounce **800 ms**; `visibilitychange` sang `hidden` và lúc rời trang thì ghi ngay phần đang chờ.
Tệp không tồn tại / của hồ sơ khác → về `/sandbox` kèm thông báo.

Trang chủ: thẻ "Phòng tự do 🧪 — mở Word, Excel, PowerPoint để tự luyện" dẫn tới `/sandbox`.

## Bước

- [ ] **1. Test `docs.test.ts` (FAIL)**: tạo 2 tệp Word → tên "Văn bản 1", "Văn bản 2"; `listDocs` sắp theo `updatedAt`
  giảm dần; hồ sơ B không thấy tệp của A và `getDoc(B, idCủaA)` trả `undefined`; `saveDocState` cắt `past`;
  `renameDoc` với "  " giữ tên; `deleteDoc` xoá đúng tệp; `blankState` của mỗi sim đi qua reducer của sim đó không lỗi.
- [ ] **2. Viết `docs.ts`**, chạy xanh.
- [ ] **3. Test trang (FAIL)**: SandboxPage hiện 3 nút tạo và danh sách; bấm "Word" tạo tệp và điều hướng tới
  `/sandbox/<id>`; xoá cần xác nhận. SandboxDocPage: vẽ đúng sim; đổi state → sau 800 ms (fake timers) `saveDocState`
  được gọi một lần; `visibilitychange` hidden ghi ngay; id lạ điều hướng về `/sandbox`.
- [ ] **4. Viết hai trang**, route, thẻ trang chủ. `npm test && npm run typecheck` xanh.
- [ ] **5. Kiểm trên trình duyệt**: tạo một tệp mỗi loại, gõ/định dạng vài thứ, tải lại trang → còn nguyên; đổi hồ sơ
  → không thấy tệp; ribbon ba app chạy đủ trong Phòng tự do (không phụ thuộc bài học); 390px dùng được.
- [ ] **6. Commit** `feat: Phòng tự do — Word, Excel, PowerPoint tự lưu theo hồ sơ` + dòng STATUS.
