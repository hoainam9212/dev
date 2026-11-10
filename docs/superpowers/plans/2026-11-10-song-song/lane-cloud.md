# Làn cloud – kế hoạch

Nhánh `office-neko/feat/lane-cloud`. Chỉ sửa file thuộc làn cloud (`00-overview.md` › "Luật chủ sở hữu file").

## Đầu phiên cloud (mỗi phiên)

```bash
git config user.name lehoainam
git config user.email lehoainam.htd@gmail.com
git fetch origin
git checkout office-neko/feat/lane-cloud      # hoặc: git checkout -b office-neko/feat/lane-cloud origin/office-neko/feat/lane-cloud
git pull --ff-only origin office-neko/feat/lane-cloud
npm install
```

Đọc STATUS desktop từ `origin` (lệnh `git show` ở 00-overview). Lấy những dòng "Nhờ làn cloud" làm việc ưu tiên trước
task kế tiếp.

**Push sau mỗi commit:**

```bash
git push origin HEAD:office-neko/feat/lane-cloud
```

Nếu môi trường cloud chỉ cho push lên nhánh `claude/...`, push lên một nhánh có tên chứa `lane-cloud`, ví dụ
`claude/office-neko-lane-cloud`. Ghi tên nhánh thật vào dòng đầu của `STATUS-cloud.md`, và báo tên đó cho người dùng.

## Kiểm tra trên trình duyệt

Test jsdom là cổng bắt buộc. Nếu cloud cài được Chromium (`npx playwright install chromium`), tự chụp ảnh ở 390 và 1280
px bằng `npm run build && npm run preview` (cổng 4174). Nếu không cài được, ghi vào mục "Cần desktop soi ảnh" của
STATUS-cloud, mỗi mục một dòng (màn nào, cỡ nào, cần thấy gì). Desktop soi giúp lúc gộp.

## Task (làm theo thứ tự; mỗi task một lượt/phiên)

| # | Nguồn | Phạm vi trong làn cloud |
|---|---|---|
| C1 | `2026-10-10-backlog/task-03-a11y.md` | Toàn bộ, **trừ** `FileArea.tsx` và `MouseSim.tsx` (của desktop, làm ở D4). Tạo `client/src/lib/useDialogFocus.ts` dùng chung. Vòng focus (mục 6) đặt trong `theme.css`. Phần `PracticeView` aria-live (mục 5) thuộc cloud. |
| C2 | `2026-10-10-backlog/task-04-keyboard-os.md` | Toàn bộ. |
| C3 | `2026-10-10-backlog/task-05-typing-fixes.md` | Toàn bộ. Nếu cần sửa `client/src/db/db.ts` thì **dừng**, ghi "Nhờ làn desktop" (file đó của desktop). |
| C4 | `2026-10-10-backlog/task-06-ppt-fixes-merge.md` | **Chỉ mục 1 và 2** (nút Kiểm tra đè slide ở màn hẹp; hình chữ nhật mới chèn ra hình vuông). Mục 3 "Kết thúc" thuộc desktop. Sửa bố cục trong `PptSim`/`PracticeView`, không động `client/src/app/**`. |

Các file task cũ có câu "tạo nhánh `feat/backlog`" hay "gộp": **bỏ qua**, dùng nhánh lane-cloud.

## Hết việc

Khi C1–C4 đều ☑:
- ghi dòng "Làn cloud xong" vào STATUS-cloud;
- push;
- báo người dùng một câu: "Làn cloud xong, desktop gộp được."

Không tự gộp vào `master`.
