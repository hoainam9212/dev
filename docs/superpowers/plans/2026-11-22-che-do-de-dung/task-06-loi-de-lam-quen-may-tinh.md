# Task 6: Lời dễ hiểu cho "Làm quen máy tính" (Windows)

**Ra được:** mọi bài Windows của lộ trình `basics` có bản lời dễ trong `client/src/content/easy/basics.ts`.
Bỏ qua bài chỉ dành cho Mac (`os: 'mac'`, ví dụ `basics.shell.mac`, `basics.files.*.mac`).

## Cách viết (người dùng chốt: cho mẹ, người lớn tuổi, mới hoàn toàn)

- Câu ngắn, mỗi câu một ý. Mỗi đoạn tối đa 3 câu.
- Ít tiếng Anh. Tên nút tiếng Anh trên máy thật thì giữ, kèm nghĩa ngay sau: "nút **Start** (nút bắt đầu)".
- Ví dụ đời thường: thư mục như "cái kẹp hồ sơ", thùng rác như "sọt rác, lấy lại được".
- Giữ `[[thuật-ngữ|chữ]]` như bản gốc để vẫn bấm xem giải nghĩa.
- Xưng "bạn", giọng Mochi ấm áp, khen nhiều, không chê. Không nói "dễ thôi" (người lớn tuổi thấy áp lực).
- Gợi ý từng bước: mỗi bước một động tác, động từ đứng đầu ("Đưa chuột tới…", "Bấm nút trái một lần").
- Không đổi số lượng `choices` hay thứ tự đáp án đúng.

## Bước làm

1. Liệt kê bài Windows của `basics` theo `TRACKS` (khoảng 10 bài + 7 bài thư mục bản Windows).
2. Mỗi bài: đọc file gốc, viết `EasyLesson` cho mọi bước có chữ.
3. Chạy `npm test && npm run typecheck` (test khớp của task 5 bắt lỗi vị trí/loại bước).
4. Đọc lại toàn bộ bản dễ một lượt trên trình duyệt ở cỡ chữ Cực lớn, khung 1280.

## Test

Không thêm test mới; `easy.test.ts` của task 5 bao phủ. Thêm một dòng: mọi bài Windows của `basics` có mục trong `EASY`.

## Kiểm trình duyệt

Hồ sơ dễ dùng học trọn `basics.welcome`, `basics.mouse.*`, một bài thư mục; chữ không tràn khung, gợi ý bậc 3 đọc rõ.

## Commit

`content(de-dung): lời dễ hiểu cho Làm quen máy tính (Windows)` + dòng STATUS.
