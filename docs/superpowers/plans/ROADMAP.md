# Lộ trình còn lại của office-neko (viết 2026-10-10)

Nền: giai đoạn 1–5A và ribbon giống Office thật (Word/Excel/PowerPoint + ảnh chụp thật) đều đã ở `master`.
Bốn plan dưới đây làm nốt toàn bộ dự án theo spec `specs/2026-09-19-office-neko-design.md` §10.

| Thứ tự | Plan | Nhánh | Số task | Ra được gì |
|---|---|---|---|---|
| 1 ☑ | `2026-10-10-phase5b-ppt/` | `feat/phase5b-ppt` | 9 | PowerPoint đủ 12 bài: theme, chuyển cảnh, trình chiếu, dự án |
| 2 ☑ | `2026-10-10-phase6a-ai/` | `feat/phase6a-ai` | 9 | Lộ trình "Dùng AI" 10 bài trên trình mô phỏng chat |
| 3 | `2026-10-10-phase6b-polish/` | `feat/phase6b-polish` | 6 | Huy hiệu, phụ kiện Mochi, Phòng tự do, kiểm tra đầu vào, `Start Tin Hoc.bat`, PWA |
| 4 | `2026-10-10-backlog/` | `feat/backlog` | 6 | Dọn tồn đọng từ giai đoạn 2–5A: bài vỏ máy tính, trợ năng, bàn phím ảo, lỗi chấm gõ phím |

Plan sau chỉ bắt đầu khi plan trước đã gộp `master`. Mỗi plan tạo nhánh riêng tại chỗ (không git worktree,
kẻo preview cổng 5174 hỏng) và kết thúc bằng `git merge --ff-only` vào `master`.

## Nhịp chạy (người dùng chốt 2026-10-10)

- **Chạy thẳng trong phiên, KHÔNG dùng subagent**, không gọi `superpowers:subagent-driven-development`.
- **Mỗi lượt làm đúng MỘT task.** Xong task (test xanh, task giao diện thì đã kiểm trên trình duyệt, đã commit kèm
  dòng `STATUS.md`) thì **DỪNG** và nhắn người dùng đúng một câu: *"Task N xong — gõ `/compact` rồi gõ `tiếp`."*
  Claude không tự chạy được `/compact`; người dùng chạy.
- **Sau compact hoặc ở phiên mới**, đọc theo thứ tự và chỉ chừng này:
  1. file này (`ROADMAP.md`) để biết đang ở plan nào;
  2. `00-overview.md` của plan đó;
  3. `STATUS.md` của plan đó (dòng đầu tiên chưa ☑ là task kế tiếp);
  4. đúng một file `task-NN-*.md`.
  Không đọc task khác, không đọc lại spec trừ khi task bảo đọc một mục cụ thể.
- Hết một plan: gộp `master`, cập nhật bảng trên (cột "Thứ tự" thêm ☑), dòng "Nhánh đang làm dở" trong `CLAUDE.md`,
  và memory `office-neko-project`. **Không push** khi người dùng chưa bảo.

## Quy tắc chung cho mọi plan

- Trước commit: `git config user.email` phải là `lehoainam.htd@gmail.com` (dự án cá nhân, không bao giờ email công ty).
  Trước khi báo xong: `git log -1 --format='%an <%ae> | %cn <%ce>'`.
- Commit: `git commit -m "<subject>" -m "Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"`.
- TDD; sửa file bằng Edit/Write, không bằng sed/python. Gộp lệnh: `npm test && npm run typecheck` một lần.
- Review cả nhánh cuối plan **chỉ khi người dùng bảo**; mặc định gộp luôn và nhắn một dòng rằng có thể review nếu muốn.
