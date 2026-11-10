# Làn desktop – kế hoạch

Nhánh cục bộ `feat/lane-desktop`, trên GitHub là `office-neko/feat/lane-desktop`. Chỉ sửa file thuộc làn desktop (xem
`00-overview.md`).

**Push sau mỗi commit:**

```bash
git -c credential.helper= -c credential.helper=manager push github feat/lane-desktop:office-neko/feat/lane-desktop
```

**Đầu phiên:** `git fetch github`, đọc STATUS-cloud (lệnh `git show` ở 00-overview). Những dòng "Nhờ làn desktop" là
việc ưu tiên.

## Task (theo thứ tự; mỗi task một lượt)

| # | Nguồn | Ghi chú |
|---|---|---|
| D1 | `2026-10-10-phase6b-polish/task-06-smoke-merge.md` | Xem chi tiết bên dưới. |
| D2 | `2026-10-10-phase6b-polish/STATUS.md` › Việc còn treo | Đưa bản online lên mạng. Chờ người dùng chọn host (Cloudflare Pages / Netlify) và tự đăng nhập. Deploy là việc ra ngoài nên **hỏi trước khi đưa lên**. Chưa có host thì làm D3 trước, rồi quay lại D2. |
| D3 | `2026-10-10-backlog/task-01-shell-lessons.md` | Toàn bộ. |
| D4 | `2026-10-10-backlog/task-02-files-mouse.md` | Làm toàn bộ, **cộng thêm** các mục trợ năng của `task-03-a11y.md` cho `FileArea.tsx` và `MouseSim.tsx` (menu chuột phải theo mục 1, vùng file `listbox` theo mục 3, thao tác bằng phím theo mục 4). Nếu C1 đã ☑ thì gộp lane-cloud trước để dùng `useDialogFocus`; chưa thì làm phần không cần hook. |
| D5 | `2026-10-10-backlog/task-06-ppt-fixes-merge.md` › mục 3 "Kết thúc" | Xem chi tiết bên dưới. Chỉ bắt đầu khi STATUS-cloud ghi "Làn cloud xong". |

### D1: 6B Task 6, khác plan cũ ở các điểm sau

- Bước 3, "đi một vòng":
  - Lỗi trong file của cloud thì ghi "Nhờ làn cloud", không sửa.
  - Thanh trên cùng gãy chữ ở 390 px nằm trong `AppShell.tsx`, file của desktop, nên sửa được.
- Bước 5, "gộp": thay bằng hai lệnh sau.

  ```bash
  git checkout master && git merge --ff-only feat/lane-desktop
  ```

  ```bash
  git checkout feat/lane-desktop
  ```

  - **Không xoá** `feat/lane-desktop`.
  - Push `master` lên `office-neko/master` và push nhánh làn.
  - Cập nhật `ROADMAP.md` (☑ dòng 3) và `CLAUDE.md`.

### D5: kết thúc dự án

1. Gộp cloud vào nhánh desktop:

   ```bash
   git fetch github && git merge --no-ff github/office-neko/feat/lane-cloud
   ```

2. Chạy `npm test && npm run typecheck && npm run build`.
3. Soi các mục "Cần desktop soi ảnh" của STATUS-cloud.
4. Đi một vòng bản build ở cổng 4174 theo mục 3 của task-06.
5. Ghi `2026-10-10-backlog/STATUS.md` từ hai STATUS làn: mỗi task một dòng, kèm commit.
6. Gộp vào master:

   ```bash
   git checkout master && git merge --ff-only feat/lane-desktop
   ```

   Push `master`, rồi làm mục "Dọn tài liệu" của task-06.
7. Xoá nhánh làn **trên GitHub** chỉ khi người dùng đồng ý. Nhánh cục bộ xoá bằng `-d`.

## Điểm gộp `master`

Chỉ có hai điểm gộp: cuối D1 (6B xong) và cuối D5 (dự án xong). Cả hai đều dùng `--ff-only` từ `feat/lane-desktop`.
