# Dọn tồn đọng (giai đoạn 2–5A) – tổng quan

> **Cách thực thi:** xem `../ROADMAP.md` mục "Nhịp chạy". Chạy thẳng, không subagent, **một task một lượt**, xong thì
> dừng để người dùng `/compact` rồi gõ `tiếp`. Đọc đúng file này + `STATUS.md` + một file task.

**Goal:** Trả hết món nợ đã ghi từ giai đoạn 2 tới 5A (memory `office-neko-project` mục "phase 3 must first clear this
carryover" và STATUS 5A "Việc còn treo"): bài vỏ máy tính (Start/Taskbar, Dock/Spotlight), bài copy + hoàn tác, hai lỗi
thao tác chuột, một lượt trợ năng, bàn phím ảo theo hệ điều hành, ba lỗi đo/chấm gõ phím, và vài lỗi nhỏ của PowerPoint.

**Architecture:** Không có kiến trúc mới. Mỗi task sửa trong sim/trang đã có, đúng khuôn reducer thuần + grader.
Mỗi lỗi **viết test tái hiện trước** (đỏ), rồi mới sửa.

**Tech Stack:** như cũ, không thêm thư viện.

**Spec:** `specs/2026-09-19-office-neko-design.md` §3 (vỏ máy tính theo HĐH), §4 lộ trình 0, §7.1–7.3.

---

## Global Constraints

- Nhánh `feat/backlog` từ `master` (sau 6B). Tiếng Việt NFC.
- Bài mới của lộ trình 0 có **hai bản** Windows/Mac như `filesLessons(os)` (`visibleLessons` ẩn bản của HĐH kia).
- Thêm bài vào giữa lộ trình làm đổi thứ tự mở khoá: người đã học xong cả chương `basics.files` vẫn phải thấy lộ trình
  sau còn mở (test ở Task 1/2).
- Trợ năng: theo WAI-ARIA Authoring Practices (menu, dialog, listbox); không đổi giao diện nhìn thấy trừ vòng focus.

## Quy ước chung

Lệnh, nhịp TDD, "ba điều tự soi" như `../2026-10-10-phase5b-ppt/00-overview.md` mục "Quy ước chung" — không chép lại.

## Danh sách task

| # | File | Nội dung |
|---|---|---|
| 1 | `task-01-shell-lessons.md` | Start menu / Taskbar (Win), Dock / Spotlight (Mac) trong sim desktop + 1 bài mỗi HĐH |
| 2 | `task-02-files-mouse.md` | Bài copy + hoàn tác; Shift+click chọn dải; menu chuột phải không tràn khung |
| 3 | `task-03-a11y.md` | Một lượt trợ năng cho mọi sim: menu, hộp thoại, kéo–thả bằng phím, aria-live |
| 4 | `task-04-keyboard-os.md` | Bàn phím ảo theo HĐH (Win/Mac) + hình bàn tay chỉ ngón |
| 5 | `task-05-typing-fixes.md` | Độ chính xác Telex/VNI, bài tốc độ bỏ dở, SpotlightOverlay hết hỏi vòng 250 ms |
| 6 | `task-06-ppt-fixes-merge.md` | Nút Kiểm tra đè slide ở màn hẹp, hình chữ nhật mới là hình vuông; gộp, kết thúc dự án |

## Bất biến

`content.test.ts` xanh (solution đạt, không đạt sẵn, glossary, helpId); mọi test cũ giữ nguyên ý nghĩa.

## Review Focus

1. **Người học cũ đã xong lộ trình 0** — thêm bài mới vào `basics` không được khoá lại Word/Excel họ đang học. Mong đợi:
   bài mới là "tự chọn" với người đã xong chương (cơ chế `Tự chọn` đã có ở `TrackMap`), hoặc `lessonSatisfied` coi
   chương đã xong. Test ở Task 1.
2. **Bấm phím Windows/⌘ thật** — trình duyệt/HĐH nuốt phím, sim không nhận. Mong đợi: bài không đòi phím đó; dạy bấm
   nút Start/biểu tượng kính lúp, phím chỉ là mẹo. Test ở Task 1.
3. **Menu chuột phải mở ở mép phải/dưới khung** — không bị cắt. Test ở Task 2.
4. **Người dùng chỉ có bàn phím** (Tab/Enter/Space/Esc/mũi tên) học được trọn bài Word/Excel/PowerPoint. Test ở Task 3.
5. **Gõ "đ" bằng Telex (`dd`)** được tính 1 ký tự đúng, không phải 1 đúng 1 sai. Test ở Task 5.
