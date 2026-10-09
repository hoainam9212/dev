# Task 1: Start / Taskbar (Windows), Dock / Spotlight (Mac) + một bài mỗi HĐH

**Files:**
- Modify: `shared/src/sims/desktop.ts` (+ `desktop.test.ts`), `client/src/sims/desktop/Chrome.tsx`,
  `DesktopSim.tsx` (+ test), `client/src/content/lessons/basics-files.ts` (hoặc file mới `basics-shell.ts`),
  `lessons/index.ts`, `tracks.ts`, `help-ids.ts`, `glossary.json`

Trước khi làm: `git checkout -b feat/backlog` từ `master`; soát email gmail.

## Interfaces

```ts
// desktop.ts — state thêm (khởi tạo mặc định trong hàm initial hiện có)
shell: { menuOpen: boolean; query: string; launched: AppId | null }
export type AppId = 'word' | 'excel' | 'ppt' | 'explorer' | 'browser';
export const SHELL_APPS: readonly { id: AppId; win: string; mac: string }[];
//   word 'Word'/'Word' · excel 'Excel'/'Excel' · ppt 'PowerPoint'/'PowerPoint' · explorer 'File Explorer'/'Finder' · browser 'Edge'/'Safari'
// action thêm:
| { type: 'toggleMenu' }            // Win: Start menu; Mac: Spotlight
| { type: 'setQuery'; text: string }
| { type: 'launch'; app: AppId }    // đóng menu, ghi launched, xoá query
| { type: 'closeApp' }              // launched về null
// check thêm (grader desktop):
| { kind: 'launched'; app: AppId }
```

Giao diện (`Chrome.tsx` hiện vẽ "▦ Start" chỉ để trang trí):
- **Windows:** taskbar dưới có nút **Start** thật (helpId `shell.start`) mở Start menu: ô tìm kiếm trên cùng (helpId
  `shell.search`), lưới biểu tượng ứng dụng ghim; gõ vào ô lọc theo tên (không phân biệt hoa thường); bấm biểu tượng =
  `launch`. Biểu tượng ứng dụng đã ghim trên taskbar (helpId `shell.taskbar`) cũng `launch`.
- **Mac:** **Dock** dưới (helpId `shell.dock`) với biểu tượng ứng dụng; biểu tượng kính lúp ở thanh menu trên mở
  **Spotlight** (helpId `shell.spotlight`): ô tìm giữa màn hình, Enter mở kết quả đầu.
- `launched` khác null → hiện cửa sổ giả "Đang mở Word…" có nút đóng (`closeApp`).
- Esc đóng menu/Spotlight. Phím Windows/⌘+Space **không** dùng trong check (Review Focus 2); lời bài nhắc chúng là mẹo.

Bài mới, theo khuôn `filesLessons(os)`: `basics.shell.win` "Start và thanh Taskbar" / `basics.shell.mac` "Dock và
Spotlight", chương mới `{ id: 'basics.shell', title: 'Mở ứng dụng', lessonIds: [...] }` đặt **trước** `basics.files`.
Thực hành: (1) mở Word bằng Start menu / Dock → `launched word`; (2) tìm Excel bằng ô tìm kiếm / Spotlight →
`launched excel` (setup đóng app trước). Glossary: `start-menu`, `taskbar`, `dock`, `spotlight` (lessonIds đúng bài).

## Bước

- [ ] **1. Test shared (FAIL)**: `toggleMenu` mở/đóng; `setQuery` lưu chữ; `launch` đóng menu + ghi app, xoá query;
  `closeApp`; check `launched` đạt/trượt (lời "Hãy mở Excel từ Start menu" theo HĐH thì do lời bài, grader nói chung).
- [ ] **2. Viết shared**, chạy xanh.
- [ ] **3. Test client (FAIL)**: Win có nút Start, bấm hiện ô tìm; gõ "exc" chỉ còn Excel; bấm Excel → hiện "Đang mở
  Excel"; Mac có Dock và kính lúp; Spotlight Enter mở kết quả đầu; Esc đóng.
- [ ] **4. Viết giao diện**, helpId, bài, chương, glossary.
- [ ] **5. Test mở khoá (FAIL trước khi sửa nếu cần)** trong `shared/src/progress.test.ts`: hồ sơ đã xong mọi bài
  `basics` **cũ** → track `typing` vẫn mở sau khi thêm chương mới (Review Focus 1). Sửa bằng cơ chế sẵn có — đọc
  `lessonSatisfied`/`optional` trong `progress.ts`; nếu cần, đánh dấu hai bài mới `optional: true` như bài "Tự chọn".
- [ ] **6. `npm test && npm run typecheck`**; học thật cả hai bản (đổi HĐH trong Cài đặt) bằng chuột; 390px taskbar/Dock
  không tràn.
- [ ] **7. Commit** `feat(basics): Start/Taskbar và Dock/Spotlight + bài mở ứng dụng` + dòng STATUS.
