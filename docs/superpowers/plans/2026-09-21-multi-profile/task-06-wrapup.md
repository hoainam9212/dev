# Task 6: Kiểm tra tổng thể với ba hồ sơ thật, README, gộp nhánh

Đọc `00-overview.md` trước. Theo thiết kế của plan này, đây **không** phải nơi phát hiện lỗi giao diện — Task 3, 4, 5 đã tự kiểm tra rồi. Nếu vẫn lòi ra lỗi, sửa và ghi vào `STATUS.md` kèm câu "lẽ ra Task N phải bắt được", để lần sau chỉnh plan.

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Chạy toàn bộ**

Run: `npm test && npm run typecheck && npm run build`
Expected: PASS, build sạch, không cảnh báo React Router hay `act()`.

- [ ] **Step 2: Đi một lượt với ba người trên trình duyệt**

Đây là lượt xác nhận cuối, làm trên dữ liệu thật của máy:

1. Tạo đủ ba hồ sơ (giữ hồ sơ gốc của bạn, thêm hai người), mỗi người một ảnh mèo khác nhau, một người chọn Mac.
2. Mỗi người học **một bài khác nhau** và làm một lượt kiểm tra tốc độ ngắn.
3. Đổi qua lại giữa ba người: bản đồ, sao, XP, cấp, chuỗi ngày 🔥, biểu đồ WPM và bản đồ nhiệt phím đều đúng của từng người, không lẫn.
4. Người chọn Mac thấy phím tắt ⌘ và bài Finder; người Windows thấy Ctrl và File Explorer.
5. Đổi cỡ chữ ở một người → chỉ người đó đổi.
6. Bật "Mở khoá toàn bộ bài học" ở một người → chỉ người đó mở khoá hết.
7. F5 giữa chừng: vẫn đúng người. Tắt mạng, tải lại: app vẫn chạy (PWA offline).
8. Console không lỗi trong suốt lượt đi này.

- [ ] **Step 3: README**

Thêm vào mục "Đã có":
```markdown
- Nhiều người học trên một máy: mỗi người một thẻ tên và ảnh mèo riêng, tiến độ - sao - XP - thống kê gõ tách biệt; sao lưu một file cho cả máy.
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "docs: describe multi-profile support" -m "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

- [ ] **Step 5: Gộp nhánh**

```bash
git checkout master
git merge --ff-only feat/multi-profile
git branch -d feat/multi-profile
```

Đánh dấu cả 6 dòng trong `STATUS.md` là ☑ và ghi một câu tổng kết. Nhắc người dùng: giai đoạn 3 (Word) vẫn là việc kế tiếp, plan nằm ở `plans/2026-09-20-phase3-word/`.
