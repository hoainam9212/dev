# Chế độ dễ dùng – tình trạng

Nhánh `office-neko/feat/che-do-de-dung`. Dòng đầu tiên chưa ☑ là task kế tiếp.

| # | Task | Xong | Ghi chú |
|---|---|---|---|
| 1 | Hồ sơ và giao diện | ☑ | `easyMode`, `xxl` 24px, `data-easy` (nút cao 3.25rem, chữ phụ đậm, giãn dòng), công tắc Cài đặt (bật ⇒ xxl + unlockAll). Chrome 1280: nút "Học tiếp" 78px, không tràn. 390: thanh trên tràn vì chip Cấp/Luyện gõ, task 3–4 ẩn ⇒ kiểm lại ở task 7 |
| 2 | Link `/de-dung` | ☑ | `EasyWelcomePage`: chào → hỏi tên (trống thì khoá "Xong", Enter cũng gửi) → hồ sơ win/xxl/unlockAll/easyMode. Chữ to từ màn đầu nhờ `setPreviewLook` trong `db/profile.tsx` (effect của trang con chạy trước `ProfileProvider` nên không đặt thẳng `dataset` được). Chrome: hồ sơ thường giữ 17px; `/de-dung` 24px; mở lại link khi đã dễ dùng ⇒ về `/`; đổi về hồ sơ thường ⇒ 17px; 390 không tràn |
| 3 | Lộ trình | ☑ | `tracksFor`/`useTracks`/`EASY_TRACK_ORDER` trong `lib/easy.ts` (bản sao dùng chung `chapters` với `TRACKS`). HomePage, LessonPage dùng; bài lộ trình ẩn ⇒ `<Navigate to="/">`; ẩn chip Luyện gõ và link kiểm tra đầu vào. Placement, Glossary giữ `TRACKS`. Chrome: dễ dùng 4 lộ trình đúng thứ tự, "Học tiếp" ⇒ `basics.welcome`, `/lesson/typing.home1` ⇒ `/`; thường vẫn 6. 390: nút ⚙️ còn lẹm do chip Cấp ⇒ task 4 |
| 4 | Ẩn phần thưởng | ☑ | Chỉ ẩn hiển thị (XP, huy hiệu vẫn ghi). AppShell: chip Cấp, phụ kiện trên ảnh; HomePage: `BadgeShelf`; FinishView: `+XP`, dòng gợi ý, huy hiệu/phụ kiện mới ⇒ câu khen theo sao (`EASY_PRAISE`); Settings: mục Phụ kiện, phụ kiện trên ảnh chọn. Chrome: xong `basics.welcome` có 3 sao + "Tuyệt vời! Bạn làm rất giỏi." + pháo giấy, không XP; 390 thanh trên hết tràn |
| 5 | Khung lời dễ | ☑ | `content/easy/{types,index,basics}.ts`. Khác plan: `EasyStep` có thêm `kind` (phải trùng bước gốc, lệch thì bỏ qua) để test kiểm loại chắc chắn. `applyEasy` bỏ `choices` sai số lượng. `easy.test.ts` kiểm id bài, vị trí, loại, số lựa chọn, chuỗi rỗng, `[[thuật ngữ]]`. LessonPage: `shown` (useMemo) vào LessonPlayer/FinishView. Mẫu `basics.mouse.click` (4 bước). Chrome: dễ dùng thấy lời mới; tắt chế độ thấy lời cũ |
| 6 | Lời dễ: Làm quen máy tính | ☐ | |
| 7 | Kiểm và gộp | ☐ | |
