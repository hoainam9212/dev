# Giai đoạn 6A (lộ trình Dùng AI) – tình trạng

Đang chạy trên nhánh `feat/phase6a-ai` (tạo từ master 7c8029f).

Cập nhật **một dòng** sau mỗi task, trong cùng commit. Dòng đầu tiên chưa ☑ là task kế tiếp.

| Task | Xong | Commit | Ghi chú / việc còn treo |
|---|---|---|---|
| 1 chấm prompt `scorePrompt` | ☑ | (commit này) | 11 test. Mẫu `phong ` viết `phong\s`; `viet` cũng khớp "tiếng Việt" (dễ dãi, chấp nhận). shared 494 |
| 2 state, reducer, 4 check | ☑ | (commit này) | 20 test. Ruling: `grade()` với kind lạ vẫn **ném lỗi** như cũ (plan ghi "trượt có lời báo") — giữ hành vi đã có, test đổi sang `'nope' as SimKind`. `pickItems` thừa và thiếu cùng lúc thì báo mục thừa trước. Thiếu câu trả lời: mức thiếu lấy mức gần nhất, ưu tiên câu tốt hơn. shared 514, client 392 |
| 3 giao diện chat + `aiPractice` + `/dev/aichat` | ☑ | (commit này) | 10 test. **Task 9 phải xoá `DevAiPage.tsx` + route `/dev/aichat` trong `App.tsx`.** Kiểm trên Chrome thật: prompt kém → câu cụt, 5/5 → câu tốt, chip đổi khi gõ, tự cuộn; 375px không tràn. Chưa thử bộ gõ Telex thật (máy kiểm tự động không có) — test `isComposing` + chặn `keyCode 229`. Chip là `<li aria-label>` trong `<ul>` (span không được đặt tên theo ARIA). Test chip dùng câu dài hơn "Bạn là trợ lý" vì câu đó < 25 ký tự → 0 điểm. Chữ AI: tự tách `**đậm**`, không dùng `rich.ts`. client 402 |
| 4 chế độ bắt câu sai / chọn thông tin | ☑ | (commit này) | 6 test. Hai chế độ ở `Pickers.tsx`. **Ruling:** câu là `<span role="button" tabIndex=0>` + Enter/Space, không phải `<button>` — Chrome ép `<button>` thành inline-block nên câu dài không gãy dòng, đoạn văn vỡ thành danh sách (thấy trên ảnh chụp). Kiểm trình duyệt: đoạn văn trôi, câu chọn nền vàng viền đỏ; pickItems mỗi mục cao 70px, 375px không tràn. client 409 |
| 5 chương 1 Làm quen AI | ☑ | (commit này) | `ai-start.ts` 3 bài. Glossary `ai` **đã có** (bài chào) → thêm `ai.intro` vào `lessonIds` của mục cũ thay vì tạo mục trùng; thêm `du-lieu-nhay-cam`, `ao-giac`. Học thật cả 3 bài bằng chuột: chọn thừa «Tên món ăn» → lời nhắn nêu đúng mục; chọn AVERAGE → "Câu này đúng đấy"; COUNT/thứ Hai → đạt. Trang chủ có lộ trình 5 với 3 bài. client 409 |
| 6 chương 2 Viết prompt tốt | ☐ | | |
| 7 email + tóm tắt | ☐ | | |
| 8 công thức Excel + dàn ý slide | ☐ | | |
| 9 dự án, Hỏi Mèo, build, gộp | ☐ | | |

## Việc còn treo

(trống)

## Cố ý KHÔNG làm

Gọi API AI thật; lưu lịch sử chat giữa các bài; sinh câu trả lời mới bằng mẫu ghép chữ; chấm prompt bằng mô hình ngôn ngữ.
