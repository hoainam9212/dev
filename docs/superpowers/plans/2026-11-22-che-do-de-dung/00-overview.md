# Chế độ dễ dùng cho người lớn tuổi – tổng quan (viết 2026-11-22)

Người dùng muốn gửi app cho mẹ học. Mẹ dùng **máy tính Windows**, học **Làm quen máy tính → PowerPoint → Word →
Excel**. Trang cũ phải giữ nguyên cho mọi người khác.

## Đã chốt với người dùng

- **Một app, không tách trang.** Chế độ dễ dùng là cờ `easyMode` trên **hồ sơ** người học; hồ sơ khác không đổi gì.
- **Link riêng** `/de-dung` (ví dụ `mochi-office.pages.dev/de-dung`): mở lần đầu tạo hồ sơ dễ dùng với Windows,
  chữ "Cực lớn", mở khoá toàn bộ bài. Trong Cài đặt có công tắc "Chế độ dễ dùng" để bật/tắt.
- **Thứ tự lộ trình** khi bật: Làm quen máy tính, PowerPoint, Word, Excel. **Ẩn** Gõ phím 10 ngón và Dùng AI.
- **Bỏ** điểm XP, cấp độ, phụ kiện Mochi (và huy hiệu, cùng nhóm "phần thưởng"). **Giữ** sao chấm bài, lời khen,
  biểu cảm và chuyển động của Mochi, vòng sáng chỉ chỗ bấm.
- **Giữ hiệu ứng chuyển động** (không bật sẵn "Giảm chuyển động"); ai thấy rối mắt thì tự bật trong Cài đặt.
- **Lời dễ hiểu** nằm trong file riêng `client/src/content/easy/<lộ trình>.ts`, ghi đè từng bước theo id bài +
  vị trí bước. File bài gốc **không sửa**, nên người học thường thấy y như cũ. Bước nào chưa có bản dễ thì hiện bản gốc.
- Viết lời dễ theo thứ tự mẹ học. Plan này làm khung + lộ trình **Làm quen máy tính (bản Windows)**; PowerPoint,
  Word, Excel là plan sau (mỗi lộ trình một plan, cùng khung).

## Giao diện chính (các task dùng chung)

- `Profile.easyMode?: boolean` (hồ sơ cũ không có ⇒ tắt). `Profile.fontScale` thêm `'xxl'` (24px).
- `client/src/lib/easy.ts`: `useEasyMode(): boolean`; `tracksFor(easy: boolean): Track[]` (bật ⇒ 4 lộ trình,
  `order` đánh lại 0..3 theo thứ tự trên; tắt ⇒ `TRACKS` nguyên vẹn).
- `<html data-easy="1">` khi bật; CSS trong `theme.css` làm nút to, chữ đậm hơn, giãn dòng.
- `client/src/content/easy/index.ts`: `EASY: Record<lessonId, EasyLesson>`; `applyEasy(lesson, easy?)` trả bài đã
  thay chữ (title, osNote, body, question/choices/why, task/hints[0]/hints[2], caption).

## Task

| # | File | Nội dung |
|---|---|---|
| 1 | `task-01-ho-so-va-giao-dien.md` | `easyMode`, cỡ chữ Cực lớn, CSS `data-easy`, công tắc trong Cài đặt |
| 2 | `task-02-link-de-dung.md` | Trang `/de-dung` tạo hồ sơ dễ dùng |
| 3 | `task-03-lo-trinh.md` | `tracksFor`: thứ tự mới, ẩn Gõ phím và AI ở mọi nơi |
| 4 | `task-04-an-phan-thuong.md` | Ẩn XP, cấp, phụ kiện, huy hiệu; giữ sao, lời khen, Mochi |
| 5 | `task-05-khung-loi-de.md` | `applyEasy` + test khớp bài; LessonPage dùng khi bật |
| 6 | `task-06-loi-de-lam-quen-may-tinh.md` | Viết lời dễ cho Làm quen máy tính (Windows) |
| 7 | `task-07-kiem-va-gop.md` | Kiểm toàn luồng trên trình duyệt, gộp master, hỏi trước khi deploy |

Nhánh: `office-neko/feat/che-do-de-dung` từ `office-neko/master`, cuối plan `git merge --ff-only`.
