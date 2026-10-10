# Giai đoạn 6A (lộ trình Dùng AI) – tình trạng

Đang chạy trên nhánh `feat/phase6a-ai` (tạo từ master 7c8029f).

Cập nhật **một dòng** sau mỗi task, trong cùng commit. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 chấm prompt `scorePrompt` | ☑ | (commit này) | 11 test. Mẫu `phong ` viết `phong\s`; `viet` cũng khớp "tiếng Việt" (dễ dãi, chấp nhận). shared 494 |
| 2 state, reducer, 4 check | ☑ | (commit này) | 20 test. Ruling: `grade()` với kind lạ vẫn **ném lỗi** như cũ (plan ghi "trượt có lời báo") — giữ hành vi đã có, test đổi sang `'nope' as SimKind`. `pickItems` thừa và thiếu cùng lúc thì báo mục thừa trước. Thiếu câu trả lời: mức thiếu lấy mức gần nhất, ưu tiên câu tốt hơn. shared 514, client 392 |
| 3 giao diện chat + `aiPractice` + `/dev/aichat` | ☑ | (commit này) | 10 test. **Task 9 phải xoá `DevAiPage.tsx` + route `/dev/aichat` trong `App.tsx`.** Kiểm trên Chrome thật: prompt kém → câu cụt, 5/5 → câu tốt, chip đổi khi gõ, tự cuộn; 375px không tràn. Chưa thử bộ gõ Telex thật (máy kiểm tự động không có) — test `isComposing` + chặn `keyCode 229`. Chip là `<li aria-label>` trong `<ul>` (span không được đặt tên theo ARIA). Test chip dùng câu dài hơn "Bạn là trợ lý" vì câu đó < 25 ký tự → 0 điểm. Chữ AI: tự tách `**đậm**`, không dùng `rich.ts`. client 402 |
| 4 chế độ bắt câu sai / chọn thông tin | ☐ | | |
| 5 chương 1 Làm quen AI | ☐ | | |
| 6 chương 2 Viết prompt tốt | ☐ | | |
| 7 email + tóm tắt | ☐ | | |
| 8 công thức Excel + dàn ý slide | ☐ | | |
| 9 dự án, Hỏi Mèo, build, gộp | ☐ | | |

## Việc còn treo

(trống)

## Cố ý KHÔNG làm

Gọi API AI thật; lưu lịch sử chat giữa các bài; sinh câu trả lời mới bằng mẫu ghép chữ; chấm prompt bằng mô hình ngôn ngữ.
