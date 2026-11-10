# Làm song song: Claude desktop + Claude cloud (viết 2026-11-10)

Phần việc còn lại của dự án (6B Task 6, đưa bản online, plan `2026-10-10-backlog/`) chia cho **hai làn**, mỗi làn một
nhánh, mỗi làn **chỉ sửa file của mình**. Nhờ vậy hai bên commit riêng, gộp không xung đột, và đọc được tình trạng của
nhau qua GitHub.

## Hai làn

| Làn | Ai chạy | Nhánh trên GitHub (`hoainam9212/dev`) | Kế hoạch | Tình trạng |
|---|---|---|---|---|
| Desktop | Claude Code trên máy Windows của người dùng | `office-neko/feat/lane-desktop` | `lane-desktop.md` | `STATUS-desktop.md` |
| Cloud | Claude Code trên web (claude.ai/code) | `claude/*` mới nhất: tên ghi ở dòng "Nhánh thật trên GitHub" của STATUS-cloud (phiên cloud chỉ push được lên `claude/*`; xem STATUS-desktop › Nhờ làn cloud 1) | `lane-cloud.md` | `STATUS-cloud.md` |

Cả hai nhánh tách từ cùng một commit, là commit có các file kế hoạch này. Trên máy desktop, nhánh cục bộ tên
`feat/lane-desktop` và được push lên `office-neko/feat/lane-desktop`.

**Vì sao chia như vậy:** chỉ desktop mới có những thứ sau, nên mọi việc cần chúng nằm ở làn desktop:
- Chrome thật để soi ảnh;
- tài khoản host do người dùng đăng nhập;
- Office thật để chụp ảnh.

Làn cloud nhận các việc test được trong jsdom: trợ năng, gõ phím, lỗi PowerPoint.

## Luật chủ sở hữu file (quan trọng nhất)

Mỗi file chỉ có **một** làn được sửa. Muốn đổi file của làn kia thì không sửa. Ghi yêu cầu vào mục "Nhờ làn kia" trong
STATUS của mình, rồi làn kia làm.

**Làn cloud sở hữu** (tạo mới trong các thư mục này cũng thuộc cloud):
- `client/src/components/ribbon.tsx` (+ test)
- `client/src/sims/word/dialogs.tsx`, `client/src/sims/excel/dialogs.tsx`
- `client/src/sims/ppt/**`
- `client/src/sims/fish/**`
- `client/src/sims/keyboard/**`
- `client/src/player/PracticeView.tsx` (+ test)
- `client/src/help/SpotlightOverlay.tsx` (+ test)
- `client/src/pages/SpeedTestPage.tsx` (+ test)
- `client/src/progress/typing.ts` (+ test)
- `client/src/lib/useDialogFocus.ts` (mới, + test)
- `client/src/styles/theme.css`
- `shared/src/typing/**`, `shared/src/ime/**`
- `docs/superpowers/plans/2026-11-10-song-song/STATUS-cloud.md`

**Làn desktop sở hữu mọi file còn lại**, nhất là:
- `shared/src/index.ts` (đã export sẵn `typing` và `ime`, cloud không cần sửa);
- `shared/src/sims/desktop*`, `client/src/sims/desktop/**`, `client/src/sims/mouse/**`;
- `client/src/content/**` (bài, `tracks.ts`, `help-ids.ts`, `glossary.json`), các registry `GRADERS`/`SIMS`;
- `client/src/app/**`, `client/src/progress/backup.ts`, các trang khác;
- `client/src/test/setup.ts`, `package.json`, `package-lock.json`, `client/vite.config.ts`;
- `README.md`, `CLAUDE.md`, `ROADMAP.md`, mọi `STATUS.md` của plan cũ, `STATUS-desktop.md`.

**Không làn nào** thêm thư viện hay sửa các file trong thư mục này, trừ STATUS của chính mình.

## Nhịp làm việc (cả hai làn)

1. **Đầu phiên.** Chạy `git fetch`. Đọc theo thứ tự `ROADMAP.md` → file này → STATUS của mình → STATUS của làn kia →
   file làn của mình → đúng một file task. STATUS làn kia đọc từ GitHub:

   ```bash
   git show <remote>/<nhánh claude/* mới nhất>:docs/superpowers/plans/2026-11-10-song-song/STATUS-cloud.md
   # tìm nhánh: git branch -r --sort=-committerdate --list '<remote>/claude/*' | head -3
   git show <remote>/office-neko/feat/lane-desktop:docs/superpowers/plans/2026-11-10-song-song/STATUS-desktop.md
   ```

   Remote là `github` trên desktop và `origin` trên cloud.
2. **Một task một lượt.** Làm theo TDD (test đỏ → sửa → xanh), chạy `npm test && npm run typecheck`, rồi commit. Sửa
   **một dòng** trong STATUS của mình trong cùng commit đó.
3. **Push nhánh làn của mình ngay sau mỗi commit** (người dùng chốt 2026-11-10). Bước này giúp làn kia thấy tình trạng.
4. **Soát email trước commit.** `git config user.email` phải là `lehoainam.htd@gmail.com`, tên `lehoainam`. Sau khi
   commit, kiểm `git log -1 --format='%an <%ae> | %cn <%ce>'`.
5. **Dòng cuối commit message:** `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Gộp (chỉ làn desktop làm, chỉ một chiều)

- Desktop gộp cloud vào nhánh mình bằng lệnh:

  ```bash
  git fetch github && git merge --no-ff github/<nhánh claude/* mới nhất của cloud>   # tên ở STATUS-cloud
  ```

  Gộp được bất cứ lúc nào STATUS-cloud có task mới ☑. Gộp xong chạy lại `npm test && npm run typecheck`.
- **Cloud không bao giờ gộp hay rebase nhánh desktop**, và không viết lại lịch sử đã push. Gộp một chiều thì không có
  vòng gộp chéo.
- Vì file không chồng nhau nên lần gộp phải sạch. Nếu git báo xung đột, tức là có làn đã sửa file không thuộc mình.
  Khi đó dừng lại: hỏi người dùng, ghi vào STATUS-desktop, không tự chọn bên nào thắng.
- Kết thúc chỉ desktop làm: `master` ← `git merge --ff-only feat/lane-desktop`, rồi push `master`. Có đúng hai điểm
  gộp, ghi trong `lane-desktop.md`.

## Thay đổi so với luật cũ (ruling, người dùng chốt 2026-11-10)

- **Plan backlog chạy trước khi 6B gộp master**, song song hai làn. Luật cũ "plan sau chỉ bắt đầu khi plan trước đã
  gộp" không áp dụng cho plan này.
- **Nhánh tên `feat/lane-*` thay cho `feat/phase6b-polish` / `feat/backlog`.** Lệnh "tạo nhánh" và "gộp" trong các
  file task cũ thay bằng mục Gộp ở trên.
- **`2026-10-10-backlog/STATUS.md` do desktop ghi một lần lúc kết thúc**, tổng hợp từ hai STATUS làn. Trong lúc chạy,
  hai làn chỉ ghi STATUS của mình.
- **Lỗi nhỏ thấy khi "đi một vòng"** chỉ được sửa ngay nếu nằm trong file của làn mình. Còn lại thì ghi "Nhờ làn kia".

## Khi nào dừng và hỏi người dùng

- Xung đột khi gộp.
- Cần sửa file của làn kia mà làn kia đã xong hết việc.
- Push bị từ chối.
- Thao tác không đảo ngược được, như xoá nhánh trên GitHub hay deploy.
