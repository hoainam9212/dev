# Task 5: Độ chính xác Telex/VNI, bài tốc độ bỏ dở, SpotlightOverlay hết hỏi vòng

Ba lỗi nhỏ, mỗi lỗi: test tái hiện (đỏ) → sửa → xanh.

## 1. Độ chính xác khi gõ Telex/VNI gần như vô nghĩa

Hiện `accuracy(correctKeys, totalKeys)` (`shared/src/typing/index.ts`) đếm **phím**; với tiếng Việt, gõ "đ" cần `dd`,
"ố" cần `oos` — số phím khác số chữ nên tỉ lệ sai lệch. Đọc `shared/src/ime/index.ts` và chỗ bài Telex/VNI tính điểm
(grep `accuracy(` trong `shared/src/sims/` và `client/src/sims/keyboard/`).
**Đúng là:** với bài có IME, độ chính xác = số **ký tự đã soạn** khớp đích / số ký tự đích, đo **sau** khi bộ gõ ghép
dấu; phím sửa (Backspace) không tính là sai, nhưng ký tự sai đã chốt (đi qua rồi mới sửa) thì tính.
Test: gõ đúng "đường" bằng Telex (`dduwowngf`) → 100%; gõ "dương" thay vì "đường" → 4/6 ký tự đúng (hoặc tỉ lệ theo
cách đếm đã chọn, ghi rõ trong test); bài không IME giữ cách đếm cũ (test cũ không đổi).

## 2. Bài kiểm tra tốc độ bỏ dở vẫn được cộng trọn một phút học

`SpeedTestPage` + `recordTypingRun`/`dailyActivity`: rời trang giữa chừng vẫn cộng đủ `minutes` của bài.
**Đúng là:** chỉ cộng thời gian **thật đã gõ** (từ phím đầu tới lúc rời/kết thúc), làm tròn xuống phút theo cách
`dailyActivity` đang làm; dưới 5 giây không ghi gì; bài bỏ dở không ghi `typingRun` (không có WPM thật) — nếu code
hiện ghi, test phải chứng minh không còn ghi.

## 3. `SpotlightOverlay` hỏi vòng mỗi 250 ms

`client/src/help/SpotlightOverlay.tsx` dùng `setInterval(…, 250)` để bám theo phần tử đích — tốn CPU, sẽ nặng ở lưới
Excel. **Đúng là:** tính lại vị trí khi `resize`, `scroll` (capture, mọi vùng cuộn), `ResizeObserver` trên phần tử
đích, và `MutationObserver` (childList/subtree/attributes trên vùng sim) gộp bằng `requestAnimationFrame`; tắt hết khi
không có spotlight. Test: không gọi `setInterval` (spy); phát `resize` → khung cập nhật; unmount → mọi observer
`disconnect`.

## Bước

- [ ] **1. Test (FAIL)** cho cả ba mục.
- [ ] **2. Sửa** từng mục; `npm test && npm run typecheck` xanh.
- [ ] **3. Kiểm trên trình duyệt**: bài `typing.telex2` gõ đúng → 100%; mở bài tốc độ 1 phút, gõ 10 giây rồi về trang
  chủ → vòng mục tiêu hôm nay chỉ tăng đúng phần đã gõ; gợi ý bậc 2 trong `excel.sum` bám đúng ô khi cuộn lưới và đổi
  cỡ cửa sổ (Performance: không còn tác vụ 250 ms đều đặn).
- [ ] **4. Commit** `fix(typing): độ chính xác theo chữ đã ghép, bài bỏ dở, spotlight theo sự kiện` + dòng STATUS.
